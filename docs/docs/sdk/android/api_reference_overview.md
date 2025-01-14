即时通讯 IM 服务是一个高度可靠的全球通信平台，支持丰富的消息类型，包括文本、图片、语音、视频、文件、位置、透传以及自定义消息，可使你的用户很方便地进行单聊、群聊或聊天室聊天。即时通讯 IM 服务提供以下类：

- `ChatClient` 类是即时通讯 IM SDK 的入口，提供各种方法实现即时通讯应用程序的登录和退出登录以及管理 SDK 和 IM 服务器之间的连接。
- `ChatManager` 类提供各种方法实现发送和接收消息、管理会话（包括加载和删除会话）以及下载附件。
- `ChatMessage` 类定义消息属性。
- `Conversation` 类提供会话管理方法。
- `ContactManager` 类提供聊天联系人管理方法，例如添加、获取、修改和删除联系人。
- `GroupManager` 类提供群组管理方法，例如群组创建和解散以及成员管理。
- `ChatRoomManager` 类提供聊天室管理方法，如加入和离开聊天室、获取聊天室列表，以及管理聊天室成员权限。
- `PresenceManager` 类提供管理用户在线状态订阅的方法。
- `ChatThreadManager` 类提供子区管理方法，包括创建和解散子区以及子区成员管理。
- `PushManager` 类提供各种方法实现离线推送服务的管理。
- `UserInfoManager` 类提供用户属性管理的方法，包括获取和修改用户属性。

在方法调用过程中，SDK 可能会返回错误码。详见 `Error` 错误码。

## 聊天客户端

`ChatClient` 类提供各种方法实现即时通讯应用程序的登录和退出登录以及管理 SDK 和 IM 服务器之间的连接。

| 方法名称                                   | 描述                                 |
| ----------------------------------------| ---------------------------------- |
| ChatClient#init()                                    | 初始化 SDK。                           |
| ChatClient#loginWithToken()                | 通过用户 ID 和声网 token 登录 IM 服务器。 |
| ChatClient#renewToken()                        | 更新声网 token。                    |
| ChatClient#logout()                                | 登出 IM 服务器。                         |
| ChatClient#getCurrentUser()                | 获取当前登录用户的用户 ID。                    |
| ChatClient#isLoggedInBefore()            | 查询是否登录过。                           |
| ChatClient#isConnected()                      | 检查 SDK 是否连接到 IM 服务器。               |
| ChatClient#isLoggedIn()                        | 检查用户是否登录 IM 服务。                    |
| ChatClient#setDebugMode()                    | 设置是否输出调试信息。                        |
| ChatClient#isSdkInited()                      | 检查 SDK 是否已完成初始化。                   |
| ChatClient#addConnectionListener()  | 设置连接状态监听器。                         |
| ChatClient#addLogListener()                | 设置日志回调监听器。                         |
| ChatClient#groupManager()                    | 获取群组管理类 `GroupManager`。              |
| ChatClient#pushManager()                      | 获取推送管理类 `PushManager`。               |
| ChatClient#chatroomManager()              | 获取聊天室管理类 `ChatRoomManager`。          |
| ChatClient#chatManager()                      | 获取聊天管理类 `ChatManager`。               |
| ChatClient#userInfoManager()              | 获取用户信息管理类 `UserInfoManager`。         |
| ChatClient#contactManager()                | 获取联系人管理类 `ContactManager`。           |
| ChatClient#presenceManager()              | 获取用户在线状态管理类 `PresenceManager`。       |
| ChatClient#chatThreadManager()          | 获取子区管理类 `ChatThreadManager`。         |

| 事件                               | 描述                                      |
| -------------------------------- | --------------------------------------- |
| ConnectionListener#onConnected()              | 成功连接到 IM 服务器时触发的回调。                     |
| ConnectionListener#onDisconnected()        | SDK 与 IM 服务器断开连接时触发的回调。注意断开连接时底层不一定会登出。 |
| ConnectionListener#onTokenExpired()        | token 过期时触发的回调。                         |
| ConnectionListener#onTokenWillExpire()  | token 即将过期时触发的回调。                       |
| ConnectionListener#onLogout()                    | 用户被强制登出 SDK 时触发的回调。                     |
| ChatLogListener#onLog()                             | 日志回调。                                   |

## 聊天管理器

`ChatManager` 类提供各种方法实现发送和接收消息、管理会话（包括加载和删除会话）以及下载附件。

