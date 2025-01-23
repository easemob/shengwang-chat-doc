# API 概览

即时通讯 IM 是一个高度可靠的全球通信平台，用户可以进行单聊、群组聊天或聊天室聊天。用户可以通过发送文本消息、分享图片、音频、视频、文件、表情符号和位置进行沟通。

- `ChatClient` 类是聊天 SDK 的入口，提供登录和登出即时通讯 IM 的方法，并管理 SDK 与聊天服务器之间的连接。
- `ChatManager` 类提供发送和接收消息、管理会话（包括加载和删除会话）以及下载附件的方法。
- `ChatMessage` 类定义消息的属性。
- `Conversation` 类提供管理会话的方法。
- `ContactManager` 类提供管理聊天联系人（如添加、获取、修改和删除联系人）的方法。
- `GroupManager` 类提供群组管理的方法，如群组创建和解散以及成员管理。
- `ChatRoomManager` 类提供聊天室管理的方法，如加入和离开聊天室、获取聊天室列表，以及管理成员权限。
- `PresenceManager` 类提供管理用户在线状态订阅的方法。
- `ChatThreadManager` 类提供了管理子区的方法，包括创建、解散子区以及成员管理。
- `PushManager` 类提供了配置离线推送服务的方法。
- `UserInfoManager` 类提供了管理用户属性的方法，包括获取和更新用户属性。

