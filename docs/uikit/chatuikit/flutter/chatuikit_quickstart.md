# 快速开始

<Toc />

利用单群聊 UIKit，你可以轻松实现单群和群聊。Flutter 单群聊 UIKit 支持 iOS 和 Android 平台。

本文介绍如何快速实现在单聊会话中发送消息。

## 前提条件

开始前，请确保你的开发环境满足以下条件：

1. Flutter 版本

```yaml
environment:
  sdk: '>=3.0.0 <4.0.0'
  flutter: ">=3.19.0"
```

2. 你需要添加权限：

- iOS: 在 `<project root>/ios/Runner/Info.plist` 中添加以下权限。

```xml
NSPhotoLibraryUsageDescription
NSCameraUsageDescription
NSMicrophoneUsageDescription
```

- Android: `shengwang_chat_uikit` 已经在 `AndroidManifest.xml` 中添加以下权限, 你不需要再重复添加。

```xml
  <uses-permission android:name="android.permission.CAMERA" />
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```


## 实现发送第一条单聊消息

本节介绍如何通过单群聊 UIKit 实现发送第一条单聊消息。

### 第一步 创建项目

```bash
flutter create chat_uikit_demo --platforms=android,ios
```

### 第二步 添加依赖

进入项目目录，添加最新版 `shengwang_chat_uikit`：

```bash
cd chat_uikit_demo
flutter pub add shengwang_chat_uikit
flutter pub get
```


### 第三步 初始化

初始化 `ChatUIKit`，其中 `appId` 需要替换为你自己的 App ID。

```dart

// 导入头文件
import 'package:shengwang_chat_uikit/chat_uikit.dart';
...

void main() {
  ChatUIKit.instance
      .init(options: Options.withAppId(autoLogin: false))
      .then((value) {
    runApp(const MyApp());
  });
}

```

### 第四步 登录

`ChatUIKit` 支持通过用户 ID 和 token 登录单群聊 UIKit。

:::tip
若你已集成了 IM SDK，SDK 的所有用户 ID 均可用于登录单群聊 UIKit。
:::

在[声网控制台](https://console.shengwang.cn/overview)按照如下步骤创建用户：

1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**运营管理**标签页。

5. 在**用户** 页签下，点击**创建IM用户**。

6. 在弹出的对话框中，配置用户相关参数，点击**确定**。

在用户列表中，在新创建的用户的**操作**一栏中，点击**更多**，选择**查看Token**，查看该用户的 token。在开发环境中，你需要从你的 App Server 获取用户 token，详见[使用 Token 鉴权](/document/server-side/token_authentication.html)。

```dart
ChatUIKit.instance.loginWithToken(userId: userId, token: token);
```

### 第五步 添加聊天页面

登录后显示聊天页面。

`ChatUIKit` 提供了 `MessagesView`，用于登录成功后显示聊天页面。

```dart
  @override
  Widget build(BuildContext context) {
    /// userId：接收方的用户 ID
    return MessagesView(profile: ChatUIKitProfile.contact(id: userId));
  }
```

### 第六步 发送第一条消息

在聊天页面下方输入消息，然后点击**发送**按钮发送消息。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/message_first.png" title="发送第一条消息" />
</ImageGallery>

## 参考

快速开始整个流程的完整代码如下：

```dart
import 'package:shengwang_chat_uikit/chat_uikit.dart';
import 'package:flutter/material.dart';

const appId = '';
const currentUserId = '';
const currentUserPwd = '';
const chatterId = '';
void main() {
  ChatUIKit.instance
      .init(options: Options.withAppId(appId, autoLogin: false))
      .then((value) {
    runApp(const MyApp());
  });
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
      onGenerateRoute: (settings) {
        return null;
      },
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            TextButton(
              onPressed: () {
                if (ChatUIKit.instance.isLogged()) {
                  ChatUIKit.instance.logout().then((value) => setState(() {}));
                } else {
                  ChatUIKit.instance
                      .loginWithPassword(
                          userId: currentUserId, password: currentUserPwd)
                      .then((value) => setState(() {}));
                }
              },
              child: ChatUIKit.instance.isLogged()
                  ? const Text('Logout')
                  : const Text('Login'),
            ),
            if (ChatUIKit.instance.isLogged())
              const Expanded(child: ChatPage()),
          ],
        ),
      ),
    );
  }
}

class ChatPage extends StatefulWidget {
  const ChatPage({super.key});

  @override
  State<ChatPage> createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  @override
  Widget build(BuildContext context) {
    return MessagesView(profile: ChatUIKitProfile.contact(id: chatterId));
  }
}
```