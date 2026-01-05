---
title: Memgraph 是一个开源图数据库，专为实时流处理打造，并兼容 Neo4j。 
date: 2026-01-05
categories: [AI]
tags: [ai, ai-coding, code-graph, sh]
published: true
---

# 是什么？

<p align="center">
<img src="https://public-assets.memgraph.com/github-readme-images/github-memgraph-repo-banner.png">
</p>

---

<p align="center">
  <a href="https://github.com/memgraph/memgraph/blob/master/licenses/APL.txt">
    <img src="https://img.shields.io/badge/license-APL-green" alt="license" title="license"/>
  </a>
  <a href="https://github.com/memgraph/memgraph/blob/master/licenses/BSL.txt">
    <img src="https://img.shields.io/badge/license-BSL-yellowgreen" alt="license" title="license"/>
  </a>
  <a href="https://github.com/memgraph/memgraph/blob/master/licenses/MEL.txt" alt="Documentation">
    <img src="https://img.shields.io/badge/license-MEL-yellow" alt="license" title="license"/>
  </a>
</p>

<p align="center">
  <a href="https://memgraph.github.io/daily-builds/">
     <img src="https://img.shields.io/github/actions/workflow/status/memgraph/memgraph/daily_build.yml?branch=master&label=build%20and%20test&logo=github"/>
  </a>
  <a href="https://memgraph.com/docs/" alt="Documentation">
    <img src="https://img.shields.io/badge/documentation-Memgraph-orange" />
  </a>
</p>

<p align="center">
  <a href="https://memgr.ph/join-discord">
    <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"/>
  </a>
</p>

## :clipboard: 简介

Memgraph 是一个开源图数据库，专为实时流处理打造，并兼容 Neo4j。无论你是开发者还是有互联数据的数据科学家，Memgraph 都能让你快速获得可操作的即时洞察。

Memgraph 可直接连接你的流处理基础设施。你可以从 Kafka、SQL 或普通 CSV 文件等数据源中摄取数据。Memgraph 提供标准接口以 Cypher 查询你的数据，Cypher 是一种广泛使用、声明式且易于编写、理解和针对性能优化的查询语言。其底层采用属性图数据模型，通过对象、属性及对象间关系来存储数据。这是一种无需依赖复杂 SQL 模型即可自然高效地建模许多现实问题的方式。

