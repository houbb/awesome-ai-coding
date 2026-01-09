---

title: calude-code-03-控制流 & 编排引擎（Control Flow & The Orchestration Engine）
date: 2025-03-07
categories: [AI]
tags: [ai, calude-code, sh]
published: true
---




# 控制流 & 编排引擎（Control Flow & The Orchestration Engine）

```mermaid
sequenceDiagram
    participant User
    participant MainLoop as Main Loop (tt)
    participant LLM as LLM API
    participant ToolBatch as Tool Batcher
    participant Tool1 as ReadTool
    participant Tool2 as GrepTool
    participant Tool3 as EditTool
    participant UI as UI Renderer
    User->>MainLoop: “搜索 TODO 注释并更新它们”
    MainLoop->>LLM: 携带上下文的流式请求
    LLM-->>MainLoop: text_delta: “我将搜索 TODO……”
    MainLoop-->>UI: 更新显示
    LLM-->>MainLoop: tool_use: GrepTool
    LLM-->>MainLoop: tool_use: ReadTool（多个文件）
    LLM-->>MainLoop: message_stop
    MainLoop->>ToolBatch: 执行工具批次
    par 并行执行
        ToolBatch->>Tool1: ReadTool.call() [只读]
        ToolBatch->>Tool2: GrepTool.call() [只读]
        Tool1-->>UI: 进度：“正在读取 file1.js”
        Tool2-->>UI: 进度：“正在搜索 *.js”
        Tool1-->>ToolBatch: 结果：文件内容
        Tool2-->>ToolBatch: 结果：5 个匹配项
    end
    ToolBatch->>MainLoop: 工具结果
    MainLoop->>LLM: 携带结果继续
    LLM-->>MainLoop: tool_use: EditTool
    MainLoop->>ToolBatch: 执行写工具
    Note over ToolBatch, Tool3: 顺序执行
    ToolBatch->>Tool3: EditTool.call() [写]
    Tool3-->>UI: 进度：“正在编辑 file1.js”
    Tool3-->>ToolBatch: 结果：成功
    ToolBatch->>MainLoop: 编辑完成
    MainLoop->>LLM: 携带结果继续
    LLM-->>MainLoop: text_delta: “已更新 5 个 TODO……”
    MainLoop-->>UI: 最终响应
```

---

## 主对话循环：一个流式状态机（The Main Conversation Loop: A Streaming State Machine）

Claude Code 的核心是 `tt` 这个 async generator 函数——一个精密的状态机，负责编排整个对话流程。下面是其实际结构：

```tsx
// 带时间注解的重构主循环签名
async function* tt(
  currentMessages: CliMessage[],         // 完整历史 - 内存：O(对话长度)
  baseSystemPromptString: string,        // 静态提示词 - ~2KB
  currentGitContext: GitContext,         // Git 状态 - 通常 ~1–5KB
  currentClaudeMdContents: ClaudeMdContent[], // 项目上下文 - ~5–50KB
  permissionGranterFn: PermissionGranter, // 权限回调
  toolUseContext: ToolUseContext,         // 共享上下文 - ~10KB
  activeStreamingToolUse?: ToolUseBlock,  // 恢复状态
  loopState: {
    turnId: string,        // 本轮的 UUID
    turnCounter: number,   // 递归深度
    compacted?: boolean,   // 是否压缩过历史？
    isResuming?: boolean   // 是否从保存点恢复？
  }
): AsyncGenerator<CliMessage, void, void> {
  // ┌─ 阶段 1：上下文准备 [~50–200ms]
  // ├─ 阶段 2：自动压缩检查 [若触发则 ~0–3000ms]
  // ├─ 阶段 3：系统提示词组装 [~10–50ms]
  // ├─ 阶段 4：LLM 流式处理 [~2000–10000ms]
  // ├─ 阶段 5：工具执行 [每个工具 ~100–30000ms]
  // └─ 阶段 6：递归或完成 [~0ms]
}
```

---

### 阶段 1：上下文窗口管理（Context Window Management）

