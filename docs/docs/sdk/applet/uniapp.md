# Uniapp 全平台方案简介

<Toc />

即时通讯 IM 小程序 SDK 为各端小程序开发提供一套完整的技术解决方案，在各端小程序的开发环境下，集成即时通讯 IM 相关的功能更加便捷、高效。让你的小程序快速获得安全稳定的 IM 能力，集成简单，使用方便，帮助你快速拓展业务，赢得先机。

:::tip

- uniapp SDK 目前支持微信、支付宝、QQ、百度小程序、抖音（请使用低于 1.70.0 以下的版本基础库）、uni-app 编译的 原生 Android 以及 iOS。
  :::

## 功能说明

- 支持账户注册登录
- 支持 IM 基本功能收发文本、图片、语音、视频、音频、文件、透传、扩展消息等
- 支持 群组聊天室功能
- 支持个人设置
- 支持发送语音功能

## 开发者集成

### 集成前准备

[注册账号并创建项目](enable_im.html)。

### 搭建开发环境

1. [下载 HBuilderx 编辑器](https://www.dcloud.io/hbuilderx.html)。
2. [DCloud 开发者中心注册](https://dev.dcloud.net.cn/)。

之后登录 HBuilderx 编辑器，小程序的开发环境准备完毕。

即将开发的平台配置服务

### 配置服务器域名（以微信为例）

登录 [微信公众平台](https://mp.weixin.qq.com/)，进入 **开发 > 开发设置** 页面，配置以下服务器地址（其他平台小程序配置与微信一致）：

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

### 各端小程序 WebSocket 连接数量

- QQ、微信小程序： `**1.7.0**` 及以上版本，最多可以同时存在 **5** 个 WebSocket 连接
- 字节小程序： `**1.0.0**` 及以上版本 （在当前小程序页面已经有一个 WebSocket 连接的情况下，如果再创建一个 WebSocket 连接，会重新创建一个 WebSocket 连接，但是之前创建的 WebSocket 连接并不会自动关闭。）
- 百度小程序：`**1.9.4**` 及以上版本，支持存在多个 WebSokcet 连接，每次成功调用会返回一个新的 SocketTask
- 支付宝小程序：支付宝小程序在一段时间内只能保留一个 WebSocket 连接，如果当前已存在 WebSocket 连接，那么会自动关闭该连接，并重新创建一个新的 WebSocket 连接。

### 将 SDK 添加到自己的小程序

#### 下载 SDK

可以通过以下方式获取 SDK：

- 从 npm [shengwang-chat](https://www.npmjs.com/package/shengwang-chat/) 中获取。

#### 引入 SDK

- 开始一个全新的项目：
  1. 安装 `shengwang-chat` npm 包。
  2. 直接使用 `import/require` 方式获取引用，如果使用 mpvue 保持引文件方式的统一。

拉取代码，HBuilder 运行。

#### 调用示例

若项目之前未使用 npm 管理依赖（项目根目录下无 `package.json` 文件），先在项目根目录执行命令初始化 npm 工程：

```bash
npm init -y
```

在项目根目录执行命令安装 npm 包：

```bash
npm i shengwang-chat
```

引入 uniApp SDK：

```javascript
import ChatSDK from "shengwang-chat/uniApp/Shengwang-chat";
```

#### 实例调用方式

实例化 SDK。

```javascript
// 实例化 SDK 对象
const chatClient = new ChatSDK.connection({
  appId: "your appId",
});
```
