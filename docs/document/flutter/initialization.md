# 初始化

初始化是使用 SDK 的必要步骤，需在所有接口方法调用前完成。

如果进行多次初始化操作，只有第一次初始化以及相关的参数生效。

:::tip
需要在主进程中进行初始化。
:::

## 前提条件

有效的即时通讯 IM 开发者账号和 App ID，详见声网控制台 [注册账号](https://doc.shengwang.cn/doc/console/general/quickstart#注册账号) 和 [获取项目的 App ID](/product/enable_im.html#_3-获取-app-id) 说明。

## 初始化 SDK

初始化时，你需要通过 `EMOptions` 中封装的 `appId` 属性设置你的 App ID。

```dart
EMOptions options = EMOptions.withAppId(appId); 
await EMClient.getInstance.init(options);
```

对于 Flutter SDK 4.13.0 及以上版本，初始化时支持设置 `ExtSettings.kDisableIosEnterBackground` 参数，用于控制是否在 iOS 端应用进入和返回后台时调用 iOS SDK 的以下两种方法：

- `applicationDidEnterBackground`：调用该方法会断开连接。
- `applicationWillEnterForeground` ：调用该方法后会重新链接。

该功能默认开启，若要关闭，可进行如下设置：

```dart
EMOptions options = EMOptions.withAppId(
    appId,
    extSettings: {ExtSettings.kDisableIosEnterBackground: true},
);
await EMClient.getInstance.init(options);
```

下表列明初始化配置 `EMOptions` 封装的一些属性。

| 属性           | 描述            |
| :----------------- | :---------------- |
| `appId`                                   | 应用的唯一标识。 |
| `autoLogin`                            | 是否自动登录。<br/> -（默认）`true`：自动登录。**若使用默认设置，首次登录后，后续会自动登录。这种情况下，若再手动登录，则会提示用户已登录。**<br/> -  `false`：不自动登录。 |
| `autoAcceptGroupInvitation`         | 是否自动接受加群邀请。<br/> -（默认）`true`：自动接受加群申请； <br/> -  `false`: 不自动接受加群申请。 |
| `acceptInvitationAlways`                   | 是否自动接受加好友邀请。 <br/> -（默认）`true`：自动接受好友邀请。 <br/> -  `false`：不自动接收好友邀请。 |
| `deleteMessagesAsExitChatRoom`         | 退出(主动和被动退出)聊天室时是否删除聊天消息。<br/> -（默认）`true`：删除。 <br/> -  `false`：保留。 |
| `deleteMessagesAsExitGroup`               | 退出(主动和被动退出)群组时是否删除聊天消息。<br/> -（默认）`true`: 退出群组时删除群组消息。 <br/> -  `false`: 退出群组时不删除群组消息。 |
| `isChatRoomOwnerLeaveAllowed`                   | 是否允许聊天室所有者离开并删除会话记录。<br/> - （默认） `true`：允许。即使聊天室所有者离开，该所有者仍具有聊天室的所有权限，只不过不再接收任何消息。<br/> - `false`：不允许。 |

## 初始化后设置监听

初始化后，你可以设置所需的监听，例如，连接监听和接收消息的监听，及时知晓长连接的建立和消息的收发。

```dart
// 设置连接监听器。
EMClient.getInstance.addConnectionEventHandler(
  'identifier',
  EMConnectionEventHandler(
    onConnected: () {
      // SDK 成功连接到 IM 服务器时触发。
    },
    onDisconnected: () {
      // SDK 与 IM 服务器断开连接时触发。
    },
  ),
);

// 设置消息监听器。
EMClient.getInstance.chatManager.addEventHandler(
  "UNIQUE_HANDLER_ID",
  EMChatEventHandler(
    onMessagesReceived: (messages) {
      // 处理接收到的消息。
    },
  ),
);
```
