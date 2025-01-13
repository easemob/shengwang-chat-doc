# 会话标记

<Toc />

某些情况下，你可能需要对会话添加标记，例如会话标星或将会话标为已读或未读。即时通讯 IM 支持对单聊和群聊会话添加标记，最大支持 20 个标记，所以一个会话最多可添加 20 个标记。

**如果要使用会话标记功能，你需要确保产品套餐包支持[从服务端获取会话列表的功能](conversation_list.html#从服务器分页获取会话列表)。**

你需要自行维护会话标记与具体业务含义（比如 `MARK_0` 为重要会话）之间的映射关系。例如：

```typescript
let mapping = new HashMap<MarkType, string>();
mapping.set(MarkType.MARK_0,"important");
mapping.set(MarkType.MARK_1,"normal");
mapping.set(MarkType.MARK_2,"unimportant");
mapping.set(MarkType.MARK_3,"boys");
mapping.set(MarkType.MARK_4,"girls");
……
```

## 技术原理

即时通讯 IM 支持会话标记功能，主要方法如下：

- `ChatManager#addConversationMark`：标记会话。
- `ChatManager#removeConversationMark`：取消标记会话。
- `ChatManager#fetchConversationsFromServerWithFilter`：根据会话标记从服务器分页查询会话列表。
- 根据会话标记从本地查询会话列表：调用 `getConversations` 方法获取本地所有会话后自己进行会话过滤。
- `Conversation#marks`：获取本地单个会话的所有标记。

## 前提条件

开始前，请确保满足以下条件：

- 完成 SDK 初始化，并连接到服务器，详见 [快速开始](quickstart.html)。
- 了解即时通讯 IM 的使用限制，详见 [使用限制](limitation.html)。
- 产品套餐包支持[从服务端获取会话列表功能](conversation_list#从服务器分页获取会话列表)。

## 实现方法

### 标记会话

你可以调用 `addConversationMark` 方法标记会话。每次最多可为 20 个会话添加标记。调用该方法会同时为本地和服务器端的会话添加标记。

添加会话标记后，若调用 `fetchConversationsFromServer` 接口从服务器分页获取会话列表，返回的会话对象中包含会话标记，你需要通过 `Conversation#marks` 方法获取。若你已经达到了服务端会话列表长度限制（默认 100 个会话），服务端会根据会话的活跃度（最新一条消息的时间戳）删除不活跃会话，这些会话的会话标记也随之删除。

:::tip
对会话添加标记，例如会话标星，并不影响会话的其他逻辑，例如会话的未读消息数。
:::

```typescript
let conversationId = "huanhuan";
let ids = new Array<string>();
ids.push(conversationId);
ChatClient.getInstance().chatManager()?.addConversationMark(ids, MarkType.MARK_0).then(()=> {
  // success logic
}).catch((e: ChatError) => {
  // failure logic
});
```

### 取消标记会话

你可以调用 `removeConversationMark` 方法删除会话标记。每次最多可移除 20 个会话的标记。

调用该方法会同时移除本地和服务器端会话的标记。

```typescript
let conversationId = "huanhuan";
let ids = new Array<string>();
ids.push(conversationId);
ChatClient.getInstance().chatManager()?.removeConversationMark(ids, MarkType.MARK_0).then(()=> {
  // success logic
}).catch((e: ChatError) => {
  // failed logic
});
```

### 根据会话标记从服务器分页查询会话列表

你可以调用 `fetchConversationsFromServerWithFilter` 方法根据会话标记从服务器分页获取会话列表。SDK 会按会话标记的时间的倒序返回会话列表，每个会话对象中包含会话 ID、会话类型、是否为置顶状态、置顶时间（对于未置顶的会话，值为 `0`）、会话标记以及最新一条消息。从服务端拉取会话列表后会更新本地会话列表。

```typescript
// filter：会话查询选项，包括会话标记和每页获取的会话条数（最多可获取 10 条）。下面的代码以查询服务端所有标记了 `MarkType.MARK_0` 的会话为例。
let filter: ConversationFilter = {markType: MarkType.MARK_0, pageSize: 10};
ChatClient.getInstance().chatManager()?.fetchConversationsFromServerWithFilter(filter).then(result => {
  // success logic
}).catch((e: ChatError) => {
  // failure logic
});
```

### 根据会话标记从本地查询会话列表

对于本地会话，你可以调用 `getConversations` 方法获取本地所有会话后自己进行会话过滤。下面以查询标记了 `MarkType.MARK_0` 的所有本地会话为例。

```typescript
//最终的查询结果全部放入 result 中。
let result = new Array<Conversation>();
let conversations = ChatClient.getInstance().chatManager()?.getConversations();
if(conversations && conversations.length > 0){
  conversations.forEach(conversation => {
    let marks = conversation.marks();
    if (marks && marks.size > 0) {
      marks.forEach(mark => {
        if (mark === MarkType.MARK_0) {
          result.push(conversation);
        }
      })
    }
  })
}
```

### 获取本地单个会话的所有标记

你可以调用 `Conversation#marks` 方法获取本地单个会话的所有标记，示例代码如下：

```typescript
let conversation = ChatClient.getInstance().chatManager()?.getConversation("conversationId");
let marks = conversation?.marks();
```








