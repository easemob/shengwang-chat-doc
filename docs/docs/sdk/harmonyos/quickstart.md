# 快速开始

<Toc />

本文介绍如何快速集成即时通讯 IM HarmonyOS SDK 实现单聊。


## 实现原理

下图展示在客户端发送和接收一对一文本消息的工作流程。

![img](/images/android/sendandreceivemsg.png)

## 前提条件

- DevEco Studio NEXT Release（5.0.3.900）及以上；
- HarmonyOS SDK API 12 及以上；
- 有效的即时通讯 IM 开发者账号和 App ID，详见 [开通即时通讯服务](enable_im.html)。

## 准备开发环境

本节介绍如何创建项目，将即时通讯 IM HarmonyOS SDK 集成到你的项目中，并添加相应的设备权限。

### 1. 创建 HarmonyOS 项目

参考以下步骤创建一个 HarmonyOS 项目。

1. 打开 DevEco Studio，点击 **Create Project**。
2. 在 **Choose Your Ability Template** 界面，选择 **Application > Empty Ability**，然后点击 **Next**。
3. 在 **Configure Your Project** 界面，依次填入以下内容：
   - **Project name**：你的 HarmonyOS 项目名称，如 HelloWorld。
   - **Bundle name**：你的项目包的名称，如 cn.shengwang.helloworld。
   - **Save location**：项目的存储路径。
   - **Compatible SDK**：项目的支持的最低 API 等级，选择 `5.0.0(12)` 及以上。
   - **Module name**：module的名称，默认为 `entry`。

4. 点击 **Finish**。根据屏幕提示，安装所需插件。

上述步骤使用 **DevEco Studio NEXT Release（5.0.3.900）** 示例。

### 2. 在工程 `build-profile.json5` 中设置支持字节码 HAR 包。

修改工程级 `build-profile.json5` 文件，在 `products` 节点下设置 `useNormalizedOHMUrl` 为 `true`。

```json
{
  "app": {
    "products": [
      {
         "buildOption": {
           "strictMode": {
             "useNormalizedOHMUrl": true
           }
         }
      }
    ]
  }
}
```

### 2. 集成 SDK

打开 [SDK 下载](https://im.shengwang.cn/)页面，获取最新版的即时通讯 IM HarmonyOS SDK，得到 `har` 形式的 SDK 文件。

将 SDK 文件，拷贝到 `Harmony` 工程，例如放至 `HelloWorld` 工程下 `entry` 模块下的 `libs` 目录。

修改模块目录的 `oh-package.json5` 文件，在 `dependencies` 节点增加依赖声明。

```json
{
  "name": "entry",
  "version": "1.0.0",
  "description": "Please describe the basic information.",
  "main": "",
  "author": "",
  "license": "",
  "dependencies": {
    "@shengwang/chatsdk": "file:./libs/chatsdk-x.x.x.har"
  }
}
```
最后单击 **File > Sync and Refresh Project** 按钮，直到同步完成。

### 3. 添加项目权限

在模块的 `module.json5` ，例如：`HelloWorld` 中 `entry` 模块的 `module.json5` 中，配置示例如下：

```json
{
  module: {
    requestPermissions: [
      {
        name: "ohos.permission.GET_NETWORK_INFO",
      },
      {
        name: "ohos.permission.INTERNET",
      },
    ],
  },
}
```

## 实现单聊

本节介绍如何实现单聊。

### 1. SDK 初始化

```typescript
let options = new ChatOptions({
  appId: "Your AppId"
})
......// 其他 ChatOptions 配置。
// 初始化时传入上下文以及选项
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

![img](/images/android/user_token.png)

### 3. 登录账号

使用如下代码实现用户登录：

```typescript
ChatClient.getInstance().loginWithToken(userId, token).then(() => {
    // 登录成功回调
}).catch((e: ChatError) => {
    // 登录失败回调，包含错误信息
});
```

:::tip
1. 除了注册监听器，其他的 SDK 操作均需在登录之后进行。
:::

### 4. 发送一条单聊消息

```typescript
// `content` 为要发送的文本内容，`toChatUsername` 为对方的账号。
let message = ChatMessage.createTextSendMessage(toChatUsername, content);
if (!message) {
    return;
}
// 发送消息
ChatClient.getInstance().chatManager()?.sendMessage(message);
```
