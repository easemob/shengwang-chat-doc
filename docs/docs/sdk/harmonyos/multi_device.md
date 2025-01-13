# 在多个设备上登录

<Toc />

即时通讯 IM 支持同一账号在多个设备上登录。多端多设备登录场景下，所有已登录的设备同步以下信息和操作：

- 消息：包括在线消息、离线消息、推送通知（若开启了第三方推送服务，离线设备收到）以及对应的回执和已读状态等；
- 好友和群组相关操作；
- 子区相关操作；
- 会话相关操作。

多端登录时，即时通讯 IM 每端默认最多支持 4 个设备同时在线。如需增加支持的设备数量，可以联系声网商务。

单端和多端登录场景下的互踢策略和自动登录时安全检查如下：

<table width="807" height="327" border="1">
  <tbody>
    <tr>
      <td width="109" height="49">单端/多端登录</td>
      <td width="384">互踢策略</td>
      <td width="292">自动登录安全检查</td>
    </tr>
    <tr>
      <td height="52">单端登录</td>
      <td>新登录的设备会将当前在线设备踢下线。</td>
      <td rowspan="2">对于自动登录的设备，下线后设备会自动重连声网服务器。若重连成功，默认会踢掉当前登录设备（对于多设备登录，则踢掉最早的登录设备）。若要保留当前登录设备不被踢下线，请联系声网商务。该场景下，自动登录的设备登录失败，收到错误 214，提示当前登录的设备数量超过限制。</td>
    </tr>
    <tr>
      <td height="156">多端登录</td>
      <td><p>若一端的登录设备数量达到了上限，最新登录的设备会将该端最早登录的设备踢下线。</p>
      <p>即时通讯 IM 仅支持同端互踢，不支持各端之间互踢。</p></td>
    </tr>
  </tbody>
</table>

## 技术原理  

HarmonyOS SDK 初始化时会生成登录 ID 用于在多设备登录和消息推送时识别设备，并将该 ID 发送到服务器。服务器会自动将新消息发送到用户登录的设备，可以自动监听到其他设备上进行的操作。即时通讯 IM HarmonyOS SDK 提供以下多设备场景功能：

- 获取当前用户的其他已登录设备的登录 ID 列表；
- 设置登录设备的名称；
- 设置登录设备的平台；
- 获取其他设备的好友或者群组操作；

## 前提条件

1. 开始前，确保将 SDK 初始化，连接到服务器。详见[快速开始](quickstart.html)。

2. 设置登录设备的自定义名称和平台需在 SDK 初始化时完成。

## 实现方法   

### 获取当前用户的其他登录设备的登录 ID 列表  

你可以调用 `getSelfIdsOnOtherPlatform` 方法获取其他登录设备的登录 ID 列表，然后选择目标登录 ID 作为消息接收方向指定设备发送消息。

```typescript
ChatClient.getInstance().contactManager()?.getSelfIdsOnOtherPlatform().then(ids => {
  // 选择一个登录 ID 作为消息接收方。
  let toChatUsername = ids[0];
  // 创建一条文本消息，content 为消息文字内容，toChatUsername 传入登录 ID 作为消息接收方。
  let content = "";
  let message = ChatMessage.createTextSendMessage(toChatUsername, content);
  // 发送消息。
  if (message) {
    ChatClient.getInstance().chatManager()?.sendMessage(message);
  }
});
```

### 设置登录设备的名称

即时通讯 IM 支持自定义设置设备名称，这样在多设备场景下，若有设备被踢下线，你就能知道是被哪个设备挤下线的。

初始化 SDK 时，你可以调用 `ChatOptions#setCustomDeviceName` 方法设置登录设备的名称。设置后，若因达到了登录设备数量限制而导致在已登录的设备上强制退出时，被踢设备收到的 `ConnectionListener#onLogout` 回调会包含导致该设备被踢下线的自定义设备名称。

:::tip
登录成功后才会将该设置发送到服务器。
:::

