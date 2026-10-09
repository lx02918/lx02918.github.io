---
title: "放弃瞎用 Claude Code，就从今天开始！"
date: 2026-05-24
category: "AI 实践"
source_url: "https://mp.weixin.qq.com/s/z87ee8D25OTRLNqwPAFjQw"
source_account: "凌曦悦"
source_format: wechat_html_converted
---

省流版：

- 命令式 prompt 出浅思考，描述式 prompt 出深推理

- context 超 60% 不是省钱问题，是注意力衰减问题

- 走偏了重开比纠正快 2-3 倍

- sub agents 真正的价值是隔离上下文，不是并行

- /loop 让 Claude 变成异步同事，不是异步工具

---

最近刷到一个讲 Claude Code 32 个技巧的视频，16 分钟塞满干货，我把它认真拆了一遍，发现里面真正关键的点，很多人其实都理解反了。

今天不讲 32 个，只讲 6 个，但把原理说透。

![放弃瞎用 Claude Code，就从今天开始！ · 配图 1](/img/wechat/z87ee8D25OTRLNqwPAFjQw/01.png)

## 把它当 junior 同事，不是态度问题

很多人看到这条，第一反应是：哦，对它礼貌一点。

这个理解完全跑偏了。

LLM 接收命令式 prompt 的时候，触发的是浅层执行模式，直接 pattern match，输出快但思考浅。接收描述式 prompt 的时候，才会展开 chain of thought，输出慢但准确度高一截。

同一个 bug，「修一下这里」和「这里看起来有点怪，你查查为啥」，出来的代码质量能差一倍。前者它直接改你指的那行，后者它会先理解上下文，可能发现真正的问题根本不在那里。

记住：你 prompt 里预设的答案越少，激发的推理就越多。

## 60% 用 /compact，不是为了省钱

这个阈值被误解最深。

Stanford 2023 年有篇论文揭示了 lost in the middle 现象。LLM 在长 context 里的注意力是 U 型曲线，开头记得牢，结尾记得牢，中间最容易被忽略。

60% 这条线不是省钱的红线，是注意力开始衰减的经验线。超过这个点，你前面提过的关键需求会开始被视而不见，模型会犯那种「我明明说过了」的错。

问题来了，怎么判断该 compact 了？不是看 token 数，是看它有没有开始忘事。一旦它问出「你想做什么」之类的问题，立刻 /compact，再晚一步它就带着错误前提继续往下做。

## /compact 保留的是关键决策和未完成事项，是在做注意力的重新聚焦，不是粗暴截断。

## 跑偏了直接 ESC 重开，不是耐心问题

遇到 Claude 走偏，很多人第一反应是再 prompt 一下让它修正。

这个反应是错的。

被污染的 context 里，你的修正 prompt 自己占 context，它的道歉占 context，它修正后的输出还会被前面错误的推理锚定。人类有 confirmation bias，LLM 也有。被错误锁定之后很难真正跳出来。

总成本比重开高 2 到 3 倍，最终输出还可能更差。

建立一个反射：看到走偏，立刻 ESC，重新组织思路，重新 prompt。重开不是失败，是更聪明的资源分配。

## sub agents 的核心是隔离，不是并行

sub agents 并行只是表象，真正的价值是上下文隔离。

父 agent 是指挥者，看大局，不需要知道细节怎么实现。sub agent 是执行者，可以激进探索，包括各种失败和绕路。父 agent 只拿 sub agent 的最终结论，那些失败的探索不会污染主线。

最适合开 sub agent 的任务：需要大量探索但只需要少量结论。

![放弃瞎用 Claude Code，就从今天开始！ · 配图 2](/img/wechat/z87ee8D25OTRLNqwPAFjQw/02.png)

比如「在 codebase 里找所有用了某个 deprecated API 的地方」，让 sub agent 把代码翻完，回来交一份清单。父 agent 不需要知道它翻过哪些文件，更不需要被翻过的代码污染主上下文。

把 context 从一维资源变成树形资源，这才是 sub agents 的本质。

## 简单活给 Haiku，不只是省钱

大模型训练时见过太多复杂场景，对简单任务也会本能地加边缘情况处理、加错误处理、加注释文档，用更复杂的设计模式。

写一个简单的 helper 函数，Sonnet 可能给你 30 行，Haiku 给你 10 行。后者在大多数场景反而更对。

判断标准就是任务的认知步骤数：1-2 步的活丢 Haiku，5 步以上留 Sonnet，10 步以上才开 ultrathink。

## 如果你同时在用 Sonnet 和 Haiku，什么时候完全只用 Sonnet？

答案是：永远不要。过度设计比省下来的钱贵多了。

## /loop 是让 Claude 变成异步同事

/loop 能挂 3 天，很多人以为这是用来写长代码的。

不是。

/loop 真正的用法是把 Claude 从同步工具变成异步同事。它在那挂着，定期检查状态，有事叫你。

好的 /loop 任务：每 10 分钟看一下 CI 是不是过了，没过就分析失败原因。每小时扫一下数据库慢查询。每天看一遍 PR review 队列。

这些以前是「我得记得去看」的事，现在变成「Claude 看到了再叫我」。

![放弃瞎用 Claude Code，就从今天开始！ · 配图 3](/img/wechat/z87ee8D25OTRLNqwPAFjQw/03.png)

---

核心心智模型只有一句话：把 Claude Code 当成一个有限注意力、有限时间、有性格的同事来管理，不要当成无限算力的工具来用。

心智模型换过来，剩下的技巧都是延伸，你自己也能想出来。

赶快去试试吧！期待你回来留言反馈！

> 公众号回复「卡」，可以领取我整理的 Claude Code 提示词模板包，覆盖 /init、sub agents、/loop 常见场景，直接拿去用。
