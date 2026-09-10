# 入门指引

音视频通话 CallKit 是基于即时通讯 IM 和声网实时音视频 RTC 深度整合开发的实时音视频通话框架，实现了一对一及群组音视频通话功能。本文提供从零开始接入音视频通话 CallKit 的完整指南。

## 集成流程

<div style="text-align: center">
  <img src=/images/callkit/ios/beginner_guide.png   width="350"/>
</div>

## 集成步骤

| 步骤            | 描述 | 
| :-------------- | :----- | 
| [注册账号](https://doc.shengwang.cn/doc/console/general/quickstart#注册账号)         | 使用 CallKit 前，你首先需要在 [声网控制台](https://console.shengwang.cn/overview) [注册账号](https://doc.shengwang.cn/doc/console/general/quickstart#注册账号)。<br/>声网账号是开发者在声网控制台中唯一的身份标识，用于登录控制台并对应用进行配置与管理。当开发者将自身应用与即时通讯 IM 集成时，需要注册 IM 账号，并与自身应用中的账号建立一一映射关系。 |
| [创建项目并开通 IM](/product/enable_im.html#_2-开通即时通讯-im-服务) <br/><br/>[获取 App ID](/product/enable_im.html#_3-获取-app-id)         | 1. 要接入即时通讯 IM 服务，你必须首先在声网控制台 [创建项目并开通 IM](/product/enable_im.html#_2-开通即时通讯-im-服务) 。<br/> 2. 声网会给每个项目自动分配一个 App ID 作为项目唯一标识。你需要 [获取项目的 App ID](/product/enable_im.html#_3-获取-app-id)，集成 SDK 时传入 App ID。  |
| [开通 IM 套餐](/product/product_package_feature.html) <br/><br/> [开通声网 RTC](/callkit/ios/product_overview.html#开通声网-rtc) | 1. 即时通讯 IM 支持免费版、专业版和旗舰版。除了套餐包，你还可以在声网控制台开通和订阅 IM 的增值服务，例如，消息翻译和即时推送。<br/>2. [开通声网 RTC](/callkit/ios/product_overview.html#开通声网-rtc)。|
| [创建用户](/document/ios/login.html#用户注册) <br/><br/>[实现 Token 鉴权](/document/server-side/token_authentication.html)  | - **创建用户**:你可以 [调用 REST API 创建用户](/document/server-side/account_register_authorized_single.html)，也可以在 [声网控制台](https://console.shengwang.cn/overview) 创建用户。详见 [用户注册文档](/document/ios/login.html#用户注册)。<br/> - **获取 Token**：在你的应用服务器集成 [Token 鉴权](/document/server-side/token_authentication.html) 实现获取 Token 的业务逻辑，你的应用可以调用自身服务端，从IM 服务器获取 Token。   |
| [集成 CallKit](integration.html)          | 将 CallKit [集成到你的应用](integration.html)，主要包括以下步骤：<br/> 1. 安装 CallKit<br/> 2. 初始化 CallKit<br/> 3. 配置监听器<br/>4. 登录 IM<br/>5. 发起通话<br/>6. 接通通话<br/>7. 离线推送  |
| [使用 LiveCommunicationKit](livecommunicationkit.html)    | CallKit 中的 `LiveCommunicationManager` 是一个用于管理 iOS VoIP 通话的单例管理器类，集成了 Apple 的 PushKit 和 LiveCommunicationKit 框架，提供完整的 VoIP 通话解决方案，包括来电推送、通话管理和音频会话控制。关于 VoIP 推送以及通话流程和通话管理，详见 [使用 LiveCommunicationManager 介绍](livecommunicationkit.html)。  |
| [使用视频通话画中画](picture_in_picture.html)      | 画中画（Picture-in-Picture，PiP）功能允许用户在视频通话时，将通话界面最小化为悬浮窗口，同时使用其他应用。使用前，你需要开启画中画功能，申请摄像头后台权限。CallKit 中提供 [一对一视频通话 PiP](picture_in_picture.html#一对一视频通话-pip)。关于群组视频通话 PiP，详见 [实现方案](picture_in_picture.html#群组视频通话-pip-实现方案)。  |
| [自定义资源](customization.html)       | 你可以修改 UI 配置项、修改原有资源和修改业务可配项。|

