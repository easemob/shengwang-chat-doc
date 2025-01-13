# 即时通讯 RESTful API 概览

<Toc />

即时通讯 IM 通过 RESTful 平台提供 RESTful API，你可以通过你的业务服务器向声网 RESTful 服务器发送 HTTP 请求，在服务端实现实时通信。

## 前提条件

要调用即时通讯 RESTful API，请确保满足以下要求：

- 已在[声网控制台](https://console.shengwang.cn/overview) [开通配置声网即时通讯 IM 服务](enable_im.html)。
- 已从服务端获取 app token，详见 [使用 Token 鉴权](token_authentication.html)。

## 请求结构

### 认证方式

即时通讯 IM RESTful API 要求 Bearer HTTP 认证。每次发送 HTTP 请求时，都必须在请求头部填入如下 `Authorization` 字段：

`Authorization: Bearer YourAppToken`

为提高项目的安全性，声网使用 Token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 RESTful API 推荐使用 app token 的 鉴权方式，详见 [使用 Token 鉴权](token_authentication.html)。

## 请求域名

声网不同数据中心的 RESTful API 请求域名 {host}：

1. 登录[声网控制台](https://console.shengwang.cn/overview)。

2. 在左上角下拉框中选择想要开通消息回调服务的项目，然后点击左侧导航栏的**全部产品**，点击**基础能力**分组下的**即时通讯 IM**，进入**功能配置**标签页。

你可以在 **基础信息**页面的**访问域名**区域看到 RESTful API 的请求域名，如下图所示：

// TODO：替换下图

![img](/images/applet/service_overview.png)

### 通信协议

声网即时通讯 RESTful API 支持 HTTP 和 HTTPS 协议。

### 数据格式

- 请求：请求的格式详见具体 API 中的示例。
- 响应：响应内容的格式为 JSON。

所有的请求 URL 和请求包体内容都是区分大小写的。

## RESTful API 概览

关于各 RESTful API 的方法、接口 URL、简要介绍以及调用频率上限，详见 [RESTful API 调用频率限制](limitationapi.html)。