控制流中的第一个关键决策是是否需要对对话进行压缩：

```tsx
// 自动压缩逻辑（推断实现）
class ContextCompactionController {
  private static readonly COMPACTION_THRESHOLDS = {
    tokenCount: 100_000,      // 激进的 token 上限
    messageCount: 200,        // 消息数量兜底阈值
    costThreshold: 5.00       // 基于成本的触发条件
  };

  static async shouldCompact(
    messages: CliMessage[],
    model: string
  ): Promise<boolean> {
    // 快路径：先检查消息数量
    if (messages.length < 50) return false;

    // 慢路径：统计 token
    const tokenCount = await this.estimateTokens(messages, model);

    return tokenCount > this.COMPACTION_THRESHOLDS.tokenCount ||
           messages.length > this.COMPACTION_THRESHOLDS.messageCount;
  }

  static async compact(
    messages: CliMessage[],
    context: ToolUseContext
  ): Promise<CompactionResult> {
    // 阶段 1：识别需要保留的消息
    const preserve = this.identifyPreservedMessages(messages);

    // 阶段 2：通过 LLM 生成摘要
    const summary = await this.generateSummary(
      messages.filter(m => !preserve.has(m.uuid)),
      context
    );

    // 阶段 3：重建消息历史
    return {
      messages: [
        this.createSummaryMessage(summary),
        ...messages.filter(m => preserve.has(m.uuid))
      ],
      tokensaved: this.calculateSavings(messages, summary)
    };
  }
}
```

**性能特征**：

* Token 统计：O(n)，n 为消息内容总长度
* 摘要生成：一次额外的 LLM 调用（~2–3 秒）
* 内存影响：压缩期间临时将消息存储翻倍

---

### 阶段 2：动态系统提示词组装（Dynamic System Prompt Assembly）

系统提示词的组装体现了复杂的缓存与组合策略：

```tsx
// 系统提示词组合流水线
class SystemPromptAssembler {
  private static cache = new Map<string, {
    content: string,
    hash: string,
    expiry: number
  }>();

  static async assemble(
    basePrompt: string,
    claudeMd: ClaudeMdContent[],
    gitContext: GitContext,
    tools: ToolDefinition[],
    model: string
  ): Promise<string | ContentBlock[]> {
    // 并行获取动态组件
    const [
      claudeMdSection,
      gitSection,
      directorySection,
      toolSection
    ] = await Promise.all([
      this.formatClaudeMd(claudeMd),
      this.formatGitContext(gitContext),
      this.getDirectoryStructure(),
      this.formatToolDefinitions(tools)
    ]);

    // 模型特定适配
    const modelSection = this.getModelAdaptations(model);

    // 智能截断并组合
    return this.compose({
      base: basePrompt,            // 优先级 1
      model: modelSection,         // 优先级 2
      claudeMd: claudeMdSection,   // 优先级 3
      git: gitSection,             // 优先级 4
      directory: directorySection, // 优先级 5
      tools: toolSection           // 优先级 6
    });
  }

  private static getModelAdaptations(model: string): string {
    // 模型特定的提示词工程
    const adaptations = {
      'claude-3-opus': {
        style: 'detailed',
        instructions: '逐步思考，展示你的推理过程。',
        tokenBudget: 0.3  // 30% 的上下文用于推理
      },
      'claude-3-sonnet': {
        style: 'balanced',
        instructions: '简洁但全面。',
        tokenBudget: 0.2
      },
      'claude-3-haiku': {
        style: 'brief',
        instructions: '快速切入要点。',
        tokenBudget: 0.1
      }
    };

    const config = adaptations[model] || adaptations['claude-3-sonnet'];
    return this.formatModelInstructions(config);
  }
}
```

---

### 阶段 3：流式状态机（The Streaming State Machine）

LLM 流式阶段实现了一个复杂的事件驱动状态机：

