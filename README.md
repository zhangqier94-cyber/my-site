# my-site

个人网站，内容用 Markdown 管理，支持在 **Obsidian** 里直接写作并自动同步到线上。

## 项目特点

- ✅ 内容是 **Markdown 文件**，无数据库、无 CMS
- ✅ 在 Obsidian 里写 → `git push` → 自动部署上线
- ✅ 支持 RSS / sitemap / 上下篇导航 / 复制链接 / 回到顶部

---

## 🖥 换机 / 新电脑部署

> 这一节记录**当前真实在跑的链路**，换电脑时照这个做。
> 下面「Obsidian 对接工作流」和「部署」两节是早期方案文档，其中 **Obsidian Git 插件、软链接 vault** 的做法现在都**没有使用**，仅供参考。

### 现在实际是怎么跑的

```
Obsidian 打开 ~/Documents/my-site（仓库根目录本身就是 vault）
        ↓ 保存 .md、往 public/img 放图片
site-publish（或手动 git push origin main）
        ↓
GitHub Actions：npm ci && astro build
        ↓
netlify-cli deploy --prod
        ↓
https://zhangqier94-my-site.netlify.app
```

关键点：**构建和部署都在云端完成**，Netlify 令牌存在仓库的 Actions secrets 里。所以任何一台装了 git 的电脑，只要能 push 到 main，网站就会自动更新——本机环境不是必要环节。

### 新电脑要做的 5 件事

1. **装 git**（想本地预览效果才需要 Node 22+ 和 `npm install`；只发文的话有一定 git 就够了）
2. **拿到 GitHub 凭据** —— 唯一搬运不过来、又必须有的一样东西：
   - **复用旧的**：在原来那台 Mac 上打开「钥匙串访问」→ 搜 `github.com` → 双击那条互联网密码 → 显示密码 → 复制 `ghp_...` 开头的字符串，存进密码管理器
   - **或新建一个**：https://github.com/settings/tokens/new （classic token），勾选 `repo` + `workflow` 两个 scope。生成后页面**只显示一次**，立刻保存
     > ⚠️ `workflow` 必须勾——少这个 scope，push 会被 GitHub 直接拒绝
3. **克隆仓库**
   ```bash
   git clone https://github.com/zhangqier94-cyber/my-site.git ~/Documents/my-site
   ```
4. **第一次 push 时**：Username 填 `zhangqier94-cyber`，Password 粘贴**那串 token**（不是账号密码），弹窗选「始终允许」，之后就会存进这台机器的钥匙串，不用再输
5. **Obsidian 打开 `~/Documents/my-site` 作为 vault**，然后设置 → 文件与链接 → 附件文件夹设为 `public/img`
   > `.obsidian/` 被 gitignore 了，所以新电脑上主题、插件、附件目录都得重配一次（好处是两台机器不会因为配置文件打架）

### 两台电脑一起用的规矩

- **开工先 `git pull`，收工必 `site-publish`**。两边都动了同一个文件又没同步，push 会被拒或者产生冲突。
- 有 AI 帮忙提交时，**只提交它自己动过的文件，不要 `git add -A`**，免得把你在 Obsidian 里没写完的内容一起卷走。

### 待改造（回家后处理）

- [ ] 把 `~/bin/site-publish` 收进仓库（如 `scripts/site-publish`），去掉写死的 `$HOME/Documents/my-site`，改成跟着仓库位置走
- [ ] 写一个新机初始化脚本：配 PATH、设 branch upstream、提示输入 token，一条命令跑完
- [ ] 设 upstream：`git branch --set-upstream-to=origin/main main`（当前没设，手动敲不带参数的 `git push` / `git pull` 会报 no upstream branch）

---

## 目录结构

