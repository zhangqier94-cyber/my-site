---
title: 示例项目：网站重构
description: 把 LRD.IM 个人网站用 Astro 重构，支持 Obsidian 直接编辑内容
pubDate: 2026-09-23
tags: ["项目", "前端"]
---

# 项目第一部分

这是一篇示例项目说明，用来展示 `/works/[slug]` 详情页的样式效果。

## 背景

原网站基于纯静态 HTML + JS 构建，每次发文章都需要手动更新多个文件。在 2023 年原作者改用 Next.js 后，旧仓库保留作为纪念。

我们这次复刻的目标是：

1. **复用原视觉** —— 直接使用 LRD.IM 的 `main.css`、`custom.js`
3. **内容可编辑** —— 把博客改成 Markdown 文件，支持在 Obsidian 里写
4. **自动同步** —— 通过 Git 推送触发自动部署

## 技术选型

| 类别 | 选择 | 原因 |
| --- | --- | --- |
| 构建框架 | Astro v5 | 对 Markdown 支持原生最好，能最大程度复用原 HTML 模板 |
| 内容管理 | Content Collections + Zod | 类型安全，无需数据库 |
| 样式 | 沿用原 `main.css` | 直接复用，不重新设计 |
| 部署 | Netlify / CloudStudio | Git 集成、自动构建、HTTPS |

## 效果

- 首页 + 博客列表 + 作品列表 + 关于页 + 归档 + 详情页 全部跑通
- 顶部导航、移动端菜单、深色模式自动适配沿用原站样式
- 添加新博客只需在 `src/content/blog/` 下新建 `.md` 文件

## 后续优化

- [ ] 接入评论系统（Giscus / Twikoo）
- [ ] 增加搜索功能（Pagefind）
- [ ] 接入 Analytics（Umami / Plausible）
- [ ] 支持多语言（i18n）