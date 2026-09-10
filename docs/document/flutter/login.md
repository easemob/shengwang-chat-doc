# 登录

初始化 IM SDK 后，你需要首先调用接口登录。登录成功后，才能使用 IM 的功能。

## 用户注册

### 创建用户

即时通讯 IM 提供以下两种方式创建用户：

- 调用 [RESTful API](/docs/sdk/server-side/account_register_authorized_single.html) 注册用户账号，注册后保存到你的服务器或返给客户端。

- 在[声网控制台](https://console.shengwang.cn/overview)按照如下步骤创建用户：

1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**运营管理**标签页。

5. 在**用户** 页签下，点击**创建IM用户**。

6. 在弹出的对话框中，配置用户相关参数，点击**确定**。

![img](/images/android/user_create.png)

### 获取用户 token

创建用户后，在用户列表点击对应的用户的**操作**一栏中的**更多**，选择**查看Token**。

在弹出的对话框中，可以查看用户 Token，也可以点击**重新生成**，生成用户 token。

![img](/images/android/user_token.png)

在生产环境中，为了安全考虑，你需要部署 App Server 生成 Token，详见 [Token 鉴权文档](/docs/sdk/server-side/token_authentication.html#搭建-app-server-生成-token)。

## 主动登录

1. **用户 ID + token** 是更加安全的登录方式。token 可以通过调用 REST API 获取。 详见 [Token 鉴权](/document/server-side/token_authentication.html)。

测试环境下，你在 [声网控制台](https://console.shengwang.cn/overview) 创建用户后，IM 服务器会自动为这些用户分配用户 Token。

在生产环境中，为了安全考虑，你需要在你的应用服务器集成[Token 鉴权](/document/server-side/token_authentication.html) 实现获取 Token 的业务逻辑，使你的用户从你的应用服务器获取 Token。

使用 token 登录时需要处理 token 过期的问题，比如在每次登录时更新 token 等机制。

```dart
try {
  await EMClient.getInstance.loginWithToken(userId, token);
} on EMError catch (e) {
  debugPrint("loginWithToken error: ${e.code} ${e.description}");
}
```

1. **用户 ID + 密码** 登录是传统的登录方式。用户名和密码都是你的终端用户自行决定，密码需要符合密码规则要求。

```dart
try {
  await EMClient.getInstance.loginWithPassword(userId, password);
} on EMError catch (e) {}
```

`login(userId, password)` 方法已废弃，请使用 `loginWithPassword(userId, password)` 或更安全的 `loginWithToken(userId, token)`。

## 自动登录

初始化时，你可以设置 `EMOptions#autoLogin` 选项确定是否自动登录。如果设置为自动登录，则登录成功之后，后续初始化 SDK 时会自动登录。

自动登录期限默认为 30 天，即设置自动登录后，用户 30 天内可自动登录。若调整改期限，可联系商务经理。

不过，自动登录还取决于你设置的用户 token 或密码有效期，例如，用户 token 有效期为 24 小时，则用户在 24 小时后，需获取 token 重新登录。

## 获取当前登录的用户

你可以调用 `EMClient#currentUserId` 方法获取当前登录用户的用户 ID。

## 获取登录状态

你可以调用 `EMClient#isLoginBefore` 方法获取当前用户的登录状态。

## 退出登录

你可以调用 `EMClient#logout` 方法退出登录。退出登录后，你不会再收到其他用户发送的消息。

```dart
try {
  await EMClient.getInstance.logout();
} on EMError catch (e) {
  debugPrint("logout error: ${e.code} ${e.description}");
}
```

## 账号切换

若在 app 中从当前账号切换到其他账号，你需要首先调用 `logout` 方法登出，然后再调用 `loginWithToken` 方法登录。

## 多设备登录

除了单端单设备登录，即时通讯 IM 支持同一账号在多端的多个设备上登录。多设备登录时，若同端设备数量超过限制，新登录的设备会将之前登录的设备踢下线。

关于多设备登录场景中的设备数量限制、互踢策略以及信息同步，详见[多设备登录文档](multi_device.html)。


## 更多

### 登录被封禁账号的提示

在声网控制台或调用 REST API 封禁用户账号后，若仍使用该账号登录，SDK会返回 "service is disabled"（305 错误）, 可以根据用户这个返回值来进行相应的提示或者处理。
