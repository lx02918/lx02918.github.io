---
title: "7步构建Claude Agent团队：从单人对话到并行工作团队"
date: 2026-05-28
category: "AI 实践"
source_url: "https://mp.weixin.qq.com/s/ul4R_NW83G9UsjUmKeHsBw"
source_account: "凌曦悦"
source_format: wechat_html_converted
---

你写代码，然后review，然后测试，然后写PR，然后更新文档。每天的任务，一个接一个地排队。

其实可以让5件事同时跑——一个agent负责一个任务，你专注于下一个功能。

以下是7步搭建方法 👇

![7步构建Claude Agent团队：从单人对话到并行工作团队 · 配图 1](/img/wechat/ul4R_NW83G9UsjUmKeHsBw/01.jpg)

---

## 第一步：理解3个层级

搭团队之前，先搞清楚有什么可用的。Claude Code内置三种agent能力，各自解决不同的问题：

**层级1：子Agent（Subagents）**

- 在当前会话内运行

- 结果汇报给你

- 彼此无法通信

- 适合：可重复任务（review、测试、写文档）

- 类比：你发了简报就等交付物的外包

**层级2：Agent视图（Agent View）**

- 全屏仪表盘，展示所有会话

- 可以下发任务、查看、接入任何agent

- 关闭终端后会话依然保留

- 适合：3-10个互不依赖的任务

- 类比：有实时进度的任务看板

**层级3：Agent团队（Agent Teams）**

- 一个主控agent协调队友

- 队友之间可以互相通信

- 共享任务列表，真正协作

- 适合：跨文件的依赖性任务

- 类比：一支真正的工程团队

大多数人从没超过层级1。今天直接上层级3。

![7步构建Claude Agent团队：从单人对话到并行工作团队 · 配图 2](/img/wechat/ul4R_NW83G9UsjUmKeHsBw/02.jpg)

---

## 第二步：开启Agent团队

Agent Teams是实验性功能，先启用：

```
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

加到 `~/.zshrc`（Mac）或 `~/.bashrc`（Linux）里，保证每次都生效。

---

## 第三步：写第一个团队Prompt

和普通提示词的核心区别：描述整个项目，让主控agent自己拆解。

```
我需要构建一个用户认证系统。请派生独立agent分别处理：

1. 后端：用Express.js创建登录、注册和token刷新路由
2. 前端：用React构建带验证的登录和注册表单
3. 测试：为所有认证接口编写集成测试
4. Review：审查其他agent产出的所有代码，检查安全问题
```

主控agent负责拆解任务、分配角色、派生队友。每个队友有自己独立的上下文窗口。你会看到哪些agent在活跃、各自在做什么的输出。

---

## 第四步：按模型路由，降低成本

5个Opus agent并行跑，token消耗是5倍速。智能路由你的团队：

```
# 主控agent：Opus（需要推理架构）
# 队友：Sonnet（专注执行任务）
export CLAUDE_CODE_SUBAGENT_MODEL="claude-sonnet-4-5-20250929"
```

主控agent跑你选的模型（复杂工作用Opus）。所有队友自动用Sonnet，成本降到1/5。专注性任务质量不打折，花费大幅缩减。

---

## 第五步：用Agent视图统筹全局

团队跑起来之后，切到仪表盘：

```
claude agents
```

全屏展示每个会话：

```
┌─────────────────────────────────────────────┐
│ Agent View                                  │
├──────────┬──────────┬───────────────────────┤
│ 后端     │ 前端     │ 测试       │ Review   │
│ ██████░░ │ ████░░░░ │ ░░░░░░░░░ │ waiting  │
│ 72%      │ 48%      │ queued     │ for deps │
├──────────┴──────────┴───────────────────────┤
│ > dispatch new task                         │
└─────────────────────────────────────────────┘
```

在这里你可以：

- 向团队下发新任务

- 查看任意agent的进度，不打断它

- 接入需要输入的agent

- 关掉电脑，agent继续跑（会话关闭终端后仍然存在）

---

## 第六步：建立决策框架

不是所有任务都需要团队。

把agent用在简单任务上是在烧token。

什么情况用什么：

```
单个Prompt，修单个文件
→ 普通Claude Code会话，不需要agent。

3个互不依赖的任务
→ Agent视图，全部下发，等结果。

可重复工作流（review、测试、文档）
→ 带YAML配置的子agent，每次结果一致。

跨文件、有依赖的功能开发
→ Agent团队，主控协调，队友协作。

连夜清积压
→ Headless模式 + --max-budget-usd 上限。
```

用错编排模式既浪费时间又浪费token。独立任务不需要Agent Teams协调，有依赖的任务不应该跑在隔离的Agent View会话里。

---

## 第七步：加上护栏

多个agent并行跑，意味着多个地方可以同时出错。

锁好：

```
{
  "permissions": {
    "allow": [
      "Read", "Glob", "Grep", "LS", "Edit",
      "Write(src/**)", "Write(tests/**)",
      "Bash(npm test *)", "Bash(npx tsc *)",
      "Bash(git add *)", "Bash(git commit *)"
    ],
    "deny": [
      "Read(**/.env*)", "Read(**/.ssh/**)",
      "Bash(rm -rf *)", "Bash(sudo *)",
      "Bash(git push *)", "Bash(npm publish *)"
    ],
    "defaultMode": "acceptEdits"
  }
}
```

团队会话务必设预算上限：

```
claude -p "构建认证系统" --max-budget-usd 15.00
```

5个agent每个人$3 = 整个团队$15封顶。任何单个agent都不会失控。

---

## 完整配置（可直接复制）

![7步构建Claude Agent团队：从单人对话到并行工作团队 · 配图 3](/img/wechat/ul4R_NW83G9UsjUmKeHsBw/03.jpg)

### 环境变量

```
# 加到 ~/.zshrc 或 ~/.bashrc
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
export CLAUDE_CODE_SUBAGENT_MODEL="claude-sonnet-4-5-20250929"
export CLAUDE_CODE_DEFAULT_EFFORT=high
export CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1
```

### 团队Prompt模板

```
我需要 [描述完整功能]。

请派生独立agent：
1. [角色1]：[具体任务，指明文件/模块]
2. [角色2]：[具体任务，指明文件/模块]
3. [角色3]：[具体任务，指明文件/模块]
4. Review：审查所有代码，检查[bug/安全/风格]

每个agent在独立上下文中工作。通过共享任务列表协调。启动有依赖的任务前先标记依赖关系。
```

### settings.json 护栏

```
{
  "permissions": {
    "allow": ["Read", "Glob", "Grep", "Edit", "Write(src/**)", "Write(tests/**)" ],
    "deny": ["Read(**/.env*)", "Bash(rm -rf *)", "Bash(git push *)"],
    "defaultMode": "acceptEdits"
  }
}
```

---

## 前后对比

```
之前（单打独斗）：
- 一次只做一件事
- 写代码、review、测试、提交，全部串行
- 一个4部分的功能要花一整天
- 任务切换让上下文越来越臃肿

之后（agent团队）：
- 4个agent并行工作
- 后端、前端、测试、review同时跑
- 同样的功能2小时搞定
- 每个agent上下文干净、专注
- 你负责review和合并结果
```

同一个工具。同一个订阅。区别只是一个环境变量，加一句"派生独立agent"的Prompt。

---
