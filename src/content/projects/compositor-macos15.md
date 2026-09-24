---
title: Compositor-macos15
description: 把一款要求 macOS 26.5 的 SwiftUI 应用，用系统自带的命令行工具移植到 macOS 15 上运行——一次没有 Xcode、没有 Apple ID 的完整移植记录。
pubDate: 2026-09-23
tags: [Swift, macOS, 开源]
cover: /img/works/compositor.jpg
github: https://github.com/zhangqier94-cyber/Compositor-macos15
link: https://github.com/zhangqier94-cyber/Compositor-macos15
---

## 缘起：一款装不上的应用

[Compositor](https://github.com/Chaoses-Ib/Compositor) 是一款 macOS 截图贴图工具：截图后像图钉一样钉在桌面上，可缩放、可调色、可混合图层，界面是纯粹的 SwiftUI。我日常离不开它，但汉化体验版的二进制把最低系统卡在 **macOS 26.5**——而我的机器是 macOS 15.8，双击图标直接被系统拒之门外。

直接装不行，那就从源码编一个。这件事最后花了一整天，走了不少弯路，也踩到几个值得记录的坑。这篇文章是完整的过程记录：诊断、选型、两次真正的技术攻坚，以及一段从零设计的工具栏状态机。

## 诊断：崩在哪

先搞清楚"为什么装不上"。用 `otool` 反查官方 DMG 里的二进制，两个致命信息：

```
minos = 26.5          ← 链接器写入的最低系统版本
缺失符号 15 个        ← SwiftUI 内部符号，macOS 15 上不存在
```

第一点决定了系统直接拒绝加载；第二点意味着就算用工具强行改掉版本号骗过加载器，启动后也会因为找不到符号立刻崩溃。**改二进制这条路是死的**，必须重新编译。

## 选型：三条路的取舍

| 路径 | 结论 |
|---|---|
| 直接装官方 DMG | ✗ 缺 15 个符号，启动即崩 |
| 用 Xcode 26.3 重编译 | ✗ 需要 Apple ID，且 11 GB 下载 |
| **系统自带 Command Line Tools 编译** | **✓ 最终走通的路** |

第三条路成立的前提是一个关键发现：**CLT 里已经有 `swiftc`、`clang` 和完整的 macOS SDK**，而这个工程零远程依赖——没有 SPM 包、没有 Sparkle、没有 CocoaPods。也就是说，`xcodebuild` 那套构建系统在这里纯属摆设，一个 `swiftc` 命令就能吃下整个工程：115 个 `.swift` + 8 个 `.c`，约 2.4 万行。

## 攻坚一：把 Swift 6.2 的并发模型"翻译"回 6.1

真正的难点不在 API，在**并发语义**。

原工程构建设置里有这么两行：

```
SWIFT_DEFAULT_ACTOR_ISOLATION = MainActor
SWIFT_APPROACHABLE_CONCURRENCY = YES
```

含义是：**所有没显式标注隔离的声明，默认都在主线程上**。作者据此写了 150 多处 `nonisolated`，把需要后台执行的逻辑摘出去——这是 Swift 6.2 的新玩法。

问题来了：`-default-isolation MainActor` 是 **Swift 6.2 才有的编译开关**，而 CLT 自带的编译器是 6.1.2，完全不认这个参数。编译时默认隔离静默回落为 `nonisolated`，于是"默认在主线程"的前提被抽掉，凡是要碰 UI 状态的代码全线报错——不是一两处，是**约 80 个文件**。

处理办法是把被编译开关隐掉的语义**显式写回源码**：

- 顶层 `class`、视图类型、`@Observable` 模型 → 补 `@MainActor`
- 纯数据类型（`ImageLayer`、`CanvasViewport` 这类 struct/enum）→ 标 `nonisolated`——它们只是数据，标了主线程隔离反而让 `static let` 初始化报错
- `actor` → 不动（自带隔离，叠全局 actor 是编译错误）
- **extension → 跟随被扩展类型的隔离**。这条最阴险：一开始漏了，报错像瀑布一样从扩展里涌出来，定位了半天才反应过来

改完之后还有个反直觉的收获：`ToolbarSpacer` 等 10 个 macOS 26 内部符号**一行都不用改**——部署目标降到 15 之后，编译器自动换成旧系统的实现。编译器的版本分发机制替我们干了活。

## 攻坚二：没有 Xcode，怎么打包 .app

编译通过只是半程。装配 `.app` 时撞上另一个缺口：`actool`（编译资源目录的工具）只在 Xcode 里，CLT 没有。

解法是个取巧的思路：**官方 DMG 里的 `.app` 已经包含了编译好的资源**，直接复用——

1. 拷贝官方 `.app` 的完整包结构（`Assets.car` 1.8 MB、730 条词条的完整汉化 `Localizable.strings`、图标）
2. 把 `Contents/MacOS/Compositor` 换成我们自己编译的二进制
3. 改写 `Info.plist`：`LSMinimumSystemVersion` 由 26.5 改为 15.0
4. `codesign --sign -` 本地临时签名（不需要开发者证书）

这样连 `actool` 都绕开了。C 文件也要一并编进（8 个 `.c` 在 `Rendering/` 下，负责图像处理核心），并带 `-import-objc-header` 桥接头，否则报 `cannot find 'heal_coverage_bounds' in scope`。

## 设计延伸：给移植版做一个"更新红点"

移植版没有自动更新（官方的 Sparkle 通道对重编译版本无意义），那上游发新版怎么知道？与其让人定期手动查，不如在工具栏做一个常驻的更新按钮——这也是这次移植里唯一一段从零设计的 UI。

**状态机设计**：上游已有 `ForkUpdateChecker`（拉 GitHub Releases、比版本、24 小时节流），但只暴露一次性的弹窗。给它加一层 `ForkUpdateStatus`，五个状态对应五种外观：

![更新按钮的五种状态](/img/works/compositor-macos15/button-states.png)

几个刻意的设计决定：

- **"已知有新版本"写进 `UserDefaults`**——下次开机不用等网络检查，红点立刻在
- **红点画在图标边界内**——工具栏会裁掉超界绘制，半个红点看着像渲染故障，实测踩过
- 点击弹出用 `NSAlert` 而非 SwiftUI alert——按钮保持为 `status` 的纯函数，不引入自己的展示状态
- 三个动作里最显眼的是"**在本机重新编译…**"——它定位工作副本并在终端里跑更新脚本，因为重编译要几分钟且输出多，应该发生在一个用户能看见的窗口里

**一个差点让红点永远不亮的坑**：上游的版本检查里有段"最低系统门槛"过滤——发布说明写着 `LSMinimumSystemVersion: 26.5`，本机 15.8 不满足，候选版本全部被刷掉，按钮永远显示"已是最新"。这条规则是给直接装 DMG 的用户准备的，对源码重编译的移植版正好相反：**上游要求多高的系统，和源码能不能降级编译毫无关系**。过滤逻辑因此移除，只比版本号。

## 结果

![Compositor 在 macOS 15.8 上运行](/img/works/compositor-macos15/run.jpg)

用符号级验证代替"能打开就是好的"：

```
导入符号        2147 个
本机缺失        0 个    ← 官方原版缺失 15 个，必然崩溃
架构            x86_64
最低系统        15.0
实际运行        ✓ 中文界面完整
```

### 诚实的差异清单

- 工具栏标签条带默认背景色（原版在 macOS 26 上透明）——`sharedBackgroundVisibility` 在 macOS 15 无等价 API
- 字体/混合模式选择器的圆角回落为系统默认（放弃 26 的胶囊样式）
- 二进制是 `-Onone` 编译，13 MB、启动略慢；换 `-O` 可优化，代价是编译时间
- 本地 adhoc 签名，只在本机可用；对外分发需要开发者证书重签并公证

## 可持续性：让移植活过下一次更新

一次性移植的价值会随上游更新衰减，所以仓库里配了完整的自动化：

- `update.sh`——一条命令完成：拉取上游 `zh-beta-*` 标签 → 备份当前分支 → 下载校验新 DMG → **把全部移植提交 rebase 到新版本上** → 重编译装配。rebase 冲突时自动回滚，成果不丢
- `sync-to-git.sh`——每次更新自动提交推送到 GitHub，可一键发 Release
- `patches/macos15-port.patch`——全部改动独立成补丁，不依赖 git 历史也能取用

所有源码适配集中在 [zhangqier94-cyber/Compositor-macos15](https://github.com/zhangqier94-cyber/Compositor-macos15) 的 `macos15-port` 分支，基线为汉化版 `zh-beta-v1.2.2.1`。

## 尾声

回过头看，这次移植最有意思的地方不是"让老 app 跑起来"，而是**在没有 Xcode、没有官方工具链的环境里，用编译器本身的机制（部署目标驱动的符号分发）和显式源码标注（并发隔离），拼出了一条可持续的构建路径**。Apple 把新工具的门槛越抬越高，但语言和系统向下兼容的余地，比 DMG 上那个版本号显示的要大得多。
