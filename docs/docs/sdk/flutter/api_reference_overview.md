# API 概览

即时通讯 IM 是一个高度可靠的全球通信平台，用户可以进行一对一单聊、群组聊天或聊天室聊天。用户可以通过发送文本消息、分享图片、音频、视频、文件、表情符号和位置进行沟通。

- `ChatClient` 类是聊天 SDK 的入口，提供登录和登出即时通讯 IM 的方法，并管理 SDK 与聊天服务器之间的连接。
- `ChatManager` 类提供发送和接收消息、管理会话（包括加载和删除会话）以及下载附件的方法。
- `ChatMessage` 类定义消息的属性。
- `ChatConversation` 类提供管理会话的方法。
- `ChatContactManager` 类提供管理聊天联系人（如添加、获取、修改和删除联系人）的方法。
- `ChatGroupManager` 类提供群组管理的方法，如群组创建和解散以及成员管理。
- `ChatRoomManager` 类提供聊天室管理的方法，如加入和离开聊天室、获取聊天室列表，以及管理成员权限。
- `ChatPresenceManager` 类提供管理用户在线状态订阅的方法。
- `ChatThreadManager` 类提供了管理子区的方法，包括创建、解散子区以及成员管理。
- `ChatPushManager` 类提供了配置离线推送服务的方法。
- `ChatUserInfoManager` 类提供了管理用户属性的方法，包括获取和更新用户属性。

如欲了解各类中的方法和参数详情，请点击[这里](https://im.shengwang.cn/sdkdocs/chat1.x/flutter/)。

## 连接与初始化

**ChatClient** 类提供登录和登出即时通讯 IM 的方法和事件，并管理 SDK 与聊天服务器之间的连接。

| 方法             | 描述           |
| :---------------------------------------------- | :------------------------------------------------ |
| init              | 初始化 SDK。             |
| loginWithToken              | 使用用户 ID 和 token 登录聊天服务器。             |
| renewToken          | 更新 token。              |
| logout           | 退出登录账号。               |
| currentUserId         | 获取当前登录用户的用户 ID。              |
| isConnected          | 检查 SDK 是否已连接到聊天服务器。           |
| isLoginBefore          | 检查用户是否已登录聊天应用。             |
| addConnectionEventHandler              | 添加监听。         |
| removeConnectionEventHandler             | 移除监听。         |
| groupManager           | 获取 `ChatGroupManager` 类。               |
| pushManager              | 获取 `ChatPushManager` 类。            |
| chatRoomManager             | 获取 `ChatRoomManager` 类。         |
| chatManager      | 获取 `ChatManager` 类。           |
| userInfoManager           | 获取 `ChatUserInfoManager` 类。            |
| contactManager      | 获取 `ChatContactManager` 类。            |
| presenceManager  | 获取 `ChatPresenceManager` 类。            |
| chatThreadManager      | 获取 `ChatThreadManager` 类。         |

| 事件         | 描述            |
| :------------------------------------------------ | :------------------------------------------------ |
| onConnected            | 成功连接到 IM 服务器时触发的回调。             |
| onDisconnected             |  与 IM 服务器断开连接时触发的回调。           |
| onOfflineMessageSyncStart    | 开始从服务器拉取离线消息时触发。           |
| onOfflineMessageSyncFinish               | 从服务器拉取离线消息结束时触发。           |
| onTokenDidExpire      |  token 已过期时触发。       |
| onTokenWillExpire  | token 即将过期时触发。     |
| onUserAuthenticationFailed               | 鉴权失败回调。             |
| onUserDidChangePassword              | 用户密码变更回调。            |
| onUserDidLoginFromOtherDevice               | 其他设备登录回调。  |
| onUserDidLoginTooManyDevice               | 登录设备过多回调。  |
| onUserDidRemoveFromServer               | 当前用户被服务器移除回调。  |
| onUserKickedByOtherDevice               | 被其他设备踢掉回调。  |

## 发送消息

- `ChatManager` 类提供发送和接收消息、管理会话（包括加载和删除会话）以及下载附件的方法和事件。

- `ChatMessageEvent` 类提供消息状态事件，包括消息发送或下载成功和失败以及上传或下载进度。

- `ChatEventHandler` 类用于监听收消息，已读回执等事件。

| 方法             | 描述             |
| :------------------------------------------------ | :------------------------------------------------ |
| sendMessage            | 发送消息。              |
| sendConversationReadAck      | 向服务器发送会话已读回执。           |
| sendMessageReadAck          | 向服务器发送会话已读回执。              |
| sendGroupMessageReadAck         | 向服务器发送群消息的已读回执。            |
| getConversation           | 根据会话 ID 获取会话对象。              |
| importMessages         | 将消息导入内存和本地数据库。              |
| updateMessage          | 更新本地消息。             |
| downloadAttachment   | 下载消息附件。             |
| downloadThumbnail       | 下载消息缩略图。              |
| loadAllConversations           | 获取所有本地会话。            |
| fetchConversationsByOptions          | 从服务器获取会话列表。            |
| deleteAllMessageAndConversation              | 从本地数据库中删除会话及其本地消息。     |
| deleteRemoteConversation              | 从服务器删除指定会话及其历史消息。       |
| fetchGroupAcks       | 从服务器分页获取群消息的已读回执。              |
| searchMsgsByOptions       | 从本地数据库中检索特定类型的消息。       |
| deleteMessagesBefore       | 根据时间删除本地消息。            |
| reportMessage    | 举报不当消息。             |
| fetchSupportedLanguages         | 查询翻译服务支持的语言。             |
| translateMessage            | 翻译文本消息。             |
| addReaction          | 添加 Reaction。              |
| removeReaction            | 删除 Reaction。              |
| fetchReactionList       | 获取 Reaction 列表。             |
| fetchReactionDetail     | 获取 Reaction 详情。             |
| pinMessage              | 置顶消息。              |
| unpinMessage             | 取消置顶消息。              |
| modifyMessage         | 修改消息。              |
| fetchHistoryMessagesByOption          | 从服务器拉取历史消息。              |
| addEventHandler          | 添加监听器。              |
| removeEventHandler          | 移除监听器。              |

| 事件           | 描述               |
| :-------------------------------------------------- | :-------------------------------------------------- |
| onMessagesReceived          | 当收到消息时触发。              |
| onCmdMessagesReceived      | 当收到透传消息时触发。              |
| onMessagesRead  | 当收到消息的已读回执时触发。            |
| onGroupMessageRead         | 当收到群消息的已读回执时触发。               |
| onReadAckForGroupMessageUpdated      | 当收到群消息已读状态更新时触发。             |
| onMessagesDelivered       | 当收到送达回执时触发。               |
| onMessagesRecalledInfo     | 当收到的消息被撤回时触发。               |
| onMessageReactionDidChange   | 当消息 Reaction 发生变化时触发。               |
| onConversationsUpdate       | 当会话列表更新时触发。               |
| onConversationRead     | 当收到会话已读回执时触发。               |
| onMessagePinChanged     | 当消息置顶状态发生变更时触发。               |
| onMessageContentChanged      | 当消息内容变更时触发。               |

## 消息与会话

- `ChatMessage` 类定义消息的属性。
- `ChatConversation` 类提供管理会话的方法。

| 方法              | 描述              |
| :-------------------------------------------------- | :-------------------------------------------------- |
| Conversation.id | 获取会话 ID。              |
| Conversation.unreadCount| 获取会话中的未读消息数量。              |
| Conversation.markAllMessagesAsRead | 将所有未读消息标记为已读。              |
| Conversation.getLocalMessageCount | 获取本地数据库中会话的所有消息数量。     |
| Conversation.isChatThread | 检查当前会话是否为子区会话。              |
| Conversation.loadMessages | 从本地数据库加载消息，从特定消息 ID 开始。              |
| Conversation.markMessageAsRead | 将特定消息标记为已读。       |
| Conversation.deleteMessage | 在本地数据库中删除特定消息。              |
| Conversation.latestMessage | 获取会话中的最新消息。       |
| Conversation.lastReceivedMessage| 获取会话中的最新接收消息。              |
| Conversation.deleteAllMessages | 删除会话中的所有消息。       |
| Conversation.setExt | 设置会话的扩展字段。             |
| Conversation.ext | 获取会话的扩展字段。             |
| Conversation.insertMessage | 在本地数据库中向会话插入消息。               |
| Conversation.appendMessage | 在本地数据库中将消息插入到会话的末尾。              |
| Conversation.updateMessage| 更新本地数据库中的消息。     |
| Message.status | 消息发送或接收状态。         |
| Message.chatType | 获取聊天消息类型。           |
| Message.body | 消息正文。              |
| Message.serverTime | 服务器接收消息时的 Unix 时间戳。               |
| Message.localTime | 消息的本地时间戳。         |
| Message.isChatThreadMessage | 消息是否为子区消息。         |
| Message.chatThread | 获取子区的概述。         |
| Message.from | 获取消息发送者的用户 ID。     |
| Message.to | 消息接收者的用户 ID。         |
| Message.msgId | 消息ID。              |
| Message.attributes | 消息的扩展属性，类型为字典。               |
| Message.hasRead | 消息是否已读。             |
| Message.hasReadAck | 消息是否已成功送达。       |
| Message.direction | 消息的收发方向。               |
| Message.conversationId | 获取会话 ID。               |
| Message.reactionList | 获取 Reaction 列表。             |
| Message.onlineState| 是否在线消息。              |
| Message.pinInfo | 消息的置顶操作信息。 |

## 联系人

- `ChatContactManager` 类提供管理聊天联系人（如添加、获取、修改和删除联系人）的方法。
- `ChatContactEventHandler` 类提供联系人事件监听。

| 方法              | 描述      |
| :------------------------------------------------- | :------------------------------------------------- |
| fetchAllContacts   | 从服务器获取所有联系人。              |
| addUserToBlockList            | 将用户添加到黑名单。      |
| removeUserFromBlockList         | 从黑名单中移除联系人。             |
| getBlockIds        | 获取本地黑名单。      |
| fetchBlockIds | 从服务器获取黑名单。            |
| acceptInvitation    | 接受好友邀请。              |
| declineInvitation    | 拒绝好友邀请。              |
| getAllContacts     | 从本地数据库获取联系人列表。            |
| getSelfIdsOnOtherPlatform   | 获取登录用户在其他登录设备上唯一 ID |
| addEventHandler        | 添加联系人变更监听。               |
| removeEventHandler        | 删除联系人变更监听。               |

| 事件              | 描述              |
| :--------------------------------------------------- | :-------------------------------------------------- |
| onContactAdded              | 当用户被其他用户添加为联系人时触发。              |
| onContactDeleted              | 当用户被其他用户从联系人列表中移除时触发。    |
| onContactInvited      | 当用户收到好友请求时触发。        |
| onFriendRequestAccepted | 当好友请求被批准时触发。        |
| onFriendRequestDeclined | 当好友请求被拒绝时触发。        |

## 群组

- `ChatGroupManager` 类提供群组管理的方法，如群组创建和解散以及成员管理。
- `ChatGroupEventHandler`类提供群组管理事件监听。

| 方法            | 描述              |
| :-------------------------------------------------- | :-------------------------------------------------- |
| createGroup      | 创建群组。     |
| destroyGroup          | 销毁群组。             |
| leaveGroup          | 离开群组。               |
| joinPublicGroup       | 加入一个公共群组。         |
| addMembers       | 将用户添加到群组中。      |
| removeMembers      | 从群组中移除成员。               |
| fetchGroupInfoFromServer        | 从服务器获取群组信息。              |
| fetchJoinedGroupsFromServer        | 从服务器分页获取当前用户的所有群组。 |
| fetchPublicGroupsFromServer         | 从服务器分页获取公开群组。             |
| changeGroupName         | 更改群组名称。       |
| changeGroupDescription          | 更改群组描述。             |
| acceptInvitation          | 接受群组邀请。              |
| declineInvitation            | 拒绝群组邀请。             |
| acceptJoinApplication        | 批准群组请求。     |
| declineJoinApplication           | 拒绝群组请求。     |
| requestToJoinPublicGroup          | 请求加入公共群组。     |
| blockGroup          | 阻止群组消息。        |
| unblockGroup           | 取消阻止群组消息。      |
| blockMembers         | 将用户添加到群组黑名单。             |
| unblockMembers         | 从群组黑名单中移除用户。             |
| fetchBlockListFromServer           | 获取群组黑名单（带分页）。              |
| fetchMemberListFromServer          | 获取群组成员列表（带分页）。            |
| changeOwner            | 转移群组所有权。             |
| addAdmin         | 添加群组管理员。           |
| removeAdmin         | 移除群组管理员。        |
| muteMembers          | 禁言群组成员。          |
| unMuteMembers          | 取消禁言群组成员。        |
| fetchMuteListFromServer          | 从服务器获取群组禁言列表。            |
| fetchBlockListFromServer           | 从服务器获取群组黑名单（带分页）。        |
| addAllowList            | 将成员添加到白名单列表。               |
| removeAllowList            | 从白名单列表中移除成员。    |
| fetchAllowListFromServer           | 从服务器获取群组白名单列表。               |
| updateGroupAnnouncement            | 更新群组公告。               |
| fetchAnnouncementFromServer            | 从服务器获取群组公告。            |
| uploadGroupSharedFile           | 上传群组共享文件。              |
| fetchGroupFileListFromServer            | 从服务器获取共享文件列表。              |
| removeGroupSharedFile           | 移除群组共享文件。              |
| downloadGroupSharedFile           | 下载群组共享文件。              |
| getJoinedGroups           | 获取当前用户的所有群组（从缓存中）。           |
| addEventHandler            | 添加监听器。            |
| removeEventHandler     | 移除监听器。            |

| 事件              | 描述              |
| :------------------------------------------------- | :------------------------------------------------- |
| onInvitationReceivedFromGroup           | 当用户收到群组邀请时触发。     |
| onRequestToJoinReceivedFromGroup       | 当群组所有者或管理员收到用户的加入请求时触发。 |
| onRequestToJoinAcceptedFromGroup           | 当群组请求被接受时触发。    |
| onRequestToJoinDeclinedFromGroup         | 当群组请求被拒绝时触发。    |
| onInvitationAcceptedFromGroup           | 当群组邀请被接受时触发。              |
| onInvitationDeclinedFromGroup           | 当群组邀请被拒绝时触发。 |
| onAutoAcceptInvitationFromGroup       | 当群组邀请自动接受时触发。         |
| onAdminRemovedFromGroup       | 当前用户被群组管理员移除时触发。         |
| onMuteListAddedFromGroup            | 当一个或多个群组成员被禁言时触发。            |
| onMuteListRemovedFromGroup             | 当一个或多个群组成员被取消禁言时触发。    |
| onAllowListAddedFromGroup          | 当一个或多个群组成员被添加到白名单列表时触发。             |
| onAllowListRemovedFromGroup          | 当一个或多个成员从白名单列表中移除时触发。               |
| onAllGroupMemberMuteStateChanged           | 当所有群组成员被禁言或取消禁言时触发。              |
| onAdminAddedFromGroup         | 当某个成员被设置为管理员时触发。    |
| onAdminRemovedFromGroup    | 当某个成员的管理员权限被移除时触发。             |
| onOwnerChangedFromGroup            | 当群组所有权被转移时触发。             |
| onMemberJoinedFromGroup     | 当某个成员加入群组时触发。         |
| onMemberExitedFromGroup     | 当某个成员主动离开群组时触发。    |
| onAnnouncementChangedFromGroup              | 当公告被更新时触发。    |
| onSharedFileAddedFromGroup              | 当共享文件被添加到群组时触发。              |
| onSharedFileDeletedFromGroup     | 当共享文件从群组中移除时触发。    |
| onSpecificationDidUpdate            | 当群组详细信息被更新时触发。             |
| onDisableChanged     | 当群组被启用或禁用时触发。               |

## 聊天室

- `ChatRoomManager` 类提供聊天室管理的方法，如加入和离开聊天室、获取聊天室列表，以及管理成员权限。
- `ChatRoomEventHandler` 类提供聊天室事件监听。

| 方法              | 描述               |
| :------------------------------------------------------- | :------------------------------------------------------- |
| createChatRoom         | 创建聊天室。              |
| destroyChatRoom         | 销毁聊天室。             |
| joinChatRoom          | 加入聊天室。            |
| leaveChatRoom        | 退出聊天室。            |
| fetchPublicChatRoomsFromServer          | 从服务器获取聊天室数据，支持分页。             |
| fetchChatRoomInfoFromServer            | 从服务器获取聊天室的详细信息。     |
| changeChatRoomName            | 修改聊天室名称。            |
| changeChatRoomDescription          | 修改聊天室描述。    |
| fetchChatRoomMembers          | 获取聊天室成员列表。        |
| muteChatRoomMembers            | 在聊天室中禁言成员。          |
| unMuteChatRoomMembers            | 在聊天室中取消禁言成员。        |
| addChatRoomAdmin          | 添加聊天室管理员。           |
| removeChatRoomAdmin           | 移除聊天室管理员的管理权限。              |
| fetchChatRoomMuteList           | 从服务器获取禁言聊天室成员列表。            |
| removeChatRoomMembers           | 从聊天室中移除成员。      |
| blockChatRoomMembers             | 将成员添加到聊天室的黑名单中。              |
| unBlockChatRoomMembers             | 从聊天室的黑名单中移除成员。            |
| fetchChatRoomBlockList             | 获取聊天室黑名单，支持分页。              |
| addMembersToChatRoomAllowList             | 将成员添加到聊天室的白名单中。              |
| removeMembersFromChatRoomAllowList            | 从聊天室的白名单中移除成员。              |
| fetchChatRoomAllowListFromServer            | 从服务器获取聊天室的白名单。              |
| muteAllChatRoomMembers           | 禁言所有成员。            |
| unMuteAllChatRoomMembers              | 取消禁言所有成员。              |
| updateChatRoomAnnouncement             | 更新聊天室公告。    |
| fetchChatRoomAnnouncement             | 从服务器获取聊天室公告。              |
| addAttributes           | 添加自定义聊天室属性。      |
| removeAttributes             | 设置自定义聊天室属性。     |
| fetchChatRoomAttributes            | 根据属性键列表获取聊天室的自定义属性列表。 |
| addEventHandler           | 添加监听器。            |
| removeEventHandler           | 移除监听器。            |

| 事件               | 描述             |
| :------------------------------------------------- | :------------------------------------------------- |
| onRemovedFromChatRoom           | 当前用户被移出聊天室时触发。    |
| onMemberJoinedFromChatRoom               | 当其他成员加入聊天室时触发。             |
| onMemberExitedFromChatRoom          | 当其他成员退出聊天室时触发。             |
| onMuteListAddedFromChatRoom             | 当聊天室成员被添加到禁言列表时触发。      |
| onMuteListRemovedFromChatRoom              | 当聊天室成员从禁言列表中移除时触发。  |
| onAllowListAddedFromChatRoom            | 当聊天室成员被添加到白名单时触发。     |
| onAllowListRemovedFromChatRoom             | 当聊天室成员从白名单中移除时触发。 |
| onAllChatRoomMemberMuteStateChanged              | 当聊天室中的全员禁言状态变更时触发。          |
| onAdminAddedFromChatRoom               | 当聊天室成员被设置为管理员时触发。             |
| onAdminRemovedFromChatRoom               | 当聊天室成员从管理员列表中移除时触发。 |
| onOwnerChangedFromChatRoom               | 当聊天室的拥有者更改时触发。             |
| onAnnouncementChangedFromChatRoom              | 当聊天室公告更改时触发。            |
| onSpecificationChanged            | 当聊天室详情更改时触发。              |
| onAttributesUpdated                | 当自定义聊天室属性更新时触发。           |
| onAttributesRemoved               | 当自定义聊天室属性被移除时触发。           |

## 用户在线状态订阅

- `ChatPresenceManager` 类提供管理用户在线状态订阅的方法。
- `ChatPresenceEventHandler` 类提供订阅用户状态变更监听。

| 方法            | 描述            |
| :-------------------------------------------------------- | :--------------------------------------------------- |
| publishPresence    | 发布自定义的在线状态。            |
| subscribe    | 订阅用户的在线状态。       |
| unsubscribe | 取消订阅用户的在线状态。              |
| fetchSubscribedMembers   | 使用分页获取已订阅的用户的列表。 |
| fetchPresenceStatus           | 获取用户的当前在线状态。     |
| addEventHandler        | 添加监听器。            |
| removeEventHandler   | 移除监听器。            |

| 事件              | 描述    |
| :------------------------------------------------ | :------------------------------------------------ |
| onPresenceStatusChanged | 当订阅的用户的在线状态更新时触发。 |

## 子区

- `ChatThreadManager` 类提供了管理子区的方法，包括创建、解散子区以及成员管理。
- `ChatThreadEvent` 类提供子区事件监听。

| 方法               | 描述             |
| :---------------------------------------------------------- | :------------------------------------------------------- |
| createChatThread         | 创建子区。             |
| joinChatThread     | 加入子区。               |
| destroyChatThread     | 销毁子区。              |
| leaveChatThread        | 离开子区。              |
| fetchChatThread         | 从服务器获取子区的详细信息。             |
| updateChatThreadName           | 更改子区的名称。             |
| removeMemberFromChatThread             | 从子区中移除成员。           |
| fetchChatThreadMembers           | 分页获取子区中的成员列表。            |
| fetchJoinedChatThreads         | 分页获取当前用户已加入的子区列表。        |
| fetchJoinedChatThreadsWithParentId       | 分页获取当前用户在指定组中已加入的子区列表。               |
| fetchChatThreadsWithParentId            | 分页获取指定组中的子区列表。             |
| fetchLatestMessageWithChatThreads           | 从服务器获取指定子区的最后一条回复。              |
| addEventHandler           | 添加监听器。            |
| removeEventHandler   | 移除监听器。            |

| 事件               | 描述               |
| :------------------------------------------------------ | :--------------------------------------------------------- |
| onChatThreadCreate    | 当子区被创建时触发。              |
| onChatThreadUpdate   | 当子区被更新时触发。              |
| onChatThreadDestroy  | 当子区被销毁时触发。            |
| onUserKickOutOfChatThread | 当当前用户被群主或群管理员从子区中移除时触发。 |

## 离线推送

`PushManager` 类提供了配置离线推送服务的方法。

| 方法              | 描述            |
| :---------------------------------------------------------- | :---------------------------------------------------- |
| fetchPushConfigsFromServer  | 从服务器获取推送配置。              |
| updatePushNickname    | 更新当前用户的推送显示昵称。            |
| setConversationSilentMode      | 修改会话的免打扰设置。              |
| removeConversationSilentMode          | 清除会话的离线推送通知类型设置。 |
| fetchConversationSilentMode    | 获取会话的免打扰设置。     |
| setSilentModeForAll   | 设置当前登录用户的免打扰设置。             |
| fetchSilentModeForAll   | 获取当前登录用户的免打扰设置。              |
| fetchSilentModeForConversations     | 批量获取指定会话的免打扰设置。            |
| bindDeviceToken         | 绑定 APNs Token。            |

## 用户属性

`UserInfoManager` 类提供了管理用户属性的方法，包括获取和更新用户属性。

| 方法              | 描述      |
| :------------------------------------------------- | :------------------------------------------------- |
| fetchOwnInfo  | 获取当前用户的用户属性           |
| updateUserInfo   | 修改当前用户的用户属性。              |
| fetchUserInfoById      | 根据用户 ID 获取用户属性。            |