| 方法名称                                                   | 描述                         |
| ---------------------------------------------------------- | -------------------------- |
| ChatManager#sendMessage()                                              | 发送消息。                      |
| ChatManager#ackConversationRead()                              | 发送会话的已读回执，该方法只针对单聊会话。      |
| ChatManager#ackMessageRead()                                        | 发送消息的已读回执。                 |
| ChatManager#ackGroupMessageRead()                              | 发送群消息已读回执。                 |
| ChatManager#getConversation()                                      | 获取指定 ID 的会话对象。             |
| ChatManager#markAllConversationsAsRead()                | 将所有会话都设成已读。                |
| ChatManager#saveMessage()                                              | 将消息保存到内存和本地数据库。            |
| ChatManager#updateMessage()                                          | 更新本地消息。                    |
| ChatManager#downloadAttachment()                                | 下载消息的附件。                   |
| ChatManager#downloadThumbnail()                                  | 下载消息的缩略图。                  |
| ChatManager#importMessages()                                        | 将消息导入本地数据库。                |
| ChatManager#getAllConversations()                              | 获取本地当前所有会话。                |
| ChatManager#asyncFetchConversationsFromServer()  | 从服务器获取会话列表。                |
| ChatManager#asyncFetchConversationsFromServer()  | 从服务器分页获取会话列表。              |
| ChatManager#deleteConversation()                                | 删除指定会话及其本地历史消息。            |
| ChatManager#deleteConversationFromServer()            | 删除服务端的指定会话及其历史消息。          |
| ChatManager#fetchGroupReadAcks()                                | 从服务器分页获取群组消息已读回执详情。        |
| ChatManager#searchMsgFromDB()                                      | 从本地数据库获取指定会话的一定数量的特定类型的消息。 |
| ChatManager#deleteMessagesBeforeTimestamp()          | 删除指定时间戳之前的本地历史消息。          |
| ChatManager#asyncReportMessage()                                | 举报非法消息。                    |
| ChatManager#fetchSupportLanguages()                          | 获取翻译服务支持的所有语言。             |
| ChatManager#translateMessage()                                    | 翻译一条文本消息。                  |
| ChatManager#asyncAddReaction()                                    | 添加 Reaction。               |
| ChatManager#asyncRemoveReaction()                              | 删除 Reaction。               |
| ChatManager#asyncGetReactionList()                            | 获取 Reaction 列表。            |
| ChatManager#asyncGetReactionDetail()                        | 获取 Reaction 详细信息。          |
| ChatManager#addMessageListener()                                | 注册消息监听器。                   |
| ChatManager#addConversationListener()                      | 注册会话监听器。                   |

| 事件                                             | 描述                 |
| ------------------------------------------------- | ------------------ |
| MessageListener#onMessageReceived()                              | 收到消息。              |
| MessageListener#onCmdMessageReceived()                        | 收到命令消息。            |
| MessageListener#onMessageRead()                                      | 收到消息的已读回执。         |
| MessageListener#onGroupMessageRead()                            | 收到群组消息的已读回执。       |
| MessageListener#onReadAckForGroupMessageUpdated()  | 收到群组消息的读取状态更新。     |
| MessageListener#onMessageDelivered()                            | 收到消息的送达回执。         |
| MessageListener#onMessageRecalled()                              | 撤回收到的消息。           |
| MessageListener#onReactionChanged()                              | 消息的 Reaction 发生变更。 |
| ConversationListener#onConversationUpdate()                   | 会话发生更新。            |
| ConversationListener#onConversationRead()                       | 收到会话已读回执。          |

## 消息

- `Conversation` 类提供会话管理方法。
- `ChatMessage` 类定义消息属性。

