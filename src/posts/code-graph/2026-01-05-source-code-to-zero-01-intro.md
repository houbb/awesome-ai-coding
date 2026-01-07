---
title: 从源码编译到计算机字节码经历了什么？
date: 2026-01-05
categories: [AI]
tags: [ai, ai-coding, code-graph, sh]
published: true
---

# 源码===》字节码

下面我会按**“从工程现实出发、同时不失编译原理严谨性”**的方式，把**经典语言编译从源代码到 0/1 的完整路径**系统拆开，并明确每一阶段的**输入 / 输出 / 关键技术 / 现实中的实现形态**。

我会刻意区分三条线索：

1. **经典编译理论中的标准流水线**
2. **现代工业级编译器的真实形态**
3. **你当前关心的 AI / 代码理解 / RAG 体系中，这些阶段各自的价值**

---

# 一、整体鸟瞰：从源代码到 0 和 1

先给你一张“压缩版”的总览图：

```
Source Code
  ↓
1. 词法分析（Lexical Analysis）
  ↓ Tokens
2. 语法分析（Syntax Analysis）
  ↓ CST / Parse Tree
3. 抽象语法树（AST）
  ↓
4. 语义分析（Semantic Analysis）
  ↓
5. 中间表示（IR）
  ↓
6. 优化（Optimization）
  ↓
7. 目标代码生成（Code Generation）
  ↓
8. 汇编（Assembler）
  ↓
9. 链接（Linker）
  ↓
Machine Code（0 和 1）
```

这条链路在**C / C++ / Rust / Go / Java（AOT）**中基本成立。

---

# 二、逐阶段拆解（从源码开始）

下面我按**每一步：做什么 / 核心技术 / 产物 / 工程中的代表实现**来讲。

---

## 1️⃣ 词法分析（Lexical Analysis / Lexer）

### 做什么

把**字符流**变成**有意义的最小单元（Token）**。

源码：

```java
int a = b + 1;
```

变成：

```
KEYWORD(int)
IDENTIFIER(a)
OPERATOR(=)
IDENTIFIER(b)
OPERATOR(+)
INTEGER_LITERAL(1)
SEMICOLON
```

---

### 核心技术

* 正则表达式
* 有限自动机（DFA / NFA）
* 最长匹配原则（Maximal Munch）

---

### 工程实现

* Lex / Flex
* ANTLR Lexer
* Tree-sitter lexer（内嵌）

---

### 现实意义

* **性能极高**
* 错误恢复能力弱
* 是后续一切结构的“入口”

---

## 2️⃣ 语法分析（Syntax Analysis / Parser）

### 做什么

把 Token 按语法规则组织成树。

---

### 产物

* **CST（Concrete Syntax Tree）**
* 或 Parse Tree

---

### 核心技术

* 上下文无关文法（CFG）
* LL / LR / LALR / GLR / PEG
* 递归下降
* 冲突消解（shift/reduce）

---

### 工程实现

* ANTLR（LL(*)）
* Bison（LALR）
* Tree-sitter（GLR + 增量）

---

### 现实意义

* 决定语言“长什么样”
* IDE / 格式化 / refactor 的基础

---

## 3️⃣ AST（Abstract Syntax Tree）

> **这是“经典教材”和“工业实现”的第一个分水岭**

### 做什么

从 CST 中**去掉所有“无语义价值”的结构**，保留语义骨架。

---

### 示例

CST → AST：

* 去掉 `(` `)` `{}` `;`
* 折叠表达式层级

---

### 核心技术

* Tree rewrite
* Visitor / Pattern matching
* Grammar-driven AST or hand-written AST

---

### 工程实现

* javac AST
* clang AST
* Rust HIR / MIR（多级 AST）

---

### 现实意义

* **后续所有“理解代码”的基础**
* 比 CST 稳定得多

---

## 4️⃣ 语义分析（Semantic Analysis）

### 做什么

回答“**这段代码在逻辑上是否合法**”。

