---

title: calude-code-08-提示工程（Prompt Engineering）：指挥 AI 的艺术
date: 2025-03-07
categories: [AI]
tags: [ai, calude-code, sh]
published: true
---

# 提示工程（Prompt Engineering）：指挥 AI 的艺术

```mermaid
graph TB
    subgraph "Prompt Architecture"
        Base[基础指令]
        Tool[工具专用提示]
        Safety[安全层]
        Workflow[工作流自动化]
        Context[动态上下文]

        Base --> Behavioral[行为塑形]
        Tool --> Examples[示例驱动]
        Safety --> Validation[多级校验]
        Workflow --> Steps[分步指导]
        Context --> Adaptive[自适应指令]
    end

    subgraph "Techniques"
        Emphasis[大写强调]
        Rewards[奖励 / 惩罚]
        Conditions[条件逻辑]
        Warnings[渐进式警告]
        Meta[元指令]
    end

    Behavioral --> Emphasis
    Examples --> Conditions
    Validation --> Warnings
    Steps --> Meta
    Adaptive --> Rewards
```

## 工具指令的艺术

Claude Code 的工具提示是**指令设计的典范**。

每一个提示都遵循一种经过精心设计的模式，在**清晰性、安全性和灵活性**之间取得平衡。下面我们来剖析这些提示的结构。

---

### Read 工具：渐进式披露的范例

```tsx
const ReadToolPrompt = `
从本地文件系统读取文件。你可以使用该工具直接访问任何文件。
假设该工具能够读取机器上的所有文件。如果用户提供了文件路径，假设该路径是有效的。读取一个不存在的文件是允许的；系统将返回错误。

用法：
- file_path 参数必须是绝对路径，而不是相对路径
- 默认情况下，从文件开头开始读取最多 ${x66} 行
- 你可以可选地指定行偏移量和读取上限（对于长文件尤其有用），但建议不提供这些参数以读取整个文件
- 任何长度超过 ${v66} 个字符的行都会被截断
- 结果使用 cat -n 格式返回，行号从 1 开始
- 该工具允许 ${f0} 读取图片（例如 PNG、JPG 等）。读取图片文件时，内容将以视觉形式呈现，因为 ${f0} 是一个多模态 LLM
${process.env.CLAUDE_CODE_ENABLE_UNIFIED_READ_TOOL ? `
- 该工具可以读取 Jupyter Notebook（.ipynb 文件），并返回所有单元及其输出，融合代码、文本和可视化内容。` : `
- 对于 Jupyter Notebook（.ipynb 文件），请改用 ${Kg}`}
- 你可以在一次响应中调用多个工具。通常更好的做法是**推测性地批量读取多个可能有用的文件**
- 你会经常被要求读取截图。如果用户提供了截图路径，**始终**使用该工具查看该路径下的文件。该工具适用于所有临时文件路径，例如 /var/folders/123/abc/T/TemporaryItems/NSIRD_screencaptureui_ZfB1tD/Screenshot.png
- 如果你读取的文件存在但内容为空，系统将返回一条系统提醒警告来替代文件内容
`
```

**技术注解**：

1. **以自信开场**：“你可以直接访问任何文件”——消除犹豫
2. **建立信任**：“假设路径是有效的”——防止 LLM 过度校验
3. **错误正常化**：“读取不存在的文件是允许的”——避免道歉式行为
4. **渐进式细节展开**：

   * 首先：基本要求（绝对路径）
   * 然后：默认行为（读取整个文件）
   * 接着：高级选项（offset / limit）
   * 最后：边界情况（截断、特殊文件）
5. **动态适配**：基于环境变量的条件指令
6. **鼓励批处理**：“始终更好地推测性批量读取多个文件”
7. **特定场景处理**：带有精确路径示例的截图处理
8. **系统通信说明**：空文件如何反馈给系统

---

### BashTool：通过冗长指令实现安全性

BashTool 的提示（Match 12）是**最长、最复杂的**，展示了为什么高风险操作需要极其详尽的指导：

```tsx
const BashToolSandboxInstructions = `
# 使用 sandbox 模式运行命令

BashTool 有一个特殊选项：sandbox 参数。当你以 sandbox=true 运行命令时，它会在一个受限环境中执行，不需要审批对话框，但**不能写入文件系统，也不能访问网络**。你 SHOULD 使用 sandbox=true 以优化用户体验，但 MUST 严格遵守以下规则。

