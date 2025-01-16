# 快速开始

<Toc />

本文介绍如何快速集成即时通讯 IM Android SDK 实现单聊。

## 实现原理

下图展示在客户端发送和接收一对一文本消息的工作流程。

![img](/images/android/sendandreceivemsg.png)

## 前提条件

- Android Studio 3.6 或以上版本；
- Android SDK API 等级 21 或以上；
- Android 5.0 或以上版本的设备；
- 有效的即时通讯 IM 开发者账号和 App ID，见 [声网控制台](https://console.shengwang.cn/overview)。

## 准备开发环境

本节介绍如何创建项目，将即时通讯 IM Android SDK 集成到你的项目中，并添加相应的设备权限。

### 1. 创建 Android 项目

参考以下步骤创建一个 Android 项目。

1. 打开 Android Studio，点击 **New Project**。
2. 在 **New Project** 界面，选择 **Empty Views Activity **，然后点击 **Next**。
3. 在 **Empty Views Activity** 界面，依次填入以下内容：
   - **Name**：你的 Android 项目名称，如 HelloWorld。
   - **Package name**：你的项目包的名称，如 io.agora.helloworld。
   - **Save location**：项目的存储路径。
   - **Language**：项目的编程语言，如 Java。
   - **Minimum API level**：项目的最低 API 等级,如API 21。

然后点击 **Finish**。根据屏幕提示，安装所需插件。

上述步骤使用 **Android Studio Ladybug | 2024.2.1 Patch 3** 示例。你也可以直接参考 Android Studio 官网文档 [创建项目](https://developer.android.com/studio/projects/create-project)。

### 2. 集成 SDK

你可以使用 mavenCentral 自动集成。

1. 在项目的 `settings.gradle` 中添加 `mavenCentral()` 仓库。

```gradle
pluginManagement {
    repositories {
        ……
        mavenCentral()
        ……
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        ……
        mavenCentral()
    }
}
```

2. 在 `module` 的 `build.gradle` 中添加如下依赖：

```gradle
...
dependencies {
    ...
    // x.y.z 请填写具体版本号，如：1.3.2。
    implementation("cn.shengwang:chat-sdk:x.y.z")
}
```

// TODO：修改版本号及repo地址链接
若要查看最新版本号，请点击[这里](releasenote.html)。

除此之外，你还可以通过手动复制 SDK 文件和动态加载 `.so` 库文件的方法集成 IM SDK，详见[集成文档](integration.html)。

### 3. 添加项目权限

根据场景需要，在 `/app/src/main/AndroidManifest.xml` 文件中添加如下行，获取相应的设备权限：

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="https://schemas.android.com/apk/res/android"
    package="Your Package"
    android:versionCode="100"
    android:versionName="1.0.0">

    <!-- IM SDK required start -->
    <!-- 允许程序振动，用于本地通知设置振动 -->
    <uses-permission android:name="android.permission.VIBRATE" />
    <!-- 访问网络权限 -->
    <uses-permission android:name="android.permission.INTERNET" />
    <!-- 麦克风权限，用于语音消息时录制语音，不使用录制语音可以移除 -->
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <!-- 相机权限，用于图片消息时拍摄图片，不使用拍照可以移除 -->
    <uses-permission android:name="android.permission.CAMERA" />
    <!-- 获取运营商信息，用于获取网络状态 -->
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    <!-- 获取读存储权限，用于附件等的获取 -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <!-- 访问 GPS 定位，用于定位消息，如果不用定位相关可以移除 -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
    <!-- 允许程序在手机屏幕关闭后后台进程仍然运行 -->
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <!-- 申请闹钟定时权限，SDK 心跳中使用，3.9.8及以后版本可以不添加 -->
    <uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
    <!-- IM SDK required end -->

</manifest>
```

关于 App ID，在 [声网控制台](https://console.shengwang.cn/overview) 创建项目后，可[获取 App ID](enable_im.html#_3-获取-app-id)，并进行相关特性配置。

### 4. 防止代码混淆

在 `app/proguard-rules.pro` 文件中添加如下行，防止混淆 SDK 的代码：

```java
-keep class io.agora.** {*;}
-dontwarn  io.agora.**
```

### 5. 其他集成问题

当同时集成即时通讯 IM SDK 1.3.2 和声网 RTM SDK 2.2.0 或 RTC SDK 4.3.0 及以上版本时，由于同时包含 `libaosl.so` 库，编译时可能会出现以下错误：

```java
com.android.builder.merge.DuplicateRelativeFileException: More than one file was found with OS independent path 'lib/x86/libaosl.so'
```

可在 app 的 `build.gradle` 文件的 Android 节点中添加 `packagingOptions` 节点，指定在构建过程中优先选择第一个匹配的文件：

```gradle
android {
  // ...
  packagingOptions {
    pickFirst 'lib/x86/libaosl.so'
    pickFirst 'lib/x86_64/libaosl.so'
    pickFirst 'lib/armeabi-v7a/libaosl.so'
    pickFirst 'lib/arm64-v8a/libaosl.so'
  }
}
```

然后 Gradle 文件同步，重新构建项目。

如欲了解详情，请点击[这里](https://doc.shengwang.cn/faq/integration-issues/rtm2-rtc-integration-issue)。

## 实现单聊

本节介绍如何实现单聊。

### 1. SDK 初始化

在**主进程**中进行初始化：

```java
ChatOptions options = new ChatOptions();
options.setAppId("Your appId");
......// 其他 ChatOptions 配置。
ChatClient.getInstance().init(context, options);
```

### 2. 注册即时通讯 IM 用户

#### 创建用户

在[声网控制台](https://console.shengwang.cn/overview)按照如下步骤创建用户：

1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**运营管理**标签页。

5. 在**用户** 页签下，点击**创建IM用户**。

6. 在弹出的对话框中，配置用户相关参数，点击**确定**。

![img](/images/android/user_create.png)

#### 获取用户 token

创建用户后，在用户列表点击对应的用户的**操作**一栏中的**更多**，选择**查看Token**。

在弹出的对话框中，可以查看用户 Token，也可以点击**重新生成**，生成用户 token。

![img](/images/android/user_create.png)

### 3. 登录账号

使用如下代码实现用户登录：

```java
ChatClient.getInstance().loginWithToken(mAccount, mToken, new CallBack() {
   // 登录成功回调
   @Override
   public void onSuccess() {

   }

   // 登录失败回调，包含错误信息
   @Override
   public void onError(int code, String error) {

   }
});
```

:::tip
1. 除了注册监听器，其他的 SDK 操作均需在登录之后进行。
2. 登录成功后需要调用 `ChatClient.getInstance().chatManager().loadAllConversations();` 和 `ChatClient.getInstance().groupManager().loadAllGroups();`，确保进入主页面后本地会话和群组均加载完毕。
3. 如果之前登录过，App 长期在后台运行后切换到前台运行可能会导致加载到内存的群组和会话为空。为了避免这种情况，可在主页面的 `onCreate` 里也添加这两种方法，不过，最好将这两种方法放在程序的开屏页。
:::

### 4. 发送一条单聊消息

```java
// `content` 为要发送的文本内容，`toChatUsername` 为对方的账号。
ChatMessage message = ChatMessage.createTextSendMessage(content, toChatUsername);
// 发送消息
ChatClient.getInstance().chatManager().sendMessage(message);
```
