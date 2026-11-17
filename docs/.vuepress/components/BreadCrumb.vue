<script setup lang="ts">
import { usePageData } from '@vuepress/client'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ThemeBreadCrumb from '@theme-hope-original/components/BreadCrumb'
import {
  withDocsPath,
  withoutDocsPath,
  getLandingSidebarRoot,
  getPlatformSidebarRoot,
  getValueAddedSidebarRoot,
} from './breadcrumbSidebarContext'
import { useSidebarBreadcrumb } from './useSidebarBreadcrumb'
import { menuLink } from './sidebarBreadcrumb'

interface BreadcrumbItem {
  title: string
  path?: string
}

const pageData = usePageData()
const route = useRoute()
const isHydrated = ref(false)
const { menu, pageGroups } = useSidebarBreadcrumb()
onMounted(() => { isHydrated.value = true })

const platformLabels: Record<string, string> = {
  android: 'Android',
  ios: 'iOS',
  web: 'Web',
  harmonyos: 'HarmonyOS',
  'react-native': 'React Native',
  flutter: 'Flutter',
  uniapp: 'Uniapp',
  unity: 'Unity',
  applet: '小程序',
}

const documentV4Platforms = new Set([
  'unity',
])

const ignoredDocumentPlatforms = new Set(['electron', 'linux'])

const singleChatUIKitPlatforms = new Set([
  'android', 'ios', 'web', 'react-native', 'flutter',
])
const callKitPlatforms = new Set(['android', 'ios', 'web'])

const valueAddedServices: Record<string, { title: string; home: string }> = {
  translation: { title: '消息翻译', home: '/value-added/translation/' },
}

const makeCurrentItem = (): BreadcrumbItem => ({
  title: pageData.value.title,
  path: pageData.value.path,
})

const home: BreadcrumbItem = { title: '首页', path: '/' }
const sdkHome: BreadcrumbItem = { title: 'SDK', path: '/sdk/' }
const uikitHome: BreadcrumbItem = { title: 'UIKit', path: '/uikit/' }
const callKitHome: BreadcrumbItem = { title: 'CallKit', path: '/callkit/' }

const serverLandingBreadcrumbs: Record<string, BreadcrumbItem> = {
  'rest-api': { title: 'REST API', path: '/document/server-side/rest-api.html' },
  callback: { title: '回调', path: '/document/server-side/callback.html' },
}

const serverLandingPaths = new Set(
  Object.values(serverLandingBreadcrumbs).map((item) =>
    item.path!.replace(/\.html$/, '')
  )
)

const withCurrentPage = (
  items: BreadcrumbItem[],
  path: string,
  landing: string
): BreadcrumbItem[] =>
  path === landing ? items : [...items, makeCurrentItem()]

