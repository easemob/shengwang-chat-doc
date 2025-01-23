# 聊天消息

<Toc />

单群聊 UIKit 提供 `UIKitChatActivity` 和 `UIKitChatFragment` 两种方式方便用户快速集成聊天页面和自定义聊天页面。该页面提供如下功能：

- 发送和接收消息, 包括文本、表情、图片、语音、视频、文件和名片消息。
- 对消息进行复制、引用、撤回、删除、编辑、重新发送和审核。
- 从服务器拉取漫游消息。
- 清除本地消息。

消息相关功能，详见[功能介绍文档](chatfeature_message.html)。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/android/custom_chat_detail.png" title="聊天页面" />
</ImageGallery>


## 使用示例

`UIKitChatActivity` 页面主要进行了权限的请求，比如相机权限，语音权限等。

```kotlin
// conversationId: 单聊为对端用户的用户 ID，群聊为群组 ID。
// chatType：单聊和群聊分别为 ChatUIKitType#SINGLE_CHAT 和 ChatUIKitType#GROUP_CHAT。
UIKitChatActivity.actionStart(mContext, conversationId, chatType)
```

```kotlin
class ChatActivity: AppCompactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_chat)
        // conversationId: 单聊为对端用户的用户 ID，群聊为群组 ID。
        // chatType：单聊和群聊分别为 ChatUIKitType#SINGLE_CHAT 和 ChatUIKitType#GROUP_CHAT。
        UIKitChatFragment.Builder(conversationId, chatType)
                        .build()?.let { fragment ->
                            supportFragmentManager.beginTransaction()
                                .replace(R.id.fl_fragment, fragment).commit()
                        }
    }
}
```

## 自定义聊天页面概览

你可以配置聊天页面的标题栏、消息列表项和输入菜单等。

### 通过 UIKitChatFragment.Builder 自定义设置

`UIKitChatFragment` 提供了 Builder 构建方式，方便开发者进行一些自定义设置，目前提供的设置项如下：

```kotlin
// conversationID: 单聊为对端用户的用户 ID，群聊为群组 ID。
// chatType: 单聊和群聊分别为 SINGLE_CHAT 和 GROUP_CHAT。
UIKitChatFragment.Builder(conversationID, chatType)
        .useTitleBar(true)
        .setTitleBarTitle("title")
        .setTitleBarSubTitle("subtitle")
        .enableTitleBarPressBack(true)
        .setTitleBarBackPressListener(onBackPressListener)
        .getHistoryMessageFromServerOrLocal(false)
        .setOnChatExtendMenuItemClickListener(onChatExtendMenuItemClickListener)
        .setOnChatInputChangeListener(onChatInputChangeListener)
        .setOnMessageItemClickListener(onMessageItemClickListener)
        .setOnMessageSendCallBack(onMessageSendCallBack)
        .setOnWillSendMessageListener(willSendMessageListener)
        .setOnChatRecordTouchListener(onChatRecordTouchListener)
        .setOnModifyMessageListener(onModifyMessageListener)
        .setOnReportMessageListener(onReportMessageListener)
        .setMsgTimeTextColor(msgTimeTextColor)
        .setMsgTimeTextSize(msgTimeTextSize)
        .setReceivedMsgBubbleBackground(receivedMsgBubbleBackground)
        .setSentBubbleBackground(sentBubbleBackground)
        .showNickname(false)
        .hideReceiverAvatar(false)
        .hideSenderAvatar(true)
        .setChatBackground(chatBackground)
        .setChatInputMenuBackground(inputMenuBackground)
        .setChatInputMenuHint(inputMenuHint)
        .sendMessageByOriginalImage(true)
        .setEmptyLayout(R.layout.layout_chat_empty)
        .setCustomAdapter(customAdapter)
        .setCustomFragment(myChatFragment)
        .build()
```

`UIKitChatFragment#Builder` 提供的方法如下表所示：

