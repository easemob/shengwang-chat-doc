# 即时通讯 IM iOS 快速开始

<Toc />

本文介绍如何快速集成即时通讯 IM iOS SDK 实现单聊。

## 实现原理

下图展示在客户端发送和接收一对一文本消息的工作流程。

![img](/images/android/sendandreceivemsg.png)

## 前提条件

- Xcode (推荐最新版本)。
- 安装 iOS 10.0 或更高版本的 iOS 模拟器或 Apple 设备。
- CocoaPods [1.10.1 或更高版本](https://cocoapods.org/)。
- 有效的即时通讯 IM 开发者账号和 App ID，详见 [开通即时通讯服务](enable_im.html)。
- 如果你的网络环境部署了防火墙，请联系声网技术支持设置白名单。

## 1. 准备开发环境

### 创建 Xcode 项目

参考以下步骤在 Xcode 中创建一个 iOS 平台下的 Single View App，项目设置如下：

- **Product Name** 设为 **AgoraChatQuickstart**。
- **Organization Identifier** 设为 **hyphenatechat**。
- **User Interface** 选择 **Storyboard**。
- **Language** 选择 **Objective-C**。

## 2. 集成 SDK

使用 CocoaPods 集成 SDK。

1. 在 **Terminal** 里进入项目根目录，并运行 `pod init` 命令。项目文件夹下会生成一个 **Podfile** 文本文件。
   
2. 打开 **Podfile** 文件，修改文件为如下内容：

```pod
# platform :ios, '10.0'

 target 'AgoraChatQuickstart' do
     pod 'ShengwangChat_iOS'
 end
```

3. 运行 `pod update` 命令更新本地库版本。
   
4. 运行 `pod install` 命令安装即时通讯 IM SDK。成功安装后，**Terminal** 中会显示 `Pod installation complete!`，此时项目文件夹下会生成一个 **workspace** 文件。

国内开发者如果遇到网络问题导致 pod 命令无法执行，可使用国内镜像源，例如 [Gitee 镜像源](https://gitee.com/mirrors/CocoaPods-Specs) 或 [TUNA 镜像源](https://mirrors.tuna.tsinghua.edu.cn/help/CocoaPods/)。

## 3. 初始化 SDK 

在工程的 AppDelegate 中的以下方法中，调用 SDK 对应方法。

```objectivec
(BOOL)application:(UIApplication *)applicationdidFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    AgoraChatOptions *options = [AgoraChatOptions optionsWithAppId:@"Appid"];
    // apnsCertName是证书名称，可以先传 nil，等后期配置 APNs 推送时在传入证书名称
    options.apnsCertName = nil;
    [[AgoraChatClient sharedClient] initializeSDKWithOptions:options];
    return YES;
}
```

## 4. 注册即时通讯 IM 用户

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

## 5. 登录账号

利用创建的用户 ID 和密码登录即时通讯 IM。

```objectivec
[[AgoraChatClient sharedClient] loginWithUsername:@"username"
                                     token:@"your user token"
                                   completion:^(NSString *aUsername, AgoraChatError *aError) {

}];
```

## 6. 发送消息

利用创建的用户 ID 和密码登录即时通讯 IM，向对端用户发送消息。在下面示例中，向 user 2 发送文本消息。

```objectivec
// 创建消息
AgoraChatTextMessageBody* textBody = [[AgoraChatTextMessageBody alloc] initWithText:@"hello"];
AgoraChatMessage *message = [[AgoraChatMessage alloc] initWithConversationID:@"user2"
                                                              from:@"user1"
                                                                to:@"user2"
                                                              body:textBody
                                                               ext:@{}];
// 发送消息
[[AgoraChatClient sharedClient].chatManager sendMessage:message progress:nil completion:^(AgoraChatMessage *message, AgoraChatError *error) {}];
```
