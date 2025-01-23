# API 概览

即时通讯 IM 是一个高度可靠的全球交流平台，你的用户可以在其中进行单聊、群组或聊天室聊天。用户通过短信进行交流，共享图像、音频、视频、文件、表情符号和位置。

- `ChatClient` 类是聊天 SDK 的入口，提供允许你登录和注销聊天应用程序以及管理 SDK 和聊天服务器之间的连接的方法。
- `ChatManager` 类提供允许你发送和接收消息、管理会话和下载附件的方法。
- `ChatMessage` 类定义消息属性。
- `ChatConversation` 类提供会话管理方法。
- `ChatContactManager` 类提供聊天联系人管理方法，例如添加、检索、修改和删除联系人。
- `ChatGroupManager` 类提供群组管理方法，如群组创建、解散以及成员管理。
- `ChatRoomManager` 类提供聊天室管理方法，如加入和离开聊天室和检索聊天室列表，并管理成员权限。
- `ChatPresenceManager` 类提供管理用户在线装填订阅的方法。
- `ChatPushManager` 类提供了允许你管理离线推送服务的方法。
- `ChatUserInfoManager` 类提供用户属性管理方法，包括获取和更新用户属性。

如欲了解各类中的方法和参数详情，请点击[这里](https://im.shengwang.cn/sdkdocs/chat1.x/ios/)。

## 连接与初始化

`ChatClient` 类提供登录和登出即时通讯 IM 的方法和事件，并管理 SDK 与聊天服务器之间的连接。

| 方法 | 描述 |
| :----- | :---------- |
| getInstance | 聊天客户端类。该类是 IM SDK 的入口，负责登录、登出及管理 SDK 与聊天服务器之间的连接。 |
| getEventEmitter | 聊天客户端类。该类是 IM SDK 的入口，负责登录、登出及管理 SDK 与 IM 服务器之间的连接。 |
| setNativeListener | 聊天客户端类。该类是 IM SDK 的入口，负责登录、登出及管理 SDK 与 IM 服务器之间的连接。 |
| version | 聊天客户端类。该类是聊天 SDK 的入口，负责登录、登出及管理 SDK 与 IM 服务器之间的连接。 |
| options | 获取 SDK 配置项。 |
| currentUserName | 获取当前登录用户的用户 ID。 |
| init | 初始化 SDK。 |
| isConnected | 检查 SDK 是否连接到 IM 服务器。 |
| getCurrentUsername | 从服务器获取当前登录用户的用户 ID。 |
| isLoginBefore | 检查当前用户是否登录。 |
| getAccessToken | 获取登录 token。 |
| createAccount | 注册新用户（开放注册）。 |
| loginWithToken | 通过用户 ID 和 token 登录。 |
| loginWithAgoraToken | 通过用户 ID 和 token 登录。 |
| renewAgoraToken | 更新声网 token。 |
| logout | 退出登录。 |
| changeAppId | 更新 app ID。 |
| compressLogs | 压缩日志文件。 |
| getLoggedInDevicesFromServer | 获取指定账号下登录的在线设备列表。 |
| kickDevice | 将特定账号登录的指定设备下线。 |
| kickAllDevices | 将指定账号登录的所有设备都踢下线。 |
| updatePushConfig | 更新推送设置。 |
| addConnectionListener | 设置连接状态监听器。 |
| removeConnectionListener | 移除连接状态监听器。 |
| removeAllConnectionListener | 移除所有连接状态监听器。 |
| addMultiDeviceListener | 添加多设备监听器。 |
| removeMultiDeviceListener | 移除指定多设备监听器。 |
| removeAllMultiDeviceListener | 移除所有多设备监听器。 |
| addCustomListener | 添加自定义监听器，接收 Android 或者 iOS 设备发到 React Native 层的数据。 |
| removeCustomListener | 移除自定义监听，不再接收 Android 或者 iOS 设备发到 React Native 层的数据。 |
| removeAllCustomListener | 移除所有自定义监听器。 |
| addExceptListener | 增加错误监听器。 |
| removeExceptListener | 移除错误监听器。 |
| removeAllExceptListener | 移除所有错误监听器。 |
| chatManager | 获取聊天管理器对象。 |
| groupManager | 获取群组管理器类。 |
| contactManager | 获取联系人管理器类。 |
| pushManager | 获取推送管理器类。 |
| userManager | 获取用户信息管理器类。 |
| roomManager | 获取聊天室管理器类。 |
| presenceManager | 获取在线状态管理器类。 |

`ChatConnectEventListener` 连接监听器，监听和服务器之间的事件变化和通知。

| 事件 | 描述 |
| :----- | :---------- |
| onConnected | 成功连接到 IM 服务器时触发的回调。 |
| onDisconnected | 与 IM 服务器断开连接时触发的回调。 |
| onTokenWillExpire | 声网 token 即将过期时触发。 |
| onTokenDidExpire | 声网 token 已过期时触发。 |
| onAppActiveNumberReachLimit | 应用程序的日活跃用户数量（DAU）或月活跃用户数量（MAU）达到上限时回调。 |
| onOfflineMessageSyncStart | 开始接收离线消息的时候触发。 |
| onOfflineMessageSyncFinish | 结束接收离线消息的时候触发。 |
| onUserDidLoginFromOtherDevice | 其他设备登录通知。 |
| onUserDidLoginFromOtherDeviceWithInfo | 用户在其它设备登录。 |
| onUserDidRemoveFromServer | 用户被移除通知。 |
| onUserDidForbidByServer | 被服务器禁止连接通知。 |
| onUserDidChangePassword | 用户密码变更通知。 |
| onUserDidLoginTooManyDevice | 登录设备数量超限通知。 |
| onUserKickedByOtherDevice | 被其他设备踢掉通知。 |
| onUserAuthenticationFailed | 鉴权失败通知。典型触发通知场景：token 过期、token 验证失败。 |

`ChatMultiDeviceEventListener` 多设备监听器，监听当前账号多个设备的状态变化和通知。

| 事件 | 描述 |
| :----- | :---------- |
| onContactEvent | 联系人事件监听回调。 |
| onGroupEvent | 群组事件监听回调。 |
| onThreadEvent | 子区事件监听回调。 |
| onMessageRemoved | 会话删除漫游消息后，其他设备收到该通知。 |
| onConversationEvent | 会话操作发生后，其他设备收到该通知。 |

| 事件 | 描述 |
| :----- | :---------- |
| onDataReceived | 自定义事件监听器。 |

## 消息

`ChatManager` 消息管理器，管理发送、接收、撤销、搜索等消息相关操作。

| 方法 | 描述 |
| :----- | :---------- |
| setNativeListener | 聊天管理类，该类负责收发消息、管理会话（加载，删除等）、下载消息附件等。 |
| addMessageListener | 添加消息监听器。 |
| removeMessageListener | 移除消息监听器。 |
| removeAllMessageListener | 移除所有消息监听器。 |
| sendMessage | 发送一条消息。 |
| resendMessage | 重发消息。 |
| sendMessageReadAck | 发送消息的已读回执。 |
| sendGroupMessageReadAck | 发送群消息已读回执。 |
| sendConversationReadAck | 发送会话的已读回执。 |
| recallMessage | 撤回发送成功的消息。 |
| getMessage | 从本地数据库获取指定 ID 的消息对象。 |
| markAllConversationsAsRead | 将所有的会话都设成已读。 |
| getUnreadCount | 获取未读消息数。 |
| insertMessage | 在本地会话中插入一条消息。 |
| updateMessage | 更新本地消息。 |
| importMessages | 将消息导入本地数据库。 |
| downloadAttachmentInCombine | 下载消息附件。 |
| downloadThumbnailInCombine | 下载消息缩略图。 |
| downloadAttachment | 下载消息附件。 |
| downloadThumbnail | 下载消息的缩略图。 |
| fetchHistoryMessages | 分页获取指定会话的历史消息。 |
| fetchHistoryMessagesByOptions | 根据消息拉取参数配置从服务器分页获取指定会话的历史消息。 |
| searchMsgFromDB | 从本地数据库获取指定会话中包含特定关键字的消息。 |
| getMsgsWithKeyword | 获取所有会话在一定时间内的会话中发送的消息。 |
| fetchGroupAcks | 分页从服务器获取消息已读回执。 |
| removeConversationFromServer | 删除服务端的指定会话及其历史消息。 |
| getConversation | 根据会话 ID 和会话类型获取会话。 |
| getAllConversations | 获取本地数据库中所有会话。 |
| fetchAllConversations | 从服务器获取会话列表。 |
| deleteConversation | 删除指定会话及其本地历史消息。 |
| getLatestMessage | 从会话中获取最新消息。 |
| getLatestReceivedMessage | 获取最新收到的会话消息。 |
| getConversationUnreadCount | 获取会话未读消息数。 |
| getConversationMessageCount | 获取会话的消息数。 |
| markMessageAsRead | 将消息标记为已读。 |
| markAllMessagesAsRead | 将所有消息标记为已读。 |
| updateConversationMessage | 更新本地数据库中的消息。 |
| deleteMessage | 从本地数据库中删除一条消息。 |
| deleteMessagesWithTimestamp | 从本地数据库中删除一段时间内发送或接收的消息。 |
| deleteConversationAllMessages | 从内存和本地数据库中删除会话中的所有消息。 |
| deleteMessagesBeforeTimestamp | 删除指定时间戳之前的所有本地消息。 |
| getMessagesWithMsgType | 从本地数据库中检索会话中某种类型的消息。 |
| getMsgsWithMsgType | 从本地数据库中检索会话中某种类型的消息。 |
| getMessages | 从本地数据库中检索会话中指定数量的消息。 |
| getMsgs | 从本地数据库中检索会话中指定数量的消息。 |
| getMessagesWithKeyword | 获取指定用户在一定时间内的会话中发送的消息。 |
| getConvMsgsWithKeyword | 获取指定用户在一定时间内的会话中发送的消息。 |
| getMessageWithTimestamp | 检索本地数据库中某个会话在一定时间内发送和接收的消息。 |
| getMsgWithTimestamp | 检索本地数据库中某个会话在一定时间内发送和接收的消息。 |
| translateMessage | 翻译消息。 |
| fetchSupportedLanguages | 查询翻译服务支持的语言。 |
| setConversationExtension | 设置会话的扩展信息。 |
| addReaction | 添加 Reaction。 |
| removeReaction | 删除 Reaction。 |
| fetchReactionList | 获取 Reaction 列表。 |
| fetchReactionDetail | 获取 Reaction 详情。 |
| reportMessage | 举报消息。 |
| getReactionList | 获取指定消息的 Reaction 列表。 |
| groupAckCount | 获取群组消息的已读人数。 |
| createChatThread | 创建子区。 |
| joinChatThread | 加入子区。 |
| leaveChatThread | 退出子区。 |
| destroyChatThread | 解散子区。 |
| updateChatThreadName | 修改子区名称。 |
| removeMemberWithChatThread | 移除子区成员。 |
| fetchMembersWithChatThreadFromServer | 分页获取子区成员。 |
| fetchJoinedChatThreadFromServer | 分页从服务器获取当前用户加入的子区列表。 |
| fetchJoinedChatThreadWithParentFromServer | 分页从服务器获取当前用户加入指定群组的子区列表。 |
| fetchChatThreadWithParentFromServer | 分页从服务器端获取指定群组的子区列表。 |
| fetchLastMessageWithChatThread | 从服务器批量获取指定子区中的最新一条消息。 |
| fetchChatThreadFromServer | 从服务器获取子区详情。 |
| getMessageThread | 获取本地子区详情。 |
| getThreadConversation | 根据指定会话 ID 获取本地子区会话对象。 |
| fetchConversationsFromServerWithPage | 从服务器分页获取会话列表。 |
| removeMessagesFromServerWithMsgIds | 从会话中删除消息（从本地存储和服务器）。 |
| removeMessagesFromServerWithTimestamp | 从会话中删除消息（从本地存储和服务器）。 |
| fetchConversationsFromServerWithCursor | 分页从服务器获取会话列表。 |
| fetchPinnedConversationsFromServerWithCursor | 分页从服务器获取置顶会话。 |
| pinConversation | 设置会话是否置顶。 |
| modifyMessageBody | 修改文本消息。 |
| fetchCombineMessageDetail | 获取合并类型消息中的原始消息列表。 |
| addRemoteAndLocalConversationsMark | 标记会话。 |
| deleteRemoteAndLocalConversationsMark | 取消标记会话。 |
| fetchConversationsByOptions | 按会话过滤选项从服务端获取会话。 |
| deleteAllMessageAndConversation | 清空所有会话及其消息。 |
| pinMessage | 置顶消息。 |
| unpinMessage | 取消置顶消息。 |
| fetchPinnedMessages | 从服务端获取指定会话中的置顶消息。 |
| getPinnedMessages | 从本地获取指定会话中的置顶消息。 |
| getMessagePinInfo | 获取单条消息的置顶详情。 |
| searchMessages | 搜索消息。 |
| searchMessagesInConversation | 搜索指定会话的消息。 |
| removeMessagesWithTimestamp | 从本地和服务器端删除指定会话的消息。 |
| getMessageCountWithTimestamp | 获取消息数量。 |
| getMessageCount | 获取本地消息数量。 |

`ChatMessageEventListener` 消息监听器，监听消息的变化和通知。

| 事件 | 描述 |
| :----- | :---------- |
| onMessagesReceived | 收到消息回调。 |
| onCmdMessagesReceived | 收到命令消息回调。 |
| onMessagesRead | 收到单聊消息已读回执的回调。 |
| onGroupMessageRead | 收到群组消息的已读回执的回调。 |
| onMessagesDelivered | 收到消息已送达回执的回调。 |
| onMessagesRecalledInfo | 收到消息撤销通知的回调。 |
| onConversationsUpdate | 会话更新事件回调。 |
| onConversationRead | 收到会话已读回执的回调。 |
| onMessageReactionDidChange | 消息表情回复（Reaction）变化监听器。 |
| onChatMessageThreadCreated | 子区创建回调。 |
| onChatMessageThreadUpdated | 子区更新回调。 |
| onChatMessageThreadDestroyed | 子区移除回调。 |
| onChatMessageThreadUserRemoved | 管理员移除子区用户的回调。 |
| onMessageContentChanged | 文本消息内容更改，其它设备收到该通知。 |
| onMessagePinChanged | 收到消息置顶状态变更回调。 |

## 消息对象

`ChatMessage` 定义消息对象。

| 方法 | 描述 |
| :----- | :---------- |
| constructor | 构造消息。 |
| createSendMessage | 构造消息。 |
| createTextMessage | 创建一条待发送的文本消息。 |
| createFileMessage | 创建一条待发送的文件类型消息。 |
| createImageMessage | 创建一条待发送的图片消息。 |
| createVideoMessage | 创建一条待发送的视频消息。 |
| createVoiceMessage | 创建一条待发送的语音消息。 |
| createCombineMessage | 创建合并类型消息体。 |
| createLocationMessage | 创建一条待发送的位置消息。 |
| createCmdMessage | 创建一条待发送的命令消息。 |
| createCustomMessage | 创建一条待发送的自定义类型消息。 |
| createReceiveMessage | 创建一条接收消息。 |
| reactionList | 获取 Reaction 列表。 |
| groupReadCount | 获取群组消息的已读人数。 |
| threadInfo | 获取指定子区的详情。 |
| getPinInfo | 获取消息的置顶信息。 |
| messagePriority | 设置消息优先级。仅聊天室生效。 |

## 会话对象

`ChatConversation` 定义会话对象。

| 方法 | 描述 |
| :----- | :---------- |
| name | 获取会话 ID。 |
| getUnreadCount | 获取会话的未读消息数量。 |
| getMessageCount | 获取会话的消息数目。 |
| getMessageCountWithTimestamp | 获取会话的消息数目。 |
| getLatestMessage | 获取指定会话的最新消息。 |
| getLatestReceivedMessage | 获取指定会话中最近接收到的消息。 |
| setConversationExtension | 设置指定会话的自定义扩展信息。 |
| markMessageAsRead | 标记指定消息为已读。 |
| markAllMessagesAsRead | 标记所有消息为已读。 |
| updateMessage | 更新本地数据库的指定消息。 |
| deleteMessage | 删除本地数据库中的指定消息。 |
| deleteMessagesWithTimestamp | 删除消息。 |
| deleteAllMessages | 删除会话的所有消息。 |
| getMessagesWithMsgType | 从本地数据库获取会话中的指定用户发送的某些类型的消息。 |
| getMsgsWithMsgType | 从本地数据库中检索会话中某种类型的消息。 |
| getMessages | 从本地数据库中检索会话中一定数量的消息。 |
| getMsgs | 从本地数据库中检索会话中指定数量的消息。 |
| getMessagesWithKeyword | 检索本地数据库中会话中带有关键字的消息。 |
| getMsgsWithKeyword | 获取指定用户在一定时间段内在会话中发送的消息。 |
| getMessageWithTimestamp | 获取本地数据库中某个会话在一定时间内发送和接收的消息。 |
| getMsgWithTimestamp | 检索本地数据库中某个会话在一定时间内发送和接收的消息。 |
| removeMessagesFromServerWithMsgIds | 从会话中删除消息（从本地存储和服务器）。 |
| removeMessagesFromServerWithTimestamp | 从会话中删除消息（从本地存储和服务器）。 |
| getPinnedMessages | 从本地获取会话中的置顶消息。 |
| fetchPinnedMessages | 从服务器获取会话中顶置的消息。 |
| searchMessages | 搜索本地消息。 |
| removeMessagesWithTimestamp | 移除本地和服务器的消息。和该聊天会话相关的所有消息都将被删除。会话中的其他人的服务器端消息不受影响。不会删除。 |

## 群组

`ChatGroupManager` 管理群组，包括创建、删除、修改群组信息以及群成员信息。

| 方法 | 描述 |
| :----- | :---------- |
| setNativeListener | 群组管理类，用于管理群组的创建，删除及成员管理等操作。 |
| getGroupWithId | 根据群组 ID，从内存中获取群组对象。 |
| getJoinedGroups | 从本地数据库获取当前用户已加入的群组。 |
| fetchJoinedGroupsFromServer | 以分页方式从服务器获取当前用户已加入的群组。 |
| fetchPublicGroupsFromServer | 分页从服务器获取公开群组。 |
| createGroup | 创建群组。 |
| fetchGroupInfoFromServer | 从服务器获取群组详情。 |
| fetchMemberListFromServer | 从服务器分页获取群组成员。 |
| fetchBlockListFromServer | 从服务器分页获取群组黑名单列表。 |
| fetchMuteListFromServer | 从服务器分页获取群组禁言列表。 |
| fetchAllowListFromServer | 从服务器分页获取群组白名单列表。 |
| isMemberInAllowListFromServer | 从服务器查询该用户是否在群组白名单上。 |
| fetchGroupFileListFromServer | 从服务器分页获取群共享文件。 |
| fetchAnnouncementFromServer | 从服务器获取群组公告。 |
| addMembers | 向群组中添加新成员。 |
| inviteUser | 邀请用户加入群组。 |
| removeMembers | 从群组中移除用户。 |
| blockMembers | 将成员加入群组的黑名单列表。 |
| unblockMembers | 将用户从群组黑名单中移除。 |
| changeGroupName | 修改群组名称。 |
| changeGroupDescription | 修改群组描述。 |
| leaveGroup | 主动退出群组。 |
| destroyGroup | 解散群组。 |
| blockGroup | 屏蔽群消息。 |
| unblockGroup | 解除屏蔽群消息。 |
| changeOwner | 转移群主权限。 |
| addAdmin | 添加群组管理员。 |
| removeAdmin | 移除群组管理员权限。 |
| muteMembers | 禁言群组成员。 |
| unMuteMembers | 将成员移除群组禁言名单。 |
| muteAllMembers | 禁言全体群成员。 |
| unMuteAllMembers | 解除全体成员禁言。 |
| addAllowList | 将成员加入群组白名单。 |
| removeAllowList | 从群白名单中移出成员。 |
| uploadGroupSharedFile | 上传群组共享文件。 |
| downloadGroupSharedFile | 下载群共享文件。 |
| removeGroupSharedFile | 删除指定群共享文件。 |
| updateGroupAnnouncement | 更新群公告。 |
| updateGroupExtension | 更新群组扩展字段信息。 |
| joinPublicGroup | 加入公开群组。 |
| requestToJoinPublicGroup | 申请加入群组。 |
| acceptJoinApplication | 同意入群申请。 |
| declineJoinApplication | 拒绝用户的入群申请。 |
| acceptInvitation | 接受入群邀请。 |
| declineInvitation | 拒绝入群邀请。 |
| setMemberAttribute | 设置单个群成员的自定义属性。 |
| fetchMemberAttributes | 获取单个群成员所有自定义属性。 |
| fetchMembersAttributes | 根据指定的属性 key 获取多个群成员的自定义属性。 |
| fetchJoinedGroupCount | 获取已加入的群组数目。 |
| addGroupListener | 添加群组监听器。 |
| removeGroupListener | 移除群组监听器。 |
| removeAllGroupListener | 清除群组监听器。 |

`ChatGroupEventListener` 群组事件监听器，监听群组状态变化。

| 事件 | 描述 |
| :----- | :---------- |
| onInvitationReceived | 当前用户收到入群邀请的回调。 |
| onRequestToJoinReceived | 对端用户接收群组申请的回调。 |
| onRequestToJoinAccepted | 对端用户接受当前用户发送的群组申请的回调。 |
| onRequestToJoinDeclined | 对端用户拒绝群组申请的回调。 |
| onInvitationAccepted | 当前用户收到对端用户同意入群邀请触发的回调。 |
| onInvitationDeclined | 当前用户收到群组邀请被拒绝的回调。 |
| onMemberRemoved | 当前用户被移出群组时的回调。 |
| onDestroyed | 当前用户收到群组被解散的回调。 |
| onAutoAcceptInvitation | 当前用户自动同意入群邀请的回调。 |
| onMuteListAdded | 有成员被禁言回调。 |
| onMuteListRemoved | 有成员被解除禁言的回调。 |
| onAdminAdded | 成员设置为管理员的回调。 |
| onAdminRemoved | 取消成员的管理员权限的回调。 |
| onOwnerChanged | 转移群主权限的回调。 |
| onMemberJoined | 新成员加入群组的回调。 |
| onMemberExited | 群组成员主动退出回调。 |
| onAnnouncementChanged | 群公告更新回调。 |
| onSharedFileAdded | 群组添加共享文件回调。 |
| onSharedFileDeleted | 群组删除共享文件回调。 |
| onAllowListAdded | 成员加入群组白名单回调。 |
| onAllowListRemoved | 成员移出群组白名单回调。 |
| onAllGroupMemberMuteStateChanged | 全员禁言状态变化回调。 |
| onDetailChanged | 群组详情变更回调。群组所有成员会收到该事件。 |
| onStateChanged | 群组状态变更回调。群组所有成员会收到该事件。 |
| onMemberAttributesChanged | 群组成员属性变化通知。 |

## 聊天室

`ChatRoomManager` 管理聊天室，包括进入、退出、以及聊天室成员的操作。

| 方法 | 描述 |
| :----- | :---------- |
| setNativeListener | 聊天室管理类，负责聊天室加入和退出、聊天室列表获取以及成员权限管理等。 |
| addRoomListener | 注册聊天室监听器。 |
| removeRoomListener | 移除聊天室监听器。 |
| removeAllRoomListener | 移除所有聊天室监听器。 |
| joinChatRoom | 加入聊天室。 |
| joinChatRoomEx | 加入聊天室。 |
| leaveChatRoom | 退出聊天室。 |
| fetchPublicChatRoomsFromServer | 从服务器分页获取公开聊天室。 |
| fetchChatRoomInfoFromServer | 从服务器获取聊天室详情。 |
| getChatRoomWithId | 根据聊天室 ID 从本地数据库获取聊天室。 |
| createChatRoom | 创建聊天室。 |
| destroyChatRoom | 解散聊天室。 |
| changeChatRoomSubject | 修改聊天室名称。 |
| changeChatRoomDescription | 修改聊天室描述信息。 |
| fetchChatRoomMembers | 获取聊天室成员用户 ID 列表。 |
| muteChatRoomMembers | 将聊天室中指定成员禁言。 |
| unMuteChatRoomMembers | 取消对指定聊天室成员的禁言。 |
| changeOwner | 转让聊天室所有者权限。 |
| addChatRoomAdmin | 添加聊天室管理员。 |
| removeChatRoomAdmin | 移除聊天室管理员权限。 |
| fetchChatRoomMuteList | 分页从服务器获取聊天室禁言名单。 |
| removeChatRoomMembers | 将成员移出聊天室。 |
| blockChatRoomMembers | 将指定成员加入聊天室黑名单。 |
| unBlockChatRoomMembers | 将指定用户从聊天室黑名单中移除。 |
| fetchChatRoomBlockList | 从服务器获取黑名单列表。 |
| updateChatRoomAnnouncement | 更新聊天室公告。 |
| fetchChatRoomAnnouncement | 从服务器获取聊天室公告内容。 |
| fetchChatRoomAllowListFromServer | 从服务器获取白名单列表。 |
| isMemberInChatRoomAllowList | 查询指定成员是否在聊天室白名单中。 |
| addMembersToChatRoomAllowList | 将成员加入聊天室白名单。 |
| removeMembersFromChatRoomAllowList | 将聊天室成员从白名单中移除。 |
| muteAllChatRoomMembers | 禁言聊天室所有成员。 |
| unMuteAllChatRoomMembers | 解除聊天室全员禁言。 |
| fetchChatRoomAttributes | 从服务器获取聊天室数据。 |
| addAttributes | 设置聊天室自定义属性。 |
| removeAttributes | 删除聊天室自定义属性。 |

`ChatRoomEventListener` 聊天室监听器，监听聊天室状态以及成员状态的变化和通知。

| 事件 | 描述 |
| :----- | :---------- |
| onDestroyed | 聊天室解散的回调。 |
| onMemberJoined | 聊天室加入新成员回调。 |
| onMemberExited | 聊天室成员主动退出回调。 |
| onMemberRemoved | 聊天室成员被移除回调。 |
| onMuteListAdded | 有成员被禁言回调。 |
| onMuteListAddedV2 | 增加禁言成员时候回调。 |
| onMuteListRemoved | 有成员从禁言列表中移除回调。 |
| onAdminAdded | 有成员设置为聊天室管理员的回调。 |
| onAdminRemoved | 移除聊天室管理员权限的回调。 |
| onOwnerChanged | 转移聊天室的所有权的回调。 |
| onAnnouncementChanged | 聊天室公告更新回调。 |
| onAllowListAdded | 有成员被加入聊天室白名单的回调。 |
| onAllowListRemoved | 有成员被移出聊天室白名单的回调。 |
| onAllChatRoomMemberMuteStateChanged | 聊天室全员禁言状态变化回调。 |
| onSpecificationChanged | 聊天室详情变更回调。聊天室所有成员会收到该事件。 |
| onAttributesUpdated | 聊天室自定义属性（key-value）更新回调。聊天室所有成员会收到该事件。 |
| onAttributesRemoved | 聊天室自定义属性（key-value）移除回调。聊天室所有成员会收到该事件。 | 

## 联系人

`ChatContactManager` 联系人管理器，添加、删除、修改联系人。

| 方法 | 描述 |
| :----- | :---------- |
| setNativeListener | 联系人管理类，用于添加、查询和删除联系人。 |
| addContactListener | 添加联系人监听器。 |
| removeContactListener | 移除联系人监听器。 |
| removeAllContactListener | 移除所有联系人监听器。 |
| addContact | 添加好友。 |
| deleteContact | 删除联系人及其相关的会话。 |
| getAllContactsFromServer | 从服务器获取联系人列表。 |
| getAllContactsFromDB | 从本地数据库获取联系人列表。 |
| addUserToBlockList | 将指定用户加入黑名单。 |
| removeUserFromBlockList | 将指定用户移除黑名单。 |
| getBlockListFromServer | 从服务器获取黑名单列表。 |
| getBlockListFromDB | 从本地数据库获取黑名单列表。 |
| acceptInvitation | 接受加好友的邀请。 |
| declineInvitation | 拒绝加好友的邀请。 |
| getSelfIdsOnOtherPlatform | 获取登录用户在其他登录设备上唯一 ID，该 ID 由 user ID + "/" + resource 组成。 |
| getAllContacts | 从本地数据库获取所有所有联系人。 |
| getContact | 从本地数据库获取指定联系人备注信息。 |
| fetchAllContacts | 从服务器获取所有联系人。 |
| fetchContacts | 从服务器分页获取联系人 |
| setContactRemark | 设置联系人备注。 |

`ChatContactEventListener` 联系人监听器，监听联系人的状态的变化。

| 事件 | 描述 |
| :----- | :---------- |
| onContactAdded | 好友请求被接受的回调。 |
| onContactDeleted | 好友请求被拒绝的回调。 |
| onContactInvited | 当前用户收到好友请求的回调。 |
| onFriendRequestAccepted | 当前用户同意好友请求的回调。 |
| onFriendRequestDeclined | 拒绝好友请求的回调。 |

## 用户在线状态订阅

`ChatPresenceManager` 管理用户在线状态订阅。

| 方法 | 描述 |
| :----- | :---------- |
| setNativeListener | 在线状态管理器类。 |
| addPresenceListener | 添加在线状态监听器。 |
| removePresenceListener | 移除在线状态监听器。 |
| removeAllPresenceListener | 清除所有在线状态监听器。 |
| publishPresence | 发布自定义在线状态。 |
| subscribe | 订阅指定用户的在线状态。 |
| unsubscribe | 取消订阅指定用户的在线状态。 |
| fetchSubscribedMembers | 分页查询当前用户订阅了哪些用户的在线状态。 |
| fetchPresenceStatus | 查询指定用户的当前在线状态。 |

`ChatPresenceEventListener` 状态监听器，监听订阅对象的状态变化和通知。

| 事件 | 描述 |
| :----- | :---------- |
| onPresenceStatusChanged | 收到被订阅用户的在线状态发生变化。 |

## 离线推送

`ChatPushManager` 管理离线推送通知。

| 方法 | 描述 |
| :----- | :---------- |
| setNativeListener | 离线消息推送设置管理类。 |
| setSilentModeForConversation | 设置指定会话的离线消息推送模式。 |
| removeSilentModeForConversation | 清除指定会话的离线消息推送设置。 |
| fetchSilentModeForConversation | 获取指定会话的离线推送设置。 |
| setSilentModeForAll | 设置 app 的离线推送模式。 |
| fetchSilentModeForAll | 获取 app 的离线推送设置。 |
| fetchSilentModeForConversations | 获取指定的多个会话的离线推送设置。 |
| setPreferredNotificationLanguage | 设置推送通知的首选语言。 |
| fetchPreferredNotificationLanguage | 获取推送通知的首选语言。 |
| updatePushNickname | 修改推送通知中显示的消息发送方的昵称。 |
| updatePushDisplayStyle | 修改推送通知的展示方式。 |
| fetchPushOptionFromServer | 从服务器获取推送配置。 |
| selectPushTemplate | 选择离线推送模板，通知服务器。 |
| fetchSelectedPushTemplate | 获取当前推送模板的名称。 |

## 用户信息管理

`ChatUserInfoManager` 管理用户信息。

| 方法 | 描述 |
| :----- | :---------- |
| updateOwnUserInfo | 修改当前用户的信息。 |
| fetchUserInfoById | 获取指定用户的用户属性。 |
| fetchOwnInfo | 从服务器获取当前用户的用户属性信息。 |
