---
title: "同样是用 Claude Code，我现在劝你放弃 Markdown 换 HTML"
date: 2026-05-26
category: "AI 实践"
source_url: "https://mp.weixin.qq.com/s/xztoXhVv9RyD2ZNnkTPfCA"
source_account: "凌曦悦"
source_format: wechat_html_converted
---

![同样是用 Claude Code，我现在劝你放弃 Markdown 换 HTML · 配图 1](/img/wechat/xztoXhVv9RyD2ZNnkTPfCA/01.png)

今天我想邀请大家做一件事：以后用 Claude Code 时，把输出格式从 Markdown 改成 HTML。

就这一个改变，你和 AI 协作的效率会直接上一个台阶。

省流版：

· 信息密度远高于 Markdown，表格、SVG、交互控件全能嵌进去

· 超 100 行的 Markdown 几乎读不下去，HTML 有视觉层级，读起来流畅 · HTML 文件上传发链接，同事直接打开，比 .md 附件方便多了

· 支持滑块等交互控件，实时调参再导出，这是 Markdown 做不到的

· Claude Code 能吃进 Slack、git 历史、本地文件系统，HTML 才配得上这些上下文

## 为什么是现在？

Anthropic 官方 Claude Code 团队成员 Thariq Shihipar 上个月刚发了一篇文章，专门讲这件事。发布当天获得 1350 万次浏览。

同一天，Django 联合创始人、全球最活跃的 LLM 独立研究者之一 Simon Willison 也做了评论，并亲自测试验证了这个方法。两位在同一天给出同样的结论，这个信号不容忽视。

## HTML 到底强在哪？

Markdown 的天花板就是纯文本格式。它能做标题、加粗、代码块，仅此而已。但 HTML 能做的事情要丰富得多。

用 SVG 可以直接画流程图和架构图。用 CSS 做视觉分层和颜色区分。用 table 呈现多维对比数据。用 JavaScript 做可点击的交互控件，甚至内嵌实时调节滑块。用 canvas 呈现空间布局数据。

同样是一份技术调研报告，Markdown 版本是一墙文字，HTML 版本是一个可以点击、可以导航、可以折叠展开、还能直接发链接的网页。这不是同一个量级的东西。

作者 Thariq 坦言，超过 100 行的 Markdown 他几乎读不下去。换成 HTML 之后，同样的信息量，他能一次读完。

## Token 成本会不会变高？

这个问题很多人会问。答案是：不会有实质影响。在现在的百万级 Token 上下文窗口里，HTML 和 Markdown 的 Token 差异可以忽略不计。可读性的提升远比这点开销值得。

Thariq 自己已经几乎完全放弃了 Markdown。他说自己站在 HTML 最大主义的极端。

![同样是用 Claude Code，我现在劝你放弃 Markdown 换 HTML · 配图 2](/img/wechat/xztoXhVv9RyD2ZNnkTPfCA/02.png)

## 我是怎么用这个方法的呢？

以前每次让 Claude Code 做技术调研，收到的是一大堆 Markdown，看到一半就没耐心了，信息密度太低，视觉上毫无节奏。

后来我只改了一句话，在提示词里加上：生成一个 HTML 文件。结果完全不一样了。有 Tab 页切换，有 SVG 流程图，有可折叠的代码块，整个报告一次能读完，还能直接发链接给同事。

Thariq 在 Anthropic 内部就是这么做的。他为了写关于 Prompt Caching 演进历程的文章，让 Claude 读完整个 git 历史，生成了一份深度研究 HTML 文件。所有的变更脉络、关键决策，全部视觉化呈现在一个页面里，清晰到不需要任何额外解释。

## 五个场景，照着用就行

写技术规划时，不要再写单一的 Markdown 计划文件了。让 Claude Code 生成一组 HTML 文件：先做多种方案的探索页，再深入展开某一方向，做出 mockup 和数据流图，最后输出实施计划。下次开新 Session 时，把这些文件一起传进去让 Claude 执行。

提示词可以这样写：制作一个 HTML 文件，包含详细的实施计划，要有 mockup、数据流图和关键代码片段，方便我审阅。

做代码审查时，让 Claude Code 生成 HTML 版本的 diff，内联注释，按严重程度用颜色标注，附上视觉流程图。复杂的 PR，一眼就能看清楚问题在哪里。提示词很简单：帮我审查这个 PR，生成一个 HTML artifact，描述它的内容。

做研究报告时，把 Slack 记录、代码库、git 历史一起喂给 Claude Code，让它输出带 SVG 图解的分析页面。信息来源越丰富，HTML 输出的价值就越高，因为它能把这些异构数据整合成一个可读的整体。

做设计原型时，HTML 本身就是画布。可以做动画，可以做组件，甚至可以内嵌实时调节滑块，调好参数之后直接导出给提示词。这是 Markdown 根本没有的能力。

还有一种用法是自定义编辑界面。跨列拖拽工单、带实时预览的 System Prompt 调节器、功能开关的可视化配置页面，这些都可以用 HTML 定制成一次性工具，用完即弃，但效率极高。

## Simon Willison 的亲测结果

Simon Willison 看完 Thariq 的文章之后，当天就去做了测试。他拿了一段真实的 Linux 安全漏洞代码（一段混淆过的 Python 概念验证），让大模型生成 HTML 解释，要求是：详细解释代码，展开混淆部分，深入讲清楚它做了什么、怎么做到的，用 HTML 输出，排版精良，充分利用 HTML、CSS 和 JavaScript 的能力，让解释尽可能丰富、有交互性、清晰易懂。

生成的 HTML 页面有高层级摘要、分步骤拆解、模式分析表格、高亮的安全警告标注。他的评价是：效果相当不错，唯一的遗憾是应该更多强调漏洞本身，而不是围绕它的 Python 测试框架。

这个实验说明什么？HTML 输出格式不只适合 Claude，对任何大模型都有效。这是一个方法论，不是产品绑定。

![同样是用 Claude Code，我现在劝你放弃 Markdown 换 HTML · 配图 3](/img/wechat/xztoXhVv9RyD2ZNnkTPfCA/03.png)

如果你同时在用 Markdown 和 HTML，什么时候考虑完全切换？现在就可以。提示词里多加五个字：生成一个 HTML 文件。

如果过段时间有更好的方式出现，我会告诉你们的。

赶快去试试吧！期待你回来留言反馈！
