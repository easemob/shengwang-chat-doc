# 用户注册与登录

本文介绍用户注册模式与登录方式。

## 用户注册模式

即时通讯 IM 提供以下两种方式创建用户：

- 调用 [RESTful API](/docs/sdk/server-side/account_system.html#注册用户) 注册用户账号，注册后保存到你的服务器或返给客户端。

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

## 用户登录

初始化即时通讯 IM SDK 后，你需要调用登录接口进行登录。只有登录成功后，你才能正常使用 IM 的各种功能，例如消息和会话。

目前登录服务器支持主动和自动登录。主动登录有两种方式：

- 用户 ID + 密码
- 用户 ID + token

| 参数       | 类型   | 是否必需 | 描述          |
| :--------- | :----- | :------- | :-------------------------------------------- |
| `username` | String | 是  | 用户 ID，长度不可超过 64 个字节。不可设置为空。支持以下字符集：<br/>- 26 个小写英文字母 a-z；<br/>- 26 个大写英文字母 A-Z；<br/>- 10 个数字 0-9；<br/>- “_”, “-”, “.”。 <br/><Container type="notice" title="注意"><br/>- 该参数不区分大小写，因此 `Aa` 和 `aa` 为相同的用户 ID。<br/>- 请确保同一个 app 下，用户 ID 唯一；<br/>- 用户 ID 为公开信息，请勿使用 UUID、邮箱地址、手机号等敏感信息。</Container> |
| `token` | String | 是 | token 可以通过调用 REST API 获取，即传入用户 ID （或用户 ID + 密码）和 token 有效期参数获取，详见 [使用 token 验证](/docs/sdk/server-side/token_authentication.html)。<br/> |
| `password` | String | 是 | 用户的登录密码，长度不可超过 64 个字符。|

## 登录流程

- 用户 ID + 密码

![img](/images/product/login_userid_pwd.png)

- 用户 ID + Token

![img](/images/product/login_userid_token.png)

:::tip
关 token 鉴权，详见 [Token](/docs/sdk/server-side/token_authentication.html)。
:::

