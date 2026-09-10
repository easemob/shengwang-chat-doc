import { hopeTheme, ThemeOptions } from 'vuepress-theme-hope'
import { zhNavbar } from './navbar/index.js'
import { zhSidebar } from './sidebar/index.js'

interface CustomConfig {
  extra_nav?: any[]
}

export default hopeTheme(<ThemeOptions & CustomConfig>{
  hostname: 'https://im.shengwang.cn/',
  home: '/',
  iconAssets: 'iconfont',
  repo: 'easemob/shengwang-chat-doc',
  docsBranch: 'doc-v5',
  docsDir: 'docs',
  darkmode: 'disable',
  pure: true,
  contributors: false,
  // navbar
  navbar: zhNavbar,
  navbarLayout: {
    start: ['Links'],
    center: [],
    end: ['Language', 'Repo', 'Outlook']
  },
  // sidebar
  sidebar: zhSidebar,
  footer: `<div class="footer-left">声网 IM 文档</div><div class="footer-right">&copy; 声网 ${new Date().getFullYear()}</div>`,
  displayFooter: true,
  headerDepth: 2,
  editLink: false,
  prevLink: false,
  nextLink: false,
  plugins: {
    mdEnhance: {
      container: true,
      imgSize: true,
      tabs: true
    },
    prismjs: {
      light: "coldark-dark",
      dark: "coldark-dark",
    },
  }
})
