# 即时通讯 IM 快速开始

<Toc />

本文介绍如何快速集成即时通讯 IM Windows SDK 实现发送和接收单聊文本消息。

## 技术原理

下图展示在客户端发送和接收单聊文本消息的工作流程。

![img](/images/android/sendandreceivemsg.png)

如上图所示，发送和接收单聊消息的步骤如下：

1. 客户端向你的应用服务器请求 Token，你的应用服务器返回 Token。
2. 客户端 A 和客户端 B 使用获得的 Token 登录即时通讯系统。
3. 客户端 A 发送消息到声网服务器。
4. 声网服务器将消息发送到客户端 B，客户端 B 接收消息。

## 前提条件

开始前，请确保你的开发环境满足以下条件：

- Windows SDK 1.0.5 或以上；
- Visual Studio IDE 2019 或以上；
- .Net Framework 4.5.2 或以上；
- 目前 Windows SDK 仅支持 64 位运行模式；
- 有效的即时通讯 IM 开发者账号和 App ID，详见 [开通即时通讯服务](enable_im.html)。
- 如果你的网络环境部署了防火墙，请联系声网技术支持设置白名单。

## 项目设置

实现发送和接收单聊文本消息之前，参考以下步骤设置你的项目。

### 1. 下载并设置 Windows Demo 项目

参考以下步骤：