Memgraph 用 C/C++ 实现，采用内存优先架构，始终为你带来[最佳性能](http://memgraph.com/benchgraph)。同时它支持 ACID，并具备高可用性。

## :zap: 功能

- 自定义查询模块 —— 可原生运行 Python、Rust 和 C/C++ 代码；可参考 [MAGE](https://github.com/memgraph/mage) 图算法库。
- 深路径遍历 —— 支持累加器与路径过滤等高级功能，无需添加额外的应用逻辑。
- 原生支持机器学习
- 支持流式数据及动态算法
- 多租户
- 高可用复制
- 认证与授权
- 基于角色和标签的访问控制
- 通过 HTTP 服务器实现监控


## :video_game: Memgraph Playground

无需安装任何东西即可体验 Memgraph。

只需在浏览器中访问我们的 **[Memgraph Playground](https://playground.memgraph.com/)** 沙盒环境。

<p align="left">
  <a href="https://playground.memgraph.com/">
    <img width="450px" alt="Memgraph Playground" src="https://download.memgraph.com/asset/github/memgraph/memgraph-playground.png">
  </a>
</p>

## :floppy_disk: 下载与安装

### Windows

[![Windows](https://img.shields.io/badge/Windows-Docker-0078D6?style=for-the-badge&logo=windows&logoColor=white)](https://memgraph.com/docs/memgraph/install-memgraph-on-windows-docker)
[![Windows](https://img.shields.io/badge/Windows-WSL-0078D6?style=for-the-badge&logo=windows&logoColor=white)](https://memgraph.com/docs/memgraph/install-memgraph-on-windows-wsl)

### macOS

[![macOS](https://img.shields.io/badge/macOS-Docker-000000?style=for-the-badge&logo=macos&logoColor=F0F0F0)](https://memgraph.com/docs/memgraph/install-memgraph-on-macos-docker)
[![macOS](https://img.shields.io/badge/lima-AACF41?style=for-the-badge&logo=macos&logoColor=F0F0F0)](https://memgraph.com/docs/memgraph/install-memgraph-on-ubuntu)

### Linux

[![Linux](https://img.shields.io/badge/Linux-Docker-FCC624?style=for-the-badge&logo=linux&logoColor=black)](https://memgraph.com/docs/memgraph/install-memgraph-on-linux-docker)
[![Debian](https://img.shields.io/badge/Debian-D70A53?style=for-the-badge&logo=debian&logoColor=white)](https://memgraph.com/docs/memgraph/install-memgraph-on-debian)
[![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)](https://memgraph.com/docs/memgraph/install-memgraph-on-ubuntu)
[![Cent OS](https://img.shields.io/badge/cent%20os-002260?style=for-the-badge&logo=centos&logoColor=F0F0F0)](https://memgraph.com/docs/memgraph/install-memgraph-from-rpm)
[![Fedora](https://img.shields.io/badge/fedora-0B57A4?style=for-the-badge&logo=fedora&logoColor=F0F0F0)](https://memgraph.com/docs/memgraph/install-memgraph-from-rpm)
[![RedHat](https://img.shields.io/badge/redhat-EE0000?style=for-the-badge&logo=redhat&logoColor=F0F0F0)](https://memgraph.com/docs/memgraph/install-memgraph-from-rpm)

你可以在 [下载中心](https://memgraph.com/download) 获取二进制文件和 Docker 镜像，详细安装说明见 [官方文档](https://memgraph.com/docs/memgraph/installation)。

## :rocket: 每日构建

通过使用 [Memgraph 每日构建](https://memgraph.github.io/daily-builds/)，可抢先体验最新功能和改进。每日构建持续更新，让你在稳定版本发布前测试新能力。

<p align="left"> <a href="https://memgraph.github.io/daily-builds/"> <img src="https://img.shields.io/badge/Daily%20Builds-latest-blue?style=for-the-badge" alt="Daily Builds" /> </a> </p>


## :cloud: Memgraph Cloud

了解 [Memgraph Cloud](https://memgraph.com/docs/memgraph-cloud) —— 一项完全托管于 AWS、全球 6 大区域可用的云服务。Memgraph Cloud 让你可以创建高可用的管理型实例，无需运维。

<p align="left">
  <a href="https://memgraph.com/docs/memgraph-cloud">
    <img width="450px" alt="Memgraph Cloud" src="https://public-assets.memgraph.com/memgraph-gifs%2Fcloud.gif">
  </a>
</p>

## :link: 连接 Memgraph

[连接数据库](https://memgraph.com/docs/memgraph/connect-to-memgraph) 可使用 Memgraph Lab、mgconsole，各类驱动（Python, C/C++ 等）及 WebSocket。

### :microscope: Memgraph Lab

可视化图谱并交互查询以洞悉你的数据。[Memgraph Lab](https://memgraph.com/docs/memgraph-lab) 是辅助探索和操作 Memgraph 存储数据的可视化界面。

<p align="left">
  <a href="https://memgraph.com/docs/memgraph-lab">
    <img width="450px" alt="Memgraph Cloud" src="https://public-assets.memgraph.com/memgraph-gifs%2Flab.gif">
  </a>
</p>

## :file_folder: 导入数据

通过 Kafka、RedPanda 或 Pulsar 流、CSV 和 JSON 文件或 Cypher 命令，[将数据导入](https://memgraph.com/docs/memgraph/import-data) Memgraph。

## :bookmark_tabs: 文档

Memgraph 文档可在 [memgraph.com/docs](https://memgraph.com/docs) 获取。

## :question: 配置

Memgraph 支持的命令行选项详见 [参考手册](https://memgraph.com/docs/memgraph/reference-guide/configuration)。

## :trophy: 贡献

欢迎来到 Memgraph 开发的核心！我们致力于让 Memgraph 更快、更易用、更强大。我们要感谢杰出的社区支持，没有你们，Memgraph 不会如此出色。

### 源码编译

通过 [快速开始](https://memgraph.notion.site/Quick-Start-82a99a85e62a4e3d89f6a9fb6d35626d) 指南了解如何下载、编译并运行 Memgraph 源码。

### 探索 Memgraph 内部机制

想深入理解 Memgraph 底层架构？我们的 [内部文档](https://memgraph.notion.site/Memgraph-Internals-12b69132d67a417898972927d6870bd2)将为你揭示其中奥秘。

### 参与贡献指南

准备好参与了？请参考我们的贡献指南]，了解开发流程、如何修复 Bug 和提出增强建议。

贡献无论多大，我们都热烈欢迎！

### 行为准则

我们坚持营造尊重和专业的社区氛围。所有参与者都应严格遵守我们的行为准则。

我们对违规行为“零容忍”。

对行为准则的共同承诺确保 Memgraph 始终秉持诚信与卓越。

# 参考资料

https://github.com/tree-sitter/tree-sitter

* any list
{:toc}