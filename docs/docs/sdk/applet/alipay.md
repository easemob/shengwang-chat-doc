# 支付宝小程序集成介绍

<Toc />

### 注册声网账号

开发者需要在[声网控制台](https://console.shengwang.cn/overview)[注册账号](enable_im.html#_1-登录声网控制台)、[创建项目](enable_im.html#_2-开通即时通讯-im-服务)、[获取唯一 App ID](enable_im.html#_3-获取-app-id)，SDK 初始化时需要配置 App ID。

### 搭建支付宝小程序开发环境

首先需要下载并安装 [开发者工具](https://opendocs.alipay.com/mini/ide/download)，然后按照支付宝小程序的 [接入流程](https://opendocs.alipay.com/mini/006kyi) 一步步创建一个小程序。

### 配置服务器域名

小程序在发布前，需要配置合法域名。

登录 [支付宝开放平台](https://open.alipay.com/platform/home.htm), 配置以下服务器域名。

// TODO 更换域名

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
wss://im-api-alipay.easemob.com/websocket
:::

// TODO：目前声网 IM 只有一个数据中心，下面的提示是否要删掉？

声网不同数据中心的 REST API 请求域名、WebSocket 访问域名：

// TODO：替换表格中的地址

| 数据中心    | REST API 请求地址                        | WebSocket 访问域名                                             |
| ----------- | ---------------------------------------- | -------------------------------------------------------------- |
| 国内 1 区   | a1.easemob.com                           | im-api-alipay.easemob.com 或 im-api-alipay.easecdn.com         |
| 国内 2 区   | a31.easemob.com                          | im-api-alipay-31.easemob.com 或 im-api-alipay-31.easecdn.com   |
| 国内 VIP 区 | 请咨询商务经理                           | 请咨询商务经理                                                 |
| 客服专用    | 请咨询商务经理                           | 请咨询商务经理                                                 |
| 新加坡 1 区 | a1-sgp.easemob.com 或 a1-sgp.easecdn.com | im-api-alipay-sgp.easemob.com 或 im-api-alipay-sgp.easecdn.com |
| 新加坡 2 区 | a61.easemob.com 或 a61.easecdn.com       | im-api-alipay-61.easemob.com 或 im-api-alipay-61.easecdn.com   |
| 美东 1 区   | a41.easemob.com 或 a41.easecdn.com       | im-api-alipay-41.easemob.com 或 im-api-alipay-41.easecdn.com   |
| 德国 2 区   | a71.easemob.com 或 a71.easecdn.com       | im-api-alipay-71.easemob.com 或 im-api-alipay-71.easecdn.com   |

关于如何查看应用所在数据中心，详见[数据中心文档](data.center.html#查看数据中心)。

### 说明

支付宝小程序：支付宝小程序在一段时间内只能保留一个 WebSocket 连接，如果当前已存在 WebSocket 连接，那么会自动关闭该连接，并重新创建一个新的 WebSocket 连接。

### 集成 SDK

#### 下载 SDK

可以通过以下两种方式获取 SDK：

// TODO：替换链接

- 通过官网[下载 SDK](https://www.easemob.com/download/im)。
- 从声网的[github 仓库](https://github.com/easemob/webim-weixin-xcx/tree/master/src/sdk) 中获取 SDK 中的文件。

#### 引入 SDK

- 开始一个全新的项目。
  1. 将下载的 SDK（src/sdk/）导入到自己的项目中。 // TODO：括号中的描述对吗？
  2. 引入 SDK：`import ChatSDK from "../sdk/Shengwang-chat-miniProgram";`
- 基于 Demo 二次开发。  // TODO：需要提 Demo 吗？

将下载的代码导入开发者工具即可运行起来。

#### 调用示例

```javascript
//使用示例
import ChatSDK from "../sdk/Shengwang-chat-miniProgram";
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
