# 集成 SDK

本文介绍如何将环信即时通讯 IM SDK 集成到你的 Web 项目。

## 开发环境要求

- 支持的浏览器:
  - Chrome 54+
  - Firefox 10+
  - Safari 6+

## 安装

### 使用 npm 安装

```bash
npm install easemob-websdk
```

## 引入 SDK

### js 引入 SDK

对于 JavaScript SDK，导入代码如下：

```javascript
import ChatSDK from "easemob-websdk";
```

### Ts 引入 SDK

对于 TypeScript SDK，导入代码如下, EasemobChat 是 SDK 类型的命名空间。

```typescript
import ChatSDK, { EasemobChat } from "easemob-websdk";
```

### 按需导入 SDK 模块

SDK 提供了灵活的模块化设计，允许开发者根据需求引入功能模块，并将其注册到 miniCore 中使用。

miniCore 是一个基座，支持登录登出和发送消息等基础功能，而且包含消息对象。因此，若只使用收发消息功能，则只需引入 miniCore。若使用其他功能，miniCore 支持使用插件的方式引入其他功能模块。按需引入模块的方式实现了不同模块的灵活组合，从而避免不必要的代码加载，减小了应用程序的体积。

tip:
只有按需导入 SDK 的方式才支持本地会话管理功能。
小程序 uniapp 不支持使用 miniCore 的集成方式。

```javascript
import MiniCore from "easemob-websdk/miniCore/miniCore";
import * as contactPlugin from "easemob-websdk/contact/contact";
```

支持按需导入的 SDK 模块

| 模块名称 | 导入文件 | 使用方式 |
| -------- | -------- | -------- |
| 联系人和消息管理 | import * as contactPlugin from "easemob-websdk/contact/contact"; | miniCore.usePlugin(contactPlugin, "contact") |
| 群组 | import * as groupPlugin from "easemob-websdk/group/group"; | miniCore.usePlugin(groupPlugin, "group") |
| 聊天室 | import * as chatroomPlugin from "easemob-websdk/chatroom/chatroom"; | miniCore.usePlugin(chatroomPlugin, "chatroom") |
| 子区 | 	import * as threadPlugin from "easemob-websdk/thread/thread"; | miniCore.usePlugin(threadPlugin, "thread"); |
| 翻译 | import * as translationPlugin from "easemob-websdk/translation/translation";| miniCore.usePlugin(translationPlugin, "translation"); |
| 在线状态订阅 | import * as presencePlugin from "easemob-websdk/presence/presence"; | miniCore.usePlugin(presencePlugin, "presence"); |
| 会话免打扰 | import * as silentPlugin from "easemob-websdk/silent/silent";| miniCore.usePlugin(silentPlugin, "silent");
 |


###  注册模块到 miniCore

```javascript
const miniCore = new MiniCore({
  appKey: "your appKey",
});

// "contact" 为固定值
miniCore.usePlugin(contactPlugin, "contact");
```

### 使用注册的模块

```javascript
// 获取联系人列表
miniCore.contact.getContacts();

// 登录
miniCore.open({
  username: "username",
  password: "password",
  // accessToken: 'token'
});

// 登出
miniCore.close();

// 监听事件
miniCore.addEventHandler("handlerId", {
  onTextMessage: (message) => {
    console.log(message);
  },
});

//发送文本消息
const sendTextMsg = () => {
  const option: EasemobChat.CreateTextMsgParameters = {
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


