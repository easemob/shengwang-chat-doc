import { hopeTheme, ThemeOptions } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

interface CustomConfig {
  extra_nav?: any[];
}

export default hopeTheme(<ThemeOptions & CustomConfig>{
  hostname: "https://im.shengwang.cn/",
  home: "/",
  iconAssets: "iconfont",
  // logo: '/logo.svg',
  // repo: 'easemob/easemob-doc',
  // docsBranch: 'doc-v2',
  // docsDir: 'docs',
  darkmode: "disable",
  pure: true,
  breadcrumb: false,
  contributors: false,
  // navbar
  navbar: zhNavbar,
  navbarLayout: {
    start: ["Brand"],
    center: [],
    end: ["Language", "Repo", "Outlook"],
  },
  // sidebar
  sidebar: zhSidebar,
  // footer: '环信 IM 文档 Version: 1.0.0 ©️环信',
  displayFooter: false,
  headerDepth: 2,
  extra_nav: [
    // { text: '提交工单', link: 'https://console.easemob.com/ticket', type: 'info' },
    // {
    //   text: '登录',
    //   link: 'https://console.easemob.com/user/login',
    //   type: 'success'
    // },
    // {
    //   text: '注册',
    //   link: 'https://console.easemob.com/user/register',
    //   type: 'primary'
    // }
  ],
  // page meta
  // metaLocales: {
  //   editLink: '在 GitHub 上编辑此页'
  // },
  plugins: {
    mdEnhance: {
      container: true,
      imgSize: true,
      tabs: true,
    },
  },
});
