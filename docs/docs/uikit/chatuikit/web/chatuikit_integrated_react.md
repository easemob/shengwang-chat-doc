# 集成单群聊 UIKit

<Toc />

使用单群聊 UIKit 之前，你需要将其集成到你的应用中。

## 前提条件

开始前，确保你的开发环境满足如下条件：

- React 16.8.0 或以上版本；
- React DOM 16.8.0 或以上版本；
- [已创建项目并获取 App ID](https://im.shengwang.cn/docs/sdk/web/enable_im.html)。

## 操作步骤

### 第一步 安装单群聊 UIKit

使用 `npm` 或者 `yarn` 安装 `shengwang-chat-uikit`：

```bash
npm i shengwang-chat-uikit --save;
```

### 第二步 引入所需组件

将单群聊 UIKit 组件导入到你的 React 项目中。

```jsx
// 导入组件
import {
  UIKitProvider,
  Chat,
  ConversationList,
  // ...
} from "shengwang-chat-uikit";

// 导入样式
import "shengwang-chat-uikit/style.css";
```

### 第三步 初始化

项目中用到的组件都需要在 `UIKitProvider` 内部使用。使用单群聊 UIKit 时，首先要配置 `UIKitProvider` 参数，示例如下：

若要实现自动登录，初始化时需传入 `userId`、`password` 或 `token`。

在[声网控制台](https://console.shengwang.cn/overview)按照如下步骤创建用户：

1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**运营管理**标签页。

5. 在**用户** 页签下，点击**创建 IM 用户**。

6. 在弹出的对话框中，配置用户相关参数，点击**确定**。

在正式环境中，你需要从你的 App Server 获取用户 token，详见[使用 Token 鉴权](/docs/sdk/server-side/token_authentication.html)。

```jsx
import React from 'react';
import { UIKitProvider } from 'shengwang-chat-uikit';
import 'shengwang-chat-uikit/style.css';
ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <div>
    <UIKitProvider
      initConfig={{
        appId: 'your appId', // 你的 app Id
        userId: 'user ID', // 用户 ID
        token: 'token', // 如果使用 token 登录，传入 token。
        // password: 'password', // 如果使用密码登录，传入密码。
      }}
    />
  </div>
)
```

如要了解更多配置，详见 [`UIKitProvider` 文档](chatuikit_provider.html)。

### 第四步 登录

当 Provider 渲染和销毁时，单群聊 UIKit 内部会自动完成登录登出。

关于自动和手动登录，详见[登录文档](chatuikit_login.html)。

### 第五步 搭建界面

单群聊 UIKit 提供会话列表、聊天、群组设置和通讯录等组件。你可以使用这些组件搭建界面，这些组件支持自定义，具体可以参考相应组件的文档。

单群聊 UIKit 提供的 container 级别组件使用 flex 布局，默认宽高均为 100%，所以需要自己实现布局，然后将组件放在布局的容器组件中。

下面以会话列表和聊天组件组成的界面为例：

```jsx
import React from "react";
import { Chat, MessageList, TextMessage } from "shengwang-chat-uikit";
import "shengwang-chat-uikit/style.css";

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "30%", height: "100%" }}>
        <ConversationList />
      </div>
      <div style={{ width: "70%", height: "100%" }}>
        <Chat />
      </div>
    </div>
  );
};
```

## 相关参考

- [组件库源码](https://github.com/Shengwang-Community/ShengwangChat-UIKit-web)
- [其他示例 demo](https://github.com/Shengwang-Community/ShengwangChat-UIKit-web/tree/main/demo)