const getCustomBreadcrumb = (path: string): BreadcrumbItem[] | null => {
  path = withoutDocsPath(path)
  const current = makeCurrentItem()

  if (path === '/product/') {
    return [home, { title: '产品简介', path: '/product/' }]
  }
  if (path.startsWith('/product/')) {
    return [home, { title: '产品简介', path: '/product/' }, current]
  }

  if (path === '/sdk/') return [home, sdkHome]
  if (path === '/sdk/v5' || path === '/sdk/v4') {
    return [
      home,
      sdkHome,
      { title: path === '/sdk/v5' ? 'V5' : 'V4', path: `${path}.html` },
    ]
  }

  const sdkMatch = path.match(/^\/(document|v4)(?:\/([^/]+))?(?:\/|$)/)
  if (sdkMatch && sdkMatch[2] !== 'server-side') {
    const [, root, platform] = sdkMatch

    if (root === 'document' && ignoredDocumentPlatforms.has(platform)) {
      return null
    }

    const rootPath = root === 'document' ? '/document/' : '/v4/'
    const items: BreadcrumbItem[] = [home, sdkHome]

    if (platform && platformLabels[platform]) {
      const version =
        root === 'v4' || documentV4Platforms.has(platform) ? 'V4' : 'V5'
      items.push({ title: version, path: `/sdk/${version.toLowerCase()}.html` })
      items.push({
        title: platformLabels[platform],
        path: `${rootPath}${platform}/`,
      })
      return withCurrentPage(items, path, `${rootPath}${platform}/`)
    }

    return [home, sdkHome]
  }

  const serverMatch = path.match(/^\/document\/server-side(?:\/([^/]+))?/)
  if (serverMatch) {
    const fileName = serverMatch[1] ?? ''
    const isCallback = fileName.startsWith('callback_')
    const items: BreadcrumbItem[] = [
      home,
      { title: '服务端', path: '/document/server-side/' },
    ]
    if (path === '/document/server-side/') return items
    if (serverLandingBreadcrumbs[fileName]) {
      return [...items, serverLandingBreadcrumbs[fileName]]
    }
    if (isCallback) return [...items, current]
    items.push({
      title: 'REST API',
      path: '/document/server-side/rest-api.html',
    })
    return [...items, current]
  }

  if (path === '/uikit/') return [home, uikitHome]
  if (path === '/uikit/chatuikit/' || /^\/uikit\/chatuikit\/v[24]\/$/.test(path)) {
    return [home, uikitHome, { title: '单群聊 UIKit', path: '/uikit/chatuikit/' }]
  }

  const singleChatVersionMatch = path.match(/^\/uikit\/chatuikit\/(v[124])$/)
  if (singleChatVersionMatch) {
    return [
      home,
      uikitHome,
      { title: '单群聊 UIKit', path: '/uikit/chatuikit/' },
    ]
  }

  const singleChatMatch = path.match(/^\/uikit\/chatuikit\/(?:v[24]\/)?([^/]+)(?:\/|$)/)
  if (singleChatMatch && singleChatUIKitPlatforms.has(singleChatMatch[1])) {
    const platform = singleChatMatch[1]
    const version = path.match(/^\/uikit\/chatuikit\/(v[24])\//)?.[1] ?? 'v4'
    const platformPath = `/uikit/chatuikit/${version}/${platform}/`
    return withCurrentPage(
      [
        home,
        uikitHome,
        { title: '单群聊 UIKit', path: '/uikit/chatuikit/' },
        { title: platformLabels[platform], path: platformPath },
      ],
      path,
      platformPath
    )
  }

  if (path === '/callkit/') return [home, callKitHome]
  if (path === '/callkit/v4' || path === '/callkit/v2') {
    return [home, callKitHome]
  }

  const callKitMatch = path.match(/^\/callkit\/([^/]+)(?:\/|$)/)
  if (
    callKitMatch &&
    callKitPlatforms.has(callKitMatch[1])
  ) {
    const platform = callKitMatch[1]
    const platformPath = `/callkit/${platform}/`
    return withCurrentPage(
      [
        home,
        callKitHome,
        { title: platformLabels[platform], path: platformPath },
      ],
      path,
      platformPath
    )
  }

  const valueAddedMatch = path.match(/^\/value-added\/([^/]+)(?:\/|$)/)
  if (path === '/value-added/') {
    return [home, { title: '增值服务', path: '/value-added/' }]
  }
  if (valueAddedMatch && valueAddedServices[valueAddedMatch[1]]) {
    const service = valueAddedMatch[1]
    const serviceConfig = valueAddedServices[service]
    const items: BreadcrumbItem[] = [
      home,
      { title: '增值服务', path: '/value-added/' },
      { title: serviceConfig.title, path: serviceConfig.home },
    ]
    return path === serviceConfig.home.replace(/\.html$/, '')
      ? items
      : [...items, current]
  }

  return null
}

const customBreadcrumb = computed(() => {
  if (isHydrated.value && menu.value) {
    const from = typeof route.query.from === 'string' ? route.query.from : menu.value.root
    const base = getCustomBreadcrumb(withoutDocsPath(from).replace(/\.html$/, '')) ?? [home]
    const normalizedFrom = withoutDocsPath(from).replace(/\.html$/, '')
    const preserveServerLanding = serverLandingPaths.has(normalizedFrom)
    const lastBaseItem = base[base.length - 1]
    if (
      base.length > 1 &&
      (lastBaseItem.title === pageData.value.title ||
        (!preserveServerLanding && !normalizedFrom.endsWith('/') &&
          withoutDocsPath(lastBaseItem.path ?? '').replace(/\.html$/, '') === normalizedFrom))
    ) {
      base.pop()
    }
    const contextualBase = base.map((item) => {
      const sidebarRoot = item.path && getLandingSidebarRoot(item.path, menu.value!.root)
      return sidebarRoot
        ? { ...item, path: `${item.path}?sidebar=${encodeURIComponent(sidebarRoot)}` }
        : item
    })
    const groups = menu.value.groups.filter((group, index) =>
      !(preserveServerLanding &&
        index === 0 &&
        group.item.text === base[base.length - 1]?.title)
    )
    return [
      ...contextualBase,
      ...groups.map((group) => ({
        title: group.item.text ?? '',
        path: menuLink(menu.value!.root, group.indices, from),
      })),
    ]
  }
  const items = getCustomBreadcrumb(pageData.value.path.replace(/\.html$/, ''))
  if (!items) return null

  const normalizedPath = withoutDocsPath(pageData.value.path).replace(/\.html$/, '')
  const isServerSpecialPage =
    normalizedPath === '/document/server-side/rest-api' ||
    normalizedPath === '/document/server-side/callback'
  if (isServerSpecialPage) return items

  const origin = getPlatformSidebarRoot(route.path) ??
    getValueAddedSidebarRoot(route.path) ??
    getLandingSidebarRoot(route.path, route.query.sidebar)

  const last = items.pop()
  const groups = pageGroups.value.map((item) => {
    if (
      normalizedPath.startsWith('/document/server-side/callback_') &&
      item.title === '回调'
    ) {
      return { ...item, path: '/document/server-side/callback.html' }
    }
    return item
  })
  return [...items, ...groups, last].filter((item): item is BreadcrumbItem => Boolean(item)).map((item) => {
    const sidebarRoot = item.path && getLandingSidebarRoot(item.path, origin)
    return sidebarRoot
      ? { ...item, path: `${item.path}?sidebar=${encodeURIComponent(sidebarRoot)}` }
      : item
  })
})
</script>

<template>
  <ThemeBreadCrumb v-if="!customBreadcrumb" />

  <nav
    v-else
    class="breadcrumb"
    aria-label="面包屑导航"
  >
    <ol vocab="https://schema.org/" typeof="BreadcrumbList">
      <li
        v-for="(item, index) in customBreadcrumb"
        :key="`${item.title}-${index}`"
        :class="{ 'is-active': index === customBreadcrumb.length - 1 }"
        property="itemListElement"
        typeof="ListItem"
      >
        <RouterLink
          v-if="item.path"
          :to="withDocsPath(item.path)"
          property="item"
          typeof="WebPage"
        >
          <span property="name">{{ item.title }}</span>
        </RouterLink>
        <span v-else property="name">{{ item.title }}</span>
        <meta property="position" :content="String(index + 1)" />
      </li>
    </ol>
  </nav>
</template>
