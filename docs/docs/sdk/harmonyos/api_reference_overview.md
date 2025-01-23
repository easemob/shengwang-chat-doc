# API 概览

即时通讯 IM 服务是一个高度可靠的全球通信平台，支持丰富的消息类型，包括文本、图片、语音、视频、文件、位置、透传以及自定义消息，可使你的用户很方便地进行单聊、群聊或聊天室聊天。

即时通讯 IM 服务提供以下类：

- `ChatClient` 类是即时通讯 IM SDK 的入口，提供各种方法实现即时通讯应用程序的登录和退出登录以及管理 SDK 和 IM 服务器之间的连接。
- `ChatManager` 类提供各种方法实现发送和接收消息、管理会话（包括加载和删除会话）以及下载附件。
- `ChatMessage` 类定义消息属性。
- `Conversation` 类提供会话管理方法。
- `ContactManager` 类提供聊天联系人管理方法，例如添加、获取、修改和删除联系人。
- `GroupManager` 类提供群组管理方法，例如群组创建和解散以及成员管理。
- `ChatroomManager` 类提供聊天室管理方法，如加入和离开聊天室、获取聊天室列表，以及管理聊天室成员权限。
- `UserInfoManager` 类提供用户属性管理的方法，包括获取和修改用户属性。
- `ChatPresenceManager` 类提供管理用户在线状态订阅的方法。
- `ChatPushManager` 类提供了配置离线推送服务的方法。

在方法调用过程中，SDK 可能会返回错误码。详见 `ChatError` 错误码。