| 方法                                   | 描述                                                         |
| -------------------------------------- | ---------------------------------------------------- |
| useTitleBar()                          | 是否使用默认的标题栏（`ChatUIKitTitleBar`）：<br/> - `true`：是。 <br/> - (默认) `false`: 否。        |
| setTitleBarTitle()                     | 设置标题栏的标题。                                        |
| setTitleBarSubTitle()                  | 设置标题栏的子标题。                                       |
| enableTitleBarPressBack()              | 设置是否支持显示返回按钮：<br/> - `true`：是。 <br/> - (默认) `false`: 否。                 |
| setTitleBarBackPressListener()         | 设置点击标题栏返回按钮的监听事件。                          |
| getHistoryMessageFromServerOrLocal()   | 设置优先从服务器还是本地获取消息。                          |
| setOnChatExtendMenuItemClickListener() | 设置扩展功能的条目点击事件监听。                             |
| setOnChatInputChangeListener()         | 设置菜单中文本变化的监听。                                   |
| setOnMessageItemClickListener()        | 设置消息条目的点击事件监听，包括气泡区域及头像的点击及长按事件。 |
| setOnMessageSendCallBack()             | 设置发送消息的结果回调监听。                                   |
| setOnWillSendMessageListener()         | 设置发送消息前添加消息扩展属性的回调。                       |
| setOnChatRecordTouchListener()         | 设置录音按钮的触摸事件回调。                                 |
| setOnModifyMessageListener()           | 设置编辑消息的结果回调监听。                                 |
| setOnReportMessageListener()           | 设置举报消息的结果回调监听。                                 |
| setMsgTimeTextColor()                  | 设置时间线文本的颜色。                                        |
| setMsgTimeTextSize()                   | 设置时间线文本的字体大小。                                  |
| setReceivedMsgBubbleBackground()       | 设置接收消息气泡区域的背景。                            |
| setSentBubbleBackground()              | 设置发送消息气泡区域的背景。                              |
| showNickname()                         | 是否显示昵称：<br/> - `true`：是。 <br/> - (默认) `false`: 否。    |
| hideReceiverAvatar()                   | 设置不展示接收方头像，默认展示接收方头像。      |
| hideSenderAvatar()                     | 设置不展示发送方头像，默认展示发送方头像。  |
| setChatBackground()                    | 设置聊天列表区域的背景。   |
| setChatInputMenuBackground()           | 设置菜单区域的背景。       |
| setChatInputMenuHint()                 | 设置菜单区域输入文本框的提示文字。    |
| sendMessageByOriginalImage()           | 设置图片消息是否发送原图：<br/> - `true`：是。 <br/> - (默认) `false`: 否。   |
| setEmptyLayout()                       | 设置聊天列表的空白页面。      |
| setCustomAdapter()                     | 设置自定义的适配器，默认为 `ChatUIKitMessagesAdapter`。   |
| setCustomFragment()                    | 设置自定义聊天 Fragment，需要继承自 `UIKitChatFragment`。  |

### 添加自定义消息布局

开发者可以继承 `ChatUIKitMessagesAdapter`、`ChatUIKitRowViewHolder` 和 `ChatUIKitRow`，实现自己的 `CustomMessageAdapter`、`CustomChatTypeViewViewHolder` 和 `CustomTypeChatRow`，然后将 `CustomMessageAdapter` 设置到 `UIKitChatFragment#Builder#setCustomAdapter` 中。

1. 创建自定义适配器 `CustomMessageAdapter` 继承自 `ChatUIKitMessagesAdapter`，重写 `getViewHolder` 和 `getItemNotEmptyViewType` 方法。

```kotlin
class CustomMessageAdapter: ChatUIKitMessagesAdapter() {

    override fun getItemNotEmptyViewType(position: Int): Int {
        // 根据消息类型设置自己的 itemViewType。
        // 如果要使用默认的，返回 super.getItemNotEmptyViewType(position) 即可。
        return CUSTOM_YOUR_MESSAGE_TYPE
    }

    override fun getViewHolder(parent: ViewGroup, viewType: Int): ViewHolder<ChatMessage> {
        // 根据返回的 viewType 返回对应的 ViewHolder。
        // 返回自定义的 ViewHolder 或者使用默认的 super.getViewHolder(parent, viewType)。
        return CUSTOM_VIEW_HOLDER()
    }
}
```

2. 创建` CustomTypeChatRow` ，继承自 `ChatUIKitRow`。

