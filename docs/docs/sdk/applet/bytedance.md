# 抖音小程序集成介绍

<Toc />

### 注册声网账号

开发者需要在[声网控制台](https://console.shengwang.cn/overview)[注册账号](enable_im.html#_1-登录声网控制台)、[创建项目](enable_im.html#_2-开通即时通讯-im-服务)、[获取唯一 App ID](enable_im.html#_3-获取-app-id)，SDK 初始化时需要配置 App ID。

### 搭建抖音小程序开发环境

首先需要下载并安装 [开发者工具](https://microapp.bytedance.com/docs/zh-CN/mini-app/develop/developer-instrument/developer-instrument-update-and-download/)，然后按照抖音小程序的 [接入流程](https://microapp.bytedance.com/docs/zh-CN/mini-app/develop/guide/start/kick-off) 一步步创建一个小程序

### 配置服务器域名

小程序在发布前，需要配置合法域名。

登录抖音小程序 [开发者平台](https://microapp.bytedance.com/)，选择当前小程序（如果没有需要创建一个小程序），进入 **开发管理** > **开发设置** 页面配置以下服务器地址。

:::tip
request 合法域名：

1. https://c1.chat.rtnsvc.com
2. https://c1.chat.realtimemesh.com
3. https://rs.chat.rtnsvc.com
4. https://rs.chat.realtimemesh.com
   :::

:::tip
socket 合法域名：
wss://im-api-wechat-c1.chat.rtnsvc.com
wss://im-api-wechat-c1.chat.realtimemesh.com
:::

:::tip
uploadFile, downloadFile 合法域名：

1. https://c1.chat.rtnsvc.com
2. https://c1.chat.realtimemesh.com
3. https://c1-chatfile.chat.rtnsvc.com
   :::

### 集成 SDK

#### 下载 SDK

可以通过以下两种方式获取 SDK：

- 通过 CDN[下载 SDK](https://download.shengwang.cn/sdk/release/shengwang-chat-web-1.3.2.zip)。
- 通过 npm 下载 'shengwang-chat'。

sdk 文件为 miniProgram 文件夹下的 Shengwang-chat.js

#### 引入 SDK

- 开始一个全新的项目。
  1. 将下载的 SDK 导入到自己的项目中。
  2. 引入 SDK：`import ChatSDK from "./Shengwang-chat";`

将下载的代码导入开发者工具即可运行起来。

#### 调用示例

```javascript
//使用示例
import ChatSDK from "./Shengwang-chat";
```

#### 实例调用方式

实例化 SDK，并挂载在全局对象下。

```javascript
//实例化 SDK 对象
const chatClient = new ChatSDK.connection({
  appId: "your appId",
});
```

IM 基本功能和 Web 端一致，请参考 Web 端文档。