```tsx
// 流事件处理状态机
class StreamEventProcessor {
  private state: {
    phase: 'idle' | 'message_start' | 'content' | 'tool_input' | 'complete';
    currentMessage: Partial<CliMessage>;
    contentBlocks: ContentBlock[];
    activeToolInput?: {
      toolId: string;
      buffer: string;
      parser: StreamingToolInputParser;
    };
    metrics: {
      firstTokenLatency?: number;
      tokensPerSecond: number[];
    };
  };

  async *processStream(
    stream: AsyncIterable<StreamEvent>
  ): AsyncGenerator<UIEvent | CliMessage> {
    for await (const event of stream) {
      switch (event.type) {
        case 'message_start':
          this.state.phase = 'message_start';
          this.state.metrics.firstTokenLatency = Date.now() - startTime;
          yield { type: 'ui_state', data: { status: 'assistant_responding' } };
          break;

        case 'content_block_start':
          yield* this.handleContentBlockStart(event);
          break;

        case 'content_block_delta':
          yield* this.handleContentBlockDelta(event);
          break;

        case 'content_block_stop':
          yield* this.handleContentBlockStop(event);
          break;

        case 'message_stop':
          yield* this.finalizeMessage(event);
          break;

        case 'error':
          yield* this.handleError(event);
          break;
      }
    }
  }

  private async *handleContentBlockDelta(
    event: ContentBlockDeltaEvent
  ): AsyncGenerator<UIEvent> {
    const block = this.state.contentBlocks[event.index];

    switch (event.delta.type) {
      case 'text_delta':
        // 文本直接驱动 UI 更新
        block.text += event.delta.text;
        yield {
          type: 'ui_text_delta',
          data: {
            text: event.delta.text,
            blockIndex: event.index
          }
        };
        break;

      case 'input_json_delta':
        // 累积工具输入的 JSON
        if (this.state.activeToolInput) {
          this.state.activeToolInput.buffer += event.delta.partial_json;

          // 在关键位置尝试解析
          if (event.delta.partial_json.includes('}') ||
              event.delta.partial_json.includes(']')) {
            const result = this.state.activeToolInput.parser.addChunk(
              event.delta.partial_json
            );

            if (result.complete) {
              block.input = result.value;
              yield {
                type: 'ui_tool_preview',
                data: {
                  toolId: this.state.activeToolInput.toolId,
                  input: result.value
                }
              };
            }
          }
        }
        break;
    }
  }
}
```

---

### 阶段 4：工具执行流水线（The Tool Execution Pipeline）

工具执行系统实现了精细的并行 / 顺序混合执行策略：

```mermaid
graph TB
    subgraph "工具请求分析"
        ToolRequests[Tool Use Blocks] --> Categorize{按类型分类}
        Categorize -->|只读| ReadQueue[只读队列]
        Categorize -->|写 / 有副作用| WriteQueue[写队列]
    end

    subgraph "并行执行池"
        ReadQueue --> ParallelPool[并行执行器]
        ParallelPool --> Worker1[Worker 1]
        ParallelPool --> Worker2[Worker 2]
        ParallelPool --> WorkerN[Worker N]

        Worker1 --> Results1[结果 1]
        Worker2 --> Results2[结果 2]
        WorkerN --> ResultsN[结果 N]
    end

    subgraph "顺序执行"
        WriteQueue --> SeqExecutor[顺序执行器]
        Results1 --> SeqExecutor
        Results2 --> SeqExecutor
        ResultsN --> SeqExecutor

        SeqExecutor --> WriteTool1[写工具 1]
        WriteTool1 --> WriteTool2[写工具 2]
        WriteTool2 --> FinalResults[全部结果]
    end
```