```kotlin
class CustomTypeChatRow(
    private val context: Context,
    private val attrs: AttributeSet? = null,
    private val defStyle: Int = 0,
    isSender: Boolean = false
): ChatUIKitRow(context, attrs, defStyle, isSender) {

    override fun onInflateView() {
        inflater.inflate(if (!isSender) R.layout.layout_row_received_custom_type
        else R.layout.layout_row_sent_custom_type,
            this)
    }

    override fun onSetUpView() {
        (message?.getMessage()?.body as? ChatTextMessageBody)?.let { txtBody ->
            contentView.text = txtBody.message
        }
    }
}
```

3. 创建 `CustomChatTypeViewViewHolder`，继承自 `ChatUIKitRowViewHolder`。

```kotlin
class CustomChatTypeViewViewHolder(
    itemView: View
): ChatUIKitRowViewHolder(itemView) {

    override fun onBubbleClick(message: ChatMessage?) {
        super.onBubbleClick(message)
        // 添加点击事件
    }
}
```

4. 完善 `CustomMessageAdapter`。

```kotlin
class CustomMessageAdapter: ChatUIKitMessagesAdapter() {

    override fun getItemNotEmptyViewType(position: Int): Int {
        // 根据消息类型设置自己的 itemViewType。
        mData?.get(position)?.getMessage()?.let { msg ->
            msg.getStringAttribute("type", null)?.let { type ->
                if (type == CUSTOM_TYPE) {
                    return if (msg.direct() == ChatMessageDirection.SEND) {
                        VIEW_TYPE_MESSAGE_CUSTOM_VIEW_ME
                    } else {
                        VIEW_TYPE_MESSAGE_CUSTOM_VIEW_OTHER
                    }
                }
            }
        }
        // 如果要使用默认的，返回 super.getItemNotEmptyViewType(position) 即可。
        return super.getItemNotEmptyViewType(position)
    }

    override fun getViewHolder(parent: ViewGroup, viewType: Int): ViewHolder<ChatMessage> {
        // 根据返回的 viewType 返回对应的 ViewHolder。
        if (viewType == VIEW_TYPE_MESSAGE_CUSTOM_VIEW_ME || viewType == VIEW_TYPE_MESSAGE_CUSTOM_VIEW_OTHER) {
            CustomChatTypeViewViewHolder(
                CustomTypeChatRow(parent.context, isSender = viewType == VIEW_TYPE_MESSAGE_CUSTOM_VIEW_ME)
            )
        }
        // 返回自定义的 ViewHolder 或者 使用默认的 super.getViewHolder(parent, viewType)
        return super.getViewHolder(parent, viewType)
    }

    companion object {
        private const val CUSTOM_TYPE = "custom_type"
        private const val VIEW_TYPE_MESSAGE_CUSTOM_VIEW_ME = 1000
        private const val VIEW_TYPE_MESSAGE_CUSTOM_VIEW_OTHER = 1001
    }
}
```

5. 添加 `CustomMessageAdapter` 到 `UIKitChatFragment#Builder`。

```kotlin
builder.setCustomAdapter(CustomMessageAdapter())
```

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/android/custom_message_type.png" title="自定义消息类型" />
</ImageGallery>

### 列表控件相关功能设置

```kotlin
val chatMessageListLayout:ChatUIKitMessageListLayout? = binding?.layoutChat?.chatMessageListLayout
```

`ChatUIKitMessageListLayout` 提供了如下方法：

