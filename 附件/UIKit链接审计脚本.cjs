const fs = require("node:fs");
const path = require("node:path");
const MarkdownIt = require("markdown-it");
const { headersPlugin } = require("@mdit-vue/plugin-headers");
const { slugify } = require("@mdit-vue/shared");

const root = process.cwd();
const docsRoot = path.join(root, "docs");
const publicRoot = path.join(docsRoot, ".vuepress", "public");
const v4Root = path.join(docsRoot, "uikit", "chatuikit", "v4");
const md = new MarkdownIt({ html: true });
md.use(headersPlugin, { level: [1, 2, 3, 4, 5, 6], slugify });

const walk = (dir, predicate = () => true) => {
  const result = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) result.push(...walk(full, predicate));
    else if (predicate(full)) result.push(full);
  }
  return result;
};

const markdownFiles = walk(docsRoot, (file) => file.endsWith(".md"));
const v4Files = markdownFiles.filter((file) => file.startsWith(v4Root + path.sep));
const fileSet = new Set(markdownFiles.map((file) => path.normalize(file).toLowerCase()));
const headingCache = new Map();

const decode = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const getHeadings = (file) => {
  if (headingCache.has(file)) return headingCache.get(file);
  const env = {};
  md.render(fs.readFileSync(file, "utf8"), env);
  const ids = new Set();
  const collect = (headers = []) => {
    for (const header of headers) {
      if (header.slug) ids.add(header.slug);
      collect(header.children);
    }
  };
  collect(env.headers);
  headingCache.set(file, ids);
  return ids;
};

