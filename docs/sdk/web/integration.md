# 集成 SDK

本文介绍如何将即时通讯 IM SDK 集成到你的 Web 项目。

## 开发环境要求

- 支持的浏览器:
  - Chrome 54+
  - Firefox 10+
  - Safari 6+

## 1. 使用 npm 安装 SDK

```bash
npm install shengwang-chat
```

## 2. 引入 SDK

你可以通过以下方式引入 SDK，**推荐按需导入 SDK 文件，从而减少 SDK 体积**。

### （推荐）按需导入 SDK

SDK 提供了灵活的模块化设计，允许开发者根据需求引入功能模块，并将其注册到 miniCore 中使用。

miniCore 是一个基座，支持登录登出和发送消息等[基础功能](https://im.shengwang.cn/sdkdocs/chat1.x/web/classes/Connection.Connection-1.html)，而且包含消息对象。因此，若只使用收发消息功能，则只需引入 miniCore。若使用其他功能，miniCore 支持使用插件的方式引入其他功能模块。按需引入模块的方式实现了不同模块的灵活组合，从而避免不必要的代码加载，减小了应用程序的体积。

:::tip

只有按需导入 SDK 的方式才支持[本地会话管理功能](conversation_local.html)。
:::

#### 支持按需导入的 SDK 模块

| 功能             | 导入文件                                                                      | 使用方式                                              |
| :--------------- | :---------------------------------------------------------------------------- | :---------------------------------------------------- |
| 联系人和消息管理 | import \* as contactPlugin from "shengwang-chat/contact/contact";             | miniCore.usePlugin(contactPlugin, "contact");         |
| 群组             | import \* as groupPlugin from "shengwang-chat/group/group";                   | miniCore.usePlugin(groupPlugin, "group");             |
| 聊天室           | import \* as chatroomPlugin from "shengwang-chat/chatroom/chatroom";          | miniCore.usePlugin(chatroomPlugin, "chatroom");       |
| 子区             | import \* as threadPlugin from "shengwang-chat/thread/thread";                | miniCore.usePlugin(threadPlugin, "thread");           |
| 翻译             | import \* as translationPlugin from "shengwang-chat/translation/translation"; | miniCore.usePlugin(translationPlugin, "translation"); |
| 在线状态订阅     | import \* as presencePlugin from "shengwang-chat/presence/presence";          | miniCore.usePlugin(presencePlugin, "presence");       |
| 会话免打扰       | import \* as silentPlugin from "shengwang-chat/silent/silent";                | miniCore.usePlugin(silentPlugin, "silent");           |

#### 按需导入 SDK 模块

##### 1. 安装 SDK

首先，通过 npm、yarn 或者其他包管理工具进行安装 SDK。

```bash
# npm
npm install shengwang-chat

# yarn
yarn add shengwang-chat
```

##### 2. 引入 SDK 和所需模块

根据项目需求引入相应的功能模块。例如，引入用户关系模块：

```javascript
import MiniCore from "shengwang-chat/miniCore/miniCore";
import * as contactPlugin from "shengwang-chat/contact/contact";
```

##### 3. 注册模块到 miniCore

将引入的功能模块注册到 miniCore 中：

```javascript
const miniCore = new MiniCore({
  appId: "your appId",
});

// "contact" 为固定值
miniCore.usePlugin(contactPlugin, "contact");
```

##### 4. 使用注册的模块

注册所需模块后，即可在项目中使用这些模块提供的功能：

```javascript
// 获取联系人列表
miniCore.contact.getContacts();
```

#### 与整体导入的接口差别

通过按需导入的 SDK 与通过 [JavaScript](#引入-javascript-sdk)和 [TavaScript](#引入-typescript-sdk)导入的 SDK 在接口使用方面类似，唯一差别是后者将所有方法都挂载到 `connection` 类, 而使用 miniCore 时，基础的登录登出方法挂载在 miniCore 上，其他功能模块上的方法挂载在相应的模块上。本节以登录/登出、事件监听和发送消息为例进行说明。

- 登录与登出

示例代码如下：

```javascript
// 登录
miniCore.open({
  username: "username",
  accessToken: "token",
});

// 登出
miniCore.close();
```

- 事件监听

示例代码如下：

```javascript
miniCore.addEventHandler("handlerId", {
  onTextMessage: (message) => {
    console.log(message);
  },
});
```

- 发送消息

示例代码如下：

```javascript
import { ShengwangChat } from "shengwang-chat";
//发送文本消息
const sendTextMsg = () => {
  const option: ShengwangChat.CreateTextMsgParameters = {
    chatType: "singleChat",
    type: "txt",
    to: "to",
    msg: "hello",
  };
  const msg = miniCore.Message.create(option);
  miniCore
    .send(msg)
    .then((res: any) => {
      console.log("发送成功", res, msg);
    })
    .catch((err: any) => {
      console.log("发送失败", err);
    });
};
```

### 引入 JavaScript SDK

```javascript
import ChatSDK from "shengwang-chat";
```

### 引入 TypeScript SDK

在下面的导入代码中，`ShengwangChat` 是 SDK 类型的命名空间。

```typescript
import ChatSDK, { ShengwangChat } from "shengwang-chat";
```

### 从官网获取并导入 SDK

1. 下载 [ShengwangChat Chat SDK for Web](https://download.shengwang.cn/sdk/release/shengwang-chat-web-1.3.2.zip)。将 Web SDK 中的 `Shengwang-chat.js` 文件保存到你的项目下。

2. 在 `index.html` 文件中，对 `index.js` 文件进行引用。

```javascript
<script src="path to the JS file"></script>
```

### Nuxt 或 Next 项目中引入 SDK

对于服务端渲染框架, 如 Nuxt、Next 等，需要在客户端渲染阶段引入 SDK。

1. Nuxt 项目, 你可以在 mounted 生命周期动态导入 SDK：

```javascript
export default {
  mounted: () => {
    import("shengwang-chat").then((res) => {
      const ChatSDK = res.default;
      const chatClient = new ChatSDK.connection({
        appId: "your appId",
      });
    });
  },
};
```

2. 对于 Next 项目, 要使用客户端组件，你可以在文件顶部的导入上方添加 `use client` 指令。

```typescript
"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    import("shengwang-chat").then((res) => {
      const ChatSDK = res.default;
      const conn = new ChatSDK.connection({
        appId: "your appId",
      });
    });
  }, []);
}
```