| 方法名称                                                  | 描述                       |
| ------------------------------------------------------- | ------------------------ |
| Conversation#conversationId()                          | 会话 ID，取决于会话类型。           |
| Conversation#getUnreadMsgCount()                    | 获取会话中的未读消息数。             |
| Conversation#markAllMessagesAsRead()            | 将所有未读消息设置为已读。            |
| Conversation#getAllMsgCount()                          | 获取 SDK 本地数据库中会话的全部消息的数量。 |
| Conversation#isChatThread()                              | 查看当前会话是否是子区会话。           |
| Conversation#loadMoreMsgFromDB()                    | 从 SDK 本地数据库中分页加载消息。      |
| Conversation#getMessage()                                  | 根据消息 ID 获取已读的消息。         |
| Conversation#markMessageAsRead()                    | 设置指定消息为已读。               |
| Conversation#getAllMessages()                          | 获取该会话当前内存中的所有消息。         |
| Conversation#removeMessage()                            | 删除本地数据库中的一条指定消息。         |
| Conversation#getLastMessage()                          | 获取会话中的最新一条消息。            |
| Conversation#getLatestMessageFromOthers()  | 获取会话中收到的最新一条消息。          |
| Conversation#clear()                                            | 清除会话中的所有消息。              |
| Conversation#clearAllMessages()                      | 清除内存和数据库中指定会话中的消息。       |
| Conversation#setExtField()                                | 设置会话的扩展字段。               |
| Conversation#getExtField()                                | 获取会话的扩展字段。               |
| Conversation#insertMessage()                            | 在本地数据库的会话中插入一条消息。        |
| Conversation#appendMessage()                            | 在本地数据库中会话的尾部插入一条消息。      |
| Conversation#updateMessage()                            | 更新本地数据库的指定消息。            |
| ChatMessage#status()                                           | 获取消息的发送/接收状态。            |
| ChatMessage#setStatus()                                     | 设置消息发送或接收的状态。            |
| ChatMessage#getType()                                         | 获取消息类型。                  |
| ChatMessage#getBody()                                         | 获取消息体。                   |
| ChatMessage#getMsgTime()                                   | 获取消息的服务器时间戳。             |
| ChatMessage#setMsgTime()                                   | 设置消息的服务器时间戳。             |
| ChatMessage#localTime()                                     | 获取消息的本地时间戳。              |
| ChatMessage#setLocalTime()                               | 设置消息的本地时间戳。              |
| ChatMessage#setIsChatThreadMessage()           | 设置消息是否是子区消息。             |
| ChatMessage#isChatThreadMessage()                 | 获取消息是否是子区消息。             |
| ChatMessage#getChatThread()                             | 获取子区概览信息。                |
| ChatMessage#createSendMessage()                     | 创建一条发送消息。                |
| ChatMessage#createReceiveMessage()               | 创建一条接收消息。                |
| ChatMessage#createTextSendMessage()             | 创建一条文本发送消息。              |
| ChatMessage#createVoiceSendMessage()           | 创建一条语音发送消息。              |
| ChatMessage#createImageSendMessage()           | 创建一条图片发送消息。              |
| ChatMessage#createVideoSendMessage()           | 创建一条视频发送消息。              |
| ChatMessage#createLocationSendMessage()     | 创建一条位置发送消息。              |
| ChatMessage#createFileSendMessage()             | 创建一条普通文件发送消息。            |
| ChatMessage#setBody()                                         | （建议方法）设置消息体。             |
| ChatMessage#addBody()                                         | 添加消息体。                   |
| ChatMessage#getFrom()                                         | 获取消息发送方的用户 ID。           |
| ChatMessage#setFrom()                                         | 设置消息发送方的用户 ID。           |
| ChatMessage#getRecaller()                                 | 获取消息撤回者的用户 ID。           |
| ChatMessage#setTo()                                             | 设置消息接收方的用户 ID。           |
| ChatMessage#getTo()                                             | 获取消息接收方的用户名。             |
| ChatMessage#getMsgId()                                       | 获取消息的 ID。                |
| ChatMessage#setMsgId()                                       | 设置本地消息 ID。               |
| ChatMessage#setMessageStatusCallback()       | 设置消息状态变化的回调。             |
| ChatMessage#setAttribute()                               | 设置消息扩展属性，为 String 类型。    |
| ChatMessage#getStringAttribute()                   | 获取消息扩展属性，为 String 类型。    |
| ChatMessage#getChatType()                                 | 获取聊天类型。                  |
| ChatMessage#setChatType()                                 | 设置聊天类型。                  |
| ChatMessage#isAcked()                                         | 获取对方是否已读。                |
| ChatMessage#setAcked()                                       | 设置对方是否已读。                |
| ChatMessage#isDelivered()                                 | 获取消息是否成功送达。              |
| ChatMessage#setDelivered()                               | 设置消息是否成功送达。              |
| ChatMessage#isUnread()                                       | 检查消息是否未读。                |
| ChatMessage#setUnread()                                     | 设置消息是否未读。                |
| ChatMessage#isListened()                                   | 获取语音消息是否已听。              |
| ChatMessage#setListened()                                 | 设置语音消息是否已听。              |
| ChatMessage#getUserName()                                 | 获取对端用户的用户 ID。            |
| ChatMessage#direct()                                           | 获取消息方向。                  |
| ChatMessage#setDirection()                               | 设置消息方向。                  |
| ChatMessage#conversationId()                           | 获取会话 ID。                 |
| ChatMessage#ext()                                                 | 获取消息包含的全部扩展字段。           |
| ChatMessage#getMessageReaction()                   | 获取 Reaction 列表。          |
| ChatMessage#isOnlineState()                             | 是否为在线消息，即消息发送时接收方是否在线。   |
| ChatMessage#setPriority()                                 | 设置聊天室消息优先级。              |