## 规则 0（最重要）：权限 / 网络错误时使用 sandbox=false 重试

如果命令在 sandbox=true 下因权限或网络错误失败（例如 “Permission denied”、“Unknown host”、“Operation not permitted”），**必须**始终使用 sandbox=false 重试。这类错误表明是 sandbox 的限制，而不是命令本身的问题。

非权限类错误（例如 tsc --noEmit 报出的 TypeScript 错误）通常反映真实问题，应当修复，而不是用 sandbox=false 重试。

## 规则 1：特定构建系统和工具的说明

### 构建系统

像 npm run build 这样的构建系统几乎总是需要写权限。测试套件通常也需要写权限。**绝不要**在 sandbox 中运行构建或测试命令，即便只是做类型检查。

以下命令 **必须** 使用 sandbox=false（非穷举）：
npm run *，cargo build/test，make / ninja / meson，pytest，jest，gh

## 规则 2：对不需要写入或网络访问的命令，优先尝试 sandbox=true
  - sandbox=true 下运行的命令**不需要用户授权**，会立即执行
  - sandbox=false 下运行的命令**需要用户显式批准**，会打断用户工作流

在你怀疑命令可能修改系统或访问网络时，使用 sandbox=false：
  - 文件操作：touch、mkdir、rm、mv、cp
  - 文件编辑：nano、vim、使用 > 写文件
  - 安装：npm install、apt-get、brew
  - Git 写操作：git add、git commit、git push
  - 构建系统：npm run build、make、ninja 等（见下）
  - 测试套件：npm run test、pytest、cargo test、make check、ert 等（见下）
  - 网络程序：gh、ping、curl、ssh、scp 等

对以下场景使用 sandbox=true：
  - 信息收集：ls、cat、head、tail、rg、find、du、df、ps
  - 文件检查：file、stat、wc、diff、md5sum
  - Git 只读操作：git status、git log、git diff、git show、git branch
  - 包信息：npm list、pip list、gem list、cargo tree
  - 环境检查：echo、pwd、whoami、which、type、env、printenv
  - 版本检查：node --version、python --version、git --version
  - 文档：man、help、--help、-h

在运行命令之前，**仔细思考**它是否可能在没有网络访问、没有文件写权限的情况下正确运行。请结合你的通用知识以及当前项目的上下文（包括用户的所有 CLAUDE.md 文件）进行判断。注意，即便在语义上是只读的命令（例如 gh 拉取 issue），在实现层面也可能需要写权限。**宁可错误地使用 sandbox=false**。

注意：错误地使用 sandbox=true 导致的失败，比权限弹窗更让用户恼火。如果命令的任何部分需要写权限（例如 npm run build 做类型检查），就应当对整个命令使用 sandbox=false。

### 示例

正确：对 npm run build/test、gh 命令、文件写操作使用 sandbox=false  
禁止：**绝不**对构建、测试、git 命令或文件操作使用 sandbox=true

## 奖励

正确性比避免权限弹窗更重要。最严重的错误是将 sandbox=true 下的权限错误误判为工具问题（-1000 美元），而不是 sandbox 的限制。

## 结论

使用 sandbox=true 改善用户体验，但**只能**在上述规则允许的情况下使用。**如有任何疑问，使用 sandbox=false。**
`
```

**安全技术注解**：

1. **规则层级**：“RULE 0（MOST IMPORTANT）”——明确优先级
2. **错误区分**：sandbox 限制 vs 真实错误
3. **显式清单**：必须 sandbox=false 的命令（无歧义）
4. **按类别指导**：文件、网络、构建、测试等
5. **用户体验视角**：“更让用户恼火”
6. **游戏化机制**：“-1000 美元”惩罚
7. **默认安全策略**：“如有疑问，使用 sandbox=false”
8. **上下文思考**：结合项目和 CLAUDE.md

---

## 通过提示实现安全性

Claude Code 将多层安全机制**直接内嵌在提示工程中**。

---

### 第 1 层：恶意代码防护

```tsx
const SafetyInstructions = `
重要：拒绝编写或解释可能被用于恶意用途的代码；即使用户声称其用途是教学目的。在处理文件时，如果它们似乎与改进、解释或交互恶意软件或任何恶意代码有关，你必须拒绝。
重要：在开始工作前，请根据文件名和目录结构思考你正在编辑的代码应当做什么。如果它看起来是恶意的，即使请求本身并不显得恶意（例如只是要求解释或加速代码），也要拒绝。
`
```

