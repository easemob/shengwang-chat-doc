# 聊天消息

单群聊 UIKit 的聊天页面提供如下功能：

- 发送和接收消息, 包括文本、表情、图片、语音、视频、文件和名片消息。
- 对消息进行复制、引用、撤回、删除、编辑、重新发送和审核。
- 从服务器拉取漫游消息。
- 清除本地消息。

消息相关功能，详见[功能介绍文档](chatfeature_message.html)。

你可以配置聊天页面的导航栏、消息列表项、输入框和跳转事件等。详见 [MessageListController.swift](https://github.com/AgoraIO-Usecase/ShengwangChat-ios/blob/main/Sources/EaseChatUIKit/Classes/UI/Components/Chat/Controllers/MessageListController.swift)。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/custom_chat.png" title="聊天页面" />
</ImageGallery>

## 自定义导航栏

聊天页面、会话列表页面、联系人列表页面、群详情页面和联系人详情页面的导航栏均使用 `EaseChatNavigationBar`。如果聊天页面（`MessageListController.swift`）的导航栏不满足需求，建议自定义导航栏，重载方法传入自定义的导航类。关于导航栏中的标题、头像、背景色、导航栏右侧按钮的显示图片和左侧的头像，详见[自定义会话列表页面的导航栏](chatuikit_custom_conversation_list.html#自定义导航栏)。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/custom_chat_navigation.png" title="导航栏配置" />
</ImageGallery>

## 自定义消息列表项

要自定义消息表中列表项的内容，即各种消息类型的 Cell，你需要执行以下步骤：

1. 继承 `ShengwangChatUIKit` 中对应的消息 Cell 类，注册新的自定义类。

2. 重载对应的方法。
   
每个对应的消息类型 Cell 中都有初始化方法、气泡中内容 `createContent` 和 `refresh` 方法可重载，以及其他各种小模块的 UI 创建重载方法等。 

如果需要复用已有逻辑再增加新逻辑，则只需重载对应方法后调用 `super.xxx`，例如：

```swift
    override open func refresh(entity: MessageEntity) {
       super.refresh(entity:entity)
       //继续你的新逻辑
    }
```

如果需要修改之前的逻辑，则需复制之前的 `refresh ` 方法中的代码进行修改，无需调用 `super.xxxx`。

| 消息 Cell 类     | 描述      | 注册重载对应属性 |
| --------------------- | ------------------ | ------------------------------------------------------------ |
| `TextMessageCell `    | 文本消息       | `ComponentsRegister.shared.ChatTextMessageCell = YourTextMessageCell.self` |
| `ImageMessageCell`    | 图片消息       | `ComponentsRegister.shared.ChatImageMessageCell = YourImageMessageCell.self` |
| `AudioMessageCell`    | 音频消息       | `ComponentsRegister.shared.ChatAudioMessageCell = YourAudioMessageCell.self` |
| `VideoMessageCell`    | 视频消息       | `ComponentsRegister.shared.ChatVideoMessageCell = YourVideoMessageCell.self` |
| `FileMessageCell`     | 文件消息       | `ComponentsRegister.shared.ChatFileMessageCell = YourFileMessageCell.self` |
| `ContactCardCell`     | 联系人卡片消息 | `ComponentsRegister.shared.ChatContactMessageCell = YourContactCardCell.self` |
| `LocationMessageCell` | 位置消息       | `ComponentsRegister.shared.ChatLocationCell = YourLocationMessageCell.self` |
| `CombineMessageCell`  | 合并转发消息   | `ComponentsRegister.shared.ChatCombineCell = YourCombineMessageCell.self` |
| `AlertMessageCell`    | 提示消息       | `ComponentsRegister.shared.ChatAlertCell = YourAlertMessageCell.self` |
| `CustomMessageCell`   | 自定义消息     | `ComponentsRegister.shared.ChatCustomMessageCell = YourCustomMessageCell.self` |

### 设置消息气泡的样式

你可以通过 `Appearance.chat.bubbleStyle = withArrow` 设置聊天页面消息气泡的样式，分为带箭头与多圆角两种。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/bubble_square.png" title="带箭头的方角气泡" />
  <ImageItem src="/images/uikit/chatuikit/ios/bubble_circle.png" title="圆角气泡" />
</ImageGallery>

### 设置消息气泡中的内容

你可以通过 `Appearance.chat.contentStyle = [.withReply,.withAvatar,.withNickName,.withDateAndTime]` 设置聊天页面消息中显示内容的可配项数组，默认展示回复消息气泡，消息发送方头像，消息发送方昵称，消息的日期时间。

你可以将不需要的功能移除，也还可添加表情回应（`MessageReaction`）和话题（`MessageThread`）。

:::tip
添加话题功能前，需在[声网控制台](https://console.shengwang.cn/overview)的**即时通讯 IM** > **功能配置** > **消息功能**页签开通。
:::

```swift
        //是否显示消息话题。
        if self.messageThread {
            Appearance.chat.contentStyle.append(.withMessageThread)
        }
        //是否显示表情回应
        if self.messageReaction {
            Appearance.chat.contentStyle.append(.withMessageReaction)
        }
```

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/bubble_hiddenable.png" title="可隐藏区域" />
  <ImageItem src="/images/uikit/chatuikit/ios/bubble_hidden.png" title="隐藏后的效果" />
</ImageGallery>

### 设置消息文字颜色

你可以通过 `Appearance.chat.receiveTextColor = value`/`Appearance.chat.sendTextColor = value` 设置聊天页面接收方/发送方的消息文字颜色。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/font_color.png" title="设置消息文字颜色" />
</ImageGallery>

### 设置消息日期

- `Appearance.chat.dateFormatToday = "HH:mm"`：设置聊天页面消息的当日格式
- `Appearance.chat.dateFormatOtherDay = "MM-dd HH:mm"` 设置聊天页面消息的当日之外的日期格式。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/custom_message_date.png" title="设置消息日期" />
</ImageGallery>

### 设置附件消息

### 设置发送附件消息弹窗样式

1. 若实现发送附件消息时弹出类似微信样式的弹窗，可进行如下设置：

```swift 
    Appearance.chat.messageAttachmentMenuStyle = .followInput
```

2. 若实现消息长按后弹出仿系统 `UIActionSheet` 样式的弹窗，可进行如下设置：

```swift 
    Appearance.chat.messageAttachmentMenuStyle = .actionSheet
```

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/message_types_1.png" title="UIActionSheet" />
  <ImageItem src="/images/uikit/chatuikit/ios/message_types_2.png" title="类似微信样式" />
</ImageGallery>

#### 设置附件消息相关的配置项

- 设置语音消息录制的最大时长

你可以通过 `Appearance.chat.audioDuration = value` 设置聊天页面语音消息录制的最大时长，默认为 60 秒。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/audio_duration.png" title="设置语音消息录制的最大时长" />
</ImageGallery>

- 设置语音消息播放时的动画

1. `Appearance.chat.receiveAudioAnimationImages = value`：设置聊天页面接收方语音消息播放时的动画图片。
2. `Appearance.chat.sendAudioAnimationImages = value`：设置聊天页面发送方语音消息播放时的动画图片。
   
<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/audio_animation.png" title="语音播放动画" />
</ImageGallery>

- 设置图片消息圆角

你可以通过 `Appearance.chat.imageMessageCorner = value` 设置聊天页面图片消息圆角，默认为 4。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/image_radius_small.png" title="小的图片圆角" />
  <ImageItem src="/images/uikit/chatuikit/ios/image_radius_large.png" title="大的图片圆角" />
</ImageGallery>

- 设置图片/视频消息占位图

  - `Appearance.chat.imagePlaceHolder = value`：聊天页面图片消息占位图。

  - `Appearance.chat.videoPlaceHolder = value`：聊天页面视频消息占位图。
  
### 设置消息撤回时间

你可以通过 `Appearance.chat.recallExpiredTime = value` 设置聊天页面消息撤回的有效时间，默认为 120 秒。

### 设置收到新消息时播放音频文件的路径

你可以通过 `Appearance.chat.newMessageSoundPath = value` 设置聊天页面收到新消息时的播放音频文件的路径。

### 设置消息翻译

- `Appearance.chat.enableTranslation = value`：是否开启文本消息长按翻译功能，默认为 `false`，即该功能默认关闭。如需开启该特性，需设置为 `true`。
- `Appearance.chat.targetLanguage= .Chinese` 翻译目标语言，默认为中文。文本消息长按后出现**翻译**菜单，点击**翻译**后，设置翻译的目标语言。使用前，你需在[声网控制台](https://console.shengwang.cn/overview)申请试用翻译功能，然后将 `Appearance.chat.enableTranslation` 设置为 `true`，才会出现文本消息长按的翻译功能。若后台申请翻译未通过，前端无法成功调用 API 进行翻译。
- `Appearance.chat.receiveTranslationColor = value`：消息接收方翻译文本颜色。
- `Appearance.chat.sendTranslationColor = value`：消息发送方翻译文本颜色。

### 设置消息长按后显示的操作

你可以通过 `Appearance.chat.messageLongPressedActions = value` 设置聊天页面长按消息后的 `ActionSheet` 菜单项。你可以继承 `MessageListController`，重载页面中的方法，移除或添加长按消息后的动作（action）。

```swift
override func filterMessageActions(message: MessageEntity) -> [ActionSheetItemProtocol] {
        if let ext = message.message.ext,let value = ext[callIdentifier] as? String,value == callValue {
            return [
                ActionSheetItem(title: "barrage_long_press_menu_delete".chat.localize, type: .normal,tag: "Delete",image: UIImage(named: "message_action_delete", in: .chatBundle, with: nil)),
                ActionSheetItem(title: "barrage_long_press_menu_multi_select".chat.localize, type: .normal,tag: "MultiSelect",image: UIImage(named: "message_action_multi_select", in: .chatBundle, with: nil)),
                ActionSheetItem(title: "barrage_long_press_menu_forward".chat.localize, type: .normal,tag: "Forward",image: UIImage(named: "message_action_forward", in: .chatBundle, with: nil))
            ]
        } else {
            return super.filterMessageActions(message: message)
        }
    }
```

获取某个 action 的点击事件，示例代码:

```swift
        Appearance.chat.messageLongPressedActions.first { $0.tag == "xxx" }?.action = { [weak self ] in 
           //action handler
        }
```

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/message_longpress_1.png" />
</ImageGallery>

1. 若实现消息长按后弹出类似微信样式的弹窗，可进行如下设置：

```swift 
    Appearance.chat.messageLongPressMenuStyle = .withArrow
```

2. 若实现消息长按后弹出仿系统 `UIActionSheet` 样式的弹窗，可进行如下设置：

```swift 
    Appearance.chat.messageLongPressMenuStyle = .actionSheet
```

效果图如下所示：

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/message_longpress_1.png" title="UIActionSheet" />
  <ImageItem src="/images/uikit/chatuikit/ios/message_longpress_2.png" title="类似微信样式" />
</ImageGallery>

## 设置聊天页面输入框

- `Appearance.chat.maxInputHeight = value`：聊天页面输入框最大输入高度。

- `Appearance.chat.inputPlaceHolder = value`：聊天页面输入框默认占位符。

- `Appearance.chat.inputBarCorner = value`：聊天页面输入框圆角。

- `Appearance.chat.inputExtendActions = value`：聊天页面输入框右侧 `+` 点击后 `ActionSheet` 菜单项。
    
获取某个 action 的点击事件，示例代码:

```swift
        Appearance.chat.inputExtendActions.first { $0.tag == "xxx" }?.action = { [weak self ] in 
           //action handler
        }
```

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/custom_chat_input_bar.png" title="聊天页面输入框配置" />
</ImageGallery>

## 设置消息举报功能

你可以通过 `Appearance.chat.reportSelectionTags` 和 `Appearance.chat.reportSelectionReasons` 设置消息举报功能的举报标签数组以及对应的原因数组，key-value 格式，二者一 一对应。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/message_report.png" title="消息举报" />
</ImageGallery>

## 设置跳转事件

对于自定义跳转事件，可以查看聊天页面中的标记为 open 的可重载方法，进行对应的重载，即可跳转自己的业务页面。下表为重载常用的 API：
  
| 方法                 | 描述            | 是否可重载 |
| ---------------------- | -------------------------------- | ---------- |
| `messageBubbleClicked` | 消息气泡点击。         | 是 |
| `messageAvatarClick`   | 消息头像点击。        | 是         |
| `audioDialog`          | 输入框音频按钮点击事件。           | 是    |
| `attachmentDialog`     | 输入框发送附件消息点击事件。       | 是         |

## 拦截原有组件点击事件

拦截后的业务逻辑与 UI 刷新逻辑，你需要自己完全实现，建议使用注册继承即可更快速的实现需求。

消息列表事件如下所示：

- `replyClicked`：消息中引用消息气泡点击。

- `bubbleClicked`：消息气泡点击。

- `bubbleLongPressed`：消息气泡长按。

- `avatarClicked`：头像点击。

- `avatarLongPressed`：头像长按。

## 聊天页面其他设置

1. 其他标记为 open 的方法均为可重载方法。如有需要，可重载对应方法实现自己业务逻辑。

2. 关于聊天页面的其他配置，包括按钮、输入框等空间的色调以及弹窗的设置，详见[通用可配项文档](chatuikit_config_item.html)。
