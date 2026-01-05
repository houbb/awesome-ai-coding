---
title: ui-ux-pro-max-skill.nextlevelbuilder 构建专业级跨平台 UI/UX 提供设计智能支持
date: 2026-01-05
categories: [AI]
tags: [ai, ai-coding, skills, sh]
published: true
---

# UI UX Pro Max

一个 AI 技能（AI Skill），为构建专业级跨平台 UI/UX 提供设计智能支持。([GitHub][1])

## 概览

UI UX Pro Max 是一个可搜索的设计数据库，包含 UI 样式、色彩调色板、字体配对、图表类型、产品推荐、UX 指南，以及针对不同技术栈的最佳实践。

它可以作为 AI 代码助手（如 Claude Code、Cursor、Windsurf 等）的技能或工作流使用。([GitHub][1])

![design](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/screenshots/website.png?raw=true)

## 特性

* 57 种 UI 样式 — 包括 Glassmorphism（玻璃拟态）、Claymorphism（黏土拟态）、Minimalism（极简）、Brutalism（野性主义）、Neumorphism（新拟态）、Bento Grid（便当网格）、暗色模式 等等。([GitHub][1])
* 95 套色彩调色板 — 为 SaaS、电子商务、医疗、金融科技、美妆 等行业提供行业特定配色方案。([GitHub][1])
* 56 组字体配对 — 精选排版组合，含 Google Fonts 引入方式。([GitHub][1])
* 24 种图表类型 — 针对仪表板与分析视觉效果的推荐。([GitHub][1])
* 8 种技术栈 — 包括 React、Next.js、Vue、Svelte、SwiftUI、React Native、Flutter、HTML + Tailwind。([GitHub][1])
* 98 条 UX 指南 — 包含最佳实践、反模式示例以及无障碍可访问性规则。([GitHub][1])

## 安装

### 使用 CLI（推荐）

```bash
# 全局安装 CLI
npm install -g uipro-cli

# 进入你的项目目录
cd /path/to/your/project

# 为你的 AI 助手安装技能
uipro init --ai claude      # Claude Code
uipro init --ai cursor      # Cursor
uipro init --ai windsurf    # Windsurf
uipro init --ai antigravity # Antigravity (.agent + .shared)
uipro init --ai copilot     # GitHub Copilot
uipro init --ai kiro        # Kiro
uipro init --ai all         # 安装到所有助手
```

### 其他 CLI 命令

```bash
uipro versions              # 列出可用版本
uipro update                # 更新到最新版本
uipro init --version v1.0.0 # 安装指定版本
```

### 手动安装

将以下对应文件夹复制到你的项目中：

| AI 助手          | 需要复制的文件夹                                                             |
| -------------- | -------------------------------------------------------------------- |
| Claude Code    | `.claude/skills/ui-ux-pro-max/`                                      |
| Cursor         | `.cursor/commands/ui-ux-pro-max.md` + `.shared/ui-ux-pro-max/`       |
| Windsurf       | `.windsurf/workflows/ui-ux-pro-max.md` + `.shared/ui-ux-pro-max/`    |
| Antigravity    | `.agent/workflows/ui-ux-pro-max.md` + `.shared/ui-ux-pro-max/`       |
| GitHub Copilot | `.github/prompts/ui-ux-pro-max.prompt.md` + `.shared/ui-ux-pro-max/` |
| Kiro           | `.kiro/steering/ui-ux-pro-max.md` + `.shared/ui-ux-pro-max/`         |

([GitHub][2])

## 前置条件

必须安装 Python 3.x，用于执行搜索脚本：

```bash
# 检查 Python 是否安装
python3 --version

# macOS
brew install python3

# Ubuntu / Debian
sudo apt update && sudo apt install python3

# Windows
winget install Python.Python.3.12
```

([GitHub][2])

## 使用方法

### Claude Code

当你请求 UI/UX 工作时，该技能会自动激活。只需自然语言对话即可：

```
Build a landing page for my SaaS product
```

([GitHub][2])

### Cursor / Windsurf / Antigravity

使用斜杠命令触发技能：

```
/ui-ux-pro-max Build a landing page for my SaaS product
```

([GitHub][2])

### Kiro

在对话中键入 `/` 查看可用命令，然后选择 `ui-ux-pro-max`：

```
/ui-ux-pro-max Build a landing page for my SaaS product
```

([GitHub][2])

### GitHub Copilot

在 VS Code 启用 Copilot 时键入 `/`，查看可用提示词，然后选择 `ui-ux-pro-max`：

```
/ui-ux-pro-max Build a landing page for my SaaS product
```

([GitHub][2])

### 示例提示语

```
Build a landing page for my SaaS product
Create a dashboard for healthcare analytics
Design a portfolio website with dark mode
Make a mobile app UI for e-commerce
```

([GitHub][2])

## 工作原理

1. 你提出请求 — 请求任何 UI/UX 任务（构建、设计、创建、实现、审查、修复、改进）。
2. 技能激活 — AI 会自动根据请求搜索设计数据库中的相关样式、色彩、字体和指南。
3. 智能推荐 — 基于产品类型和需求，找到最匹配的设计系统。
4. 代码生成 — 生成包含合适颜色、字体、间距和最佳实践的 UI 代码。([GitHub][2])

## 支持的技术栈

该技能为不同技术栈提供专属指南：

* HTML + Tailwind（默认）
* React / Next.js
* Vue / Nuxt UI / Svelte
* SwiftUI / React Native / Flutter

只需在提示语中提及你希望使用的技术栈，否则将默认使用 HTML + Tailwind。([GitHub][2])

## Star 历史（项目星标趋势图）

（省略图表内容）([GitHub][2])

## 许可证

本项目采用 MIT 许可证。([GitHub][2])

如果你需要**包含原始 README 格式结构的保留翻译版本（保留代码块等）**或者希望**翻译其他文件（如 CLAUDE.md、示例提示、技能配置等）**，请告诉我。

# 参考资料

[1]: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill?utm_source=chatgpt.com "GitHub - nextlevelbuilder/ui-ux-pro-max-skill: An AI SKILL that provide design intelligence for building professional UI/UX multiple platforms"
[2]: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill "GitHub - nextlevelbuilder/ui-ux-pro-max-skill: An AI SKILL that provide design intelligence for building professional UI/UX multiple platforms"

* any list
{:toc}