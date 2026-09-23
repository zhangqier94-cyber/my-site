---
title: 使用 Netlify 托管个人网站
description: 从买域名到绑域名，一条路走完 Netlify 静态网站托管流程
pubDate: 2018-01-02
tags: ["前端", "工具", "Netlify"]
---

最近狠下心把域名买了下来，终于把一直想弄的[个人网站](https://www.Pudge1996.com)正式放上了互联网。一路摸索过来，其实也没多难。

通过 Netlify 托管个人网站需要准备材料：

- **域名** —— 建议在 [Namesilo](https://www.namesilo.com/) 购买，提供免费 WHOIS 隐私保护，而且使用优惠码 zs1np 可获得 1 美刀的优惠。
- **GitHub Repositories** —— 在仓库中准备好网站的文件
- **Netlify 账号** —— 我们会通过 [Netlify](https://app.netlify.com/) 托管 GitHub 中的文件以及绑定域名。

## 开始

首先用 GitHub 账号注册好 Netlify 之后点击「New site from git」开始：

![Netlify 新建站点](https://placeholder.example.com/netlify-new-site.png)

点击最左边的「GitHub」按钮，从 GitHub 中导入：

![从 GitHub 导入](https://placeholder.example.com/netlify-github.png)

然后选择相应的仓库，点击「Deploy site」按钮：

![部署站点](https://placeholder.example.com/netlify-deploy.png)

之后来到网站的控制面板，现在我们的网页已经可以在网上浏览了（点击上方绿色的网址），下一步我们要绑定域名，点击「Domain settings」：

![Domain settings](https://placeholder.example.com/netlify-domain.png)

进入 Domain settings 页面，点击「Add custom domain」按钮，输入自己的域名。

点击「Save」之后，系统已经自动为你添加有 A 和 CNAME 的记录：

![DNS 记录](https://placeholder.example.com/netlify-dns.png)

开始进行 DNS 配置。开一个域名的「Check DNS configuration」，点击下方的「Set up Netlify DNS for ...」，使用他们的 DNS 服务。然后按照提示复制这四个地址，到域名 DNS 服务商处粘贴。

等 DNS 解析生效之后，回到 Netlify 就能看到域名已经激活了。HTTPS 证书也会自动签发。

## 一点心得

Netlify 整个流程设计得非常顺滑，比手动配 Nginx + Let's Encrypt 节省了大量时间。最棒的是 Git push 之后会自动触发部署，每次写完博客 `git push` 一下就能上线，对我这种懒人非常友好。