---

### 核心检查

* 变量是否声明
* 类型是否匹配
* 作用域是否合法
* 函数/方法调用是否合法
* 重载、泛型、trait、interface 解析

---

### 核心技术

* 符号表（Symbol Table）
* 作用域链
* 类型系统（Type Inference / Checking）
* 控制流分析（初步）

---

### 工程实现

* javac 的 Enter / Attr 阶段
* clang Sema
* Rust borrow checker（语义分析的巅峰形态）

---

### 产物

* **带类型和符号信息的 AST**
* 或新的中间表示

---

## 5️⃣ 中间表示（IR, Intermediate Representation）

> **这是现代编译器真正的“核心战场”**

### 做什么

把代码转换成**与语言无关、与平台弱相关**的表示。

---

### 常见 IR 形态

#### 1. 三地址码（TAC）

```
t1 = b + 1
a = t1
```

#### 2. SSA（Static Single Assignment）

```
t1 = add b, 1
a = t1
```

---

### 核心技术

* SSA 构建
* 控制流图（CFG）
* 基本块（Basic Block）
* Dominator Tree

---

### 工程实现

* LLVM IR
* JVM Bytecode（某种 IR）
* WebAssembly
* Go SSA

---

### 现实意义

* **优化的主要载体**
* 多语言、多后端复用的关键

---

## 6️⃣ 优化（Optimization）

### 做什么

在**不改变语义**的前提下，让程序：

* 更快
* 更小
* 更省资源

---

### 核心优化技术

#### 局部优化

* 常量折叠
* 公共子表达式消除
* 死代码消除

#### 全局优化

* 内联
* 循环展开
* 强度削弱
* Escape Analysis

---

### 工程实现

* LLVM Pass
* JVM JIT 编译器（C1 / C2）
* GCC Optimization Levels (-O2/-O3)

---

## 7️⃣ 目标代码生成（Code Generation）

### 做什么

把 IR 映射为**目标架构相关的指令**。

---

### 核心技术

* 指令选择（Instruction Selection）
* 寄存器分配（Graph Coloring）
* 指令调度

---

### 工程实现

* LLVM backend
* GCC backend

---

### 产物

* 汇编代码（Assembly）

---

## 8️⃣ 汇编（Assembler）

### 做什么

把汇编代码转成**机器指令（二进制）**。

---

### 工程实现

* as（GNU assembler）
* LLVM MC

---

## 9️⃣ 链接（Linker）

### 做什么

把多个目标文件 + 库：

* 合并
* 重定位
* 解析符号

---

### 核心技术

* 符号解析
* 地址重定位
* 静态 / 动态链接

---

### 工程实现

* ld
* lld
* gold

---

### 最终产物

```
ELF / PE / Mach-O
→ 0 和 1
```

---

# 三、不同语言在这条链路中的“变体”

### Java（HotSpot）

```
.java
 → AST
 → Bytecode
 → JIT
 → Machine Code
```

### JavaScript

```
JS
 → AST
 → IR
 → JIT
```

### Python

```
.py
 → AST
 → Bytecode
 → VM
```

---

# 四、核心技术全景总结（按学科）

| 学科   | 技术            |
| ---- | ------------- |
| 自动机  | DFA / NFA     |
| 形式语言 | CFG / PEG     |
| 数据结构 | 树 / CFG / SSA |
| 算法   | 图算法 / 优化      |
| 系统   | ABI / 指令集     |
| 工程   | 增量编译 / JIT    |

---

# 五、站在你当前关注点的“工程结论”

结合你近期研究的：

* **Tree-sitter**
* **Code Graph**
* **RAG**
* **AI 编程平台**

可以这样定位：

> **编译器前端（Lexer + CST + AST）是“结构事实层”
> IR + CFG + Call Graph 是“程序行为层”
> AI / LLM 是“推理与生成层”**


# 参考资料

https://github.com/tree-sitter/tree-sitter

