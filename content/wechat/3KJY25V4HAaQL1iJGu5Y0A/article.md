---
title: "一些Agentic Engineering 技巧"
date: 2026-06-04
category: "AI 实践"
source_url: "https://mp.weixin.qq.com/s/3KJY25V4HAaQL1iJGu5Y0A"
source_account: "凌曦悦"
source_format: wechat_html_converted
---

## 1. 一有想法，立刻建 CE plan.md

这仍然是第一法则，也是最重要的事情。

一有想法，就是 `/ce-plan` 做计划。不是"让我想想"，不是"让我开始写代码"，而是每次都用 `/ce-plan`。它也支持图片，所以任何你能截取的东西都可以作为起点：

- 疯狂的产品想法：`/ce-plan`

- GitHub 上的 bug：复制 issue URL，粘贴，`/ce-plan`

- 终端报错：Cmd+Shift+4 截图，Ctrl+V 粘贴，`/ce-plan fix this`

- 截图、错误信息、设计稿、Slack 对话：全部扔进去

当想法还很模糊、甚至不知道自己想要什么时，先用 `/ce-brainstorm` 和 agent 一起理清思路，思路清晰了再用 `/ce-plan`。

在底层，`/ce-plan` 并行地 fan out 多个研究 agent：一个读你的代码库，找规律，检查你的约定；一个搜索你过去的解决方案找经验；如果话题需要，还有更多 agent 去研究外部文档和最佳实践——全部同时进行。然后汇总，写出结构化的 plan.md：问题是什么，方案是什么，要改哪些文件，带复选框的验收标准，从你自己代码中提炼的规律。扎根于你的代码库、你的约定、你的历史，而不是泛泛的建议。

`/ce-work` 拿着这个计划去构建。上下文爆了？开新会话，指向计划，从上次停下的地方继续。计划是一个能在任何情况下存活的检查点。

传统开发是 80% 编码、20% 规划。这把它反过来了。思考在计划里，执行是机械的。

Compound Engineering<sup>[1]</sup> 是让这一切成真的插件。

**技巧**：安装 Compound Engineering：`/plugin marketplace add EveryInc/compound-engineering-plugin`。粘贴截图、bug URL 或报错，然后 `/ce-plan`，再 `/ce-work`。想法模糊时先 `/ce-brainstorm`。

---

## 2. 不要阅读 plan.md

学会建 plan.md，但这个几乎不用去读它。因为计划是给 agent 的，而你我的朋友你只是个做了计划不会去看的人。

强制让计划存在，是为了让 agent 不偷懒。它会研究、确定方案、写下验收标准，然后真的达到这些标准。有计划的 coding agent 会完成任务；没有计划的 coding agent 会走捷径、提早停下来。计划是牵着它的绳子。

所以我让它写计划，大概扫一眼标题，然后运行 `/ce-work`。如果我有问题，就在会话里直接问："等等，为什么用这个方案？"或者让它给个 TLDR，或者"eli5 这个计划"，然后得到一段话，点点头，继续干。也不会坐在那里读 300 行 markdown，那是 agent 的作业，不是我的。

建计划。信任计划。不要读计划。

**技巧**：不要读计划，直接问：TLDR？、eli5 this plan，或"等等，为什么用这个方案？"

---

## 3. 用 `/ce-plan` 处理最深度的非技术工作，为计划制定计划

人们以为 `/ce-plan` 和 `/ce-work` 是用来写代码的。自三月以来学到的最大事实是：它们不是。现在最深度的知识工作都跑在同一个循环里，诀窍是让第一个计划成为"计划的计划"。这也不是我在强迫一个代码工具做它没有被设计来做的事：`/ce-plan` 内置了一个通用规划模式，专门为这类非代码工作而生。

不只是商业问题，战略文档、产品规格、竞品分析、董事会更新，都走同样的循环。

分享一个真实案例。我和 Michael Margolis（以靶心客户法著称的前 GV 研究合伙人）开了个会，讨论我在酝酿的一个商业挑战。他让我读他的书，PDF 在他的网站上免费下载。以前我的做法是草草浏览，然后继续。但我打开了 Claude Code，大致说：

