---
title: "Claude Code 进阶配置：OpenSpec + Superpowers + Comet"
date: 2026-05-25
category: "AI 实践"
source_url: "https://mp.weixin.qq.com/s/7YI4P8QplbucWLDNPIfC4w"
source_account: "凌曦悦"
source_format: wechat_html_converted
---

今天我想邀请所有 Claude Code 用户认真思考一件事：你有没有遇到过这种情况？

打开 CC，说一句「加个登录功能」，AI 噼里啪啦写了一大堆。能跑，但你要的是 JWT，它给你实现了 session。再改，context 窗口满了，AI 开始失忆，你的需求只活在聊天记录里。

这不是模型不够强，是工作流没有纪律。

今天介绍三个开源工具，专门解决这件事：OpenSpec、Superpowers、Comet。三个都免费，装了立即有效果。

---

## 一、OpenSpec：在动手之前，先说清楚做什么

OpenSpec 是一个 Spec 驱动开发框架。它不替代 Claude Code，而是在前面加一层 spec 层——强制你在 AI 动手写代码之前，先把需求文档化。

GitHub：github.com/Fission-AI/OpenSpec｜28k+ stars｜MIT｜v1.2.0

**安装：**

```
npm install -g @fission-ai/openspec
cd your-project
openspec init
```

**核心概念只有四个：**

Spec 是系统行为的事实来源，不是代码注释，是行为描述（GIVEN/WHEN/THEN 格式）。Change 用 delta spec 描述变更，用 ADDED / MODIFIED / REMOVED 三个标签精确标注改了什么，不需要重写整个文档。Artifacts 是一次变更的完整产物链，从 proposal 到 tasks 一路有迹可循。Archive 是变更完成后把 delta 合并进主 spec，形成项目演进记录。

**工作流程是强制三阶段：**

```
Proposal（为什么做）→ Apply（怎么做）→ Archive（归档记录）
```

**主要命令：**

```
# 和 AI 对话理清需求
/opsx:explore

# 生成正式 proposal
/opsx:propose

# 开始实施
/opsx:apply

# 验证（检查 GIVEN/WHEN/THEN 覆盖是否完整）
openspec validate --strict

# 归档
/opsx:archive
```

用完之后最直观的变化：你的项目目录里会有 proposal.md、spec.md、tasks.md。下次继续做或者让 AI 接手，直接读文档，不用重新解释背景。

相比同类工具 Spec Kit（输出约 800 行），OpenSpec 的 spec 文件保持在约 250 行，不会让你看到崩溃。支持 30+ AI 编程工具，Claude Code、Cursor、Windsurf、Cline 都兼容。

**适合：** 有一定规模的项目、需要长期维护、多人协作、存量代码迭代。**不适合：** 写脚本、快速原型、一次性小实验。

---

## 二、Superpowers：给 AI 装上工程纪律

Superpowers 是目前 Claude Code 生态里最受欢迎的插件，137k+ stars，作者是 Jesse Vincent。

GitHub：github.com/obra/superpowers｜MIT

它解决的问题很具体：Claude Code 默认行为是收到请求立即开始写代码，没有分支、没有测试、没有 review。AI 不是不够聪明，是缺乏纪律。

**安装（CC 官方插件市场，一行搞定）：**

```
/plugin install superpowers@claude-plugins-official
```

装上之后，你不需要做任何额外操作，skills 会自动触发。

**AI 的行为会从这样：**

收到请求 → 立即写代码

**变成这样：**

先退一步问你真正想做什么 → 从对话中提炼 spec 分块给你确认 → 制定实施计划 → 强制 TDD 先写失败测试再写实现 → subagent 并行执行任务并自我 review

**核心 Skills 一览：**

brainstorming：开始前深度探索需求，甚至会生成 HTML mockup 让你在浏览器里点击确认 UI 交互。

writing-plans：制定详细实施计划，细到「热情但品味差、没判断力、不爱写测试的初级工程师」也能执行。

TDD：强制红绿灯测试驱动。注意这里有个关键细节：Superpowers 的 TDD skill 会直接删除测试前写的代码，不是警告，是删除。这防止 AI 先写实现再补「验证代码做了什么」的假测试。

subagent-driven-development：多个子 agent 并行跑任务，效率更高。

code-review：代码自审。

debugging：系统性排查问题，不是乱猜，是有步骤的。

**支持平台：** Claude Code、Codex CLI、Gemini CLI、OpenCode、Cursor、GitHub Copilot CLI 等主流工具。

---

## 三、Comet：一键安装，五阶段自动串联

