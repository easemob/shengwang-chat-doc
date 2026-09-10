# 小程序集成指南

本文介绍如何将即时通讯 IM SDK 集成到微信、QQ、百度、抖音和支付宝小程序。各平台的集成流程基本一致，主要差异集中在开发工具、服务器域名配置入口、WebSocket 地址和连接限制。

当前 SDK 支持微信、QQ、百度、抖音、支付宝等小程序运行环境。各平台的集成流程基本一致，主要差异集中在开发者工具、服务器合法域名配置入口、WebSocket 地址选择和平台连接限制。

## 步骤 1：注册 IM 账号

在声网控制台完成以下操作：

1. [注册 IM 账号](https://doc.shengwang.cn/doc/console/general/quickstart#注册账号)。
2. [创建项目并开通 IM](/product/enable_im.html#_2-开通即时通讯-im-服务) 。
3. [获取项目的 App ID](/product/enable_im.html#_3-获取-app-id)。初始化 SDK 时需要配置该 App ID。

## 步骤 2：搭建小程序开发环境

根据目标平台下载对应的开发者工具，并按照平台接入流程创建小程序。

| 平台 | 开发者工具 | 接入流程 |
| :--- | :--- | :--- |
| 微信 | [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html) | [微信小程序快速开始](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/getstart.html#申请帐号) |
| QQ | [QQ 小程序开发者工具](https://q.qq.com/wiki/tools/devtool/) | [QQ 小程序接入流程](https://q.qq.com/wiki/#_2-注册开发者平台) |
| 百度 | [百度开发者工具](https://smartprogram.baidu.com/docs/introduction/tool/) | [百度智能小程序开发教程](https://smartprogram.baidu.com/docs/develop/tutorial/startdevelop/) |
| 抖音 | [抖音开发者工具](https://microapp.bytedance.com/docs/zh-CN/mini-app/develop/developer-instrument/developer-instrument-update-and-download/) | [抖音小程序接入流程](https://microapp.bytedance.com/docs/zh-CN/mini-app/develop/guide/start/kick-off) |
| 支付宝 | [支付宝开发者工具](https://opendocs.alipay.com/mini/ide/download) | [支付宝小程序接入流程](https://opendocs.alipay.com/mini/006kyi) |

:::tip
百度小程序的注册主体不能为个人，必须使用企业、媒体、政府等主体。
:::

## 步骤 3：配置服务器域名

小程序发布前，需在对应平台后台配置合法域名。请先在声网控制台的 **即时通讯 IM** > **功能配置** > **基础信息** 页面确认应用所在数据中心，再选择相应的 REST API 和 WebSocket 地址。

![应用所在数据中心](/images/applet/service_overview.png)

:::tip
文件下载相关域名需按数据中心进行配置：国内 1 区配置 `https://a1-chatfile.easemob.com`，国内 2 区配置 `ngi-chatfile.easemob.com`。<br/>实际需要配置的 `request`、`uploadFile`、`downloadFile` 以及 WebSocket 合法域名，应以应用所在数据中心和服务端实际下发的服务地址为准。若小程序使用文件消息、图片消息、语音消息或视频消息，需确保相关上传、下载域名已在小程序后台完成配置。
:::

### 在平台后台配置域名

| 平台 | 配置平台 | 配置入口 | WebSocket 选择 |
| :--- | :--- | :--- | :--- |
| 微信 | [微信公众平台](https://mp.weixin.qq.com/) | **开发 > 开发设置** | 使用表中“微信、QQ、百度和抖音”地址 |
| QQ | [QQ 小程序开发者平台](https://q.qq.com/) | **开发 > 开发设置** | 使用表中“微信、QQ、百度和抖音”地址 |
| 百度 | [百度智能小程序官网](https://smartprogram.baidu.com/) | 小程序的开发设置页面 | 使用表中“微信、QQ、百度和抖音”地址 |
| 抖音 | [抖音小程序开发者平台](https://microapp.bytedance.com/) | 选择小程序，进入 **开发管理 > 开发设置** | 使用表中“微信、QQ、百度和抖音”地址 |
| 支付宝 | [支付宝开放平台](https://open.alipay.com/platform/home.htm) | 选择小程序并进入服务器域名配置 | 使用表中“支付宝”地址 |

在平台后台按需配置 request、uploadFile、downloadFile 和 WebSocket（或 socket）合法域名。不要将地址末尾重复写成 `/websocket/websocket`。

## 步骤 4：下载 SDK

可以通过以下任一方式获取 SDK：

- 通过声网文档站 [下载 SDK](https://im.shengwang.cn/)。
- 从 [GitHub 仓库](https://github.com/easemob/webim-weixin-xcx/tree/master/src/sdk) 获取 SDK 文件。
- 从 [Gitee 仓库](https://gitee.com/easemob-code/webim-weixin-xcx/tree/master/src/sdk) 获取 SDK 文件。

## 步骤 5：引入 SDK

### 新项目

1. 将下载的 `src/sdk/` 目录导入项目。
2. 根据实际下载的 SDK 文件名调整 import 路径。例如：

```javascript
import EasemobChat from "../sdk/Easemob-chat-4.x.x.js"; // 4.0 版本 SDK
```

### 基于 Demo 二次开发

下载 Demo 代码后，将项目导入对应平台的开发者工具并运行。

## 步骤 6：实例化 SDK

实例化 SDK，并根据项目需要挂载到平台的全局对象下。

```javascript
// platformGlobal 表示当前小程序平台的全局对象。
// 请根据 SDK 适配方式替换为项目实际使用的对象。
const WebIM = (platformGlobal.WebIM = EasemobChat);

WebIM.conn = new WebIM.connection({
  appId: "your appId",
  url: "your WebSocket URL",
  apiUrl: "your REST API URL",
  useOwnUploadFun: false,
  isHttpDNS: false,
});
```

参数说明：

| 参数 | 说明 |
| --- | --- |
| `appId` | 在声网控制台获取的 App ID。 |
| `url` | 应用所在数据中心对应的 WebSocket 地址；支付宝使用支付宝专用地址。 |
| `apiUrl` | 应用所在数据中心对应的 REST API 地址。 |
| `useOwnUploadFun` | 是否使用自定义上传方式。设置为 `true` 时，构建消息时只传已上传文件的 URL。 |
| `isHttpDNS` | 小程序环境中设置为 `false`。 |

## 平台限制与注意事项

以下限制整理自现有平台文档。请结合当前小程序基础库版本进行验证。

### 微信小程序

微信小程序 1.7.0 及以上版本最多可以同时存在 5 个 WebSocket 连接。开发者需要控制连接数量，超出限制时 SDK 将无法连接服务器。

### QQ 小程序

QQ 小程序 1.7.0 及以上版本最多可以同时存在 5 个 WebSocket 连接。开发者需要控制连接数量，超出限制时 SDK 将无法连接服务器。

### 百度小程序

百度小程序 1.9.4 及以上版本支持多个 WebSocket 连接，每次成功调用会返回新的 SocketTask。

### 抖音小程序

抖音小程序 1.0.0 及以上版本中，如果当前页面已经存在 WebSocket 连接，再创建连接时会建立新连接，但此前创建的连接不会自动关闭。应用需要自行管理连接生命周期。

### 支付宝小程序

支付宝小程序在一段时间内只能保留一个 WebSocket 连接。如果已经存在连接，再创建连接时会自动关闭原连接并建立新连接。

## 后续步骤

小程序端的基本 IM 功能与 Web 端基本一致。完成 SDK 初始化后，可参考 [Web 端文档](/document/web/user_relationship.html) 继续集成用户关系等功能。

