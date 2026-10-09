---
title: "六个月，Anthropic 悄悄造了一台会自己工作的机器"
date: 2026-05-26
category: "AI 实践"
source_url: "https://mp.weixin.qq.com/s/6u3NGqS7yhUngVaRgZ2TCg"
source_account: "凌曦悦"
source_format: wechat_html_converted
---

这篇文章来自 X 上的一篇帖子，作者是 Guri Singh（@heygurisingh），发布于 2026 年 5 月 25 日。原帖链接：

https://x.com/heygurisingh/status/2058982410033991811?s=20[1]

我觉得值得翻译出来，因为讲的东西很实在，没有废话。以下是全文。

注：本文讲的是 Claude Cowork（企业 Agent 编排平台），不是 Claude Code CLI。

---

## Section I：Cowork 是什么

**产品发展时间线：**

<table><thead><tr><th>日期</th><th>事件</th></tr></thead><tbody><tr><td>2026-01-12</td><td>Cowork 以 research preview 身份在 macOS 上线</td></tr><tr><td>2026-02-13</td><td>Microsoft 365 统一连接器发布</td></tr><tr><td>2026-02-20</td><td>Excel 和 PowerPoint 插件上线</td></tr><tr><td>2026-02-24</td><td>定时任务（Recurring Scheduled Tasks）发布</td></tr><tr><td>2026-04-03</td><td>全面支持 Windows</td></tr><tr><td>2026-04-09</td><td>GA 发布，附带 6 个企业级功能</td></tr><tr><td>2026-04-14</td><td>Cloud Routines 进入 research preview</td></tr><tr><td>2026-05-11</td><td>Managed Agents 在 Code w/ Claude SF 发布</td></tr></tbody></table>

六个月内，Cowork 从 research preview 变成了导致 IBM、Salesforce、ServiceNow、Thomson Reuters 股价下跌的产品。

**四个 Managed Agents 原语（May 11 发布）：**

1. **Multi-Agent Orchestration** — 主 agent 把任务拆成片段，分发给专家 sub-agent，在共享文件系统上并行工作。Netflix 的 platform team 已在使用。

2. **Dreaming** — 定时进程回顾历史 agent session，提取规律，积累记忆。你的 agent 在你睡觉时变得更聪明。

3. **Outcomes** — 不写步骤，只指定目标。Claude 自己想步骤。

4. **Webhooks** — 外部系统触发 agent。一条 Slack 消息可以唤醒一个工作流，Google Sheet 新增一行可以启动一次分析。

用人话说：你停止写 prompt，开始定义结果。Claude 组建团队，运行项目。

---

## Section II：正确配置

90% 的人在第一个小时就放弃了，因为跳过了配置。

**Step 5（最重要，大多数人不知道）：**

开启 Computer Use（Pro/Max 专属）。

```
Settings → Cowork → Computer Use → On
```

截至 2026 年 4 月 GA，Pro 和 Max 用户在 Cowork 内获得了 computer use 能力。无需任何配置。Claude 现在可以打开文件、导航浏览器、点击、与屏幕自主交互。

Computer Use + Dispatch = Cowork 从"有趣的工具"变成"可部署的系统"。

---

## Section III：Plugin Marketplace

Plugin 是 Cowork 的秘密武器。

一个 plugin = 针对特定业务功能预配置好的完整 AI worker。它自带 skills、slash commands、MCP connectors 和 sub-agents，全部已经连好。你不用搭建任何东西，安装即部署。

---

## Section IV：Connectors

**每天在用的连接器：**

- Gmail / Outlook — 收件箱分类、起草回复、定时发送

- Google Calendar — 阻塞专注时间、安排定时任务

- Google Drive / OneDrive — 把源文件拉进任意工作流

- Slack — 自动总结频道、起草回复

- Notion — 读取知识库、更新数据库

- Zoom MCP — 拉取会议记录（2026-04-09 GA 随附）

- GitHub — 拉取 issue、起草 PR、扫描 changelog

**配置方式：**

```
Settings → Connectors → Add Connector → Authenticate
```

一旦连接器激活，任何 Cowork session 都可以使用，无需每次重新验证。

**进阶用法：组合连接器。**

一个定时任务，拉取昨日 Slack 线程 + 今早 Gmail + 明日日历 + Notion roadmap，每个工作日早 8 点写一份 5 分钟简报。这一个工作流每周节省约 4 小时。

---

## Section V：Scheduled Tasks & Dispatch

这是 Cowork 成为另一个类别工具的地方。

**Scheduled Tasks（2026-02-24 发布）：**

```
Cowork → Scheduled Tasks sidebar
```