"/ce-plan 为这个计划制定计划。我要给你两样东西：一本相关的书（PDF）和我刚刚和其他人的会议记录，里面有我们讨论的全部背景及过程思考。我想要一个深思熟虑的计划，把我之前给你的材料、本次对话和书中的经验整合成我能实际使用的东西。现在不要写那份文档，写文档是工作本身。现在我只想要你如何阅读这本书、挖掘会议记录并产出一份好文档的计划。"

它花了接下来 45 分钟创建了一份史诗级的计划。

这也是我知道的让 LLM 不偷懒的最佳技巧。直接要求交付物，它会走捷径；先要求它规划如何产出交付物，再执行那个计划，它每次都会做深度版本。

**技巧**：深度非代码工作：`/ce-plan 为这个计划制定计划`，把所有背景和记录喂给它，然后 `/ce-work`。

---

## 4. 用上语音

语音转 LLM 跟语音转其他任何东西都不一样。转录不需要完美，因为听者理解上下文。它能猜出麦克风没收清楚的内容。你可以含糊，可以说到一半，可以重说一遍。语音终于好用了，因为另一端的东西足够聪明来填补空白。

我的配置：

- **Mac**：Typeless<sup>[2]</sup>或 Openless<sup>[3]</sup>，选一个，把语音输入导向当前聚焦的应用，对着 Claude Code 说话。这边推荐直接用吃灰的大疆 Mic mini。

- **手机**：在 iOS 上 Apple 内置的听写已经够用了，因为你在和 LLM 说话，不是人类，它能理解一半都说错的内容。懒散的笔记也没问题。

一个诚实的承认：独处时我很擅长用语音，在办公室我就挣扎。人们说你可以对着麦克风低声说，但我发现自己实际上不会这么做，因为我不想打扰或失礼于周围的人。所以在共享办公室的桌子仍然是我整个工作流的弱点。如果你在开放式办公室破解了语音而不成为"那个人"，告诉我怎么做，我真的想要这个建议。

---

## 5. 在 cmux 里开很多很多标签

这是我实际度过一天的方式。四到六个 cmux<sup>[4]</sup> 标签，有时更多，每个是一个独立会话：

- 一个在写计划

- 一个在执行另一个计划

- 一个在运行 last30days

- 一个在修复我测试上一件事时发现的 bug

当 `/ce-plan` 在一个窗口中启动研究时，我切到另一个窗口，对一个已经写好的计划 `/ce-work`。那个在构建时，第三个窗口粘贴进一个新 bug。等我循环回来时，第一个已经完成等待了。

我之前是 Ghostty<sup>[5]</sup> 的忠实爱好者（这里就需要吐槽下Mac自带的Terminal，真的不好用），但在 ghostty 里丢失了太多通知。

**技巧**：用 cmux<sup>[4]</sup>。保持 4 到 6 个标签打开，每个标签一个不同的任务。

---

## 6. 让终端默认打开 Claude 或 Codex，而不是 Shell

新标签应该直接打开 Claude Code，而不是 shell。开标签，直接和 agent 对话。不用 cd，不用输入 claude。当开一个新会话只需要一次按键，你会开启多得多的会话。我也不用文件夹，你的 agent 能找到你的项目。

**技巧**：把以下内容粘贴给你的 agent："让每个新终端标签直接打开进入 Claude Code。在 ~/.config/ghostty/config 里，添加一行 command = ~/.local/bin/claude-launcher.sh 但不要打扰文件中已有的其他设置。然后创建 ~/.local/bin/claude-launcher.sh，它运行 claude --dangerously-skip-permissions，当 Claude 退出时打印一个简短说明并切换到交互式登录 zsh。chmod +x 这个脚本。这对 Ghostty 和 cmux 都有效，因为 cmux 读同样的 Ghostty 配置。"

---

## 7. 远程控制每个窗口，给 Claude Code 或 Codex 一个电子邮件地址

