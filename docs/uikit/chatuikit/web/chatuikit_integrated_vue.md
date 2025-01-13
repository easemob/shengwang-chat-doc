# Vue 集成单群聊 UIKit

本文介绍如何在 Vue 项目中集成单群聊 UIKit。

## 前提条件

开始前，确保你的开发环境满足如下条件：

- 已安装 [Node.js](https://nodejs.org/)。
- [即时通讯 IM 应用和 appId](/product/enable_and_configure_IM.html#创建应用)。

## 操作步骤

### 第一步 创建一个 Vue 项目

Vue 提供了一个方便的命令行工具快速构建应用程序。确保你的当前工作目录为创建项目的目录。

在命令行中运行以下命令创建项目：

```bash
npm init vue@latest
```

以上命令将引导你完成创建新项目时的选项。下面列出了本教程使用的设置。

```bash
Vue.js - The Progressive JavaScript Framework

✔ Project name: … vue-project
✔ Add TypeScript? … No
✔ Add JSX Support? … Yes
✔ Add Vue Router for Single Page Application development? … Yes
✔ Add Pinia for state management? … No
✔ Add Vitest for Unit Testing? … No
✔ Add an End-to-End Testing Solution? › No
✔ Add ESLint for code quality? … No
✔ Add Vue DevTools 7 extension for debugging? (experimental) … No

```

以开发模式运行：

```bash
cd vue-project
npm install
npm run dev
```

运行成功后打开 "http://localhost:5173/" ，可以看到下图所示界面：

![img](/images/uikit/chatuikit/web/vue_project_create.png)

### 第二步 安装和配置 Veaury

[Veaury ](https://github.com/gloriasoft/veaury#readme)是基于 React 和 Vue 的工具库，主要用于 React 和 Vue 在一个项目中公共使用的场景。Veaury 适用于 Vue 3 和 Vue 2。

1. 可以使用以下命令从 npm 安装 Veaury 库：

```bash
npm i veaury
```

2. 安装 `@vitejs/plugin-react` 插件：

```bash
npm i @vitejs/plugin-react
```

3. 为了使 Vue 应用能够导入和呈现 React 组件，需要更新项目中的 `vite.config.js` 文件以使用 Veaury 插件。

[Veaury 配置参考](https://github.com/gloriasoft/veaury/blob/master/README_zhcn.md#vite)

```javascript
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// >= veaury@2.1.1
import veauryVitePlugins from "veaury/vite/index.js";
// 如果是vite 6, 应该使用 `veaury/vite/esm`
// import veauryVitePlugins from 'veaury/vite/esm'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // 关闭 vue 和 vuejsx 插件
    // vue(),
    // vueJsx(),
    // type 设为 vue 时, 所有名为 `react_app` 目录中的文件的 jsx 将被 react jsx 编译，其他文件里的 jsx 将以 vue jsx 编译。
    veauryVitePlugins({
      type: "vue",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

4. 可将任何 React 组件添加到 `react_app` 目录中，然后将这些 React 组件导入到 `.vue` 文件，并在标准 Vue 组件中呈现。

### 第三步 在 Vue 项目中集成 React 组件

首先，你需要在 `react_app` 中创建一个新的 React 组件。该组件负责导入、配置和渲染 UIKit。

1. 安装 UIKit。

   ```bash
   npm i shengwang-chat-uikit --save;
   ```

2. 创建 `react_app/chat.jsx` 文件，导入 UIKit，使用声网即时通讯 IM 的 appId 和用户信息初始化 UIKit。

<img src="/images/uikit/chatuikit/web/vue_initialization.png" width="500" >

代码如下：

```jsx
// 导入 UIKit 到 react_app/chat.jsx 文件
import { UIKitProvider, Chat, ConversationList } from "shengwang-chat-uikit";
// 引入 UIKit 样式
import "shengwang-chat-uikit/style.css";

const appId = "your appId";
const userId = "userId";
const password = "password";

const ChatApp = (props) => {
  // 父组件传入的 theme 属性
  const { theme } = props;
  return (
    <UIKitProvider
      initConfig={{
        appId,
        userId,
        password,
      }}
      theme={{
        mode: theme,
      }}
    >
      <div className="chat-wrap">
        <div className="conversation-list">
          <ConversationList></ConversationList>
        </div>
        <div className="chat">
          <Chat></Chat>
        </div>
      </div>
    </UIKitProvider>
  );
};

export default ChatApp;
```

### 第四步 将 UIKit 添加到 Vue 页面

将 ChatApp 添加 Vue 页面, 删除当前 `views/HomeView.vue` 中的所有代码并添加下面的代码。

该代码执行以下操作：

1. 导入 Veaury 和 ChatApp 聊天组件。
2. 使用 Veaury 的 `applyPureReactInVue` 函数将我们的 React 组件转换为 Vue 组件。
3. 定义 `theme` 变量，传递给 ChatApp 组件，用于切换 UIKit 的主题。
4. 添加一些样式，美化界面。

```javascript
<script setup>
import { ref } from "vue";
import { applyPureReactInVue } from "veaury";
import ChatApp from "../react_app/chat";
import Logo from "../assets/logo.svg";

const Chat = applyPureReactInVue(ChatApp);

const theme = ref("light");

const switchTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
};
</script>

<template>
  <header>
    <div class="header">
      <img class="logo" :src="Logo" alt="logo" />
      <span class="theme" @click="switchTheme">Switch Theme: {{ theme }}</span>
    </div>
  </header>
  <main>
    <Chat :theme="theme" />
  </main>
</template>

<style>
.chat-wrap {
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  box-sizing: border-box;
}

.conversation-list {
  width: 300px;
  flex-shrink: 0;
}

.chat {
  width: 100%;
}
</style>

<style scoped>
.header {
  display: flex;
  height: 50px;
  font-size: 20px;
  background: #4faeea;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
}

.theme {
  cursor: pointer;
}

.logo {
  width: 45px;
}
</style>

```

删除 `App.vue` 文件 `template` 中的无关代码，仅保留 RouterView，当访问 http://localhost:5173 时，界面如下：

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/web/vue_initial_page.png" title="浅色主题" />
</ImageGallery>

点击右上角的 **Switch Theme** 切换主题：

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/web/vue_switch_theme.png" title="深色主题" />
</ImageGallery>

## 相关参考

- [示例项目源码](https://github.com/shengwang/webim-vue-demo/tree/chat-uikit-vue-demo)
- [组件库源码](https://github.com/shengwang/shengwang-UIKit-web)
- [其他示例 demo](https://github.com/shengwang/shengwang-uikit-react/tree/main/demo)
- [`UIKitProvider` 文档](https://doc.shengwang.com/uikit/chatuikit/web/chatuikit_provider.html)
