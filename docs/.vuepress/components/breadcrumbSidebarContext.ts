/** Canonical site routes include /docs; legacy links are accepted at the boundary. */
export const withDocsPath = (path: string): string =>
  /^\/(?:document|v4|sdk|uikit|callkit|product|value-added|breadcrumb)(?:\/|$)/.test(path)
    ? '/docs' + path : path
export const withoutDocsPath = (path: string): string => path.replace(/^\/docs(?=\/)/, '')
const roots = (prefix: string, platforms: string[]): string[] =>
  platforms.map(platform => '/docs' + prefix + platform + '/')
const sdkV5 = roots('/document/', ['android', 'ios', 'web'])
const sdkV4 = [...roots('/v4/', ['android', 'ios', 'web', 'applet']),
  ...roots('/document/', ['harmonyos', 'flutter', 'react-native', 'unity'])]
const chatV4 = roots('/uikit/chatuikit/v4/', ['android', 'ios', 'web'])
const chatV2 = roots('/uikit/chatuikit/v2/', ['android', 'ios', 'web', 'flutter', 'react-native'])
const callKit = roots('/callkit/', ['android', 'ios', 'web'])
const services = ['/docs/value-added/translation']
const landingSidebars: Record<string, { fallback: string; allowed: string[] }> = {
  '/docs/sdk/': { fallback: sdkV5[0], allowed: [...sdkV5, ...sdkV4] },
  '/docs/sdk/v5.html': { fallback: sdkV5[0], allowed: sdkV5 },
  '/docs/sdk/v4.html': { fallback: sdkV4[0], allowed: sdkV4 },
  '/docs/uikit/': { fallback: chatV4[0], allowed: [...chatV4, ...chatV2] },
  '/docs/uikit/chatuikit/': { fallback: chatV4[0], allowed: [...chatV4, ...chatV2] },
  '/docs/uikit/chatuikit/v4/': { fallback: chatV4[0], allowed: chatV4 },
  '/docs/uikit/chatuikit/v2/': { fallback: chatV2[0], allowed: chatV2 },
  '/docs/callkit/': { fallback: callKit[0], allowed: callKit },
  '/docs/value-added/': { fallback: services[0], allowed: services },
}
const platformRoots = [...sdkV5, ...sdkV4, ...chatV4, ...chatV2, ...callKit]
export const getPlatformSidebarRoot = (path: string): string | null =>
  platformRoots.find(root => withDocsPath(path).startsWith(root)) ?? null
export const getValueAddedSidebarRoot = (path: string): string | null =>
  services.find(root => withDocsPath(path) === root || withDocsPath(path).startsWith(root + '/')) ?? null
export const getLandingSidebarRoot = (path: string, candidate?: unknown): string | null => {
  const config = landingSidebars[withDocsPath(path)]
  if (!config) return null
  const root = typeof candidate === 'string' ? withDocsPath(candidate) : ''
  return config.allowed.includes(root) ? root : config.fallback
}
