# **离线推送概述**

即时通讯 IM 支持集成 APNs 消息推送服务，为 iOS 开发者提供低延时、高送达、高并发、不侵犯用户个人数据的离线消息推送服务。

## 离线推送过程

客户端断开连接或应用进程被关闭等原因导致用户离线时，即时通讯 IM 会通过 APNs 消息推送服务向该离线用户的设备推送消息通知，暂时保存这些消息。当用户再次上线时，服务器会将离线期间的消息发送给用户（这里角标表示的是离线消息数，并不是实际的未读消息数）。例如，当你离线时，有用户向你发送了消息，你的手机的通知中心会弹出消息通知，当你再次打开 app 并登录成功，即时通讯 IM SDK 会主动拉取你不在线时的消息。

**以下两种情况，即时通讯 IM 不会发送离线推送通知：**

1. 若应用在后台运行，则用户仍为在线状态，即时通讯 IM 不会向用户推送消息通知。
   
2. 应用在后台运行或手机锁屏等情况，若客户端未断开与服务器的连接，则即时通讯 IM 不会收到离线推送通知。

## 离线推送高级功能

如果需要离线推送的高级功能，需在[声网控制台](https://console.shengwang.cn/overview)开启。高级功能包括[推送通知方式](push_notification_mode_dnd.html#推送通知方式)、[免打扰模式](push_notification_mode_dnd.html#免打扰模式)和[推送模板](push_display.html#使用推送模板)。**高级功能开启后，如需关闭必须联系商务，因为该操作会删除所有相关配置。**

1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**功能配置**标签页。

5. 在**推送模板** 页签下，点击**启用**。

6. 在弹出的对话框中，配置用户相关参数，点击**确定**。

![image](/images/android/push/push_android_enable_push.png)

## 多设备离线推送策略

多设备登录时，可在[声网控制台](https://console.shengwang.cn/overview)的**推送证书**页面配置推送策略，该策略配置对所有推送通道生效：

- 所有设备离线时，才发送推送消息；
- 任一设备离线时，都发送推送消息。

**注意**：多端登录时若有设备被踢下线，即使接入了 IM 离线推送，也收不到离线推送消息。

![image](/images/android/push/push_multidevice_policy.png)

## **技术原理**

![image](/images/ios/push/push_ios_1_understand.png)

消息推送流程如下：

1. 用户 B 向 APNs 推送服务注册，获取推送 token。
2. APNs 返回推送 token。
3. 用户 B 向声网服务器上传推送证书名称和推送 token。
4. 用户 A 向 用户 B 发送消息。
5. 声网服务器检查用户 B 是否在线。若在线，声网服务器直接将消息发送给用户 B。
6. 若用户 B 离线，声网服务器判断该用户是否使用了 APNs 推送。
7. 声网服务器将消息发送给 APNs 推送服务器。
8. APNs 推送服务器将消息发送给用户 B。

:::tip
推送 token（device token）是 APNs 推送提供的推送 token，即初次启动你的应用时，APNs SDK 为客户端应用实例生成的推送 token。该 token 用于标识每台设备上的每个应用，APNs 通过该 token 明确消息是发送给哪个设备的，然后将消息转发给设备，设备再通知应用程序。你可以调用 `registerForRemoteNotifications` 方法获得 token。另外，如果退出即时通讯 IM 登录时不解绑 device token（调用 `logout` 方法时对 `aIsUnbindDeviceToken` 参数传 `NO` 表示不解绑 device token，传 `YES` 表示解绑 token），用户在推送证书有效期和 token 有效期内仍会接收到离线推送通知。
:::

## 前提条件

使用 APNs 推送前，确保满足以下条件：

- 完成 SDK 初始化，并连接到服务器，详见[初始化文档](/docs/sdk/ios/initialization.html)。
- 了解即时通讯 IM 的使用限制，详见[使用限制](/docs/sdk/ios/limitation.html)。