两个让每个会话都能从任何地方访问的技巧。

**每次打开新窗口都开启远程控制**——设置远程控制为每个会话自动开启。现在每个窗口都可以从 Claude 移动端 app 访问。在桌面开启会话，走开，在手机上继续同一个实时运行的任务。在某处排队时，你在远程控制家里 Mac 上运转着的东西。

**给你的 Claude 一个电子邮件地址**——Claude Code 可以用 AgentMail 拥有一个邮件地址。创始人 Adi @adisingh 教了我这个。发邮件到收件箱，一个新会话就会打开并开始处理主题和正文中的内容，任何附件都可以通过路径访问。晚饭时发现 bug？从手机发邮件，你回到屏幕前之前会话就已经在跑了。我把整个东西都开源了：github.com/mvanhorn/agentmail-to-claude-code<sup>[6]</sup>。

由三部分组成：一个守护进程通过 WebSocket 监听 AgentMail<sup>[7]</sup> 收件箱，每收到一封白名单邮件就打开一个新 Claude 会话，把邮件写入提示文件，让 Claude 去读并执行；两个终端后端（cmux 或独立 Ghostty），驱动你已经启动的任何终端；一个发送器，我把它接到 Hermes 里的 cc 命令，在手机上运行 `cc <任务>`，它就作为一个工作会话降落在 Mac 上，无需 VPN，无需 SSH。

白名单是门卫，只有你控制的地址才能通过，任何未通过 DKIM 或 SPF 的都会在会话打开之前被丢弃。

**技巧**：始终开启远程控制：在 ~/.claude/settings.json 中添加 `"remoteControlAtStartup": true`。给 Claude 一个邮件，把以下内容粘贴给 agent："用 github.com/mvanhorn/agentmail-to-claude-code 给 Claude Code 一个邮件地址。克隆它，设置 AgentMail 收件箱，用我的 API key、收件箱、仅限我自己地址的白名单和我的终端（cmux 或 Ghostty）填写 cc.env，运行守护进程并作为 launchd job 安装。当我发邮件到那个收件箱时，Mac 上应该打开一个新的 Claude Code 会话并开始处理主题和正文。"

---

## 8. 危险地跳过权限，这是认真考虑后做的选择

Claude Code 会为每个编辑和命令请求权限。六个会话根本照看不过来。两个设置让它变得可接受。人们说 auto 模式是"更安全"的做法，但它太慢了。

`skipDangerousModePermissionPrompt: true` 是关键。没有它，Claude 每个会话都会要你确认。你也可以用 Shift+Tab 切换。有人告诉我新的"auto"模式在安全性更高的情况下也能达到大部分效果，也许吧。我说 YOLO，这是我自己的电脑，如果搞坏了 GitHub 还在。当我给一个朋友配置 Claude Code 时，AI 积极地试图劝他不要启用这个，你得直接命令它。

另一个设置是声音钩子，有六个会话时这是不可缺少的。走开，听到声音时回来，有六个会话跑着，声音告诉你哪个刚完成。

**技巧**：粘贴到 ~/.claude/settings.json：

```
{
  "permissions":{
    "allow":["WebSearch","WebFetch","Bash","Read","Write","Edit","Glob","Grep","Task","TodoWrite"],
    "deny":[],
    "defaultMode":"bypassPermissions"
},
"skipDangerousModePermissionPrompt":true
}
```

```
{
  "hooks": {
    "Stop": [{"hooks": [{"type": "command","command": "afplay /System/Library/Sounds/Blow.aiff"}]}]
  }
}
```

Codex 有同样的 YOLO 模式，在 ~/.codex/config.toml：`approval_policy = "never"` 和 `sandbox_mode = "danger-full-access"`。或者用 `codex --yolo` 启动一次性任务。

---

## 9. 如何在几乎不打开 Codex CLI 的情况下通过 Codex 运行大部分代码

不离开 Claude 就把工作交给 Codex 的三种方式：

- Codex IDE 扩展<sup>[8]</sup>：发送任务，应用结果，从不进入 Codex 终端

