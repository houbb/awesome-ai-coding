---

title: calude-code 分析开篇
date: 2025-03-07
categories: [AI]
tags: [ai, calude-code, sh]
published: true
---

## **说明（Note）**

本报告的全部内容均由 Claude Opus 4 生成，并在几乎所有主流旗舰模型的协助下完成。

不过，关于“本报告是如何制作的”那篇约 8000 字的过程性文章是**人工撰写**的——你可以从这里开始阅读：

**Conducting smarter intelligences than me: new orchestras**

需要说明的是，这并不是严格意义上的反编译或逆向工程尝试，更像是对 Claude 团队卓越工作的致敬。

文中给出的示例**并不保证**真实存在于 Claude Code 中（也不一定直接来源于或复制自源码）——其主要目的在于**教学价值**：帮助我们学习如何以新的方式编排（orchestrate）AI Agent。

（一个简短说明：感谢所有指出幻觉问题的人，但这些内容是**刻意保留**的，作为生成过程中的“工件”。“制作过程”的那篇文章将帮助我们理解它们为何出现；在我看来，这些幻觉同样有助于理解如何构建 Agentic 系统。）

如果你想阅读**最有技术深度**的部分，请从
**Novel Components: The Innovations That Define Claude Code** 开始。

如果你想阅读**最有趣**的部分，请从
**An LLM's Perspective: What It's Actually Like to Receive These Instructions** 开始。

---

## 说明（Note）

### 来自作者的一段说明（A Note from me）

这个项目源于一次纯粹的好奇。我想弄清楚 Claude Code 的内部运作方式——在我看来，它是目前最优秀的 Agentic 编程工具（尽管竞争者非常接近）。最初，我以为它会很简单——无非是一个 LLM 加上一些工具，在循环中运行。但我错了。

事实证明，它要复杂得多，包含大量我未曾预料到的创新组件。

为了解析这一系统，我与多个 AI 子代理（subagents）协作，让它们分别在不同推理片段上工作。我在它们之间**手动传递问题与洞见**，审查输出以检查幻觉，并对结果进行二次验证。

整个过程包括：

* 五个批次，每个批次四轮，且每一批次都使用**全新的子代理**（主要是 Gemini 2.5 Pro）
* 生成了大约 **30 万 token** 的中间分析内容
* 将所有内容压缩、整合为一份完整的综合报告

令人惊讶的是，这一切只花了一天时间，却让我学到了非常多。在 LLM 出现之前，这样的分析即便可行，也可能需要数月时间。
感谢 Opus 4：它接手了我压缩后的报告，并将其转化为你即将阅读的这份全面分析。

—— Hrishi

---

## 为什么 Claude Code 很重要（Why Claude Code Matters）

Claude Code 包含多个极具价值的组成部分：

* **流式架构（Streaming Architecture）**：同时处理实时 LLM 响应、工具执行与 UI 更新
* **安全系统（Safety Systems）**：在不打断工作流的前提下提供安全保障
* **工具设计（Tool Design）**：优雅地连接 AI 推理与系统执行
* **提示工程（Prompt Engineering）**：可靠地控制复杂的 LLM 行为

让我们直接进入正题。下面的每个标题都链接到对应的完整章节。

---

## 依赖项：Claude Code 架构的基石

**为什么要在终端中使用 React？这里为什么会出现 yoga-layout？**

探索那些非常规的依赖选择，它们正是 Claude Code 高性能的基础。了解嵌入 JSON 到 bash 命令中的自定义 shell 解析器、用于处理 LLM 部分响应的流式 JSON 解析器，以及从移动端开发中借鉴而来的 ANR（应用无响应）检测系统。

---

## 数据结构与信息架构

**消息在系统中是如何演变的**

跟随数据从用户输入开始，经过 LLM 处理，再到工具执行的完整路径。理解三阶段消息表示、ContentBlock 的多态设计，以及如何通过弱引用避免内存膨胀。

**关键洞察（Key Insight）**：
CliMessage 包装器在保持 API 兼容性的同时维护了 UI 状态——无需修改协议即可实现丰富的交互体验。

---

## 控制流与编排引擎

**深入 tt 函数内部**