| 方法                        | 描述                                                        |
| ------------------------------ | ---------------------------------------------------- |
| setViewModel()              | UIKit 中提供了默认的实现 `ChatUIKitMessageListViewModel`，开发者可以继承 `IChatMessageListRequest` 添加自己的数据逻辑。 |
| setMessagesAdapter()        | 设置消息列表的适配器，需要是 `ChatUIKitMessagesAdapter` 的子类。                                         |
| getMessagesAdapter()        | 返回消息列表的适配器。                                         |
| addHeaderAdapter()          | 添加消息列表的头布局的适配器。                                |
| addFooterAdapter()          | 添加消息列表的尾布局的适配器。                                 |
| removeAdapter()             | 移除指定适配器。                                              |
| addItemDecoration()         | 添加消息列表的装饰器。                                        |
| removeItemDecoration()      | 移除消息列表的装饰器。                                        |
| setAvatarDefaultSrc()       | 设置条目的默认头像。                                         |
| setAvatarShapeType()        | 设置头像的样式，分为默认样式，圆形和矩形三种样式。   |
| showNickname()              | 是否展示条目的昵称，`UIKitChatFragment#Builder` 也提供了此功能的设置方法。 |
| setItemSenderBackground()   | 设置发送方的背景，`UIKitChatFragment#Builder` 也提供了此功能的设置方法。 |
| setItemReceiverBackground() | 设置接收方的背景，`UIKitChatFragment#Builder` 也提供了此功能的设置方法。 |
| setItemTextSize()           | 设置文本消息的字体大小。                                       |
| setItemTextColor()          | 设置文本消息的字体颜色。                                       |
| setTimeTextSize()           | 设置时间线文本的字体大小，`UIKitChatFragment#Builder` 也提供了此功能的设置方法。 |
| setTimeTextColor()          | 设置时间线文本的颜色，`UIKitChatFragment#Builder` 也提供了此功能的设置方法。 |
| setTimeBackground()         | 设置时间线的背景。                                             |
| hideChatReceiveAvatar()     | 不展示接收方头像，默认为展示，`UIKitChatFragment#Builder` 也提供了此功能的设置方法。 |
| hideChatSendAvatar()        | 不展示发送方头像，默认为展示，`UIKitChatFragment#Builder` 也提供了此功能的设置方法。 |
| setOnChatErrorListener()    | 设置发送消息时的错误回调，`UIKitChatFragment#Builder` 也提供了此功能的设置方法。 |


### 扩展功能设置

```kotlin
val chatExtendMenu: IChatExtendMenu? = binding?.layoutChat?.chatInputMenu?.chatExtendMenu
```

获取到 `chatExtendMenu` 对象后，对于扩展功能可以进行添加，移除，排序以及处理扩展功能的点击事件等。

`IChatExtendMenu` 提供的方法如下表所示：

| 方法                                    | 描述                                                 |
| -------------------------------------- | ---------------------------------------------------- |
| clear()            | 清除所有的扩展菜单项。   |
| setMenuOrder()     | 对指定的菜单项进行排序。 |
| registerMenuItem() | 添加新的菜单项。         |


<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/android/custom msg_type_list.png" title="消息类型扩展" />
</ImageGallery>

### 监听扩展条目点击事件

开发者可以利用 `UIKitChatFragment#Builder#setOnChatExtendMenuItemClickListener` 进行监听，也可以在自定义的 `Fragment` 中重写 `onChatExtendMenuItemClick` 方法。

```kotlin
override fun onChatExtendMenuItemClick(view: View?, itemId: Int): Boolean {
    if(itemId == CUSTOM_YOUR_EXTEND_MENU_ID) {
        // 处理你自己的点击事件逻辑
        // 如果要自定义点击事件需要返回 `true`
        return true
    }
    return super.onChatExtendMenuItemClick(view, itemId)
}
```

### 设置消息长按后的菜单项

**风格样式**

1. 若实现消息长按后弹出类似微信样式的弹窗，可进行如下设置：

```kotlin
ChatUIKitClient.getConfig()?.chatConfig?.enableWxMessageStyle = true
```

2. 若实现消息长按后弹出仿系统 UIActionSheet 样式的弹窗，可进行如下设置：

```kotlin
ChatUIKitClient.getConfig()?.chatConfig?.enableWxMessageStyle = false
```

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/android/message_longpress_1.png" title="UIActionSheet" />
  <ImageItem src="/images/uikit/chatuikit/android/message_longpress_2.png" title="类似微信样式" />
</ImageGallery>

**菜单条目相关操作**

- 增加自定义菜单条目

```kotlin
binding?.let {
    it.layoutChat.addItemMenu(menuId, menuOrder, menuTile)
}
```

- 显示或隐藏指定菜单

```kotlin
binding?.let {
    it.layoutChat.findItemVisible(itemId: Int, visible: Boolean)
}
```

`ChatUIKitLayout` 提供的长按菜单方法如下表所示：

