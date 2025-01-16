# 翻译

<Toc />

为方便用户在聊天过程中对文字消息进行翻译，即时通讯 IM React Native SDK 集成了 Microsoft Azure Translation API，支持在发送或接收消息时对文本消息进行按需翻译或自动翻译：

- 按需翻译：接收方在收到文本消息后，将消息内容翻译为目标语言。
- 自动翻译：发送方发送消息时，SDK 根据发送方设置的目标语言自动翻译文本内容，然后将消息原文和译文一起发送给接收方。

## 前提条件

开始前，请确保满足以下条件：

1. 完成 SDK 初始化，详见 [初始化](initialization.html)文档。
2. 了解即时通讯 IM API 的 [使用限制](/product/limitation.html)。
3. 已在 [声网控制台](https://console.easemob.com/user/login) 开通翻译功能。
4. 该功能由 Microsoft Azure Translation API 提供，因此开始前请确保你了解该功能支持的目标语言。详见 [翻译语言支持](https://learn.microsoft.com/zh-cn/azure/ai-services/translator/language-support)。

## 技术原理

SDK 支持你通过调用 API 在项目中实现如下功能：

- `fetchSupportedLanguages` 获取支持的翻译语言；
- 按需翻译：接收方在收到文本消息后调用 `translateMessage` 进行翻译；
- 自动翻译：发送方发送消息之前设置 `ChatTextMessageBody` 中的 `targetLanguages` 字段为目标语言，然后发送消息，接收方会收到消息原文和译文。

## 实现方法

### 获取翻译服务支持的语言

无论是按需翻译还是自动翻译，都需先调用 `fetchSupportedLanguages` 获取支持的翻译语言。获取支持的翻译语言的示例代码如下：

```typescript
// 获取支持的翻译语言
ChatClient.getInstance()
  .chatManager.fetchSupportedLanguages()
  .then((result) => {
    console.log("success: ", result);
  })
  .catch((error) => {
    console.log("fail: ", error);
  });
```

### 按需翻译

接收方调用 `translateMessage` 对收到的文本消息进行翻译。翻译调用过程如下：

```typescript
// 创建文本消息，只有文本消息可以翻译
const msg = ChatMessage.createTextMessage(targetId, content);
// 指定需要翻译的目标语言
const languages = ["en"];
// 执行消息内容的翻译
ChatClient.getInstance()
  .chatManager.translateMessage(msg, languages)
  .then((result) => {
    console.log("success: ", result);
  })
  .catch((error) => {
    console.log("fail: ", error);
  });
```

翻译成功之后，译文信息会保存到消息中。调用 `translations` 获取译文内容。示例代码如下：

```typescript
const body = result.body as ChatTextMessageBody;
console.log("translation: ", body.translations);
```

### 自动翻译

创建消息时，发送方设置 `ChatTextMessageBody` 中的 `targetLanguages` 字段为译文语言，设置过程如下：

```typescript
// 指定翻译的目标语言
const languages: string[] = ["en"];
const msg = ChatMessage.createTextMessage(
  targetId,
  content,
  ChatMessageChatType.PeerChat,
  { targetLanguages: languages }
);
```

发送时消息原文和译文一起发送。

接收方收到消息后，调用 `translations` 获取消息的译文列表，示例代码如下：

```typescript
const body = result.body as ChatTextMessageBody;
console.log("translation: ", body.translations);
```