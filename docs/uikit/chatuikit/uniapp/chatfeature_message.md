# 消息特性

<Toc />

本文介绍消息相关特性，包括消息复制、删除、撤回、编辑和引用。

## 消息复制

消息复制是指用户可以将一条消息复制到剪贴板。消息复制可以帮助用户将消息保存到其他地方，或将其粘贴到其他应用程序中。

![img](/images/uikit/chatuikit/feature/message/message_copy.png =600x600) 

## 消息删除	

消息删除是指用户可以删除一条消息。消息删除可以帮助用户删除错误发送的消息，或删除不想保留的消息。

![img](/images/uikit/chatuikit/uniapp/message_delete.png) 

## 消息撤回

消息撤回是指用户可以撤回一条已发送的消息。消息撤回可以帮助用户撤回错误发送的消息，或撤回不想让其他用户看到的消息。

![img](/images/uikit/chatuikit/feature/message/message_recall.png) 

## 消息编辑

消息编辑是指用户可以编辑一条已发送的消息。消息编辑可以帮助用户纠正错误，或添加新信息。无论单聊还是群组聊天，该特性只支持用户编辑自己发送的消息，不能编辑其他用户发送的消息。

![img](/images/uikit/chatuikit/feature/message/message_edit.png) 

## 消息引用	

消息引用指用户可以引用一条已发送的消息。消息引用可以帮助用户回复特定的消息，或强调特定的信息。

目前，单群聊 UIKit 支持引用消息进行回复。消息引用 UI 和逻辑结构如下：
- `ChatUIKitMessageReplyView`：消息气泡的引用消息自定义 View。
- `ChatUIKitExtendMessageReplyView`：底部输入框组件上方展示的引用消息自定义 View。
- `ChatUIKitMessageReplyController`：控制引用功能的显示、隐藏、跳转等逻辑。

![img](/images/uikit/chatuikit/feature/message/message_reply.png) 

#### 如何使用

消息引用特性在 `ChatUIKitConfig` 中默认开启，即 `enableReplyMessage` 的默认值为 `true`。要关闭该特性，需将该参数设置为 `false`。

示例代码如下：

```kotlin

	 ChatUIKitClient.getConfig()?.chatConfig?.enableReplyMessage

```