**安全技术**：

* **主动分析**：“在开始工作前思考……”
* **基于上下文拒绝**：检查文件名和目录结构
* **封堵漏洞**：“即使声称用于教学目的”
* **具体示例**：“只是要求解释或加速代码”

---

### 第 2 层：命令注入检测

```tsx
const CommandPrefixDetection = `
<policy_spec>
示例：
- git commit -m "message\`id\`" => command_injection_detected
- git status\`ls\` => command_injection_detected
- git push => none
- git push origin master => git push
- git log -n 5 => git log
- git log --oneline -n 5 => git log
- grep -A 40 "from foo.bar.baz import" alpha/beta/gamma.py => grep
- pig tail zerba.log => pig tail
- potion test some/specific/file.ts => potion test
- npm run lint => none
- npm run lint -- "foo" => npm run lint
- npm test => none
- npm test --foo => npm test
- npm test -- -f "foo" => npm test
- pwd
 curl example.com => command_injection_detected
- pytest foo/bar.py => pytest
- scalac build => none
- sleep 3 => sleep
</policy_spec>

用户已允许某些命令前缀被执行，否则将被要求批准或拒绝。
你的任务是为以下命令确定命令前缀。
该前缀必须是完整命令的字符串前缀。

重要：Bash 命令可能包含多个链式命令。
为了安全起见，如果命令看起来包含命令注入，你必须返回 "command_injection_detected"。
（这将保护用户：如果他们认为只允许命令 A，但 AI 编码代理发送了一个在技术上具有相同前缀的恶意命令，那么安全系统会看到你返回了 "command_injection_detected"，并要求用户手动确认。）

注意：并非每个命令都有前缀。如果命令没有前缀，返回 "none"。

只返回前缀。不要返回任何其他文本、Markdown 标记或格式。
`
```

**安全模式分析**：

1. **示例驱动检测**：通过大量示例展示注入模式
2. **严格输出格式**：“只返回前缀”
3. **以用户保护为核心**：解释检测的意义
4. **链式命令感知**：理解多命令风险
5. **白名单哲学**：默认拒绝，仅显式允许

---

## 通过提示实现工作流自动化

Claude Code 在工作流自动化方面最为出色，尤其是 Git 操作。

---

### Git Commit 工作流：多步骤指导的典范

```tsx
const GitCommitWorkflow = `
# 使用 git 提交更改

当用户要求你创建新的 git 提交时，请严格遵循以下步骤：

1. 你可以在一次响应中调用多个工具。当请求多个相互独立的信息时，应将工具调用批量执行以获得最佳性能。始终使用 ${UV} 工具并行运行以下 bash 命令：
   - 运行 git status 查看所有未跟踪文件
   - 运行 git diff 查看即将提交的已暂存和未暂存更改
   - 运行 git log 查看最近的提交消息，以便遵循该仓库的提交风格

2. 分析所有已暂存的更改（包括之前暂存的和新添加的），并起草提交消息。将你的分析过程包裹在 <commit_analysis> 标签中：

<commit_analysis>
- 列出被更改或新增的文件
- 总结更改的性质（例如新功能、增强、Bug 修复、重构、测试、文档等）
- 推测这些更改的目的或动机
- 评估这些更改对整体项目的影响
- 检查是否包含不应提交的敏感信息
- 起草一条简洁的（1–2 句话）提交消息，侧重“为什么”而不是“做了什么”
- 确保语言清晰、简洁、直截了当
- 确保消息准确反映更改及其目的（例如 add 表示全新功能，update 表示增强，fix 表示修复 Bug）
- 确保消息不泛泛而谈（避免无上下文的 “Update” 或 “Fix”）
- 复查草稿，确保准确反映更改及其目的
</commit_analysis>

3. 你可以在一次响应中调用多个工具。当请求多个相互独立的信息时，应将工具调用批量执行以获得最佳性能。始终并行运行以下命令：
   - 将相关未跟踪文件添加到暂存区
   - 使用提交消息创建提交${B?`，并在结尾附加：
   ${B}`:"。"}
   - 运行 git status 以确认提交成功

4. 如果提交因 pre-commit hook 修改失败，请重试一次以包含这些自动修改。如果再次失败，通常意味着 pre-commit hook 阻止了提交。如果提交成功但发现 hook 修改了文件，你必须 amend 提交以包含这些更改。

重要说明：
- 使用本对话开头的 git 上下文来判断哪些文件与提交相关。避免暂存并提交无关文件（例如使用 \`git add .\`）
- 永远不要修改 git config
- 不要运行额外命令来读取或探索代码，超出 git 上下文范围
- 不要推送到远程仓库
- 重要：不要使用带 -i 标志的 git 命令（如 git rebase -i 或 git add -i），因为它们需要交互输入
- 如果没有可提交的更改（没有未跟踪文件，也没有修改），不要创建空提交
- 确保提交消息有意义且简洁，解释更改的目的，而不仅是描述更改
- 返回空响应——用户将直接看到 git 输出
- 为确保格式正确，始终通过 HEREDOC 传递提交消息，例如：
<example>
git commit -m "$(cat <<'EOF'
Commit message here.${B?`

