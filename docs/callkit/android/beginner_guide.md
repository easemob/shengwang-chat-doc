# 入门指引

音视频通话 CallKit 是基于即时通讯 IM 和声网实时音视频 RTC 深度整合开发的实时音视频通话框架，实现了一对一及群组音视频通话功能。本文提供从零开始接入音视频通话 CallKit 的完整指南。

## 集成流程

<div style="text-align: center">
  <img src=/images/callkit/android/beginner_guide.png width="350"/>
</div>

## 集成步骤

| 步骤            | 描述 | 
| :-------------- | :----- | 
| [注册账号](https://doc.shengwang.cn/doc/console/general/quickstart#注册账号)         | 使用 CallKit 前，你首先需要在 [声网控制台](https://console.shengwang.cn/overview) [注册账号](https://doc.shengwang.cn/doc/console/general/quickstart#注册账号)。<br/>声网账号是开发者在声网控制台中唯一的身份标识，用于登录控制台并对应用进行配置与管理。当开发者将自身应用与即时通讯 IM 集成时，需要注册 IM 账号，并与自身应用中的账号建立一一映射关系。 |
| [创建项目并开通 IM](/product/enable_im.html#_2-开通即时通讯-im-服务) <br/><br/>[获取 App ID](/product/enable_im.html#_3-获取-app-id)         | 1. 要接入即时通讯 IM 服务，你必须首先在声网控制台 [创建项目并开通 IM](/product/enable_im.html#_2-开通即时通讯-im-服务) 。<br/> 2. 声网会给每个项目自动分配一个 App ID 作为项目唯一标识。你需要 [获取项目的 App ID](/product/enable_im.html#_3-获取-app-id)，集成 SDK 时传入 App ID。  |
| [开通 IM 套餐](/product/product_package_feature.html) <br/><br/> [开通声网 RTC](/callkit/android/product_overview.html#开通声网-rtc)        | 1. 即时通讯 IM 支持免费版、专业版和旗舰版。除了套餐包，你还可以在 [声网控制台](https://console.shengwang.cn/overview) 开通和订阅 IM 的增值服务，例如，消息翻译和即时推送。<br/>2. [开通声网 RTC](/callkit/android/product_overview.html#开通声网-rtc)。|
| [创建用户](/document/android/login.html#用户注册) <br/><br/>[实现 Token 鉴权](/document/server-side/token_authentication.html)        | - **创建用户**：你可以 [调用 REST API 创建用户](/document/server-side/account_register_authorized_single.html)，也可以在 [声网控制台](https://console.easemob.com/user/login) 创建用户。详见 [用户注册文档](/document/android/login.html#用户注册)。<br/> - **获取 Token**：在你的应用服务器集成 [Token 鉴权](/document/server-side/token_authentication.html) 实现获取 Token 的业务逻辑，你的应用可以调用自身服务端，从IM 服务器获取 Token。   |
| [集成 CallKit](integration.html)         | 将 CallKit [集成到你的应用](integration.html)，主要包括以下步骤：<br/> 1. 添加依赖<br/> 2. 初始化 CallKit<br/> 3. 配置监听器<br/>4. 登录 IM<br/>5. 发起通话<br/>6. 接通通话<br/>7. 离线推送  |
| [申请权限](permission.html)     | - **声明权限**：你需在 `Manifest.xml` 文件中声明 CallKit 所需权限，例如悬浮窗权限和锁屏显示需要的权限。<br/> - **动态权限**：录音和摄像头等权限需要动态申请。   |
| [使用 Telecom](telecom.html)      | Android 系统中的 Telecom 框架负责管理设备上的所有通话，包括传统的基于 SIM 卡的通话和 VoIP 通话。当有来电时，Telecom 框架会处理来电显示、接听、挂断等功能，并通知相关的应用程序。 |
| [展示/隐藏来电通知栏和悬浮窗](float_top.html)      | 要展示来电通知栏和悬浮窗，需要用户授予悬浮窗权限。你可以调用 API 展示或隐藏来电通知栏和悬浮窗。   |
| [自定义资源](customization.html)       | 你可以修改铃声配置、通话超时设置、图标与图形资源（如挂断按钮和接听按钮）以及文案资源（如呼叫中和待接听）。|