| 方法                                | 描述                                                         |
| -------------------------------------- | ---------------------------------------------------- |
| clearMenu()                         | 清除菜单项。                                                  |
| addItemMenu()                       | 添加新的菜单项。                                               |
| findItemVisible()                   | 通过指定 `itemId` 设置菜单项的可见性。                           |
| setOnMenuChangeListener()           | 设置菜单项的点击事件监听，`UIKitChatFragment` 中已经设置此监听。  |

- 处理菜单的事件

  在自定义的 `Fragment` 中重写以下方法：

```kotlin
override fun onPreMenu(helper: ChatUIKitChatMenuHelper?, message: ChatMessage?) {
    // 菜单展示前的回调事件，可以通过 helper 对象在这里设置菜单条目是否展示。
}

override fun onMenuItemClick(item: ChatUIKitMenuItem?, message: ChatMessage?): Boolean {
    // 如果要拦截某个点击事件，需要设置返回 `true`。
    return false
}

override fun onDismiss() {
    // 可以在这里处理快捷菜单的隐藏事件。
}
```

### 设置发送附件消息弹窗样式

1. 若实现发送附件消息时弹出类似微信样式的弹窗，可进行如下设置：
   
```kotlin
ChatUIKitClient.getConfig()?.chatConfig?.enableWxExtendStyle = true
```
    
2. 若实现消息长按后弹出仿系统 `UIActionSheet` 样式的弹窗，可进行如下设置：

```kotlin
ChatUIKitClient.getConfig()?.chatConfig?.enableWxExtendStyle = false
```  

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/android/message_types_1.png" title="UIActionSheet" />
  <ImageItem src="/images/uikit/chatuikit/android/message_types_2.png" title="类似微信样式" />
</ImageGallery>

### 设置输入菜单相关属性

- 获取 `ChatUIKitInputMenu` 对象：

```kotlin
    val chatInputMenu: ChatUIKitInputMenu? = binding?.layoutChat?.chatInputMenu

    chatInputMenu?.let{
        it.setCustomPrimaryMenu()           //设置自定义的菜单项，支持 View 和 Fragment 两种方式 
        it.setCustomEmojiconMenu()          //设置自定义的表情功能，支持 View 和 Fragment 两种方式  
        it.setCustomExtendMenu()            //设置自定义的扩展功能，支持 View、Dialog 和 Fragment 三种方式 
        it.setCustomTopExtendMenu()         //设置自定义的菜单顶部布局，支持 View 和 Fragment 两种方式 

        it.hideInputMenu()                  //隐藏除了菜单顶部区域外的区域   
        it.hideExtendContainer()            //隐藏扩展区域，包括表情区域和扩展功能区域 

        it.chatPrimaryMenu                  //获取菜单项接口
        it.chatExtendMenu                   //获取扩展功能接口  
        it.chatEmojiMenu                    //获取表情功能菜单接口   

    }

    //例如，设置自定义的扩展功能
    val menuDialog = ChatUIKitExtendMenuDialog(mContext)
    binding?.layoutChat?.chatInputMenu?.setCustomExtendMenu(menuDialog)
```

`ChatUIKitInputMenu` 提供了如下方法：

| 方法                       | 描述                                                         |
| -------------------------- | ------------------------------------------------------------ |
| setCustomPrimaryMenu()     | 设置自定义的菜单项，支持 View 和 Fragment 两种方式。           |
| setCustomEmojiconMenu()    | 设置自定义的表情功能，支持 View 和 Fragment 两种方式。        |
| setCustomExtendMenu()      | 设置自定义的扩展功能，支持 View ，Dialog 和 Fragment 三种方式。 |
| setCustomTopExtendMenu()   | 设置自定义的菜单顶部布局，支持 View ，Fragment 两种方式。 |
| hideExtendContainer()      | 隐藏扩展区域，包括表情区域和扩展功能区域。                     |
| hideInputMenu()            | 隐藏除了菜单顶部区域外的区域。                     |
| showEmojiconMenu()         | 展示表情功能区域。                                             |
| showExtendMenu()           | 展示扩展功能区域。                                             |
| showTopExtendMenu()        | 展示顶部扩展功能区域。                                          |
| setChatInputMenuListener() | 设置输入菜单监听。                                             |
| chatPrimaryMenu           | 获取菜单项接口。                                               |
| chatEmojiMenu             | 获取表情功能菜单接口。                                         |
| chatExtendMenu            | 获取扩展功能接口。                                             |
| chatTopExtendMenu        | 获取顶部扩展功能接口。                                            |

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/android/custom_chat_input_bar.png" title="设置输入菜单" />
</ImageGallery>