配置一次，设定周期（每小时、每天、每周、仅工作日）。Claude 永远跑下去。每次运行都能完整访问文件、MCP servers、plugins 和 connectors。

**Cloud Routines（research preview，2026-04-14）：**

运行在 Anthropic 的云端——你的电脑可以关机、关盖、放在包里。这解决了桌面端调度的最大限制。

---

## Section VI：Multi-Agent Orchestration

2026-05-11 在 Code w/ Claude San Francisco 发布。详见 Section I 四个原语。

核心变化：你停止写 prompt，开始定义结果。Claude 建团队，跑项目。

---

## Section VII：7 个第一天就值回票价的工作流

**先做这些，停止读文章。**

**1. 早报简报**定时任务，每天 7am。拉取 Slack DM + Gmail 未读 + 今日日历 + 昨日 Notion 更新，写一份 5 段简报，存到桌面 Briefings 文件夹。 节省时间：每天 30-45 分钟

**2. 收件箱分诊**定时任务，工作时间每 2 小时。读取新邮件，分类（紧急 / FYI / 可以等 / 垃圾），给能处理的起草回复，其余排队等你。 节省时间：每天 1-2 小时

**3. 每周竞品扫描**Marketing plugin + 定时任务，每周一。爬取指定竞品网站和社交媒体，拉取价格变化、新产品发布、内容更新，写一份一页差异报告。 节省时间：每周 4-6 小时

**4. 表格自动更新**Excel 插件 + Drive 连接器。把 CSV 丢到一个文件夹，Claude 拉取、清洗、跑你的标准分析、更新主表、写一条 Slack 摘要。 节省时间：每周约 3 小时

**5. 内容复用引擎**自定义工作流。把一篇长文丢到文件夹，Claude 生成 X 开篇帖、封面图 prompt、5 条金句、LinkedIn 版本、newsletter 草稿、Substack 版本，分别保存为独立文件。 节省时间：每篇 2-3 小时

**6. 会议 → 行动项流水线**Zoom MCP + Productivity plugin。每份到达的会议记录自动被解析成行动项、负责人、截止日期，通过连接器发送到你的任务管理器。 节省时间：每次会议 30 分钟

**7. 收据归集器**定时任务，每周。从 Gmail 拉取所有收据，按税务类别分类，更新主电子表格，超过阈值的标记等你审核。 节省时间：每周 15 分钟（原本是极痛苦的报销流程）

---

## Section VIII：诚实的局限性

我不会骗你。Cowork 不是魔法。

**什么还会出问题：**

- **幻觉依然存在。** 如果你在不熟悉的领域不验证输出，你会满怀信心地部署一个错误的东西。

- **连接器缺口。** 目前没有原生 CRM，没有电商平台，没有 POS 系统。如果你的工作在 HubSpot 或 Shopify 里，你在等社区 MCP。

- **EU 数据驻留。** 仅限企业计划。

- **本地 MCP 风险。** Plugin 可以包含以你电脑权限运行的本地 MCP server。只安装你信任来源的 plugin。Anthropic 官方的是安全的，随机 GitHub plugin 不是。

- **"电脑需要开着"的限制。** 在 Cloud Routines 正式 GA 之前，定时任务需要你的机器保持运行。

- **成本上限。** Pro 上跑重度并行工作流会很快触达限制。如果认真用，预计需要升级到 Max（$100/月）。

Cowork 是市场上最强大的 AI 执行工具，同时也没有做完。这是诚实的评价。

---

## 作者的最后结论

Anthropic 花了 18 个月教 Claude 怎么思考，又花了 6 个月教 Claude 怎么工作。Cowork 是结果。

你买的不是聊天机器人订阅。你买的是劳动力——廉价、可扩展、越来越可靠的劳动力，它按时间表运行，使用你的工具，在你睡觉时产出结果。

还在把 AI 当聊天窗口用的公司，即将被超越。现在在搭 Cowork 工作流的人，正在悄悄地把每周节省的小时数，复利成每年追回的生产力月份。

股市已经注意到了。IBM 在一个交易日内跌了 13.2%。ServiceNow、Salesforce、Snowflake、Thomson Reuters 在 1 月 research preview 之后的几周内都受到了冲击。

市场在告诉你正在发生什么。听进去。

---

以上是原帖全文翻译。如果你想深入了解某个具体功能，欢迎留言。

原帖作者：Guri Singh @heygurisingh 原帖链接：

https://x.com/heygurisingh/status/2058982410033991811?s=20[1]

#### References

1. https://x.com/heygurisingh/status/2058982410033991811?s=20