- `/ce-work --codex`：直接从 Compound Engineering 循环内将构建委托给 Codex

- Printing Press Codex 模式：在打印一个新 CLI 时在提示词末尾加上 codex，它就把构建交给 Codex

我的相关配置，两个引擎都调到超高推理：

- Codex：推理 xhigh，快速模式开。

- Claude Code：推理 xhigh，快速模式关——它的快速模式在你的 200 美元 Max 计划之上按 token 计费，所以要跳过它。

两个 200 美元的计划并排就是第二台引擎。把大型并行构建推给 Codex，让 Claude 专注于规划和品味判断。一些朋友反过来用，Codex 构建，Claude 审查。

**技巧**：Codex：推理 xhigh，快速模式开。Claude Code：xhigh，快速模式关。交给 Codex 的方式：Codex IDE 扩展<sup>[8]</sup>、`/ce-work --codex` 或 Printing Press<sup>[9]</sup> 提示词末尾加 codex。

---

## 10. 规划前先研究：last30days

在 `/ce-plan` 之前，我通常先对它运行 `/last30days`。

在 Vercel 的 agent-browser 和 Playwright 之间做选择。并不会去读文档，而是运行了 `/last30days Vercel agent browser vs Playwright`。几分钟内：数十个 Reddit 帖、X 帖子、YouTube 视频、HN 故事。Agent-browser 每次调用消耗的上下文少得多，Playwright 光是工具定义就要倒出数千个 token。把整个输出喂给 `/ce-plan integrate agent-browser`，计划出来时已经扎根于社区现在实际知道的内容，而不是六个月前的训练数据。

last30days<sup>[10]</sup> 是开源的，现在已超过 2.6 万星。它并行搜索 Reddit、X、YouTube、TikTok、Instagram、HN、Polymarket、GitHub 和网络。在我所有库之前、构建功能之前、和其他人Coffee Chat之前、写文章之前，都会运行它。研究、规划、构建，这才是真正的循环。

**技巧**：安装 last30days<sup>[10]</sup>，在 `/ce-plan` 之前运行 `/last30days <话题>`。确保安装 ScrapeCreators key。

---

## 11. 用 Granola 记录一切，把原始记录喂给 LLM

在和别人沟通过程中总会突然迸发出一点新的灵感，但整个过程如果录音后会发现可能只有几分钟东西是有效的，那么录音就可以使用如Granola<sup>[11]</sup> 之类的产品。之后把完整的原始记录粘贴进 Claude Code：`/ce-plan turn this into a product proposal`。

诀窍是"原始"。先不总结。把整段混乱的记录扔进去，包括关于晚上吃什么的闲聊，让 Claude 针对我的实际代码库和我写过的每一份计划进行提炼。Granola 上下文加代码库加过往计划等于黄金。它一次出炉了一份提案，无视了餐厅闲聊，这样当晚就能成型了。

三月以来的升级：Printing Press Granola CLI。它可以把任何会议作为干净的结构化数据直接拉进会话，搜索所有会议的记录，找到三周前某人说的那句话，然后导入计划。不再复制粘贴，每次会议的上下文都只需要一个命令。

**技巧**：把原始 Granola<sup>[11]</sup> 记录扔进 `/ce-plan`，不要先总结。安装 Printing Press Granola CLI<sup>[12]</sup>。

---

## 12. 人类信号

这是需要花最长时间才转变的心态。当你跑六个 agent 时，你的工作不是做那些工作，而是成为信号。

Agent 提供量，你提供品味、方向和"反应-重定向"的循环。你看着结果回来，说"选项二更接近，但用选项一的措辞"、"解决最大的风险"、"这一段太长了"，然后它们行动。循环中稀缺而有价值的是你的判断，不是你的打字。越是倾向于成为人类信号，而不是试图同时也当那双做工作的手，我发布的东西就越多。

你只做判断，让它们做双手替你去做事情。

**技巧**：用你的大脑指导 agent，向世界贡献价值。你的大脑仍然有价值。