如欲了解各类中的方法和参数详情，请点击[这里](https://im.shengwang.cn/sdkdocs/chat1.x/ios/)。

## 连接与初始化

`ChatClient` 类提供登录和登出即时通讯 IM 的方法和事件，并管理 SDK 与聊天服务器之间的连接。

| 方法                  | 描述        |
| :--------------- | :------------------ |
| initializeSDKWithOptions:                 | 初始化 SDK。                           |
| loginWithUsername:token:completion:                                 | 使用用户 ID 和 token 登录聊天服务器。                                                |
| renewToken:                                             | 更新 token。                                                                      |
| logout:completion:                                          | 退出登录账号。                                                                  |
| currentUsername                                           | 获取当前登录用户的用户 ID。                                                           |
| isConnected                                                 | 检查 SDK 是否已连接到聊天服务器。                                                       |
| isLoggedIn                                                   | 检查用户是否已登录聊天应用。                                                         |
| addDelegate:           | 添加代理。                                                                            |
| addLogDelegate:delegateQueue:                            | 添加 SDK 的日志回调代理。                                                              |
| groupManager                                               | 获取 `GroupManager` 类。                                                                |
| pushManager                                                 | 获取 `PushManager` 类。                                                                 |
| roomManager                                         | 获取 `RoomManager` 类。                                                                |
| chatManager                                                 | 获取 `ChatManager` 类。                                                                |
| userInfoManager                                         | 获取 `UserInfoManager` 类。                                                             |
| contactManager                                           | 获取 `ContactManager` 类。                                                              |
| presenceManager                                         | 获取 `presenceManager` 类。                                                              |
| threadManager                                     | 获取 `ChatThreadManager` 类。                                                           |

| 事件             | 描述              |
| :------------------------- | :---------------- |
| connectionStateDidChange:                               | 当 SDK 连接状态发生变化时触发。                                   |
| tokenDidExpire:                         | 当 token 过期时触发。                                          |
| tokenWillExpire:                   | 当 token 即将过期时触发。                                       |
| autoLoginDidCompleteWithError:                                  | 当 SDK 自动登录成功或失败时触发。                               |
| logDidOutput:                                        | 当有日志输出时触发。                                          |
| onOfflineMessageSyncStart                                        | 开始从服务器拉取离线消息时触发。                                          |
| onOfflineMessageSyncFinish                                        | 从服务器拉取离线消息结束时触发。                                          |

## 发送消息

- `ChatManager` 类提供发送和接收消息、管理会话（包括加载和删除会话）以及下载附件的方法和事件。
- `ChatManagerDelegate` 类提供消息状态事件，包括消息发送或下载成功和失败以及上传或下载进度。

| 方法                         | 描述         |
| :------------------------- | :---------------------------------- |
| sendMessage:progress:completion:                                                          | 发送消息。                                                                        |
| ackConversationRead:completion:                                               | 向服务器发送会话已读回执。                                                       |
| sendMessageReadAck:toUser:completion:                                                 | 向服务器发送消息已读回执。                                                     |
| sendGroupMessageReadAck:toGroup:content:completion:                               | 向服务器发送群消息的已读回执。                                                   |
| getConversation:type:createIfNotExist:                                                       | 根据会话ID获取会话对象。                                                          |
| importMessages:completion:                                                          | 将消息导入内存和本地数据库。                                                     |
| updateMessage:completion:                                                      | 更新本地消息。                                                                    |
| downloadMessageAttachment:progress:completion:                                            | 下载消息附件。                                                                    |
| downloadMessageThumbnail:progress:completion:                                              | 下载消息缩略图。                                                                  |
| getAllConversations                                                     | 获取所有本地会话。                                                                |
| getConversationsFromServer:            | 从服务器获取会话列表。                                                            |
| getConversationsFromServerByPage            | 从服务器分页获取会话列表。                                                        |
| deleteConversations:isDeleteMessages:completion:                                        | 从本地数据库中删除会话及其本地消息。                                            |
| deleteServerConversation                    | 从服务器删除指定会话及其历史消息。                                              |
| fetchGroupReadAcks                                    | 从服务器分页获取群消息的已读回执。                                          |
| loadMessages        | 从本地数据库中检索特定类型的消息。                                              |
| deleteMessagesBeforeTimestamp                   | 删除时间戳在指定时间之前的本地历史消息。                                        |
| reportMessageWithId:tag:reason:completion:                                 | 举报不当消息。                                                                    |
| fetchSupportedLanguages:                                    | 获取翻译服务支持的所有语言。                                                    |
| translateMessage:targetLanguages:completion:                           | 翻译文本消息。                                                                    |
| addReaction:toMessage:completion:                                   | 添加 Reaction。                                                                        |
| removeReaction:fromMessage:completion:                             | 删除 Reaction。                                                                        |
| getReactionList | 获取 Reaction 列表。                                                                    |
| getReactionDetail     | 获取 Reaction 详情。                                                                    |
| addDelegate                                        | 添加消息监听器。                                                                  |
| pinMessage                                        | 置顶消息。                                                                  |
| unpinMessage                                        | 取消置顶消息。                                                                  |
| modifyMessage                                        | 修改消息。                                                                  |
| fetchMessagesFromServer                                        | 从服务器拉取历史消息。                                                                  |

| 事件                    | 描述            |
| :------------------------ | :-------------------- |
| messagesDidReceive:                         | 当收到消息时触发。                                                                  |
| cmdMessagesDidReceive:                   | 当收到透传消息时触发。                                                              |
| messagesDidRead:                                 | 当收到消息的已读回执时触发。                                                        |
| groupMessageDidRead:groupAcks:                       | 当收到群消息的已读回执时触发。                                                      |
| groupMessageAckHasChanged | 当收到群消息已读状态更新时触发。                                                    |
| messagesDidDeliver:                       | 当收到送达回执时触发。                                                               |
| messagesInfoDidRecall:                         | 当收到的消息被撤回时触发。                                                           |
| messageStatusDidChange            | 当收到消息状态变更通知时触发，包括消息 ID 的变更。                                     |
| messageReactionDidChange:                         | 当消息 Reaction 发生变化时触发。                                                           |
| conversationListDidUpdate:                  | 当会话列表更新时触发。                                                               |
| onConversationRead:to:        | 当收到会话已读回执时触发。                                                           |
| onMessagePinChanged        | 当消息置顶状态发生变更时触发。                                                           |
| onMessageContentChanged        | 当消息内容变更时触发。                                                           |

## 会话和消息

- `Message` 类定义消息的属性。
- `Conversation` 类提供管理会话的方法。

| 方法                      | 描述               |
| :------------------------ | :------------------- |
| Conversation.conversationId | 获取会话 ID，具体取决于会话类型。                                        |
| Conversation.unreadMessagesCount | 获取会话中的未读消息数量。                                          |
| Conversation.markAllMessagesAsRead: | 将所有未读消息标记为已读。                                          |
| Conversation.messagesCount | 获取本地数据库中会话的所有消息数量。                                  |
| Conversation.isChatThread | 检查当前会话是否为子区会话。                                        |
| Conversation.loadMoreMsgFromDB | 从本地数据库加载消息，从特定消息 ID 开始。                              |
| Conversation.markMessageAsRead | 将特定消息标记为已读。                                              |
| Conversation.deleteMessageWithId:error: | 在本地数据库中删除特定消息。                                        |
| Conversation.latestMessage | 获取会话中的最新消息。                                              |
| Conversation.lastReceivedMessage | 获取会话中的最新接收消息。                                          |
| Conversation.deleteAllMessages: | 删除会话中的所有消息。                                              |
| Conversation.ext | 会话的扩展字段。                                                    |
| Conversation.insertMessage | 在本地数据库中向会话插入消息。                                      |
| Conversation.appendMessage | 在本地数据库中将消息插入到会话的末尾。                              |
| Conversation.updateMessage | 更新本地数据库中的消息。                                            |
| Message.status | 消息发送或接收状态。                                                |
| Message.chatType | 获取聊天消息类型。                                                  |
| Message.body | 消息正文。                                                          |
| Message.timestamp | 服务器接收消息时的 Unix 时间戳。                                      |
| Message.localTime | 消息的本地时间戳。                                                |
| Message.isChatThreadMessage | 消息是否为子区消息。                                                |
| Message.chatThread | 获取子区的概述。                                                |
| Message.from | 获取消息发送者的用户 ID。                                            |
| Message.to | 消息接收者的用户 ID。                                                |
| Message.messageId | 消息 ID。                                                          |
| Message.ext | 消息的扩展属性，类型为字典。                                      |
| Message.isRead | 消息是否已读。                                                    |
| Message.isDeliverAcked | 消息是否已成功送达。                                              |
| Message.isListened | 语音消息是否已被收听。                                            |
| Message.direction | 消息的收发方向。                                                      |
| Message.conversationId | 获取会话 ID。                                                      |
| Message.reactionList | 获取 Reaction 列表。                                                    |
| Message.onlineState | 是否在线消息。                                          |
| Message.pinnedInfo   | 消息的置顶操作信息。      |     

## 群组

- `GroupManager` 类提供群组管理的方法，如群组创建和解散以及成员管理。
- `GroupManagerDelegate` 类提供群组管理事件监听。

| 方法              | 描述      |
| :-------------------------- | :------------------------- |
| createGroup         | 创建群组。                                            |
| destroyGroup                                                    | 销毁群组。                                         |
| leaveGroup                                                        | 离开群组。                                                      |
| joinPublicGroup                                                          | 加入一个公共群组。                                                |
| addMembers                                    | 将用户添加到群组中。                                             |
| removeMembersFromGroup                              | 从群组中移除成员。                                      |
| getGroupSpecificationFromServerWithId                                   | 从服务器获取群组信息。                              |
| getJoinedGroupsFromServerWithPage | 从服务器分页获取当前用户的所有群组。 |
| getPublicGroupsFromServer                | 从服务器分页获取公开群组。                  |
| updateGroupSubject                                      | 更改群组名称。                                              |
| updateDescription                        | 更改群组描述。                                       |
| acceptInvitationFromGroup                               | 接受群组邀请。                                          |
| declineGroupInvitation                          | 拒绝群组邀请。                                         |
| acceptJoinApplication                                  | 批准群组请求。                                            |
| declineJoinGroupRequest                        | 拒绝群组请求。                                            |
| requestToJoinPublicGroup                                    | 请求加入公共群组。                                            |
| blockGroup                                          | 阻止群组消息。                                               |
| unblockGroup                                      | 取消阻止群组消息。                                             |
| blockMembers                                                  | 将用户添加到群组黑名单。                               |
| unblockMembers                                              | 从群组黑名单中移除用户。                             |
| getGroupBlacklistFromServer                               | 获取群组黑名单（带分页）。                           |
| getGroupMemberListFromServer                        | 获取群组成员列表（带分页）。                     |
| updateGroupOwner                                         | 转移群组所有权。                                       |
| addAdmin                                     | 添加群组管理员。                                                  |
| removeAdmin                               | 移除群组管理员。                                               |
| muteMembers                           | 禁言群组成员。                                                 |
| unmuteMembers                             | 取消禁言群组成员。                                               |
| getGroupMuteListFromServer                         | 从服务器获取群组禁言列表。                     |
| getGroupBlacklistFromServer                       | 从服务器获取群组黑名单（带分页）。        |
| addWhiteListMembers                                          | 将成员添加到白名单列表。                                      |
| removeWhiteListMembers                                | 从白名单列表中移除成员。                                 |
| getGroupWhiteListFromServer                                           | 从服务器获取群组白名单列表。                        |
| updateGroupAnnouncement                      | 更新群组公告。                                      |
| asyncFetchGroupAnnouncement                           | 从服务器获取群组公告。                         |
| uploadGroupSharedFileWithId                          | 上传群组共享文件。                                |
| getGroupFileList             | 从服务器获取共享文件列表。                           |
| removeGroupSharedFile                          | 移除群组共享文件。                                |
| downloadGroupSharedFile              | 下载群组共享文件。                              |
| getJoinedGroups                                                                              | 获取当前用户的所有群组（从缓存中）。                |
| addDelegate                                       | 添加群组变更监听器。                                   |

| 事件      | 描述          |
| :----------------------- | :-------------------- |
| groupInvitationDidReceive               | 当用户收到群组邀请时触发。                                  |
| joinGroupRequestDidReceive         | 当群组所有者或管理员收到用户的加入请求时触发。 |
| joinGroupRequestDidApprove                 | 当群组请求被接受时触发。                                           |
| joinGroupRequestDidDecline         | 当群组请求被拒绝时触发。                                           |
| groupInvitationDidAccept                       | 当群组邀请被接受时触发。                                        |
| groupInvitationDidDecline                       | 当群组邀请被拒绝时触发。 |
| didJoinGroup:inviter:message:                                             | 当群组邀请自动接受时触发。         |
| didLeaveGroup                                             | 当当前用户被群组管理员移除时触发。         |                                       
| groupMuteListDidUpdate:addedMutedMembers:muteExpire:                                     | 当一个或多个群组成员被禁言时触发。                                   |
| groupMuteListDidUpdate                                       | 当一个或多个群组成员被取消禁言时触发。                                 |
| groupWhiteListDidUpdate:addedWhiteListMembers:                                         | 当一个或多个群组成员被添加到白名单列表时触发。                  |
| groupWhiteListDidUpdate:removedWhiteListMembers:                                     | 当一个或多个成员从白名单列表中移除时触发。                    |
| groupAllMemberMuteChanged                | 当所有群组成员被禁言或取消禁言时触发。                                |
| groupAdminListDidUpdate:addedAdmin:                                               | 当某个成员被设置为管理员时触发。                                           |
| groupAdminListDidUpdate:removedAdmin:                                           | 当某个成员的管理员权限被移除时触发。                               |
| groupOwnerDidUpdate                                   | 当群组所有权被转移时触发。                                    |
| userDidJoinGroup                                           | 当某个成员加入群组时触发。                                                |
| userDidLeaveGroup                                           | 当某个成员主动离开群组时触发。                                 |
| groupAnnouncementDidUpdate                             | 当公告被更新时触发。                                           |
| onSharedFileAdded                              | 当共享文件被添加到群组时触发。                                     |
| onSharedFileDeleted                                 | 当共享文件从群组中移除时触发。                                 |
| groupSpecificationDidUpdate                                    | 当群组详细信息被更新时触发。                               |
| groupStateChanged                                           | 当群组被启用或禁用时触发。                                      |

## 子区

- `ChatThreadManager` 类提供了管理子区的方法，包括创建、解散子区以及成员管理。
- `ThreadManagerDelegate` 类提供子区事件监听。

| 方法                | 描述            |
| :----------------------- | :-------------- |
| createChatThread                          | 创建Thread。                                                                                                              |
| joinChatThread                                              | 加入Thread。                                                                                                                |
| destroyChatThread                                             | 销毁Thread。                                                                                                           |
| leaveChatThread                                                 | 离开Thread。                                                                                                               |
| getChatThreadFromServer                            | 从服务器获取子区的详细信息。                                                                                |
| updateChatThreadName                               | 更改子区的名称。                                                                                                |
| removeMemberFromChatThread                   | 从子区中移除成员。                                                                                              |
| getChatThreadMembers                     | 分页获取子区中的成员列表。                                                                          |
| getJoinedChatThreadsFromServer         | 分页获取当前用户已加入的子区列表。                                               |
| getJoinedChatThreadsFromServer | 分页获取当前用户在指定组中已加入的子区列表。                        |
| getChatThreadsFromServer             | 分页获取指定组中的子区列表。                                                         |
| getChatThreadLatestMessage                        | 从服务器获取指定子区的最后一条回复。                                                                  |
| addChatThreadChangeListener                 | 添加Thread事件监听器，监听子区的变化，例如子区的创建和销毁。 |

| 事件                   | 描述                     |
| :----------------------- | :-------------------------------- |
| onChatThreadCreate         | 当子区被创建时触发。                                                                                                 |
| onChatThreadUpdate         | 当子区被更新时触发。                                                                                                 |
| onChatThreadDestroy     | 当子区被销毁时触发。                                                                                               |
| onUserKickOutOfChatThread | 当当前用户被群主或群管理员从子区中移除时触发。 |

## 聊天室

- `ChatRoomManager` 类提供聊天室管理的方法，如加入和离开聊天室、获取聊天室列表，以及管理成员权限。
- `ChatRoomManagerDelegate` 类提供聊天室事件监听。

| 方法       | 描述                 |
| :----------------------------- | :--------------------------- |
| createChatRoom                                 | 创建聊天室。                                                          |
| destroyChatroom                                                               | 销毁聊天室。                                                         |
| joinChatRoom                                                                          | 加入聊天室。                                                            |
| leaveChatroom                                                                                       | 退出聊天室。                                                            |
| getChatroomsFromServer                          | 从服务器获取聊天室数据，支持分页。                          |
| getChatroomSpecificationFromServer                                                                   | 从服务器获取聊天室的详细信息。                                  |
| asyncChangeChatRoomSubject                                      | 修改聊天室名称。   | 
| updateSubject                              | 修改聊天室描述。                                           |
| getChatroomMemberListFromServer                                   | 获取聊天室成员列表。                                               |
| muteMembers                                      | 在聊天室中禁言成员。                                                 |
| unmuteMembers                                        | 在聊天室中取消禁言成员。                                               |
| addAdmin                                                | 添加聊天室管理员。                                                       |
| removeAdmin                                          | 移除聊天室管理员的管理权限。                       |
| getChatroomMuteListFromServer                                    | 从服务器获取禁言聊天室成员列表。                     |
| removeMembers                                        | 从聊天室中移除成员。                                             |
| blockMembers                                          | 将成员添加到聊天室的黑名单中。                              |
| unblockMembers                                      | 从聊天室的黑名单中移除成员。                         |
| getChatroomBlacklistFromServer                                  | 获取聊天室黑名单，支持分页。                                |
| addWhiteListMembers                                                | 将成员添加到聊天室的白名单中。                              |
| removeWhiteListMembers                                      | 从聊天室的白名单中移除成员。                                |
| getChatroomWhiteListFromServer                                                      | 从服务器获取聊天室的白名单。                                |
| muteAllMembers                                                                      | 禁言所有成员。                                                            |
| unmuteAllMembers                                                                  | 取消禁言所有成员。                                                          |
| updateChatroomAnnouncement                                 | 更新聊天室公告。                                           |
| getChatroomAnnouncement                                      | 从服务器获取聊天室公告。                              |
| setChatroomAttributes                               | 添加自定义聊天室属性。                                             |
| setChatroomAttribute                            | 设置自定义聊天室属性。                                            |
| setChatroomAttributesForced                   | 强制设置自定义聊天室属性。                                    |
| setChatroomAttributeForced                | 强制设置自定义聊天室属性。                                   |
| fetchChatroomAttributes                | 根据属性键列表获取聊天室的自定义属性列表。 |
| fetchChatroomAllAttributes                | 获取聊天室的所有自定义属性。                                |
| removeChatroomAttributes             | 根据属性键列表移除自定义聊天室属性。                |
| removeChatroomAttribute                   | 移除自定义聊天室属性。                                         |
| removeChatroomAttributesForced | 强制移除自定义聊天室属性。                                 |
| removeChatroomAttributeForced       | 强制移除自定义聊天室属性。                                |
| addDelegate                                               | 添加聊天室事件监听器。                                              |

| 事件                | 描述    |
| :--------------------------- | :---------------------------------------------------------------------- |
| didDismissFromChatroom                  | 当前用户被移出聊天室时触发。                                 |
| userDidJoinChatroom                            | 当其他成员加入聊天室时触发。                               |
| userDidLeaveChatroom                    | 当其他成员退出聊天室时触发。                               |
| onMuteListAdded                      | 当聊天室成员被添加到禁言列表时触发。      |
| onMuteListRemoved                        | 当聊天室成员从禁言列表中移除时触发。  |
| onWhiteListAdded                          | 当聊天室成员被添加到白名单时触发。     |
| onWhiteListRemoved                      | 当聊天室成员从白名单中移除时触发。 |
| chatroomAllMemberMuteChanged | 当聊天室中的全员禁言状态变更时触发。          |
| onAdminAdded                                | 当聊天室成员被设置为管理员时触发。                      |
| onAdminRemoved                            | 当聊天室成员从管理员列表中移除时触发。 |
| chatroomOwnerDidUpdate                    | 当聊天室的拥有者更改时触发。                             |
| chatroomAnnouncementDidUpdate              | 当聊天室公告更改时触发。                         |
| chatroomSpecificationDidUpdate:                  | 当聊天室详情更改时触发。                       |
| chatroomAttributesDidUpdated               | 当自定义聊天室属性更新时触发。           |
| chatroomAttributesDidRemoved            | 当自定义聊天室属性被移除时触发。           |

## 联系人

- `ContactManager` 类提供管理聊天联系人（如添加、获取、修改和删除联系人）的方法。 
- `ContactManagerDelegate` 类提供联系人事件监听。

| 方法             | 描述                                             |
| :---------- | :---------------- |
| getContactsFromServerWithCompletion:   | 从服务器获取所有联系人。                                     |
| addUserToBlackList                       | 将用户添加到黑名单。                                             |
| removeUserFromBlackList                      | 从黑名单中移除联系人。                               |
| getBlackList                                | 获取本地黑名单。                                             |
| getBlackListFromServerWithCompletion:       | 从服务器获取黑名单。                                   |
| approveFriendRequestFromUser                                  | 接受好友邀请。                                          |
| declineFriendRequestFromUser                                  | 拒绝好友邀请。                                          |
| getContacts                                  | 从本地数据库获取联系人列表。                         |
| getSelfIdsOnOtherPlatformWithCompletion: | 获取当前用户在其他设备上的唯一自我ID列表。 |
| addDelegate                       | 添加联系人变更监听。                                      |

| 事件          | 描述           |
| :------------------ | :------------------------ |
| friendshipDidAddByUser:                   | 当用户被其他用户添加为联系人时触发。                                     |
| friendshipDidRemoveByUser:               | 当用户被其他用户从联系人列表中移除时触发。                                 |
| friendRequestDidReceiveFromUser:message:       | 当用户收到好友请求时触发。                                               |
| friendRequestDidApproveByUser: | 当好友请求被批准时触发。                                               |
| onFriendRequestDeclined | 当好友请求被拒绝时触发。                                               |


## 用户在线状态订阅

- `PresenceManager` 类提供管理用户在线状态订阅的方法。
- `PresenceManagerDelegate` 类提供订阅用户状态变更监听。

| 方法        | 描述         |
| :-------------------------- | :-------------------------------- |
| publishPresence                      | 发布自定义的在线状态。                                                   |
| subscribePresences       | 订阅用户的在线状态。                                              |
| unsubscribePresences              | 取消订阅用户的在线状态。                                          |
| fetchSubscribedMembers | 使用分页获取已订阅的用户的列表。 |
| fetchPresenceStatus           | 获取用户的当前在线状态。                                            |
| addDelegate                              | 添加监听器。                                                                     |

| 事件                                                                                 | 描述                                           |
| :--------------------------------------- | :----------------------- |
| presenceStatusDidChanged: | 当订阅的用户的在线状态更新时触发。 |

## 用户属性

`UserInfoManager` 类提供了管理用户属性的方法，包括获取和更新用户属性。

| 方法     | 描述               |
| :------------------------ | :----------------- |
| updateOwnInfo                                       | 修改当前用户的用户属性。                |
| updateOwnInfoByAttribute     | 修改当前用户的用户属性。                   |
| fetchUserInfoByUserId                       | 根据用户 ID 获取用户属性。                     |
| fetchUserInfoByAttribute | 根据用户 ID 和属性类型获取用户属性。 |

## 离线推送

`PushManager` 类提供了配置离线推送服务的方法。

| 方法          | 描述                  |
| :------------------------------- | :-------------- |
| getPushConfigsFromServer                                                                              | 从服务器获取推送配置。                                     |
| updatePushDisplayName                                                                | 更新当前用户的推送显示昵称。                     |
| setSilentModeForConversation | 修改会话的免打扰设置。                                          |
| clearRemindTypeForConversation                   | 清除会话的离线推送通知类型设置。 |
| getSilentModeForConversation                  | 获取会话的免打扰设置。                                  |
| setSilentModeForAll                                                          | 设置当前登录用户的免打扰设置。                          |
| getSilentModeForAll                                                                           | 获取当前登录用户的免打扰设置。                           |
| getSilentModeForConversations                                                 | 批量获取指定会话的免打扰设置。            |
| bindDeviceToken                                                 | 绑定 APNs Token。            |
| registerPushKitToken                                                 | 绑定 VoIP Token。            |
