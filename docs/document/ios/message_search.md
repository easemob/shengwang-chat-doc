# 搜索消息

<Toc />

本文介绍即时通讯 IM iOS SDK 如何搜索本地消息。调用本文中的消息搜索方法可以搜索本地数据库中除命令消息之外的所有类型的消息，因为命令消息不在本地数据库中存储。
 
## 技术原理

即时通讯 IM iOS SDK 支持搜索用户设备上存储的消息数据，其中包含如下主要方法：

- `IAgoraChatManager.loadMessagesWithKeyword` 根据关键字搜索本地数据库中单个会话中指定用户发送的消息。
- `AgoraChatManager#loadMessagesWithKeyword:timestamp:count:fromUser:searchDirection:scope:completion:`: 根据关键字搜索消息时，可以选择搜索范围在所有会话中进行消息搜索。
- `AgoraChatConversation#loadMessagesWithKeyword:timestamp:count:fromUser:searchDirection:scope:completion:`：根据关键字搜索消息时，可以选择搜索范围在当前会话中进行消息搜索。
-`AgoraChatManager#searchMessages:withTypes:timestamp:count:fromuser:searchDirection:completion:`：根据单个或多个消息类型，搜索本地数据库中所有会话的消息。
- `AgoraChatConversation#searchMessages:withTypes:timestamp:count:fromuser:searchDirection:completion:` 根据单个或多个消息类型，搜索本地数据库中单个会话的消息。

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，并连接到服务器，详见 [快速开始](quickstart.html)。
- 了解即时通讯 IM 的使用限制，详见 [使用限制](limitation.html)。

## 实现方法

### 根据关键字搜索会话中的用户发送的消息  

你可以调用 `loadMessagesWithKeyword` 方法根据关键字搜索本地数据库中单个会话中指定用户发送的消息，示例代码如下：

```objectivec
// 同步方法，异步方法见[AgoraChatConversation loadMessagesWithKeyword:timestamp:count:fromUser:searchDirection:completion]
AgoraChatConversation* conversation = [AgoraChatClient.sharedClient.chatManager getConversationWithConvId:@"conversationId"];
NSArray<AgoraChatMessage *> *messages = [conversation loadMessagesWithKeyword:@"keyword" timestamp:0 count:50 fromUser:nil searchDirection:AgoraChatMessageSearchDirectionDown];
```

### 根据搜索范围搜索所有会话中的消息 

你可以调用 `AgoraChatManager#loadMessagesWithKeyword:timestamp:count:fromUser:searchDirection:scope:completion:` 方法，除了设置关键字、消息时间戳、消息数量、发送方、搜索方向等条件搜索所有会话中的消息时，你还可以选择搜索范围，如只搜索消息内容、只搜索消息扩展信息以及同时搜索消息内容以及扩展信息。 

```objectivec
        [AgoraChatClient.sharedClient.chatManager loadMessagesWithKeyword:@"" timestamp:0 count:50 fromUser:@"userId" searchDirection:AgoraChatMessageSearchDirectionUp scope:AgoraChatMessageSearchScopeContent completion:^(NSArray<AgoraChatMessage *> *aMessages, AgoraChatError *aError) {
        }];
```

### 根据搜索范围搜索当前会话中的消息 

你可以调用 `AgoraChatConversation#loadMessagesWithKeyword:timestamp:count:fromUser:searchDirection:scope:completion:` 方法除了设置关键字、消息时间戳、消息数量、发送方、搜索方向等条件搜索当前会话中的消息，你还可以选择搜索范围，如只搜索消息内容、只搜索消息扩展信息以及同时搜索消息内容以及扩展信息。


```objectivec
        [[AgoraChatClient.sharedClient.chatManager getConversationWithConvId:@"conversationId"] loadMessagesWithKeyword:@"" timestamp:0 count:50 fromUser:@"userId" searchDirection:AgoraChatMessageSearchDirectionUp scope:AgoraChatMessageSearchScopeContent completion:^(NSArray<AgoraChatMessage *> *aMessages, AgoraChatError *aError) {
        }];
```

### 根据消息类型搜索所有会话中的消息

你可以调用 `AgoraChatManager#searchMessages:withTypes:timestamp:count:fromuser:searchDirection:completion:` 方法除了设置消息时间戳、消息数量、发送方、搜索方向等条件搜索当前会话中的消息，你还可以设置单个或多个消息类型搜索本地数据库中所有会话的消息。

```objectivec
// count：要查询的消息条数。取值范围为 [1,400]。
// fromuser：会话中发送方的用户 ID。若传空字符串，搜索对发送方不限制。
        [AgoraChatClient.sharedClient.chatManager  searchMessagesWithTypes:@[@(AgoraChat)] timestamp:-1 count:20 fromUser:@"userId" searchDirection:AgoraChatMessageSearchDirectionUp completion:^(NSArray<AgoraChatMessage *> * _Nullable aMessages, AgoraChatError * _Nullable aError) {
            
        }];
``` 

### 根据消息类型搜索当前会话中的消息

你可以调用 `AgoraChatConversation#searchMessages:withTypes:timestamp:count:fromuser:searchDirection:completion:` 方法除了设置消息时间戳、消息数量、发送方、搜索方向等条件搜索当前会话中的消息，你还可以设置单个或多个消息类型搜索本地数据库中单个会话的消息。



```objectivec
// count：要查询的消息条数。取值范围为 [1,400]。
// fromuser：当前会话中发送方的用户 ID。若传空字符串，搜索对发送方不限制。
        [[AgoraChatClient.sharedClient.chatManager getConversationWithConvId:@"conversationId"] searchMessagesWithTypes:@[@(AgoraChatMessageBodyTypeText)] timestamp:-1 count:20 fromUser:@"userId" searchDirection:AgoraChatMessageSearchDirectionUp completion:^(NSArray<AgoraChatMessage *> * _Nullable aMessages, AgoraChatError * _Nullable aError) {
            
        }];
```      