| 事件                                                | 描述                                        |
| ------------------------------------------------- | ----------------------------------------- |
| CallBack#onSuccess()    | 方法成功执行的回调。                                |
| CallBack#onError()        | 发生错误时的回调，详见 Error 。 |
| CallBack#onProgress()  | 进度更新的回调。                                  |

## 群组

`GroupManager` 类提供群组管理方法，例如群组创建和解散以及成员管理。

| 方法名称                                                                                             | 描述                     |
| -------------------------------------------------------------------------------------------------- | ---------------------- |
| GroupManager#asyncCreateGroup()                              | 创建群组。                  |
| GroupManager#asyncDestroyGroup()                            | 解散群组。                  |
| GroupManager#asyncLeaveGroup()                                | 当前登录用户退出群组。            |
| GroupManager#asyncJoinGroup()                                  | 当前登录用户加入公开群。           |
| GroupManager#asyncAddUsersToGroup()                      | 向群组中添加新成员。             |
| GroupManager#asyncRemoveUsersFromGroup()            | 从群组中删除成员。              |
| GroupManager#asyncGetGroupFromServer()                | 从服务器获取群组的详细信息。         |
| GroupManager#asyncGetJoinedGroupsFromServer()  | 以分页方式从服务器获取当前用户已加入的群组。 |
| GroupManager#asyncGetPublicGroupsFromServer()  | 以分页方式从服务器获取公开群组。       |
| GroupManager#asyncChangeGroupName()                      | 修改群组名称。                |
| GroupManager#asyncChangeGroupDescription()        | 修改群描述。                 |
| GroupManager#asyncAcceptInvitation()                    | 接受入群邀请。                |
| GroupManager#asyncDeclineInvitation()                  | 拒绝入群邀请。                |
| GroupManager#asyncAcceptApplication()                  | 批准入群申请。                |
| GroupManager#asyncDeclineApplication()                | 拒绝入群申请。                |
| GroupManager#asyncInviteUser()                                | 群成员邀请用户入群。             |
| GroupManager#asyncApplyJoinToGroup()                    | 申请加入群组。                |
| GroupManager#asyncBlockGroupMessage()                  | 屏蔽群消息。                 |
| GroupManager#asyncUnblockGroupMessage()              | 取消屏蔽群消息。               |
| GroupManager#asyncBlockUsers()                                | 将用户加入群组黑名单。            |
| GroupManager#asyncUnblockUsers()                            | 将用户从群组黑名单中移除。          |
| GroupManager#asyncGetBlockedUsers()                      | 以分页方式获取群组的黑名单。         |
| GroupManager#asyncFetchGroupMembers()                  | 以分页方式获取群组成员列表。         |
| GroupManager#asyncChangeOwner()                              | 移交群组所有权。               |
| GroupManager#asyncAddGroupAdmin()                          | 添加群组管理员。               |
| GroupManager#asyncRemoveGroupAdmin()                    | 删除群组管理员。               |
| GroupManager#asyncMuteGroupMembers()                    | 将一组成员禁言。               |
| GroupManager#asyncUnMuteGroupMembers()                | 解除对一组成员的禁言。            |
| GroupManager#muteAllMembers()                                  | 将群组全员禁言。               |
| GroupManager#unmuteAllMembers                                | 解除对群组全员的禁言。            |
| GroupManager#asyncFetchGroupMuteList()                | 获取群组的禁言列表。             |
| GroupManager#asyncFetchGroupBlackList()              | 以分页从服务器获群组黑名单。         |
| GroupManager#addToGroupWhiteList()                        | 将群成员添加至群组白名单。          |
| GroupManager#removeFromGroupWhiteList()              | 将群成员移出白名单。             |
| GroupManager#fetchGroupWhiteList()                        | 获取群组白名单列表。             |
| GroupManager#asyncUpdateGroupAnnouncement()      | 更新群公告。                 |
| GroupManager#asyncFetchGroupAnnouncement()        | 从服务器获取群公告。             |
| GroupManager#asyncUploadGroupSharedFile()          | 上传共享文件至群组。             |
| GroupManager#asyncFetchGroupSharedFileList()    | 从服务器获取群共享文件列表。         |
| GroupManager#asyncDeleteGroupSharedFile()          | 删除群组中指定的共享文件。          |
| GroupManager#asyncDownloadGroupSharedFile()      | 下载群组中指定的共享文件。          |
| GroupManager#getAllGroups()                                      | 从内存中获取当前用户的所有群组。       |
| GroupManager#getGroup()                                              | 根据群组 ID，从内存中获得群组对象。    |
| GroupManager#loadAllGroups()                                    | 从数据库中加载所有群组。           |
| GroupManager#addGroupChangeListener()                  | 注册群组变动事件监听。            |