```typescript
let options = new ChatOptions({
  appId: "Your AppId"
});
options.setCustomDeviceName("你的自定义设备名称");
ChatClient.getInstance().init(this.context, options);

ChatClient.getInstance().addConnectionListener({
  onConnected:() => {

  },
  onDisconnected: (errorCode: number) => {

  },
  onLogout: (errorCode: number, info: LoginExtInfo) => {
    // 当前登录账号在其它设备登录时，当前的登录设备被踢下线时会触发该回调。
    // errorCode 为 ChatError#USER_LOGIN_ANOTHER_DEVICE。
    // info.deviceInfo 是将当前设备踢出/挤下线的自定义设备名称，若设备没有自定义设备名称时默认回调设备型号。
    // 其他错误码场景下，info.deviceInfo 为空。
  }
});
```

### 设置登录设备的平台

即时通讯 IM 支持自定义设置登录设备的平台，例如将手机和平板电脑设置为两个单独的平台，方便用户精细化控制同一平台的登录设备数量及平台间互踢等行为。

初始化 SDK 时，调用 `ChatOptions#setCustomOSPlatform` 方法自定义设置登录设备的平台。

:::tip
登录成功后才会将该设置发送到服务器。
:::

```typescript
let options = new ChatOptions({
  appId: "Your AppId"
});
options.setCustomOSPlatform(1); // 取值范围为 [1,100]
ChatClient.getInstance().init(this.context, options);
```

### 设置登录设备的扩展信息

即时通讯 IM SDK 支持设备的自定义扩展信息，这样在多设备场景下，若有设备被踢下线，被踢设备能获得该设备的自定义扩展信息。

初始化 SDK 时，你可以调用 `ChatOptions#setLoginCustomExt` 方法设置登录设备的自定义扩展信息。设置后，若因达到了登录设备数量限制而导致在已登录的设备上强制退出时（`206` 错误，`USER_LOGIN_ANOTHER_DEVICE`），被踢设备收到的 `ConnectionListener#onLogout` 回调会包含导致该设备被踢下线的新登录设备的自定义扩展信息。

:::tip
登录成功后才会将该设置发送到服务器。
:::

```typescript
let options = new ChatOptions({
  appId: "Your AppId"
});
options.setLoginCustomExt("你要设置的自定义扩展信息");
ChatClient.getInstance().init(this.context, options);

ChatClient.getInstance().addConnectionListener({
  onConnected:() => {

  },
  onDisconnected: (errorCode: number) => {

  },
  onLogout: (errorCode: number, info: LoginExtInfo) => {
    // 当前登录账号在其它设备登录时，当前的登录设备被踢下线时会触发该回调。
    // errorCode 为 ChatError#USER_LOGIN_ANOTHER_DEVICE。
    // info.deviceExt 是将当前设备挤下线的新登录设备的自定义扩展信息。
    // 其他错误码场景下 info.deviceExt 为空。
  }
});
```

### 获取其他设备上的操作

例如，账号 A 同时在设备 A 和 B 上登录，账号 A 在设备 A 上进行操作，设备 B 会收到这些操作对应的通知。

你需要先实现 `MultiDeviceListener` 类监听其他设备上的操作，然后调用 `addMultiDeviceListener` 方法添加多设备监听。

