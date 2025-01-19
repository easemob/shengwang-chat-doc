# QQ 小程序集成介绍

<Toc />

## 前提条件

### 注册声网账号

开发者需要在[声网控制台](https://console.shengwang.cn/overview)[注册账号](enable_im.html#_1-登录声网控制台)、[创建项目](enable_im.html#_2-开通即时通讯-im-服务)、[获取唯一 App ID](enable_im.html#_3-获取-app-id)，SDK 初始化时需要配置 App ID。

## 实现步骤

### 搭建 QQ 小程序开发环境

首先需要下载并安装 [开发者工具](https://q.qq.com/wiki/tools/devtool/)，然后按照 QQ 小程序的 [接入流程](https://q.qq.com/wiki/#_2-注册开发者平台) 一步步创建一个小程序。

### 配置服务器域名

小程序在发布前，需要配置合法域名。

登录 QQ 小程序 [开发者平台](https://q.qq.com/)，进入 **开发** > **开发设置** 页面配置以下服务器地址。

:::tip
request 合法域名：

1. https://a1.easemob.com
2. https://a2.easemob.com
3. https://a3.easemob.com
4. https://a4.easemob.com
5. https://a5.easemob.com
6. https://rs.chat.agora.io
7. https://rs.easemob.com
   :::

:::tip
socket 合法域名：
wss://im-api-wechat.easemob.com
:::

:::tip
为满足不同客户的业务需求，声网在多地部署了数据中心。不同数据中心的 REST API 请求域名、WebSocket 访问域名不同。请根据您所在数据中心进行配置。
:::

声网不同数据中心的 REST API 请求域名、WebSocket 访问域名：

| 数据中心    | REST API 请求地址                        | WebSocket 访问域名                                             |
| ----------- | ---------------------------------------- | -------------------------------------------------------------- |
| 国内 1 区   | a1.easemob.com                           | im-api-wechat.easemob.com 或 im-api-wechat.easecdn.com         |
| 国内 2 区   | a31.easemob.com                          | im-api-wechat-31.easemob.com 或 im-api-wechat-31.easecdn.com   |
| 国内 VIP 区 | 请咨询商务经理                           | 请咨询商务经理                                                 |
| 客服专用    | 请咨询商务经理                           | 请咨询商务经理                                                 |
| 新加坡 1 区 | a1-sgp.easemob.com 或 a1-sgp.easecdn.com | im-api-wechat-sgp.easemob.com 或 im-api-wechat-sgp.easecdn.com |
| 新加坡 2 区 | a61.easemob.com 或 a61.easecdn.com       | im-api-wechat-61.easemob.com 或 im-api-wechat-61.easecdn.com   |
| 美东 1 区   | a41.easemob.com 或 a41.easecdn.com       | im-api-wechat-41.easemob.com 或 im-api-wechat-41.easecdn.com   |
| 德国 2 区   | a71.easemob.com 或 a71.easecdn.com       | im-api-wechat-71.easemob.com 或 im-api-wechat-71.easecdn.com   |

关于如何查看应用所在数据中心，详见[数据中心文档](data.center.html#查看数据中心)。

### 说明

// TODO：版本号对吗？

QQ、微信小程序： 1.7.0 及以上版本，最多可以同时存在 5 个 WebSocket 连接，需开发者控制好连接数量，超出此限制 SDK 将不能连接上服务器。

### 集成 SDK

#### 下载 SDK

可以通过以下两种方式获取 SDK：

// TODO：替换链接
- 通过官网 [下载 SDK](https://www.easemob.com/download/im)
- 从声网的 [github 仓库](https://github.com/easemob/webim-weixin-xcx/tree/master/src/sdk) 中获取 SDK 中的文件

#### 引入 SDK

- 开始一个全新的项目
  1. 将下载的 SDK（src/sdk/）导入到自己的项目中。
  2. 引入 SDK：`import ChatSDK from "../sdk/Shengwang-chat-miniProgram";`
- 基于 Demo 二次开发

将下载的代码导入开发者工具即可运行起来。

#### 调用示例

```javascript
// 使用示例
import ChatSDK from "../sdk/Shengwang-chat-miniProgram";
```

#### 实例调用方式

```javascript
// 实例化 SDK 对象
const chatClient = new ChatSDK.connection({
  appId: "your appId",
});
```

IM 基本功能和 Web 端一致，请参考 Web 端文档。