```tsx
// 并行执行编排器
class ToolExecutionOrchestrator {
  private static readonly CONCURRENCY_LIMIT = 10;

  static async *executeToolBatch(
    toolUses: ToolUseBlock[],
    context: ToolUseContext,
    permissionFn: PermissionGranter
  ): AsyncGenerator<CliMessage> {
    // 阶段 1：工具分类
    const { readOnly, writeTools } = this.categorizeTools(toolUses);

    // 阶段 2：只读工具并行执行
    if (readOnly.length > 0) {
      yield* this.executeParallel(readOnly, context, permissionFn);
    }

    // 阶段 3：写工具顺序执行
    for (const tool of writeTools) {
      yield* this.executeSequential(tool, context, permissionFn);
    }
  }

  private static async *executeParallel(
    tools: ToolUseBlock[],
    context: ToolUseContext,
    permissionFn: PermissionGranter
  ): AsyncGenerator<CliMessage> {
    const executions = tools.map(tool =>
      this.createToolExecution(tool, context, permissionFn)
    );

    // 带背压的自定义并行 map
    yield* parallelMap(executions, this.CONCURRENCY_LIMIT);
  }
}
```

```tsx
// parallelMap 的实现
async function* parallelMap<T>(
  generators: AsyncGenerator<T>[],
  concurrency: number
): AsyncGenerator<T> {
  const executing = new Set<Promise<IteratorResult<T>>>();
  const pending = [...generators];

  // 填充初始并发槽位
  while (executing.size < concurrency && pending.length > 0) {
    const gen = pending.shift()!;
    executing.add(gen.next());
  }

  while (executing.size > 0) {
    // 竞争下一个完成的任务
    const result = await Promise.race(executing);
    executing.delete(result as any);

    if (!result.done) {
      yield result.value;

      // 继续该生成器
      const nextPromise = result.generator.next();
      executing.add(nextPromise);
    }

    // 若有空槽位则继续填充
    if (executing.size < concurrency && pending.length > 0) {
      const gen = pending.shift()!;
      executing.add(gen.next());
    }
  }
}
```

**执行时序分析**：

| 工具类型         | 并发度     | 典型延迟         | 瓶颈       |
| ------------ | ------- | ------------ | -------- |
| ReadTool     | 并行 (10) | 10–50ms      | 磁盘 I/O   |
| GrepTool     | 并行 (10) | 100–500ms    | CPU 正则   |
| WebFetchTool | 并行 (3)  | 500–3000ms   | 网络       |
| EditTool     | 顺序      | 20–100ms     | 校验       |
| BashTool     | 顺序      | 50–10000ms   | 进程执行     |
| AgentTool    | 并行 (5)  | 2000–20000ms | 子 LLM 调用 |

---

### 阶段 5：权限控制流（Permission Control Flow）

权限系统实现了一个多层级决策树：

```tsx
// 权限决策流程
class PermissionController {
  static async checkPermission(
    tool: ToolDefinition,
    input: any,
    context: ToolPermissionContext
  ): Promise<PermissionDecision> {
    // 第 1 层：显式拒绝规则（最高优先级）
    const denyRule = this.findMatchingRule(
      tool,
      input,
      context.alwaysDenyRules
    );
    if (denyRule) {
      return { behavior: 'deny', reason: denyRule };
    }

    // 第 2 层：模式覆盖
    if (context.mode === 'bypassPermissions') {
      return { behavior: 'allow', reason: 'bypass_mode' };
    }

    if (context.mode === 'acceptEdits' &&
        this.isEditTool(tool) &&
        this.isPathSafe(input.path)) {
      return { behavior: 'allow', reason: 'accept_edits_mode' };
    }

    // 第 3 层：显式允许规则
    const allowRule = this.findMatchingRule(
      tool,
      input,
      context.alwaysAllowRules
    );
    if (allowRule) {
      return { behavior: 'allow', reason: allowRule };
    }

    // 第 4 层：交互式询问
    return {
      behavior: 'ask',
      suggestions: this.generateRuleSuggestions(tool, input)
    };
  }

  private static findMatchingRule(
    tool: ToolDefinition,
    input: any,
    rules: Record<PermissionRuleScope, string[]>
  ): string | null {
    // 优先级顺序：cliArg > localSettings > projectSettings > ...
    const scopes: PermissionRuleScope[] = [
      'cliArg', 'localSettings', 'projectSettings',
      'policySettings', 'userSettings'
    ];

    for (const scope of scopes) {
      const scopeRules = rules[scope] || [];
      for (const rule of scopeRules) {
        if (this.matchesRule(tool, input, rule)) {
          return `${scope}:${rule}`;
        }
      }
    }

    return null;
  }
}
```

