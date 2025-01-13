# 删除消息

<Toc />

本文介绍用户如何单向删除服务端以及本地的历史消息。

## 技术原理

使用环信即时通讯 IM Android SDK 可以通过 `Conversation` 和 `ChatManager` 类从服务器单向删除历史消息，主要方法如下：

- `ChatManager#asyncDeleteAllMsgsAndConversations`：清空当前用户的聊天记录，包括单聊、群聊和聊天室的消息和会话，同时可以选择是否单向清除服务端的聊天记录。
- `Conversation#removeMessagesFromServer`：按消息时间或消息 ID 单向删除服务端的历史消息。
- `ChatManager#clearAllMessages`：删除本地指定会话的所有消息。
- `ChatManager#removeMessages(startTime, endTime)`：删除指定时间段的本地消息。
- `ChatManager#removeMessage(targetMessageId)`：删除本地单个会话的指定消息。

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化并连接到服务器，详见 [快速开始](quickstart.html)。
- 了解环信即时通讯 IM API 的使用限制，详见 [使用限制](/product/limitation.html)。

### 清空聊天记录

你可以调用 `ChatManager#asyncDeleteAllMsgsAndConversations` 方法清空当前用户的聊天记录，包括单聊、群组聊天和聊天室的消息和会话。同时你也可以选择是否清除服务端的聊天记录。若你清除了服务端的聊天记录，你无法从服务端拉取到会话和消息，而其他用户不受影响。

:::tip
若使用该功能，需将 SDK 升级至 V4.4.0 或以上版本。
:::

```java
 ChatClient.getInstance().chatManager().asyncDeleteAllMsgsAndConversations(true, new CallBack() {
    @Override
    public void onSuccess() {
        
    }

    @Override
    public void onError(int code, String error) {
        
    }
    });
```

### 单向删除服务端的历史消息

你可以调用 `removeMessagesFromServer` 方法删除你在服务器和本地的消息。删除后，该用户无法从服务端拉取到该消息，不过，与该用户的单聊、群聊和聊天室会话中的其它用户的服务器消息不受影响，可以漫游获取。

每次最多可删除 50 条消息。多设备情况下，登录该账号的其他设备会收到 `MultiDeviceListener` 中的 `onMessageRemoved` 回调，已删除的消息自动从设备本地移除。

:::tip
1. 要单向删除服务端单聊和群组聊天的历史消息，需将 SDK 升级至 V3.9.8 或以上版本。
2. 要单向删除服务端聊天室的历史消息，需将 SDK 升级至 4.7.0 或以上版本。
:::

示例代码如下：

```java 
// 按时间删除消息
Conversation conversation = ChatClient.getInstance().chatManager().getConversation(username);
conversation.removeMessagesFromServer(time, new CallBack() {
                    @Override
                    public void onSuccess() {
                       
                    }

                    @Override
                    public void onError(int code, String desc) {
                       
                    }
                });

// 按消息 ID 删除消息
 conversation.removeMessagesFromServer(msgIdList, new CallBack() {
                    @Override
                    public void onSuccess() {
                       
                    }

                    @Override
                    public void onError(int code, String desc) {
                       
                    }
                });  
```

### 删除本地指定会话的所有消息

你可以删除本地指定会话的所有消息，示例代码如下：

```java
Conversation conversation = ChatClient.getInstance().chatManager().getConversation(conversationId);
if(conversation != null) {
    conversation.clearAllMessages();
}
```

### 删除单个本地会话指定时间段的消息

你可以删除本地指定会话在一段时间内的本地消息，示例代码如下：

```java
Conversation conversation = ChatClient.getInstance().chatManager().getConversation(conversationId);
if(conversation != null) {
    conversation.removeMessages(startTime, endTime);
}
```

### 删除本地单个会话的指定消息

你可以删除本地单个会话的指定消息，示例代码如下：

```java
Conversation conversation = ChatClient.getInstance().chatManager().getConversation(conversationId);
if(conversation != null) {
    conversation.removeMessage(messageId);
}
```


