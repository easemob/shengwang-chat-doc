# 创建和管理群组及监听群组事件

<Toc />

群组是支持多人沟通的即时通讯系统，本文介绍如何使用即时通讯 IM SDK 在实时互动 app 中创建和管理群组，并实现群组相关功能。

如需查看消息相关内容，参见 [消息管理](message_overview.html)。

## 技术原理

即时通讯 IM Flutter SDK 提供 `ChatGroup`、`ChatGroupManager` 和 `ChatGroupEventHandler` 类用于群组管理，支持你通过调用 API 在项目中实现如下功能：

- 创建、解散群组
- 加入、退出群组
- 获取群组详情
- 获取群成员列表
- 获取群组列表
- 查询当前用户已加入的群组数量
- 屏蔽、解除屏蔽群消息
- 监听群组事件

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，详见 [快速开始](quickstart.html)；
- 了解即时通讯 IM 的使用限制，详见 [使用限制](limitation.html)；
- 了解群组和群成员的数量限制，详见 [套餐包详情](https://www.easemob.com/pricing/im)。

## 实现方法

本节介绍如何使用即时通讯 IM Flutter SDK 提供的 API 实现上述功能。

### 创建群组

群组可分为私有群和公有群。私有群不可被搜索到，公开群可以通过群组 ID 搜索到。

用户可以创建群组，设置群组的名称、描述、群组成员、创建群组的原因等属性，还可以设置 `ChatGroupStyle` 参数指定群组的大小和类型。创建群组后，群组创建者自动成为群主。

在创建群组前，你需要设置群组类型 (`ChatGroupStyle`) 和进群邀请是否需要对方同意 (`inviteNeedConfirm`)。

1. 私有群不可被搜索到，公开群可以通过 ID 搜索到。目前支持四种群组类型 (`GroupStyle`) ，具体设置如下：
    - `PrivateOnlyOwnerInvite` —— 私有群，只有群主和管理员可以邀请人进群；
    - `PrivateMemberCanInvite` —— 私有群，所有群成员均可以邀请人进群；
    - `PublicJoinNeedApproval` —— 公开群，加入此群除了群主和管理员邀请，只能通过申请加入此群；
    - `PublicOpenJoin` —— 公开群，任何人都可以进群，无需群主和群管理同意。
2. 进群邀请是否需要对方同意 (`ChatGroupOptions#inviteNeedConfirm`) 的具体设置如下：
    - 进群邀请需要用户确认 (`ChatGroupOptions#inviteNeedConfirm` 设置为 `true`)。创建群组并发出邀请后，根据受邀用户的 `ChatOptions#autoAcceptGroupInvitation` 设置，处理逻辑如下：
        - 用户设置手动确认群组邀请 (`ChatOptions#autoAcceptGroupInvitation` 设置为 `false`)。受邀用户收到 `ChatGroupEventHandler#onInvitationReceivedFromGroup` 事件，并选择同意或拒绝入群邀请：
            - 用户同意入群邀请后，邀请人收到 `ChatGroupEventHandler#onInvitationAcceptedFromGroup` 事件和 `ChatGroupEventHandler#onMemberJoinedFromGroup` 事件，其他群成员收到 `ChatGroupEventHandler#onMemberJoinedFromGroup` 事件；
            - 用户拒绝入群邀请后，邀请人收到 `ChatGroupEventHandler#onInvitationDeclinedFromGroup` 事件。
    - 进群邀请无需用户确认 (`ChatGroupOptions.inviteNeedConfirm` 设置为 `false`)。创建群组并发出邀请后，无论用户的 `ChatOptions#autoAcceptGroupInvitation` 设置为何值，受邀用户直接进群并收到`ChatGroupEventHandler#onAutoAcceptInvitationFromGroup` 事件，邀请人收到 `ChatGroupEventHandler#onInvitationAcceptedFromGroup` 事件和 `ChatGroupEventHandler#onMemberJoinedFromGroup` 事件，其他群成员收到 `ChatGroupEventHandler#onMemberJoinedFromGroup` 事件。

用户可以调用 `ChatGroupManager#createGroup` 方法创建群组，并通过 `ChatGroupOptions` 中的参数设置群组名称、群组描述、群组成员和建群原因。

示例代码如下：

```dart
ChatGroupOptions groupOptions = ChatGroupOptions(
  style: ChatGroupStyle.PrivateMemberCanInvite,
  inviteNeedConfirm: true,
  maxCount: 200,
);

String groupName = "newGroup";
String groupDesc = "group desc";
try {
  await ChatClient.getInstance.groupManager.createGroup(
    groupName: groupName,
    desc: groupDesc,
    options: groupOptions,
  );
} on ChatError catch (e) {
}
```

### 解散群组

仅群主可以调用 `DestroyGroup` 方法解散群组。群组解散时，其他群组成员收到 `ChatGroupEventHandler#onGroupDestroyed` 事件并被踢出群组。

:::tip
解散群组后，将删除本地数据库及内存中的群相关信息及群会话，谨慎操作。
:::

示例代码如下：

```dart
try {
  await ChatClient.getInstance.groupManager.destroyGroup("groupId");
} on ChatError catch (e) {}
```

### 用户申请入群

根据 [创建群组](#创建群组) 时的群组类型 (`GroupStyle`) 设置，加入群组的处理逻辑差别如下：

- 当群组类型为 `PublicOpenJoin` 时，用户可以直接加入群组，无需群主或群管理员同意，加入群组后，其他群成员收到 `ChatGroupEventHandler#onMemberJoinedFromGroup` 事件；
- 当群组类型为 `PublicJoinNeedApproval` 时，用户可以申请进群，群主或群管理员收到 `ChatGroupEventHandler#onRequestToJoinReceivedFromGroup` 事件，并选择同意或拒绝入群申请：
    - 群主或群管理员同意入群申请，申请人收到 `ChatGroupEventHandler#onRequestToJoinAcceptedFromGroup` 事件，其他群成员收到`ChatGroupEventHandler#onMemberJoinedFromGroup` 事件；
    - 群主或群管理员拒绝入群申请，申请人收到 `ChatGroupEventHandler#onRequestToJoinDeclinedFromGroup` 事件。

:::tip
用户只能申请加入公开群组，私有群组不支持用户申请入群。
:::

用户申请加入群组的步骤如下：

1. 调用 `ChatGroupManager#fetchPublicGroupsFromServer` 方法从服务器获取公开群列表，查询到想要加入的群组 ID。
2. 根据加群是否需要验证，调用不同的方法：
   
  - 若无需验证，调用 `ChatGroupManager#joinPublicGroup` 方法传入群组 ID，申请加入对应群组。
  
```dart
// 获取公开群组列表
try {
  ChatCursorResult<ChatGroupInfo> result =
      await ChatClient.getInstance.groupManager.fetchPublicGroupsFromServer();
} on ChatError catch (e) {
}

// 申请加入群组
try {
  await ChatClient.getInstance.groupManager.joinPublicGroup(groupId);
} on ChatError catch (e) {
}
```

若需要验证，调用 `requestToJoinPublicGroup` 方法传入群组 ID，申请加入对应群组。

```dart
// 获取公开群组列表
try {
  ChatCursorResult<ChatGroupInfo> result =
      await ChatClient.getInstance.groupManager.fetchPublicGroupsFromServer();
} on ChatError catch (e) {
}

// 申请加入群组
try {
    await ChatClient.getInstance.groupManager.requestToJoinPublicGroup('groupId');
  } on ChatError catch (e) {}
```

### 退出群组

群成员可以调用 `LeaveGroup` 方法退出群组，其他成员收到 `ChatGroupEventHandler#onMemberExitedFromGroup` 事件。退出群组后，该用户将不再收到群消息。群主不能调用该接口退出群组，只能调用 [`DestroyGroup`](#解散群组) 解散群组。

示例代码如下：

```dart
try {
  await ChatClient.getInstance.groupManager.leaveGroup(groupId);
} on ChatError catch (e) {
}
```

### 获取群组详情

群成员可以调用 `ChatGroupManager#getGroupWithId` 方法从内存获取群组详情。返回结果包括：群组 ID、群组名称、群组描述、群组基本属性、群主、群组管理员列表，默认不包含群成员。

群成员也可以调用 `ChatGroupManager#fetchGroupInfoFromServer` 方法从服务器获取群组详情。返回的结果包括：群组 ID、群组名称、群组描述、群主、群组管理员列表、是否已屏蔽群组消息以及群组是否禁用等信息。另外，若将该方法的 `fetchMembers` 参数设置为 `true`，可获取群成员列表，默认最多包括 200 个成员。

示例代码如下：

```dart
// 从本地获取群组
try {
  ChatGroup? group = await ChatClient.getInstance.groupManager.getGroupWithId(groupId);
} on ChatError catch (e) {
}

// 从服务器获取群组详情
try {
  ChatGroup group = await ChatClient.getInstance.groupManager.fetchGroupInfoFromServer(groupId);
} on ChatError catch (e) {
}
```

### 获取群成员列表

群成员可以调用 `ChatGroupManager#fetchMemberListFromServer` 方法从服务器分页获取群成员列表。

示例代码如下：

```dart
try {
  ChatCursorResult<String> result =
      await ChatClient.getInstance.groupManager.fetchMemberListFromServer(
    groupId,
  );
} on ChatError catch (e) {
}
```

### 获取群组列表

用户可以调用 `ChatGroupManager#fetchJoinedGroupsFromServer` 方法从服务器获取自己加入和创建的群组列表。示例代码如下：

```dart
try {
  List<ChatGroup> list =
      await ChatClient.getInstance.groupManager.fetchJoinedGroupsFromServer();
} on ChatError catch (e) {
}
```

用户可以调用 `ChatGroupManager#getJoinedGroups` 方法加载本地群组列表。为了保证数据的正确性，需要先从服务器获取自己加入和创建的群组列表。示例代码如下：

```dart
try {
  List<ChatGroup> list =
      await ChatClient.getInstance.groupManager.getJoinedGroups();
} on ChatError catch (e) {
}
```

用户还可以调用 `ChatGroupManager#fetchPublicGroupsFromServer` 方法从服务器分页获取公开群组列表。示例代码如下：

```dart
try {
  ChatCursorResult<ChatGroupInfo> result =
      await ChatClient.getInstance.groupManager.fetchPublicGroupsFromServer(
    pageSize: pageSize,
    cursor: cursor,
  );
} on ChatError catch (e) {
}
```

### 查询当前用户已加入的群组数量

你可以调用 `ChatGroupManager#fetchJoinedGroupCount` 方法从服务器获取当前用户已加入的群组数量。单个用户可加入群组数量的上限取决于订阅的即时通讯的套餐包，详见[产品价格](/product/pricing.html#套餐包功能详情)。

```dart
void fetchJoinedGroupCount() async {
  try {
    int count =
        await ChatClient.getInstance.groupManager.fetchJoinedGroupCount();
  } on ChatError catch (e) {
    // error.
  }
}
```

### 屏蔽和解除屏蔽群消息

群成员可以屏蔽群消息和解除屏蔽群消息。

#### 屏蔽群消息

群成员可以调用 `ChatGroupManager#blockGroup` 方法屏蔽群消息。屏蔽群消息后，该成员不再从指定群组接收群消息，群主和群管理员不能进行此操作。示例代码如下：

```dart
try {
  await ChatClient.getInstance.groupManager.blockGroup(groupId);
} on ChatError catch (e) {
}
```

#### 解除屏蔽群消息

群成员可以调用 `ChatGroupManager#unblockGroup` 方法解除屏蔽群消息。示例代码如下：

```dart
try {
  await ChatClient.getInstance.groupManager.unblockGroup(groupId);
} on ChatError catch (e) {
}
```

#### 检查自己是否已经屏蔽群消息

群成员可以调用 `ChatGroup#messageBlocked` 字段检查自己是否屏蔽了群消息。为了保证检查结果的准确性，调用该方法前需先从服务器获取群详情，即调用 `ChatGroupManager#fetchGroupInfoFromServer`。


示例代码如下：

```dart
// 获取群组详情
try {
  ChatGroup group = await ChatClient.getInstance.groupManager
      .fetchGroupInfoFromServer(groupId);
  // 检查用户是否屏蔽了该群的消息
  if (group.messageBlocked == true) {

  }
} on ChatError catch (e) {
}
```

### 监听群组事件

`ChatGroupEventHandler` 类中提供群组事件的监听接口。开发者可以通过设置此监听，获取群组中的事件，并做出相应处理。如果不再使用该监听，需要移除，防止出现内存泄漏。

示例代码如下：

```dart
// 添加群组监听
ChatClient.getInstance.groupManager.addEventHandler(
  'UNIQUE_HANDLER_ID',
  ChatGroupEventHandler(
    // 成员设置为管理员的回调。群主、新管理员和其他管理员会收到该回调。
    onAdminAddedFromGroup: (groupId, admin) {},

    // 取消成员的管理员权限的回调。被取消管理员权限的成员、群主和群管理员（除操作者外）会收到该回调。
    onAdminRemovedFromGroup: (groupId, admin) {},

    // 全员禁言状态变化回调。群组所有成员（除操作者外）会收到该回调。
    onAllGroupMemberMuteStateChanged: (groupId, isAllMuted) {},

    // 成员加入群组白名单回调。被添加的成员及群主和群管理员（除操作者外）会收到该回调。
    onAllowListAddedFromGroup: (groupId, members) {},

    // 成员移出群组白名单回调。被移出的成员及群主和群管理员（除操作者外）会收到该回调。
    onAllowListRemovedFromGroup: (groupId, members) {},

    // 群公告更新回调。群组所有成员会收到该回调。
    onAnnouncementChangedFromGroup: (groupId, announcement) {},

    // 群组成员自定义属性有变更。群内其他成员会收到该回调。
    onAttributesChangedOfGroupMember: (groupId, userId, attributes, operatorId) {},

    // 有用户自动同意加入群组。邀请人收到该回调。
    onAutoAcceptInvitationFromGroup: (groupId, inviter, inviteMessage) {},

    // 群组禁用状态变更。
    onDisableChanged: (groupId, isDisable) {},

    // 群组解散。群主解散群组时，所有群成员均会收到该回调。
    onGroupDestroyed: (groupId, groupName) {},

    // 用户同意进群邀请。邀请人收到该回调。
    onInvitationAcceptedFromGroup: (groupId, invitee, reason) {},

    // 用户拒绝进群邀请。邀请人收到该回调。
    onInvitationDeclinedFromGroup: (groupId, invitee, reason) {},

    // 当前用户收到了入群邀请。受邀用户会收到该回调。例如，用户 B 邀请用户 A 入群，则用户 A 会收到该回调。
    onInvitationReceivedFromGroup: (groupId, groupName, inviter, reason) {},

    // 有成员主动退出群。除了退群的成员，其他群成员会收到该回调。
    onMemberExitedFromGroup: (groupId, member) {},

    // 有新成员加入群组。除了新成员，其他群成员会收到该回调。
    onMemberJoinedFromGroup: (groupId, member) {},

    // 有成员被加入群组禁言列表。被禁言的成员及群主和群管理员（除操作者外）会收到该回调。
    onMuteListAddedFromGroup: (groupId, mutes, muteExpire) {},

    // 有成员被移出禁言列表。被解除禁言的成员及群主和群管理员（除操作者外）会收到该回调。
    onMuteListRemovedFromGroup: (groupId, mutes) {},

    // 群主转移权限。新群主会收到该回调。
    onOwnerChangedFromGroup: (groupId, newOwner, oldOwner) {},

    // 对端用户接受当前用户发送的群组申请的回调。当前用户收到该回调。
    onRequestToJoinAcceptedFromGroup: (groupId, groupName, accepter) {},

    // 对端用户拒绝群组申请的回调。当前用户收到该回调。
    onRequestToJoinDeclinedFromGroup: (groupId, groupName, decliner, reason, applicant) {},

    // 对端用户收到了群组申请的回调。当前用户收到该回调。
    onRequestToJoinReceivedFromGroup: (groupId, groupName, applicant, reason) {},

   // 上传了新的群组共享文件。群组所有成员会收到该回调。
    onSharedFileAddedFromGroup: (groupId, sharedFile) {},

    // 删除了群组共享文件。群组所有成员会收到该回调。
    onSharedFileDeletedFromGroup: (groupId, fileId) {},

    // 群详情变更回调。群组所有成员会收到该回调。
    onSpecificationDidUpdate: (group) {},

    // 有成员被移出群组。被踢出群组的成员会收到该回调。
    onUserRemovedFromGroup: (groupId, groupName) {},
  ),
);

// ...

// 移除群组监听
ChatClient.getInstance.groupManager.removeEventHandler('UNIQUE_HANDLER_ID');
```