```typescript
//实现 `MultiDeviceListener` 监听其他设备上的操作。
let multiDeviceListener: MultiDevicesListener = {
  onContactEvent: (event: MultiDevicesEvent, target: string, ext: string): void => {
    switch (event) {
      //当前用户在其他设备上删除好友。
      case MultiDevicesEvent.CONTACT_REMOVE:
        break;
      //当前用户在其他设备上接受好友请求。
      case MultiDevicesEvent.CONTACT_ACCEPT:
        break;
      //当前用户在其他设备上拒绝好友请求。
      case MultiDevicesEvent.CONTACT_DECLINE:
        break;
      //当前用户在其他设备上将好友加入黑名单。
      case MultiDevicesEvent.CONTACT_BAN:
        break;
      //当前用户在其他设备上将好友移出黑名单。
      case MultiDevicesEvent.CONTACT_ALLOW:
        break;
    }
  },
  onGroupEvent: (event: MultiDevicesEvent, target: string, userIds: string[]): void => {
    switch (event) {
      //当前用户在其他设备创建了群组。
      case MultiDevicesEvent.GROUP_CREATE:
        break;
      //当前用户在其他设备销毁了群组。
      case MultiDevicesEvent.GROUP_DESTROY:
        break;
      //当前用户在其他设备加⼊了群组。
      case MultiDevicesEvent.GROUP_JOIN:
        break;
      //当前用户在其他设备离开了群组。
      case MultiDevicesEvent.GROUP_LEAVE:
        break;
      //当前用户在其他设备发起了入群申请。
      case MultiDevicesEvent.GROUP_APPLY:
        break;
      //当前用户在其他设备同意了入群申请。
      case MultiDevicesEvent.GROUP_APPLY_ACCEPT:
        break;
      //当前用户在其他设备拒绝了入群申请。
      case MultiDevicesEvent.GROUP_APPLY_DECLINE:
        break;
      //当前用户在其他设备邀请了群成员。
      case MultiDevicesEvent.GROUP_INVITE:
        break;
      //当前用户在其他设备同意了入群邀请。
      case MultiDevicesEvent.GROUP_INVITE_ACCEPT:
        break;
      //当前用户在其他设备拒绝了入群邀请。
      case MultiDevicesEvent.GROUP_INVITE_DECLINE:
        break;
      //当前用户在其他设备将成员踢出群。
      case MultiDevicesEvent.GROUP_KICK:
        break;
      //当前用户在其他设备将成员加⼊群组⿊名单。
      case MultiDevicesEvent.GROUP_BAN:
        break;
      //当前用户在其他设备将成员移除群组⿊名单。
      case MultiDevicesEvent.GROUP_ALLOW:
        break;
      //当前用户在其他设备屏蔽了群组。
      case MultiDevicesEvent.GROUP_BLOCK:
        break;
      //当前用户在其他设备取消群组屏蔽。
      case MultiDevicesEvent.GROUP_UNBLOCK:
        break;
      //当前用户在其他设备转移群所有权。
      case MultiDevicesEvent.GROUP_ASSIGN_OWNER:
        break;
      //当前用户在其他设备添加管理员。
      case MultiDevicesEvent.GROUP_ADD_ADMIN:
        break;
      //当前用户在其他设备移除管理员。
      case MultiDevicesEvent.GROUP_REMOVE_ADMIN:
        break;
      //当前用户在其他设备禁言用户。
      case MultiDevicesEvent.GROUP_ADD_MUTE:
        break;
      //当前用户在其他设备移除禁言。
      case MultiDevicesEvent.GROUP_REMOVE_MUTE:
        break;
      default:
        break;
    }
  },
  onConversationEvent:(event: MultiDevicesEvent, conversationId: string, type: ConversationType) => {
    switch (event) {
      case MultiDevicesEvent.CONVERSATION_PINNED:
      //当前用户在其他设备上置顶会话。
        break;
      case MultiDevicesEvent.CONVERSATION_UNPINNED:
      //当前用户在其他设备上取消会话置顶。
        break;
      case MultiDevicesEvent.CONVERSATION_DELETED:
      //当前用户在其他设备上删除了服务端的会话。
        break;
      case MultiDevicesEvent.CONVERSATION_MARK_UPDATE:
      //当前用户在其他设备上更新了会话标记，包括添加和移除会话标记。
        break;
    }
  },
  onMessageRemoved: (conversationId: string, deviceId: string): void => {
    // 当前用户在其他设备上单向删除服务端某个会话的历史消息。
  }
}
//设置多设备监听。
ChatClient.getInstance().addMultiDevicesListener(multiDeviceListener);
//移除多设备监听。
ChatClient.getInstance().removeMultiDevicesListener(multiDeviceListener);
```

### 典型示例

当 PC 端和移动端登录同一个账号时，在移动端可以通过调用方法获取到 PC 端的登录 ID。该登录 ID 相当于特殊的好友用户 ID，可以直接使用于聊天，使用方法与好友的用户 ID 类似。

```typescript
ChatClient.getInstance().contactManager().getSelfIdsOnOtherPlatform().then(result => {
    // success logic
});
```