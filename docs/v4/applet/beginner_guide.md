# 入门指引

即时通讯 IM 可实现发送文本、图片、位置、语音、视频等各类型消息，提供单聊、群聊、聊天室、离线推送、账号鉴权、用户属性和用户关系等服务。

## 集成流程

<div style="text-align: center">
  <img src=/images/applet/beginner_guide.png  width="400"/>
</div>

## 集成步骤

| 步骤            | 描述 | 
| :-------------- | :----- | 
| [注册账号](https://doc.shengwang.cn/doc/console/general/quickstart#注册账号)  | 使用即时通讯 IM 前，你首先需要在 [声网控制台](https://console.shengwang.cn/overview) [注册账号](https://doc.shengwang.cn/doc/console/general/quickstart#注册账号)。<br/>声网账号是开发者在声网控制台中唯一的身份标识，用于登录控制台并对应用进行配置与管理。当开发者将自身应用与即时通讯 IM 集成时，需要注册 IM 账号，并与自身应用中的账号建立一一映射关系。 |
| [创建项目并开通 IM](/product/enable_im.html#_2-开通即时通讯-im-服务) <br/><br/>[获取 App ID](/product/enable_im.html#_3-获取-app-id)         | 1. 要接入即时通讯 IM 服务，你必须首先在声网控制台 [创建项目并开通 IM](/product/enable_im.html#_2-开通即时通讯-im-服务) 。<br/> 2. 声网会给每个项目自动分配一个 App ID 作为项目唯一标识。你需要 [获取项目的 App ID](/product/enable_im.html#_3-获取-app-id)，集成 SDK 时传入 App ID。  |
| [开通 IM 套餐](/product/product_package_feature.html)   | 即时通讯 IM 支持免费版、专业版和旗舰版。<br/>除了套餐包，你还可以在声网控制台开通和订阅 IM 的增值服务，包括实时音视频服务、消息翻译和即时推送。|
| [创建用户](/v4/applet/login.html#用户注册) <br/><br/>[实现 Token 鉴权](/document/server-side/token_authentication.html) | - **创建用户**:你可以 [调用 REST API 创建用户](/document/server-side/account_register_authorized_single.html)，也可以在 [声网控制台](https://console.shengwang.cn/overview) 创建用户。详见 [用户注册文档](login.html#用户注册)。<br/> - **获取 Token**：在你的应用服务器集成 [Token 鉴权](/document/server-side/token_authentication.html) 实现获取 Token 的业务逻辑，你的应用可以调用自身服务端，从IM 服务器获取 Token。   |
| [集成小程序 SDK](/v4/applet/integration.html)         | 将小程序 SDK [集成到你的项目](/v4/applet/integration.html)中：<br/> - 搭建小程序开发环境<br/> - 配置服务器域名<br/> - 下载和引入 SDK <br/> - 实例化 SDK|
| [初始化 SDK](/v4/applet/initialization.html)  | 使用 IM 的各项功能前，必须先初始化。[初始化](/v4/applet/initialization.html) 时，需传入你的 App ID，配置设备 ID、最大重连次数、是否支持通过自己的路径将图片、文件上传到自己的服务器等重要特性。|
| [登录 IM](/v4/applet/login.html)       | 使用创建的用户登录 IM。登录成功后，你可以使用 IM 的功能。 |
| 集成特性         | 集成主要特性：<br/> - [消息管理](/v4/applet/message_send.html) <br/> - [会话管理](/v4/applet/conversation_overview.html)<br/> - [群组管理](/v4/applet/group_overview.html) <br/> - [聊天室管理](/v4/applet/room_overview.html) <br/> - [用户管理](/v4/applet/user_relationship.html)<br/> - [小程序离线推送](/v4/applet/push/push_overview.html)：即时通讯 IM 小程序 SDK 本身不支持离线推送，只支持对移动端离线推送配置。<br/> - [使用 Uni-app 离线推送插件](/v4/applet/push/uniapp_push.html)：|