---

### 阶段 6：递归轮次管理（Recursive Turn Management）

控制流通过尾递归来实现多轮交互：

```tsx
// 递归控制与状态管理
class TurnController {
  static async *manageTurn(
    messages: CliMessage[],
    toolResults: CliMessage[],
    context: FullContext,
    loopState: LoopState
  ): AsyncGenerator<CliMessage> {
    // 检查递归深度
    if (loopState.turnCounter >= 10) {
      yield this.createSystemMessage(
        "已达到最大对话深度。请开始新的查询。"
      );
      return;
    }

    // 准备下一轮状态
    const nextState = {
      ...loopState,
      turnCounter: loopState.turnCounter + 1,
      compacted: false
    };

    // 合并下一轮消息
    const nextMessages = [
      ...messages,
      ...toolResults.sort(this.sortByToolRequestOrder)
    ];

    // 尾递归
    yield* tt(
      nextMessages,
      context.basePrompt,
      context.gitContext,
      context.claudeMd,
      context.permissionFn,
      context.toolContext,
      undefined,
      nextState
    );
  }
}
```

---

## 高级控制流模式（Advanced Control Flow Patterns）

### 1. 输入路由状态机（Input Router State Machine）

```mermaid
stateDiagram-v2
    [*] --> InputReceived
    InputReceived --> CommandDetection

    CommandDetection --> SlashCommand: 以 / 开头
    CommandDetection --> BashMode: 以 ! 开头
    CommandDetection --> MemoryMode: 以 # 开头
    CommandDetection --> PasteDetection: 粘贴事件
    CommandDetection --> NormalPrompt: 默认

    SlashCommand --> ExecuteCommand
    ExecuteCommand --> UpdateState
    UpdateState --> [*]

    BashMode --> CreateSyntheticTool
    CreateSyntheticTool --> MainLoop

    MemoryMode --> UpdateClaudeMd
    UpdateClaudeMd --> [*]

    PasteDetection --> DetectContent
    DetectContent --> ProcessImage: 检测到图片
    DetectContent --> ProcessText: 仅文本
    ProcessImage --> MainLoop
    ProcessText --> MainLoop

    NormalPrompt --> MainLoop
    MainLoop --> [*]
```

