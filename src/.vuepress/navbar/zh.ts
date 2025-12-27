import { navbar } from "vuepress-theme-hope";

//https://icon-sets.iconify.design/
export const zhNavbar = navbar([
  {
    text: "个人成长",
    icon: "fa6-solid:user-graduate",
    children: [
      {
        text: "老马随笔",
        icon: "fa6-solid:pen-nib",
        link: "/category/notes/",
      },
      {
        text: "职业发展",
        icon: "fa6-solid:user-tie",
        link: "/category/company/",
      },
      {
        text: "方法模型",
        icon: "fa6-solid:diagram-project",
        link: "/category/methodsandmodel/",
      },
    ],
  },
  {
    text: "财务自由",
    icon: "fa6-solid:sack-dollar",
    children: [
      {
        text: "财富自由",
        icon: "fa6-solid:sack-dollar",
        link: "/category/money/",
      },
      {
        text: "商业思考",
        icon: "fa6-solid:briefcase",
        link: "/category/business/",
      },
    ],
  },
  {
    text: "推广营销",
    icon: "fa6-solid:bullhorn",
    children:[
      {
        text: "市场营销",
        icon: "fa6-solid:bullhorn",
        link: "/category/marketing/",
      },
      {
        text: "媒体运营",
        icon: "fa6-solid:photo-film",
        link: "/category/fans/",
      },
    ]
  },
  {
    text: "生活兴趣",
    icon: "fa6-solid:heart",
    children: [
      {
        text: "环游世界",
        icon: "fa6-solid:globe",
        link: "/category/travel/",
      },
      {
        text: "电影影视",
        icon: "fa6-solid:film",
        link: "/category/moive/",
      },
      {
        text: "读书笔记",
        icon: "fa6-solid:book-open",
        link: "/category/reading/",
      },
    ],
  },
  
  {
    text: "全部文章",
    icon: "fa6-solid:pen-to-square",
    link: "/posts/",
  },
]);
