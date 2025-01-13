# 删除会话

<Toc />

删除好友或退出群组后，SDK 不会自动删除对应的单聊或群聊会话。你可以调用相应的接口从服务器和本地删除单个会话及其历史消息。

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，并连接到服务器，详见 [快速开始](quickstart.html)。
- 了解环信即时通讯 IM API 的使用限制，详见 [使用限制](/product/limitation.html)。

## 技术原理

环信即时通讯 IM 支持从服务器和本地删除单个会话及其历史消息，主要方法如下：

- `deleteConversationFromServer`：单向删除服务端的单个会话及删除本地会话，也可以设置是否删除服务端和本地的历史消息。
- `deleteConversation`：删除本地单个会话及其历史消息。

## 实现方法

### 单向删除服务端会话及本地会话

你可以调用 `deleteConversationFromServer` 方法单向删除服务器端和本地会话，并选择是否删除服务端和本地的历史消息。会话和消息删除后，当前用户无法从服务器获取该会话和消息。该接口不影响其他用户的会话和消息。

调用该方法之前，需调用 `getConversation` 方法获取会话 ID。

示例代码如下：

```java
//获取指定的会话 ID。
Conversation conversation = ChatClient.getInstance().chatManager().getConversation(conversationId);

// 删除指定会话。如果需要保留服务端和本地的历史消息，`isDeleteServerMessages` 传 `false`。
ChatClient.getInstance().chatManager().deleteConversationFromServer(conversationId, conversationType, isDeleteServerMessages, new CallBack() {
    @Override
    public void onSuccess() {

    }

    @Override
    public void onError(int code, String error) {

    }
});
```

### 删除本地会话及历史消息

你可以删除本地会话和历史消息，示例代码如下：

```java
// 删除指定用户的会话，如果需要保留历史消息，传 `false`。
ChatClient.getInstance().chatManager().deleteConversation(conversationId, true);
```

```java
// 删除指定会话中指定的一条历史消息。
Conversation conversation = ChatClient.getInstance().chatManager().getConversation(conversationId);
conversation.removeMessage(deleteMsg.msgId);
```
