# 管理子区消息

<Toc />

子区消息消息类型属于群聊消息类型，与普通群组消息的区别是需要添加 `isChatThread` 标记。本文介绍即时通讯 IM iOS SDK 如何发送、接收以及撤回子区消息。

## 技术原理

即时通讯 IM iOS SDK 提供 `AgoraChatBaseManager`、`AgoraChatMessage` 和 `AgoraChatThreadInfo` 类，用于管理子区消息，支持你通过调用 API 在项目中实现发送、接收、撤回和获取子区消息。

消息收发流程如下：

客户端 A 向客户端 B 发送消息。消息发送至即时通讯 IM 服务器，服务器将消息传递给客户端 B。对于子区消息，服务器投递给子区内其他每一个成员。客户端 B 收到消息后，SDK 触发事件。客户端 B 监听事件并获取消息。

子区创建和查看如下图：

![img](/images/ios/threads.png)

## 前提条件

开始前，请确保满足以下条件：

- 完成即时通讯 IM SDK 初始化，详见 [初始化文档](initialization.html)。
- 了解即时通讯 IM 的 [使用限制](limitation.html)。
- 产品套餐包支持子区功能。
- 了解子区和子区成员数量限制，详见 [使用限制](limitation.html)。

## 实现方法

本节介绍如何使用即时通讯 IM SDK 提供的 API 实现上述功能。

### 发送子区消息

发送子区消息和发送群组消息的方法基本一致，详情请参考 [发送消息](message_send_receive.html)。唯一不同的是，发送子区消息需要指定标记 `isChatThread` 为 `YES`。

单设备登录时，子区所属群组的所有成员会收到 `AgoraChatThreadManagerDelegate#onChatThreadUpdated` 回调。

示例代码如下：

```objectivec
// 创建一条文本消息，`content` 为消息文字内容，`chatThreadId` 为子区 ID。
NSString *from = [[AgoraChatClient sharedClient] currentUsername];
NSString *chatThreadId = self.currentConversation.conversationId;
AgoraChatMessage *message = [[AgoraChatMessage alloc] initWithConversationID:chatThreadId from:from to:chatThreadId body:aBody ext:aExt];
// 是否需要消息已读回执。
if([aExt objectForKey:MSG_EXT_READ_RECEIPT]) {
    message.isNeedGroupAck = YES;
}
message.chatType = (AgoraChatType)self.conversationType;
message.isChatThread = self.isChatThread;
// 发送消息。
[[AgoraChatClient sharedClient].chatManager sendMessage:message progress:nil completion:^(AgoraChatMessage *message, AgoraChatError *error) {

}];
```

### 接收子区消息

接收消息的具体逻辑，请参考 [接收消息](message_send_receive.html#发送和接收文本消息)，此处只介绍子区消息和其他消息的区别。

子区成员可以设置消息监听回调 `AgoraChatBaseManagerDelegate#messagesDidReceive` 对子区消息的接收进行监听。

示例代码如下：

```objectivec
- (void)messagesDidReceive:(NSArray *)aMessages
{
    // 做相关处理。
}
// 添加消息监听器。
[[AgoraChatClient sharedClient].chatManager addDelegate:self delegateQueue:nil];
// 移除消息监听器。
[[AgoraChatClient sharedClient].chatManager removeDelegate:self];
```

### 撤回子区消息

撤回消息的具体逻辑，请参考 [撤回消息](message_recall.html)，此处只介绍子区消息和其他消息的区别。

子区成员可以设置消息监听回调 `AgoraChatManagerDelegate#messagesInfoDidRecall` 对子区消息的撤回进行监听。

示例代码如下：

```objectivec
- (void)messagesInfoDidRecall:(NSArray<AgoraChatRecallMessageInfo *> *)aRecallMessagesInfo
{}
```

### 获取子区消息

从服务器还是本地数据库获取子区消息取决于你的生产环境。

你可以通过 `AgoraChatConversation#isChatThread` 属性判断当前会话是否为子区会话。

### 从服务器获取单个子区消息 (消息漫游)

调用 `asyncFetchHistoryMessagesFromServer` 方法从服务器获取子区消息。从服务器获取子区消息与获取群组消息的唯一区别为前者需传入子区 ID，后者需传入群组 ID。

```objectivec
[AgoraChatClient.sharedClient.chatManager asyncFetchHistoryMessagesFromServer:@"threadId" conversationType:AgoraChatConversationTypeGroupChat startMessageId:@"" fetchDirection:AgoraChatMessageFetchHistoryDirectionUp pageSize:20 completion:^(AgoraChatCursorResult<AgoraChatMessage *> * _Nullable aResult, AgoraChatError * _Nullable aError) {
            
    }];
```

#### 从本地获取单个子区的消息

调用 `AgoraChatManager#getAllConversations` 方法只能获取单聊或群聊会话。要获取本地单个子区会话中的消息，参考以下示例代码：

```objectivec
// 需设置会话类型为 `AgoraChatConversationTypeGroupChat` 和 `isThread` 为 `YES`
AgoraChatConversation* conversation = [AgoraChatClient.sharedClient.chatManager getConversation:conversationId type:AgoraChatConversationTypeGroupChat createIfNotExist:NO isThread:YES];
// 获取该子区会话的消息
[conversation loadMessagesStartFromId:@"" count:20 searchDirection:AgoraChatMessageSearchDirectionUp completion:^(NSArray<AgoraChatMessage *> * _Nullable aMessages, AgoraChatError * _Nullable aError) {
            
}];
```
