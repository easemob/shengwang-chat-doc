# 实现消息回执

<Toc />

**单聊会话支持消息送达回执和消息已读回执**，发送方发送消息后可及时了解接收方是否及时收到并阅读了消息。

**群聊会话只支持消息已读回执，不支持送达回执**。

若你当前套餐不支持消息已读回执功能功能，需升级产品套餐。升级套餐包后，若使用群消息已读回执，需联系声网商务。

- 消息送达回执和已读回执的效果示例，如下图所示：

![img](/images/web/message_receipt.png)

## 技术原理

实现消息送达回执和已读回执的逻辑如下：

- 单聊消息送达回执：
  // TODO: 替换链接

  1. SDK 初始化时，用户将 [`ConnectionParameters` 类型中的 `delivery` 参数](https://doc.easemob.com/jsdoc/interfaces/Connection.ConnectionParameters.html#delivery)设置为 `true`。

  2. 接收方收到消息后，SDK 会自动向发送方发送送达回执。

  3. 发送方通过监听 `onDeliveredMessage` 收到消息送达回执。

- 单聊消息已读回执：

  1. 发送方发送一条消息。

  2. 消息接收方收到消息后，调用 `send` 发送消息已读回执；

  3. 消息发送方通过 `onReadMessage` 回调接收消息已读回执。

- 群聊消息已读回执：

  1. 发送方发送一条消息，消息中的 `allowGroupAck` 字段设置为 `true`，要求返回已读回执；

  2. 消息接收方收到消息后调用 `send` 方法发送群组消息的已读回执。

  3. 发送方在线监听 `onReadMessage` 回调或离线监听 `onStatisticsMessage` 回调接收消息回执。

  4. 发送方通过 `getGroupMsgReadUser` 方法获取阅读消息的用户的详情。

## 前提条件

开始前，请确保满足以下要求：

- 已经集成和初始化即时通讯 IM SDK，并实现了注册账号和登录功能。详情请参见 [快速开始](quickstart.html)。
- 了解 [产品使用限制](limitation.html)。
- 产品套餐包支持在消息已读回执功能。要使用群消息已读回执功能，需联系声网商务开通。

## 实现方法

### 单聊消息送达回执

发送消息送达回执，可参考以下步骤：

1. 消息发送方在 SDK 初始化时将 `ConnectionParameters` 中的 `delivery` 设置为 `true`。

当接收方收到消息后，SDK 底层会自动进行消息送达回执。

```javascript
const chatClient = new ChatSDK.connection({
  appId: "your appId",
  delivery: true,
});
```

2. 接收方收到消息后，发送方会收到 `onDeliveredMessage` 回调，得知消息已送达接收方。

```javascript
chatClient.addEventHandler("handlerId", {
  onReceivedMessage: function (message) {}, // 收到消息送达服务器回执。
  onDeliveredMessage: function (message) {}, // 收到消息送达客户端回执。
});
```

### 单聊消息已读回执

单聊既支持消息已读回执，也支持[会话已读回执](conversation_receipt.html)。我们建议你结合使用这两种回执，见实现步骤的描述。

单聊消息的已读回执有效期与消息在服务端的存储时间一致，即在服务器存储消息期间均可发送已读回执。消息在服务端的存储时间与你订阅的套餐包有关，详见[产品价格](billing_strategy.html#套餐包功能详情)。

参考如下步骤在单聊中实现消息已读回执。

1. 接收方发送消息已读回执。

- 消息接收方进入会话时，发送会话已读回执。

聊天页面未打开时，若有未读消息，进入聊天页面，发送会话已读回执。这种方式可避免发送多个消息已读回执。

```javascript
const option = {
  chatType: "singleChat", // 会话类型，设置为单聊。
  type: "channel", // 消息类型。
  to: "userId", // 接收消息对象的用户 ID。
};
const msg = ChatSDK.message.create(option);
chatClient.send(msg);
```

- 聊天页面打开时，若收到消息，发送消息已读回执，如下所示：

```javascript
const option = {
  type: "read", // 消息类型为消息已读回执。
  chatType: "singleChat", // 会话类型，这里为单聊。
  to: "userId", // 消息接收方的用户 ID。
  id: "id", // 需要发送已读回执的消息 ID。
};
const msg = ChatSDK.message.create(option);
chatClient.send(msg);
```

1. 消息发送方监听消息已读回调。

你可以调用接口监听指定消息是否已读，示例代码如下：

```javascript
chatClient.addEventHandler("handlerId", {
  onReadMessage: (message) => {},
});
```

### 群聊消息已读回执

对于群聊，群成员发送消息时，可以设置该消息是否需要已读回执。若需要，每个群成员在阅读消息后，SDK 均会发送已读回执，即阅读该消息的群成员数量即为已读回执的数量。

群消息已读回执特性的使用限制如下表所示：

| 使用限制             | 默认       | 描述                                                                                                                                                                                                |
| :------------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 功能开通             | 关闭       | 要使用群聊消息已读回执功能，确保你当前套餐支持消息已读回执功能后，联系声网商务开通群消息已读回执功能。若使用前未开通，SDK 提示 503 "group ack not open" 错误。                                      |
| 使用权限             | 所有群成员 | 默认情况下，所有群成员发送消息时可要求已读回执。如果仅需群主和群管理员发消息时要求已读回执，可联系商务修改，此时普通成员发送消息要求已读回执时，SDK 会提示 "group ack msg permission denied" 错误。 |
| 已读回执有效期       | 3 天       | 群聊已读回执的有效期为 3 天。你可以联系商务提上该上限。若已读回执的发送时间超过该限制，服务器不记录阅读该条消息的群组成员，也不会发送已读回执，SDK 会提示 "group ack msg not found" 错误。          |
| 群规模               | 200 人     | 该特性最大支持 200 人的群组。如果超过 200 人/群，群成员发送的消息不会返回已读回执。你可以联系商务提升群成员人数上限。                                                                               |
| 查看返回已读回执数量 | 消息发送方 | 对消息返回的已读回执数量（或返回已读回执的人数），默认仅消息发送方可查看。如需所有群成员均可查看，可联系商务开通。                                                                                  |

你可以按以下步骤实现群消息已读回执特性：

1. 群成员发送消息时若需已读回执，需设置 `allowGroupAck` 为 `true`：

```javascript
sendGroupReadMsg = () => {
    const option = {
        type: 'txt',            // 消息类型。
        chatType: 'groupChat',  // 会话类型，这里为群聊。
        to: 'groupId',          // 消息接收方，即群组 ID。
        msg: 'message content'  // 消息内容。
        msgConfig: { allowGroupAck: true } // 设置此消息需要已读回执。
    }

    const msg = ChatSDK.message.create(option);
    chatClient.send(msg).then((res) => {
        console.log('send message success');
    }).catch((e) => {
        console.log("send message error");
    })
}
```

2. 阅读消息后，消息接收方发送群消息已读回执。

```javascript
sendReadMsg = () => {
  const option = {
    type: "read", // 消息是否已读。
    chatType: "groupChat", // 会话类型，这里为群聊。
    id: "msgId", // 需要发送已读回执的消息 ID。
    to: "groupId", // 群组 ID。
    ackContent: JSON.stringify({}), // 回执内容。
  };
  const msg = ChatSDK.message.create(option);
  chatClient.send(msg);
};
```

3. 消息发送方通过监听以下任一回调接收消息已读回执：

   - `onReadMessage`：消息发送方在线时监听该回调。
   - `onStatisticMessage`：消息发送方离线时监听该回调。

   ```javascript
   // 在线时可以在 onReadMessage 里监听。
   chatClient.addEventHandler("handlerId", {
     onReadMessage: (message) => {
       let { mid } = message;
       let msg = {
         id: mid,
       };
       if (message.groupReadCount) {
         // 消息已读数。
         msg.groupReadCount = message.groupReadCount[message.mid];
       }
     },

     // 离线时收到回执，登录后会在这里监听到。
     onStatisticMessage: (message) => {
       let statisticMsg = message.location && JSON.parse(message.location);
       let groupAck = statisticMsg.group_ack || [];
     },
   });
   ```

4. 消息发送方收到群消息已读回执后，可以获取已阅读该消息的用户的详细信息：

   ```javascript
   chatClient
     .getGroupMsgReadUser({
       msgId: "messageId", // 消息 ID。
       groupId: "groupId", // 群组 ID。
     })
     .then((res) => {
       console.log(res);
     });
   ```

### 已读回执与未读消息数

会话已读回执发送后，如果用户启用了本地数据库，可以手动调用 `clearConversationUnreadCount` 方法，将该会话的未读消息数清零。
