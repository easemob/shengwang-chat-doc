# 撤回消息

<Toc />

发送方可以撤回一条发送成功的消息，包括已经发送的历史消息，离线消息或漫游消息。**若你当前套餐不支持该功能，需升级产品套餐。**

默认情况下，发送方可撤回发出 2 分钟内的消息。你可以联系声网商务延长消息撤回时长，该时长不超过 7 天。

:::tip
除了透传消息，其他各类型的消息都支持撤回。
:::

## 技术原理

环信即时通讯 IM 通过 `IChatManager` 和 `Message` 类支持你撤回一条发送成功的消息：

- `RecallMessage`：撤回一条发送成功的消息。

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，详见 [快速开始](quickstart.html)。
- 了解即时通讯 IM 的使用限制，详见 [使用限制](/product/limitation.html)。
- 产品套餐包支持消息撤回功能。

## 实现方法

### 撤回消息

你可以调用 `RecallMessage` 方法撤回一条发送成功的消息。

调用该方法后，服务端的该条消息（历史消息，离线消息或漫游消息）以及消息发送方和接收方的内存和数据库中的消息均会被移除，消息的接收方会收到 `OnMessagesRecalled` 事件。

:::tip
1. 你可以通过 `ext` 字段传入自定义字符串，设置扩展信息。
2. 附件类型消息，包括图片、音频和视频和文件消息，撤回消息后，消息附件也相应删除。
:::

```csharp
SDKClient.Instance.ChatManager.RecallMessage("Message ID", "Please ignore the message", new CallBack(
  onSuccess: () => {
    Debug.Log("回撤成功");
  },
  onProgress: (progress) => {
    Debug.Log($"回撤进度 {progress}");
  },
  onError: (code, desc) => {
    Debug.Log($"回撤失败，errCode={code}, errDesc={desc}");
  }
 ));
```

### 设置消息撤回监听

你可以设置消息撤回监听，通过 `OnMessagesRecalled` 事件监听发送方对已接收的消息的撤回。

- 若用户在线接收了消息，消息撤回时，该事件中的 `RecallMessageInfo` 中的 `RecallMessage` 为撤回的消息的内容，`RecallMessageId` 属性返回撤回的消息的 ID。
- 若消息发送和撤回时接收方离线，该事件中的 `RecallMessageInfo` 中的 `RecallMessage` 为空，`RecallMessageId` 属性返回撤回的消息的 ID。

```csharp
void OnMessagesRecalled(List<RecallMessageInfo> recallMessagesInfo);
```