const isExternal = (url) => /^(?:https?:|mailto:|tel:|javascript:|data:|ftp:|[/][/])/i.test(url);
const isImage = (url) => /\.(?:png|jpe?g|gif|svg|webp|bmp|ico)(?:[?#].*)?$/i.test(url);

const extractRefs = (file) => {
  const source = fs.readFileSync(file, "utf8");
  const tokens = md.parse(source, {});
  const refs = [];
  const searchOffsets = new Map();
  const add = (kind, url, line) => {
    if (!url || url.startsWith("${")) return;
    const cleanUrl = url.trim();
    let exactLine = line || 1;
    const sourceUrl = decode(cleanUrl);
    const searchKey = source.includes(cleanUrl) ? cleanUrl : sourceUrl;
    const start = searchOffsets.get(searchKey) || 0;
    let index = source.indexOf(searchKey, start);
    if (index < 0 && start > 0) index = source.indexOf(searchKey);
    if (index >= 0) {
      exactLine = source.slice(0, index).split(/\r?\n/).length;
      searchOffsets.set(searchKey, index + searchKey.length);
    }
    refs.push({ file, line: exactLine, kind, url: cleanUrl });
  };
  const scanTokens = (items, inheritedLine = 1) => {
    for (const token of items) {
      const line = token.map ? token.map[0] + 1 : inheritedLine;
      if (token.type === "link_open") {
        const href = token.attrGet("href");
        add(isImage(href || "") ? "image" : "document", href, line);
      }
      if (token.type === "image") add("image", token.attrGet("src"), line);
      if (token.type === "html_block" || token.type === "html_inline") {
        const text = token.content || "";
        const attrPattern = /\b(src|href)\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi;
        for (const match of text.matchAll(attrPattern)) {
          const url = match[2] || match[3] || match[4];
          add(match[1].toLowerCase() === "src" || isImage(url) ? "image" : "document", url, line);
        }
      }
      if (token.children) scanTokens(token.children, line);
    }
  };
  scanTokens(tokens);

  const frontmatter = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (frontmatter) {
    const lineOffset = source.slice(0, frontmatter.index).split(/\r?\n/).length;
    for (const match of frontmatter[1].matchAll(/^\s*pageUri:\s*["']?([^"'\s]+)["']?\s*,?\s*$/gm)) {
      const prior = frontmatter[1].slice(0, match.index).split(/\r?\n/).length;
      add("document", match[1], lineOffset + prior);
    }
  }
  return refs;
};

const resolveRef = (ref) => {
  let raw = ref.url.replace(/^<|>$/g, "");
  if (isExternal(raw)) return { status: "external" };
  if (raw.startsWith("#")) {
    const anchor = decode(raw.slice(1));
    return getHeadings(ref.file).has(anchor)
      ? { status: "ok", target: ref.file, anchor }
      : { status: "missing-anchor", target: ref.file, anchor };
  }

  const hashIndex = raw.indexOf("#");
  const fragment = hashIndex >= 0 ? decode(raw.slice(hashIndex + 1)) : "";
  if (hashIndex >= 0) raw = raw.slice(0, hashIndex);
  raw = raw.split("?")[0];
  raw = decode(raw);

  let target;
  if (raw.startsWith("/images/") || raw.startsWith("/icon-") || raw.startsWith("/guide/") || raw.startsWith("/sdk/")) {
    target = path.join(publicRoot, raw.slice(1));
  } else if (raw.startsWith("/docs/")) {
    target = path.join(docsRoot, raw.slice("/docs/".length));
  } else if (raw.startsWith("/")) {
    target = path.join(docsRoot, raw.slice(1));
  } else {
    target = path.resolve(path.dirname(ref.file), raw);
  }

  const originalTarget = target;
  if (/\.html$/i.test(target)) target = target.replace(/\.html$/i, ".md");
  else if (target.endsWith(path.sep)) target = path.join(target, "README.md");
  else if (!path.extname(target)) {
    if (fileSet.has(path.normalize(target + ".md").toLowerCase())) target += ".md";
    else if (fileSet.has(path.normalize(path.join(target, "README.md")).toLowerCase())) target = path.join(target, "README.md");
  }

  if (!fs.existsSync(target)) {
    return { status: "missing-target", target, originalTarget };
  }
  if (fragment && target.endsWith(".md") && !getHeadings(target).has(fragment)) {
    return { status: "missing-anchor", target, anchor: fragment };
  }
  return { status: "ok", target, anchor: fragment || undefined };
};

const v4Refs = v4Files.flatMap(extractRefs);
const allRefs = markdownFiles.flatMap(extractRefs);
const isUIKitDocRef = (ref, resolved) => {
  if (/\/(?:docs\/)?uikit\/chatuikit\//i.test(ref.url)) return true;
  return resolved.target && path.normalize(resolved.target).toLowerCase().startsWith(
    path.normalize(path.join(docsRoot, "uikit", "chatuikit") + path.sep).toLowerCase()
  );
};

const check = (refs) => refs.map((ref) => ({ ...ref, ...resolveRef(ref) }));
const v4Results = check(v4Refs);
const allResults = check(allRefs);
const uikitResults = allResults.filter((item) => isUIKitDocRef(item, item));
const failures = (items) => items.filter((item) => item.status.startsWith("missing"));
const summarize = (items) => ({
  references: items.length,
  documents: items.filter((item) => item.kind === "document").length,
  images: items.filter((item) => item.kind === "image").length,
  external: items.filter((item) => item.status === "external").length,
  missingTargets: items.filter((item) => item.status === "missing-target").length,
  missingAnchors: items.filter((item) => item.status === "missing-anchor").length,
  missingDocumentTargets: items.filter((item) => item.status === "missing-target" && item.kind === "document").length,
  missingImageTargets: items.filter((item) => item.status === "missing-target" && item.kind === "image").length,
});

const platformOf = (file) => {
  const rel = path.relative(v4Root, file).replace(/\\/g, "/");
  const platform = rel.split("/")[0];
  return ["android", "ios", "web"].includes(platform) ? platform : "v4-root";
};

const dedupe = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    const key = [item.file, item.line, item.kind, item.url, item.status].join("\u0000");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const crossPlatformImages = dedupe(v4Results.filter((item) => {
  if (item.kind !== "image") return false;
  const match = item.url.match(/\/images\/uikit\/chatuikit\/(android|ios|web)\//i);
  return match && platformOf(item.file) !== match[1].toLowerCase();
}));

const relative = (file) => path.relative(root, file).replace(/\\/g, "/");
const clean = (item) => ({
  file: relative(item.file),
  line: item.line,
  kind: item.kind,
  url: item.url,
  status: item.status,
  target: item.target ? relative(item.target) : undefined,
  anchor: item.anchor,
});

console.log(JSON.stringify({
  generatedAt: new Date().toISOString(),
  v4: {
    files: v4Files.length,
    summary: summarize(v4Results),
    platforms: Object.fromEntries(["android", "ios", "web", "v4-root"].map((platform) => {
      const items = v4Results.filter((item) => platformOf(item.file) === platform);
      return [platform, { files: new Set(items.map((item) => item.file)).size, ...summarize(items) }];
    })),
    failures: dedupe(failures(v4Results)).map(clean),
    crossPlatformImages: crossPlatformImages.map(clean),
    externalUrls: [...new Set(v4Results.filter((item) => item.status === "external").map((item) => item.url))].sort(),
  },
  uikitAcrossDocs: {
    files: new Set(uikitResults.map((item) => item.file)).size,
    summary: summarize(uikitResults),
    failures: dedupe(failures(uikitResults)).map(clean),
  },
}, null, 2));
