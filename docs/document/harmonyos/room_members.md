# 管理聊天室成员

<Toc />

聊天室是支持多人沟通的即时通讯系统。本文介绍如何使用即时通讯 IM HarmonyOS SDK 在实时互动 app 中管理聊天室成员，并实现聊天室的相关功能。

## 技术原理

即时通讯 IM SDK 提供 `ChatroomManager` 类 和 `ChatRoom` 类，支持对聊天室成员的管理，包括获取、添加和移出聊天室成员等，主要方法如下：

- 获取聊天室成员列表
- 退出聊天室
- 管理聊天室黑名单
- 管理聊天室白名单
- 管理聊天室禁言列表
- 开启和关闭聊天室全员禁言
- 管理聊天室所有者及管理员

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，详见 [快速开始](quickstart.html)。
- 了解即时通讯 IM 的 [使用限制](limitation.html)。
- 了解即时通讯 IM 聊天室和成员的数量限制，详见 [即时通讯 IM 价格](https://www.easemob.com/pricing/im)。

## 实现方法

本节介绍如何使用即时通讯 IM HarmonyOS SDK 提供的 API 实现上述功能。

### 获取聊天室成员列表

所有聊天室成员均可调用 `fetchChatRoomMembers` 方法获取当前聊天室成员列表。

示例代码如下：

```typescript
//cursor：从该游标位置开始取数据。首次调用 cursor 传空字符串，从最新数据开始获取。
//pageSize：每页期望返回的成员数,最大值为 1,000。
ChatClient.getInstance().chatroomManager()?.fetchChatroomMembers(chatroomId, cursor, pageSize).then(cursorResult => {
    // success logic
});
```

### 退出聊天室

#### 主动退出

聊天室所有成员均可以调用 `leaveChatroom` 方法退出当前聊天室。成员退出聊天室时，其他成员收到 `onMemberExited` 回调。

示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.leaveChatroom(chatRoomId).then(()=> {
    // success logic
});
```

退出聊天室时，SDK 默认删除该聊天室所有本地消息，若要保留这些消息，可在 SDK 初始化时将 `ChatOptions#setDeleteMessagesOnLeaveChatroom` 设置为 `false`。

示例代码如下：

```typescript
let options = new ChatOptions({
    appId: "Your AppId"
});
options.setDeleteMessagesOnLeaveChatroom(false);
```

与群主无法退出群组不同，聊天室所有者可以离开聊天室，重新进入聊天室仍是该聊天室的所有者。若 `ChatOptions#canChatroomOwnerLeave` 参数在初始化时设置为 `true` 时，聊天室所有者可以离开聊天室；若该参数设置为 `false`，聊天室所有者调用 `leaveChatRoom` 方法离开聊天室时会提示错误 706 `ChatError#CHATROOM_OWNER_NOT_ALLOW_LEAVE`。

#### 被移出

仅聊天室所有者和管理员可调用 `ChatroomManager#removeChatroomMembers` 方法将单个或多个成员移出聊天室。

被移出后，该成员收到 `onRemovedFromChatRoom` 回调，其他成员收到 `ChatroomListener#onMemberExited` 回调。

被移出的成员可以重新进入聊天室。

示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.removeChatroomMembers(chatroomId, members).then(room => {
    // success logic
});
```

#### 离线后自动退出

由于网络等原因，聊天室中的成员离线超过 2 分钟会自动退出聊天室。若需调整该时间，需联系声网商务。

以下两类成员即使离线也不会退出聊天室：

- 聊天室白名单中的成员（聊天室所有者和管理员默认加入白名单）。
- [调用 RESTful API 创建聊天室](/document/server-side/chatroom_manage.html#创建聊天室)时拉入的用户从未登录过。

### 管理聊天室黑名单

#### 将成员加入聊天室黑名单

仅聊天室所有者和管理员可调用 `ChatroomManager#blockChatroomMembers` 方法将指定成员添加至黑名单。

被加入黑名单后，该成员收到 `ChatroomListener#onRemovedFromChatRoom` 回调，移出原因为 `LEAVE_REASON#BE_KICKED`。其他成员收到 `ChatroomListener#onMemberExited` 回调。

被加入黑名单后，该成员无法再收发聊天室消息并被移出聊天室，黑名单中的成员如想再次加入聊天室，聊天室所有者或管理员必须先将其移出黑名单列表。

示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.blockChatroomMembers(chatroomId, members).then(room => {
    // success logic
});
```

#### 将成员移出聊天室黑名单

仅聊天室所有者和管理员可以调用 `ChatroomManager#unblockChatroomMembers` 方法将成员移出聊天室黑名单。

示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.unblockChatroomMembers(chatroomId, members).then(room => {
    // success logic
});
```

#### 获取聊天室黑名单列表

仅聊天室所有者和管理员可以调用 `ChatroomManager#fetchChatroomBlocklist` 方法获取当前聊天室黑名单。

示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.fetchChatroomBlocklist(chatroomId, pageNum, pageSize).then(blocklist => {
    // success logic
});
```

### 管理聊天室白名单

聊天室所有者和管理员默认会被加入聊天室白名单。

聊天室白名单中的成员在聊天室中发送的消息为高优先级，会优先送达，但不保证必达。当负载较高时，服务器会优先丢弃低优先级的消息。若即便如此负载仍很高，服务器也会丢弃高优先级消息。

#### 获取聊天室白名单列表

仅聊天室所有者和管理员可以调用 `fetchChatroomWhitelist` 获取当前聊天室白名单成员列表。

示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.fetchChatroomWhitelist(chatroomId).then(whitelist => {
    // success logic
});
```

#### 检查自己是否在聊天室白名单中

所有聊天室成员可以调用 `checkIfInChatRoomWhiteList` 方法检查自己是否在聊天室白名单中，示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.checkIfInWhitelist(chatroomId).then(inWhitelist => {
    // success logic
});
```

#### 将成员加入聊天室白名单

仅聊天室所有者和管理员可以调用 `addToChatroomWhitelist` 将成员加入聊天室白名单。

示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.addToChatroomWhitelist(chatroomId, members).then(room => {
    // success logic
});
```

#### 将成员移出聊天室白名单列表

仅聊天室所有者和管理员可以调用 `removeFromChatroomWhitelist` 将成员从聊天室白名单移出。

示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.removeFromChatroomWhitelist(chatroomId, members).then(room => {
    // success logic
});
```

### 管理聊天室禁言列表

#### 添加成员至聊天室禁言列表

仅聊天室所有者和管理员可以调用 `ChatroomManager#muteChatroomMembers` 方法将指定成员添加至聊天室禁言列表，操作者外其他成员收到 `ChatroomListener#onMuteMapAdded` 回调。

:::tip
聊天室所有者可禁言聊天室所有成员，聊天室管理员可禁言聊天室普通成员。
:::

示例代码如下：

```typescript
// `duration`：禁言时间。传 -1 表示永久禁言。
ChatClient.getInstance().chatroomManager()?.muteChatroomMembers(chatroomId, members, duration).then(room => {
    // success logic
});
```

#### 将成员移出聊天室禁言列表

仅聊天室所有者和管理员可以调用 `ChatroomManager#unmuteChatroomMembers` 方法将成员移出聊天室禁言列表。被解除禁言后，其他成员收到 `ChatroomListener#onMutelistRemoved` 回调。

:::tip
聊天室所有者可对聊天室所有成员解除禁言，聊天室管理员可对聊天室普通成员解除禁言。
:::

示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.unmuteChatroomMembers(chatroomId, members).then(room => {
    // success logic
});
```

#### 获取聊天室禁言列表

仅聊天室所有者和管理员可调用 `fetchChatroomMutes` 获取聊天室禁言列表。

示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.fetchChatroomMutes(chatroomId, pageNum, pageSize).then(result => {
    // success logic
});
```

### 开启和关闭聊天室全员禁言

为了快捷管理聊天室发言，聊天室所有者和管理员可以开启和关闭聊天室全员禁言。全员禁言和单独的成员禁言不冲突，设置或者解除全员禁言，原禁言列表并不会变化。

#### 开启全员禁言

仅聊天室所有者和管理员可以调用 `ChatroomManager#muteAllMembers` 方法开启全员禁言。全员禁言开启后不会在一段时间内自动解除禁言，需要调用 `ChatroomManager#unmuteAllMembers` 方法解除禁言。

全员禁言开启后，除了在白名单中的成员，其他成员不能发言。调用成功后，聊天室成员会收到 `ChatroomListener#onAllMemberMuteStateChanged` 回调。

示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.muteAllMembers(chatroomId).then(room => {
    // success logic
});
```

#### 关闭全员禁言

仅聊天室所有者和管理员可以调用 `ChatroomManager#unmuteAllMembers` 方法取消全员禁言。调用成功后，聊天室成员会收到 `ChatroomListener#onAllMemberMuteStateChanged` 回调。

示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.unmuteAllMembers(chatroomId).then(room => {
    // success logic
});
```

### 管理聊天室所有者和管理员

#### 变更聊天室所有者

仅聊天室所有者可以调用 `ChatroomManager#changeChatroomOwner` 方法将权限移交给聊天室中指定成员。成功移交后，原聊天室所有者变为聊天室成员，新的聊天室所有者和聊天室管理员收到 `ChatroomListener#onOwnerChanged` 回调。

示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.changeChatroomOwner(chatroomId, newOwner).then(room => {
    // success logic
});
```

#### 添加聊天室管理员

仅聊天室所有者可以调用 `ChatroomManager#addChatroomAdmin` 方法添加聊天室管理员。成功添加后，新管理员及其他管理员收到 `ChatroomListener#onAdminAdded` 回调。

示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.addChatroomAdmin(chatroomId, admin).then(room => {
    // success logic
});
```

#### 移除聊天室管理员

仅聊天室所有者可以调用 `ChatroomManager#removeChatroomAdmin` 方法移除聊天室管理员。成功移除后，被移除的管理员及其他管理员收到 `ChatroomListener#onAdminRemoved` 回调。

示例代码如下：

```typescript
ChatClient.getInstance().chatroomManager()?.removeChatroomAdmin(chatroomId, admin).then(room => {
    // success logic
});
```

### 监听聊天室事件

详见 [监听聊天室事件](room_manage.html#监听聊天室事件)。