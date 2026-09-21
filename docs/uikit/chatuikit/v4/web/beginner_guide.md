# 入门指引

单群聊 UIKit 是基于即时通讯 IM SDK 开发的一款即时通讯 UI 组件库。本文提供从零开始接入单群聊 UIKit 的完整指南。

## 集成流程

<div style="text-align: center">
  <img src="/images/uikit/chatuikit/web/beginner_guide.png" width="350"/>
</div>

## 集成步骤

| 步骤            | 描述 | 
| :-------------- | :----- | 
| [注册账号](https://doc.shengwang.cn/doc/console/general/quickstart#注册账号)         | 使用即时通讯 IM 前，你首先需要在 [声网控制台](https://console.shengwang.cn/overview) 。<br/>IM 账号是开发者在声网控制台的唯一身份标识，开发者利用账号登录控制台，对应用进行配置和管理。开发者在将自身应用与即时通讯 IM 对接时，需注册 IM 账号与自身应用中的账号映射。 |
| [创建项目并开通 IM](/product/enable_im.html#_2-开通即时通讯-im-服务) <br/><br/>[获取 App ID](/product/enable_im.html#_3-获取-app-id)         | 1. 要接入即时通讯 IM 服务，你必须首先在声网控制台 [创建项目并开通 IM](/product/enable_im.html#_2-开通即时通讯-im-服务) 。<br/> 2. 声网会给每个项目自动分配一个 App ID 作为项目唯一标识。你需要 [获取项目的 App ID](/product/enable_im.html#_3-获取-app-id)，集成 SDK 时传入 App ID。  |
| [创建用户](/document/android/login.html#用户注册) <br/><br/>[实现 Token 鉴权](/document/server-side/token_authentication.html)        | - **创建用户**：你可以 [调用 REST API 创建用户](/document/server-side/account_register_authorized_single.html)，也可以在 [声网控制台](https://console.easemob.com/user/login) 创建用户。详见 [用户注册文档](/document/android/login.html#用户注册)。<br/> - **获取 Token**：在你的应用服务器集成 [Token 鉴权](/document/server-side/token_authentication.html) 实现获取 Token 的业务逻辑，你的应用可以调用自身服务端，从IM 服务器获取 Token。   |
| 集成 UIKit  | 将单群聊 UIKit 集成到你的应用：<br/> - [React 集成单群聊 UIKit](chatuikit_integrated_react.html)<br/> -  [ 集成单群聊 UIKit](chatuikit_integrated_vue.html)  |
| 自定义页面        | 若默认的聊天或会话列表等页面无法满足你的要求，你可以自定义页面，例如，[设置会话头像](chatuikit_custom_conversation_list_advanced.html#设置会话头像) 和 [设置消息气泡样式](chatuikit_custom_chat.html#设置消息气泡)等。<br/> - [自定义会话列表页面](chatuikit_custom_conversation_list_basic.html)<br/> - [自定义聊天页面](chatuikit_custom_chat.html)<br/> - [自定义通讯录页面](chatuikit_contactlist.html)|
| [音视频通话](chatuikit_video.html)        | 单群聊 UIKit 内部集成了声网音视频 SDK，可以实现在单聊或群组会话中使用音视频通话。|