````tsx
// 输入路由器实现
class InputRouter {
  static async routeInput(
    input: string,
    context: AppContext
  ): Promise<RouterAction> {
    // 按优先级检测命令
    const matchers: [RegExp, InputHandler][] = [
      [/^\\/(\\w+)(.*)/, this.handleSlashCommand],
      [/^!(.+)/, this.handleBashMode],
      [/^#(.+)/, this.handleMemoryMode],
      [/^```[\\s\\S]+```$/, this.handleCodeBlock],
    ];

    for (const [pattern, handler] of matchers) {
      const match = input.match(pattern);
      if (match) {
        return handler(match, context);
      }
    }

    // 默认：普通提示
    return {
      type: 'prompt',
      message: this.createUserMessage(input)
    };
  }

  private static handleBashMode(
    match: RegExpMatchArray,
    context: AppContext
  ): RouterAction {
    const command = match[1];

    // 创建合成的 assistant 消息并触发工具调用
    const syntheticMessages = [
      {
        type: 'user',
        message: {
          role: 'user',
          content: `运行此命令：${command}`
        }
      },
      {
        type: 'assistant',
        message: {
          role: 'assistant',
          content: [
            {
              type: 'text',
              text: '我将为你运行该命令。'
            },
            {
              type: 'tool_use',
              id: `bash_${Date.now()}`,
              name: 'BashTool',
              input: { command, sandbox: false }
            }
          ]
        }
      }
    ];

    return {
      type: 'synthetic_conversation',
      messages: syntheticMessages
    };
  }
}
````

---

### 2. 流背压管理（Stream Backpressure Management）

```tsx
// 流式背压控制
class StreamBackpressureController {
  private buffer: Array<StreamEvent> = [];
  private pressure = {
    current: 0,
    threshold: 1000,  // 最大缓冲事件数
    paused: false
  };

  async *controlledStream(
    source: AsyncIterable<StreamEvent>
  ): AsyncGenerator<StreamEvent> {
    const iterator = source[Symbol.asyncIterator]();

    while (true) {
      // 检查压力
      if (this.pressure.current > this.pressure.threshold) {
        this.pressure.paused = true;
        await this.waitForDrain();
      }

      const { done, value } = await iterator.next();
      if (done) break;

      // 缓冲管理
      if (this.shouldBuffer(value)) {
        this.buffer.push(value);
        this.pressure.current++;
      } else {
        // 高优先级事件立即输出
        yield value;
      }

      // 定期清空缓冲
      if (this.buffer.length > 0 && !this.pressure.paused) {
        yield* this.drainBuffer();
      }
    }

    // 最终清空
    yield* this.drainBuffer();
  }

  private shouldBuffer(event: StreamEvent): boolean {
    // 不缓冲工具结果或错误
    return event.type === 'content_block_delta' &&
           event.delta.type === 'text_delta';
  }
}
```

---

### 3. AgentTool 分层控制流（AgentTool Hierarchical Control Flow）

```mermaid
graph TB
    subgraph "主 Agent"
        MainTT[主 tt 循环]
        MainContext[主上下文]
        MainTools[全部工具]
    end

    subgraph "AgentTool 调用"
        AgentRequest[AgentTool 请求]
        TaskSplitter[任务拆分器]

        TaskSplitter --> SubTask1[子任务 1]
        TaskSplitter --> SubTask2[子任务 2]
        TaskSplitter --> SubTaskN[子任务 N]
    end

    subgraph "子 Agent 1"
        SubLoop1[子 tt 循环]
        SubContext1[过滤后的上下文]
        SubTools1[工具（不含 AgentTool）]
    end

    subgraph "子 Agent 2"
        SubLoop2[子 tt 循环]
        SubContext2[过滤后的上下文]
        SubTools2[工具（不含 AgentTool）]
    end

    subgraph "综合"
        Collector[结果收集器]
        Synthesizer[LLM 综合器]
        FinalResult[综合结果]
    end

    MainTT --> AgentRequest
    AgentRequest --> TaskSplitter

    SubTask1 --> SubLoop1
    SubTask2 --> SubLoop2

    SubLoop1 --> Collector
    SubLoop2 --> Collector

    Collector --> Synthesizer
    Synthesizer --> FinalResult
    FinalResult --> MainTT
```

```tsx
// AgentTool 分层执行
class AgentToolExecutor {
  static async *execute(
    input: AgentToolInput,
    context: ToolUseContext,
    parentMessage: CliMessage
  ): AsyncGenerator<ToolProgress | ToolResult> {
    // 阶段 1：任务分析
    const subtasks = this.analyzeTask(input.prompt);

    // 阶段 2：创建子 Agent
    const subAgentPromises = subtasks.map(async (task, index) => {
      // 创建隔离上下文
      const subContext = {
        ...context,
        tools: context.tools.filter(t => t.name !== 'AgentTool'),
        abortController: this.createLinkedAbort(context.abortController),
        options: {
          ...context.options,
          maxThinkingTokens: this.calculateTokenBudget(input.prompt)
        }
      };

      // 运行子 Agent
      return this.runSubAgent(task, subContext, index);
    });

    // 阶段 3：并行执行并上报进度
    const results: SubAgentResult[] = [];
    for await (const update of this.trackProgress(subAgentPromises)) {
      if (update.type === 'progress') {
        yield {
          type: 'progress',
          toolUseID: parentMessage.id,
          data: update
        };
      } else {
        results.push(update.result);
      }
    }

    // 阶段 4：结果综合
    const synthesized = await this.synthesizeResults(results, input);

    yield {
      type: 'result',
      data: synthesized
    };
  }

  private static async synthesizeResults(
    results: SubAgentResult[],
    input: AgentToolInput
  ): Promise<string> {
    if (results.length === 1) {
      return results[0].content;
    }

    // 通过 LLM 进行多结果综合
    const synthesisPrompt = `
      将以下 ${results.length} 个发现综合成一个连贯的回复：
      ${results.map((r, i) => `发现 ${i+1}：\n${r.content}`).join('\n\n')}

