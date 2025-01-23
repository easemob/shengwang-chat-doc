# 集成单群聊 UIKit

<Toc />

使用单群聊 UIKit 之前，你需要将其集成到你的应用中。

## 前提条件

- Android Studio 4.0 及以上
- Gradle 4.10.x 及以上
- targetVersion 26 及以上
- Android SDK API 21 及以上
- JDK 11 及以上

## 集成单群聊 UIKit

### 本地依赖
从 GitHub 获取[单群聊 UIKit](https://github.com/Shengwang-Community/ShengwangChat-UIKit-android) 源码，按照下面的方式集成：

1. 在根目录 `settings.gradle.kts` 文件中添加如下代码：

```kotlin
include(":chat-uikit")
project(":chat-uikit").projectDir = File("../ShengwangChat-UIKit-android/ease-im-kit")
```

2. 在 app 的 `build.gradle.kts` 文件中添加如下代码：

```kotlin
//chatuikit-android
implementation(project(mapOf("path" to ":chat-uikit")))
```

### 防止代码混淆

在 `app/proguard-rules.pro` 文件中添加如下行，防止代码混淆：

```kotlin
-keep class io.agora.** {*;}
-dontwarn  io.agora.**
```

## 初始化

在使用 UIKit 的控件前，必须要先初始化。例如在 `Application` 中：

```kotlin
class DemoApplication: Application() {
    
    override fun onCreate() {
        val options = ChatOptions()
        options.appId = "你的appId"
        ChatUIKitClient.init(this, options)
    }
}
```

## 快速搭建页面

### 创建聊天页面

- 使用 `UIKitChatActivity`

单群聊 UIKit 提供 `UIKitChatActivity` 页面，调用 `UIKitChatActivity#actionStart` 方法即可，示例代码如下：

```kotlin
// conversationId: 单聊会话为对端用户 ID，群聊会话为群组 ID。
// chatType：单聊为 ChatUIKitType#SINGLE_CHAT，群聊为 ChatUIKitType#GROUP_CHAT。
UIKitChatActivity.actionStart(mContext, conversationId, chatType)
```
`UIKitChatActivity` 页面主要进行权限的请求，比如相机权限，语音权限等。

- 使用 `UIKitChatFragment`

开发者也可以使用单群聊 UIKit 提供的 `UIKitChatFragment` 创建聊天页面，示例代码如下：

```kotlin
class ChatActivity: AppCompactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_chat)
        // conversationID: 1v1 is peer's userID, group chat is groupID
        // chatType can be ChatUIKitType#SINGLE_CHAT, ChatUIKitType#GROUP_CHAT
        UIKitChatFragment.Builder(conversationId, chatType)
                        .build()?.let { fragment ->
                            supportFragmentManager.beginTransaction()
                                .replace(R.id.fl_fragment, fragment).commit()
                        }
    }
}
```

### 创建会话列表页面

单群聊 UIKit 提供 `ChatUIKitConversationListFragment`，添加到 Activity 中即可使用。

示例如下：

```kotlin
class ConversationListActivity: AppCompactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_conversation_list)

        ChatUIKitConversationListFragment.Builder()
                        .build()?.let { fragment ->
                            supportFragmentManager.beginTransaction()
                                .replace(R.id.fl_fragment, fragment).commit()
                        }
    }
}
```

### 创建联系人列表页面

单群聊 UIKit 提供 `ChatUIKitContactsListFragment`，添加到 Activity 中即可使用。

示例如下：

```kotlin
class ContactListActivity: AppCompactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_contact_list)

        ChatUIKitContactsListFragment.Builder()
                        .build()?.let { fragment ->
                            supportFragmentManager.beginTransaction()
                                .replace(R.id.fl_fragment, fragment).commit()
                        }
    }
}
```