1. 克隆 [chat_windows_demo](https://github.com/Shengwang-Lab/Shengwang-Chat-API-Examples) 至本地；
2. 在 Windows 浏览器中跳转到第一步克隆仓库的本地目录下，并进入Chat-Windows目录；
3. 双击打开 `windows-example.sln` 打开 Visual Studio 开发工具；
4. 在 Visual Studio 上部的下拉菜单中，选择解决方案配置为: `Debug`；解决方案平台为: x64;

### 2. 集成即时通讯 SDK

你可以参考以下步骤集成 SDK：

1. 下载：点击 [Windows SDK](https://im.shengwang.cn/) 进行下载，下载的 `NuGet` 包一般存放在 `C:\Users\XXX\Downloads` (`XXX` 为本机用户名)；
2. 将下载的 `NuGet` 包拷贝到自己的工作目录，比如 `D:\workspace\WinSDK` 下，以下说明以此目录举例；
3. 在 Visual Studio 开发环境里，右键点击 `windows-example` 项目，选择 **管理 NuGet 程序包 (N)...**；
4. 在弹出的 `NuGet:windows-example` tab 页面里，点击右上角的小齿轮会弹出 NuGet 程序包源的设置窗体，点击窗体右上角的 **+** 按钮，在 **包源** 的文本框内会出现 **Package source** 这一栏，点击选中，并修改文本框下的 **名称** 和 **源**。例如 **名称** 可以设置为 `Local Package source`，**源** 则设置为第 2 步中的目录， `D:\workspace\WinSDK`，点击确定；
5. 在 `NuGet:windows-example` tab 页面，在右上角的 “程序包源” 处点击下拉菜单，选中刚刚配置的包源名称 `Local Package source`；
6. 在 `NuGet:windows-example` tab 页面上部，选中 **浏览**，在下面搜索框的右边，勾选 **包括预发行版**，此时下面的区域会出现 `shengwang_chat_sdk` (如果没有出现，点击搜索框右侧的刷新按)，选中这一栏，右边会出现一个向下的小箭头，点击进行安装，或者点击右侧栏最右边的 **安装** 按钮；
7. 在弹出的 **预览更改** 窗体中，点击确定按钮；
8. 到此 Windows SDK 的 `NuGet` 包集成完毕。

## 实现发送和接收单聊消息

本节介绍如何使用即时通讯 SDK 在你的 `Windows .Net` 项目中实现发送和接收单聊消息。

### 1. 打开代码文件开始编辑

在 Visual Studio 的 `windows-example` 项目下，点击 `MainWindow.xaml` 左边的小三角，然后双击 `MainWindow.xaml.cs` 文件开始编辑。


### 2. 添加命名空间

在 `MainWindow.xaml.cs` 头部添加以下命名空间：

```csharp
using AgoraChat;
using AgoraChat.MessageBody;
```

### 3. 初始化 SDK

在 `InitSDK` 函数中添加以下代码完成 SDK 初始化：

```csharp
var options = Options.InitOptionsWithAppId("YourAppId"); //将该参数设置为你的 App Id
options.UsingHttpsOnly = true;
SDKClient.Instance.InitWithOptions(options);
```

### 4. 注册即时通讯 IM 用户

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

![img](/images/android/user_token.png)

### 5. 登录账号

在 `SignIn_Click` 函数尾部添加以下代码，用于使用账号登录即时通讯系统，示例代码如下：

```csharp
// PasswordTextBox中的内容需输入token
SDKClient.Instance.LoginWithToken(UserIdTextBox.Text, PasswordTextBox.Text, callback: new CallBack(
    onSuccess: () =>
    {
         AddLogToLogText("sign in sdk succeed");
    },

    onError: (code, desc) =>
    {
        AddLogToLogText($"sign in sdk failed, code: {code}, desc: {desc}");
    }
));
```

### 6. 登出账号

在 `SignOut_Click` 函数尾部添加以下代码，用于登出即时通讯系统，示例代码如下：

```csharp
SDKClient.Instance.Logout(true, callback: new CallBack(
    onSuccess: () =>
    {
        AddLogToLogText("sign out sdk succeed");
    },
    onError: (code, desc) =>
    {
        AddLogToLogText($"sign out sdk failed, code: {code}, desc: {desc}");
    }
));
```

### 7. 发送一条文本消息

在 `SendBtn_Click` 函数尾部添加以下代码，可以用于创建一条文本消息，然后发送该消息：

```csharp
Message msg = Message.CreateTextSendMessage(SingleChatIdTextBox.Text, MessageContentTextBox.Text);
    SDKClient.Instance.ChatManager.SendMessage(ref msg, new CallBack(
    onSuccess: () =>
    {
        Dip.Invoke(() =>
        {
            AddLogToLogText($"send message succeed, receiver: {SingleChatIdTextBox.Text},  message: {MessageContentTextBox.Text}");
        });
    },
    onError: (code, desc) =>
    {
        AddLogToLogText($"send message failed, code: {code}, desc: {desc}");
    }
));
```

:::tip
发送一条文本消息示例代码中的，在成功回调函数中，为了使用界面元素，例如：`SingleChatIdTextBox.Text；MessageContentTextBox.Text`，需要使用 `System.Windows.Threading.Dispatcher`(参见代码中的 `Dip` 变量)的 `Invoke` 进行操作。
:::

### 8. 接收消息

接收消息需要对象继承 `IChatManagerDelegate` 并实现相关的回调函数，同时将对象加入到监听列表中。

示例代码如下：

在类声明的头部继承 `IChatManagerDelegate` 对象。

```csharp
public partial class MainWindow : Window, IChatManagerDelegate

```

在 `MainWindow` 类内部添加以下回调函数。

:::tip
由于这里只测试消息接收回调，所以其他回调暂时无需实现，保留空函数即可。
:::

```csharp
public void OnMessagesReceived(List<Message> messages)
{
    foreach (Message msg in messages)
    {
        if (msg.Body.Type == MessageBodyType.TXT)
        {
            TextBody txtBody = msg.Body as TextBody;
            AddLogToLogText($"received text message: {txtBody.Text}, from: {msg.From}");
        }
        else if (msg.Body.Type == MessageBodyType.IMAGE)
        {
            _ = msg.Body as ImageBody;
            AddLogToLogText($"received image message, from: {msg.From}");
        }
        else if (msg.Body.Type == MessageBodyType.VIDEO)
        {
            _ = msg.Body as VideoBody;
            AddLogToLogText($"received video message, from: {msg.From}");
        }
        else if (msg.Body.Type == MessageBodyType.VOICE)
        {
            _ = msg.Body as VoiceBody;
            AddLogToLogText($"received voice message, from: {msg.From}");
        }
        else if (msg.Body.Type == MessageBodyType.LOCATION)
        {
            _ = msg.Body as LocationBody;
            AddLogToLogText($"received location message, from: {msg.From}");
        }
        else if (msg.Body.Type == MessageBodyType.FILE)
        {
            _ = msg.Body as FileBody;
            AddLogToLogText($"received file message, from: {msg.From}");
        }
    }
}

public void OnCmdMessagesReceived(List<Message> messages)
{

}

public void OnMessagesRead(List<Message> messages)
{

}

public void OnMessagesDelivered(List<Message> messages)
{

}

public void OnMessagesRecalled(List<Message> messages)
{

}

public void OnReadAckForGroupMessageUpdated()
{

}

public void OnGroupMessageRead(List<GroupReadAck> list)
{

}

public void OnConversationsUpdate()
{

}

public void OnConversationRead(string from, string to)
{

}

public void MessageReactionDidChange(List<MessageReactionChange> list)
{
}

public void OnMessageContentChanged(Message msg, string operatorId, long operationTime)
{
}
// added in 1.3.0
public void OnMessagePinChanged(string messageId, string conversationId, bool isPinned, string operatorId, long operationTime)
{
}
```

在 `AddChatDelegate` 函数中添加以下代码，以将 `MainWindow` 对象实例加入到监听列表中

```csharp
SDKClient.Instance.ChatManager.AddChatManagerDelegate(this);
```

在 `RemoveChatDelegate` 函数中添加以下代码，以便在关闭窗体时将 `MainWindow` 对象实例从监听列表中移除

```csharp
SDKClient.Instance.ChatManager.RemoveChatManagerDelegate(this);
```

### 9.测试修改后的项目

在 Visual Studio 窗体上部，点击 **启动** 按钮。

1. 注册用户：在 `user id` 文本框中输入用户名，在 `password` 文本框中输入密码，点击 `Sign up` 进行用户注册。注册的结果会在下方的方形区域进行显示。这里可以创建两个用户，例如 `quickstart_sender`、`quickstart_receiver`，一个用来发送消息，一个用来接收消息。
2. 用户登录：在 `user id` 文本框中输入用户名，例如输入 `quickstart_sender`，在 `password` 文本框中输入密码，点击 **Sign in** 进行登录。登录结果会在下方的方形区域进行显示。
3. 发送消息：在 `single chat id` 文本框中输入消息接收方，例如输入 `quickstart_receiver`，在 `message content` 文本框中输入想要发送的文本内容，如 `how are you.`，点击 **Send** 进行消息发送，消息发送结果会在下方的方形区域进行显示。
4. 用户退出登录：直接点击 **Sign out** 会让当前用户退出登录，退出结果会在下方的方形区域进行显示。
5. 接收消息：在 `user id` 文本框中输入接收消息的用户名，例如 `quickstart_receiver`， 在 `password` 文本框输入密码，点击 `Sign in` 进行登录。登录成功后，下方的方形区域将会显示接收到的消息，例如第 3 步发送的 `how are you.`。