      原始任务：${input.prompt}
    `;

    const synthesizer = new SubAgentExecutor({
      prompt: synthesisPrompt,
      model: input.model || 'claude-3-haiku',  // 用于综合的快速模型
      isSynthesis: true
    });

    return synthesizer.run();
  }
}
```

---

### 4. 错误恢复控制流（Error Recovery Control Flow）

```tsx
// 错误恢复状态机
class ErrorRecoveryController {
  private static recoveryStrategies = {
    'rate_limit': this.handleRateLimit,
    'context_overflow': this.handleContextOverflow,
    'tool_error': this.handleToolError,
    'network_error': this.handleNetworkError,
    'permission_denied': this.handlePermissionDenied
  };

  static async *handleError(
    error: any,
    context: ErrorContext
  ): AsyncGenerator<CliMessage> {
    const errorType = this.classifyError(error);
    const strategy = this.recoveryStrategies[errorType];

    if (strategy) {
      yield* strategy(error, context);
    } else {
      // 通用错误处理
      yield this.createErrorMessage(error);
    }
  }

  private static async *handleContextOverflow(
    error: ContextOverflowError,
    context: ErrorContext
  ): AsyncGenerator<CliMessage> {
    // 策略 1：降低 max_tokens
    if (error.details.requested_tokens > 4096) {
      yield this.createSystemMessage("正在减少响应大小……");

      const retry = await this.retryWithReducedTokens(
        context.request,
        Math.floor(error.details.requested_tokens * 0.7)
      );

      if (retry.success) {
        yield* retry.response;
        return;
      }
    }

    // 策略 2：强制压缩
    yield this.createSystemMessage("正在压缩对话历史……");
    const compacted = await this.forceCompaction(context.messages);

    // 使用压缩后的历史重试
    yield* this.retryWithMessages(compacted, context);
  }

  private static async *handleRateLimit(
    error: RateLimitError,
    context: ErrorContext
  ): AsyncGenerator<CliMessage> {
    // 多提供方兜底
    const providers = ['anthropic', 'bedrock', 'vertex'];
    const current = context.provider;
    const alternatives = providers.filter(p => p !== current);

    for (const provider of alternatives) {
      yield this.createSystemMessage(
        `在 ${current} 上触发限流，尝试 ${provider}……`
      );

      try {
        const result = await this.retryWithProvider(
          context.request,
          provider
        );
        yield* result;
        return;
      } catch (e) {
        continue;
      }
    }

    // 所有提供方均不可用
    yield this.createErrorMessage(
      "所有提供方均已触发限流，请稍后再试。"
    );
  }
}
```

---

## 性能剖析点（Performance Profiling Points）

控制流中包含了关键的性能埋点：

```tsx
// 性能测量集成
class PerformanceProfiler {
  private static spans = new Map<string, PerformanceSpan>();

  static instrument<T extends AsyncGenerator>(
    name: string,
    generator: T
  ): T {
    return (async function* () {
      const span = tracer.startSpan(name);
      const start = performance.now();

      try {
        let itemCount = 0;
        for await (const item of generator) {
          itemCount++;

          // 统计两次 yield 之间的时间
          if (itemCount > 1) {
            span.addEvent('yield', {
              'yield.latency': performance.now() - lastYield
            });
          }

          yield item;
          lastYield = performance.now();
        }

        span.setAttributes({
          'generator.yield_count': itemCount,
          'generator.total_time': performance.now() - start
        });
      } finally {
        span.end();
      }
    })() as T;
  }
}
```


# 参考资料