- 获取输入菜单项对象：

```kotlin
val primaryMenu: IChatPrimaryMenu? = binding?.layoutChat?.chatInputMenu?.chatPrimaryMenu
```

IChatPrimaryMenu 提供了如下方法：

| 方法                | 描述                                     |
| ------------------- | ----------------------------------------- |
| onTextInsert()      | 在光标处插入文本                          |
| editText            | 获取菜单输入框对象                        |
| setMenuBackground() | 设置菜单的背景                            |

- 获取表情菜单对象：

```kotlin
val emojiconMenu: IChatEmojiconMenu? = binding?.layoutChat?.chatInputMenu?.chatEmojiMenu
```

`IChatEmojiconMenu` 提供了如下方法：

| 方法                  | 描述               |
| --------------------- | ------------------ |
| addEmojiconGroup()    | 添加自定义表情。     |
| removeEmojiconGroup() | 移除指定的表情组。   |

添加自定义表情：

```kotlin
binding?.let {
    it.layoutChat.chatInputMenu?.chatEmojiMenu?.addEmojiconGroup(EmojiconExampleGroupData.getData())
}
```

## 自定义聊天页面样式

你可以配置聊天页面的标题栏、消息列表项等。以下设置均以使用或继承 `UIKitChatFragment` 为前提条件。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/android/custom_chat.png" title="聊天页面" />
</ImageGallery>

### 设置标题栏