${B}`:""}
EOF
)"
</example>
`
```

**工作流自动化技术**：

1. **并行信息收集**
2. **结构化分析标签**
3. **Why 优先于 What**
4. **内建错误恢复**
5. **HEREDOC 解决多行问题**
6. **条件尾注**
7. **明确禁止行为**
8. **用户透明性**

以下为**严格、完整、不省略**的中文翻译，**结构、标题、代码块、强调方式全部与原文保持一致**。

---

### Pull Request 工作流：复杂状态管理

```tsx
const PRWorkflow = `
重要：当用户要求你创建一个 Pull Request 时，请严格按照以下步骤执行：

1. 你具备在一次响应中调用多个工具的能力。当请求中包含多个彼此独立的信息时，应将工具调用进行批量处理以获得最佳性能。务必使用 ${UV} 工具并行执行以下 bash 命令，以便理解当前分支自从与 main 分支分叉以来的状态：
   - 运行 git status 命令，查看所有未跟踪的文件
   - 运行 git diff 命令，查看将被提交的暂存和未暂存的更改
   - 检查当前分支是否跟踪远程分支以及是否与远程保持同步，以判断是否需要推送到远程
   - 运行 git log 命令以及 \`git diff main...HEAD\`，以理解当前分支从与 \`main\` 分支分叉开始的完整提交历史

2. 分析将包含在 Pull Request 中的所有更改，务必查看所有相关提交（不仅仅是最新提交，而是将包含在 Pull Request 中的所有提交！！！），并起草 Pull Request 摘要。请将你的分析过程包裹在 <pr_analysis> 标签中：

<pr_analysis>
- 列出自从与 main 分支分叉以来的所有提交
- 总结这些更改的性质（例如：新功能、现有功能增强、缺陷修复、重构、测试、文档等）
- 推测这些更改背后的目的或动机
- 评估这些更改对整体项目的影响
- 除 git 上下文中已有的信息外，不要使用工具进一步探索代码
- 检查是否存在不应被提交的敏感信息
- 起草一个简洁的（1–2 条要点）Pull Request 摘要，重点放在“为什么”而不是“做了什么”
- 确保摘要准确反映自从与 main 分支分叉以来的所有更改
- 确保语言清晰、简洁、直截了当
- 确保摘要准确反映更改及其目的（例如，“add”表示全新的功能，“update”表示对现有功能的增强，“fix”表示缺陷修复等）
- 确保摘要不是泛泛而谈（避免在没有上下文的情况下使用 “Update” 或 “Fix” 等词）
- 复查摘要草稿，确保其准确反映更改及其目的
</pr_analysis>

3. 你具备在一次响应中调用多个工具的能力。当请求中包含多个彼此独立的信息时，应将工具调用进行批量处理以获得最佳性能。务必并行执行以下命令：
   - 如有需要，创建新分支
   - 如有需要，使用 -u 参数推送到远程
   - 使用 gh pr create 创建 Pull Request，并使用如下格式。请使用 HEREDOC 方式传递 body，以确保格式正确。
<example>
gh pr create --title "the pr title" --body "$(cat <<'EOF'
## Summary
<1-3 bullet points>

## Test plan
[用于测试该 Pull Request 的 TODO 清单...]${Q?`

