---
title: RapidOCR 入门介绍 信创级开源OCR - 为世界内容安全贡献力量
date: 2026-01-06
categories: [AI]
tags: [ai, plan, sh]
published: true
---



# 信创级开源OCR - 为世界内容安全贡献力量

### 📝 简介

目前，我们自豪地推出了运行速度最为迅猛、兼容性最为广泛的多平台多语言OCR工具，它完全开源免费，并支持离线环境下的快速部署。

**支持语言概览：** 默认支持中文与英文识别，对于其他语言的识别需求，我们提供了便捷的自助转换方案。

具体转换指南，请参见[这里](https://rapidai.github.io/RapidOCRDocs/main/blog/2022/09/28/%E6%94%AF%E6%8C%81%E8%AF%86%E5%88%AB%E8%AF%AD%E8%A8%80/)。

**项目缘起：** 鉴于[PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR)在工程化方面仍有进一步优化的空间，为了简化并加速在各种终端设备上进行OCR推理的过程，我们创新地将PaddleOCR中的模型转换为了高度兼容的ONNX格式，并利用Python、C++、Java、C#等多种编程语言，实现了跨平台的无缝移植，让广大开发者能够轻松上手，高效应用。

**名称寓意：** RapidOCR，这一名称蕴含着我们对产品的深刻期待——轻快（操作简便，响应迅速）、好省（资源占用低，成本效益高）并智能（基于深度学习的强大技术，精准高效）。我们专注于发挥人工智能的优势，打造小巧而强大的模型，将速度视为不懈追求，同时确保识别效果的卓越。

**使用指南：**

- 直接部署：若本仓库中已提供的模型能满足您的需求，那么您只需参考[官方文档](https://rapidai.github.io/RapidOCRDocs/main/quickstart/)进行RapidOCR的部署与使用即可。
- 定制化微调：若现有模型无法满足您的特定需求，您可以在PaddleOCR的基础上，利用自己的数据进行微调，随后再将其应用于RapidOCR的部署中，实现个性化定制。

如果您发现本仓库对您的项目或学习有所助益，恳请您慷慨地给个小星星⭐，给予我们支持与鼓励！

### 🎥 效果展示

<div align="center">
    <img src="https://github.com/RapidAI/RapidOCR/releases/download/v1.1.0/demo.gif" alt="Demo" width="100%" height="100%">
</div>

### 🛠️ 安装

```bash
pip install rapidocr onnxruntime
```

### 📋 使用

```python
from rapidocr import RapidOCR

engine = RapidOCR()

img_url = "https://github.com/RapidAI/RapidOCR/blob/main/python/tests/test_files/ch_en_num.jpg?raw=true"
result = engine(img_url)
print(result)

result.vis("vis_result.jpg")
```

### 📚 文档

完整文档请移步：[docs](https://rapidai.github.io/RapidOCRDocs)

### 👥 谁在使用？([更多](https://github.com/RapidAI/RapidOCR/network/dependents))

- [Docling](https://github.com/DS4SD/docling)
- [CnOCR](https://github.com/breezedeus/CnOCR)
- [api-for-open-llm](https://github.com/xusenlinzy/api-for-open-llm)
- [arknights-mower](https://github.com/ArkMowers/arknights-mower)
- [pensieve](https://github.com/arkohut/pensieve)
- [genshin_artifact_auxiliary](https://github.com/SkeathyTomas/genshin_artifact_auxiliary)
- [ChatLLM](https://github.com/yuanjie-ai/ChatLLM)
- [langchain](https://github.com/langchain-ai/langchain)
- [Langchain-Chatchat](https://github.com/chatchat-space/Langchain-Chatchat)
- [JamAIBase](https://github.com/EmbeddedLLM/JamAIBase)
- [PAI-RAG](https://github.com/aigc-apps/PAI-RAG)
- [ChatAgent_RAG](https://github.com/junyuyang7/ChatAgent_RAG)
- [OpenAdapt](https://github.com/OpenAdaptAI/OpenAdapt)
- [Umi-OCR](https://github.com/hiroi-sora/Umi-OCR)

> 更多使用RapidOCR的项目，欢迎在[登记地址](https://github.com/RapidAI/RapidOCR/discussions/286)登记，登记仅仅为了产品推广。

### 🙏 致谢

- 非常感谢[PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR)的一切。
- 非常感谢[PaddleOCR2Pytorch](https://github.com/frotms/PaddleOCR2Pytorch)提供转换后的PyTorch格式模型。
- 非常感谢[PaddleX](https://github.com/PaddlePaddle/PaddleX)提供文档模型。
- 非常感谢[DeliciaLaniD](https://github.com/DeliciaLaniD)修复ocrweb中扫描动画起始位置错位问题。
- 非常感谢[zhsunlight](https://github.com/zhsunlight)关于参数化调用GPU推理的建议以及细致周到的测试。
- 非常感谢[lzh111222334](https://github.com/lzh111222334)修复python版本下rec前处理部分bug。
- 非常感谢[AutumnSun1996](https://github.com/AutumnSun1996)在[#42](https://github.com/RapidAI/RapidOCR/issues/42)中的建议。
- 非常感谢[DeadWood8](https://github.com/DeadWood8)提供了[Nuitka打包rapidocr_web的操作文档和可执行exe](https://rapidai.github.io/RapidOCRDocs/main/install_usage/rapidocr_web/nuitka_package/)。
- 非常感谢[Loovelj](https://github.com/Loovelj)指出对文本检测框排序时顺序问题，详情参见[issue 75](https://github.com/RapidAI/RapidOCR/issues/75)。

### 🎖 贡献者

<p align="left">
  <a href="https://github.com/RapidAI/RapidOCR/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=RapidAI/RapidOCR&max=400&columns=10" width="60%"/>
  </a>
</p>

### 🤝 加入我们

请移步：[link](https://rapidai.github.io/RapidOCRDocs/main/communicate/)

### 🌟 赞助商 & 支持者

RapidOCR 是一个基于 Apache2.0 许可的开源项目，其持续开发之所以能够实现，完全得益于这些出色支持者的助力。

如果您也想加入他们的行列，不妨考虑[赞助 RapidOCR](<https://rapidai.github.io/RapidOCRDocs/main/sponsor/>) 的开发。

# RapidOCR4j

## 😺 项目介绍

- **本项目是多平台OCR工具，[RapidOCR](https://github.com/RapidAI/RapidOCR)的Java移植版本，采用ONNXRuntime作为推理引擎调用模型，包括使用OpenCV对图片的处理优化等**

> ✨如果该项目对您有帮助，您的star是我不断优化的动力！！！
>
> - [github点击前往](https://github.com/hzkitty/RapidOCR4j)
> - [gitee点击前往](https://gitee.com/hzkitty/RapidOCR4j)

## 👏 项目特点

- 纯Java代码调用ONNXRuntime + OpenCV，方便二次开发
- 支持CPU版本和GPU版本
- 支持传入Path、BufferedImage、byte[]、Mat
- 支持Windows、Linux、Mac平台，具体如下：

OS | Architecture
--- | ---
macOS | Intel
macOS | Apple Silicon (arm64)
Linux | x86_64
Linux | ARMv7 (arm)
Linux | ARMv8 (arm64 / aarch64)
Windows | x86_32
Windows | x86_64

目前跨平台主要是opencv的限制，如果是其他平台，可在本机手动编译opencv4.6.0，把平台二进制文件路径传给opencvLibPath参数
```java
OcrConfig ocrConfig = new OcrConfig();
ocrConfig.Global.setOpencvLibPath("src/test/resources/libopencv_java481.so");
RapidOCR rapidOCR = RapidOCR.create(ocrConfig);
```
## 🎉 快速开始

安装依赖，默认使用CPU版本
```xml
<dependency>
    <groupId>io.github.hzkitty</groupId>
    <artifactId>rapidocr4j</artifactId>
    <version>1.0.3</version>
</dependency>
```
使用示例
```java
RapidOCR rapidOCR = RapidOCR.create();
OcrResult ocrResult = rapidOCR.run("src/test/resources/text_01.png");
```

如果想要使用GPU, `onnxruntime_gpu` 对应版本可以在这里找到
[here](https://onnxruntime.ai/docs/execution-providers/CUDA-ExecutionProvider.html).
```xml
<dependency>
    <groupId>io.github.hzkitty</groupId>
    <artifactId>rapidocr4j</artifactId>
    <version>1.0.3</version>
    <exclusions>
      <exclusion>
        <groupId>com.microsoft.onnxruntime</groupId>
        <artifactId>onnxruntime</artifactId>
      </exclusion>
    </exclusions>
</dependency>

<!-- 1.18.0 support CUDA 12.x -->
<dependency>
    <groupId>com.microsoft.onnxruntime</groupId>
    <artifactId>onnxruntime_gpu</artifactId>
    <version>1.18.0</version>
</dependency>
```

[OcrConfig想更深入了解，请移步config.yaml参数解释](https://rapidai.github.io/RapidOCRDocs/install_usage/api/RapidOCR/)

新增 **returnWordLevel** 参数，支持返回英语单字坐标(false)/单词(true)坐标

>  安卓版本。使用 [RapidOCR4j-Android](https://github.com/hzkitty/RapidOCR4j-Android)


# 参考资料

https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools

