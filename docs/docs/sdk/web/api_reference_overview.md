# API 概览

即时通讯 IM 是一个高度可靠的全球通信平台，用户可以进行一对一单聊、群组聊天或聊天室聊天。用户可以通过发送文本消息、分享图片、音频、视频、文件、表情符号和位置进行沟通。

- `chatClient` 是聊天 SDK Connection 类的实例，提供登录和登出即时通讯 IM 的方法，并管理 SDK 与聊天服务器之间的连接，同时也提供管理联系人，群组，聊天室等的方法 。
- `Message` 类提供创建消息的方法。

如欲了解各模块中的方法和参数详情，请点击[这里](https://im.shengwang.cn/sdkdocs/chat1.x/unity/)。

## 连接与初始化

`chatClient` 提供登录和登出即时通讯 IM 的方法和事件，并管理 SDK 与聊天服务器之间的连接。

| 方法               | 描述                                                                                                 |
| :----------------- | :--------------------------------------------------------------------------------------------------- |
| open               | 使用用户 ID 和 token 登录聊天服务器。                                                                |
| renewToken         | 更新 token。                                                                                         |
| close              | 退出登录账号。                                                                                       |
| isOpened           | 检查 SDK 是否已连接到聊天服务器。                                                                    |
| addEventHandler    | 添加监听。                                                                                           |
| removeEventHandler | 移除监听。                                                                                           |
| onShow             | 在小程序或者 uniApp 中，在应用的 onShow 声命周期中执行这个方法，这个方法会主动检测当前连接是否有效。 |

| 事件                       | 描述                               |
| :------------------------- | :--------------------------------- |
| onConnected                | 成功连接到 IM 服务器时触发的回调。 |
| onDisconnected             | 与 IM 服务器断开连接时触发的回调。 |
| onReconnecting             | 正在重连的回调。                   |
| onOfflineMessageSyncStart  | 开始从服务器拉取离线消息时触发。   |
| onOfflineMessageSyncFinish | 从服务器拉取离线消息结束时触发。   |
| onTokenExpired             | token 已过期时触发。               |
| onTokenWillExpire          | token 即将过期时触发。             |

## 发送消息

- `chatClient` 提供发送和接收消息、管理会话（包括加载和删除会话）以及下载附件的方法和事件。
- `Message` 类提供创建消息的方法。
- `EventHandler` 类用于监听收消息，已读回执等事件。

| 方法                              | 描述                         |
| :-------------------------------- | :--------------------------- |
| send                              | 发送消息。                   |
| Message.create                    | 创建消息。                   |
| deleteAllMessagesAndConversations | 清除全部会话及其聊天记录。   |
| getGroupMsgReadUser               | 查询哪些成员读取了群组消息。 |
| getHistoryMessages                | 从服务器拉取历史消息。       |
| removeHistoryMessages             | 删除历史消息。               |
| recallMessage                     | 撤回消息。                   |
| reportMessage                     | 举报不当消息。               |
| getSupportedLanguages             | 查询翻译服务支持的语言。     |
| translateMessage                  | 翻译文本消息。               |
| addReaction                       | 添加 Reaction。              |
| deleteReaction                    | 删除 Reaction。              |
| getReactionlist                   | 获取 Reaction 列表。         |
| getReactionDetail                 | 获取 Reaction 详情。         |
| pinMessage                        | 置顶消息。                   |
| unpinMessage                      | 取消置顶消息。               |
| getServerPinnedMessages           | 分页获取会话中的置顶消息。   |
| modifyMessage                     | 修改消息。                   |

| 事件                       | 描述                                               |
| :------------------------- | :------------------------------------------------- |
| onTextMessage              | 当收到文本消息时触发。                             |
| onAudioMessage             | 当收到音频消息时触发。                             |
| onVideoMessage             | 当收到视频消息时触发。                             |
| onImageMessage             | 当收到图片消息时触发。                             |
| onCmdMessage               | 当收到透传消息时触发。                             |
| onCustomMessage            | 当收到自定义消息时触发。                           |
| onFileMessage              | 当收到文件消息时触发。                             |
| onLocationMessage          | 当收到位置消息时触发。                             |
| onStatisticMessage         | 当收到统计消息时触发。                             |
| onReceivedMessage          | 当收到消息已到达服务器的确认消息时触发。           |
| onDeliveredMessage         | 当收到消息已被对方收到的确认消息时触发。           |
| onReadMessage              | 当收到消息已被对方阅读的确认消息时触发。           |
| onChannelMessage           | 当收到整个会话所有消息都置为已读的确认消息时触发。 |
| onRecallMessage            | 当收到撤回消息通知时触发。                         |
| onModifiedMessage          | 当收到修改消息通知时触发。                         |
| onMessagePinEvent          | 当收到置顶消息通知时触发。                        |
| onReactionChange           | 当消息的 Reaction 发生变化时触发。                 |
| onOfflineMessageSyncStart  | 开始从服务器拉取离线消息时触发。                   |
| onOfflineMessageSyncFinish | 从服务器拉取离线消息结束时触发。                   |

## 会话

`chatClient` 提供管理会话的方法。

| 方法                              | 描述                                       |
| :-------------------------------- | :----------------------------------------- |
| deleteConversation                | 删除会话。                                 |
| getServerConversations            | 分页获取服务器会话列表。                   |
| getServerPinnedConversations      | 分页获取服务器端的置顶会话列表。           |
| pinConversation                   | 设置是否置顶会话。                         |
| addConversationMark               | 标记会话。                                 |
| removeConversationMark            | 取消标记会话。                             |
| getServerConversationsByFilter    | 根据会话过滤选项从服务器分页查询会话列表。 |
| deleteAllMessagesAndConversations | 清除全部会话及其聊天记录。                 |
| getLocalConversations             | 获取本地会话列表。                         |
| getLocalConversation              | 获取单个本地会话。                         |
| removeLocalConversation           | 删除单个本地会话。                         |
| setLocalConversationCustomField   | 设置本地会话自定义字段。                   |
| clearConversationUnreadCount      | 对本地会话的未读消息数清零。               |

## 联系人

- `chatClient` 提供管理聊天联系人（如添加、获取、修改和删除联系人）的方法。
- `EventHandler` 类提供联系人事件监听。

| 方法                    | 描述                   |
| :---------------------- | :--------------------- |
| addContact              | 添加好友。             |
| deleteContact           | 删除指定好友。         |
| declineContactInvite    | 拒绝好友申请。         |
| acceptContactInvite     | 接受好友申请。         |
| getContacts             | 获取联系人列表。       |
| getContactsWithCursor   | 分页获取联系人列表。   |
| addUsersToBlocklist     | 添加联系人至黑名单。   |
| removeUserFromBlocklist | 将联系人从黑名单移除。 |
| getBlocklist            | 获取黑名单列表。       |
| setContactRemark        | 设置好友备注。         |
| addEventHandler         | 添加联系人变更监听。   |
| removeEventHandler      | 删除联系人变更监听。   |

| 事件             | 描述                     |
| :--------------- | :----------------------- |
| onContactInvited | 当收到好友请求时触发。   |
| onContactAgreed  | 当好友请求被接受时触发。 |
| onContactRefuse  | 当好友请求被拒绝时触发。 |
| onContactAdded   | 当添加好友成功后触发。   |
| onContactDeleted | 当删除好友成功后触发。   |

## 群组

- `chatClient` 提供群组管理的方法，如群组创建和解散以及成员管理。
- `EventHandler`类提供群组管理事件监听。

| 方法                       | 描述                                                                                     |
| :------------------------- | :--------------------------------------------------------------------------------------- |
| joinGroup                  | 申请加入群组。                                                                           |
| acceptGroupJoinRequest     | 同意用户加入群。仅群主和管理员可调用此方法。                                             |
| rejectGroupJoinRequest     | 拒绝入群申请。仅群主和管理员可调用此方法。                                               |
| inviteUsersToGroup         | 邀请用户加群。                                                                           |
| acceptGroupInvite          | 接受入群邀请。                                                                           |
| rejectGroupInvite          | 拒绝入群邀请。                                                                           |
| leaveGroup                 | 离开群组。                                                                               |
| getJoinedGroups            | 列出某用户加入的所有群组。                                                               |
| getPublicGroups            | 分页获取公开群。                                                                         |
| createGroup                | 创建群组。                                                                               |
| destroyGroup               | 解散群组。仅群主可调用此方法。                                                           |
| changeGroupOwner           | 转让群组。仅群主可调用此方法。                                                           |
| modifyGroup                | 修改群信息。仅群组管理员可调用此方法。                                                   |
| getGroupInfo               | 获取群组详情。                                                                           |
| fetchGroupAnnouncement     | 获取群公告。                                                                             |
| updateGroupAnnouncement    | 更新群公告。                                                                             |
| getGroupAdmin              | 获取群组下所有管理员。                                                                   |
| setGroupAdmin              | 设置群管理员。仅群主可调用此方法。                                                       |
| removeGroupAdmin           | 移除群管理员。仅群主可调用此方法。                                                       |
| blockGroupMember           | 将单个成员加入群组黑名单。仅群主和管理员可调用此方法。                                   |
| blockGroupMembers          | 批量添加成员至群组黑名单。仅群组管理员可调用此方法。                                     |
| unblockGroupMember         | 将单个成员从群组黑名单移除。仅群组管理员可调用此方法。                                   |
| unblockGroupMembers        | 将成员批量移出群组黑名单。仅群主和管理员可调用此方法。                                   |
| getGroupBlocklist          | 获取群组黑名单。                                                                         |
| muteGroupMember            | 将一个组成员禁言。仅群主和管理员可调用此方法。                                           |
| unmuteGroupMember          | 解除禁言。仅群主和管理员可调用此方法。                                                   |
| getGroupMutelist           | 获取群组的禁言列表。                                                                     |
| disableSendGroupMsg        | 设置全员禁言。仅群组管理员及以上身份可调用此方法。                                       |
| enableSendGroupMsg         | 解除全员禁言。仅群组管理员及以上身份可调用此方法。                                       |
| addUsersToGroupAllowlist   | 添加白名单。白名单里的成员可以在群禁言之后继续发言。仅群组管理员及以上身份可调用此方法。 |
| removeGroupAllowlistMember | 移除白名单。仅群组管理员及以上身份可调用此方法。                                         |
| getGroupAllowlist          | 获取群组白名单列表。仅群组管理员及以上身份可调用此方法。                                 |
| isInGroupAllowlist         | 检查当前用户是否在群组白名单中。app 管理员可查询所有用户是否在群组白名单中；app 普通用户可查询自己是否在群组白名单中。          |
| setGroupMemberAttributes   | 设置群成员自定义属性。                                                                   |
| getGroupMemberAttributes   | 获取单个群成员所有自定义属性。                                                           |
| getGroupMembersAttributes  | 根据指定的属性 key 获取多个群成员的自定义属性。                                          |

| 事件         | 描述                     |
| :----------- | :----------------------- |
| onGroupEvent | 当有群组事件发生时触发。 |

## 聊天室

- `chatClient` 提供聊天室管理的方法，如加入和离开聊天室、获取聊天室列表，以及管理成员权限。
- `EventHandler` 类提供聊天室事件监听。

| 方法 | 描述 |
| :-------------------------------- | :----------------- |
| joinChatRoom | 加入聊天室。 |
| leaveChatRoom | 离开聊天室。 |
| getChatRooms | 分页获取聊天室列表。 |
| listChatRoomMembers | 分页列出聊天室的所有成员。 |
| modifyChatRoom | 修改聊天室详情。 |
| fetchChatRoomAnnouncement | 获取聊天室公告。 |
| updateChatRoomAnnouncement | 更新聊天室公告。 |
| setChatRoomAdmin | 设置聊天室管理员。该方法只有聊天室所有者才有权限调用。 |
| removeChatRoomAdmin | 移除聊天室管理员。该方法只有聊天室所有者才有权限调用。 |
| getChatRoomAdmin | 获取聊天室的所有管理员。 |
| blockChatRoomMember | 添加单个成员至聊天室黑名单。仅聊天室所有者和管理员有权限调用该方法。 |
| unblockChatRoomMember | 将单个用户从聊天室黑名单移除。仅聊天室所有者和管理员有权限调用该方法。 |
| blockChatRoomMembers | 批量添加成员至聊天室黑名单。仅聊天室所有者和管理员有权限调用该方法。 |
| unblockChatRoomMembers | 批量将成员从聊天室黑名单移除。仅聊天室所有者和管理员有权限调用该方法。 |
| getChatRoomBlocklist | 获取聊天室黑名单。 |
| muteChatRoomMember | 禁止聊天室用户发言。该方法只有聊天室所有者才有权限调用。 |
| unmuteChatRoomMember | 解除对聊天室用户的禁言。仅聊天室所有者和管理员有权限调用该方法。 |
| disableSendChatRoomMsg | 聊天室全员禁言。仅聊天室创建者和管理员可调用此方法。 |
| enableSendChatRoomMsg | 聊天室解除全员禁言。仅聊天室创建者和管理员可调用此方法。 |
| getChatRoomMutelist | 获取聊天室所有被禁言成员。 |
| addUsersToChatRoomAllowlist | 批量增加聊天室白名单成员。仅聊天室所有者和管理员有权限调用该方法。 |
| removeChatRoomAllowlistMember | 批量移除聊天室白名单成员。仅聊天室所有者和管理员有权限调用该方法。 |
| isInChatRoomAllowlist | 查询聊天室成员是否是在白名单中。普通成员可查询自己是否在聊天室白名单中；聊天室所有者和管理员可查询其他成员是否在白名单中。 |
| getChatRoomAllowlist | 获取聊天室白名单列表。仅聊天室所有者和管理员有权调用该方法。 |
| setChatRoomAttribute | 设置单个聊天室自定义属性。 |
| setChatRoomAttributes | 批量设置聊天室属性。 |
| removeChatRoomAttribute | 移除单个聊天室自定义属性。 |
| removeChatRoomAttributes | 批量移除聊天室属性。 |
| getChatRoomAttributes | 获取聊天室全部的自定义属性。 |
| getJoinedChatRooms | 获取用户加入的聊天室列表 |

| 事件            | 描述                   |
| :-------------- | :--------------------- |
| onChatroomEvent | 当有聊天室事件时触发。 |

## 用户在线状态订阅

- `chatClient` 提供管理用户在线状态订阅的方法。
- `EventHandler` 类提供订阅用户状态变更监听。

| 方法                      | 描述                                                                     |
| :------------------------ | :----------------------------------------------------------------------- |
| publishPresence           | 发布自定义在线状态。                                                     |
| subscribePresence         | 订阅指定用户的在线状态。订阅成功后，在线状态变更时订阅者会收到回调通知。 |
| unsubscribePresence       | 取消订阅指定用户的在线状态。                                             |
| getSubscribedPresencelist | 分页查询当前用户订阅了哪些用户的在线状态。                               |
| getPresenceStatus         | 查询指定用户的当前在线状态。                                             |

| 事件                   | 描述                                 |
| :--------------------- | :----------------------------------- |
| onPresenceStatusChange | 当订阅的用户在线状态发生变化时触发。 |

## 子区

- `chatClient` 提供了管理子区的方法，包括创建、解散子区以及成员管理。
- `EventHandler` 类提供子区事件监听。

| 方法                     | 描述                                                   |
| :----------------------- | :----------------------------------------------------- |
| createChatThread         | 创建子区。                                             |
| joinChatThread           | 加入子区。                                             |
| leaveChatThread          | 退出子区。                                             |
| destroyChatThread        | 解散子区。仅子区所属群组的群主和管理员可以调用该方法。 |
| changeChatThreadName     | 修改子区名称。                                         |
| getChatThreadMembers     | 分页获取子区成员。                                     |
| removeChatThreadMember   | 移除子区成员。                                         |
| getJoinedChatThreads     | 分页获取当前用户加入的子区列表。                       |
| getChatThreads           | 分页获取当前用户加入指定群组的子区列表。               |
| getChatThreadLastMessage | 批量获取指定子区中的最新一条消息。                     |
| getChatThreadDetail      | 获取子区详情。                                         |

| 事件               | 描述                   |
| :----------------- | :--------------------- |
| onChatThreadChange | 当子区发生变化时触发。 |

## 离线推送

`chatClient` 类提供了配置离线推送服务的方法。

| 方法                           | 描述                             |
| :----------------------------- | :------------------------------- |
| setSilentModeForAll            | 设置当前登录用户的免打扰设置。   |
| getSilentModeForAll            | 获取当前用户的免打扰设置。       |
| setSilentModeForConversation   | 设置会话的免打扰。               |
| clearRemindTypeForConversation | 清除会话的离线推送提醒类型设置。 |
| getSilentModeForConversation   | 获取会话的免打扰设置。           |
| getSilentModeForConversations  | 批量获取指定会话的免打扰设置。   |
| setPushPerformLanguage         | 设置用户推送翻译语言。           |
| getPushPerformLanguage         | 获取用户设置的推送翻译语言。     |

## 用户属性

`chatClient` 类提供了管理用户属性的方法，包括获取和更新用户属性。

| 方法              | 描述                       |
| :---------------- | :------------------------- |
| updateUserInfo    | 修改当前用户的用户属性。   |
| fetchUserInfoById | 根据用户 ID 获取用户属性。 |

## 事件监听

`EventHandler`类提供事件监听方法。

| 方法               | 描述           |
| :----------------- | :------------- |
| addEventHandler    | 添加事件监听。 |
| removeEventHandler | 移除事件监听。 |