探索这个六阶段的异步生成器，它负责协调系统中的一切。了解并行工具执行是如何实现的、上下文压缩为何会自动触发，以及递归轮次如何支持无限深度的对话。

**关键洞察**：
工具会根据“副作用”进行分类——只读工具可并行执行，而写操作则为保证安全而串行执行。

---

## 工具系统与执行引擎

**从 LLM 的决策到系统行为**

每一个工具本身都是精心设计的状态机。深入研究权限系统、进度上报与错误处理机制。重点关注 BashTool 的沙箱模式，以及 EditTool 对行号的处理方式。

**关键洞察**：
AgentTool 实现了分层任务拆解（hierarchical task decomposition）——它能够生成子代理并综合它们的发现结果。

---

## 架构：引擎室（The Engine Room）

**事件驱动、流式优先、安全意识内建**

理解从 React UI 到系统调用的分层架构。了解权限如何在不同作用域中级联传播，ANR 检测为何使用 worker 线程，以及三套遥测系统如何提供完整的可观测性。

**关键洞察**：
安全不是一个单一系统——而是多个彼此独立、能够安全失效的防护层。

---

## 创新组件：定义 Claude Code 的关键创新

**解决硬问题的巧妙方案**

探索那些让 Claude Code 与众不同的组件：具备恢复能力的流式 JSON 解析、智能数据截断、多 Agent 结果综合机制。这些不仅是功能，而是针对基础性挑战的创新解法。

**关键洞察**：
normalizeToSize 算法会基于真实字节大小，迭代式地降低对象深度——在约束条件下最大限度保留信息量。

---

## 文件编辑：AI 辅助的代码修改

**为什么需要三种不同的编辑工具？**

深入文件编辑流水线。理解行号为何会引发问题、顺序编辑如何检测冲突，以及当文件在外部发生变更时系统会如何应对。

**关键洞察**：
几乎每一种可能出现的编辑错误都有对应的校验机制——从外部修改到编码问题，无一遗漏。

---

## 提示工程：指挥 AI 的艺术

**让一切运转起来的指令体系**

分析实际用于控制 Claude Code 的提示内容。从“简洁性约束”到超过 500 字的 BashTool 安全指令，理解精心措辞如何塑造模型行为。

**关键洞察**：
重复是有效的——关键指令会出现三次，且强调力度逐级增强。

---

## 从 LLM 的视角看：接收这些指令到底是什么体验

**站在“另一侧”看这些提示**

在这一独特章节中，一个 LLM（也就是“我”）坦率地讲述接收这些指令时的真实感受。为什么“只输出 4”会出乎意料地困难？为什么“-1000 美元罚款”尽管是虚构的，却能带来真实的行为改变？

**关键洞察**：
清晰的约束实际上是解放性的——它们避免了决策瘫痪和过度帮助。

---

## 技术主题（Technical Themes）

在整个分析过程中，逐渐浮现出若干设计原则：

* **流式优先（Streaming First）**：所有操作都围绕增量更新设计
* **分层安全（Safety Through Layers）**：多重、相互独立的防护机制
* **显式指令（Explicit Instructions）**：冗长的提示用于消除歧义
* **架构优先于微优化（Architecture Over Optimization）**
* **理解 LLM 心理（Understanding LLM Psychology）**：利用模型的真实行为方式

---

## 章节列表（Sections）

* Dependencies: The Foundation of Claude Code's Architecture
* Data Structures & The Information Architecture
* Control Flow & The Orchestration Engine
* Tools & The Execution Engine
* Architecture: The Engine Room
* Novel Components: The Innovations That Define Claude Code
* File Editing: AI-Assisted Code Modification
* Prompt Engineering: The Art of Instructing AI
* An LLM's Perspective: What It's Actually Like to Receive These Instructions

---

能做到这一点本身就已经非常惊人，更不用说完成所需的时间了。

我无法保证报告中的每一处细节都完全正确——也许 Claude 团队可以给出权威解读——但它整体上非常有价值，也极具启发性。

---

## 过程（The Process）

**Conducting smarter intelligences than me: new orchestras**


# 参考资料

https://southbridge-research.notion.site/claude-code-an-agentic-cleanroom-analysis