聊天页面、会话列表页面、联系人列表页面、群详情页面和联系人详情页面的标题栏均使用 `ChatUIKitTitleBar`。如果聊天页面的标题栏不满足需求，建议自定义标题栏。关于标题栏中的标题、头像、背景色、标题栏右侧按钮的显示图片和左侧的头像，详见[设置会话列表页面的标题栏](chatuikit_custom_conversation_list.html#设置标题栏)。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/android/custom_chat_navigation.png" title="设置标题栏" />
</ImageGallery>

### 设置消息列表项

#### 设置消息列表控件功能

```kotlin

//获取 ChatUIKitMessageListLayout 对象：
val chatMessageListLayout:ChatUIKitMessageListLayout? = binding?.layoutChat?.chatMessageListLayout
chatMessageListLayout?.let{
    it.setTimeBackground()      //设置时间线的背景。 
    it.setItemTextSize()        //设置文本消息的字体大小。
    it.setItemTextColor()       //设置文本消息的字体颜色。
    it.setAvatarDefaultSrc()    //设置条目的默认头像。
    it.setAvatarShapeType()     //设置头像的样式，分为默认样式，圆形和矩形三种样式。
}

// UIKitChatFragment#Builder 中也提供了部分消息列表相关配置项
UIKitChatFragment.Builder(conversationID, chatType)
    .showNickname()                     //是否显示昵称：true：是；(默认) false: 否。 
    .setMsgTimeTextColor()              //设置时间线文本的颜色。
    .setMsgTimeTextSize()               //设置时间线文本的字体大小。
    .setReceivedMsgBubbleBackground()   //设置接收消息气泡区域的背景。
    .setSentBubbleBackground()          //设置发送消息气泡区域的背景。     
    .hideReceiverAvatar()               //设置不展示接收方头像，默认展示接收方头像。
    .hideSenderAvatar()                 //设置不展示发送方头像，默认展示发送方头像。
    .setChatBackground()                //设置聊天列表区域的背景。 
    .sendMessageByOriginalImage()       //设置图片消息是否发送原图：true：是；(默认) false: 否。
    .setEmptyLayout()                   //设置聊天列表的空白页面。   
```

#### 自定义消息列表项

自定义消息表中列表项的内容，即各种消息类型的自定义消息布局。

开发者可以继承 `ChatUIKitMessagesAdapter`、`ChatUIKitRowViewHolder` 和 `ChatUIKitRow` 实现自己的 `CustomMessageAdapter`、`CustomChatTypeViewViewHolder` 和 `CustomTypeChatRow`，然后将 `CustomMessageAdapter` 设置到 `UIKitChatFragment#Builder#setCustomAdapter` 中。

1. 创建自定义适配器 `CustomMessageAdapter` 继承自 `ChatUIKitMessagesAdapter`，重写 `getViewHolder` 和 `getItemNotEmptyViewType` 方法。

```kotlin
class CustomMessageAdapter: ChatUIKitMessagesAdapter() {

    override fun getItemNotEmptyViewType(position: Int): Int {
        // 根据消息类型，设置自己的 itemViewType。
        // 如果要使用默认的，返回 super.getItemNotEmptyViewType(position) 即可。
        return CUSTOM_YOUR_MESSAGE_TYPE
    }

    override fun getViewHolder(parent: ViewGroup, viewType: Int): ViewHolder<ChatMessage> {
        // 根据返回的 viewType 返回对应的 ViewHolder。
        // 返回自定义的 ViewHolder 或者使用默认的 super.getViewHolder(parent, viewType)。
        return CUSTOM_VIEW_HOLDER()
    }
}
```

2. 创建 `CustomTypeChatRow` ，继承自 `ChatUIKitRow`。

```kotlin
class CustomTypeChatRow(
    private val context: Context,
    private val attrs: AttributeSet? = null,
    private val defStyle: Int = 0,
    isSender: Boolean = false
): ChatUIKitRow(context, attrs, defStyle, isSender) {

    override fun onInflateView() {
        inflater.inflate(if (!isSender) R.layout.layout_row_received_custom_type
        else R.layout.layout_row_sent_custom_type,
            this)
    }

    override fun onSetUpView() {
        (message?.getMessage()?.body as? ChatTextMessageBody)?.let { txtBody ->
            contentView.text = txtBody.message
        }
    }
}
```

3. 创建 `CustomChatTypeViewViewHolder`，继承自 `ChatUIKitRowViewHolder`。

```kotlin
class CustomChatTypeViewViewHolder(
    itemView: View
): ChatUIKitRowViewHolder(itemView) {

    override fun onBubbleClick(message: ChatMessage?) {
        super.onBubbleClick(message)
        // Add click event
    }
}
```

4. 完善 `CustomMessageAdapter`。

```kotlin
class CustomMessageAdapter: ChatUIKitMessagesAdapter() {

    override fun getItemNotEmptyViewType(position: Int): Int {
        // 根据消息类型设置自己的 itemViewType。
        mData?.get(position)?.getMessage()?.let { msg ->
            msg.getStringAttribute("type", null)?.let { type ->
                if (type == CUSTOM_TYPE) {
                    return if (msg.direct() == ChatMessageDirection.SEND) {
                        VIEW_TYPE_MESSAGE_CUSTOM_VIEW_ME
                    } else {
                        VIEW_TYPE_MESSAGE_CUSTOM_VIEW_OTHER
                    }
                }
            }
        }
        // 如果要使用默认的，返回 super.getItemNotEmptyViewType(position) 即可。
        return super.getItemNotEmptyViewType(position)
    }

    override fun getViewHolder(parent: ViewGroup, viewType: Int): ViewHolder<ChatMessage> {
        // 根据返回的 viewType 返回对应的 ViewHolder。
        if (viewType == VIEW_TYPE_MESSAGE_CUSTOM_VIEW_ME || viewType == VIEW_TYPE_MESSAGE_CUSTOM_VIEW_OTHER) {
            CustomChatTypeViewViewHolder(
                CustomTypeChatRow(parent.context, isSender = viewType == VIEW_TYPE_MESSAGE_CUSTOM_VIEW_ME)
            )
        }
        // 返回自定义的 ViewHolder 或者 使用默认的 super.getViewHolder(parent, viewType)。
        return super.getViewHolder(parent, viewType)
    }

    companion object {
        private const val CUSTOM_TYPE = "custom_type"
        private const val VIEW_TYPE_MESSAGE_CUSTOM_VIEW_ME = 1000
        private const val VIEW_TYPE_MESSAGE_CUSTOM_VIEW_OTHER = 1001
    }
}
```

5. 添加 `CustomMessageAdapter` 到 `UIKitChatFragment#Builder`。

```kotlin
builder.setCustomAdapter(CustomMessageAdapter())
```

### 设置头像和昵称

关于设置头像和昵称，详见[用户自定义信息文档中的介绍](chatuikit_userinfo.html#设置会话头像和昵称)。

#### 设置列表相关事件

`UIKitChatFragment#Builder` 设置消息条目的点击事件监听，包括气泡区域及头像的点击及长按事件。

```kotlin
    builder.setOnMessageItemClickListener(object : OnMessageItemClickListener{
            //聊天气泡点击事件
            override fun onBubbleClick(message: ChatMessage?): Boolean {}
            //聊天气泡长按事件，return true 消费事件，不继续向下传递（即不执行 uikit 中的默认逻辑）
            override fun onBubbleLongClick(v: View?, message: ChatMessage?): Boolean {}
            //重发事件，用于发送消息失败后的重试操作，return true 消费事件 不继续向下传递（即不执行 uikit 中的默认逻辑）
            override fun onResendClick(message: ChatMessage?): Boolean {}
            //头像点击事件
            override fun onUserAvatarClick(userId: String?) {}
            //头像长按事件
            override fun onUserAvatarLongClick(userId: String?) {}
        })   
```

#### 设置消息日期

`ChatUIKitDateFormatConfig` 提供如下配置项：

| 属性                                    | 描述                                                             |
| -------------------------------------- | ---------------------------------------------------------------- |
| chatTodayFormat                       | 消息列表当天日期格式，英文环境默认为："HH:mm"。                            |
| chatOtherDayFormat                    | 消息列表其他日期的格式，英文环境默认为： "MMM dd, HH:mm"。                        |
| chatOtherYearFormat                   | 消息列表其他年份的日期格式，英文环境默认为： "MMM dd, yyyy HH:mm"。                |

```kotlin
    // 日期语言区域切换（跟随手机区域语言设置） 默认值为 false 采用 ENGLISH。 
    // 举例：chatOtherDayFormat = "MMM dd, yyyy"  a.false: Sep 25, 2024  b.true(本地语言中文): 9月 25, 2024
    ChatUIKitClient.getConfig()?.dateFormatConfig?.useDefaultLocale = true  
    // 消息中今天的日期格式
    ChatUIKitClient.getConfig()?.dateFormatConfig?.chatTodayFormat = "HH:mm"
    // 消息中其他日期的日期格式
    ChatUIKitClient.getConfig()?.dateFormatConfig?.chatOtherDayFormat = "MMM dd, yyyy"
    // 消息中其他年份的日期格式
    ChatUIKitClient.getConfig()?.dateFormatConfig?.chatOtherYearFormat = "MMM dd, yyyy HH:mm"
```

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/android/custom_message_date.png" title="设置消息日期" />
</ImageGallery>

#### 设置消息撤回时间

你可以通过 `ChatUIKitClient.getConfig()?.chatConfig?.timePeriodCanRecallMessage` 设置聊天页面消息撤回的有效时间，默认为 120 秒。

#### 设置消息翻译

- `ChatUIKitClient.getConfig()?.chatConfig?.enableTranslationMessage`：是否开启文本消息长按翻译功能，默认为 `false`，即该功能默认关闭。如需开启该特性，需设置为 `true`。
- `ChatUIKitClient.getConfig()?.chatConfig?.targetTranslationLanguage = "zh"`：翻译目标语言，默认为中文。文本消息长按后出现**翻译**菜单，点击**翻译**后，设置翻译的目标语言。使用前，你需在[环信即时通讯云控制台](https://console.shengwang.cn/overview)申请试用翻译功能，然后将 `ChatUIKitClient.getConfig()?.chatConfig?.enableTranslationMessage` 设置为 `true`，才会出现文本消息长按的翻译功能。若后台申请翻译未通过，前端无法成功调用 API 进行翻译。
- `<style name="ease_chat_message_received_translation_content_style">`：消息接收方翻译文本 style 样式 可以自行修改文本任意属性。
- `<style name="ease_chat_message_sent_translation_content_style">`：消息发送方翻译文本 style 样式 可以自行修改文本任意属性。

## 聊天页面其他设置

其他标记为 open 的方法均为可重载方法。如有需要，可重载对应方法实现自己业务逻辑。