| 事件        | 描述           |
| ----------------------| -----------------------------------|
| GroupChangeListener#onInvitationReceived()                        | 用户收到入群邀请的回调。                                                                                              |
| GroupChangeListener#onRequestToJoinReceived()                  | 用户申请入群回调。                                                                                                 |
| GroupChangeListener#onRequestToJoinAccepted()                  | 接受入群申请回调。                                                                                                 |
| GroupChangeListener#onRequestToJoinDeclined()                  | 拒绝入群申请回调。                                                                                                 |
| GroupChangeListener#onInvitationAccepted()                        | 接受入群邀请回调。                                                                                                 |
| GroupChangeListener#onInvitationDeclined()                        | 拒绝群组邀请回调。                                                                                                 |
| GroupChangeListener#onUserRemoved()                                      | 当前登录用户被移出群组回调。                                                                                            |
| GroupChangeListener#onGroupDestroyed()                                | 群组解散回调。                                                                                                   |
| GroupChangeListener#onAutoAcceptInvitationFromGroup()  | 自动同意入群申请回调。                                                                                               |
| GroupChangeListener#onMuteListAdded()                                  | 有成员被禁言。                                                                                                   |
| GroupChangeListener#onMuteListRemoved()                              | 有成员被解除禁言。                                                                                                 |
| GroupChangeListener#onWhiteListAdded()                                | 将成员加入群组白名单回调。                                                                                             |
| GroupChangeListener#onWhiteListRemoved()                            | 将成员移出白名单回调。                                                                                               |
| GroupChangeListener#onAllMemberMuteStateChanged()          | 全员禁言状态变化回调。                                                                                               |
| GroupChangeListener#onAdminAdded()                                        | 成员被设置为管理员回调。                                                                                              |
| GroupChangeListener#onAdminRemoved()                                    | 取消成员的管理员权限回调。                                                                                             |
| GroupChangeListener#onOwnerChanged()                                    | 转移群主权限回调。                                                                                                 |
| GroupChangeListener#onMemberJoined()                                    | 新成员加入群组回调。                                                                                                |
| GroupChangeListener#onMemberExited()                                    | 群组成员主动退出回调。                                                                                               |
| GroupChangeListener#onAnnouncementChanged()                      | 群公告更新回调。                                                                                                  |
| GroupChangeListener#onSharedFileAdded()                              | 群组中添加共享文件的回调。                                                                                             |
| GroupChangeListener#onSharedFileDeleted()                          | 群组中删除共享文件回调。                                                                                              |
| GroupChangeListener#onSpecificationChanged()                    | 群组详情更新回调，需调用 `GroupManager#asyncGetGroupFromServer()` 获取最新群组信息。 |
| GroupChangeListener#onStateChanged()                                    | 群组禁用或启动状态回调。                                                                                              |

## 子区

`ChatThreadManager` 类提供子区管理方法，包括创建和解散子区以及子区成员管理。

