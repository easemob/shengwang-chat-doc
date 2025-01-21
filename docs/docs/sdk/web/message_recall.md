# 撤回消息

<Toc />

发送方可以撤回一条发送成功的消息，包括已经发送的历史消息，离线消息或漫游消息。**若你当前套餐不支持该功能，需升级产品套餐。**

默认情况下，发送方可撤回发出 2 分钟内的消息。你可以联系声网商务延长消息撤回时长，该时长不超过 7 天。

:::tip
除了透传消息，其他各类型的消息都支持撤回。
:::

## 技术原理

即时通讯 IM 支持你撤回一条发送成功的消息：

- `recallMessage`：撤回一条发送成功的消息。

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，详见 [快速开始](quickstart.html)。
- 了解即时通讯 IM 的使用限制，详见 [使用限制](limitation.html)。
- 产品套餐包支持消息撤回功能。

## 实现方法

### 撤回消息

你可以调用 `recallMessage` 方法撤回一条发送成功的消息。

调用该方法后，服务端的该条消息（历史消息，离线消息或漫游消息）会被移除，消息的接收方会收到 `onRecallMessage` 事件。

:::tip
附件类型消息，包括图片、音频和视频和文件消息，撤回消息后，消息附件也相应删除。
:::

```javascript
const option = {
  // 要撤回消息的消息 ID。
  mid: "msgId",
  // 消息接收方：单聊为对方用户 ID，群聊和聊天室分别为群组 ID 和聊天室 ID。
  to: "username",
  // 会话类型：单聊、群聊和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
  chatType: "singleChat",
  // 可通过 `ext` 参数传入自定义字符串，设置扩展信息。
  ext: "ext",
};
chatClient
  .recallMessage(option)
  .then((res) => {
    console.log("success", res);
  })
  .catch((error) => {
    // 消息撤回失败，原因可能是超过了撤销时限(超过 2 分钟)。
    console.log("fail", error);
  });
```

### 设置消息撤回监听

你可以设置消息撤回监听，通过 `onRecallMessage` 监听消息撤回状态。

```javascript
  chatClient.addEventHandler('handlerId',{
   onRecallMessage: (msg) => {
      // 这里需要在本地删除对应的消息，也可以插入一条消息：“XXX撤回一条消息”。
      console.log('Recalling the message success'，msg)
      // 消息撤回方设置的自定义字段。
      console.log('recall message ext', msg?.ext)
   }
})

```
