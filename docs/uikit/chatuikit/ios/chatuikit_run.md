# 跑通示例项目

<Toc />

声网提供一个开源的聊天示例项目，演示了如何使用该 UIKit 快速搭建聊天页面，实现完整业务。

本文展示如何编译并运行 iOS 平台的聊天 UIKit 示例项目。

## 前提条件

开始前，确保你的开发环境满足如下条件：

- Xcode 15.0 或以上版本；
- iOS 13.0 或以上版本；
- 项目中已设置有效的开发者签名。

## 操作步骤

### 第一步 下载示例代码

前往 [GitHub 源码](https://github.com/AgoraIO-Usecase/ShengwangChat-ios)下载示例代码到本机。

### 第二步 执行 pod 命令

1. 点击打开 `ShengwangChatUIKit` 文件夹。

2. 将 `Example` 文件夹拖拽到终端。

3. 终端中输入如下命令，然后回车：

```
pod install --repo-update
```

### 第三步 编译

1. 使用 Xcode 双击打开 `.xcworkspace` 工程文件。

2. 在键盘上按 `cmd+B` 进行编译，编译结果会报错，如下图所示：

![img](/images/uikit/chatuikit/ios/buildError.png) 

1. 在[声网控制台](https://console.shengwang.cn/overview)创建有效的即时通讯 IM 开发者账号和 [App Key](/product/enable_and_configure_IM.html#创建应用)。然后，将 App ID 填入 `appId` 字段，运行项目。

在键盘上按 `cmd+B` 重新编译程序即可跑通项目。

4. 创建有效的即时通讯 IM 用户，将用户的 ID 和 token 分别填入下图的两个输入框，点击 **Login**。

在[声网控制台](https://console.shengwang.cn/overview)按照如下步骤创建用户：

(1). 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

(2). 点击左侧导航栏的**全部产品**。

(3). 在下拉列表中找到**即时通讯 IM** 并点击。

(4). 在**即时通讯 IM** 页面，进入**运营管理**标签页。

(5). 在**用户** 页签下，点击**创建IM用户**。

(6). 在弹出的对话框中，配置用户相关参数，点击**确定**。

在用户列表中，在新创建的用户的**操作**一栏中，点击**更多**，选择**查看Token**，查看该用户的 token。

<img src="/images/uikit/chatuikit/ios/login.png" width="600" >

### 第四步 体验项目

双击 `.xcworkspace` 文件打开项目，在键盘上按 `cmd+R` 运行项目即可在真机上体验。该 UIKit 支持 x86_64 架构模拟器，但不支持 M1 下模拟器，原因是 UIKIt 使用了一个将音频文件转为 AMR 格式的 FFmpeg 的静态库。

## 注意事项

示例工程仅用于快速跑通流程以及体验单群聊 UIKit 所有功能。