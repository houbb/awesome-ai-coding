import { navbar } from "vuepress-theme-hope";

//https://icon-sets.iconify.design/
export const zhNavbar = navbar([
  {
    text: "AI 学习",
    icon: "fa6-solid:brain",
    children: [
      {
        text: "机器学习",
        icon: "fa6-solid:robot",
        link: "/posts/ml/",
      },
      {
        text: "大语言模型",
        icon: "fa6-solid:comments",
        link: "/posts/llm/",
      },
      {
        text: "深度学习",
        icon: "fa6-solid:network-wired",
        link: "/posts/learn-llms/",
      },
      {
        text: "AI 综合",
        icon: "fa6-solid:star",
        link: "/posts/ai/",
      },
    ],
  },
  {
    text: "AI 工具",
    icon: "fa6-solid:screwdriver-wrench",
    children: [
      {
        text: "MCP 工具",
        icon: "fa6-solid:plug",
        link: "/posts/mcp/",
      },
      {
        text: "AI 代理",
        icon: "fa6-solid:user-robot",
        link: "/posts/agent/",
      },
      {
        text: "代理技能",
        icon: "fa6-solid:gears",
        link: "/posts/agentskills/",
      },
      {
        text: "客户端工具",
        icon: "fa6-solid:computer",
        link: "/posts/client/",
      },
      {
        text: "AIGC",
        icon: "fa6-solid:image",
        link: "/posts/aigc/",
      },
    ],
  },
  {
    text: "开发实践",
    icon: "fa6-solid:code",
    children: [
      {
        text: "SDD 实践",
        icon: "fa6-solid:diagram-project",
        link: "/posts/sdd/",
      },
    ],
  },
  {
    text: "全部文章",
    icon: "fa6-solid:pen-to-square",
    link: "/posts/",
  },
]);
