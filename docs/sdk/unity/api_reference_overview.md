# API 概览

即时通讯 IM 是一个高度可靠的全球通信平台，用户可以进行一对一单聊、群组聊天或聊天室聊天。用户可以通过发送文本消息、分享图片、音频、视频、文件、表情符号和位置进行沟通。

- `SDKClient` 类是聊天 SDK 的入口，提供登录和登出即时通讯 IM 的方法，并管理 SDK 与聊天服务器之间的连接。
- `ChatManager` 类提供发送和接收消息、管理会话（包括加载和删除会话）以及下载附件的方法。
- `Message` 类定义消息的属性。
- `Conversation` 类提供管理会话的方法。
- `ContactManager` 类提供管理聊天联系人（如添加、获取、修改和删除联系人）的方法。
- `GroupManager` 类提供群组管理的方法，如群组创建和解散以及成员管理。
- `RoomManager` 类提供聊天室管理的方法，如加入和离开聊天室、获取聊天室列表，以及管理成员权限。
- `PresenceManager` 类提供管理用户在线状态订阅的方法。
- `ChatThreadManager` 类提供了管理子区的方法，包括创建、解散子区以及成员管理。
- `UserInfoManager` 类提供了管理用户属性的方法，包括获取和更新用户属性。

如欲了解各类中的方法和参数详情，请点击[这里](https://im.shengwang.cn/sdkdocs/chat1.x/unity/)。

## 连接与初始化

`SDKClient` 类提供登录和登出即时通讯 IM 的方法和事件，并管理 SDK 与聊天服务器之间的连接。

| 方法                             | 描述                         |
| :---------------------------------| :-----------------------------------|
| InitWithOptions                  | 初始化 SDK。                        |
| LoginWithToken                   | 使用用户 ID 和 token 登录聊天服务器。  |
| RenewToken                       | 更新 token。                          |
| Logout                           | 退出聊天服务器。                    |
| CurrentUsername                  | 获取当前登录用户的用户 ID。         |
| IsConnected                      | 检查 SDK 是否已连接到聊天服务器。  |
| IsLoggedIn                       | 检查用户是否已登录聊天应用。        |
| GetLoggedInDevicesFromServer     | 获取指定帐户登录的在线设备列表。    |
| GetLoggedInDevicesFromServerWithToken | 获取指定帐户（token）登录的在线设备列表。 |
| KickDevice                       | 从指定帐户在设备上登出。            |
| KickDeviceWithToken              | 从指定帐户（token）在设备上登出。    |
| kickAllDevices                   | 从指定帐户在所有设备上登出。        |
| KickAllDevicesWithToken          | 从指定帐户（token）在所有设备上登出。|
| AddConnectionDelegate            | 添加连接状态监听器。                |
| GroupManager                     | 获取 `GroupManager` 类。            |
| RoomManager                      | 获取 `ChatRoomManager` 类。         |
| ChatManager                      | 获取 `ChatManager` 类。             |
| UserInfoManager                  | 获取 `UserInfoManager` 类。         |
| ContactManager                   | 获取 `ContactManager` 类。          |
| PresenceManager                  | 获取 `PresenceManager` 类。         |
| ThreadManager                    | 获取 `ChatThreadManager` 类。       |

| 方法                                 | 事件                                                                 |
| :------------------------------------- | :-------------------------------------------------------------------------- |
| OnConnected                            | 当 SDK 成功连接到聊天服务器时触发。                                         |
| OnDisconnected                         | 当 SDK 从聊天服务器断开连接时触发。                                         |
| OnLoggedOtherDevice                    | 当前用户帐户登录到另一台设备时触发。                                       |
| OnRemovedFromServer                    | 当前用户帐户被服务器移除时触发。                                           |
| OnForbidByServer                       | 当前用户帐户被禁用时触发。                                                 |
| OnChangedIMPwd                         | 当前用户帐户因登录密码更改被强制退出时触发。                               |
| OnLoginTooManyDevice                   | 当用户达到当前帐户可登录的设备数量上限时被强制退出当前帐户时触发。           |
| OnKickedByOtherDevice                  | 当前帐户因登录到另一台设备而被强制从设备下线时触发。                       |
| OnAuthFailed                           | 当前帐户因身份验证失败被强制退出时触发。                                   |
| OnTokenExpired                         | 当 token 已过期时触发。                                                         |
| OnTokenWillExpire                      | 当 token 即将过期时触发。                                                       |
| OnAppActiveNumberReachLimitation       | 当活动应用数量达到上限时触发。                                               |


## 发送消息

- `ChatManager` 类提供发送和接收消息、管理会话（包括加载和删除会话）以及下载附件的方法和事件。
- `CallBack` 类提供消息状态事件，包括消息发送或下载成功和失败以及上传或下载进度。
- `IChatManagerDelegate` 类用于监听收消息，已读回执等事件。

| 方法                                 | 描述                                                                 |
| :------------------------------------- | :-------------------------------------------------------------------------- |
| SendMessage                            | 发送消息。                                                                  |
| SendConversationReadAck                | 发送会话已读回执。                                                  |
| SendMessageReadAck                     | 发送消息已读回执。                                                  |
| SendReadAckForGroupMessage             | 发送群消息已读回执。                                                |
| GetConversation                        | 通过会话 ID 获取会话对象。                                                  |
| MarkAllConversationsAsRead             | 将所有会话标记为已读。                                                      |
| UpdateMessage                          | 更新本地消息。                                                              |
| DownloadAttachment                     | 下载消息附件。                                                              |
| DownloadThumbnail                      | 下载消息缩略图。                                                            |
| ImportMessages                         | 导入消息到本地数据库。                                                      |
| LoadAllConversations                   | 获取所有本地会话。                                                          |
| DeleteConversation                     | 从本地数据库中删除会话及其本地消息。                                        |
| DeleteConversationFromServer           | 从服务器删除指定会话及其历史消息。                                          |
| FetchGroupReadAcks                     | 使用分页从服务器获取群消息的已读回执。                                      |
| SearchMsgFromDB                        | 检索一定数量的本地消息。                                                    |
| SearchMsgFromDB                        | 根据消息范围查询本地消息。                                                  |
| FetchHistoryMessagesFromServer         | 从服务器获取会话的历史消息。                                                |
| FetchHistoryMessagesFromServerBy       | 根据 `FetchServerMessagesOption` 从服务器获取会话的历史消息。                 |
| RemoveMessagesBeforeTimestamp          | 删除指定 Unix 时间戳之前的本地历史消息。                                    |
| ReportMessage                          | 举报不适当的消息。                                                          |
| FetchSupportLanguages                  | 获取翻译服务支持的所有语言。                                                |
| TranslateMessage                       | 翻译文本消息。                                                              |
| AddReaction                            | 添加 Reaction。                                                             |
| RemoveReaction                         | 删除 Reaction。                                                             |
| GetReactionList                        | 获取 Reaction 列表。                                                        |
| GetReactionDetail                      | 获取 Reaction 详情。                                                        |
| GetConversationsFromServerWithPage     | 从服务器获取一些会话。                                                      |
| GetConversationsFromServerWithCursor   | 从服务器获取一些会话。                                                      |
| GetConversationsFromServerWithCursor   | 根据会话标记从服务器获取会话。                                              |
| RemoveMessagesFromServer               | 删除会话中的消息（从本地存储和服务器）。                                    |
| FetchCombineMessageDetail              | 获取合并消息详情。                                                          |
| ModifyMessage                          | 修改已发送的消息。                                                          |
| DeleteAllMessagesAndConversations      | 清除所有会话及其中的所有消息。                                              |
| MarkConversations                      | 标记或取消标记会话。                                                        |
| PinMessage                             | 置顶或取消置顶消息。                                                        |
| GetPinnedMessagesFromServer            | 从服务器获取会话中置顶消息的列表。                                          |
| RecallMessage                          | 撤回消息。                                                                  |
| AddChatManagerDelegate                 | 添加消息监听器。                                                            |
| RemoveChatManagerDelegate              | 移除会话监听器。                                                            |

| 事件                             | 描述                                         |
| :-------------------------------- | :-------------------------------------------------- |
| OnMessagesReceived                | 收到消息时触发。                                   |
| OnCmdMessagesReceived             | 收到命令消息时触发。                               |
| OnMessagesRead                    | 收到消息已读回执时触发。                           |
| OnGroupMessageRead                | 收到群消息已读回执时触发。                         |
| OnReadAckForGroupMessageUpdated   | 收到群消息已读状态更新时触发。                     |
| OnMessagesDelivered               | 收到消息送达回执时触发。                           |
| OnMessagesRecalled                | 收到消息撤回时触发。                               |
| MessageReactionDidChange          | 消息的 Reaction 发生变化时触发。                   |
| OnConversationsUpdate             | 会话更新时触发。                                   |
| OnConversationRead                | 收到会话已读回执时触发。                           |
| OnMessageContentChanged           | 已发送消息被修改时触发。                           |
| OnMessagePinChanged               | 消息被置顶或取消置顶时触发。                       |

## 消息与会话

- `Message` 类定义消息的属性。
- `Conversation` 类提供管理会话的方法。

| 方法                             | 描述                                         |
| :--------------------------------- | :-------------------------------------------------- |
| Conversation.conversationId                     | 会话 ID，取决于会话类型。                           |
| Conversation.UnReadCount                        | 获取会话中的未读消息数量。                         |
| Conversation.MarkAllMessageAsRead               | 将所有未读消息标记为已读。                         |
| Conversation.MessagesCount                      | 获取本地数据库中会话的所有未读消息数量。           |
| Conversation.IsThread                           | 检查当前会话是否为子区会话。                       |
| Conversation.LoadMessages                       | 从本地数据库加载消息，从特定消息 ID 开始。         |
| Conversation.LoadMessage                        | 获取指定消息 ID 的消息。                           |
| Conversation.MarkMessageAsRead                  | 将消息标记为已读。                                 |
| Conversation.DeleteMessage                      | 删除本地数据库中的消息。                           |
| Conversation.LastMessage                        | 获取会话中的最新消息。                             |
| Conversation.LastReceivedMessage                | 获取会话中最新接收的消息。                         |
| Conversation.DeleteAllMessages                  | 从内存和本地数据库中删除会话中的所有消息。         |
| Conversation.Ext                                | 设置或获取会话的扩展字段。                         |
| Conversation.InsertMessage                      | 将消息插入到本地数据库中的会话。                   |
| Conversation.AppendMessage                      | 将消息插入到本地数据库中的会话末尾。               |
| Conversation.UpdateMessage                      | 更新本地数据库中的消息。                           |
| Conversation.IsPinned                           | 检查会话是否被置顶。                               |
| Conversation.PinnedTime                         | 获取会话被置顶的时间戳，单位为毫秒。               |
| Conversation.DeleteMessages                     | 删除本地数据库中某个时间段内发送或接收的消息。     |
| Conversation.LoadMessagesWithScope              | 加载指定范围内符合条件的消息。                     |
| Conversation.PinnedMessages                     | 获取本地会话中置顶消息的列表。                     |
| Conversation.Marks                              | 获取会话的标记。                                   |
| Message.Status                             | 获取消息的发送或接收状态。                         |
| Message.Body                               | 获取消息体。                                       |
| Message.ServerTime                         | 获取服务器接收消息的 Unix 时间戳。                 |
| Message.LocalTime                          | 获取消息的本地时间戳。                             |
| Message.IsThread                           | 设置或获取消息是否为子区消息。                     |
| Message.Broadcast                          | 是否为应用内所有聊天室的全局广播消息。             |
| Message.ChatThread                         | 获取消息Thread的概览。                               |
| Message.CreateSendMessage                  | 创建一个发送消息实例。                             |
| Message.CreateReceiveMessage               | 创建一个接收消息实例。                             |
| Message.CreateTextSendMessage              | 创建一个发送文本消息。                             |
| Message.CreateVoiceSendMessage             | 创建一个发送语音消息。                             |
| Message.CreateImageSendMessage             | 创建一个发送图片消息。                             |
| Message.CreateVideoSendMessage             | 创建一个发送视频消息。                             |
| Message.CreateLocationSendMessage          | 创建一个发送位置消息。                             |
| Message.CreateFileSendMessage              | 创建一个发送文件消息。                             |
| Message.CreateCombineSendMessage           | 创建一个发送合并消息。                             |
| Message.From                               | 获取或设置消息发送者的用户 ID。                    |
| Message.To                                 | 设置或获取消息接收者的用户 ID。                    |
| Message.MsgId                              | 获取或设置消息 ID。                                |
| Message.SetAttribute                       | 设置消息的扩展属性。                 |
| Message.GetAttributeValue                  | 获取消息的扩展属性。                 |
| Message.HasReadAck                         | 获取消息是否已读。                                 |
| Message.HasDeliverAck                      | 获取消息是否成功送达。                             |
| Message.IsRead                             | 检查消息是否已读。                                 |
| Message.ConversationId                     | 获取会话 ID。                                      |
| Message.ReactionList                       | 获取消息的 Reaction 列表。                         |
| Message.MessageOnlineState                 | 检查消息是否送达在线用户。                         |
| Message.ReceiverList                       | 获取接收消息的群组或聊天室成员的 ID 列表。         |
| Message.DeliverOnlineOnly                  | 检查消息是否仅在接收者在线时送达。                 |
| Message.IsContentReplaced                  | 检查消息内容是否被替换。                           |
| Message.PinnedInfo                         | 获取消息的置顶信息。                               |

| 事件      | 描述                              |
| :-------- | :-------------------------------- |
| Success   | 方法成功时触发。                  |
| Error     | 发生错误时触发。                  |
| Progress  | 进度更新时触发。                  |

## 群组

- `GroupManager` 类提供群组管理的方法，如群组创建和解散以及成员管理。
- `IGroupManagerDelegate` 类提供群组管理事件监听。

| 方法                           | 描述                                                         |
| :----------------------------- | :---------------------------------------------------------- |
| CreateGroup                    | 创建群组实例。                                               |
| DestroyGroup                   | 销毁群组实例。                                               |
| LeaveGroup                     | 退出群组。                                                   |
| JoinPublicGroup                | 加入公开群组。                                               |
| AddGroupMembers                | 添加用户到群组。                                             |
| DeleteGroupMembers             | 从群组中移除成员。                                           |
| GetGroupSpecificationFromServer| 从服务器获取群组信息。                                       |
| FetchJoinedGroupsFromServer    | 分页从服务器获取当前用户的所有群组。                         |
| FetchPublicGroupsFromServer    | 分页从服务器获取公开群组。                                   |
| ChangeGroupName                | 更改群组名称。                                               |
| ChangeGroupDescription         | 更改群组描述。                                               |
| AcceptGroupInvitation          | 接受群组邀请。                                               |
| DeclineGroupInvitation         | 拒绝群组邀请。                                               |
| AcceptGroupJoinApplication     | 批准群组请求。                                               |
| DeclineGroupJoinApplication    | 拒绝群组请求。                                               |
| ApplyJoinToGroup               | 请求加入群组。                                               |
| BlockGroup                     | 屏蔽群组消息。                                               |
| UnBlockGroup                   | 取消屏蔽群组消息。                                           |
| BlockGroupMembers              | 将用户添加到群组黑名单。                                     |
| UnBlockGroupMembers            | 从群组黑名单中移除用户。                                     |
| GetGroupBlockListFromServer    | 分页从服务器获取群组黑名单。                                 |
| GetGroupMemberListFromServer   | 分页获取群组成员列表。                                       |
| ChangeGroupOwner               | 转让群组所有权。                                             |
| AddGroupAdmin                  | 添加群组管理员。                                             |
| RemoveGroupAdmin               | 移除群组管理员。                                             |
| MuteGroupMembers               | 禁言群组成员。                                               |
| UnMuteGroupMembers             | 取消禁言群组成员。                                           |
| GetGroupMuteListFromServer     | 从服务器获取群组禁言列表。                                   |
| AddGroupAllowList              | 添加成员到群组白名单。                                       |
| RemoveGroupAllowList           | 从群组白名单中移除成员。                                     |
| GetGroupAllowListFromServer    | 从服务器获取群组白名单。                                     |
| UpdateGroupAnnouncement        | 更新群组公告。                                               |
| GetGroupAnnouncementFromServer | 从服务器获取群组公告。                                       |
| UploadGroupSharedFile          | 上传群组共享文件。                                           |
| GetGroupFileListFromServer     | 从服务器获取群组共享文件列表。                               |
| DeleteGroupSharedFile          | 删除群组共享文件。                                           |
| CheckIfInGroupAllowList        | 获取当前用户是否在群组白名单中。                             |
| FetchMemberAttributes          | 获取群组成员的自定义属性。                                   |
| SetMemberAttributes            | 设置群组成员的自定义属性。                                   |
| DownloadGroupSharedFile        | 下载群组共享文件。                                           |
| FetchMyGroupsCount             | 获取当前用户加入的群组数量。                                 |
| AddGroupManagerDelegate        | 注册群组变更监听器。                                         |

| 事件                           | 描述                                                                         |
| :----------------------------- | :--------------------------------------------------------------------------- |
| OnInvitationReceivedFromGroup  | 当用户收到群组邀请时触发。                                                   |
| OnRequestToJoinReceivedFromGroup | 当群主或管理员收到用户的群组请求时触发。                                     |
| OnRequestToJoinAcceptedFromGroup | 当加群请求被接受时触发。                                                     |
| OnRequestToJoinDeclinedFromGroup | 当加群请求被拒绝时触发。                                                     |
| OnInvitationAcceptedFromGroup  | 当入群邀请被接受时触发。                                                     |
| OnInvitationDeclinedFromGroup  | 当群组邀请被拒绝时触发。                                                     |
| OnUserRemovedFromGroup         | 当前用户被群组管理员移除时触发。                                           |
| OnDestroyedFromGroup           | 当群组被销毁时触发。                                                         |
| OnAutoAcceptInvitationFromGroup | 当群组邀请被自动接受时触发。                                                 |
| OnMuteListAddedFromGroup       | 当一个或多个群组成员被禁言时触发。                                           |
| OnMuteListRemovedFromGroup     | 当一个或多个群组成员被取消禁言时触发。                                       |
| OnAddAllowListMembersFromGroup | 当一个或多个群组成员被添加到白名单时触发。                                   |
| OnRemoveAllowListMembersFromGroup | 当一个或多个成员从白名单中移除时触发。                                       |
| OnAllMemberMuteChangedFromGroup | 当所有群组成员被禁言或取消禁言时触发。                                       |
| OnAdminAddedFromGroup          | 当成员被设置为管理员时触发。                                                 |
| OnAdminRemovedFromGroup        | 当成员的管理员权限被移除时触发。                                             |
| OnOwnerChangedFromGroup        | 当群组所有权被转让时触发。                                                   |
| OnMemberJoinedFromGroup        | 当成员加入群组时触发。                                                       |
| OnMemberExitedFromGroup        | 当成员主动离开群组时触发。                                                   |
| OnAnnouncementChangedFromGroup | 当群组公告被更新时触发。                                                     |
| OnSharedFileAddedFromGroup     | 当群组中添加共享文件时触发。                                                 |
| OnSharedFileDeletedFromGroup   | 当群组中删除共享文件时触发。                                                 |
| OnUpdateMemberAttributesFromGroup | 当群组成员的自定义属性被更改时触发。                                         |

## 子区

- `ChatThreadManager` 类提供了管理子区的方法，包括创建、销毁子区以及成员管理。
- `IChatThreadManagerDelegate` 类提供子区事件监听。

| 方法                           | 描述                                                                         |
| :----------------------------- | :--------------------------------------------------------------------------- |
| CreateThread                   | 创建消息子区。                                                               |
| JoinThread                     | 加入消息子区。                                                               |
| DestroyThread                  | 销毁消息子区。                                                               |
| LeaveThread                    | 离开消息子区。                                                               |
| GetThreadDetail                | 从服务器获取消息子区的详细信息。                                             |
| ChangeThreadName               | 更改消息子区的名称。                                                         |
| RemoveThreadMember             | 从消息子区中移除成员。                                                       |
| FetchThreadMembers             | 分页获取消息子区中的成员列表。                                               |
| FetchMineJoinedThreadList      | 分页获取当前用户已加入的消息子区列表。                                       |
| FetchThreadListOfGroup         | 分页获取指定群组中的消息子区列表。                                           |
| GetLastMessageAccordingThreads | 从服务器获取指定消息子区中的最后一条回复。                                   |
| AddThreadManagerDelegate       | 添加消息子区事件监听器，监听消息子区的变化，如消息子区的创建和销毁。         |

| 事件                           | 描述                                                                         |
| :----------------------------- | :--------------------------------------------------------------------------- |
| OnChatThreadCreate             | 当消息子区被创建时触发。                                                     |
| OnChatThreadUpdate             | 当消息子区被更新时触发。                                                     |
| OnChatThreadDestroy            | 当消息子区被销毁时触发。                                                     |
| OnUserKickOutOfChatThread      | 当前用户被消息子区所属群组的群主或管理员移出消息子区时触发。               |

## 聊天室

- `RoomManager` 类提供聊天室管理的方法，如加入和离开聊天室、获取聊天室列表，以及管理成员权限。
- `IRoomManagerDelegate` 类提供聊天室事件监听。

| 方法                           | 描述                                                                         |
| :----------------------------- | :--------------------------------------------------------------------------- |
| CreateRoom                     | 创建聊天室。                                                                 |
| DestroyRoom                    | 销毁聊天室。                                                                 |
| JoinRoom                       | 加入聊天室。                                                                 |
| LeaveRoom                      | 退出聊天室。                                                                 |
| FetchPublicRoomsFromServer     | 分页从服务器获取聊天室数据。                                                 |
| FetchRoomInfoFromServer        | 从服务器获取聊天室详情。                                                     |
| ChangeRoomName                 | 更改聊天室名称。                                                             |
| ChangeRoomDescription          | 修改聊天室描述。                                                             |
| FetchRoomMembers               | 获取聊天室成员列表。                                                         |
| MuteRoomMembers                | 禁言聊天室成员。                                                             |
| UnMuteRoomMembers              | 取消禁言聊天室成员。                                                         |
| AddRoomAdmin                   | 添加聊天室管理员。                                                           |
| RemoveRoomAdmin                | 移除聊天室管理员的权限。                                                     |
| FetchRoomMuteList              | 从服务器获取禁言聊天室成员列表。                                             |
| DeleteRoomMembers              | 移除聊天室成员。                                                             |
| BlockRoomMembers               | 将成员添加到聊天室黑名单。                                                   |
| UnBlockRoomMembers             | 将成员从聊天室黑名单中移除。                                                 |
| FetchRoomBlockList             | 分页获取聊天室黑名单。                                                       |
| AddAllowListMembers            | 将成员添加到聊天室白名单。                                                   |
| RemoveAllowListMembers         | 从聊天室白名单中移除成员。                                                   |
| MuteAllRoomMembers             | 禁言所有成员。                                                               |
| UnMuteAllRoomMembers           | 取消禁言所有成员。                                                           |
| UpdateRoomAnnouncement         | 更新聊天室公告。                                                             |
| FetchRoomAnnouncement          | 从服务器获取聊天室公告。                                                     |
| AddAttributes                  | 添加自定义聊天室属性。                                                       |
| FetchAttributes                | 根据属性键列表获取自定义聊天室属性列表。                                     |
| RemoveAttributes               | 根据属性键列表移除自定义聊天室属性。                                         |
| FetchAllowListFromServer       | 检查当前成员是否在聊天室黑名单中。                                           |
| GetChatRoom                    | 从内存中获取聊天室详情。                                                     |
| AddRoomManagerDelegate         | 添加聊天室事件监听器。                                                       |

| 事件                           | 描述                                                                         |
| :----------------------------- | :--------------------------------------------------------------------------- |
| OnDestroyedFromRoom            | 当聊天室被销毁时触发。                                                       |
| OnMemberJoinedFromRoom         | 当有成员加入聊天室时触发。                                                   |
| OnMemberExitedFromRoom         | 当有成员退出聊天室时触发。                                                   |
| OnRemovedFromRoom              | 当有成员被移出聊天室时触发。                                                 |
| OnMuteListAddedFromRoom        | 当聊天室成员被添加到禁言列表时触发。                                         |
| OnMuteListRemovedFromRoom      | 当聊天室成员从禁言列表中移除时触发。                                         |
| OnAdminAddedFromRoom           | 当聊天室成员被设为管理员时触发。                                             |
| OnAdminRemovedFromRoom         | 当聊天室成员从管理员列表中移除时触发。                                       |
| OnOwnerChangedFromRoom         | 当聊天室所有者变更时触发。                                                   |
| OnAnnouncementChangedFromRoom  | 当聊天室公告变更时触发。                                                     |
| OnChatroomAttributesChanged    | 当自定义聊天室属性更新时触发。                                               |
| OnChatroomAttributesRemoved    | 当自定义聊天室属性被移除时触发。                                             |
| OnSpecificationChangedFromRoom | 当聊天室规格变更时触发。                                                     |
| OnAddAllowListMembersFromChatroom | 当聊天室成员被添加到白名单时触发。                                         |
| OnRemoveAllowListMembersFromChatroom | 当聊天室成员从白名单中移除时触发。                                     |
| OnRemoveFromRoomByOffline      | 当成员因离线被移出聊天室时触发。                                             |

## 联系人

- `ContactManager` 类提供管理聊天联系人（如添加、获取、修改和删除联系人）的方法。
- `IContactManagerDelegate` 类提供联系人事件监听。

| 方法                            | 描述                                           |
| :------------------------------ | :---------------------------------------------------- |
| AddContact                      | 添加新联系人。                                       |
| DeleteContact                   | 删除联系人。                                         |
| GetAllContactsFromServer        | 从服务器获取所有联系人。                             |
| AddUserToBlockList              | 将用户添加到黑名单。                                 |
| RemoveUserFromBlockList         | 从黑名单中移除联系人。                               |
| GetBlockListFromServer          | 从服务器获取黑名单。                                 |
| DeclineInvitation               | 拒绝好友邀请。                                       |
| GetAllContactsFromDB            | 从本地数据库获取联系人列表。                         |
| GetSelfIdsOnOtherPlatform       | 获取当前用户在其他设备上的唯一自我 ID 列表。         |
| SetContactRemark                | 为用户 ID 设置备注。                                 |
| FetchContactFromLocal           | 从本地数据库获取联系人信息。                         |
| FetchAllContactsFromLocal       | 从本地数据库获取所有联系人信息。                     |
| FetchAllContactsFromServer      | 从服务器获取所有联系人信息。                         |
| FetchAllContactsFromServerByPage| 分页从服务器获取所有联系人信息。                     |
| AddContactManagerDelegate       | 注册新的联系人监听器。                               |

| 事件                     | 描述                                |
| :------------------------ | :----------------------------------------- |
| OnContactAdded            | 当用户被其他用户添加为联系人时触发。       |
| OnContactDeleted          | 当用户被其他用户从联系人列表中删除时触发。 |
| OnContactInvited          | 当用户收到好友请求时触发。                 |
| OnFriendRequestAccepted   | 当好友请求被批准时触发。                   |
| OnFriendRequestDeclined   | 当好友请求被拒绝时触发。                   |

## 用户在线状态订阅

- `PresenceManager` 类提供管理用户在线状态订阅的方法。
- `IPresenceManagerDelegate` 类提供订阅用户状态变更监听。

| 方法                           | 描述                                                                         |
| :----------------------------- | :--------------------------------------------------------------------------- |
| PublishPresence                | 发布自定义在线状态。                                                         |
| SubscribePresences             | 订阅用户的在线状态。                                                         |
| UnsubscribePresences           | 取消订阅用户的在线状态。                                                     |
| FetchSubscribedMembers         | 分页获取已订阅在线状态的用户列表。                                           |
| FetchPresenceStatus            | 获取用户当前的在线状态。                                                     |
| AddPresenceManagerDelegate     | 添加监听器。                                                                 |

| 事件                           | 描述                                                                         |
| :----------------------------- | :--------------------------------------------------------------------------- |
| OnPresenceUpdated              | 当订阅的用户在线状态更新时触发。                                             |

## 用户属性

- `UserInfoManager` 类提供了管理用户属性的方法，包括获取和更新用户属性。

| 方法                     | 描述                         |
| :----------------------- | :--------------------------- |
| UpdateOwnInfo            | 修改当前用户的信息。         |
| FetchUserInfoByUserId    | 通过用户 ID 获取用户信息。   |