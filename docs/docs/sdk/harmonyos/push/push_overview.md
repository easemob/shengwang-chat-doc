# 离线推送概述

<Toc />

即时通讯 IM 支持集成第三方消息推送服务，为 HarmonyOS 开发者提供低延时、高送达、高并发、不侵犯用户个人数据的离线消息推送服务。

## 离线推送过程

客户端断开连接或应用进程被关闭等原因导致用户离线时，即时通讯 IM 会通过第三方消息推送服务向该离线用户的设备推送消息通知。当用户再次上线时，服务器会将离线期间的消息发送给用户（这里角标表示的是离线消息数，并不是实际的未读消息数）。例如，当你离线时，有用户向你发送了消息，你的手机的通知中心会弹出消息通知，当你再次打开 app 并登录成功，即时通讯 IM SDK 会主动拉取你不在线时的消息。

除了满足用户离线条件外，要使用 HarmonyOS 离线推送，用户还需在[声网控制台](https://console.shengwang.cn/overview)配置推送证书信息，并调用客户端 SDK 提供的 API 向声网服务器上传 device token。

**以下两种情况，即时通讯 IM 不会发送离线推送通知：**

1. 若应用在后台运行，则用户仍为在线状态，即时通讯 IM 不会向用户推送消息通知。
   
2. 应用在后台运行或手机锁屏等情况，若客户端未断开与服务器的连接，则即时通讯 IM 不会收到离线推送通知。

## 离线推送高级功能

如果需要离线推送的高级功能，需在[声网控制台](https://console.shengwang.cn/overview)开启。高级功能包括[推送通知方式](push_notification_mode_dnd.html#推送通知方式)、[免打扰模式](push_notification_mode_dnd.html#免打扰模式)和[推送模板](push_display.html#使用推送模板)。**如需关闭推送高级功能必须联系商务，因为该操作会删除所有相关配置。**

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

## 技术原理

![image](/images/harmonyos/push/harmonyos_flowchart.png)

消息推送流程如下：

1. 用户 B 在 SDK 中配置应用的 Client ID。
2. 用户 B 使用 SDK 向声网服务器绑定推送 token。
3. 用户 A 向 用户 B 发送消息。
4. 声网服务器检查用户 B 是否在线。若在线，声网服务器直接将消息发送给用户 B。
5. 若用户 B 离线，声网服务器判断该用户的设备使用的推送服务类型。
6. 声网服务器将将消息发送给华为 Auth 服务端。
7. 华为 Auth 服务端将消息发送给用户 B。

## 前提条件

- 已开启声网即时通讯服务，详见 [开通即时通讯服务](/docs/sdk/harmonyos/enable_im.html)。
- 了解即时通讯 IM 的使用限制，详见 [使用限制](/docs/sdk/harmonyos/limitation.html)。
- 确保已经在 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 网站开通开通推送服务。
- 检查并提醒用户允许接收通知消息，并将设备的推送证书上传到[声网控制台](https://console.shengwang.cn/overview)

