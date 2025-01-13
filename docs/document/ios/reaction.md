# 消息表情回复 Reaction iOS

<Toc />

即时通讯 IM 提供消息表情回复（“Reaction”）功能。用户可以在单聊和群聊中对消息添加、删除表情。表情可以直观地表达情绪，利用 Reaction 可以提升用户的使用体验。同时在群组中，利用 Reaction 可以发起投票，根据不同表情的追加数量来确认投票。

:::tip
1. 若你当前套餐不支持该功能，需升级产品套餐。
2. 目前 Reaction 仅适用于单聊和群组，不适用于聊天室。
:::

## 技术原理

SDK 支持你通过调用 API 在项目中实现如下功能：

- `addReaction` 在消息上添加 Reaction；
- `removeReaction` 删除消息的 Reaction；
- `getReactionList` 获取消息的 Reaction 列表；
- `getReactionDetail` 获取 Reaction 详情；
- `AgoraChatMessage.reactionList` 从 `AgoraChatMessage` 对象获取 Reaction 列表。

Reaction 场景示例如下：

![img](/images/ios/reactions.png)

分别展示如何添加 Reaction，群聊中 Reaction 的效果，以及查看 Reaction 列表。

## 前提条件

开始前，请确保满足以下条件：

1. 完成即时通讯 IM SDK 初始化，详见 [初始化文档](initialization.html)。
2. 了解即时通讯 IM API 的 [使用限制](limitation.html)。

## 实现方法

### 在消息上添加 Reaction

调用 `addReaction` 在消息上添加 Reaction。对于单聊会话，对端用户会收到 `messageReactionDidChange` 事件，而群聊会话中，除操作者之外的其他群组成员均会收到该事件。该事件中的信息包括会话 ID、消息 ID，该消息的 Reaction 列表、Reaction 操作列表（列明添加者的用户 ID、添加的 Reaction 的 ID 以及明确该操作为添加操作）。

 对于同一条 Reaction，一个用户只能添加一次，重复添加会报错误 1301。

示例代码如下：

```objectivec
// 添加 Reaction。异步方法
[AgoraChatClient.sharedClient.chatManager addReaction:@"reaction" toMessage:@"messageId" completion:^(AgoraChatError * _Nullable error) {
	refreshBlock(error, changeSelectedStateHandle);
}];

// 监听 Reaction 更新。
- (void)messageReactionDidChange:(NSArray<AgoraChatMessageReactionChange *> *)changes
{

}
```

### 删除消息的 Reaction

调用 `removeReaction` 删除消息的 Reaction。对于单聊会话，对端用户会收到 `messageReactionDidChange` 事件，而群聊会话中，除操作者之外的其他群组成员均会收到该事件。该事件中的信息包括会话 ID、消息 ID，该消息的 Reaction 列表和 Reaction 操作列表（列明删除者的用户 ID、删除的 Reaction 的 ID 以及明确该操作为删除操作）。

示例代码如下：

```objectivec
// 删除 Reaction。异步方法
[AgoraChatClient.sharedClient.chatManager removeReaction:@"reaction" fromMessage:@"messageId" completion:^(AgoraChatError * _Nullable error) {
	refreshBlock(error, changeSelectedStateHandle);
}];

// 监听 Reaction 更新。
- (void)messageReactionDidChange:(NSArray<AgoraChatMessageReactionChange *> *)changes
{

}
```

### 获取消息的 Reaction 列表

调用 `getReactionList` 方法从服务器获取指定消息的 Reaction 概览列表，列表内容包含 Reaction 内容，添加或移除 Reaction 的用户数量，以及添加或移除 Reaction 的前三个用户的用户 ID。示例代码如下：

```objectivec
// 异步方法
[AgoraChatClient.sharedClient.chatManager getReactionList:@["messageId"] groupId:@"groupId" chatType:AgoraChatTypeChat completion:^(NSDictionary<NSString *, AgoraChatMessageReaction *> * _Nonnull, AgoraChatError * _Nullable) {

}];
```

### 获取 Reaction 详情

调用 `getReactionDetail` 方法可以从服务器获取指定 Reaction 的详情，包括 Reaction 内容，添加或移除 Reaction 的用户数量以及添加或移除 Reaction 的全部用户列表。示例代码如下：

```objectivec
// 异步方法
[AgoraChatClient.sharedClient.chatManager getReactionDetail:@"messageId" reaction:@"reaction" cursor:nil pageSize:30 completion:^(AgoraChatMessageReaction * _Nonnull, NSString * _Nullable cursor, AgoraChatError * _Nullable) {

}];
```