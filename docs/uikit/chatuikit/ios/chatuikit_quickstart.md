# 快速开始

<Toc />

利用单群聊 UIKit，你可以轻松实现单群和群聊。本文介绍如何快速实现在单聊会话中发送第一条消息。

## 前提条件

开始前，确保你的开发环境满足如下条件：

- Xcode：推荐最新版本。
- 安装 iOS 13.0 或以上版本的 iOS 模拟器或 Apple 设备。
- CocoaPods 已经安装并且已跑通了集成。
- 已在[声网控制台](https://console.shengwang.cn/overview)创建了有效的即时通讯 IM 开发者账号，并[获取了 App ID](/document/android/enable_im.html#_3-获取-app-id)。
- 如果你的网络环境部署了防火墙，请联系声网技术支持设置白名单。

## 实现发送第一条单聊消息

### 第一步 创建项目

[在 Xcode 中创建一个 iOS 平台下的 App](https://developer.apple.com/cn/documentation/xcode/creating_an_xcode_project_for_an_app/)。在 **Choose options for your new project** 对话框中进行以下设置：

- **Product Name**：填入 **ShengwangChatUIKitQuickStart**。
- **Organization Identifier**：设置为你的标识符。
- **User Interface**：选择 **Storyboard**。
- **Language**：选择你常用的开发语言。

### 第二步 初始化

你可以在应用加载时或使用 ShengwangChatUIKit 之前对其进行初始化。

初始化时，需传入 App ID。你可以在[声网控制台](https://console.shengwang.cn/overview)展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目，然后点击 **总览**，在**项目信息**区域查看 App ID。

```
import ShengwangChatUIKit
    
@UIApplicationMain
class AppDelegate：UIResponder，UIApplicationDelegate {

     var window：UIWindow?


     func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
         let error = ChatUIKitClient.shared.setup(appId: "Appid")
     }
}
```

### 第三步 登录

使用用户 ID 和用户 token 登录 ShengwangChatUIKit。

:::tip
若你已集成了 IM SDK，SDK 的所有用户 ID 均可用于登录 ShengwangChatUIKit。
:::

在[声网控制台](https://console.shengwang.cn/overview)按照如下步骤创建用户：

1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**运营管理**标签页。

5. 在**用户** 页签下，点击**创建IM用户**。

6. 在弹出的对话框中，配置用户相关参数，点击**确定**。

在用户列表中，在新创建的用户的**操作**一栏中，点击**更多**，选择**查看Token**，查看该用户的 token。在开发环境中，你需要从你的 App Server 获取用户 token，详见[使用 Token 鉴权](/document/server-side/token_authentication.html)。

```
public final class YourAppUser: NSObject, ChatUserProfileProtocol {

            public func toJsonObject() -> Dictionary<String, Any>? {
        ["ease_chat_uikit_user_info":["nickname":self.nickname,"avatarURL":self.avatarURL,"userId":self.id]]
    }
    
    
    public var id: String = ""
        
    public var nickname: String = ""
        
    public var selected: Bool = false
    
    public override func setValue(_ value: Any?, forUndefinedKey key: String) {
        
    }

    public var avatarURL: String = "https://accktvpic.oss-cn-beijing.aliyuncs.com/pic/sample_avatar/sample_avatar_1.png"

}
// 使用当前用户对象符合 `ChatUserProfileProtocol` 协议的用户信息登录 ShengwangChatUIKit。
 ChatUIKitClient.shared.login(user: YourAppUser(), token: ExampleRequiredConfig.chatToken) { error in 
 }
```

### 第四步 创建聊天页面

调用 `init` 方法将在控制台上创建的用户的用户 ID 传入 `conversationId` 参数，向该用户发送消息。

```swift
let vc = ComponentsRegister.shared.MessageViewController.init(conversationId: <#创建用户的id#>, chatType: .chat)
//push 或者 present 均可
 ControllerStack.toDestination(vc: vc)
```

### 第五步 发送第一条消息

在聊天页面下方输入消息，然后点击**发送**按钮发送消息。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/message_first.png" title="发送第一条消息" />
</ImageGallery>

