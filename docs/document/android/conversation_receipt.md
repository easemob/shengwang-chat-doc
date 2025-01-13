# 会话已读回执

会话已读回执指接收方进入会话页面，阅读会话中的所有消息后，调用接口向服务器发送会话已读回执，服务器将该回执回调给消息发送方，消息发送方将会收到会话已读回调。在多端多设备登录下，接收方的其他设备也会收到该回调。

目前，单聊和群组聊天支持会话已读回执。本文介绍如何使用环信即时通讯 IM Android SDK 实现会话已读回执功能。

会话已读回执的效果示例，如下图所示：

![img](/images/uikit/chatuikit/feature/conversation/conversation_read.png) 

## 技术原理

 单聊会话已读回执实现的流程如下：

  1. 设置 `ChatOptions#setRequireAck` 为 `true` 开启已读回执功能。
  2. 消息接收方进入会话页面，阅读消息后，调用 `ackConversationRead` 方法发送会话已读回执。
  3. 消息发送方通过监听 `OnConversationRead` 回调接收会话已读回执。

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，并连接到服务器，详见 [快速开始](quickstart.html)。
- 了解环信即时通讯 IM 的使用限制，详见 [使用限制](/product/limitation.html)。

 ## 实现方法

 参考以下步骤在单聊中实现会话已读回执：

 1. 开启已读回执功能，即 SDK 初始化时设置 `ChatOptions#setRequireAck` 为 `true`。

 ```java
// 设置是否需要接收方已读确认,默认为 true
options.setRequireAck(true);
 ```

 2. 接收方发送会话已读回执。

消息接收方进入会话页面，查看会话中是否有未读消息。若有，调用 `ackConversationRead` 方法发送会话已读回执，没有则不发送。该方法为异步方法，需要捕捉异常。

若会话中存在多条未读消息，建议调用该方法，因为若调用发送消息已读回执方法 `ackMessageRead`，则需要调用多次。

```java
try {
    ChatClient.getInstance().chatManager().ackConversationRead(conversationId);
} catch (ChatException e) {
    e.printStackTrace();
}
```

3. 消息发送方监听会话已读回执的回调。

同一用户 ID 登录多设备的情况下，用户在一台设备上发送会话已读回执，其他设备会收到 `OnConversationRead` 回调。

:::tip
对于群组聊天，会话已读回执只用于清空服务端的群组会话的未读数，消息发送方不会通过 `OnConversationRead` 回调收到会话已读回执。
:::

```java
ChatClient.getInstance().chatManager().addConversationListener(new ConversationListener() {
        ……
        @Override
        public void onConversationRead(String from, String to) {
        // 添加刷新页面通知等逻辑。
        }
});
```

## 会话已读回执和消息未读数

消息接收方调用 `ackConversationRead` 方法发送会话已读回执，开发者可调用 `Conversation#markAllMessagesAsRead` 方法将所有未读消息设置为已读，即将该会话的未读消息数清零。
