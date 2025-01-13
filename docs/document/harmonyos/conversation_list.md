# 会话列表

<Toc />

对于单聊、群组聊天和聊天室会话，用户发消息时 SDK 会自动创建会话并将会话添加至用户的会话列表。

声网服务器和本地均存储会话，你可以获取会话列表。

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，并连接到服务器，详见 [快速开始](quickstart.html)。
- 了解即时通讯 IM 的使用限制，详见 [使用限制](limitation.html)。

## 技术原理

即时通讯 IM 支持从服务器和本地获取会话列表，主要方法如下：

- `fetchConversationsFromServer`：从服务器获取会话列表。
- `getAllConversationsBySort`：一次性获取本地所有会话。

## 实现方法

### 从服务器分页获取会话列表

你可以调用 `fetchConversationsFromServer` 方法从服务端分页获取会话列表，包含单聊和群组聊天会话，不包含聊天室会话。SDK 按照会话活跃时间（会话的最新一条消息的时间戳）的倒序返回会话列表，每个会话对象中包含会话 ID、会话类型以及最新一条消息。从服务端拉取会话列表后会更新本地会话列表。

**对于每个终端用户，服务器默认存储 100 条会话，若提升该上限，需联系声网商务。** 超过上限后，新会话会覆盖旧会话。

:::tip
1. **若你当前套餐不支持该功能，需升级产品套餐。** 
2. 建议你在首次下载、卸载后重装应用等本地数据库无数据情况下拉取服务端会话列表。其他情况下，调用 `getAllConversationsBySort`、`getConversations` 方法获取本地所有会话即可。
3. 通过 RESTful 接口发送的消息默认不创建或写入会话。若会话中的最新一条消息通过 RESTful 接口发送，获取会话列表时，该会话中的最新一条消息显示为通过非 RESTful 接口发送的最新消息。若需要 RESTful 接口发送的消息写入会话列表，需联系声网商务开通。
:::

示例代码如下：

```typescript
// limit: 每页返回的会话数。取值范围为 [1,50]。
// cursor: 开始获取数据的游标位置。若获取数据时传空字符串（""），SDK 从最新活跃的会话开始获取。
let limit = 50;
let cursor = "";
ChatClient.getInstance().chatManager()?.fetchConversationsFromServer(limit, cursor).then((result) => {
    // success logic
}).catch((e: ChatError) => {
    // failed logic
});
```

### 一次性获取本地所有会话

要一次性获取本地所有会话，你可以调用 `getAllConversationsBySort` 方法。SDK 首先从内存中获取会话，若会话未从本地数据库加载过，SDK 会先将数据库中的会话加载到内存。获取会话后，SDK 按照会话活跃时间（最新一条消息的时间戳）的倒序返回会话，置顶会话在前，非置顶会话在后，会话列表为 `Array<Conversation>` 结构。

示例代码如下：

```typescript
let conversations = ChatClient.getInstance().chatManager()?.getAllConversationsBySort();
```

- 你也可以调用 `getConversations` 方法返回 `Array<Conversation>` 结构的无序会话。
