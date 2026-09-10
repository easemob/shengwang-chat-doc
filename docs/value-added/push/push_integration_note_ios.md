# iOS 推送集成

本文档为即时通讯 IM SDK 中关于推送功能的集成说明。

## 1. iOS SDK 集成

即时推送与即时通讯 IM 使用相同的 SDK，你可以导入和集成 SDK， 然后注册登录。

1. [iOS SDK 导入](/document/ios/quickstart.html#_2-集成-sdk)。

2. [注册登录](/document/ios/login.html#用户注册)。

3. 需在手机设置允许弹出推送消息通知栏。

## 2. 在线推送集成

### 开启即时推送处理

```objectivec
[[EMLocalNotificationManager sharedManager] launchWithDelegate:self];
```

### 处理代理

如果你需要推送相关信息，可以通过实现代理获取，声网提供的代理如下：

方式一

实现以下两个代理，通过 completionHandler 您可以更改通知方式：

```objectivec
- (void)emuserNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler
{
    NSDictionary *userInfo = notification.request.content.userInfo;
    if ([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        NSLog(@"APNS userInfo : %@ ",userInfo);
    }else{
        NSLog(@"EaseMob userInfo : %@ \n ext : %@",userInfo,userInfo[@"ext"]);
    }
    completionHandler(UNNotificationPresentationOptionBadge|UNNotificationPresentationOptionSound|UNNotificationPresentationOptionAlert);//通知方式 可选 badge，sound，alert 如果实现了这个代理方法，则必须有 completionHandler 回调。
}

- (void)emuserNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler
{
    NSDictionary *userInfo = response.notification.request.content.userInfo;
    if ([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        NSLog(@"APNS userInfo : %@ \n ",userInfo);
    }else{
        NSLog(@"EaseMob userInfo : %@ \n ext : %@",userInfo,userInfo[@"ext"]);
    }
    completionHandler();//如果实现了这个代理方法 ，则必须有 ''%%completionHandler%%'' 回调。
}
```

方式二

通过下面代理获取推送相关信息：

```objectivec
//如果需要获取数据，只实现这一个代理方法即可。
- (void)emGetNotificationMessage:(UNNotification *)notification state:(EMNotificationState)state
{
    NSDictionary *userInfo = notification.request.content.userInfo;
    if ([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        //APNS 推送。
        NSLog(@"APNS userInfo : %@ \n ",userInfo);
    }else{
        //本地推送。
        NSLog(@"userInfo : %@ \n ext : %@",userInfo,userInfo[@"ext"]);
    }
    
    if (state == EMDidReceiveNotificationResponse) {
        //打开通知 可通过扩展字段自己实现跳转。
    }else{
        //展示通知。
    }
}
```

推送通知透传消息获取

```objectivec
//当应用收到推送透传消息时，此方法会被调用。 
- (void)emDidReceivePushSilentMessage:(NSDictionary *)messageDic
{
    NSLog(@"emDidReceivePushSilentMessage : %@",messageDic);
}
```

### 进阶

iOS 的本地通知管理模块 `UNUserNotificationCenter` 是单例，一个 App 中只能有一个实例。如果在启用 SDK 在线推送后，App 又重写了 `[UNUserNotificationCenter currentNotificationCenter].delegate`，会将 SDK 中的 delegate 覆盖，此时，需要在 App 实现的 `UNUserNotificationCenterDelegate` 中调用 SDK 的相关处理，过程如下：

```objectivec
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler
{
    [[EMLocalNotificationManager sharedManager] userNotificationCenter:center willPresentNotification:notification withCompletionHandler:completionHandler];
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void(^)(void))completionHandler
{
    [[EMLocalNotificationManager sharedManager] userNotificationCenter:center didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}
```

## 3. 离线推送集成

关于 APNs 离线推送的集成，详见 [离线推送文档](/document/ios/push/push_overview.html)。