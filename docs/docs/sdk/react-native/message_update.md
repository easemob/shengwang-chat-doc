# 更新消息

<Toc />

本文介绍即时通讯 IM React Native SDK 如何更新本地消息。

## 技术原理

即时通讯 IM React Native SDK 通过 `ChatManager` 和 `ChatConversation` 支持更新本地数据库中的消息，其中包含如下主要方法：

- `updateMessage`：更新消息。

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，并连接到服务器，详见 [初始化](initialization.html)及[连接](connection.html)文档。
- 了解即时通讯 IM API 的使用限制，详见 [使用限制](limitation.html)。

## 实现方法

### 更新消息

你可以调用 `updateMessage` 方法更新指定消息。该方法会同时更新本地内存和数据库中的消息。

```typescript
ChatClient.getInstance()
  .chatManager.updateMessage(newMsg)
  .then(() => {
    console.log("update message success");
  })
  .catch((reason) => {
    console.log("update message fail.", reason);
  });
```