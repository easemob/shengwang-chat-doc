# 创建和管理聊天室以及监听事件

<Toc />

聊天室是支持多人沟通的即时通讯系统。聊天室中的成员没有固定关系，一旦离线后，不会收到聊天室中的任何消息，超过 2 分钟会自动退出聊天室。聊天室可以应用于直播、消息广播等。若需调整该时间，需联系声网商务。
 
本文介绍如何使用即时通讯 IM SDK 在实时互动 app 中创建和管理聊天室，并实现聊天室的相关功能。

消息相关内容见 [消息管理](message_overview.html)。

## 技术原理

即时通讯 IM SDK 提供 `ChatRoomManager` 类 和 `ChatRoom` 类用于聊天室管理，支持你通过调用 API 在项目中实现如下功能：

- 创建聊天室
- 从服务器获取聊天室列表
- 加入聊天室
- 获取聊天室详情
- 解散聊天室
- 监听聊天室事件

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，详见 [快速开始](quickstart.html)。
- 了解即时通讯 IM 的 [使用限制](limitation.html)。
- 了解即时通讯 IM 的聊天室相关数量限制，详见 [即时通讯 IM 价格](https://www.easemob.com/pricing/im)。
- 只有超级管理员才有创建聊天室的权限，因此你还需要确保已调用 RESTful API 添加了超级管理员，详见 [添加聊天室超级管理员](/document/server-side/chatroom_superadmin.html)。
- 聊天室创建者和管理员的数量之和不能超过 100，即管理员最多可添加 99 个。

## 实现方法

本节介绍如何使用即时通讯 IM SDK 提供的 API 实现上述功能。

### 创建聊天室

建议直接调用 REST API [从服务端创建聊天室](/document/server-side/chatroom.html#创建聊天室)。

### 加入聊天室

用户申请加入聊天室的步骤如下：

1. 调用 `fetchPublicChatroomsFromServer` 方法从服务器获取聊天室列表，查询到想要加入的聊天室 ID。
2. 调用 `joinChatroom` 方法传入聊天室 ID，申请加入对应聊天室。新成员加入聊天室时，其他成员收到 `onMemberJoined` 回调。

示例代码如下：

```typescript
// 获取公开聊天室列表，每次最多可获取 1,000 个。
ChatClient.getInstance().chatroomManager()?.fetchPublicChatroomsFromServer(pageNumber, pageSize).then(roomArray => {
    // success logic
});

// 加入聊天室
ChatClient.getInstance().chatroomManager()?.joinChatroom(chatRoomId).then(room => {
    // success logic
});
```

同时，你可以调用 `ChatroomManager#joinChatroom(roomId: string, leaveOtherRooms?: boolean, ext?: string)` 方法，设置加入聊天室时携带的扩展信息，并指定是否退出所有其他聊天室。调用该方法后，聊天室内其他成员会收到 `ChatroomListener#onMemberJoined(roomId: string, userId: string, ext?: string)` 回调，当用户加入聊天室携带了扩展信息时，聊天室内其他人可以在用户加入聊天室的回调中，获取到扩展信息。 

```typescript
const ext = "chatroom ext info";
const leaveOtherRooms = true;
ChatClient.getInstance().chatroomManager()?.joinChatroom(chatroomId, leaveOtherRooms, ext).then(room => {
  // success logic
}).catch((e: ChatError) => {
  // failure logic
});
```

### 监听聊天室事件

`ChatroomListener` 类中提供了聊天室事件的监听接口。你可以通过注册聊天室监听器，获取聊天室事件，并作出相应处理。如不再使用该监听器，需要移除。

示例代码如下：


```typescript
// 注册聊天室回调
ChatClient.getInstance().chatroomManager()?.addListener(chatroomListener);
// 移除聊天室回调
ChatClient.getInstance().chatroomManager()?.removeListener(chatroomListener);
```

具体事件如下：

```typescript
interface ChatroomListener{
    /**
     * 有新成员加入聊天室。
     * 聊天室的所有成员会收到该事件。
     */
    onMemberJoined?: (roomId: string, userId: string) => void;
    /**
     * 有新成员退出聊天室。
     * 聊天室的所有成员会收到该事件。
     */
    onMemberExited?: (roomId: string, roomName: string, userId: string) => void;
    /**
     * 有新成员被移出聊天室。
     * 被移出的成员收到该事件。
     */
    onRemovedFromChatroom?: (reason: LEAVE_REASON, roomId: string, roomName: string) => void
    /**
     * 有成员被禁言。
     * 被添加的成员收到该事件。禁言期间成员不能发送发消息。
     */
    onMuteMapAdded?: (roomId: string, mutes: Map<string, number>) => void;
    /**
     * 有成员从禁言列表中移除。
     * 被解除禁言的成员会收到该事件。
     */
    onMutelistRemoved?: (roomId: string, mutes: Array<string>) => void;
    /**
     * 有成员被加入白名单。
     * 被添加的成员收到该事件。
     */
    onWhitelistAdded?: (roomId: string, whitelist: Array<string>) => void;
    /**
     * 有成员被移出白名单。
     * 被移出白名单的成员收到该事件。
     */
    onWhitelistRemoved?: (roomId: string, whitelist: Array<string>) => void;
    /**
     * 全员禁言状态有变更。
     * 聊天室所有成员会收到该事件。
     */
    onAllMemberMuteStateChanged?: (roomId: string, isMuted: boolean) => void;
    /**
     * 有成员被设置为管理员。
     * 所有成员会收到此通知。
     */
    onAdminAdded?: (roomId: string, adminId: string) => void;
    /**
     * 有成员被移出管理员列表。
     * 所有成员会收到此通知。
     */
    onAdminRemoved?: (roomId: string, adminId: string) => void;
    /**
     * 聊天室所有者变更。
     * 聊天室所有成员会收到该事件。
     */
    onOwnerChanged?: (roomId: string, newOwner: string, oldOwner: string) => void;
    /**
     * 聊天室公告变更。
     * 聊天室所有成员会收到该事件。
     */
    onAnnouncementChanged?: (roomId: string, announcement: string) => void;
    /**
     * 聊天室信息有更新。
     * 聊天室所有成员会收到该事件。
     */
    onSpecificationChanged?: (room: Chatroom) => void;
}
```
