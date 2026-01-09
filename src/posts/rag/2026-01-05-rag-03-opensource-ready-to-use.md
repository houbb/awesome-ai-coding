---
title: RAG 开箱可用的开源项目
date: 2026-01-05
categories: [AI]
tags: [ai, rag, sh]
published: true
---

# RAG

## 1. **ThinkRAG** — 本地可用 RAG 系统

* 项目定位：可部署在本地笔记本/服务器的 RAG 系统，用于私有知识库问答。
* 特点：

  * 支持本地 LLM 模型部署（例如通过 Ollama）或兼容 OpenAI API
  * 支持中文文本分块与嵌入
  * 提供开发模式（本地文件存储）和选配生产模式（Redis + LanceDB 向量存储）
* 适用：需要快速搭建本地 RAG 平台的个人/团队。 ([SourcePulse][1])

**资源：** GitHub 搜索 “ThinkRAG”

---

## 2. **Inquisitive** — 个人自托管 RAG 知识库

* 项目定位：个人知识库 + RAG 问答平台（带 UI）。
* 特点：

  * Web UI 接口（基于 Streamlit）
  * 文件上传（PDF、Markdown 等）自动向量化
  * 支持抓取网页链接、笔记并存入本地向量库（如 LanceDB）
  * 本地模型切换、上下文引用展示
* 适用：想要 UI 交互 + 完整 RAG 功能的本地部署场景。 ([GitHub][2])

---

## 3. **OpenRAG** — 模块化 RAG 平台（企业级/可扩展）

* 项目定位：开源 RAG 框架，适合构建大规模文档检索+生成系统。
* 特点：

  * 支持 Ray 并行计算，用于向量化、检索、索引
  * Web UI、FastAPI 接口与 OpenAI 兼容 API
  * 支持复杂文档加载、BM25/语义检索混合策略
  * 可用于生产级部署（启用 Kubernetes 等）
* 适用：大规模文档集合、企业级 RAG 应用。 ([open-rag.ai][3])

---

## 4. **QAnything** — 完整本地化 RAG Q&A 系统

* 项目定位：网易有道开源的 RAG 问答系统。
* 特点：

  * 支持多种文档格式（Word/PPT/Markdown 等）
  * 图像与表格处理能力
  * 完整前端交互页面
  * 离线/本地部署能力
* 适用：需要开箱即用、功能比较完整的 RAG 服务。 ([莫尔索随笔][4])

---

## 5. **MaxKB** — 本地知识库问答系统

* 项目定位：本地知识库 + 问答系统（企业级方向）。
* 特点：

  * “开箱即用”部署体验
  * 支持上传文档、自动爬取在线资源
  * 前端/后端分离（Vue + Django）
  * 可对接本地或远程 LLM
* 适用：需要商业/二次开发友好（GPL 类许可）项目。 ([cnblogs.com][5])

---

## 6. **其他开源项目（社区/实验版）**

这些项目可能功能更轻量、实验性强，但同样可以作为可运行的 RAG 系统：

* **Ragpi**：技术文档智答助手（FastAPI + pgvector） — 可部署本地 REST API。 ([Reddit][6])
* **Memora**：私人知识库 + 初始 RAG 聊天界面（基础功能可用）。 ([Reddit][7])
* **Kotaemon**：带多用户支持的 RAG Web UI，基于向量检索 + 再排序逻辑。 ([Reddit][8])

---

## 7. **教育/学习级示例**

如果你更侧重理解 RAG 实现，而不是直接生产部署，还可以参考这些：

* **RAG from Scratch**：分模块教学用例，基于本地向量库 + LLM 推理。 ([Reddit][9])

---

### 总结：如何选择

| 项目                        | 开箱性 | UI  | 本地部署 | 生产级 |
| ------------------------- | --- | --- | ---- | --- |
| ThinkRAG                  | 高   | 否   | 是    | 中   |
| Inquisitive               | 高   | 是   | 是    | 中   |
| OpenRAG                   | 中   | 是/可 | 是    | 高   |
| QAnything                 | 高   | 是   | 是    | 中   |
| MaxKB                     | 中   | 是   | 是    | 中   |
| Ragpi / Memora / Kotaemon | 中/低 | 部分  | 可    | 实验  |

# 参考资料

[1]: https://www.sourcepulse.org/projects/1840372?utm_source=chatgpt.com "ThinkRAG by wzdavid - SourcePulse"
[2]: https://github.com/kanishka-linux/inquisitive?utm_source=chatgpt.com "GitHub - kanishka-linux/inquisitive: A personal self-hosted knowledge base with a touch of LLM/RAG"
[3]: https://open-rag.ai/?utm_source=chatgpt.com "Sovereign, Open Source Retrieval-Augmented Generation"
[4]: https://liduos.com/en/ai-develope-tools-series-1-open-source-rag-projects.html?utm_source=chatgpt.com "Comparison of 8 Open Source RAG Projects——LlamaIndex, Verba, QAnything, RAGFlow, quivr, khoj, mem0, and Perplexica - 莫尔索随笔"
[5]: https://www.cnblogs.com/deeplearningmachine/p/18185555?utm_source=chatgpt.com "开源RAG框架汇总 - 深度学习机器 - 博客园"
[6]: https://www.reddit.com/r/Rag/comments/1jbvhqq?utm_source=chatgpt.com "An Open-Source AI Assistant for Chatting with Your Developer Docs"
[7]: https://www.reddit.com//r/Rag/comments/1nu9gto?utm_source=chatgpt.com "Memora: a knowledge base open source"
[8]: https://www.reddit.com/r/LocalLLaMA/comments/1f25wo0?utm_source=chatgpt.com "Open-source clean & hackable RAG webUI with multi-users support and sane-default RAG pipeline."
[9]: https://www.reddit.com//r/Rag/comments/1ojwwsi/building_rag_from_scratch_a_local_educational/?utm_source=chatgpt.com "Building \"RAG from Scratch\". A local, educational repo to really understand Retrieval-Augmented Generation (feedback welcome)"