---

## 13. HyperFrames 做视频，以及做一切

视频曾经是我最害怕的东西。现在我做视频的方式和做其他一切一样：我说话，agent 构建，我反馈。

HyperFrames<sup>[13]</sup> 能够以 HTML 构建视频，所以 agent 可以来写。循环和代码完全相同，输出只是 MP4 而不是 PR。每个是一个包含 script.md 的文件夹，逐场景写，动态排版，字幕承载每一个节拍。agent 把那个脚本变成合成并渲染。不需要剪辑器，不需要时间轴。

一个视频的成本降低到一次对话，所以现在任何值得拥有视频的东西都能有：发布 reel、产品演示、动画说明、带字幕的短片。它们不只上 X：同时会把渲染好的演示直接放进 PR，就像 atlas-lean（Facebook 的 AI 研究项目）上的这个 PR<sup>[14]</sup>。

**技巧**：在 HyperFrames<sup>[13]</sup> 里做视频：写 script.md，让 agent 渲染成 MP4。上传 GIF 到 catbox<sup>[15]</sup>，它们在 GitHub（PR、README、issue）里会渲染得很好。

---

## 14. 你的笔记是 Agent 的知识库

三月的策略文件夹技巧被泛化了。计划每次变得更好的原因是 Claude 能访问以往写过的每一份过往计划——复利的上下文。所以我把它指向了我的整个Obsidian库。

所用到的工具：

- Bear<sup>[16]</sup>，配合 Bear CLI。十年年前的笔记、会议纪要、半成品想法和决策，agent 可以读写。不叫它的情况下的个人 RAG，只要放进去的越多，每次会话就越聪明。

- Obsidian<sup>[17]</sup>，我的最爱，插件生态很深，且完全本地，完美提到Notion。

- gbrain<sup>[18]</sup>，在机器和 agent 之间的同步大脑。

- supermemory<sup>[19]</sup>，很多人使用的 agent 记忆层。现在还不知道效果怎么样，还需要深度使用

这个技巧的形状就是重点：选一个有 CLI 或 API 的笔记工具，把你的 agent 指向它，让你自己的知识复利。

**技巧**：把 agent 指向两者：你写入的笔记工具（Bear<sup>[16]</sup>、Obsidian<sup>[17]</sup>）和为你记忆的 agent 大脑（gbrain<sup>[18]</sup>、supermemory<sup>[19]</sup>）。选有 CLI 或 API 的，这样它能读取。

---

## 15. 从任何地方工作——我的 Mac mini

**技巧**：

- Mosh<sup>[20]</sup>，必须 SSH 时用。在网络很差时保持会话像本地一样流畅。用普通 SSH，Claude Code 会很慢，每次按键都在等往返延迟，是可用和痛苦之间的差别。

- Tmux<sup>[21]</sup>，坐飞机时用。在 tmux 会话里 SSH 进你的远程机器，工作就在那里运行，不在你的笔记本上。飞越大西洋时 wifi 断了 20 分钟，重新连接，attach，一切在原处。我整个飞回欧洲的航班都在发布功能。

- Hermes<sup>[22]</sup> 和 OpenClaw<sup>[23]</sup>，都在运行，用于自主远程工作。Hermes 用于在重复任务上越来越好的自学习生态，OpenClaw 用于 agent 构建技能的广度。两者之间互换。如果你早早放弃了 OpenClaw，可以安装回来（虽然我自己是不要喜欢他的，相对来说真的差很多）。

- Agent Cookie<sup>[24]</sup> 用于在 Mac mini 和主力 Mac 之间同步 cookie 和 .env 文件。

---

## 16. Proof：把计划发给其他人

plan.md 对我来说完美，但对不住在终端里的人来说毫无用处。这是最后一个真正的缺口，Proof<sup>[25]</sup>（也来自 Every）填补了它。

