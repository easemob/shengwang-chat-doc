# 管理聊天室成员

<Toc />

聊天室是支持多人沟通的即时通讯系统。本文介绍如何使用环信即时通讯 IM React Native SDK 在实时互动 app 中管理聊天室成员，并实现聊天室的相关功能。

## 技术原理

环信即时通讯 IM SDK 提供 `ChatRoomManager`、`ChatRoom` 和 `ChatRoomEventListener` 类，支持对聊天室成员的管理，包括获取、添加和移出聊天室成员等，主要方法如下：

- 获取聊天室成员列表
- 将成员移出聊天室
- 管理聊天室黑名单
- 管理聊天室白名单
- 管理聊天室禁言列表
- 开启和关闭聊天室全员禁言
- 管理聊天室所有者及管理员

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，详见 [初始化](initialization.html)文档。
- 了解环信即时通讯 IM 的 [使用限制](/product/limitation.html)。
- 了解环信即时通讯 IM 聊天室相关限制，详见 [环信即时通讯 IM 价格](https://www.easemob.com/pricing/im)。

## 实现方法

本节介绍如何使用环信即时通讯 IM SDK 提供的 API 实现上述功能。

### 获取聊天室成员列表

所有聊天室成员均可调用 `fetchChatRoomMembers` 方法获取当前聊天室成员列表。

示例代码如下：

```typescript
//cursor：从该游标位置开始取数据。首次调用 cursor 传空值，从最新数据开始获取。
//pageSize：每页期望返回的成员数,最大值为 1,000。
ChatClient.getInstance()
  .roomManager.fetchChatRoomMembers(roomId, cursor, pageSize)
  .then((members) => {
    console.log("get members success.", members);
  })
  .catch((reason) => {
    console.log("get members fail.", reason);
  });
```

### 退出聊天室

#### 主动退出

聊天室所有成员均可以调用 `leaveChatRoom` 方法退出当前聊天室。成员退出聊天室时，其他成员收到 `ChatRoomEventListener#onMemberExited` 回调。

示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.leaveChatRoom(roomId)
  .then(() => {
    console.log("join room success.");
  })
  .catch((reason) => {
    console.log("join room fail.", reason);
  });
```

退出聊天室时，SDK 默认删除该聊天室所有本地消息，若要保留这些消息，可在 SDK 初始化时将 `ChatOptions#deleteMessagesAsExitChatRoom` 设置为 `false`。

示例代码如下：

```typescript
ChatOptions options = ChatOptions.withAppId();
options.deleteMessagesAsExitChatRoom = false;
```

与群主无法退出群组不同，聊天室所有者可以离开聊天室，离开后重新进入仍是该聊天室的所有者。若 `ChatOptions#isChatRoomOwnerLeaveAllowed` 参数在初始化时设置为 `true` 时，聊天室所有者可以离开聊天室；若该参数设置为 `false`，聊天室所有者调用 `leaveChatRoom` 方法离开聊天室时会提示错误 706。

#### 被移出

仅聊天室所有者和管理员可调用 `removeChatRoomMembers` 方法将单个或多个成员移出聊天室。
被移出后，该成员收到 `ChatRoomEventListener#onRemoved` 回调，其他成员收到 `ChatRoomEventListener#onMemberExited` 回调。
被移出的成员可以重新进入聊天室。

示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.removeChatRoomMembers(roomId, members)
  .then(() => {
    console.log("remove members success.");
  })
  .catch((reason) => {
    console.log("remove members fail.", reason);
  });
```

#### 离线后自动退出

由于网络等原因，聊天室中的成员离线超过 2 分钟会自动退出聊天室。若需调整该时间，需联系环信商务。

以下两类成员即使离线也不会退出聊天室：

- 聊天室白名单中的成员（聊天室所有者和管理员默认加入白名单）。
- [调用 RESTful API 创建聊天室](/docs/sdk/server-side/chatroom_manage.html#创建聊天室)时拉入的用户从未登录过。

### 管理聊天室黑名单

#### 将成员加入聊天室黑名单

仅聊天室所有者和管理员可调用 `blockChatRoomMembers` 方法将指定成员添加至黑名单。

被加入黑名单后，该成员收到 `onRemoved` 回调，其他成员收到 `onMemberExited` 回调。

被加入黑名单后，该成员无法再收发聊天室消息并被移出聊天室，黑名单中的成员如想再次加入聊天室，聊天室所有者或管理员必须先将其移出黑名单列表。

示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.blockChatRoomMembers(roomId, members)
  .then(() => {
    console.log("block members success.");
  })
  .catch((reason) => {
    console.log("block members fail.", reason);
  });
```

#### 将成员移出聊天室黑名单

仅聊天室所有者和管理员可以调用 `unblockChatRoomMembers` 方法将成员移出聊天室黑名单。

示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.unblockChatRoomMembers(roomId, members)
  .then(() => {
    console.log("unblock members success.");
  })
  .catch((reason) => {
    console.log("unblock members fail.", reason);
  });
```

#### 获取聊天室黑名单列表

仅聊天室所有者和管理员可以调用 `fetchChatRoomBlockList` 方法获取当前聊天室黑名单。

示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.fetchChatRoomBlockList(roomId, pageNum, pageSize)
  .then((members) => {
    console.log("block members success.", members);
  })
  .catch((reason) => {
    console.log("block members fail.", reason);
  });
```

### 管理聊天室白名单

聊天室所有者和管理员默认会被加入聊天室白名单。

聊天室白名单中的成员在聊天室中发送的消息为高优先级，会优先送达，但不保证必达。当负载较高时，服务器会优先丢弃低优先级的消息。若即便如此负载仍很高，服务器也会丢弃高优先级消息。

#### 获取聊天室白名单列表

仅聊天室所有者和管理员可以调用 `fetchChatRoomAllowListFromServer` 获取当前聊天室白名单成员列表。

示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.fetchChatRoomAllowListFromServer(roomId)
  .then((members) => {
    console.log("get members success.", members);
  })
  .catch((reason) => {
    console.log("get members fail.", reason);
  });
```

#### 将成员加入聊天室白名单

仅聊天室所有者和管理员可以调用 `addMembersToChatRoomAllowList` 将成员加入聊天室白名单。被添加后，该成员和其他未操作的聊天室管理员或聊天室所有者收到 `ChatRoomEventListener#onAllowListAdded` 回调。

示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.addMembersToChatRoomAllowList(roomId, members)
  .then((members) => {
    console.log("success.", members);
  })
  .catch((reason) => {
    console.log("fail.", reason);
  });
```

#### 将成员移出聊天室白名单列表

仅聊天室所有者和管理员可以调用 `removeMembersFromChatRoomAllowList` 将成员从聊天室白名单移出。被移出后，该成员和其他未操作的聊天室管理员或聊天室所有者收到 `ChatRoomEventListener#onAllowListRemoved` 回调。

示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.removeMembersFromChatRoomAllowList(roomId, members)
  .then((members) => {
    console.log("success.", members);
  })
  .catch((reason) => {
    console.log("fail.", reason);
  });
```

#### 检查自己是否在聊天室白名单中

所有聊天室成员可以调用 `isMemberInChatRoomAllowList` 方法检查自己是否在白名单中，示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.isMemberInChatRoomAllowList(roomId)
  .then((members) => {
    console.log("success.", members);
  })
  .catch((reason) => {
    console.log("fail.", reason);
  });
```

### 管理聊天室禁言列表

#### 添加成员至聊天室禁言列表

仅聊天室所有者和管理员可以调用 `muteChatRoomMembers` 方法将指定成员添加至聊天室禁言列表。被禁言后，该成员和其他未操作的聊天室管理员或聊天室所有者收到 `onMuteListAddedV2` 回调。

:::tip
聊天室所有者可禁言聊天室所有成员，聊天室管理员可禁言聊天室普通成员。
:::

示例代码如下：

```typescript
// duration：禁言时间。若传 -1，表示永久禁言。
ChatClient.getInstance()
  .roomManager.muteChatRoomMembers(roomId, muteMembers, duration)
  .then(() => {
    console.log("mute members success.");
  })
  .catch((reason) => {
    console.log("mute members fail.", reason);
  });
```

#### 将成员移出聊天室禁言列表

仅聊天室所有者和管理员可以调用 `unMuteChatRoomMembers` 方法将成员移出聊天室禁言列表。被解除禁言后，该成员和其他未操作的聊天室管理员或聊天室所有者收到 `onMuteListRemoved` 回调。

:::tip
聊天室所有者可对聊天室所有成员解除禁言，聊天室管理员可对聊天室普通成员解除禁言。
:::

示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.unMuteChatRoomMembers(roomId, unMuteMembers)
  .then(() => {
    console.log("unMute members success.");
  })
  .catch((reason) => {
    console.log("unMute members fail.", reason);
  });
```

#### 获取聊天室禁言列表

仅聊天室所有者和管理员可调用 `fetchChatRoomMuteList` 方法获取当前聊天室的禁言列表。

示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.fetchChatRoomMuteList(roomId, pageNum, pageSize)
  .then((members) => {
    console.log("get mute members success.", members);
  })
  .catch((reason) => {
    console.log("get mute members fail.", reason);
  });
```

### 开启和关闭聊天室全员禁言

为了快捷管理聊天室发言，聊天室所有者和管理员可以开启和关闭聊天室全员禁言。全员禁言和单独的成员禁言不冲突，设置或者解除全员禁言，原禁言列表并不会变化。

#### 开启聊天室全员禁言

仅聊天室所有者和管理员可以调用 `muteAllChatRoomMembers` 方法开启全员禁言。全员禁言开启后不会在一段时间内自动解除禁言，需要调用 `unMuteAllChatRoomMembers` 方法解除全员禁言。

全员禁言开启后，除了在白名单中的成员，其他成员不能发言。调用成功后，聊天室成员会收到 `ChatRoomEventListener#onAllChatRoomMemberMuteStateChanged` 回调。

示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.muteAllChatRoomMembers(roomId)
  .then((members) => {
    console.log("success.", members);
  })
  .catch((reason) => {
    console.log("fail.", reason);
  });
```

#### 关闭聊天室全员禁言

仅聊天室所有者和管理员可以调用 `unMuteAllChatRoomMembers` 方法取消全员禁言。调用成功后，聊天室成员会收到 `onAllChatRoomMemberMuteStateChanged` 回调。

示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.unMuteAllChatRoomMembers(roomId)
  .then((members) => {
    console.log("success.", members);
  })
  .catch((reason) => {
    console.log("fail.", reason);
  });
```

### 管理聊天室所有者和管理员

#### 变更聊天室所有者

仅聊天室所有者可以调用 `changeOwner` 方法将权限移交给聊天室中指定成员。成功移交后，原聊天室所有者变为聊天室成员，新的聊天室所有者和聊天室管理员收到 `onOwnerChanged` 回调。

示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.changeOwner(roomId, newOwner)
  .then(() => {
    console.log("change owner success.");
  })
  .catch((reason) => {
    console.log("change owner fail.", reason);
  });
```

#### 添加聊天室管理员

仅聊天室所有者可以调用 `addChatRoomAdmin` 方法添加聊天室管理员。成功添加后，新管理员及其他管理员收到 `onAdminAdded` 回调。

示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.addChatRoomAdmin(roomId, admin)
  .then(() => {
    console.log("add admin success.");
  })
  .catch((reason) => {
    console.log("add admin fail.", reason);
  });
```

#### 移除聊天室管理员

仅聊天室所有者可以调用 `removeChatRoomAdmin` 方法移除聊天室管理员。成功移除后，被移除的管理员及其他管理员收到 `onAdminRemoved` 回调。

示例代码如下：

```typescript
ChatClient.getInstance()
  .roomManager.removeChatRoomAdmin(roomId, admin)
  .then(() => {
    console.log("remove admin success.");
  })
  .catch((reason) => {
    console.log("remove admin fail.", reason);
  });
```

### 监听聊天室事件

详见 [监听聊天室事件](room_manage.html#监听聊天室事件)。