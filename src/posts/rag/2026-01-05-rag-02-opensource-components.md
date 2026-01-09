---
title: RAG（Retrieval-Augmented Generation）本地知识库/应用时常用的开源组件与框架
date: 2026-01-05
categories: [AI]
tags: [ai, rag, sh]
published: true
---

# 开源组件

以下是构建 **RAG（Retrieval-Augmented Generation）本地知识库/应用时常用的开源组件与框架**，涵盖知识存储、检索、向量数据库、管道框架等多个层级，适合用于本地私有化部署或企业级系统：

---

## 1）RAG 端到端框架（开源整体解决方案）

这些项目通常将文档处理、向量化、索引、检索和生成结合起来，提供完整或接近完整的 RAG 流水线：

* **LangChain**
  用于构建 RAG 应用的框架，可将文档加载、文本切分、向量化、检索和 LLM 生成组织成工作流。支持多种后端向量数据库和 LLM。([维基百科][1])

* **Haystack（Deepset）**
  企业级可扩展 RAG/NLP 框架，模块化设计支持检索器、生成器、混合检索等多种策略，可与 Elasticsearch/FAISS/Pinecone 等结合。([lakeFS][2])

* **LlamaIndex (原 GPT Index)**
  聚焦数据索引和查询层的 RAG 库，简化将多源数据 (文件/数据库/Web) 索引进 LLM 的过程。([DataCamp][3])

* **txtAI**
  一体化向量搜索与 RAG 管道，提供嵌入生成、相似性检索及简单 RAG API，适合快速本地部署。([CSDN博客][4])

* **RAGFlow / QAnything / open-webui / FastGPT**
  开源 RAG/知识库引擎或 UI 方案，某些更注重可视化工作流或本地部署体验。([火山引擎开发者社区][5])

* **Embedchain**
  简化文档嵌入与检索操作的开源框架，便于快速构建基于向量检索的问答/聊天系统。([AIBase][6])

---

## 2）向量存储与检索组件（向量数据库 / 索引库）

这是 RAG 知识库的基础，用于存储文档向量并高效检索相关内容：

开源向量数据库：

* **Milvus** — 分布式、高性能向量数据库。([维基百科][7])
* **Weaviate** — 云原生向量搜索引擎，支持多模态搜索。([Collabnix][8])
* **Qdrant** — Rust 实现，内存与磁盘兼容的向量搜索引擎。([Collabnix][8])
* **Chroma** — 面向 LLM 的本地轻量级向量数据库。([维基百科][9])

向量搜索库（组件级）：

* **FAISS** — 高效 ANN 索引库，由 Meta 提供。([Mark Byun][10])
* **pgvector** — PostgreSQL 向量扩展，可在关系型数据库中执行向量搜索。([GitHub][11])

---

## 3）嵌入生成 / 检索模型

RAG 管道中的核心计算模块：

* Sentence transformers（如 `all-mpnet-base-v2` 等）用于文本到向量的转换。([Collabnix][8])
* 埋点/稀疏检索补充方案，如 BM25、DPR 等（常见于 Haystack 或自定义实现）。([Kiosk's/][12])

---

## 4）文档处理与数据管道

RAG 系统通常需要：

* **文本提取和切分工具**（用于将 PDF/文档按段落或语义分块）。([Kiosk's/][12])
* **处理管道**（将文件加载、分块、嵌入、入库、索引与检索串联起来）。
  框架如 LangChain 和 Haystack 包含大量此类组件；也可以自定义组合以上工具。

---

## 5）生成器（LLM）

虽然不是完全开源（模型本身可能是闭源或权重受限），但以下在 RAG 中用于生成阶段：

* Hugging Face Transformers（T5、BART、LLAMA 等本地模型）
* 本地部署模型（如 LLaMA 系列、Qwen、Gemini 类模型）与框架（Ollama/llama.cpp）

这些与前述检索框架结合可实现完全本地化的 RAG 方案。

---

## 6）附加/增强组件

可选增强工具/库：

* **RAGViz** — 可视化与诊断 RAG 检索与生成过程的开源工具。([arXiv][13])
* **Hybrid pipelines / rerankers** — 通过 BM25 + dense embedding 或 reranking 提升召回与精度。([Kiosk's/][12])

---

## 概括

构建一个本地化 RAG 知识库系统通常需要组合以下层级的开源构件：

1. **数据预处理与切分**（自定义脚本或框架内置）
2. **嵌入生成模型**（Sentence transformers / 本地模型）
3. **向量存储检索**（Milvus、Weaviate、Qdrant、Chroma、FAISS / pgvector）
4. **RAG 框架或集成库**（LangChain、Haystack、LlamaIndex、txtAI、Embedchain 等）
5. **生成模型与提示模板配置**（LLM 与 prompt 管理）

这些组件可以组合成不同规模的 RAG 本地知识库部署方案——从简单的文件问答系统到企业级知识管理平台。([DataCamp][3])

# 参考资料

[1]: https://en.wikipedia.org/wiki/LangChain?utm_source=chatgpt.com "LangChain"
[2]: https://lakefs.io/blog/rag-tools/?utm_source=chatgpt.com "Top RAG Tools to Boost Your LLM Workflows - lakeFS"
[3]: https://www.datacamp.com/blog/rag-framework?utm_source=chatgpt.com "RAG Frameworks You Should Know: Open-Source Tools for ..."
[4]: https://blog.csdn.net/Trb701012/article/details/153866460?utm_source=chatgpt.com "检索增强生成(RAG)技术大揭秘：7个顶级开源框架对比与应用场景分析！大模型开发者必备！-CSDN博客"
[5]: https://developer.volcengine.com/articles/7440006141633495077?utm_source=chatgpt.com "开源RAG框架汇总- 文章- 开发者社区- 火山引擎"
[6]: https://www.aibase.com/zh/tool/www.aibase.com/zh/tool/26758?utm_source=chatgpt.com "Embedchain-开源的RAG 框架 - AIBase"
[7]: https://en.wikipedia.org/wiki/Milvus_%28vector_database%29?utm_source=chatgpt.com "Milvus (vector database)"
[8]: https://collabnix.com/retrieval-augmented-generation-rag-complete-guide-to-building-intelligent-ai-systems-in-2025/?utm_source=chatgpt.com "Retrieval Augmented Generation: Your 2025 AI Guide"
[9]: https://en.wikipedia.org/wiki/Chroma_%28vector_database%29?utm_source=chatgpt.com "Chroma (vector database)"
[10]: https://markbyun.blogspot.com/2025/05/retrieval-augmented-generation-rag-for.html?utm_source=chatgpt.com "Retrieval-Augmented Generation (RAG) for Advanced ML Engineers"
[11]: https://github.com/Danielskry/Awesome-RAG?utm_source=chatgpt.com "GitHub - Danielskry/Awesome-RAG: 😎 Awesome list of Retrieval-Augmented Generation (RAG) applications in Generative AI."
[12]: https://kiosk007.top/post/rag/?utm_source=chatgpt.com "LLM大模型 - 从0认识RAG - Kiosk's/"
[13]: https://arxiv.org/abs/2411.01751?utm_source=chatgpt.com "RAGViz: Diagnose and Visualize Retrieval-Augmented Generation"




