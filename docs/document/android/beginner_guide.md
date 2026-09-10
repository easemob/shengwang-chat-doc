# 入门指引

即时通讯 IM 可实现发送文本、图片、位置、语音、视频等各类型消息，提供单聊、群聊、聊天室、离线推送、账号鉴权、用户属性和用户关系等服务。       

## 集成流程

<div style="text-align: center">
  <img src=/images/android/beginner_guide.png  width="400"/>
</div>

## 集成步骤

| 步骤            | 描述 | 
| :-------------- | :----- | 
| [注册账号](https://doc.shengwang.cn/doc/console/general/quickstart#注册账号)  | 使用即时通讯 IM 前，你首先需要在 [声网控制台](https://console.shengwang.cn/overview) [注册账号](https://doc.shengwang.cn/doc/console/general/quickstart#注册账号)。<br/>声网账号是开发者在声网控制台中唯一的身份标识，用于登录控制台并对应用进行配置与管理。当开发者将自身应用与即时通讯 IM 集成时，需要注册 IM 账号，并与自身应用中的账号建立一一映射关系。 |
| [创建项目并开通 IM](/product/enable_im.html#_2-开通即时通讯-im-服务) <br/><br/>[获取 App ID](/product/enable_im.html#_3-获取-app-id)         | 1. 要接入即时通讯 IM 服务，你必须首先在声网控制台 [创建项目并开通 IM](/product/enable_im.html#_2-开通即时通讯-im-服务) 。<br/> 2. 声网会给每个项目自动分配一个 App ID 作为项目唯一标识。你需要 [获取项目的 App ID](/product/enable_im.html#_3-获取-app-id)，集成 SDK 时传入 App ID。  |
| [开通 IM 套餐](/product/product_package_feature.html)     | 即时通讯 IM 支持免费版、专业版和旗舰版。<br/>除了套餐包，你还可以在声网控制台开通和订阅 IM 的增值服务，包括实时音视频服务、消息翻译和即时推送。|
| [创建用户](/document/android/login.html#用户注册) <br/><br/>[实现 Token 鉴权](/document/server-side/token_authentication.html)    | - **创建用户**:你可以 [调用 REST API 创建用户](/document/server-side/account_register_authorized_single.html)，也可以在 [声网控制台](https://console.shengwang.cn/overview) 创建用户。详见 [用户注册文档](login.html#用户注册)。<br/> - **获取 Token**：在你的应用服务器集成 [Token 鉴权](/document/server-side/token_authentication.html) 实现获取 Token 的业务逻辑，你的应用可以调用自身服务端，从IM 服务器获取 Token。     |
| [导入 SDK](/document/android/integration.html)          | 将 SDK [集成到你的项目](/document/android/integration.html)中。集成方式取决于各客户端。   |
| [初始化 SDK](/document/android/initialization.html)         | 使用 IM 的各项功能前，必须先初始化。传入你应用的 App ID 进行 [初始化](/document/android/initialization.html)。 初始化时，可配置加群、退群推送等重要特性。|
| [登录 IM](/document/android/login.html)       | 使用创建的用户登录 IM。登录成功后，你可以使用 IM 的功能。 |
| 集成特性         | 集成主要特性：<br/> - [消息管理](/document/android/message_send.html) <br/> - [会话管理](/document/android/conversation_overview.html)<br/> - [群组管理](/document/android/group_overview.html) <br/> - [聊天室管理](/document/android/room_overview.html) <br/> - [用户管理](/document/android/user_relationship.html)<br/> - [离线推送](/document/android/push/push_overview.html)|

