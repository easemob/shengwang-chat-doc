# 搜索消息

<Toc />

本文介绍即时通讯 IM Android SDK 如何搜索本地消息。调用本文中的消息搜索方法可以搜索本地数据库中除命令消息之外的所有类型的消息，因为命令消息不在本地数据库中存储。

## 技术原理

即时通讯 IM Android SDK 通过 `Conversation` 类支持搜索用户设备上存储的消息数据，其中包含如下主要方法：

- `Conversation#searchMsgFromDB(string keywords, long timeStamp, int maxCount, string from, SearchDirection direction)`：根据关键字搜索本地数据库中单个会话中指定用户发送的消息。
- `ChatManager#searchMsgFromDB(java.lang.String, long, int, java.lang.String, Conversation.SearchDirection, Conversation.ChatMessageSearchScope)`: 根据关键字搜索消息时，可以选择搜索范围在所有会话中进行消息搜索。
- `Conversation#searchMsgFromDB(java.lang.String, long, int, java.lang.String, Conversation.SearchDirection, Conversation.ChatMessageSearchScope)`：根据关键字搜索消息时，可以选择搜索范围在当前会话中进行消息搜索。
- `ChatManager#searchMsgFromDB(java.util.Set<ChatMessage.Type>, long, int, java.lang.String, Conversation.SearchDirection)`：根据单个或多个消息类型，搜索本地数据库中所有会话的消息。
- `Conversation#searchMsgFromDB(java.util.Set<ChatMessage.Type>, long, int, java.lang.String, Conversation.SearchDirection)` 根据单个或多个消息类型，搜索本地数据库中单个会话的消息。

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化并连接到服务器，详见 [快速开始](quickstart.html)。
- 了解即时通讯 IM API 的使用限制，详见 [使用限制](/product/limitation.html)。

## 实现方法

### 根据关键字搜索会话消息

你可以调用 `searchMsgFromDB(string keywords, long timeStamp, int maxCount, string from, SearchDirection direction)` 方法根据关键字搜索本地数据库中单个会话中指定用户发送的消息，示例代码如下：

```java
//conversationId：会话 ID
Conversation conversation = ChatClient.getInstance().chatManager().getConversation(conversationId);
// keywords：搜索关键字；timeStamp：搜索的起始时间戳；maxCount：每次获取的消息数量，取值范围为 [1,400]。
// direction：消息搜索方向：（默认）`UP`：按消息时间戳的逆序搜索；`DOWN`：按消息时间戳的正序搜索。
List<ChatMessage> messages = conversation.searchMsgFromDB(keywords, timeStamp, maxCount, from, Conversation.SearchDirection.UP);
```

### 根据搜索范围搜索所有会话中的消息 

你可以调用 `ChatManager#searchMsgFromDB(java.lang.String, long, int, java.lang.String, Conversation.SearchDirection, Conversation.ChatMessageSearchScope)` 方法，除了设置关键字、消息时间戳、消息数量、发送方、搜索方向等条件搜索所有会话中的消息时，你还可以选择搜索范围，如只搜索消息内容、只搜索消息扩展信息以及同时搜索消息内容以及扩展信息。 

```java
String keyWord = "123";
List<ChatMessage> messages = ChatClient.getInstance().chatManager().searchMsgFromDB(keyWord, -1, 200, null, Conversation.SearchDirection.UP, Conversation.ChatMessageSearchScope.ALL);

```

### 根据搜索范围搜索当前会话中的消息 

你可以调用 `Conversation#searchMsgFromDB(java.lang.String, long, int, java.lang.String, Conversation.SearchDirection, Conversation.ChatMessageSearchScope)` 方法除了设置关键字、消息时间戳、消息数量、发送方、搜索方向等条件搜索当前会话中的消息，你还可以选择搜索范围，如只搜索消息内容、只搜索消息扩展信息以及同时搜索消息内容以及扩展信息。

```java
String keyWord = "123";
String conversationId = "jack";
Conversation conversation = ChatClient.getInstance().chatManager().getConversation(conversationId);
List<ChatMessage> messages = conversation.searchMsgFromDB(keyWord, -1, 200, null, Conversation.SearchDirection.UP, Conversation.ChatMessageSearchScope.ALL);

```

### 根据消息类型搜索所有会话中的消息

你可以调用 `ChatManager#searchMsgFromDB(java.util.Set<ChatMessage.Type>, long, int, java.lang.String, Conversation.SearchDirection)` 方法除了设置消息时间戳、消息数量、发送方、搜索方向等条件搜索当前会话中的消息，你还可以设置单个或多个消息类型搜索本地数据库中所有会话的消息。

```java
// count：要查询的消息条数。取值范围为 [1,400]。
// fromuser：会话中发送方的用户 ID。若传空字符串，搜索对发送方不限制。
Set types=new HashSet<>();
types.add(ChatMessage.Type.TXT);
types.add(ChatMessage.Type.VOICE);
List messages = ChatClient.getInstance().chatManager().searchMsgFromDB(types, -1, 400, "xu", Conversation.SearchDirection.UP);
for (int i = 0; i < messages.size(); i++) {
    ChatMessage message = (ChatMessage) messages.get(i);
    if (message.getBody() instanceof TextMessageBody) {
        TextMessageBody body = (TextMessageBody) message.getBody();
        EMLog.e(TAG, "message: " + body.getMessage() + ",time: " + message.getMsgTime());
    } else {
        EMLog.e(TAG, "message: " + message.getBody() + ",time: " + message.getMsgTime());
    }
}
``` 

### 根据消息类型搜索当前会话中的消息

你可以调用 `Conversation#searchMsgFromDB(java.util.Set<ChatMessage.Type>, long, int, java.lang.String, Conversation.SearchDirection)` 方法除了设置消息时间戳、消息数量、发送方、搜索方向等条件搜索当前会话中的消息，你还可以设置单个或多个消息类型搜索本地数据库中单个会话的消息。

```java
// count：要查询的消息条数。取值范围为 [1,400]。
// fromuser：当前会话中发送方的用户 ID。若传空字符串，搜索对发送方不限制。
Set types=new HashSet<>();
types.add(ChatMessage.Type.TXT);
types.add(ChatMessage.Type.VOICE);
List messages = ChatClient.getInstance().chatManager().getConversation("xu").searchMsgFromDB(types, -1, 400, "xu", Conversation.SearchDirection.UP);
for (int i = 0; i < messages.size(); i++) {
    ChatMessage message = (ChatMessage) messages.get(i);
    if (message.getBody() instanceof TextMessageBody) {
        TextMessageBody body = (TextMessageBody) message.getBody();
        EMLog.e(TAG, "message: " + body.getMessage() + ",time: " + message.getMsgTime());
    } else {
        EMLog.e(TAG, "message: " + message.getBody() + ",time: " + message.getMsgTime());
    }
}
```         