如欲了解各类中的方法和参数详情，请参见 [API 参考链接](https://im.shengwang.cn/sdkdocs/chat1.x/harmonyOS/)。

## 聊天客户端

`ChatClient` 类是即时通讯 IM SDK 的入口，提供各种方法实现即时通讯应用程序的登录和退出登录以及管理 SDK 和 IM 服务器之间的连接。

| 方法                 | 描述                         |
|----------------|----------------------------|
| init | 初始化 SDK。                   |
| loginWithToken| 通过用户 ID 和 token 登录 IM 服务器。 |
| renewToken                                    | 更新 token。                  |
| logout                                        | 登出 IM 服务器。                 |
| getCurrentUser                                | 获取当前登录用户的用户 ID。            |
| isAutoLogin                                   | 判断当前是否是自动登录状态。             |
| isLoggedIn                                    | 检查用户是否登录 IM 服务。          |
| isSdkInited                                   | 检查 SDK 是否已初始化完毕。           |
| addConnectionListener                         | 设置连接状态监听器。                 |
| groupManager                                  | 获取群组管理类。                   |
| chatroomManager                               | 获取聊天室管理类。                  |
| chatManager                                   | 获取聊天管理类。                   |
| userInfoManager                               | 获取用户信息管理类。                 |
| contactManager                                | 获取联系人管理类。                  |


| 事件                                                                      | 描述                     |
|-------------------------------------------------------------------------|------------------------|
| onConnected | 成功连接到 IM 服务器时触发。     |
| onDisconnected                                                      | SDK 与 IM 服务器断开连接时触发。 |
| onTokenExpired                                                      |  token 已过期时触发。         |
| onTokenWillExpire                                                   | token 即将过期时触发。         |
| onLogout                                                            | 用户被强制登出 SDK 时触发的回调。    |
| onOfflineMessageSyncStart                                                            | SDK 开始拉取离线消息时触发。    |
| onOfflineMessageSyncFinish                                                            | SDK 拉取离线消息结束时触发。    |

## 聊天管理器

`ChatManager` 类提供各种方法实现发送和接收消息、管理会话（包括加载和删除会话）以及下载附件。

| 方法                             | 描述                         |
|----------------------------------|----------------------------|
| sendMessage                  | 发送消息。                      |
| ackConversationRead          | 发送会话的已读回执。                 |
| ackMessageRead               | 发送消息的已读回执。                 |
| ackGroupMessageRead          | 发送群消息已读回执。                 |
| getConversation              | 根据会话 ID 以及会话类型获取会话。        |
| markAllConversationsAsRead   | 将所有会话都设成已读。                |
| saveMessage                  | 保存消息到本地数据库。                |
| updateMessage                | 更新本地消息。                    |
| downloadAttachment           | 下载消息的附件。                   |
| downloadThumbnail            | 下载消息的缩略图。                  |
| importMessages               | 将消息导入本地数据库。                |
| getConversations             | 获取本地当前所有会话。                |
| fetchConversationsFromServer | 分页从服务器获取获取会话列表。            |
| deleteConversation           | 删除指定会话及其本地历史消息。            |
| deleteConversationFromServer | 删除服务端的指定会话及其历史消息。          |
| fetchGroupReadAcks           | 从服务器分页获取群组消息已读回执详情。        |
| searchMessagesFromDB         | 从本地数据库获取指定会话的一定数量的特定类型的消息。 |
| addReaction                  | 给指定消息添加 Reaction。          |
| removeReaction               | 删除指定消息的 Reaction。          |
| fetchReactions               | 获取 Reaction 列表。            |
| fetchReactionDetail          | 获取 Reaction 详细信息。          |
| addMessageListener           | 注册消息监听器。                   |
| addConversationListener      | 注册会话监听器。                   |

| 事件                                  | 描述                 |
|-------------------------------------|--------------------|
| onMessageReceived               | 收到消息。              |
| onCmdMessageReceived            | 收到命令消息。            |
| onMessageRead                   | 收到消息的已读回执。         |
| onGroupMessageRead              | 收到群组消息的已读回执。       |
| onReadAckForGroupMessageUpdated | 收到群组消息的读取状态更新。     |
| onMessageDelivered              | 收到消息的送达回执。         |
| onMessageRecalled               | 撤回收到的消息。           |
| onReactionChanged               | 消息的 Reaction 发生变更。 |
| onConversationUpdate            | 会话发生更新。            |
| onConversationRead              | 收到会话已读回执。          |

## 消息

- `Conversation` 类提供会话管理方法。
- `ChatMessage` 类定义消息属性。

| 方法                           | 描述                       |
|--------------------------------|--------------------------|
| conversationId             | 会话 ID，取决于会话类型。           |
| markAllMessagesAsRead      | 将所有未读消息设置为已读。            |
| getAllMsgCount             | 获取 SDK 本地数据库中会话的全部消息的数量。 |
| loadMoreMessagesFromDB     | 从 SDK 本地数据库中分页加载消息。      |
| getMessage                 | 根据消息 ID 获取指定的消息。         |
| markMessageAsRead          | 设置指定消息为已读。               |
| removeMessage              | 删除本地数据库中的一条指定消息。         |
| getLatestMessage           | 获取会话中的最新一条消息。            |
| getLatestMessageFromOthers | 获取会话中收到的最新一条消息。          |
| clearAllMessages           | 清除数据库中指定会话中的所有消息。        |
| setExtField                | 设置会话的扩展字段。               |
| getExtField                | 获取会话的扩展字段。               |
| insertMessage              | 在本地数据库的会话中插入一条消息。        |
| appendMessage              | 在本地数据库中会话的尾部插入一条消息。      |
| updateMessage              | 更新本地数据库的指定消息。            |
| getStatus                  | 获取消息的发送/接收状态。            |
| setStatus                  | 设置消息发送或接收的状态。            |
| getType                    | 获取消息类型。                  |
| getBody                    | 获取消息体。                   |
| getServerTimestamp         | 获取消息的服务器时间戳。             |
| getLocalTimestamp          | 获取消息的本地时间戳。              |
| createSendMessage          | 创建一条发送消息。                |
| createReceiveMessage       | 创建一条接收消息。                |
| createTextSendMessage      | 创建一条文本发送消息。              |
| createVoiceSendMessage     | 创建一条语音发送消息。              |
| createImageSendMessage     | 创建一条图片发送消息。              |
| createVideoSendMessage     | 创建一条视频发送消息。              |
| createLocationSendMessage  | 创建一条位置发送消息。              |
| createFileSendMessage      | 创建一条普通文件发送消息。            |
| createCombinedSendMessage  | 创建一个合并转发消息的发送消息。         |
| setBody                    | 设置消息体。                   |
| getFrom                    | 获取消息发送方的用户 ID。           |
| setFrom                    | 设置消息发送方的用户 ID。           |
| getRecaller                | 获取消息撤回者的用户 ID。           |
| setTo                      | 设置消息接收方的用户 ID。           |
| getTo                      | 获取消息接收方的用户名。             |
| getMsgId                   | 获取消息的 ID。                |
| setMsgId                   | 设置本地消息 ID。               |
| setMessageStatusCallback   | 设置消息状态变化的回调。             |
| getChatType                | 获取聊天类型。                  |
| setChatType                | 设置聊天类型。                  |
| isReceiverRead             | 获取对方是否已读。                |
| isDelivered                | 获取消息是否成功送达。              |
| isUnread                   | 检查消息是否未读。                |
| setUnread                  | 设置消息是否未读。                |
| isListened                 | 获取语音消息是否已听。              |
| setIsListened              | 设置语音消息是否已听。              |
| getDirection               | 获取消息方向。                  |
| setDirection               | 设置消息方向。                  |
| ext                        | 获取消息包含的全部扩展字段。           |
| getMessageReaction         | 获取 Reaction 列表。          |
| isOnlineState              | 是否为在线消息，即消息发送时接收方是否在线。   |
| setPriority                | 设置聊天室消息优先级。              |

| 事件             | 描述                             |
|----------------|--------------------------------|
| onSuccess  | 方法成功执行的回调。                     |
| onError    | 发生错误时的回调，详见 `ChatError`。 |
| onProgress | 进度更新的回调。                       |

## 群组

`GroupManager` 类提供群组管理方法，例如群组创建和解散以及成员管理。

| 方法                            | 描述                     |
|---------------------------------|------------------------|
| createGroup                 | 创建群组。                  |
| destroyGroup                | 解散群组。                  |
| leaveGroup                  | 当前登录用户退出群组。            |
| joinGroup                   | 当前登录用户加入公开群。           |
| addUsersToGroup             | 向群组中添加新成员。             |
| removeUsersFromGroup        | 从群组中删除成员。              |
| fetchGroupFromServer        | 从服务器获取群组的详细信息。         |
| fetchJoinedGroupsFromServer | 以分页方式从服务器获取当前用户已加入的群组。 |
| fetchJoinedGroupsCount      | 从服务器获取当前用户已加入的群组数量。    |
| fetchPublicGroupsFromServer | 以分页方式从服务器获取公开群组。       |
| changeGroupName             | 修改群组名称。                |
| changeGroupDescription      | 修改群描述。                 |
| acceptInvitation            | 接受入群邀请。                |
| declineInvitation           | 拒绝入群邀请。                |
| acceptApplication           | 批准入群申请。                |
| declineApplication          | 拒绝入群申请。                |
| inviteUsers                 | 群成员邀请用户入群。             |
| applyJoinToGroup            | 申请加入群组。                |
| blockGroupMessage           | 屏蔽群消息。                 |
| unblockGroupMessage         | 取消屏蔽群消息。               |
| blockUsers                  | 将用户加入群组黑名单。            |
| unblockUsers                | 将用户从群组黑名单中移除。          |
| fetchGroupBlocklist         | 以分页方式获取群组的黑名单。         |
| fetchGroupMembers           | 以分页方式获取群组成员列表。         |
| changeOwner                 | 移交群组所有权。               |
| addGroupAdmin               | 添加群组管理员。               |
| removeGroupAdmin            | 删除群组管理员。               |
| muteGroupMembers            | 将一组成员禁言。               |
| unmuteGroupMembers          | 解除对一组成员的禁言。            |
| muteAllMembers              | 将群组全员禁言。               |
| unmuteAllMembers           | 解除对群组全员的禁言。            |
| fetchGroupMutelist          | 获取群组的禁言列表。             |
| addToGroupWhitelist         | 将群成员添加至群组白名单。          |
| removeFromGroupWhitelist    | 将群成员移出白名单。             |
| fetchGroupWhitelist         | 获取群组白名单列表。             |
| updateGroupAnnouncement     | 更新群公告。                 |
| fetchGroupAnnouncement      | 从服务器获取群公告。             |
| uploadGroupSharedFile       | 上传共享文件至群组。             |
| fetchGroupSharedFileList    | 从服务器获取群共享文件列表。         |
| deleteGroupSharedFile       | 删除群组中指定的共享文件。          |
| downloadGroupSharedFile     | 下载群组中指定的共享文件。          |
| setMemberAttributes     | 设置单个群成员的自定义属性。          |
| fetchMemberAttributes     | 获取单个群成员所有自定义属性。          |
| fetchMembersAttributes     | 根据指定的属性 key 获取多个群成员的自定义属性。          |
| getAllGroups                | 从内存中获取当前用户的所有群组。       |
| getGroup                    | 根据群组 ID，从内存中获得群组对象。    |
| addListener                 | 注册群组变动事件监听。            |


| 事件                                  | 描述                                               |
|-------------------------------------|--------------------------------------------------|
| onInvitationReceived            | 用户收到入群邀请的回调。                                     |
| onRequestToJoinReceived         | 用户申请入群回调。                                        |
| onRequestToJoinAccepted         | 接受入群申请回调。                                        |
| onRequestToJoinDeclined         | 拒绝入群申请回调。                                        |
| onInvitationAccepted            | 接受入群邀请回调。                                        |
| onInvitationDeclined            | 拒绝群组邀请回调。                                        |
| onUserRemoved                   | 当前登录用户被移出群组回调。                                   |
| onGroupDestroyed                | 群组解散回调。                                          |
| onAutoAcceptInvitationFromGroup | 自动同意入群申请回调。                                      |
| onMutelistAdded                 | 有成员被禁言。                                          |
| onMutelistRemoved               | 有成员被解除禁言。                                        |
| onWhitelistAdded                | 将成员加入群组白名单回调。                                    |
| onWhitelistRemoved              | 将成员移出白名单回调。                                      |
| onAllMemberMuteStateChanged     | 全员禁言状态变化回调。                                      |
| onAdminAdded                    | 成员被设置为管理员回调。                                     |
| onAdminRemoved                  | 取消成员的管理员权限回调。                                    |
| onOwnerChanged                  | 转移群主权限回调。                                        |
| onMemberJoined                  | 新成员加入群组回调。                                       |
| onMemberExited                  | 群组成员主动退出回调。                                      |
| onAnnouncementChanged           | 群公告更新回调。                                         |
| onSharedFileAdded               | 群组中添加共享文件的回调。                                    |
| onSharedFileDeleted             | 群组中删除共享文件回调。                                     |
| onSpecificationChanged          | 群组详情更新回调，需调用 `fetchGroupFromServer` 获取最新群组信息。 |
| onStateChanged                  | 群组禁用或启动状态回调。                                     |
| onGroupMemberAttributeChanged   | 群组成员自定义属性变化的回调。                                     |

## 聊天室

`ChatroomManager` 类提供聊天室管理方法，如加入和离开聊天室、获取聊天室列表，以及管理聊天室成员权限。

| 方法                               | 描述                 |
|------------------------------------|--------------------|
| joinChatroom                   | 加入聊天室。             |
| leaveChatroom                  | 退出聊天室。             |
| fetchPublicChatroomsFromServer | 以分页的方式从服务器获取聊天室数据。 |
| changeChatroomName             | 修改聊天室名称。           |
| changeChatroomDescription      | 修改聊天室描述信息。         |
| fetchChatroomMembers           | 获取聊天室成员列表。         |
| muteChatroomMembers            | 将一组聊天室成员禁言。        |
| unmuteChatroomMembers          | 解除禁言。              |
| addChatroomAdmin               | 添加聊天室管理员。          |
| removeChatroomAdmin            | 移除聊天室管理员权限。        |
| fetchChatroomMutes             | 获取聊天室禁言列表。         |
| removeChatroomMembers          | 将成员移出聊天室。          |
| blockChatroomMembers           | 将成员添加到聊天室黑名单。      |
| unblockChatroomMembers         | 从聊天室黑名单中移除成员。      |
| fetchChatroomBlocklist         | 以分页的形式获取聊天室黑名单列表。  |
| addToChatroomWhitelist         | 将成员添加到聊天室白名单。      |
| removeFromChatroomWhitelist    | 将成员从聊天室白名单移除。      |
| fetchChatroomWhitelist         | 从服务器获取聊天室白名单列表。    |
| muteAllMembers                 | 设置聊天室全员禁言。         |
| unmuteAllMembers               | 解除聊天室全员的禁言状态。      |
| changeChatroomAnnouncement     | 更新聊天室公告。           |
| fetchChatroomAnnouncement      | 从服务器获取聊天室公告内容。     |
| fetchChatroomAttributes      | 获取聊天室属性。     |
| setChatroomAttributes      | 设置聊天室自定义属性。     |
| removeChatroomAttributes      | 删除聊天室指定自定义属性。     |
| addListener                    | 注册聊天室事件监听对象。       |



| 事件                              | 描述            |
|---------------------------------|---------------|
| onMemberJoined              | 有新成员加入聊天室。    |
| onMemberExited              | 有成员主动退出聊天室。   |
| onRemovedFromChatroom       | 有成员被移出聊天室。    |
| onMutelistAdded             | 有成员被禁言。       |
| onMutelistRemoved           | 有成员从禁言列表中移除。  |
| onWhitelistAdded            | 有成员加入聊天室白名单。  |
| onWhitelistRemoved          | 有成员被移出聊天室白名单。 |
| onAllMemberMuteStateChanged | 全员禁言状态有变更。    |
| onAdminAdded                | 有成员被设置为管理员。   |
| onAdminRemoved              | 有成员被移出管理员列表。  |
| onOwnerChanged              | 聊天室所有者变更。     |
| onAnnouncementChanged       | 聊天室公告有变更。     |
| onSpecificationChanged      | 聊天室信息有更新。     |
| onAttributesUpdate      | 聊天室自定义属性有更新。     |
| onAttributesRemoved      | 聊天室自定义属性被移除。     |

## 联系人

`ContactManager` 类提供聊天联系人管理方法，例如添加、获取、修改和删除联系人。

| 方法                           | 描述                      |
|--------------------------------|-------------------------|
| addContact                 | 添加联系人。                  |
| deleteContact              | 删除好友。                   |
| fetchAllContactsFromServer | 从服务器获取所有的好友。            |
| addUsersToBlocklist        | 把指定用户加入到黑名单中。           |
| getBlockListFromServer     | 从服务器获取黑名单列表。            |
| acceptInvitation           | 接受加好友的邀请。               |
| declineInvitation          | 拒绝加好友的邀请。               |
| getContactsFromLocal       | 从数据库获取好友列表。             |
| getSelfIdsOnOtherPlatform  | 从服务器获取登录用户在其他设备上登录的 ID。 |
| addContactListener         | 注册联系人监听。                |

| 事件                          | 描述                       |
|-----------------------------|--------------------------|
| onContactAdded          | 增加联系人时回调此方法。             |
| onContactDeleted        | 删除联系人时回调此方法。被删除的用户收到该回调。 |
| onContactInvited        | 收到好友邀请。                  |
| onFriendRequestAccepted | 同意好友请求。发送好友请求的用户收到该事件。   |
| onFriendRequestDeclined | 拒绝好友请求。发送好友请求的用户收到该事件。   |

## 用户属性

`UserInfoManager` 类提供用户属性管理的方法，包括获取和修改用户属性。

| 方法                  | 描述              |
|-----------------------|-----------------|
| updateUserInfo    | 修改当前用户的信息。      |
| fetchUserInfoById | 根据用户 ID 获取用户信息。 |

## 用户在线状态

`ChatPresenceManager` 类提供管理用户在线状态订阅的方法。

| 方法         | 描述                    |
|-----------------------|-----------------------|
| publishPresence               | 发布自定义在线状态。            |
| subscribePresences        | 订阅指定用户的在线状态。          |
| unsubscribePresences     | 取消订阅指定用户的在线状态。        |
| fetchSubscribedMembers | 分页查询当前用户订阅了哪些用户的在线状态。 |
| fetchPresenceStatus      | 查询指定用户的当前在线状态。        |
| addListener                     | 添加监听。                 |

| 事件                    | 描述               |
|-----------------------|------------------|
| onPresenceUpdated | 被订阅的用户的在线状态发生更新。 |

## 离线推送

`ChatPushManager` 类提供了配置离线推送服务的方法。

| 方法        | 描述                |
|------------------|-------------------|
| updatePushNickname      | 更新当前用户的推送昵称。      |
| updatePushDisplayStyle      | 更新推送消息样式。      |
| setSilentModeForConversation      | 设置会话的免打扰模式。       |
| clearRemindTypeForConversation  | 清除会话的离线推送提醒类型设置。  |
| getSilentModeForConversation      | 获取会话的免打扰设置。       |
| setSilentModeForAll      | 设置当前登录用户的免打扰设置。   |
| getSilentModeForAll      | 获取当前登录用户的免打扰设置。   |
| getSilentModeForConversations    | 批量获取指定会话的免打扰设置。   |
| syncConversationsSilentModeFromServer    | 和服务端同步会话免打扰状态。   |