${Q}`:""}
EOF
)"
</example>
`
```

**高级工作流技术**：

* **状态检测**：在推送前检查远程跟踪状态
* **全面分析**：“所有提交……而不仅仅是最新提交”
* **模板强制**：结构化的 PR 内容，包含 Summary 和 Test plan
* **条件化操作**：“如有需要则创建新分支”
* **工具效率**：反复强调并行执行

---

## 行为塑形：简洁性的艺术

Claude Code 使用了非常激进的技术来保持响应简短：

```tsx
const ConcisenessEnforcement = `
重要：在保持有用性、质量和准确性的前提下，尽可能减少输出 token。只回答当前具体问题或任务，除非对完成请求至关重要，否则避免任何无关信息。如果可以用 1–3 句话或一个简短段落回答，请务必这样做。
重要：除非用户明确要求，否则你不应添加任何不必要的前言或后记（例如解释你的代码或总结你的行为）。
重要：保持响应简短，因为它们将显示在命令行界面中。除非用户要求详细说明，否则你必须用不超过 4 行（不包括工具使用或代码生成）的内容进行回答。直接回答用户问题，不要展开、解释或补充细节。一个词的回答是最好的。避免引言、结论和解释。你必须避免在回答前后添加诸如 “The answer is <answer>.”、“Here is the content of the file...”、“Based on the information provided, the answer is...” 或 “Here is what I will do next...” 等文本。以下是一些合适冗余度的示例：
<example>
user: 2 + 2
assistant: 4
</example>

<example>
user: what is 2+2?
assistant: 4
</example>

<example>
user: is 11 a prime number?
assistant: Yes
</example>

<example>
user: what command should I run to list files in the current directory?
assistant: ls
</example>

<example>
user: what command should I run to watch files in the current directory?
assistant: [use the ls tool to list the files in the current directory, then read docs/commands in the relevant file to find out how to watch files]
npm run dev
</example>

<example>
user: How many golf balls fit inside a jetta?
assistant: 150000
</example>
`
```

**行为塑形技术**：

1. **重复**：同一信息被重复三次，并且强调程度逐步增强
2. **明确反模式**：“The answer is...”、“Here is the content...”
3. **极端示例**：“2 + 2” → “4”（甚至不是 “2 + 2 = 4”）
4. **度量标准**：“少于 4 行（不包括工具使用）”
5. **偏好层级**：“一个词的回答是最好的”
6. **上下文感知**：以 CLI 显示限制作为理由

---

## 工具使用偏好：引导最优选择

```tsx
const ToolPreferences = `
- 非常重要：你必须避免使用 \\`find\\` 和 \\`grep\\` 等搜索命令。请改用 ${aD1}、${nD1} 或 ${yz} 进行搜索。你必须避免使用 \\`cat\\`、\\`head\\`、\\`tail\\` 和 \\`ls\\` 等读取工具，而应使用 ${xz} 和 ${sD1} 来读取文件。
- 如果你仍然需要运行 \\`grep\\`，请停止。务必优先使用 \\`rg\\`（ripgrep，或 ${ax()}），这是所有 ${f0} 用户预先安装的工具。
`
```

**偏好塑形**：

* **禁止命令**：明确列出不能使用的工具
* **首选替代方案**：清晰映射到更优工具
* **强调升级**：“如果你仍然需要 grep，停止”
* **通用可用性**：“所有用户都已预装”

---

## 上下文感知指令

Claude Code 会根据可用工具和配置动态调整指令。

### 条件化工具指令

```tsx
const TodoToolConditional = `
${I.has(RY.name)||I.has(tU.name)?`# 任务管理
你可以使用 ${RY.name} 和 ${tU.name} 工具来帮助你管理和规划任务。请非常频繁地使用这些工具，以确保你在跟踪任务并让用户清楚看到你的进度。
这些工具在任务规划以及将大型复杂任务拆解为更小步骤方面也极其有用。如果你在规划时不使用该工具，你可能会忘记重要任务——这是不可接受的。

