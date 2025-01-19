# 在多个设备登录

<Toc />

即时通讯 IM 支持同一账号在多个设备上登录。多端多设备登录场景下，所有已登录的设备同步以下信息和操作：

- 消息：包括在线消息、离线消息、推送通知（若开启了第三方推送服务，离线设备收到）以及对应的回执和已读状态等；
- 好友和群组相关操作；
- 子区相关操作；
- 会话相关操作。

多端登录时，即时通讯 IM 每端默认最多支持 4 个设备同时在线。如需增加支持的设备数量，可以联系声网商务。

单端和多端登录场景下的互踢策略如下：

| 单端登录     | 多端登录    | 其他说明    |
| :------------ | :----------- | :------------- |
| 新登录的设备会将当前在线设备踢下线。 | 若一端的登录设备数量达到了上限，最新登录的设备会将该端最早登录的设备踢下线。即时通讯 IM 仅支持同端互踢，不支持各端之间互踢。<br/>多端登录时，是否使用固定的设备 ID 对设备互踢策略存在影响：SDK 会为设备生成设备 ID，作为设备的唯一标识。之前，每个 SDK 实例连接时，SDK 均使用不同的随机字符串作为设备标识。即时通讯 IM SDK 支持 `ConnectionParameters#isFixedDeviceId` 参数，你可以在 SDK 初始化时设置使用随机的设备 ID 或固定设备 ID：<br/>- （默认）`true`：使用固定的设备 ID。设备标识存入本地存储，即使在多设备登录情况下，同一浏览器只能打开一个页签，若打开两个，新页签会将上一个踢掉。<br/>- `false`：使用随机设备 ID。每个页签采用不同的设备 ID。多设备登录情况下，同一浏览器可打开多个页签，若超过允许的设备数量，则新页签会将最先打开的页签踢掉。 | 声网服务器提供 RESTful 接口[查询每个账号已登录设备列表](/docs/sdk/server-side/account_system.html#获取指定账号的在线登录设备列表)、[将账号从已登录设备强制下线](/docs/sdk/server-side/account_system.html#强制用户下线)和将指定账号强制[从单个设备下线](/docs/sdk/server-side/account_system.html#强制用户从单设备下线)。 |

## 技术原理

即时通讯 IM SDK 在用户每次登录时会生成一个新的唯一的登录 ID，并将该 ID 发送到服务器。服务器会自动将新消息发送到用户登录的设备，可以自动监听到其他设备上进行的好友或群组操作。

## 实现方法

### 获取当前用户的其他登录设备的登录 ID 列表

你可以调用 `getSelfIdsOnOtherPlatform` 方法获取其他登录设备的登录 ID 列表，然后选择目标登录 ID 作为消息接收方向指定设备发送消息。

```javascript
chatClient.getSelfIdsOnOtherPlatform().then((res) => {
  console.log(res, "获取当前用户其他登录设备的登录 Id 列表成功");
  // 选择一个登录 ID 作为消息接收方。
  const toUserId = res.data[0];
  // toUserId 作为消息接收方。
  const option = {
    type: "txt",
    msg: "message content",
    to: toUserId,
    chatType: "singleChat",
  };
  // 创建消息。
  const msg = ChatSDK.message.create(option);
  // 发送消息。
  chatClient.send(msg);
});
```

### 设置登录设备的扩展信息

即时通讯 IM SDK 支持设备的自定义扩展信息，这样在多设备场景下，若有设备被踢下线，被踢设备能获得该设备的自定义扩展信息。

初始化 SDK 时，你可以调用 `setLoginInfoCustomExt` 方法设置登录设备的自定义扩展信息。设置后，若因达到了登录设备数量限制而导致在已登录的设备上强制退出时（`206` 错误，`WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE`），被踢设备收到的 `onDisconnected` 回调会包含导致该设备被踢下线的新登录设备的自定义扩展信息。

:::tip
登录成功后才会将该设置发送到服务器。
:::

```javascript
// 设置自定义扩展信息
chatClient.setLoginInfoCustomExt("你的自定义扩展信息json字符串");

// 监听onDisconnected回调
chatClient.addEventHandler("handlerId", {
  // IM连接断开事件
  onDisconnected: (error) => {
    if (error) {
      // 多端被踢下线
      if (error.type === "206") {
        // 其他错误码场景下不存在该字段
        // 当前设备挤下线的新登录设备的自定义扩展信息。
        console.log(error.data.loginInfoCustomExt);
      }
    }
  },
});
```

### 获取其他设备上的操作

你需要调用 `addEventHandler` 方法注册监听事件，监听其他设备上的操作。服务器同步信息之后，SDK 会回调这些事件，Web 端与其他端均会收到好友和群组相关操作的通知。

对于好友和群组的相关操作来说，多设备事件与单设备事件的名称相同，唯一区别在于事件中的 `from` 字段，即多端多设备事件中该字段的值为当前用户的用户 ID，而单设备事件中，该字段的值为操作方的用户 ID。详见[群组事件](group_manage.html#监听群组事件)和[用户关系事件](user_relationship.html#添加好友)。

:::tip
多端多设备场景下，无聊天室操作相关事件，只支持聊天室中发送和接收消息的同步。
:::

子区和删除漫游消息事件会触发 `onMultiDeviceEvent` 事件，示例代码如下：

```javascript
chatClient.addEventHandler("handlerId", {
  onContactAgreed: (event) => {},
  onGroupEvent: (event) => {},
  onMultiDeviceEvent: (event) => {
    switch (event.operation) {
      case "chatThreadCreate":
        //当前用户在其他设备上创建子区。
        break;
      case "chatThreadDestroy":
        //当前用户在其他设备上销毁子区。
        break;
      case "chatThreadJoin":
        //当前用户在其他设备上加入子区。
        break;
      case "chatThreadLeave":
        //当前用户在其他设备上离开子区。
        break;
      case "chatThreadNameUpdate":
        //当前用户在其他设备上更新子区。
        break;
      case "deleteRoaming":
        //当前用户在其他设备上删除了服务端的会话。
        break;
      case "memberAttributesUpdate":
        //当前用户在其他设备上更新了群成员属性。
        break;
      case "deleteRoaming":
        //当前用户在其他设备上删除历史消息。
        break;
      case "deleteConversation":
        //当前用户在其他设备上删除会话。
        break;
      case "pinnedConversation":
        //当前用户在其他设备上置顶会话。
        break;
      case "unpinnedConversation":
        //当前用户在其他设备上取消置顶会话。
        break;
      case "markConversation":
        //当前用户在其他设备上标记会话。
        break;
      case "unMarkConversation":
        //当前用户在其他设备上取消标记会话。
        break;
      case "setSilentModeForConversation":
        //当前用户在其他设备上取消标记会话。
        break;
      case "removeSilentModeForConversation":
        //当前用户在其他设备上取消标记会话。
        break;
      default:
        break;
    }
  },
});
```
