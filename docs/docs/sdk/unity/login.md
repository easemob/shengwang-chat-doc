# 登录

初始化 IM SDK 后，你需要首先调用接口登录。登录成功后，才能使用 IM 的功能。

## 用户注册

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

## 主动登录

1. **用户 ID + token** 是更加安全的登录方式。

使用 token 登录时需要处理 token 过期的问题，比如在每次登录时更新 token 等机制。

```csharp
SDKClient.Instance.LoginWithToken(username, token,
    callback: new CallBack(

        onSuccess: () =>
        {
            Debug.Log("login succeed");
        },

        onError: (code, desc) =>
        {
            if (code == 200)
            {
                Debug.Log("Already login.");;
            }
            else 
            {
                Debug.Log($"login failed, code: {code} ; desc: {desc}");
            }
        }
    )
);
```

2. **用户 ID + 密码**登录是传统的登录方式。用户 ID 和密码均由你的终端用户自行决定，密码需要符合[密码规则要求](/docs/sdk/server-side/account_system.html#注册单个用户)。

```csharp
SDKClient.Instance.Login(username, password,
    callback: new CallBack(

        onSuccess: () =>
        {
            Debug.Log("login succeed");
        },

        onError: (code, desc) =>
        {
            if (code == 200)
            {
                Debug.Log("Already login.");;
            }
            else 
            {
                Debug.Log($"login failed, code: {code} ; desc: {desc}");
            }
        }
    )
);

```

## 自动登录

暂时不支持自动登录。

## 获取当前登录的用户

你可以调用 `SDKClient#CurrentUsername` 方法获取当前登录用户的用户 ID。

## 获取登录状态

你可以调用 `SDKClient#IsLoggedIn` 方法获取当前用户的登录状态。

## 退出登录

你可以调用 `Logout` 方法退出登录。退出登录后，你不会再收到其他用户发送的消息。 

异步方法：

```csharp
SDKClient.Instance.Logout(false,
    callback: new CallBack(
    onSuccess: () =>
    {
        Debug.Log("Logout succeed");
    },

    onError: (code, desc) =>
    {
        Debug.Log($"Logout failed, code:{code}, desc:{desc}");
    }
    )
);
```

:::tip
如果调用退出方法，在收到 `onSuccess` 回调后才能去调用 IM 相关方法，例如 `Login`。
:::

## 账号切换

若在 app 中从当前账号切换到其他账号，你需要首先调用 `Logout` 方法登出，然后再调用 `LoginWithToken` 或 `Login` 方法登录。

## 多设备登录

除了单端单设备登录，即时通讯 IM 支持同一账号在多端的多个设备上登录。多设备登录时，若同端设备数量超过限制，新登录的设备会将之前登录的设备踢下线。

关于多设备登录场景中的设备数量限制、互踢策略以及信息同步，详见[多设备登录文档](multi_device.html)。


## 更多

### 登录被封禁账号的提示

在声网控制台或调用 REST API 封禁用户账号后，若仍使用该账号登录，SDK会返回 "service is disabled"（305 错误）, 可以根据用户这个返回值来进行相应的提示或者处理。