| 方法名称                                                                                                  | 描述                            |
| ------------------------------------------------------------------------------------------------------- | ------------------------------ |
| ChatThreadManager#createChatThread()                              | 创建子区。                          |
| ChatThreadManager#getChatThreadFromServer()                | 从服务器获取子区详情。                    |
| ChatThreadManager#joinChatThread()                                  | 加入子区。                          |
| ChatThreadManager#destroyChatThread()                            | 解散子区。                          |
| ChatThreadManager#leaveChatThread()                                | 退出子区。                          |
| ChatThreadManager#updateChatThreadName()                      | 修改子区名称。                        |
| ChatThreadManager#removeMemberFromChatThread()          | 移除子区成员。                        |
| ChatThreadManager#getChatThreadMembers()                      | 分页获取子区成员。                      |
| ChatThreadManager#getJoinedChatThreadsFromServer()  | 分页从服务器获取当前用户加入的子区列表。           |
| ChatThreadManager#getJoinedChatThreadsFromServer()  | 分页从服务器获取当前用户加入指定群组的子区列表。       |
| ChatThreadManager#getChatThreadsFromServer()              | 分页从服务器端获取指定群组的子区列表。            |
| ChatThreadManager#getChatThreadLatestMessage()          | 从服务器批量获取指定子区中的最新一条消息。          |
| ChatThreadManager#addChatThreadChangeListener()        | 注册子区事件监听器，用于监听子区变化，如子区的创建和解散等。 |
| ChatThreadManager#removeChatThreadChangeListener()  | 移除子区事件监听器。                     |

| 事件                                                                                         | 描述                     |
| ------------------------------------------------------------------------------------------- | ---------------------- |
| ChatThreadChangeListener#onChatThreadCreated()          | 子区创建回调。                |
| ChatThreadChangeListener#onChatThreadUpdated()          | 子区更新回调。                |
| ChatThreadChangeListener#onChatThreadDestroyed()      | 子区解散回调。                |
| ChatThreadChangeListener#onChatThreadUserRemoved()  | 当前登录用户被群主或群管理员移出子区的回调。 |

## 聊天室

`ChatRoomManager` 类提供聊天室管理方法，如加入和离开聊天室、获取聊天室列表，以及管理聊天室成员权限。

| 方法名称                                                                    | 描述                             |
| -------------------------------------------------------------------------- | ------------------------------ |
| ChatRoomManager#asyncCreateChatRoom()                                                      | 创建聊天室。                         |
| ChatRoomManager#asyncDestroyChatRoom()                                                    | 解散聊天室。                         |
| ChatRoomManager#joinChatRoom()                                                                    | 加入聊天室。                         |
| ChatRoomManager#leaveChatRoom()                                                                  | 退出聊天室。                         |
| ChatRoomManager#fetchPublicChatRoomsFromServer()                                | 以分页的方式从服务器获取聊天室数据。             |
| ChatRoomManager#asyncFetchPublicChatRoomsFromServer()                      | 以分页的方式从服务器获取聊天室。               |
| ChatRoomManager#fetchChatRoomFromServer()                                              | 从服务器获取聊天室详情。                   |
| ChatRoomManager#asyncChangeChatRoomSubject()                                        | 修改聊天室名称。                       |
| ChatRoomManager#asyncChangeChatroomDescription()                                | 修改聊天室描述信息。                     |
| ChatRoomManager#asyncFetchChatRoomMembers()                                          | 获取聊天室成员列表。                     |
| ChatRoomManager#asyncMuteChatRoomMembers()                                            | 将一组聊天室成员禁言。                    |
| ChatRoomManager#asyncUnMuteChatRoomMembers()                                        | 解除禁言。                          |
| ChatRoomManager#asyncAddChatRoomAdmin()                                                  | 添加聊天室管理员。                      |
| ChatRoomManager#asyncRemoveChatRoomAdmin()                                            | 移除聊天室管理员权限。                    |
| ChatRoomManager#asyncFetchChatRoomMuteList()                                        | 获取聊天室禁言列表。                     |
| ChatRoomManager#asyncRemoveChatRoomMembers()                                        | 将成员移出聊天室。                      |
| ChatRoomManager#asyncBlockChatroomMembers()                                          | 将成员添加到聊天室黑名单。                  |
| ChatRoomManager#asyncUnBlockChatRoomMembers()                                      | 从聊天室黑名单中移除成员。                  |
| ChatRoomManager#asyncFetchChatRoomBlackList()                                      | 以分页的形式获取聊天室黑名单列表。              |
| ChatRoomManager#addToChatRoomWhiteList()                                                | 将成员添加到聊天室白名单。                  |
| ChatRoomManager#removeFromChatRoomWhiteList()                                      | 将成员从聊天室白名单移除。                  |
| ChatRoomManager#fetchChatRoomWhiteList()                                                | 从服务器获取聊天室白名单列表。                |
| ChatRoomManager#muteAllMembers()                                                                | 设置聊天室全员禁言。                     |
| ChatRoomManager#unmuteAllMembers()                                                            | 解除聊天室全员的禁言状态。                  |
| ChatRoomManager#asyncUpdateChatRoomAnnouncement()                              | 更新聊天室公告。                       |
| ChatRoomManager#asyncFetchChatRoomAnnouncement()                                | 从服务器获取聊天室公告内容。                 |
| ChatRoomManager#asyncSetChatroomAttributes()                                        | 设置多个聊天室自定义属性。                  |
| ChatRoomManager#asyncSetChatroomAttribute()                                          | 设置聊天室单个自定义属性。                  |
| ChatRoomManager#asyncSetChatroomAttributesForced()                            | 强制设置多个聊天室自定义属性。                |
| ChatRoomManager#asyncSetChatroomAttributeForced()                              | 强制设置单个聊天室自定义属性。                |
| ChatRoomManager#asyncFetchChatroomAttributesFromServer()                | 根据聊天室属性 key 列表获取属性列表。          |
| ChatRoomManager#asyncFetchChatRoomAllAttributesFromServer()          | 获取聊天室所有自定义属性。                  |
| ChatRoomManager#asyncRemoveChatRoomAttributesFromServer()              | 根据聊天室自定义属性 key 列表批量删除自定义聊天室属性。 |
| ChatRoomManager#asyncRemoveChatRoomAttributeFromServer()                | 删除单个聊天室属性。                     |
| ChatRoomManager#asyncRemoveChatRoomAttributesFromServerForced()  | 强制删除多个聊天室自定义属性。                |
| ChatRoomManager#asyncRemoveChatRoomAttributeFromServerForced()    | 强制删除单个聊天室自定义属性。                |
| ChatRoomManager#addChatRoomChangeListener()                                          | 注册聊天室事件监听对象。                   |

