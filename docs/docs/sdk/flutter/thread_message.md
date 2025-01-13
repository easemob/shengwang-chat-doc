# 管理子区消息

<Toc />

子区消息消息类型属于群聊消息类型，与普通群组消息的区别是需要添加 `isChatThread` 标记。本文介绍即时通讯 IM Flutter SDK 如何发送、接收以及撤回子区消息。**若你当前套餐不支持子区功能，需升级产品套餐。**

## 技术原理

即时通讯 IM Flutter SDK 提供 `ChatThreadManager`、`ChatMessage` 和 `ChatThread` 类，用于管理子区消息，支持你通过调用 API 在项目中实现发送、接收、撤回和获取子区消息。

消息收发流程如下：

客户端 A 向客户端 B 发送消息。消息发送至即时通讯 IM 服务器，服务器将消息传递给客户端 B。对于子区消息，服务器投递给子区内其他每一个成员。客户端 B 收到消息后，SDK 触发事件。客户端 B 监听事件并获取消息。

子区创建和查看如下图：

![](/images/ios/threads.png)

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，详见 [快速开始](quickstart.html)。
- 了解即时通讯 IM 的使用限制，详见 [使用限制](limitation.html)。
- 产品套餐包支持子区功能。

## 实现方法

本节介绍如何使用即时通讯 IM Flutter SDK 提供的 API 实现上述功能。

### 发送子区消息

发送子区消息和发送群组消息的方法基本一致，详情请参考 [发送消息](message_send_receive.html)。唯一不同的是，发送子区消息需要指定标记 `isChatThreadMessage` 为 `true`。

示例代码如下：

```dart
// `chatThreadId` 为子区 ID

ChatMessage msg = ChatMessage.createTxtSendMessage(
  targetId: threadId,
  content: content,
  // `chatType` 设置为 `GroupChat`，即群聊
  chatType: ChatType.GroupChat,
);
// isChatThreadMessage: 是否是子区消息，这里设置为 `true`，即是子区消息。
msg.isChatThreadMessage = true;
ChatClient.getInstance.chatManager.sendMessage(msg);
```

### 接收子区消息

接收消息的具体逻辑，请参考 [接收消息](message_send_receive.html#发送和接收文本消息)，此处只介绍子区消息和其他消息的区别。

子区有新增消息时，子区所属群组的所有成员收到 `ChatThreadEventHandler#onChatThreadUpdated` 事件，子区成员收到 `ChatEventHandler#onMessagesReceived` 事件。

示例代码如下：

```dart
// 注册子区监听
ChatClient.getInstance.chatThreadManager.addEventHandler(
      "UNIQUE_HANDLER_ID",
  ChatThreadEventHandler(
    onChatThreadUpdate: (event) {},
      ),
    );

// 添加消息监听
ChatClient.getInstance.chatManager.addEventHandler(
  "UNIQUE_HANDLER_ID",
  ChatEventHandler(
    onMessagesReceived: (messages) {},
      ),
    );

// 移除子区监听
ChatClient.getInstance.chatThreadManager.removeEventHandler("UNIQUE_HANDLER_ID");
    // 移除消息监听
    ChatClient.getInstance.chatManager.removeEventHandler("UNIQUE_HANDLER_ID");
```

### 撤回子区消息

接收消息的具体逻辑，请参考 [撤回消息](message_recall.html)，此处只介绍子区消息和其他消息的区别。

子区有消息撤回时，子区所属群组的所有成员收到 `ChatThreadEventHandler#onChatThreadUpdated` 事件，子区成员收到 `ChatEventHandler#onMessagesRecalledInfo` 事件。

示例代码如下：

```dart
// 注册子区监听
ChatClient.getInstance.chatThreadManager.addEventHandler(
  "UNIQUE_HANDLER_ID",
  ChatThreadEventHandler(
    onChatThreadUpdate: (event) {},
  ),
);

// 添加消息监听
ChatClient.getInstance.chatManager.addEventHandler(
  "UNIQUE_HANDLER_ID",
  ChatEventHandler(
    onMessagesRecalledInfo: (messages) {},
  ),
);

// 移除子区监听
ChatClient.getInstance.chatThreadManager.removeEventHandler("UNIQUE_HANDLER_ID");
// 移除消息监听
ChatClient.getInstance.chatManager.removeEventHandler("UNIQUE_HANDLER_ID");
```

### 获取子区消息

从服务器还是本地数据库获取子区消息取决于你的生产环境。

你可以通过 `ChatConversation#isChatThread()` 判断当前会话是否为子区会话。

#### 从服务器获取单个子区的消息 (消息漫游)

调用 `fetchHistoryMessages` 方法从服务器获取子区消息。从服务器获取子区消息与获取群组消息的唯一区别为前者需传入子区 ID，后者需传入群组 ID。

```dart
try {
  // 子区 ID。
  String threadId = "threadId";
  // 会话类型，设置为群聊，即 `GroupChat`。
  ChatConversationType convType = ChatConversationType.GroupChat;
  // 每页期望获取的消息数量。
  int pageSize = 10;
  // 搜索的起始消息 ID。
  String startMsgId = "";
  ChatCursorResult<ChatMessage> result =
      await ChatClient.getInstance.chatManager.fetchHistoryMessages(
    conversationId: threadId,
    type: convType,
    startMsgId: startMsgId,
    pageSize: pageSize,
  );
} on ChatError catch (e) {}
```

#### 从本地获取单个子区的消息

调用 `ChatManager#loadAllConversations` 方法只能获取单聊或群聊会话。你可以调用以下方法从本地获取单个子区的消息：

```dart
try {
  // 子区 ID。
  String threadId = "threadId";
  // 会话类型，即群聊 `GroupChat`。
  ChatConversationType convType = ChatConversationType.GroupChat;
  ChatConversation? converrsation =
        await ChatClient.getInstance.chatManager.getThreadConversation(threadId);
  // 搜索的起始消息 ID。
  String startMsgId = "startMsgId";
  // 每页期望获取的消息数量。
  int pageSize = 10;
  List<ChatMessage>? list = await conversation?.loadMessages(
      startMsgId: startMsgId, loadCount: pageSize);
} on ChatError catch (e) {}
```