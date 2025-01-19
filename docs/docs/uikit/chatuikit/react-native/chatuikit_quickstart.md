# 快速开始

<Toc />

利用单群聊 UIKit，你可以轻松实现单群和群聊。本文介绍如何快速实现在单聊会话中发送消息。

## 前提条件

开始前，确保你的开发环境满足如下条件：

- MacOS 12 或以上版本；
- React Native 0.71 或以上版本；
- NodeJs 16.18 或以上版本；
- 对于 `iOS` 平台，需要 `Xcode` 工具，版本建议 14 或以上；
- 对于 `Android` 平台，需要 `Android studio` 工具，版本建议 2022 或以上。

## 实现发送单聊消息

### 第一步 创建项目

运行以下命令，创建项目。

```bash
npx react-native --version 0.73.2 init ProjectName
```

**可能提示安装 `react-native` 最新版本。**

创建完成，默认会初始化项目，安装依赖到 `node_modules`，以及生成 `package-lock.json`文件。如果使用 `yarn` 初始化，将生成 `yarn.lock` 文件。

### 第二步 添加依赖项

单群聊 UIKit SDK 需要额外的依赖。在 `package.json` 文件中添加依赖。

```bash
yarn add @react-native-async-storage/async-storage \
@react-native-camera-roll/camera-roll \
@react-native-clipboard/clipboard \
date-fns \
pinyin-pro \
pure-uuid \
react \
react-native \
react-native-agora \
react-native-shengwang-chat-uikit \
react-native-shengwang-chat \
react-native-audio-recorder-player \
@easemob/react-native-create-thumbnail \
react-native-device-info \
react-native-document-picker \
react-native-fast-image \
react-native-file-access \
react-native-gesture-handler \
react-native-get-random-values \
react-native-image-picker \
react-native-permissions \
react-native-safe-area-context \
react-native-screens \
react-native-video \
react-native-web \
react-native-webview \
twemoji
```

#### iOS 平台

更新 iOS 文件夹下 `ProjectName/Info.plist` 文件内容：

在 dict 节点下，追加下面的权限。示例如下：

```xml
<dict>
  <!-- 追加部分开始 -->
        <key>NSCameraUsageDescription</key>
        <string></string>
        <key>NSMicrophoneUsageDescription</key>
        <string></string>
        <key>NSPhotoLibraryUsageDescription</key>
        <string></string>
  <!-- 追加部分结束 -->
</dict>
```

#### Android 平台

更新 `AndroidManifest.xml` 文件：

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
</manifest>
```

### 第三步 添加代码

添加的主要代码包括登录、登出、发送消息。

```tsx
import * as React from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import {
  Container,
  ConversationDetail,
  TextInput,
  useChatContext,
} from "react-native-shengwang-chat-uikit";

const appId = "<your app ID>";
const userId = "<your user ID>";
const userPs = "1";
const peerId = "du005";

function SendMessage() {
  const [page, setPage] = React.useState(0);
  const [appId, setAppId] = React.useState(appId);
  const [id, setId] = React.useState(userId);
  const [ps, setPs] = React.useState(userPs);
  const [peer, setPeer] = React.useState(peerId);
  const im = useChatContext();

  if (page === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TextInput
          placeholder="Please App ID."
          value={appId}
          onChangeText={setAppId}
        />
        <TextInput
          placeholder="Please Login ID."
          value={id}
          onChangeText={setId}
        />
        <TextInput
          placeholder="Please Login token or password."
          value={ps}
          onChangeText={setPs}
        />
        <TextInput
          placeholder="Please peer ID."
          value={peer}
          onChangeText={setPeer}
        />
        <Pressable
          onPress={() => {
            console.log("test:zuoyu:login", id, ps);
            im.login({
              userId: id,
              userToken: ps,
              usePassword: false,
              result: (res) => {
                console.log("login result", res);
                console.log("test:zuoyu:error", res);
                if (res.isOk === true) {
                  setPage(1);
                }
              },
            });
          }}
        >
          <Text>{"Login"}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            im.logout({
              result: () => {},
            });
          }}
        >
          <Text>{"Logout"}</Text>
        </Pressable>
      </SafeAreaView>
    );
  } else if (page === 1) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ConversationDetail
          convId={peer}
          convType={0}
          onBack={() => {
            setPage(0);
            im.logout({
              result: () => {},
            });
          }}
          type={"chat"}
        />
      </SafeAreaView>
    );
  } else {
    return <View />;
  }
}

function App(): React.JSX.Element {
  return (
    <Container options={{ appId: appId, autoLogin: false }}>
      <SendMessage />
    </Container>
  );
}

export default App;
```

### 第四步 编译和运行

- 对于 `iOS` 平台，运行 `yarn run ios`；
- 对于 `Android` 平台，运行 `yarn run android`。

### 第五步 发送第一条消息

点击登录按钮，进入聊天页面，输入文本内容，点击发送。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/ios/message_first.png" title="发送第一条消息" />
</ImageGallery>

## 示例项目地址

[仓库地址](https://github.com/Shengwang-Community/ShengwangChat-UIKit-rn)