| 事件                                                                                               | 描述                      |
| ------------------------------------------------------------------------------------------------- | ----------------------- |
| ChatRoomChangeListener#onChatRoomDestroyed()                  | 聊天室被解散。                 |
| ChatRoomChangeListener#onMemberJoined()                            | 有新成员加入聊天室。              |
| ChatRoomChangeListener#onMemberExited()                            | 有成员主动退出聊天室。             |
| ChatRoomChangeListener#onRemovedFromChatRoom()              | 有成员被移出聊天室。              |
| ChatRoomChangeListener#onMuteListAdded()                          | 有成员被禁言。                 |
| ChatRoomChangeListener#onMuteListRemoved()                      | 有成员从禁言列表中移除。            |
| ChatRoomChangeListener#onWhiteListAdded()                        | 有成员加入聊天室白名单。            |
| ChatRoomChangeListener#onWhiteListRemoved()                    | 有成员被移出聊天室白名单。           |
| ChatRoomChangeListener#onAllMemberMuteStateChanged()  | 全员禁言状态有变更。              |
| ChatRoomChangeListener#onAdminAdded()                                | 有成员被设置为管理员。             |
| ChatRoomChangeListener#onAdminRemoved()                            | 有成员被移出管理员列表。            |
| ChatRoomChangeListener#onOwnerChanged()                            | 聊天室所有者变更。               |
| ChatRoomChangeListener#onAnnouncementChanged()              | 聊天室公告有变更。               |
| ChatRoomChangeListener#onSpecificationChanged()            | 聊天室信息有更新。               |
| ChatRoomChangeListener#onAttributesUpdate()                    | 聊天室自定义属性（key-value）有更新。 |
| ChatRoomChangeListener#onAttributesRemoved()                  | 聊天室自定义属性被移除。            |

## 联系人

`ContactManager` 类提供聊天联系人管理方法，例如添加、获取、修改和删除联系人。

