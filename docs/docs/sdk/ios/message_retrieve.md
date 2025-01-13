# 获取历史消息

<Toc />

本文介绍即时通讯 IM SDK 如何从服务器和本地获取历史消息。

- 即时通讯 IM 提供消息漫游功能，即将用户的所有会话的历史消息保存在消息服务器，用户在任何一个终端设备上都能获取到历史信息，使用户在多个设备切换使用的情况下也能保持一致的会话场景。

- SDK 内部使用 SQLite 保存本地消息，你可以获取本地消息。

## 技术原理

即时通讯 IM iOS SDK 提供 `IAgoraChatManager` 和 `AgoraChatConversation` 类支持获取服务器和本地的消息，包含如下主要方法：

- `IAgoraChatManager#fetchMessagesFromServer`：根据 `AgoraChatFetchServerMessagesOption` 类从服务器分页获取指定会话的历史消息；
- `AgoraChatConversation#loadMessagesStartFromId`：从数据库中读取指定会话的消息；
- `IAgoraChatManager#getMessageWithMessageId`：根据消息 ID 获取本地消息；
- `AgoraChatConversation#loadMessagesWithType`：获取本地存储的指定会话中特定类型的消息；
- `AgoraChatConversation#loadMessagesFrom:to:count:completion:` 获取指定时间段内本地指定会话中发送和接收的消息；
- `AgoraChatConversation#getMessageCountStart:to:`：获取会话在一定时间内的消息数。

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，并连接到服务器，详见 [快速开始](quickstart.html)。
- 了解即时通讯 IM 的使用限制，详见 [使用限制](limitation.html)。

## 实现方法

### 从服务器获取指定会话的消息

对于单聊或群聊，用户发消息时，会自动将对方添加到用户的会话列表。

你可以调用 `fetchMessagesFromServer` 方法基于 `AgoraChatFetchServerMessagesOption` 类从服务端分页拉取单聊和群组聊天的历史消息。为确保数据可靠，我们建议你每次获取 20 条消息，最大不超过 50。分页查询时，若满足查询条件的消息总数大于 `pageSize` 的数量，则返回 `pageSize` 数量的消息，若小于 `pageSize` 的数量，返回实际条数。消息查询完毕时，返回的消息条数小于 `pageSize` 的数量。

通过设置 `AgoraChatFetchServerMessagesOption` 类，你可以根据以下条件拉取历史消息：

- 消息发送方；
- 消息类型；
- 消息时间段；
- 消息搜索方向；
- 是否将拉取的消息保存到数据库；
- 对于群组聊天，你可以设置 `from` 参数拉取群组中单个成员发送的历史消息。

若你在初始化时打开了 `AgoraChatOptions#regardImportMessagesAsRead` 开关，调用该接口获取的[通过服务端接口](/docs/sdk/server-side/message_import.html)导入的消息为已读状态，即会话中未读取的消息数量 `AgoraChatConversation#unreadMessagesCount` 不发生变化。若该开关为关闭状态，`AgoraChatConversation#unreadMessagesCount` 的数量会增加。

