# 获取历史消息

<Toc />

即时通讯 IM 提供消息漫游功能，即将用户的所有会话的历史消息保存在消息服务器，用户在任何一个终端设备上都能获取到历史信息，使用户在多个设备切换使用的情况下也能保持一致的会话场景。

本文介绍即时通讯 IM SDK 如何从服务器获取历史消息。

## 技术原理

利用即时通讯 IM SDK 可从服务器获取历史消息，主要方法如下：

- `getHistoryMessages`：基于 `searchOptions` 参数对象从服务器获取指定会话的消息。

## 前提条件

开始前，请确保已完成 SDK 初始化并连接到服务器，详见 [快速开始](quickstart.html)。

## 实现方法

### 从服务器获取指定会话的消息

你可以调用 `getHistoryMessages` 方法基于 `searchOptions` 参数对象允许用户按消息发送方、消息类型或时间段从服务器分页拉取历史消息。为确保数据可靠，我们建议你每次获取 20 条消息，最大不超过 50。分页查询时，若满足查询条件的消息总数大于 `pageSize` 的数量，则返回 `pageSize` 数量的消息，若小于 `pageSize` 的数量，返回实际条数。消息查询完毕时，返回的消息条数小于 `pageSize` 的数量。

对于群组聊天，你可以通过设置 `searchOptions` 对象中的 `from` 参数拉取群组中单个成员发送的历史消息。

:::tip

1. **默认可获取单聊和群组聊天的历史消息。若要获取聊天室的历史消息，需联系声网商务。**
2. 对于单聊消息，从服务器拉取历史消息时会读取服务端的消息已读和送达状态。该功能默认关闭，若要使用，需联系声网商务开通。
3. 历史消息在服务器上的存储时间与产品的套餐包相关，详见[产品套餐包详情](/product/pricing.html#套餐包功能详情)。
:::

```javascript
chatClient.getHistoryMessages({
  targetId: "targetId", // 单聊为对端用户 ID，群组聊天为群组 ID。
  chatType: "groupChat", // 会话类型：单聊、群组聊天和聊天室分别为 `singleChat`、`groupChat` 和 `chatRoom`。
  pageSize: 20, // 每次获取的消息数量，取值范围为 [1,50]，默认值为 `20`。
  searchDirection: "down", // 消息搜索方向。`up` 表示按消息时间戳递减的方向获取，即先获取最新消息；`down` 表示按消息时间戳递增的方向获取，即先获取最老的消息。
  searchOptions: {
    from: "message sender userID", // 消息发送方的用户 ID。该参数仅用于群组聊天。
    msgTypes: ["txt"], // 要获取的消息类型的数组。若不传值，会获取所有类型的消息。
    startTime: new Date("2023,11,9").getTime(), // 查询的起始时间戳，单位为毫秒。
    endTime: new Date("2023,11,10").getTime(), // 查询的结束时间戳，单位为毫秒。
  },
});
```

此外，你可以调用 `getHistoryMessages` 方法从服务器获取指定会话的历史消息。你可以指定消息查询方向，即明确按时间顺序或逆序获取。

为确保数据可靠，我们建议你每次最多获取 50 条消息，可多次获取。

```javascript
const options = {
  // 对方的用户 ID 或者群组 ID 或聊天室 ID。
  targetId: "user1",
  // 每页期望获取的消息条数。取值范围为 [1,50]，默认值为 20。
  pageSize: 20,
  // 查询的起始消息 ID。若该参数设置为 `-1`、`null` 或空字符串，从最新消息开始。
  cursor: -1,
  // 会话类型：（默认） `singleChat`：单聊；`groupChat`：群聊；`chatRoom`：聊天室
  chatType: "groupChat",
  // 消息搜索方向：（默认）`up`：按服务器收到消息的时间的逆序获取；`down`：按服务器收到消息的时间的正序获取。
  searchDirection: "up",
};
chatClient
  .getHistoryMessages(options)
  .then((res) => {
    // 成功获取历史消息。
    console.log(res);
  })
  .catch((e) => {
    // 获取失败。
  });
```
