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
     pod 'AgoraChat'
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

## 4. 初始化聊天页面

向工程中导入 Chat 文件。

```objectivec
// ConversationId 接收消息方的声网ID:@"user2"
// type 聊天类型:AgoraChatConversationTypeChat    单聊类型
// createIfNotExist 如果会话不存在是否创建会话：YES
 AgoraChatViewController *chatViewController = [[AgoraChatViewController alloc] initWithConversationId:@"user2" conversationType:AgoraChatConversationTypeChat];
    [self.navigationController pushViewController:chatViewController animated:YES];
```

若有导航，可以用 push 方式跳转到聊天页面发消息测试，也就是用登录的 user1 向 user2 发消息；若没有导航的话，可以用 present 方式跳转到聊天页面。

## 5. 创建账号

设置用户 ID 和密码创建账号。

```objectivec
// 异步方法
[[AgoraChatClient sharedClient] registerWithUsername:@"username"
                                         password:@"your password"
                                       completion:^(NSString *aUsername, AgoraChatError *aError) {
                                   }];
```

:::tip
该注册模式为在客户端注册，主要用于测试，简单方便，但不推荐在正式环境中使用。正式环境中，需要[在声网控制台中创建用户或调用 Restful API 注册用户](login.html#用户注册)。
:::

## 6. 登录账号

利用创建的用户 ID 和密码登录即时通讯 IM。

```objectivec
[[AgoraChatClient sharedClient] loginWithUsername:@"username"
                                     password:@"your password"
                                   completion:^(NSString *aUsername, AgoraChatError *aError) {

}];
```

## 7. 发送消息

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