```
my-site/
├── public/                      # 静态资源（直接复制到线上）
│   ├── css/main.css             # 设计样式
│   ├── js/custom.js             # AI跑的脚本
│   └── img/                     # logo、favicon、占位图
├── src/
│   ├── content/
│   │   ├── blog/                # 博客文章（Markdown）
│   │   └── projects/            # 作品（Markdown）
│   ├── layouts/
│   │   ├── Base.astro           # 公共布局（导航 + Footer）
│   │   └── BlogPost.astro       # 博客详情布局
│   ├── pages/
│   │   ├── index.astro          # 首页
│   │   ├── blog/                # 博客列表 + 博客详情
│   │   ├── works/               # 作品列表 + 作品详情
│   │   ├── about.astro          # 关于页
│   │   ├── archive.astro        # 归档页
│   │   └── rss.xml.js           # RSS feed
│   └── content.config.ts        # 内容集合 schema
├── astro.config.mjs
├── package.json
└── README.md
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动 dev server (默认 http://127.0.0.1:4321)
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 怎么写博客

把 `.md` 文件放到 `src/content/blog/` 下，文件名就是 URL 的一部分。

### Frontmatter 必填字段

```markdown
---
title: 文章标题
pubDate: 2026-09-23
---

正文内容...
```

### 完整可选字段

```markdown
---
title: 文章标题
description: 副标题 / 摘要
pubDate: 2026-09-23
updatedDate: 2026-09-25       # 可选，最后更新时间
tags: [前端, Astro]             # 可选，标签
heroImage: /img/blog/xxx.jpg   # 可选，封面图
draft: false                   # 可选，true 则不展示
---
```

正文用标准 Markdown，支持代码块、表格、图片、引用、列表。

## 怎么写作品

把 `.md` 文件放到 `src/content/projects/` 下。

```markdown
---
title: 项目名
description: 一句话描述
role: 主设计师
client: 客户名
year: 2024
tags: [UI, 产品设计]
cover: /img/xxx.jpg
link: https://...               # 可选，外部链接
order: 1                        # 数字越小越靠前
---

详细描述（Markdown）...
```

---

## 🔥 Obsidian 对接工作流（核心）

整个体系的设计目标就是：**你只在 Obsidian 里写，剩下全自动**。

### 步骤 1：组织 Obsidian Vault

推荐两种结构（任选其一）：

#### 方案 A：独立 Blog 文件夹（推荐）

把你的 Vault 想象成这样：

```
~/Documents/MyVault/           ← Obsidian Vault 根目录
├── 0_Daily/                   ← 你的日记、其他内容
├── Blog/                      ← 博客文章专用
│   ├── 2026-09-23-文章1.md
│   ├── 2026-09-24-文章2.md
│   └── assets/                ← 文章配图
├── Projects/                  ← 作品专用
│   ├── 项目A.md
│   └── 项目B.md
└── ...
```

然后把这两个文件夹**软链接**到 Astro 项目：

```bash
# 把 Vault 的 Blog/ 链接到 src/content/blog/
ln -s ~/Documents/MyVault/Blog /Users/.../my-site/src/content/blog

# 把 Vault 的 Projects/ 链接到 src/content/projects/
ln -s ~/Documents/MyVault/Projects /Users/.../my-site/src/content/projects
```

> ⚠️ 注意：macOS 默认 Obsidian 创建的 vault 里有 `.obsidian/` 目录，**不会**被软链接跟随进去，所以不需要担心冲突。

#### 方案 B：把整个 Vault 链接进来

如果你的 vault 几乎只用来写博客，可以直接把 vault 软链接到 `src/content/`：

```bash
ln -s ~/Documents/MyVault ~/code/my-site/src/content
```

然后 vault 里的 `Blog/` 和 `Projects/` 子目录就会被识别。

### 步骤 2：装 Obsidian Git 插件

1. Obsidian → Settings → Community plugins → 搜索 **"Git"** → 安装作者 *Vinzent03* 的版本
2. 启用后，进入插件设置：
   - **Vault backup directory**: 留空（直接在 vault 根目录初始化）
   - **Auto backup interval**: 建议 `10` 分钟（或自定义）
   - **Commit message**: `{{date}} {{numFiles}} files`

3. 在 Obsidian 的命令面板（`Cmd+P`）执行：
   - `Git: Initialize this vault as a git repo` → 初始化仓库
   - 绑定远程仓库：`git remote add origin https://github.com/你的用户名/my-site.git`
   - `Git: Push` → 第一次推送

