---
title: APP AI助手项目
description: 语音助手交互实战
pubDate: 2026-09-23
tags:
  - 项目实战
---

**引言**

随着GPT-4o的横空出世，极大地拓展了人与机器之间的互动可能性。与AI对话，让AI服务于用户，成为一种新的交互范式。由此，淘宝融入语音技术与AI Agent能力，在搜索场景下拓展淘内场景化服务，把原语音搜的单一工具升级为语音助手，为用户提供更自然、更高效的购物交互体验。

  

![图片](https://mmbiz.qpic.cn/mmbiz_gif/wmHsWeibDlwPrrkUzdldNeMnnVibVibTgUqY53uOAibEl5HkzBkbod4ic2RPH21pzxiaxWCEEiadmra4TD1GYfwZkvAEQ/640?wx_fmt=gif&from=appmsg&wxfrom=5&tp=wxpic&wx_lazy=1#imgIndex=1)

▲全新版本淘宝语音搜即将上线

**#01**

**从GUI到VUI**

**基于意图的新交互范式**

自1984年Macintosh推出以来，GUI（Graphical User Interface，图形用户界面）一直主导着UX世界，用户与产品系统通过图形界面进行交互，每执行一个操作指令后，界面会返回任务状态或下一步任务，用户可以不断执行操作完成期望目标。在这种交互中，用户可借助图形元素（如按钮、图标、卡片、弹窗等）理解信息组织，并进行滑动、点击等操作向产品系统传递“命令”，是一种类似早期CLI （Command Line Internface，计算机命令行）的交互范式。它有着可视化、易交互、用户友好的优点，成为我们40年来内最主要的人机交互方式。

  

随着语音识别技术的迅猛发展和AI人工智能技术的普及，使得新的交互范式——VUI（Voice User Interface，语音用户界面）逐渐崭露头角。2011年, Siri作为iPhone 4S的一项新特性正式推出，标志着语音助手技术的开始广泛应用。当我们希望查询天气，不再需要找到天气App并点开它，而是可以直接说“嘿Siri，明天天气怎么样？”。

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/wmHsWeibDlwPrrkUzdldNeMnnVibVibTgUqibeCYyXB7MdvFQrxzpRRbNEq4MGPTicibDSU9OiahknNnic2QHbA8Xgk92Q/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=wxpic#imgIndex=2)

▲交互范式革新

  

这种新的交互范式，是一种基于“意图”的交互范式。它不再依赖于用户在界面上一步一步执行“命令”，仅仅需要用户“说”出想要达成的结果，系统通过NLP（Natural Language Processing，自然语言处理）、机器学习或模式识别并给出相应的意图承接方案。与传统的基于命令的交互相比， 基于意图的VUI新增了语音交互，也仍然保留了GUI的元素，是一种声音混合图像的综合交互方式。

  

**#02**

**意图获取**

**自然的多轮对话**

VUI与GUI相比，最大的差异在于输入方式。其显著特性是“解放了双手”，在获取信息时可以用最自然的语言进行沟通。虽然人类天生擅长语言沟通，但在产品交互中描述要达成的结果，可能需要多轮对话交互。在与AI对话的过程中，产品需要先通过ASR（Automatic Speech Recognition，自动语音识别）获取用户意图，完成意图识别与处理后通过TTS（Text to Speech，文本转语音）回复用户，以此完成“听”与“说”的交互。

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/wmHsWeibDlwPrrkUzdldNeMnnVibVibTgUqBu8KmOzSGmDwWg7UCOAiagkmdX3Mric8oUcYVQFXXt3nPiaqolpSdXISQ/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=wxpic#imgIndex=3)

▲ASR与TTS

  

在GPT-4o的互动中，AI通过实时识别与处理、优先级管理与自然语言处理能力，可以让用户随时打断或改变话题，就像与人对话一样连续流畅。但目前大多数语言模型是基于序列生成的方式来回答问题，这意味着它们通常需要接收完整的输入才能产生输出。打断对话需要即时反应和状态切换，同时需要模型具备快速的理解和处理能力，这在当前的模型设计中尚未完全实现。

  

真实用户语音输入需求有随机、不确定及多样化的特点，让用户自然简单地与AI对话，ASR与TTS的状态切换至关重要。

  

声音无色无形，在VUI中需要一个用户输入及AI输出的媒介中枢，以及一套明确的交互机制应对复杂的用户场景，使声音交互符合用户自然对话的方式和习惯。

- 状态外化：媒介中枢为用户熟悉的产品化操作按钮。结合图像、色彩和文字提示，将AI唤醒、交互、识别、输出及静默的状态外化，给用户更明确的视觉反馈与操作引导，让单轮对话的体验更顺畅。
    
- 场景切换：根据对话场景确定初始状态。如唤起浮层时自动开启ASR获取用户需求，在Copilot形态下静默，不打断用户的SRP浏览心流。
    

  

![图片](https://mmbiz.qpic.cn/mmbiz_gif/wmHsWeibDlwNIDGFm3o7cGCflprjKe3xWx1mShLKJSAb6DRPMdVTXEId7ccn30Lcz78nzDpicnmLgLEcwicdU3cyw/640?wx_fmt=gif&from=appmsg&wxfrom=5&wx_lazy=1&tp=wxpic#imgIndex=4)

▲语音交互状态外化

  

![图片](https://mmbiz.qpic.cn/mmbiz_gif/wmHsWeibDlwNIDGFm3o7cGCflprjKe3xWYuib6yNYeYYH5MGRo4iaSpwpYF4ukRbPpdq6N6A5GFcEaRxhzNWglM1A/640?wx_fmt=gif&from=appmsg&wxfrom=5&wx_lazy=1&tp=wxpic#imgIndex=5)

▲Copilot切换

**#03**

**意图承接**

**灵活的产品形态**

AI的介入带来的不仅是多轮对话的能力，而是在对话中不断明确用户意图，更好地进行需求承接。用户需求场景的不同，面向用户的产品形态也不同。在新版语音搜中，用户输入语音后，交互并没有结束，通过不同形态的产品框架发挥多轮交互优势。

- 基础形态：轻浮层拉起即唤醒，聚焦于语音交互。
    
- mini形态：以Copilot的形式从旁协助用户，在未有指令前静默，不打扰用户主流程体验。
    
- 拓展形态：兼容widget组件，承接操作或结果型需求，任务完成后继续语音更顺畅。
    
      
    

![图片](https://mmbiz.qpic.cn/mmbiz_gif/wmHsWeibDlwNIDGFm3o7cGCflprjKe3xW6XibSekAHqAmoYZj6Wp4UpicJd4piboviczL0b0r7FMAaBhFa2ichIWLibIA/640?wx_fmt=gif&from=appmsg&wxfrom=5&wx_lazy=1&tp=wxpic#imgIndex=6)

▲产品形态变化

  

同时，在VUI中语音和图形界面应该是相互补充，但不重复的。在多样的需求场景中，为保证淘内复杂业务场景下交互的流畅性与可拓展性，我们确定了语音与图形界面交互的基本原则。

- 灵活自主： 支持声音、视觉双通道交互。用户自由选择交互方式，支持更灵活的使用场景。在AI输出过程中，用户可以通过图形界面给出反馈，减少声音输出于视觉输入的滞后性。
    
- 各有主次：二者各司其职，各有主次。语音负责意图收敛、操作引导等反馈，图形界面负责展示详细信息及提供视觉确认。
    
- 简单直接：将用户任务拆解，非核心操作由AI代理，减低用户操作成本；关键操作由用户决策，避免意图理解错误导致的负向体验。
    

  

基于以上体验原则，淘内各个业务可根据自身使用场景，将原GUI链路转化为的VUI链路，为用户提供更自然友好的服务体验。


**#04**

**双重感官**

**丰富的声音人格化**

为了更加还原人类的自然对话，我们对声音进行了人格化设计。人格化不仅包含音色音调、语速节奏、说话方式及其他声音元素特征，还包含年龄、MBTI、风格、兴趣爱好等多元特征，以便在与用户互动时能够传达出一致的性格形象和情感体验。

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/wmHsWeibDlwPrrkUzdldNeMnnVibVibTgUqcOaxLs7tnWpTALumSU4JCiaM6kpfwwyQPvLLK4SHMKtG39WRJUqdDMA/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=wxpic#imgIndex=7)

▲声音细节设计

  

声音人格化的设计不仅使得人与AI的交互更具吸引力，还能在一定程度上提升用户的使用体验。

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/wmHsWeibDlwPrrkUzdldNeMnnVibVibTgUqfRLZWSX9pKKeyuiaoJcjkdJRl3jLaLykITj8PgpJpvyMhV3XPHPNKxQ/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=wxpic#imgIndex=8)

▲声音人格化设计

  

通过将不同的声音特质与具体的人物形象相结合，不仅赋予了用户与AI互动时的情感温度，也让AI能够在不同的情境中展现出更高的适应性和灵活性。

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/wmHsWeibDlwPrrkUzdldNeMnnVibVibTgUq8bib3NvK8Pc2kcFuYAh7TX9icuDCd98qcvSf9sSlebYX9MLPoibicheK3g/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=wxpic#imgIndex=9)

▲小淘声音的人格化设定

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/wmHsWeibDlwPrrkUzdldNeMnnVibVibTgUqaomqC6GuicE4nS5SIqN8vggOqce1GGAGXT7Rxze0foF2AK7ZGeIFcLQ/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=wxpic#imgIndex=10)

▲小淘声音的情绪设定

  

通过人格化的设计，将虚幻的AI助手拓展成生动丰富的“伙伴”，可以满足不同用户的期望和需求，提供更个性化的服务体验。  

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/wmHsWeibDlwPrrkUzdldNeMnnVibVibTgUq015CZJLGh2UxOH3SyHl6X6Mp0jeqnwFy61ibic0Ea9yM53Qh1nbibY7Vw/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=wxpic#imgIndex=11)

▲小天声音的人格化设定

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/wmHsWeibDlwPrrkUzdldNeMnnVibVibTgUqgGNvT867OVkBJxCChMYAPOHo9we2V1Kjogfao63FMKMfBLSib4du4Fg/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=wxpic#imgIndex=12)

▲小天声音的情绪设定

  

**结语**

从最初的GUI到如今的VUI，人与AI的互动方式正在革新。通过多轮交互的和精准的意图承接能力，AI不再仅仅是工具，而是用户生活中不可或缺的智能伙伴。相信在不久的明天，随着AI能力的提升和用户平台数据的整合，传统的人找品的匹配模式将被彻底革新，在货架电商和内容化推品之外衍生出全新的商品&内容&服务组合模式，VUI将进一步演变为多模态意图输入的综合交互形式，为用户提供更精彩的购物体验。