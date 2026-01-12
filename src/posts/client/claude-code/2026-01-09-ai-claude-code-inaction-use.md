---

title: calude-code 安装
date: 2025-03-07
categories: [AI]
tags: [ai, calude-code, sh]
published: true
---


# 前提条件：

您需要安装 Node.js 18 或更新版本环境

Windows 用户还需安装 Git for Windows

# 安装

```sh
npm install -g @anthropic-ai/claude-code
```

```
> claude --version
2.1.2 (Claude Code)
```

# 配置

## Openapi key

这里个人选择 GLM 测试 [https://bigmodel.cn/usercenter/proj-mgmt/apikeys](https://bigmodel.cn/usercenter/proj-mgmt/apikeys) 配置。

添加一个 api key

注意：GLM 需要实名认证+刷脸。（AI 不是法外之地。。。

## 配置环境变量

我们采用默认的方式1：自动化助手

Coding Tool Helper 是一个编码工具助手，快速将您的GLM编码套餐加载到您喜爱的编码工具中。

安装并运行它，按照界面提示操作即可自动完成工具安装，套餐配置，MCP服务器管理等。

```
npx @z_ai/coding-helper
```

按照提示操作下就行。

----

PS: 实际测试好像没成功，可以自己手动改一下配置文件。


本质上就是改了下配置文件

```json
# 编辑或新增 `settings.json` 文件
# MacOS & Linux 为 `~/.claude/settings.json`
# Windows 为`用户目录/.claude/settings.json`
# 新增或修改里面的 env 字段
# 注意替换里面的 `your_zhipu_api_key` 为您上一步获取到的 API Key
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your_zhipu_api_key",
    "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  }
}
# 再编辑或新增 `.claude.json` 文件
# MacOS & Linux 为 `~/.claude.json`
# Windows 为`用户目录/.claude.json`
# 新增 `hasCompletedOnboarding` 参数
{
  "hasCompletedOnboarding": true
}
```

也可以手动改一下一下模型

```json
"env": {
    "ANTHROPIC_AUTH_TOKEN": "your_zhipu_api_key",
    "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1,
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.5-air",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-4.7",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-4.7"
},
```

# 开始使用 Claude Code

配置完成后，进入一个您的代码工作目录，在终端中执行 claude 命令即可开始使用 Claude Code

若遇到「Do you want to use this API key」选择 Yes 即可

启动后选择信任 Claude Code 访问文件夹里的文件，如下：

![Claude Code](https://cdn.bigmodel.cn/markdown/1753631613096claude-2.png?attname=claude-2.png)

完毕！现在就可以正常使用 Claude Code 进行开发了。

PS: 个人没有看到是否使用 api-keys 的提示。

## status

```
 /status

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 ──
  Settings:  Status   Config   Usage  (←/→ or tab to cycle)


  Version: 2.1.2
  Session name: /rename to add a name
  Session ID: xxx
  cwd: D:\ai\im-plateform
  Auth token: ANTHROPIC_AUTH_TOKEN
  Anthropic base URL: https://open.bigmodel.cn/api/anthropic

  Model: Default (glm-4.7)
  Memory:
  Setting sources: User settings

  System Diagnostics
   ⚠ Installation config mismatch: running npm-global but config says unknown
```

这里可以看到对应的模型信息。

## 测试



# 参考资料