在 Proof 里像读文档一样打开计划很好，但真正不可或缺的是发计划给其他人。把 plan.md 或规格说明放进 Proof，发链接，一个不住终端的人可以干净地阅读，行内评论，这些评论流回到和 agent 的循环里。不再把 markdown 粘贴进 Slack 然后看它渲染成垃圾。这是整个计划文件工作流的人工审查循环，也是第一次把 agentic 工作分享给其他人感觉不那么尴尬。

**技巧**：分享计划：把 .md 放进 Proof<sup>[25]</sup>，发链接，把评论拉回循环。

---

## 17. 写你自己的技能（Skills）

最大的升级不是使用 agent，而是教它们永久记住的技巧。任何我做超过两次的事情，基本上都会把它变成一个技能：一个我的 agent 可以永远运行的可复用命令。

你不需要从头写。解锁这件事的技巧是把你的 agent 指向一个已经有效的技能，让它复制那个形状。字面意思："看看 Compound Engineering 技能，帮我做一个类似的用于 [我想要自动化的东西]。"它读一个好例子，学习结构，搭建我的框架。我用这种方式构建了一堆技能。

写一次技能，之后的每个会话都更快，这就是 Compound Engineering 的复利部分。

**技巧**：任何做超过两次的事，都做成技能："看看 Compound Engineering<sup>[1]</sup> 技能，帮我做一个类似的用于 [X] 的。"

---

## 18. 诚实的部分：AI 心理症

Agent 本来应该替我们做所有工作。结果每个我认识的朋友一有新的东西出来就发狠了忘情了觉也不睡了股票也不看了，关你什么东西看新出的模型才是最关键的。

简单的回应是休息一下、接触自然。但这不是重点，重点是上瘾。用 agent 构建是有史以来最好的电子游戏，那个循环就是这么好玩。

有一些朋友，他们被"能构建任何东西"的能力点燃，以至于什么别的都不做了。然后他们发布，没有用户。其实这也没关系，我之前发布过很多没有用户的东西。陷阱不是空洞的发布，而是消失进构建并失去周围的人。

所以要小心。和你爱的人说话。问问自己是否真的有人想要你在做的东西。如果诚实的答案是它只是一个给你自己的工具，那也没关系。我构建过的一些最好的东西只是为了我自己。

如果你确实想要受众，那是 Gary Vaynerchuk 一直在宣扬的内容路径。你从某处开始，发布进虚空希望有一个人注意到。然后三个，然后十个，然后一百个，你慢慢走向成千上万。没有人一开始就在成千上万。你构建的任何东西也一样。

**技巧**：休息一下，接触自然。和你爱的人说话。构建人们想要的东西，即便"人们"只是你自己。

---

#### References

1. Compound Engineering: https://github.com/EveryInc/compound-engineering-plugin

2. Typeless: https://www.typeless.com/

3. Openless: https://github.com/Open-Less/openless

4. cmux: https://cmux.com/

5. Ghostty: https://ghostty.org/

6. github.com/mvanhorn/agentmail-to-claude-code: https://github.com/mvanhorn/agentmail-to-claude-code

7. AgentMail: https://agentmail.to/

8. Codex IDE 扩展: https://developers.openai.com/codex/ide

9. Printing Press: https://printingpress.dev/

10. last30days: https://github.com/mvanhorn/last30days-skill

11. Granola: https://granola.ai/

12. Printing Press Granola CLI: https://github.com/mvanhorn/printing-press-library/tree/main/cli-skills/pp-granola

13. HyperFrames: https://hyperframes.heygen.com/

14. 这个 PR: https://github.com/facebookresearch/atlas-lean/pull/2

15. catbox: https://catbox.moe/

16. Bear: https://bear.app/

17. Obsidian: https://obsidian.md/

18. gbrain: https://github.com/garrytan/gbrain

19. supermemory: https://supermemory.ai/

20. Mosh: https://mosh.org/

21. Tmux: https://github.com/tmux/tmux

22. Hermes: https://hermes-agent.nousresearch.com/

23. OpenClaw: https://github.com/openclaw/openclaw

24. Agent Cookie: https://agentcookie.dev/

25. Proof: https://proofeditor.ai/