:::tip
- **默认可获取单聊和群组聊天的历史消息。若要获取聊天室的历史消息，并联系声网商务。**
- 从服务器拉取历史消息时会读取服务端的消息已读和送达状态。该功能默认关闭，如果需要，请联系声网商务开通。
- 历史消息在服务器上的存储时间与产品的套餐包相关，详见[产品套餐包详情](/product/pricing.html#套餐包功能详情)。
:::

```objectivec
        AgoraChatFetchServerMessagesOption *option = [[AgoraChatFetchServerMessagesOption alloc] init];
        option.from = @"";
        option.endTime = -1;
        option.msgTypes = @[@(AgoraChatMessageBodyTypeText)];
        [AgoraChatClient.sharedClient.chatManager fetchMessagesFromServerBy:@"conversationId" conversationType:AgoraChatConversationTypeChat cursor:@"" pageSize:50 option:option completion:^(AgoraChatCursorResult<AgoraChatMessage *> * _Nullable result, AgoraChatError * _Nullable aError) {
            
        }];
```

此外，你也可以调用 `asyncFetchHistoryMessagesFromServer` 方法从服务器获取指定会话的消息。你可以指定消息查询方向，即明确按时间顺序或逆序获取。为确保数据可靠，我们建议你每次最多获取 50 条消息，可多次获取。拉取后，SDK 会自动将消息更新到本地数据库。

```objectivec
// 异步方法
 [[AgoraChatClient sharedClient].chatManager asyncFetchHistoryMessagesFromServer:conversation.conversationId conversationType:conversation.type startMessageId:self.moreMsgId pageSize:10 completion:^(AgoraChatCursorResult *aResult, AgoraChatError *aError) {
             [self.conversation loadMessagesStartFromId:self.moreMsgId count:10 searchDirection:AgoraChatMessageSearchDirectionUp completion:block];
          }];
```

### 从本地读取指定会话的消息

你可以调用以下方法从数据库中读取指定会话的消息：

```objectivec
// 获取指定会话 ID 的会话。
AgoraChatConversation *conversation = [[AgoraChatClient sharedClient].chatManager getConversation:conversationId type:type createIfNotExist:YES];
//startMsgId：查询的起始消息 ID； count：每次获取的消息条数。如果设为小于等于 0，SDK 获取 1 条消息。
//searchDirection：消息搜索方向。若消息方向为 `UP`，按消息时间戳的降序获取；若为 `DOWN`，按消息时间戳的升序获取。
NSArray<AgoraChatMessage *> *messages = [conversation loadMessagesStartFromId:startMsgId count:count searchDirection:MessageSearchDirectionUp];
```

### 根据消息 ID 获取本地消息

你可以调用 `getMessageWithMessageId` 方法根据消息 ID 获取本地存储的指定消息。如果消息不存在会返回空值。

```objectivec
// 同步方法
AgoraChatConversation* conv = [AgoraChatClient.sharedClient.chatManager getConversationWithConvId:@"conversationId"];
AgoraChatError* err = nil;
// messageId：要获取消息的消息 ID。
AgoraChatMessage* message = [AgoraChatClient.sharedClient.chatManager getMessageWithMessageId:@"messageId"];
```

### 获取本地会话中特定类型的消息

你可以调用 `loadMessagesWithType` 方法从本地存储中获取指定会话中特定类型的消息。每次最多可获取 400 条消息。若未获取到任何消息，SDK 返回空列表。

```objectivec
// 异步方法
AgoraChatConversation* conv = [AgoraChatClient.sharedClient.chatManager getConversationWithConvId:@"conversationId"];
// timestamp：消息搜索的起始时间戳，单位为毫秒。该参数设置后，SDK 从指定的时间戳的消息开始，按照搜索方向对消息进行搜索。若设置为负数，SDK 从当前时间开始，按消息时间戳的逆序搜索。
// count：每次搜索的消息数量。取值范围为 [1,400]。
// searchDirection：消息搜索方向：（默认）`UP`：按消息时间戳的逆序搜索；`DOWN`：按消息时间戳的正序搜索。
[conv loadMessagesWithType:AgoraChatMessageBodyTypeText timestamp:1671761876000 count:50 fromUser:@"" searchDirection:AgoraChatMessageSearchDirectionUp completion:^(NSArray<AgoraChatMessage *> * _Nullable aMessages, AgoraChatError * _Nullable aError) {
        
}];
```

### 获取一定时间内本地会话的消息

你可以调用 `loadMessagesFrom:to:count:completion:` 方法从本地存储中获取指定的单个会话中一定时间内发送和接收的消息。

每次最多可获取 400 条消息。

```objectivec
// 异步方法
AgoraChatConversation* conv = [AgoraChatClient.sharedClient.chatManager getConversationWithConvId:@"conversationId"];
// startTime：查询的起始时间戳，单位为毫秒；endTime：查询的结束时间戳，单位为毫秒；count：每次获取的消息数量。取值范围为 [1,400]。
[conv loadMessagesFrom:startTime to:endTime count:50 completion:^(NSArray<AgoraChatMessage *> * _Nullable aMessages, AgoraChatError * _Nullable aError) {
            
}];
```

### 获取会话在一定时间内的消息数

你可以调用 `AgoraChatConversation#getMessageCountStart:to:` 方法从 SDK 本地数据库中获取会话在某个时间段内的全部消息数。

```objectivec
[[AgoraChatClient.sharedClient.chatManager getConversationWithConvId:@"conversationId"] getMessageCountStart:startTimestamp to:endTimestamp];
```
