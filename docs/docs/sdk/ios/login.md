# 登录

初始化即时通讯 IM SDK 后，你需要首先调用接口登录。登录成功后，才能使用 IM 的功能。

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

## 主动登录

1. **用户 ID + token** 是更加安全的登录方式。

通过用户 ID 和 token 进行登录。使用 token 登录时需要处理 token 过期的问题，比如在每次登录时更新 token 等机制。

```objectivec
        [AgoraChatClient.sharedClient loginWithUsername:@"" token:@"" completion:^(NSString * _Nonnull aUsername, AgoraChatError * _Nullable aError) {
            
        }];
```

2. **用户 ID + 密码** 是传统的登录方式。用户名和密码均由你的终端用户自行决定，密码需要符合密码规则要求。

```objectivec
    //SDK 初始化 `AgoraChatOptions` 时可以传入 `loginExtensionInfo` 属性投递给被踢下线的设备。该属性需要开启多设备登录的情况下才能生效。
    AgoraChatOptions *options = [AgoraChatOptions optionsWithAppkey:<#AppKey#>];
    options.loginExtensionInfo = @"you was kicked out by other device";
    [AgoraChatClient.sharedClient initializeSDKWithOptions:options];
// 异步方法
[[AgoraChatClient sharedClient] loginWithUsername:@"username"
                                     password:@"your password"
                                   completion:^(NSString *aUsername, AgoraChatError *aError) {

}];
```

## 自动登录

初始化时，你可以设置 `AgoraChatOptions#isAutoLogin` 选项确定是否自动登录。如果设置为自动登录，则登录成功之后，后续初始化 SDK 时会自动登录，并收到以下回调。

```objectivec
@interface ViewController: UIViewController< AgoraChatClientDelegate>

- (void)autoLoginDidCompleteWithError:(AgoraChatError *)error
{
    if (error) {
        
    }
}
```

## 获取当前登录的用户

你可以调用 `AgoraChatClient.shared().currentUsername` 方法获取当前登录用户的用户 ID。

## 获取登录状态

你可以调用 `AgoraChatClient.shared().isLoggedIn` 方法获取当前用户的登录状态。

## 退出登录

你可以调用 `logout` 方法退出登录。退出登录后，你不会再收到其他用户发送的消息。 

异步方法：

```objectivec
        [AgoraChatClient.sharedClient logout:YES completion:^(AgoraChatError * _Nullable aError) {
            
        }];
```

:::tip

1. 如果集成了 APNs 等第三方推送，`logout` 方法中 `aIsUnbindDeviceToken` 参数需设为 `true`，退出时会解绑设备 token，否则可能会出现退出了，还能收到消息推送通知的现象。
有时可能会遇到网络问题而解绑失败，app 处理时可以弹出提示框让用户选择，是否继续退出(弹出框提示继续退出能收到消息的风险)，如果用户选择继续退出，传 `false` 再调用 `logout` 方法退出成功。当然也可以失败后还是返回退出成功，然后在后台起个线程不断调用 `logout` 方法直到成功。这样存在风险，即用户杀掉了 app，网络恢复后用户还会继续收到消息。

2. 如果调用异步退出方法，在收到 `completion` 回调后才能去调用 IM 相关方法，例如 `login`。
:::

## 账号切换

若在 app 中从当前账号切换到其他账号，你需要首先调用 `logout` 方法登出，然后再调用 `login` 方法登录，此时`aIsUnbindDeviceToken` 参数需设为 `false`。

## 多设备登录

除了单端单设备登录，即时通讯 IM 支持同一账号在多端的多个设备上登录。多设备登录时，若同端设备数量超过限制，新登录的设备会将之前登录的设备踢下线。

关于多设备登录场景中的设备数量限制、互踢策略以及信息同步，详见[多设备登录文档](multi_device.html)。


## 更多

### 登录被封禁账号的提示

在[声网控制台](https://console.shengwang.cn/overview)或调用 [RESTful API](/docs/sdk/server-side/account_system.html#账号封禁) 封禁用户账号后，若仍使用该账号登录，SDK会返回 "service is disabled"（305 错误）, 可以根据用户这个返回值来进行相应的提示或者处理。