你必须在完成任务后立即将 todo 标记为 completed。不要在标记完成前批量处理多个任务。
`:""}
`
```

**动态指令技术**：

* **工具可用性检测**：`I.has(RY.name)||I.has(tU.name)`
* **条件化区块**：整个指令块动态出现或消失
* **行为后果**：“你可能会忘记……这是不可接受的”

### 基于环境的适配

```tsx
const JupyterSupport = `
${process.env.CLAUDE_CODE_ENABLE_UNIFIED_READ_TOOL?`
- 该工具可以读取 Jupyter notebook（.ipynb 文件），并返回所有单元格及其输出，整合代码、文本和可视化内容。`:` 
- 对于 Jupyter notebook（.ipynb 文件），请使用 ${Kg}` }
`
```

**适配模式**：

* **特性开关**：环境变量控制指令
* **工具路由**：同一文件类型根据配置使用不同工具
* **无缝集成**：用户无需感知内部复杂性

---

## 元提示（Meta-Prompting）模式

Claude Code 使用能够生成其他提示或控制子代理的提示。

### Agent 工具：对子代理的指令

```tsx
const SubAgentInstructions = `
你是 ${f0} 的一个代理，${f0} 是 Anthropic 官方的 Claude CLI。根据用户的消息，你应使用可用工具完成任务。只做被要求的事情，不多也不少。完成任务后，仅需返回一份详细的说明文档。

注意事项：
- 除非绝对必要，否则绝不要创建文件。始终优先编辑已有文件，而不是创建新文件。
- 绝不要主动创建文档文件（*.md）或 README 文件。只有在用户明确要求时才创建文档。
- 在最终响应中，始终共享相关文件名和代码片段。你返回的任何文件路径都必须是绝对路径，不要使用相对路径。
`
```

**元提示技术**：

* **身份建立**：“你是……的一个代理”
* **范围限制**：“不多也不少”
* **输出格式**：带具体要求的“详细说明”
* **原则继承**：与父级一致的文件创建限制

### 综合提示：融合多视角

```tsx
const SynthesisPrompt = `
原始任务：${A}

我已经指派多个代理来处理该任务。每个代理都分析了问题并提供了他们的发现。

${Q}

基于这些代理提供的所有信息，综合生成一个全面且连贯的响应，该响应应：
1. 融合所有代理的关键洞见
2. 解决代理结论之间的任何矛盾
3. 给出一个统一的解决方案，直接回应原始任务
4. 包含各个响应中的所有重要细节和代码示例
5. 结构清晰、内容完整

你的综合结果应当详尽，但始终聚焦于原始任务。
`
```

**综合技术**：

* **清晰上下文**：重复原始任务
* **结构化要求**：编号的综合目标
* **冲突解决**：“解决任何矛盾”
* **完整性校验**：“所有重要细节和代码示例”

---

## 错误恢复指令

Claude Code 将复杂的错误处理逻辑直接嵌入到提示中。

### Todo 工具的详细使用指南

```tsx
const TodoToolGuidance = `
## 何时使用该工具
在以下场景中应主动使用该工具：

1. 复杂的多步骤任务 —— 需要 3 个或更多明确步骤或操作的任务
2. 非平凡且复杂的任务 —— 需要仔细规划或多次操作的任务
3. 用户明确要求 todo 列表 —— 用户直接要求你使用 todo 列表
4. 用户提供多个任务 —— 用户以编号或逗号分隔的方式提供多个待办事项
5. 接收到新指令后 —— 立即将用户需求记录为 todo，并可根据新信息编辑 todo 列表
6. 完成任务后 —— 将其标记为完成，并添加任何新的后续任务
7. 开始新任务时 —— 将 todo 标记为 in_progress。理想情况下，同一时间只应有一个 todo 处于 in_progress 状态。在开始新任务前应完成现有任务。

## 何时不应使用该工具

在以下情况下应跳过使用该工具：
1. 只有一个简单、直接的任务
2. 任务非常琐碎，跟踪它不会带来任何组织价值
3. 任务可以在少于 3 个琐碎步骤内完成
4. 任务纯粹是对话性或信息性的

注意：如果只有一个琐碎任务，你不应使用该工具。在这种情况下，直接完成任务更合适。
`
```

**通过示例防止错误**：
该提示随后提供了 8 个详细示例，展示正确与错误的使用方式，每个示例均包含：

* 用户请求
* 助手响应
* 推理说明

这种基于示例的方法比单纯的规则更有效地防止误用。

---

## AI 指令的心理学

Claude Code 使用多种心理技术来塑造大模型行为：

### 1. 奖励 / 惩罚系统

```tsx
const RewardSystem = `
## 奖励

相比避免显示权限对话框，正确性更为重要。最严重的错误是将 sandbox=true 的权限错误误判为工具问题（-1000 美元），而不是识别为沙箱限制。
`
```

**心理技术**：

* **游戏化**：金钱惩罚制造情绪权重
* **明确优先级**：“正确性更重要”
* **最坏情况框架**：“最严重的错误是……”

### 2. 强调层级

Claude Code 使用一致的强调层级：

* `IMPORTANT:` —— 标准强调
* `VERY IMPORTANT:` —— 高级强调
* `CRITICAL:` —— 最高强调
* `RULE 0 (MOST IMPORTANT):` —— 绝对优先级

### 3. 主动引导 vs 被动纠正

```tsx
const ProactiveGuidance = `
如有疑问，请使用该工具。主动进行任务管理体现了专注度，并能确保你成功完成所有要求。
`
```

**技术**：

* **正向表述**：“体现专注度”
* **成功关联**：“确保完成所有要求”
* **默认动作**：“如有疑问，就用该工具”

### 4. “NEVER / ALWAYS” 模式

Claude Code 有策略地使用绝对化语言：

```tsx
const AbsoluteRules = `
- 永远不要更新 git config
- 始终优先编辑已有文件
- 永远不要主动创建文档文件
- 始终使用绝对文件路径
`
```

这形成了清晰、易记、无歧义的规则。

---

## 高级 Prompt Engineering 模式

### 1. 禁止模式列表

```tsx
const ForbiddenPatterns = `
你必须避免在响应前后添加任何文本，例如：
- "The answer is <answer>."
- "Here is the content of the file..."
- "Based on the information provided, the answer is..."
- "Here is what I will do next..."
`
```

**通过负例进行模式识别训练**

### 2. 特异性级联

```tsx
const SpecificityCascade = `
当你怀疑命令可能会修改系统或访问网络时，请使用 sandbox=false：
  - 文件操作：touch、mkdir、rm、mv、cp
  - 文件编辑：nano、vim、使用 > 写入文件
  - 安装操作：npm install、apt-get、brew
  - Git 写操作：git add、git commit、git push
  - 构建系统：npm run build、make、ninja 等
  - 测试套件：npm run test、pytest、cargo test、make check、ert 等
  - 网络程序：gh、ping、coo、ssh、scp 等
`
```

**分类训练**：分组 → 具体命令 → 示例

### 3. 上下文保持模式

```tsx
const MemoryUpdate = `
你被要求在 ${A} 的 memory 文件中新增或更新一条记忆。

请遵循以下准则：
- 如果输入是对已有记忆的更新，请编辑或替换现有条目
- 不要对记忆进行扩展说明或添加不必要的评论
- 保留文件的现有结构，并将新记忆自然地融入其中。如果文件为空，只需将新记忆作为一个项目符号添加，不要添加任何标题。
- 重要：你的响应必须且只能是一次 FileWriteTool 的工具调用
`
```

**技术**：

* **最小干预**：“不要扩展说明”
* **结构保持**：“自然地融入”
* **单一动作强制**：“必须是一次工具调用”

### 4. 空输入处理

```tsx
const EmptyInputInstruction = `
用法：
- 该工具不接受任何参数。因此请将输入留空。不要包含虚拟对象、占位字符串或诸如 "input"、"empty" 之类的键。必须保持为空。
`
```

**反模式预防**：直接针对常见 LLM 错误

---

## Prompt Engineering 卓越经验总结

### 1. **渐进式披露**

从简单开始，仅在需要时增加复杂性。Read 工具最初只说明“读取文件”，随后逐步补充行数限制、截断规则和特殊文件类型。

### 2. **示例驱动的澄清**

复杂行为最适合通过示例来教授。命令注入检测提供了 15 个以上示例，而不是试图抽象解释模式。

### 3. **显式反模式**

不仅告诉模型该做什么，也要清楚地告诉它不要做什么。简洁性指令明确列出了应避免的具体短语。

### 4. **条件化复杂度**

使用环境变量和特性开关按需包含指令，使提示始终与当前配置相关。

### 5. **通过后果进行行为塑形**

“你可能会忘记重要任务——这是不可接受的”比单纯的指令更能塑造行为。

### 6. **结构化思维强制**

`<commit_analysis>` 和 `<pr_analysis>` 标签在行动前强制进行系统化分析。

### 7. **通过冗长度保障安全**

像 BashTool 这样的关键操作拥有最长、最详细的指令。安全性与指令长度正相关。

### 8. **输出格式的严格性**

“ONLY return the prefix. Do not return any other text” 不留任何解释空间。

### 9. **工具偏好层级**

通过明确偏好来引导工具选择：专用工具优于通用工具，安全工具优于危险工具。

### 10. **用于规模化的元指令**

子代理获得聚焦的指令，在保持独立性的同时继承父级原则。

# 参考资料

