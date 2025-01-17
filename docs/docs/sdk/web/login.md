# 登录

初始化 IM SDK 后，你需要首先调用接口登录。登录成功后，才能使用 IM 的功能。

## 用户注册

### 创建用户

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

## 登录方式

1. **用户 ID + token** 是更加安全的登录方式。

测试环境下，你在[声网即时通讯云控制台](https://console.easemob.com/user/login)创建用户后，声网服务器会自动为这些用户分配用户 Token，详见[测试环境下创建用户的介绍](/product/enable_and_configure_IM.html#测试环境)。

使用 token 登录时需要处理 token 过期的问题，比如在每次登录时更新 token 等机制。

```javascript
chatClient
  .open({
    user: "username",
    accessToken: "token",
  })
  .then(() => {
    console.log("login success");
  })
  .catch((reason) => {
    console.log("login fail", reason);
  });
```

2. **用户 ID + 密码**登录是传统的登录方式。用户 ID 和密码均由你的终端用户自行决定，密码需要符合[密码规则要求](/docs/sdk/server-side/account_system.html#开放注册单个用户)。

```javascript
chatClient
  .open({
    user: "username",
    pwd: "password",
  })
  .then(() => {
    console.log("login success");
  })
  .catch((reason) => {
    console.log("login fail", reason);
  });
```

## 退出登录

```javascript
chatClient.close();
```

## 多设备登录

除了单端单设备登录，声网即时通讯 IM 支持同一账号在多端的多个设备上登录。多设备登录时，若同端设备数量超过限制，新登录的设备会将之前登录的设备踢下线。

关于多设备登录场景中的设备数量限制、互踢策略以及信息同步，详见[多设备登录文档](multi_device.html)。
