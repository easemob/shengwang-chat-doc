# 离线推送概述

<Toc />

即时通讯 IM 支持集成第三方消息推送服务，为开发者提供低延时、高送达、高并发、不侵犯用户个人数据的离线消息推送服务。**声网 IM Web SDK 本身不支持离线推送，只支持对移动端离线推送进行配置。**

## 离线推送过程

客户端断开连接或应用进程被关闭等原因导致用户离线时，即时通讯 IM 会通过第三方消息推送服务向该离线用户的设备推送消息通知。当用户再次上线时，服务器会将离线期间的消息发送给用户（这里角标表示的是离线消息数，并不是实际的未读消息数）。例如，当你离线时，有用户向你发送了消息，你手机的通知中心会弹出消息通知，当你再次打开 app 并登录成功，即时通讯 IM SDK 会主动拉取你不在线时的消息。详情请参见 [Android](/docs/sdk/android/push/push_overview.html#技术原理) 和 [iOS 平台](/docs/sdk/ios/push/push_overview.html#技术原理)的离线推送文档。

**以下两种情况，即时通讯 IM 不会发送离线推送通知：**

1. 若应用在后台运行，则用户仍为在线状态，即时通讯 IM 不会向用户推送消息通知。
2. 应用在后台运行或手机锁屏等情况，若客户端未断开与服务器的连接，则即时通讯 IM 不会收到离线推送通知。

## 离线推送高级功能

如果需要离线推送的高级功能，需在[声网即时通讯控制台](https://console.easemob.com/user/login)的**即时通讯 > 功能配置 > 功能配置总览**页面激活。高级功能包括[推送通知方式](push_notification_mode_dnd.html#推送通知方式)、[免打扰模式](push_notification_mode_dnd.html#免打扰模式)和[推送模板](push_display.html#使用推送模板)。**如需关闭推送高级功能必须联系商务，因为该操作会删除所有相关配置。**

## 多设备离线推送策略

多设备登录时，可在[声网即时通讯控制台](https://console.easemob.com/user/login)的**证书管理**页面配置推送策略，该策略配置对所有推送通道生效：

- 所有设备离线时，才发送推送消息；
- 任一设备离线时，都发送推送消息。

**注意**：多端登录时若有设备被踢下线，即使接入了 IM 离线推送，也收不到离线推送消息。

![image](/images/android/push/push_multidevice_policy.png)

## 上传推送证书

除了满足用户离线条件外，要使用第三方离线推送，用户还需在[声网即时通讯控制台](https://console.easemob.com/user/login)配置推送证书信息，详见 [Android 推送](/docs/sdk/android/push/push_fcm.html)和 [APNs 推送](/docs/sdk/ios/push/push_apns.html)文档中各厂商证书配置描述。

例如，对于华为推送，需配置**证书名称**和**推送密钥**，并调用客户端 Web SDK 提供的 `uploadPushToken` 方法向声网服务器上传 device token（Android 或 iOS 平台使用 Web SDK）。

```javascript
const params = {
  deviceId: chatClint.clientResource, // 设备 ID，用于标识设备。
  deviceToken: "deviceToken", // 推送 token，用于标识每台设备上的每个应用。
  notifierName: "PUSH_CERT_NAME", // 推送服务的证书名称。
};

chatClint.uploadPushToken(params);
```

## Web 端可设置的功能

声网 IM Web SDK 支持对移动端离线推送进行如下配置：

- 设置推送通知，包括推送通知方式和免打扰模式：
  - 设置 app 的推送通知；
  - 获取 app 的推送通知设置；
  - 设置会话的推送通知；
  - 获取一个或多个会话的推送通知设置；
  - 清除会话的推送通知方式的设置。
- 设置推送翻译。
- 设置推送模板。
- 设置推送扩展功能：包括强制推送和发送静默消息。
