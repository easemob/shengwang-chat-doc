import { defineUserConfig, HeadConfig, UserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { hopeTheme } from 'vuepress-theme-hope'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { containerPlugin } from './markdown/plugin'
import theme from './theme.js'
import path from 'node:path'

// import type { DocSearchProps } from '@docsearch/react'

// type DocSearchClientLocaleOptions = Omit<
//   DocSearchProps,
//   'hitComponent' | 'navigator' | 'transformSearchClient'
// >

// interface DocSearchClientOptions extends DocSearchClientLocaleOptions {
//   locales?: Record<string, DocSearchClientLocaleOptions>
// }

// const defineDocSearchConfig: (options: DocSearchClientOptions) => void

const HOME_PATH = '/'
const HOME_TITLE = 'IM集成_IM开发文档_即时通讯接入_即时通信IM文档_环信'
const HOME_KEYWORDS =
  'IM集成,即时通讯 IM 开发文档,即时通信IM开发文档,即时通讯接入,即时通信IM文档'
const HOME_DESCRIPTION =
  '即时通讯 IM 文档为您提供即时通讯IM集成全流程详解，涵盖从快速开始到深度功能开发，帮助开发者高效实现应用内即时通信IM需求。'
const INNER_PAGE_TITLE_PREFIX = '即时通讯IM开发 '
const INNER_PAGE_TITLE_SUFFIX = '｜即时通讯 IM 文档'
const SEO_META_NAMES = new Set(['description', 'keywords'])
const DOCS_PATH_PREFIXES = ['document', 'callkit', 'product', 'sdk', 'uikit', 'v4', 'value-added']

const sanitizeTitle = (title: string): string =>
  title
    .replace(/^即时通讯IM开发\s*/u, '')
    .replace(/\s*[|｜]\s*即时通讯 IM 文档$/u, '')
    .trim()

const createSeoHead = ({
  title,
  description,
  keywords
}: {
  title: string
  description?: string
  keywords?: string
}): HeadConfig[] => {
  const head: HeadConfig[] = [['title', {}, title]]

  if (description) {
    head.push(['meta', { name: 'description', content: description }])
  }

  if (keywords) {
    head.push(['meta', { name: 'keywords', content: keywords }])
  }

  return head
}

const mergeSeoHead = (
  existingHead: HeadConfig[] = [],
  nextHead: HeadConfig[]
): HeadConfig[] => {
  const preservedHead = existingHead.filter(([tag, attrs]) => {
    if (tag === 'title') return false
    if (tag !== 'meta') return true

    const metaName = attrs.name
    return typeof metaName !== 'string' || !SEO_META_NAMES.has(metaName)
  })

  return [...nextHead, ...preservedHead]
}

const normalizeSourcePath = (sourcePath?: string | null): string =>
  (sourcePath || '').replace(/\\/g, '/').replace(/\.md$/u, '')

const withDocsPrefix = (url: string): string => {
  const matched = url.match(/^\/([^/?#]+)([/?#].*)?$/u)
  if (!matched || !DOCS_PATH_PREFIXES.includes(matched[1])) return url
  return `/docs${url}`
}

const FRONTMATTER_LINK_KEYS = new Set(['link', 'href', 'to'])

const rewriteFrontmatterLinks = (value: unknown, key?: string): unknown => {
  if (typeof value === 'string') {
    return key && FRONTMATTER_LINK_KEYS.has(key) ? withDocsPrefix(value) : value
  }
  if (Array.isArray(value)) return value.map((item) => rewriteFrontmatterLinks(item))
  if (!value || typeof value !== 'object') return value

  return Object.fromEntries(
    Object.entries(value).map(([childKey, item]) => [
      childKey,
      rewriteFrontmatterLinks(item, childKey),
    ])
  )
}

const getDocsRoutePath = (sourcePath?: string | null): string | null => {
  const source = normalizeSourcePath(sourcePath)
  if (!source) return null

  const segments = source.split('/').filter(Boolean)
  const docsIndex = segments.lastIndexOf('docs')
  const relativeSegments = docsIndex > -1 ? segments.slice(docsIndex + 1) : segments
  const firstSegment = relativeSegments[0]

  if (!firstSegment || !DOCS_PATH_PREFIXES.includes(firstSegment)) return null

  const routeSegments = relativeSegments.slice()
  const lastIndex = routeSegments.length - 1
  if (routeSegments[lastIndex] === 'README' || routeSegments[lastIndex] === 'index') {
    routeSegments.pop()
    return `/docs/${routeSegments.join('/')}/`
  }

  return `/docs/${routeSegments.join('/')}.html`
}

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'IM 文档',
  head: [['link', { rel: 'icon', href: '/logo.ico' }]],
  description: '即时通讯 IM 文档',
  shouldPrefetch: false,
  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          '@static': path.resolve(__dirname, './public')
        }
      },
      plugins: [
        // AutoImport({
        //   resolvers: [ElementPlusResolver({})],
        // }),
        // Components({
        //   resolvers: [ElementPlusResolver({ssr: true })],
        // }),
      ]
    },
    vuePluginOptions: {}
  }),
  markdown: {
    headers: {
      level: [2, 3]
    },
    code:{
      lineNumbers:false
    }
  },
  extendsMarkdown: (md) => {
    containerPlugin(md)
    md.core.ruler.after('inline', 'docs_path_prefix', (state) => {
      state.tokens.forEach((blockToken) => {
        if (!blockToken.children) return

        blockToken.children.forEach((token) => {
          if (token.type !== 'link_open') return

          const href = token.attrGet('href')
          if (href) token.attrSet('href', withDocsPrefix(href))
        })
      })
    })
  },
   // Set path in extendsPageOptions so htmlFilePath includes /docs.
  // extendsPage alone only updates the SPA route; HTML still lands without /docs.
  extendsPageOptions: (options) => {
    const docsRoutePath = getDocsRoutePath(options.filePath)
    if (docsRoutePath) {
      options.path = docsRoutePath
    }
  },
  extendsPage: (page) => {
    page.frontmatter = rewriteFrontmatterLinks(page.frontmatter) as typeof page.frontmatter
    page.data.frontmatter = page.frontmatter

    const isHomePage = page.path === HOME_PATH
    const pageBaseTitle = sanitizeTitle(page.title) || page.title.trim()
    const title = isHomePage
      ? HOME_TITLE
      : `${INNER_PAGE_TITLE_PREFIX}${pageBaseTitle}${INNER_PAGE_TITLE_SUFFIX}`
    const description = isHomePage
      ? HOME_DESCRIPTION
      : page.frontmatter.description
    const keywords = isHomePage ? HOME_KEYWORDS : undefined
    const head = mergeSeoHead(
      page.frontmatter.head,
      createSeoHead({ title, description, keywords })
    )

    page.frontmatter.head = head
    page.data.frontmatter.head = head
  },
  templateBuild: path.resolve(__dirname, './templates/index.build.html'),
  theme,
  plugins: [
    docsearchPlugin({
      appId: '5K8UTB3JVE',
      apiKey: 'df9e938d06f6531ce8dd8de71f907f0d',
      indexName: 'im-beta-easemob',
      searchParameters: {
        attributesToSnippet: [
          'hierarchy.lvl1:20',
          'hierarchy.lvl2:20',
          'hierarchy.lvl3:20',
          'hierarchy.lvl4:20',
          'hierarchy.lvl5:20',
          'hierarchy.lvl6:20',
          'content:50'
        ],
        hitsPerPage: 50,
        facetFilters: [
          [
            'type:lvl0',
            'type:lvl1',
            'type:lvl2',
            'type:lvl3',
            'type:lvl4',
            'type:lvl5'
          ]
        ]
      },
      maxResultsPerGroup: 30,
      // transformItems: (items) => {
      //   console.log(items)
      //   return items.map((items) => ({ ...items, content: 'xxxxxx' }))
      // },
      placeholder: '搜索文档',
      translations: {
        button: {
          buttonText: '搜索',
          buttonAriaLabel: '搜索文档'
        },
        modal: {
          searchBox: {
            resetButtonTitle: '清除查询条件',
            resetButtonAriaLabel: '清除查询条件',
            cancelButtonText: '取消',
            cancelButtonAriaLabel: '取消'
          },
          startScreen: {
            recentSearchesTitle: '搜索历史',
            noRecentSearchesText: '没有搜索历史',
            saveRecentSearchButtonTitle: '保存至搜索历史',
            removeRecentSearchButtonTitle: '从搜索历史中移除',
            favoriteSearchesTitle: '收藏',
            removeFavoriteSearchButtonTitle: '从收藏中移除'
          },
          errorScreen: {
            titleText: '无法获取结果',
            helpText: '你可能需要检查你的网络连接'
          },
          footer: {
            selectText: '选择',
            navigateText: '切换',
            closeText: '关闭',
            searchByText: '搜索提供者'
          },
          noResultsScreen: {
            noResultsText: '无法找到相关结果',
            suggestedQueryText: '你可以尝试查询',
            reportMissingResultsText: '你认为该查询应该有结果？',
            reportMissingResultsLinkText: '点击反馈'
          }
        }
      }
    })
  ],
  onPrepared: async (app) => {
    await app.writeTemp(
      'pages.js',
      `export default ${JSON.stringify(app.pages.map(({ data }) => data))}`
    )
  },
  alias: {
    '@theme-hope/components/HomePage': path.resolve(
      __dirname,
      './components/HomePage.vue'
    ),

    '@theme-hope/modules/sidebar/components/Sidebar': path.resolve(
      __dirname,
      './components/Sidebar.vue'
    ),

    '@theme-hope/modules/navbar/components/Navbar': path.resolve(
      __dirname,
      './components/Navbar.vue'
    ),

    '@theme-hope/components/MarkdownContent': path.resolve(
      __dirname,
      './components/MarkdownContent.vue'
    ),

    '@theme-hope/components/PageNav': path.resolve(
      __dirname,
      './components/PageNav.vue'
    )
  }
})