| 方法名称                                                                                                 | 描述                      |
| ---------------------------------------------------------------------------------------------------- | ----------------------- |
| ContactManager#asyncAddContact()                                | 添加联系人。                  |
| ContactManager#asyncDeleteContact()                          | 删除好友。                   |
| ContactManager#asyncGetAllContactsFromServer()    | 从服务器获取所有的好友。            |
| ContactManager#asyncAddUserToBlackList()                | 把指定用户加入到黑名单中。           |
| ContactManager#asyncSaveBlackList()                          | 上传黑名单列表到服务器。            |
| ContactManager#asyncRemoveUserFromBlackList()      | 将用户从黑名单中移除。             |
| ContactManager#getBlackListUsernames()                    | 从本地获取黑名单列表。             |
| ContactManager#asyncGetBlackListFromServer()        | 从服务器获取黑名单列表。            |
| ContactManager#asyncAcceptInvitation()                    | 接受加好友的邀请。               |
| ContactManager#asyncDeclineInvitation()                  | 拒绝加好友的邀请。               |
| ContactManager#getContactsFromLocal()                      | 从数据库获取好友列表。             |
| ContactManager#asyncGetSelfIdsOnOtherPlatform()  | 从服务器获取登录用户在其他设备上登录的 ID。 |
| ContactManager#setContactListener()                          | 注册联系人监听。                |

| 事件                                                                                | 描述                       |
| ---------------------------------------------------------------------------------- | ------------------------ |
| ContactListener#onContactAdded()                    | 增加联系人时回调此方法。             |
| ContactListener#onContactDeleted()                | 删除联系人时回调此方法。被删除的用户收到该回调。 |
| ContactListener#onContactInvited()                | 收到好友邀请。                  |
| ContactListener#onFriendRequestAccepted()  | 同意好友请求。发送好友请求的用户收到该事件。   |
| ContactListener#onFriendRequestDeclined()  | 拒绝好友请求。发送好友请求的用户收到该事件。   |

## 用户属性

`UserInfoManager` 类提供用户属性管理的方法，包括获取和修改用户属性。

| 方法名称                                                                                   | 描述                  |
| ----------------------------------------------------------------------------------------- | -------------------- |
| UserInfoManager#updateOwnInfo()                        | 修改当前用户的信息。           |
| UserInfoManager#updateOwnInfoByAttribute()  | 修改当前用户的属性。           |
| UserInfoManager#fetchUserInfoByUserId()        | 根据用户 ID 获取用户信息。      |
| UserInfoManager#fetchUserInfoByAttribute()  | 根据用户 ID 和用户属性获取用户信息。 |

## 用户在线状态订阅

`PresenceManager` 类提供各种用于管理用户在线状态订阅的方法。

| 方法名称                                                                                | 描述                    |
| ------------------------------------------------------------------------------------- | --------------------- |
| PresenceManager#publishPresence()                | 发布自定义在线状态。            |
| PresenceManager#subscribePresences()          | 订阅指定用户的在线状态。          |
| PresenceManager#unsubscribePresences()      | 取消订阅指定用户的在线状态。        |
| PresenceManager#fetchSubscribedMembers()  | 分页查询当前用户订阅了哪些用户的在线状态。 |
| PresenceManager#fetchPresenceStatus()        | 查询指定用户的当前在线状态。        |
| PresenceManager#addListener()                        | 添加监听。                 |

 事件                                                                      | 描述              |
| ----------------------------------------------------------------------- | ---------------- |
| PresenceListener#onPresenceUpdated()  | 被订阅的用户的在线状态发生更新。 |

## 离线推送

 `PushManager` 类提供各种方法实现离线推送服务的管理。

| 方法名称                                                                                              | 描述                |
| ------------------------------------------------------------------------------------------------- | ----------------- |
| PushManager#getPushConfigs()                                  | 从缓存获取推送配置信息。      |
| PushManager#getPushConfigsFromServer()              | 从服务器获取推送配置信息。     |
| PushManager#asyncUpdatePushNickname()                | 更新当前用户的推送昵称。      |
| PushManager#setSilentModeForConversation()      | 设置会话的免打扰模式。       |
| PushManager#clearRemindTypeForConversation()  | 清除会话的离线推送提醒类型设置。  |
| PushManager#getSilentModeForConversation()      | 获取会话的免打扰设置。       |
| PushManager#setSilentModeForAll()                        | 设置当前登录用户的免打扰设置。   |
| PushManager#getSilentModeForAll()                        | 获取当前登录用户的免打扰设置。   |
| PushManager#getSilentModeForConversations()    | 批量获取指定会话的免打扰设置。   |
| PushManager#bindDeviceToken()                                | 将设备 token 绑定到服务器。 |
