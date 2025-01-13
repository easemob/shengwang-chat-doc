# 删除消息

<Toc />

本文介绍用户如何单向删除服务端和本地的历史消息。

## 技术原理

使用即时通讯 IM SDK 可以通过 `ChatManager` 和 `Conversation` 类单向删除服务端和本地的历史消息，主要方法如下：

- `ChatManager#DeleteAllMessagesAndConversations`：清空当前用户的聊天记录，包括单聊、群聊和聊天室的消息和会话，同时可以选择是否单向清除服务端的聊天记录。
- `ChatManager#RemoveMessagesFromServer`：单向删除服务端的历史消息。
- `Conversation#DeleteAllMessages`：删除本地指定会话的所有消息。
- `Conversation#DeleteMessages (long startTime, long endTime)`：删除本地单个会话在指定时间段的消息。
- `Conversation#DeleteMessage (string messageId)`：删除本地单个会话的指定消息。

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，并连接到服务器，详见 [快速开始](quickstart.html)。
- 了解即时通讯 IM 的使用限制，详见 [使用限制](limitation.html)。

## 实现方法

### 清空聊天记录

你可以调用 `DeleteAllMessagesAndConversations` 方法清空当前用户的聊天记录，包括单聊、群组聊天和聊天室的消息和会话。同时你也可以选择是否清除服务端的聊天记录。若你清除了服务端的聊天记录，你无法从服务端拉取到会话和消息，而其他用户不受影响。

```csharp
bool clearServerData = false; // or true
SDKClient.Instance.ChatManager.DeleteAllMessagesAndConversations(clearServerData, new CallBack(
    onSuccess: () =>
    {
    },
    onError: (code, desc) =>
    {
    }
));
```

### 单向删除服务端的历史消息

你可以调用 `RemoveMessagesFromServer` 方法删除你在服务器和本地的消息。删除后，该用户无法从服务端拉取到该消息，不过，与该用户的单聊、群聊和聊天室会话中的其它用户的服务器消息不受影响，可以漫游获取。

每次最多可删除 50 条消息。多设备情况下，登录该账号的其他设备会收到 `IMultiDeviceDelegate` 中的 `OnRoamDeleteMultiDevicesEvent` 回调，已删除的消息自动从设备本地移除。

```csharp
// 按时间删除历史消息
SDKClient.Instance.ChatManager.RemoveMessagesFromServer(convId, ctype, time, new CallBack(
    onSuccess: () =>
    {
    },
    onError: (code, desc) =>
    {
    }
));
// 按消息 ID 删除历史消息
SDKClient.Instance.ChatManager.RemoveMessagesFromServer(convId, ctype, msgList, new CallBack(
    onSuccess: () =>
    {
    },
    onError: (code, desc) =>
    {
    }
));
```

### 删除本地指定会话的所有消息

你可以删除本地指定会话的所有消息，示例代码如下：

```csharp
Conversation conv = SDKClient.Instance.ChatManager.GetConversation(conversionId, conversationType);

if (conv.DeleteAllMessages()){
    //成功删除消息
}
else{
    //删除消息失败
}
```

### 删除本地单个会话在指定时间段的消息

你可以删除本地指定会话在一段时间内的本地消息，示例代码如下：

```csharp
Conversation conv = SDKClient.Instance.ChatManager.GetConversation(conversionId, conversationType);

if (conv.DeleteMessages(startTime, endTime)) {
    //成功删除消息
}
else {
    //删除消息失败
}
```

### 删除本地单个会话的指定消息

你可以删除本地单个会话的指定消息，示例代码如下：

```csharp
Conversation conv = SDKClient.Instance.ChatManager.GetConversation(conversionId, conversationType);

if (conv.DeleteMessage(msgid)){
    //成功删除消息
}
else{
    //删除消息失败
}
```