OpenSpec 管 WHAT，Superpowers 管 HOW，但两者不会自动衔接——在 `/opsx:apply` 执行时，Superpowers 的 TDD 等 skills 不会自动触发，需要你手动在 CLAUDE.md 里加规则。

Comet 解决的就是这个问题。它是一个中国开发者做的开源项目，把两个工具串成一条五阶段自动化流水线。

GitHub：github.com/rpamis/comet｜MIT｜v0.2.7｜B站有视频介绍

**安装（三个工具一次全装）：**

```
npm install -g @rpamis/comet
cd your-project
comet init
```

`comet init` 会自动检测你已有的 AI 平台配置，询问安装范围（项目级或全局），选语言（支持中文），然后自动安装 OpenSpec skills、Superpowers skills 和 Comet 自身的 skills，最后创建工作目录。支持 28 个 AI 编程平台，Cursor、Windsurf、通义灵码、CodeBuddy 都在列，装一次全覆盖。

**五阶段工作流：**

```
/comet-open → /comet-design → /comet-build → /comet-verify → /comet-archive
  OpenSpec      Superpowers    Superpowers      两者            OpenSpec
```

<table><thead><tr><th>阶段</th><th>命令</th><th>产出</th></tr></thead><tbody><tr><td>1. 开启变更</td><td>/comet-open</td><td>proposal.md, design.md, tasks.md</td></tr><tr><td>2. 深度设计</td><td>/comet-design</td><td>Design Doc, delta spec</td></tr><tr><td>3. 计划构建</td><td>/comet-build</td><td>实施计划, 代码提交</td></tr><tr><td>4. 验证收尾</td><td>/comet-verify</td><td>验证报告, 分支处理</td></tr><tr><td>5. 归档</td><td>/comet-archive</td><td>delta 合并进主 spec</td></tr></tbody></table>

每个阶段退出前都有守卫脚本验证条件，不满足会输出 `[HARD STOP]` 并告诉你下一步怎么做，防止 AI 假装完成直接跳阶段。

**状态文件：**

Comet 用两个解耦的 YAML 记录进度：`.openspec.yaml`（OpenSpec 管）和 `.comet.yaml`（Comet 管）。

```
# .comet.yaml 示例
workflow: full
phase: build
build_mode: subagent-driven-development
isolation: branch
verify_result: pending
archived: false
```

**中途断开不怕，直接续接：**

```
/comet continue
# 自动读取 .comet.yaml，识别当前阶段，从断点继续
```

**两个快捷路径，不用走完整流程：**

```
/comet-hotfix  # 跳过 brainstorming，快速修 bug
/comet-tweak   # 跳过 brainstorming 和完整计划，小改动用
```

**项目目录结构（装完之后长这样）：**

```
your-project/
├── .claude/skills/
│   ├── comet/SKILL.md
│   ├── comet-open/SKILL.md
│   ├── comet-design/SKILL.md
│   ├── comet-build/SKILL.md
│   ├── comet-verify/SKILL.md
│   ├── comet-archive/SKILL.md
│   ├── openspec-*/SKILL.md
│   └── brainstorming/SKILL.md
├── openspec/
│   └── changes/
│       └── your-feature/
│           ├── .openspec.yaml
│           ├── .comet.yaml
│           ├── proposal.md
│           ├── design.md
│           └── tasks.md
└── docs/superpowers/
    ├── specs/       # Design 文档
    └── plans/       # 实施计划
```

---

## 四、怎么选，怎么上手

三个工具不是必须一起用，按需叠加就好。

**推荐顺序：**

第一步，先安装 Superpowers。一行命令，装完立刻有效果，零学习成本，任何用 Claude Code 的人都值得装。

第二步，项目复杂起来之后，加 OpenSpec。需要需求可追溯、多人协作、长期迭代的时候再引入。

第三步，觉得手动衔接两者麻烦，上 Comet，一键把三个工具全装好，五阶段流水线自动跑。

**快速参考：**

<table><thead><tr><th>工具</th><th>安装命令</th><th>GitHub</th></tr></thead><tbody><tr><td>Superpowers</td><td><code>/plugin install superpowers@claude-plugins-official</code></td><td>obra/superpowers</td></tr><tr><td>OpenSpec</td><td><code>npm install -g @fission-ai/openspec</code></td><td>Fission-AI/OpenSpec</td></tr><tr><td>Comet（含前两者）</td><td><code>npm install -g @rpamis/comet &amp;&amp; comet init</code></td><td>rpamis/comet</td></tr></tbody></table>

赶快去试试吧！期待你回来留言反馈！
