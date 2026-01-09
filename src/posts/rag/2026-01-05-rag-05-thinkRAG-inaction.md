---
title: ThinkRAG — 本地可用 RAG 系统安装实战
date: 2026-01-05
categories: [AI]
tags: [ai, rag, sh]
published: true
---

# 下载

```
git@github.com:wzdavid/ThinkRAG.git
```

或者手动下载 [https://github.com/wzdavid/ThinkRAG](https://github.com/wzdavid/ThinkRAG)

# 安装

根目录，安装

```
pip3 install -r requirements.txt
```

# 配置

为了获得更好的性能，推荐使用千亿级参数的商用大模型 LLM API。

首先，从 LLM 服务商获取 API 密钥，配置如下环境变量。

```zsh
OPENAI_API_KEY = ""
DEEPSEEK_API_KEY = ""
MOONSHOT_API_KEY = ""
ZHIPU_API_KEY = ""
```