4. 之后每次写完文章，命令面板执行 **`Git: Commit and sync`**（或绑个快捷键）→ 自动推送到 GitHub → 自动触发部署

### 步骤 3：图片处理

Obsidian 粘贴图片时会自动保存到 `.assets/` 或同目录。在 Astro 里直接用相对路径引用：

```markdown
---
title: 我的新文章
pubDate: 2026-09-23
---

![](assets/screenshot.png)        <!-- 同目录的图片 -->
![[screenshot.png]]               <!-- Wikilink 写法（需改） -->
![](https://i.imgur.com/xxx.jpg)  <!-- 外链也行 -->
```

> ⚠️ Obsidian 的 Wikilink `![[xxx]]` **不会被 Astro 识别**，写作时统一用标准 Markdown `![](path)`。

### 步骤 4：写作时的 Frontmatter 提醒

在 Obsidian vault 根目录放一个模板文件 `Blog/-template.md`：

```markdown
---
title: 
description: 
pubDate: <% tp.date.now("YYYY-MM-DD") %>
tags: []
---

正文从这里开始...

> 用 Templater 插件 + 上述模板，新建文章时一键填充日期。
```

---

## 🚀 部署

### 方案 A：Netlify（最简单）

1. 把 `my-site/` 推到 GitHub
2. 登录 [Netlify](https://app.netlify.com/) → Add new site → Import from Git
3. 选你的仓库
4. 配置：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 点 Deploy，以后每次 `git push` 自动部署

### 方案 B：Vercel（同样简单，国内访问稍慢）

类似 Netlify，导入项目即可，Astro 默认配置自动识别。

### 方案 C：CloudStudio（国内访问快）

WorkBuddy 内置 `workbuddy_cloudstudio_deploy` 工具，可以一行命令部署：

```bash
# 先构建
npm run build

# 部署 my-site/dist/
```

---

## ⚙️ 自定义

### 改网站名 / Logo / 关于页

- 网站名：编辑 `src/layouts/Base.astro` 里的 `siteName` 常量
- 关于页：直接编辑 `src/pages/about.astro`
- 首页 Hero：编辑 `src/pages/index.astro`

### 改导航项

编辑 `src/layouts/Base.astro` 里的 `navItems` 数组。

### 加搜索、评论、暗色模式

Astro 生态有现成的方案，按需引入：

- 搜索：`pnpm add @astrojs/pagefind`
- 评论：[Giscus](https://giscus.app/)（基于 GitHub Discussions，免费）
- Analytics：[Umami](https://umami.is/) / Plausible

### RSS / Sitemap

已内置。部署上线后访问 `/rss.xml` 和 `/sitemap-index.xml`。

---

## 故障排查

| 问题 | 原因 | 解决 |
|---|---|---|
| 图片 404 | 路径写错了 | 检查 public/img/blog/ 目录 |
| 写新文章没出现在博客列表 | 文件名/Frontmatter 错 | 检查 `.md` 文件名后缀、frontmatter 格式 |
| Wiki link `![[xxx]]` 不显示 | Astro 不支持 | 改成标准 `![](xxx)` |
| RSS 没新文章 | `draft: true` 或 `pubDate` 是未来 | 改 frontmatter |
| 端口 4321 被占用 | 其他进程 | 改 `astro.config.mjs` 的 `server.port` |

---

## 进阶：上传到 GitHub + 自动部署

```bash
cd my-site
git init
git add .
git commit -m "Initial commit"
gh repo create my-site --public --source=. --remote=origin --push
# 然后去 Netlify/Vercel 选这个仓库即可
```

---

📝 这个 README 本身就是用 Obsidian 写作 + Git 同步 + 自动部署的标准范例。
