# 会话标记

<Toc />

某些情况下，你可能需要对会话添加标记，例如会话标星或将会话标为已读或未读。即时通讯云 IM 支持对单聊和群聊会话添加标记，最大支持 20 个标记。

**如果要使用会话标记功能，你需要确保产品套餐包支持[从服务端获取会话列表的功能](conversation_list.html#从服务器分页获取会话列表)。**

## 技术原理

即时通讯 IM 支持会话标记功能，主要方法如下：

- `ChatManager#addRemoteAndLocalConversationsMark`：标记会话。
- `ChatManager#deleteRemoteAndLocalConversationsMark`：取消标记会话。
- `ChatManager#fetchConversationsByOptions`：根据会话标记从服务器分页查询会话列表。
- 根据会话标记从本地查询会话列表：调用 `ChatManager#loadAllConversations` 方法获取本地所有会话后自己进行会话过滤。
- `ChatConversation#marks`：获取本地单个会话的所有标记。

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，并连接到服务器，详见 [快速开始](quickstart.html)。
- 了解即时通讯 IM API 的使用限制，详见 [使用限制](limitation.html)。
- 产品套餐包支持[从服务端获取会话列表功能](conversation_list#从服务器分页获取会话列表)。

## 实现方法

### 标记会话

你可以调用 `ChatManager#addRemoteAndLocalConversationsMark` 方法标记会话。每次最多可为 20 个会话添加标记。调用该方法会同时为本地和服务器端的会话添加标记。

添加会话标记后，若调用 `ChatManager#fetchConversationsByOptions` 接口从服务器分页获取会话列表，返回的会话对象中包含会话标记，你需要通过 `ChatConversation#marks` 方法获取。若你已经达到了服务端会话列表长度限制（默认 100 个会话），服务端会根据会话的活跃度（最新一条消息的时间戳）删除不活跃会话，这些会话的会话标记也随之删除。

:::tip
对会话添加标记，例如会话标星，并不影响会话的其他逻辑，例如会话的未读消息数。
:::

```dart
try {
  await ChatClient.getInstance.chatManager.addRemoteAndLocalConversationsMark(
    conversationIds: conversationsIds,
    mark: ConversationMarkType.Type0,
  );
} on ChatError catch (e) {
  debugPrint("addRemoteAndLocalConversationsMark error: ${e.code}, ${e.description}");
}
```

### 取消标记会话

你可以调用 `ChatManager#deleteRemoteAndLocalConversationsMark` 方法删除会话标记。每次最多可移除 20 个会话的标记。

调用该方法会同时移除本地和服务器端会话的标记。

```dart
try {
  await ChatClient.getInstance.chatManager.deleteRemoteAndLocalConversationsMark(
    conversationIds: conversationsIds,
    mark: ConversationMarkType.Type0,
  );
} on ChatError catch (e) {
  debugPrint("deleteRemoteAndLocalConversationsMark error: ${e.code}, ${e.description}");
}
```

### 根据会话标记从服务器分页查询会话列表

你可以调用 `ChatManager#fetchConversationsByOptions` 方法根据会话标记从服务器分页获取会话列表。SDK 会按会话标记的时间的倒序返回会话列表，每个会话对象中包含会话 ID、会话类型、是否为置顶状态、置顶时间（对于未置顶的会话，值为 0）、会话标记以及最新一条消息。从服务端拉取会话列表后会更新本地会话列表。

```dart
try {
  ChatCursorResult<ChatConversation> result = await ChatClient.getInstance.chatManager.fetchConversationsByOptions(
    options: ConversationFetchOptions.mark(
      ConversationMarkType.Type0,
    ),
  );
} on ChatError catch (e) {
  debugPrint("fetchConversationsByOptions error: ${e.code}, ${e.description}");
}
```

### 根据会话标记从本地查询会话列表

对于本地会话，你可以调用 `getAllConversations` 方法获取本地所有会话后自己进行会话过滤。下面以查询标记了 `ChatConversation.ChatMarkType.MARK_0` 的所有本地会话为例。

```dart
try {
  List<ChatConversation> markConversations = [];
  List<ChatConversation> conversations = await ChatClient.getInstance.chatManager.loadAllConversations();
  for (var conversation in conversations) {
    if (conversation.marks?.contains(ConversationMarkType.Type0) == true) {
      markConversations.add(conversation);
    }
  }
} on ChatError catch (e) {
  debugPrint("loadAllConversations error: ${e.code}, ${e.description}");
}
```

### 获取本地单个会话的所有标记

你可以调用 `ChatConversation#marks` 方法获取本地单个会话的所有标记，示例代码如下：

```dart
try {
  ChatConversation? conversation = await ChatClient.getInstance.chatManager.getConversation(conversationId);
  List<ConversationMarkType>? marks = conversation?.marks;
} on ChatError catch (e) {
  debugPrint("getConversation error: ${e.code}, ${e.description}");
}
```
