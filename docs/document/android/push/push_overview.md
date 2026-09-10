# 离线推送概述

即时通讯 IM 支持集成第三方离线消息推送服务，为 Android 开发者提供低延时、高送达率、高并发且不侵犯用户个人数据的离线消息推送服务。目前支持的手机厂商推送服务包括：Google FCM、华为、荣耀、小米、OPPO、VIVO 和魅族。

## 离线推送流程

### 触发条件与消息下发机制

当客户端断开连接或应用进程被系统关闭导致用户离线时，即时通讯 IM 会通过第三方消息推送服务向该离线用户的设备发送消息通知。待用户重新上线后，服务器会将离线期间的全部消息下发给用户（此处角标显示的是离线消息数量，而非实际未读消息数）。例如，当你离线期间收到其他用户发送的消息，手机通知中心会弹出相应的消息提醒；当你再次打开应用并成功登录后，即时通讯 IM SDK 会自动拉取离线期间的全部消息。

### 前置配置要求

除了满足用户离线条件外，要使用第三方离线推送，你还需在 [声网控制台](https://console.shengwang.cn/overview) 配置推送证书信息，例如，对于华为推送，需配置**证书名称**和**推送密钥**，并调用客户端 SDK 提供的 API 向声网服务器上传 device token。

### 不触发离线推送的场景

在以下两种情况下，即时通讯 IM 不会发送离线推送通知：

1. 应用在后台运行时，用户仍处于在线状态，即时通讯 IM 不会推送消息通知。
2. 应用处于后台运行或手机锁屏等状态时，若客户端与服务器的连接未断开，即时通讯 IM 也不会触发离线推送通知。

## 推送原理

![image](/images/android/push/push_android_understand.png)

消息推送流程如下：

1. 用户 B（消息接收者）检查设备支持哪种推送渠道，即 app 配置了哪种第三方推送服务且满足该推送的使用条件。
2. 用户 B 根据配置的第三方推送 SDK 从第三方推送服务器获取推送 token。
3. 第三方推送服务器向用户 B 返回推送 token。
4. 用户 B 向声网服务器上传推送证书名称和推送 token。
5. 用户 A 向 用户 B 发送消息。
6. 声网服务器检查用户 B 是否在线。若在线，声网服务器直接将消息发送给用户 B。
7. 若用户 B 离线，声网服务器判断该用户的设备使用的推送服务类型。
8. 声网服务器将将消息发送给第三方推送服务器。
9. 第三方推送服务器将消息发送给用户 B。

## 推送证书与推送 Token

**推送证书**：推送证书是IM 服务器判断目标设备使用何种推送通道的唯一依据。在发送推送通知前，需在 [声网控制台](https://console.shengwang.cn/overview) 为应用配置推送证书，填写证书名称（或 App ID），并确保该名称与 Android 终端设备上传的证书名称一致。此配置操作必须在登录即时通讯 IM SDK 成功后执行。

**推送 Token（Device Token）**：推送 token 是第三方推送服务为应用实例生成的唯一标识。以 FCM 推送为例，应用初次启动时，FCM SDK 会为客户端应用实例生成一个注册令牌（registration token）。该 token 用于唯一标识每台设备上的每个应用，FCM 据此将消息准确投递至目标设备，设备再通知应用程序。你可通过调用 `FirebaseMessaging.getInstance().getToken()` 方法获取该 token。此外，若在退出即时通讯 IM 登录时选择不解绑 device token（调用 `logout` 方法时将 `unbindToken` 参数设为 `false`；设为 `true` 则表示解绑 token），用户在推送证书和 token 有效期内仍可收到离线推送通知。

关于如何获取推送 Token 并上传至IM 服务器的详细步骤，请参阅各推送服务的集成文档。例如，FCM 推送的相关说明请参考 [FCM 推送集成文档](/document/android/push/push_fcm.html#步骤四-fcm-推送集成)。

## 推送高级功能

### 功能开通

[推送通知方式](push_notification_mode_dnd.html#推送通知方式)、[免打扰模式](push_notification_mode_dnd.html#免打扰模式) 和 [推送模板](push_template.html) 属于推送的高级功能。使用前，你需在 [声网控制台](https://console.shengwang.cn/overview) 免费开通相关服务。**激活后如需关闭推送高级功能，必须联系商务经理处理，因为该操作会删除高级功能相关的全部配置。**

1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**功能配置**标签页。

5. 在**推送模板** 页签下，点击**启用**。

6. 在弹出的对话框中，配置用户相关参数，点击**确定**。

![image](/images/android/push/push_android_enable_push.png)

### 推送通知方式

推送通知方式提供以下三种类型：

- 接收所有离线消息的推送通知。
- 仅接收提及特定用户的消息的推送通知。
- 不接收任何离线消息的推送通知。

你可以为应用级别或单聊/群聊会话级别分别设置推送通知方式，会话级别的配置优先级高于应用级别的配置。

更多详情，请参见 [推送通知方式介绍](push_notification_mode_dnd.html#推送通知方式)。

### 免打扰模式

完成 SDK 初始化并成功登录应用后，你可以为应用及各类型的会话设置免打扰模式，即关闭离线推送功能。该模式提供以下能力：

- 支持设置免打扰时间段（例如，8:00-10:00）或免打扰时长（例如，30 分钟）。
- 支持应用级别及单聊/群聊会话级别的免打扰模式配置。
- 支持开启全天免打扰或完全关闭免打扰模式。
- 若在免打扰模式下需要向指定用户推送消息，可设置强制推送。

更多详情，请参见 [免打扰模式介绍](push_notification_mode_dnd.html#免打扰模式)。

### 推送模板

当服务器提供的默认离线推送配置无法满足业务需求时，可通过推送模板设置全局范围的推送标题和推送内容。推送模板包括默认模板 `default`、`detail` 以及自定义模板，你可在 [声网控制台](https://console.shengwang.cn/overview) 进行配置。

推送模板的具体配置方法和使用说明，请参见 [相关文档介绍](push_template.html)。

## 多设备离线推送策略

多设备登录时，可在[声网控制台](https://console.shengwang.cn/overview)的 **推送证书** 页面配置推送策略，该策略配置对所有推送通道生效：

- 所有设备离线时，才发送推送消息；
- 任一设备离线时，都发送推送消息。

**注意**：多端登录时若有设备被踢下线，即使接入了 IM 离线推送，也收不到离线推送消息。

![image](/images/android/push/push_multidevice_policy.png)

## 前提条件

1. 已开通即时通讯服务，详见 [开启和配置即时通讯服务](/product/enable_im.html#_2-开通即时通讯-im-服务)。
2. 了解即时通讯 IM 的使用限制，详见 [使用限制](/document/android/limitation.html)。
3. 若使用[推送高级功能](#推送高级功能)，需在[声网控制台](https://console.shengwang.cn/overview)上激活。
4. 各推送服务的适用条件如下：
   - Google FCM：设备启用 Google Play 服务且可连接至 Google 服务器。
   - 小米推送：仅限小米设备。
   - 华为推送：仅限华为设备。
   - 魅族推送：仅限魅族设备。
   - OPPO 推送：仅限 OPPO 设备。
   - VIVO 推送：仅限 VIVO 设备。
   - 荣耀推送：仅限荣耀设备。

SDK 内部将按上述顺序检测设备的推送支持情况。若未配置第三方推送或不满足使用条件，即时通讯 IM SDK 会通过保活机制尽可能维持与IM 服务器的长连接，确保消息的及时送达。

**如你的应用有海外使用场景，建议开启 FCM 推送。由于各推送服务的适用条件不同，建议尽可能同时集成多家厂商推送服务。**

5. 使用消息推送前，需在对应厂商推送服务平台完成项目注册，并将设备的推送证书上传至 [声网控制台](https://console.shengwang.cn/overview)。

## 配置推送接口

你需要在 SDK 初始化阶段完成推送接口的配置，示例代码如下：

```java
EMOptions options = new EMOptions();

// 使用 Application Context 创建推送配置。
EMPushConfig pushConfig = new EMPushConfig.Builder(getApplicationContext())
        // 启用小米推送。appId 和 appKey 均不能为空。
        .enableMiPush(miAppId, miAppKey)
        // 启用华为推送。需预先在 AndroidManifest.xml 配置
        // com.huawei.hms.client.appid，或在项目中配置 agconnect-services.json。
        .enableHWPush()
        .build();

// 将推送配置设置到初始化选项中，并在初始化 SDK 前完成配置。
options.setPushConfig(pushConfig);

// 初始化即时通讯 IM SDK。
EMClient.getInstance().init(getApplicationContext(), options);
```

## 混淆配置

如果你在项目中开启了代码混淆功能，请将以下规则添加到混淆配置文件中：

```java
-keep class com.hyphenate.** {*;}
-dontwarn  com.hyphenate.**
```

此外，你还需要根据各厂商开发者平台文档的指引，添加相应第三方推送服务的混淆规则。