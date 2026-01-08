---

title: MiroMindAI/MiroThinker 入门介绍
date: 2026-01-08
categories: [AI-AGENT]
tags: [ai, ai-agent, sh]
published: true
---

## 前言

大家好，我是老马。

我们首先来学习一下 MiroMindAI/MiroThinke

# **MiroMindAI/MiroThinker**

> **MiroThinker 是一系列开源智能体模型**，用于深度研究和复杂工具使用场景。([GitHub][1])

Repository（仓库）地址（可直接访问）：

👉 [https://github.com/MiroMindAI/MiroThinker](https://github.com/MiroMindAI/MiroThinker) ([GitHub][1])

许可证：

**MIT License** ([GitHub][1])

---

## **🚀 体验在线演示**

**演示（Gradio）：**

[https://dr.miromind.ai/](https://dr.miromind.ai/) ([Reddit][2])

---

## **📋 目录**

* 📰 新闻与更新 (News & Updates)
* 📝 介绍 (Introduction)
* ✨ 关键功能 (Key Features)
* 📈 基准性能 (Performance on Benchmarks)
* 🚀 快速开始 (Quick Start)
* 📊 跟踪收集 (Trace Collection)
* ❓ 常见问题与故障排除 (FAQ & Troubleshooting)
* 📄 许可证 (License)
* 🙏 致谢 (Acknowledgments)
* 📌 参考文献 (References)

---

## **📰 新闻与更新**

**2025-11-13**
🎉🎉 **MiroThinker-v1.0 现已发布！**
引入“交互式扩展（Interactive Scaling）”作为性能提升的第三维度，支持 **256K 上下文窗口** 和最多 **600 次工具调用/任务**。提供 8B、30B、72B 参数规模，在多个基准（如 HLE-Text、BrowseComp、BrowseComp-ZH、GAIA-Text-103）中取得优异成绩。([GitHub][1])

**2025-09-11**
🎉 MiroThinker-72B-Preview 在 FutureX 基准中获得第四名。([GitHub][1])

**2025-09-08**
发布 **MiroThinker-v0.2**，在多个基准上取得开源 SOTA 性能，如 HLE、HLE-Text、BrowseComp-EN、BrowseComp-ZH、xBench-DeepSearch 和 Frames 等。([GitHub][1])

**2025-08-22**
发布简化部署选项，以优化资源使用和加快启动时间。提供在线互动演示。([GitHub][1])

**2025-08-08**
**MiroThinker-v0.1** 发布，模型、框架和数据完全开源。([GitHub][1])

---

## **📝 介绍**

MiroThinker 是 **MiroMind 研究智能体项目**的官方实现，旨在推进**工具增强推理与信息获取能力**，支持在多种复杂现实研究场景中的工作流。([GitHub][1])

当前项目主要组成：

* **💡 MiroThinker**：开源研究智能体模型，原生支持工具辅助推理，在多个基准中表现领先。([GitHub][1])

* **🤖 MiroFlow**：开源研究智能体框架，提供可复现 SOTA 性能的通用工作流。
  👉 [https://github.com/MiroMindAI/MiroFlow](https://github.com/MiroMindAI/MiroFlow) ([GitHub][1])

* **📚 MiroVerse**：含 147,000 条样本的开源训练数据集，用于研究智能体训练。
  👉 [https://huggingface.co/datasets/miromind-ai/MiroVerse](https://huggingface.co/datasets/miromind-ai/MiroVerse) ([GitHub][1])

* **🔧 MiroTrain / MiroRL**：训练基础设施组件，用于稳定高效的研究智能体训练。([GitHub][1])

---

## **✨ 关键功能**

### **MiroThinker-v1.0**

MiroThinker-v1.0 在传统扩展（参数规模、上下文长度）基础上，提出**交互式扩展（Interactive Scaling）**，让模型在**代理–环境交互**过程中更深层次学习。

它利用环境反馈和外部信息获取来纠错与优化推理轨迹。([GitHub][1])

主要特点：

| 功能                | 描述                      |
| ----------------- | ----------------------- |
| 🚀 **256K 上下文窗口** | 支持长路径推理与多步分析            |
| 🔧 **600 次工具调用**  | 每任务最多 600 次工具交互         |
| 📦 **多参数规模**      | 包括 8B、30B、72B 多版本       |
| 🛠️ **工具与工作流支持**  | 与 MiroFlow 整合，可执行复杂研究任务 |

模型与链接示例：

| 模型名称                     | 基础模型                        | 最大上下文长度 | 最大工具调用 | 模型链接                                                                                                                             |
| ------------------------ | --------------------------- | ------- | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **MiroThinker-v1.0-8B**  | Qwen3-8B                    | 256K    | 600    | [https://huggingface.co/miromind-ai/MiroThinker-v1.0-8B](https://huggingface.co/miromind-ai/MiroThinker-v1.0-8B) ([GitHub][1])   |
| **MiroThinker-v1.0-30B** | Qwen3-30B-A3B-Thinking-2507 | 256K    | 600    | [https://huggingface.co/miromind-ai/MiroThinker-v1.0-30B](https://huggingface.co/miromind-ai/MiroThinker-v1.0-30B) ([GitHub][1]) |
| **MiroThinker-v1.0-72B** | Qwen2.5-72B-Instruct        | 256K    | 600    | [https://huggingface.co/miromind-ai/MiroThinker-v1.0-72B](https://huggingface.co/miromind-ai/MiroThinker-v1.0-72B) ([GitHub][1]) |

---

## **📈 基准性能**

MiroThinker 在多项开放研究基准测试中表现优异：

* **GAIA Validation / Text-103**
* **HLE / HLE-Text-2158 / HLE-Text-500**
* **BrowseComp-EN / BrowseComp-ZH**
* **WebWalkerQA**
* **Frames**
* **XBench-DeepSearch**
* **FutureX**
* **SEAL-0**
* **AIME2025** ([GitHub][1])

示例性能：

v1.0 在多个基准中均超过此前的开源智能体，并在某些任务中逼近商业模型表现（例如 GPT-5-high）。([GitHub][1])

---

## **🚀 快速开始**

### **⚡ 5-分钟快速启动**

```bash
# 1. 克隆仓库
git clone https://github.com/MiroMindAI/MiroThinker
cd MiroThinker/apps/miroflow-agent
uv sync

# 2. 配置最小环境（针对 MiroThinker v1.0）
cp .env.example .env
# 编辑 .env 填写以下必要 API Key:
# SERPER_API_KEY（Google 搜索）
# JINA_API_KEY（网页抓取）
# E2B_API_KEY（代码执行）
# SUMMARY_LLM_BASE_URL / NAME / API_KEY（LLM 摘要）
# OPENAI_API_KEY（用于评估）

# 3. 启动模型服务（见 Serve 部分）

# 4. 执行评估
uv run main.py llm=qwen-3 agent=single_agent_keep5 llm.base_url=https://你的服务器地址/v1
```

#### **先决条件**

* Python 3.10 及以上
* 安装 uv 包管理工具
* API Key，如 SERPER、JINA、E2B 等 ([GitHub][1])

---

## **🛠️ 工具配置（Tool Configuration）**

**最小推荐配置（用于 v1.0）：**

| Server                    | 描述               | 提供工具                             | 需要的环境变量                        |
| ------------------------- | ---------------- | -------------------------------- | ------------------------------ |
| tool-python               | 代码执行与沙箱管理        | create_sandbox、run_python_code 等 | E2B_API_KEY                    |
| search_and_scrape_webpage | Serper Google 搜索 | google_search                    | SERPER_API_KEY、SERPER_BASE_URL |
| jina_scrape_llm_summary   | 基于 LLM 的网页摘要提取   | scrape_and_extract_info          | JINA_API_KEY、SUMMARY_LLM_*     |

示例最小 `.env` 配置：

```
SERPER_API_KEY=你的_serper_key
SERPER_BASE_URL="https://google.serper.dev"
JINA_API_KEY=你的_jina_key
JINA_BASE_URL="https://r.jina.ai"
E2B_API_KEY=你的_e2b_key

# LLM 摘要
SUMMARY_LLM_BASE_URL=你的_llm_base_url
SUMMARY_LLM_MODEL_NAME=你的_llm_model_name
SUMMARY_LLM_API_KEY=你的_llm_api_key

# 评估 Judge
OPENAI_API_KEY=你的_openai_key
```

其他工具（如视觉、语音、推理等）也可选配置，详见仓库中工具文档。([GitHub][1])

---

## **📊 跟踪收集 Trace Collection**

```bash
cd apps/collect-trace

# 收集 SFT 轨迹
uv run bash scripts/collect_trace_claude37.sh
uv run bash scripts/collect_trace_gpt5.sh

# 收集 DPO 轨迹
uv run bash scripts/collect_trace_qwen3.sh
```

---

## **❓ 常见问题与故障排除**

### **哪个版本适合我？**

* **v1.0**：最新版本，支持 256K 上下文与 600 次工具调用，推荐 `single_agent_keep5` 配置。
* **v0.2**：中等版本，支持 64K 上下文与工具交互。
* **v0.1**：历史版本，40K 上下文。 ([GitHub][1])

### **内存不足怎么办？**

* 减少上下文长度
* 使用 `single_agent_keep5` 保留部分历史上下文
* 降低并发任务数
* 使用更小型号模型 ([GitHub][1])

### **工具执行错误？**

* 检查 API Key 是否正确
* 验证服务端点是否可达
* 查看日志信息帮助定位错误 ([GitHub][1])

---

## **📄 许可证**

本项目采用 **MIT 许可证**。详见仓库 LICENSE 文件：
[https://github.com/MiroMindAI/MiroThinker/blob/main/LICENSE](https://github.com/MiroMindAI/MiroThinker/blob/main/LICENSE) ([GitHub][1])

---

## **🙏 致谢**

我们感谢：

* 基准贡献者提供评估数据集
* 开源社区提供工具和库
* 所有贡献者对 MiroThinker 的改进与支持 ([GitHub][1])

---

## **📌 参考文献**

如果在科研中使用本项目，请引用：

````bibtex
@article{miromind2025mirothinker,
  title={MiroThinker: Pushing the Performance Boundaries of Open-Source Research Agents via Model, Context, and Interactive Scaling},
  author={MiroMind Team and Bai, Song and Bing, Lidong and Chen, Carson and …},
  journal={arXiv preprint arXiv:2511.11793},
  year={2025}
}
``` :contentReference[oaicite:28]{index=28}

技术报告（可直接访问）：

https://arxiv.org/abs/2511.11793 :contentReference[oaicite:29]{index=29}

---

上述即为 **MiroThinker README.md 的完全翻译**，包括所有核心内容、表格、指令及说明。如需要后续部分（如 MiroFlow Deployment、工具 README 等翻译），我也可以继续协助。
::contentReference[oaicite:30]{index=30}
````

[1]: https://github.com/MiroMindAI/MiroThinker?utm_source=chatgpt.com "GitHub - MiroMindAI/MiroThinker: MiroThinker is a series of open-source agentic models trained for deep research and complex tool use scenarios."
[2]: https://www.reddit.com//r/coolgithubprojects/comments/1p22xam/mirothinker_v10_an_opensource_agent_foundation/?utm_source=chatgpt.com "MiroThinker v1.0, an open-source agent foundation model with interactive scaling."


# 参考资料

