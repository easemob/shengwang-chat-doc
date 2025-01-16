# 搜索消息

<Toc />

本文介绍即时通讯 IM React Native SDK 如何搜索本地消息。

## 技术原理

即时通讯 IM React Native SDK 通过 `ChatManager` 类支持搜索用户设备上存储的消息数据，其中包含如下主要方法：

- `ChatManager#getMsgsWithKeyword`: 根据搜索范围搜索所有会话中的消息。
- `ChatConversation#getMsgsWithKeyword`: 根据搜索范围搜索当前会话中的消息。
- `ChatManager.searchMessages`：搜索所有会话的多种类型的消息。
- `ChatManager.searchMessagesInConversation`：搜索指定会话的多种类型的消息。

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，并连接到服务器，详见 [初始化](initialization.html)及[连接](connection.html)文档。
- 了解即时通讯 IM API 的使用限制，详见 [使用限制](/product/limitation.html)。

## 实现方法

### 根据搜索范围搜索所有会话中的消息

你可以调用 `ChatManager#getMsgsWithKeyword` 方法，除了设置关键字、消息时间戳、消息数量、发送方、搜索方向等条件搜索所有会话中的消息时，你还可以选择搜索范围，如只搜索消息内容、只搜索消息扩展信息以及同时搜索消息内容以及扩展信息。

```typescript
ChatClient.getInstance()
  .chatManager.getMsgsWithKeyword({
    keywords, // 搜索关键字
    direction, // 搜索方向
    timestamp, // 搜索消息的时间戳，从该时间戳开始按照搜索方向 `direction` 搜索。
    maxCount: 20, // 请求的消息数量
    from: "", // 消息发送者
    searchScope: ChatMessageSearchScope.All, // 搜索范围，详见 `ChatMessageSearchScope` 类型。
  })
  .then((res) => {
    // todo: 操作成功, 处理返回的结果
  })
  .catch((error) => {
    // todo: 发生错误
  });
```

### 根据搜索范围搜索当前会话中的消息

除了设置关键字、消息时间戳、消息数量、发送方、搜索方向等条件搜索当前会话中的消息，你还可以选择搜索范围，如只搜索消息内容、只搜索消息扩展信息以及同时搜索消息内容以及扩展信息。你可以通过以下两种方式获取消息。

- 方式一：

```typescript
// 直接调用
ChatClient.getInstance()
  .chatManager.getConvMsgsWithKeyword({
    convId, // 会话ID。
    convType, // 会话类型：单聊为 `PeerChat`，群聊为 `GroupChat`。
    keywords, // 搜索关键字
    direction, // 搜索方向
    timestamp, // 搜索消息的时间戳，从该时间戳开始按照搜索方向 `direction` 搜索。
    count: 20, // 请求的消息数量
    sender: "", // 消息发送者
    isChatThread: false, // 是否是子区消息。子区消息只在子区中使用。
    searchScope: ChatMessageSearchScope.All, // 搜索范围，详见 `ChatMessageSearchScope` 类型。
  })
  .then((res) => {
    // todo: 操作成功, 处理返回的结果
  })
  .catch((error) => {
    // todo: 发生错误
  });
```

- 方式二：

```typescript
// 通过会话对象调用
const conv = ChatClient.getInstance().chatManager.getConversation(
  convId,
  convType
);
conv
  .getMsgsWithKeyword({
    keywords, // 搜索关键字
    direction, // 搜索方向
    timestamp, // 搜索消息的时间戳，从该时间戳开始按照搜索方向 `direction` 搜索。
    count: 20, // 请求的消息数量
    sender: "", // 消息发送者
    searchScope: ChatMessageSearchScope.All, // 搜索范围，详见 `ChatMessageSearchScope` 类型。
  })
  .then((res) => {
    // todo: 操作成功, 处理返回的结果
  })
  .catch((error) => {
    // todo: 发生错误
  });
```

### 根据消息类型搜索所有会话中的消息

你可以调用 `ChatManager#searchMessages` 方法除了设置消息时间戳、消息数量、发送方、搜索方向等条件搜索当前会话中的消息，你还可以设置单个或多个消息类型搜索本地数据库中所有会话的消息。

```typescript
ChatClient.getInstance()
  .chatManager.searchMessages({
    msgTypes: [ChatMessageType.TXT],
    timestamp: 1725009277205,
  })
  .then((msgs: ChatMessage[]) => {
    console.log("success:", msgs);
  })
  .catch((e) => {
    console.warn(e);
  });
```

### 根据消息类型搜索当前会话中的消息

你可以调用 `ChatManager#searchMessagesInConversation` 方法除了设置消息时间戳、消息数量、发送方、搜索方向等条件搜索当前会话中的消息，你还可以设置单个或多个消息类型搜索本地数据库中单个会话的消息。

```typescript
ChatClient.getInstance()
  .chatManager.searchMessagesInConversation({
    convId: "foo",
    convType: 0,
    msgTypes: [ChatMessageType.TXT],
    timestamp: 1725009277205,
  })
  .then((msgs: ChatMessage[]) => {
    console.log("success:", msgs);
  })
  .catch((e) => {
    console.warn(e);
  });
```
