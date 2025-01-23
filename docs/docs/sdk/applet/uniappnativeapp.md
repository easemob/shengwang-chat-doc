# uni-app 打包原生 app（Android、iOS）方案简介

<Toc />

使用即时通讯 IM 小程序 SDK 在 **`HBuilderX`** 中编译 Android、iOS 应用，可实现一套代码多端同时打包。即时通讯 IM 相关的集成方式同 Web、小程序一样便捷、高效。

## 功能说明

- 支持账户注册登录
- 支持 IM 基本功能收发文本、图片、语音、视频、音频、文件、透传、扩展消息等
- 支持 群组聊天室功能
- 支持个人设置

## 开发者集成

[注册账号并创建项目](enable_im.html)。

### 搭建 app 开发环境

1. [下载 HBuilderx 编辑器](https://www.dcloud.io/hbuilderx.html)。

:::tip
项目中 HBuilderx 目前使用的最新版本，如果此前下载过 HBuilderx，为保证开发环境统一请更新到最新版本。
:::

2. [DCloud 开发者中心注册](https://dev.dcloud.net.cn/)。

登陆 HBuilderx 编辑器，完成搭建 app 的开发环境。

### 将 SDK 添加到自己的小程序

#### 下载 SDK

可以通过以下两种方式获取 SDK：

- 通过 CDN[下载 SDK](https://download.shengwang.cn/sdk/release/shengwang-chat-web-1.3.2.zip)。
- 通过 npm 下载 'shengwang-chat'。

sdk 文件为 miniProgram 文件夹下的 Shengwang-chat.js

#### 引入 SDK

- 开始一个全新的项目：
  1. 将 SDK 目录下（src/sdk/）的文件全部导入到自己的项目中。
  2. 直接使用 import/require 方式获取引用, 如果使用 mpvue 请保持引用文件方式的统一。

#### 调用示例

```javascript
//使用示例
import ChatSDK from "../sdk/Shengwang-chat";
```

#### 实例调用方式

实例化 SDK。

```javascript
//实例化 SDK 对象
const chatClient = new ChatSDK.connection({
  appId: "your appId",
});
```

IM 基本功能，请参考 [消息管理](message_overview.html)。

## 打包发布

1. 原生 App-云打包：HBuilder 编辑器 → 发行 → 原生 App-云打包 （app 图标，启动页等详细配置可在 **`manifest.json`** 进行配置）
2. 原生 App-离线打包：HBuilder 编辑器 → 发行 → 生成本地打包 App 资源 （详细打包方案请看 **`iOS、Android 本地打包指南`**。）

## APP 开发者常见问题（重要）

- App/uni-app 离线本地存储方案：[https://ask.dcloud.net.cn/article/166](https://ask.dcloud.net.cn/article/166)
- uni-app 实现全局变量：[https://ask.dcloud.net.cn/article/35021](https://ask.dcloud.net.cn/article/35021)
- 原生控件层级过高无法覆盖的解决方案：[https://uniapp.dcloud.io/component/native-component](https://uniapp.dcloud.io/component/native-component)
- 导航栏开发指南：[https://ask.dcloud.net.cn/article/34921](https://ask.dcloud.net.cn/article/34921)
- 关于推送：[https://ask.dcloud.net.cn/article/35622](https://ask.dcloud.net.cn/article/35622)
- 更多详情：[https://uniapp.dcloud.io/faq](https://uniapp.dcloud.io/faq)
