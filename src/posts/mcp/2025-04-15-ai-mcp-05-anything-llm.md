---

title: AI MCP(大模型上下文)-05-anything-llm AnythingLLM 您一直在寻找的全方位AI应用程序
date: 2025-4-15
categories: [AI]
tags: [ai, mcp, sh]
published: true
---

# AI MCP 系列

[AgentGPT-01-入门介绍](https://houbb.github.io/2025/04/03/ai-brower-agent-01-agentGPT)

[Browser-use 是连接你的AI代理与浏览器的最简单方式](https://houbb.github.io/2025/04/03/ai-brower-agent-02-browser-use)

[AI MCP(大模型上下文)-01-入门介绍](https://houbb.github.io/2025/04/15/ai-mcp-01-intro)

[AI MCP(大模型上下文)-02-awesome-mcp-servers 精选的 MCP 服务器](https://houbb.github.io/2025/04/15/ai-mcp-02-awesome-servers)

[AI MCP(大模型上下文)-03-open webui 介绍 是一个可扩展、功能丰富且用户友好的本地部署 AI 平台，支持完全离线运行。](https://houbb.github.io/2025/04/15/ai-mcp-03-open-webui)

[AI MCP(大模型上下文)-04-n8n 为技术团队打造的安全工作流自动化平台](https://houbb.github.io/2025/04/15/ai-mcp-04-n8n)

[AI MCP(大模型上下文)-05-anything-llm AnythingLLM 您一直在寻找的全方位AI应用程序](https://houbb.github.io/2025/04/15/ai-mcp-05-anything-llm)

[AI MCP(大模型上下文)-06-maxkb 强大易用的企业级 AI 助手](https://houbb.github.io/2025/04/15/ai-mcp-06-maxkb)

[AI MCP(大模型上下文)-07-dify 入门介绍](https://houbb.github.io/2025/04/15/ai-mcp-07-dify-intro)

[AI MCP(大模型上下文)-08-分享一些好用的 Dify DSL 工作流程](https://houbb.github.io/2025/04/15/ai-mcp-08-awesome-dify-workflow)

[AI MCP(大模型上下文)-09-基于Dify自主创建的AI应用DSL工作流](https://houbb.github.io/2025/04/15/ai-mcp-09-difyaia)

[AI MCP(大模型上下文)-10-Activepieces 一个开源的 Zapier 替代方案](https://houbb.github.io/2025/04/15/ai-mcp-10-activepieces)

[AI MCP(大模型上下文)-11-微软 Playwright MCP server](https://houbb.github.io/2025/04/15/ai-mcp-11-playwright-mcp)

[AI MCP(大模型上下文)-12-AWS MCP](https://houbb.github.io/2025/04/15/ai-mcp-12-aws-mcp)

[AI MCP(大模型上下文)-13-github MCP](https://houbb.github.io/2025/04/15/ai-mcp-13-github-mcp)

#  AnythingLLM 您一直在寻找的全方位AI应用程序。

与您的文档聊天，使用AI代理，高度可配置，多用户，无需繁琐的设置。

适用于桌面（Mac、Windows和Linux）的AnythingLLM！

这是一个全栈应用程序，可以将任何文档、资源（如网址链接、音频、视频）或内容片段转换为上下文，以便任何大语言模型（LLM）在聊天期间作为参考使用。此应用程序允许您选择使用哪个LLM或向量数据库，同时支持多用户管理并设置不同权限。

### 产品概览

AnythingLLM是一个全栈应用程序，您可以使用现成的商业大语言模型或流行的开源大语言模型，再结合向量数据库解决方案构建一个私有ChatGPT，不再受制于人：您可以本地运行，也可以远程托管，并能够与您提供的任何文档智能聊天。

AnythingLLM将您的文档划分为称为`workspaces` (工作区)的对象。

工作区的功能类似于线程，同时增加了文档的容器化。工作区可以共享文档，但工作区之间的内容不会互相干扰或污染，因此您可以保持每个工作区的上下文清晰。

## AnythingLLM的一些酷炫特性
- 🆕 [**自定义AI代理**](https://docs.anythingllm.com/agent/custom/introduction)
- 🆕 [**无代码AI代理构建器**](https://docs.anythingllm.com/agent-flows/overview)
- 🖼️ **多用户实例支持和权限管理（支持封闭源和开源LLM！）**
- 👤 多用户实例支持和权限管理 _仅限Docker版本_
- 🦾 工作区内的智能体Agent（浏览网页、运行代码等）
- 💬 [为您的网站定制的可嵌入聊天窗口](https://github.com/Mintplex-Labs/anythingllm-embed/blob/main/README.md)
- 📖 支持多种文档类型（PDF、TXT、DOCX等）
- 通过简单的用户界面管理向量数据库中的文档
- 两种对话模式：`聊天`和`查询`。聊天模式保留先前的对话记录。查询模式则是针对您的文档做简单问答
- 聊天中会提供所引用的相应文档内容
- 100%云部署就绪。
- “部署你自己的LLM模型”。
- 管理超大文档时高效、低耗。只需要一次就可以嵌入（Embedding）一个庞大的文档或文字记录。比其他文档聊天机器人解决方案节省90%的成本。
- 全套的开发人员API，用于自定义集成！

### 支持的LLM、嵌入模型、转录模型和向量数据库

**支持的LLM：**

- [任何与llama.cpp兼容的开源模型](/server/storage/models/README.md#text-generation-llm-selection)
- [OpenAI](https://openai.com)
- [OpenAI (通用)](https://openai.com)
- [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- [Anthropic](https://www.anthropic.com/)
- [Google Gemini Pro](https://ai.google.dev/)
- [Hugging Face (聊天模型)](https://huggingface.co/)
- [Ollama (聊天模型)](https://ollama.ai/)
- [LM Studio (所有模型)](https://lmstudio.ai)
- [LocalAi (所有模型)](https://localai.io/)
- [Together AI (聊天模型)](https://www.together.ai/)
- [Fireworks AI (聊天模型)](https://fireworks.ai/)
- [Perplexity (聊天模型)](https://www.perplexity.ai/)
- [OpenRouter (聊天模型)](https://openrouter.ai/)
- [Novita AI (聊天模型)](https://novita.ai/model-api/product/llm-api?utm_source=github_anything-llm&utm_medium=github_readme&utm_campaign=link)
- [Mistral](https://mistral.ai/)
- [Groq](https://groq.com/)
- [Cohere](https://cohere.com/)
- [KoboldCPP](https://github.com/LostRuins/koboldcpp)
- [PPIO (聊天模型)](https://ppinfra.com?utm_source=github_anything-llm)

**支持的嵌入模型：**

- [AnythingLLM原生嵌入器](/server/storage/models/README.md)（默认）
- [OpenAI](https://openai.com)
- [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- [LocalAi (全部)](https://localai.io/)
- [Ollama (全部)](https://ollama.ai/)
- [LM Studio (全部)](https://lmstudio.ai)
- [Cohere](https://cohere.com/)

**支持的转录模型：**

- [AnythingLLM内置](https://github.com/Mintplex-Labs/anything-llm/tree/master/server/storage/models#audiovideo-transcription) （默认）
- [OpenAI](https://openai.com/)

**TTS (文本转语音) 支持：**

- 浏览器内置（默认）
- [PiperTTSLocal - 在浏览器中运行](https://github.com/rhasspy/piper)
- [OpenAI TTS](https://platform.openai.com/docs/guides/text-to-speech/voice-options)
- [ElevenLabs](https://elevenlabs.io/)
- 任何与 OpenAI 兼容的 TTS 服务

**STT (语音转文本) 支持：**

- 浏览器内置（默认）

**支持的向量数据库：**

- [LanceDB](https://github.com/lancedb/lancedb) （默认）
- [Astra DB](https://www.datastax.com/products/datastax-astra)
- [Pinecone](https://pinecone.io)
- [Chroma](https://trychroma.com)
- [Weaviate](https://weaviate.io)
- [QDrant](https://qdrant.tech)
- [Milvus](https://milvus.io)
- [Zilliz](https://zilliz.com)

### 技术概览

这个单库由三个主要部分组成：

- `frontend`: 一个 viteJS + React 前端，您可以运行它来轻松创建和管理LLM可以使用的所有内容。
- `server`: 一个 NodeJS express 服务器，用于处理所有交互并进行所有向量数据库管理和 LLM 交互。
- `docker`: Docker 指令和构建过程 + 从源代码构建的信息。
- `collector`: NodeJS express 服务器，用于从UI处理和解析文档。

## 🛳 自托管

Mintplex Labs和社区维护了许多部署方法、脚本和模板，您可以使用它们在本地运行AnythingLLM。请参阅下面的表格，了解如何在您喜欢的环境上部署，或自动部署。
| Docker | AWS | GCP | Digital Ocean | Render.com |
|----------------------------------------|----|-----|---------------|------------|
| [![在 Docker 上部署][docker-btn]][docker-deploy] | [![在 AWS 上部署][aws-btn]][aws-deploy] | [![在 GCP 上部署][gcp-btn]][gcp-deploy] | [![在DigitalOcean上部署][do-btn]][do-deploy] | [![在 Render.com 上部署][render-btn]][render-deploy] |

| Railway                                             |
| --------------------------------------------------- |
| [![在Railway上部署][railway-btn]][railway-deploy] |

## 如何设置开发环境

- `yarn setup` 填充每个应用程序部分所需的 `.env` 文件（从仓库的根目录）。
  - 在开始下一步之前，先填写这些信息`server/.env.development`，不然代码无法正常执行。
- `yarn dev:server` 在本地启动服务器（从仓库的根目录）。
- `yarn dev:frontend` 在本地启动前端（从仓库的根目录）。
- `yarn dev:collector` 然后运行文档收集器（从仓库的根目录）。

## 如何贡献

- 创建 issue
- 创建 PR，分支名称格式为 `<issue number>-<short name>`
- 合并

## 远程信息收集与隐私保护

由 Mintplex Labs Inc 开发的 AnythingLLM 包含一个收集匿名使用信息的 Telemetry 功能。

### 为什么收集信息？

我们使用这些信息来帮助我们理解 AnythingLLM 的使用情况，帮助我们确定新功能和错误修复的优先级，并帮助我们提高 AnythingLLM 的性能和稳定性。

### 怎样关闭

通过在服务器或 docker 的 `.env` 设置中将 `DISABLE_TELEMETRY` 设置为 “true” 来选择退出 Telemetry 远程信息收集功能。您也可以进入 AnythingLLM 应用 >>> 侧边栏最下方 >>> `隐私和数据` （Privacy&Data） >>> 找到最下方的 Anonymous Telemetry Enabled，点击绿色按钮让它变灰色，从而禁用信息收集功能。

### 你们跟踪收集哪些信息？

我们只会跟踪有助于我们做出产品和路线图决策的使用细节，具体包括：

- 您的安装方式（Docker或桌面版）
- 文档被添加或移除的时间。但不包括文档内的具体内容。我们只关注添加或移除文档这个行为。这些信息能让我们了解到文档功能的使用情况。
- 使用中的向量数据库类型。让我们知道哪个向量数据库最受欢迎，并在后续更新中优先考虑相应的数据库。
- 使用中的LLM类型。让我们知道谁才是最受欢迎的LLM模型，并在后续更新中优先考虑相应模型。
- 信息被`发送`出去。这是最常规的“事件/行为/event”，并让我们了解到所有安装了这个项目的每日活动情况。同样，只收集`发送`这个行为的信息，我们不会收集关于聊天本身的性质或内容的任何信息。

您可以通过查找所有调用`Telemetry.sendTelemetry`的位置来验证这些声明。

此外，如果启用，这些事件也会被写入输出日志，因此您也可以看到发送了哪些具体数据。

不收集IP或其他识别信息。Telemetry远程信息收集的方案来自[PostHog](https://posthog.com/) - 一个开源的远程信息收集服务。

## 🔗 更多产品

- **[VectorAdmin][vector-admin]**：一个用于管理向量数据库的全方位GUI和工具套件。
- **[OpenAI Assistant Swarm][assistant-swarm]**：一个智能体Agent就可以管理您所有的OpenAI助手。

版权所有 © 2025 [Mintplex Labs][profile-link]。

本项目采用[MIT](https://github.com/Mintplex-Labs/anything-llm/blob/master/LICENSE)许可证。

# 参考资料

https://github.com/Mintplex-Labs/anything-llm

