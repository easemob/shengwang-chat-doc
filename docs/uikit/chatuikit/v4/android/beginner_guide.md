# 入门指引

单群聊 UIKit 是基于即时通讯 IM SDK 开发的一款即时通讯 UI 组件库。本文提供从零开始接入单群聊 UIKit 的完整指南。

## 集成流程

<div style="text-align: center">
  <img src="/images/uikit/chatuikit/android/beginner_guide.png" width="350"/>
</div>

## 集成步骤

| 步骤            | 描述 | 
| :-------------- | :----- | 
| [注册账号](https://doc.shengwang.cn/doc/console/general/quickstart#注册账号)         | 使用即时通讯 IM 前，你首先需要在 [声网控制台](https://console.easemob.com/user/login)[注册账号](https://doc.shengwang.cn/doc/console/general/quickstart#注册账号)。<br/>IM 账号是开发者在声网控制台的唯一身份标识，开发者利用账号登录控制台，对应用进行配置和管理。开发者在将自身应用与即时通讯 IM 对接时，需注册 IM 账号与自身应用中的账号映射。 |
| [创建项目](https://doc.shengwang.cn/doc/console/general/quickstart#创建项目)并 [获取 App ID](/product/enable_im.html#_3-获取-app-id) <br/> [ 开通 IM](/product/enable_im.html#_2-开通即时通讯-im-服务)       | 1. 要接入即时通讯 IM 服务，你必须首先在声网控制台 [创建项目](https://doc.shengwang.cn/doc/console/general/quickstart#创建项目)并 [获取 App ID](/product/enable_im.html#_3-获取-app-id)。声网会给每个项目自动分配一个 App ID 作为项目唯一标识。你需要 [获取项目的 App ID](/product/enable_im.html#_3-获取-app-id)，集成 SDK 时传入 App ID。<br/> 2.  [ 开通 IM 服务](/product/enable_im.html#_2-开通即时通讯-im-服务) |
| [创建用户](/document/android/login.html#用户注册) <br/><br/>[实现 Token 鉴权](/document/server-side/token_authentication.html)        | - **创建用户**：你可以 [调用 REST API 创建用户](/document/server-side/account_register_authorized_single.html)，也可以在 [声网控制台](https://console.easemob.com/user/login) 创建用户。详见 [用户注册文档](/document/android/login.html#用户注册)。<br/> - **获取 Token**：在你的应用服务器集成 [Token 鉴权](/document/server-side/token_authentication.html) 实现获取 Token 的业务逻辑，你的应用可以调用自身服务端，从IM 服务器获取 Token。   |
| [添加依赖](chatuikit_dependency.html)  | 将单群聊 UIKit [集成到你的应用](chatuikit_dependency.html) ，可从远程或本地添加依赖。   |
| [初始化](chatuikit_initialization.html) <br/><br/> [登录](chatuikit_quickstart.html#第二步-实现代码逻辑)         | - **初始化**：使用单群聊 UIKit 的各项功能前，必须先初始化。传入你应用的 App ID 进行 [初始化](chatuikit_initialization.html)。初始化时，可配置 `ChatOptions` 中的选项，如自动登录。<br/> - **登录**：使用创建的用户 [登录 IM](/document/android/login.html#登录)。|
| 创建页面      | 登录成功后，你可以 [创建聊天](chatuikit_chat_intro.html#创建聊天页面)、[会话列表](chatuikit_conversation_list_intro.html#创建会话列表页面) 和 [通讯录](chatuikit_contactlist_intro.html#创建通讯录页面) 等页面。 |
| 自定义页面        | 若默认的聊天或会话列表等页面无法满足你的要求，你可以自定义页面，例如，[设置头像或昵称](chatuikit_custom_chat_basic.html#设置头像和昵称) 和 [设置消息气泡](chatuikit_custom_chat_basic.html#设置消息气泡)等。<br/> - [自定义会话列表页面](chatuikit_custom_conversation_list_basic.html)<br/> - [自定义聊天页面](chatuikit_custom_chat_basic.html)<br/> - [自定义通讯录页面](chatuikit_contactlist.html)<br/> - [自定义好友详情页面](chatuikit_custom_contact_details.html)<br/> - [自定义群详情页面](chatuikit_custom_group_details.html)。|
