# 发送推送 Token 到声网服务器

即时通讯 IM SDK 通过 `react-native-push-collection` 获取推送 token。本文介绍如何将推送 token 发送到声网服务器。

## 实现流程

### 步骤一 添加即时通讯 SDK 依赖

在当前应用中添加即时通讯 IM SDK 依赖。

```sh
yarn add react-native-shengwang-chat
```

### 步骤二 获取推送证书信息

从[声网控制台](https://console.shengwang.cn/overview)获取推送证书信息，配置应用的 App ID（`appId`）和推送证书名称（`pushId`）信息。

- `appId`：在[声网控制台](https://console.shengwang.cn/overview)的 **应用详情** 页面查看。
- `pushId`：推送证书名称。不同厂商的推送证书名称也不同。

![img](/images/react-native/push/push_get_appkey.png)

![img](/images/react-native/push/push_get_certificate_name.png)

```typescript
import { getPlatform, getDeviceType } from "react-native-push-collection";
import { ChatClient, ChatOptions, ChatPushConfig } from "react-native-shengwang-chat";

// 从声网控制台获取推送 ID、pushId
const pushId = "<your push id from easemob console>";

// 设置推送类型
const pushType = React.useMemo(() => {
  let ret: PushType;
  const platform = getPlatform();
  if (platform === "ios") {
    // APNs 或 FCM
    ret = "apns";
  } else {
    // 动态获取设备 token
    ret = (getDeviceType() ?? "unknown") as PushType;
  }
  return ret;
}, []);
```

### 步骤三 初始化即时通讯 IM SDK


```typescript
ChatClient.getInstance()
  .init(
    ChatOptions.withAppId({
      appId: "<your app ID>",
      pushConfig: new ChatPushConfig({
        deviceId: pushId,
        deviceToken: undefined,
      }),
    })
  )
  .then(() => {
    onLog("chat:init:success");
  })
  .catch((e) => {
    onLog("chat:init:failed:" + JSON.stringify(e));
  });
```

### 步骤四 初始化推送 SDK

```typescript
ChatPushClient.getInstance()
  .init({
    platform: getPlatform(),
    pushType: pushType,
  })
  .then(() => {
    onLog("push:init:success");
    ChatPushClient.getInstance().addListener({
      onError: (error) => {
        onLog("onError:" + JSON.stringify(error));
      },
      onReceivePushMessage: (message: any) => {
        onLog("onReceivePushMessage:" + JSON.stringify(message));
      },
      onReceivePushToken: (pushToken) => {
        onLog("onReceivePushToken:" + pushToken);
        if (pushToken) {
          // 更新服务端的推送 token
        }
      },
    } as ChatPushListener);
  })
  .catch((e) => {
    onLog("push:init:failed:" + JSON.stringify(e));
  });
```

### 步骤五 更新服务端的推送 Token

```typescript
ChatClient.getInstance()
  .updatePushConfig(
    new ChatPushConfig({
      deviceId: pushId,
      deviceToken: pushToken,
    })
  )
  .then(() => {
    onLog("updatePushConfig:success");
  })
  .catch((e) => {
    onLog("updatePushConfig:error:" + JSON.stringify(e));
  });
```

## 运行示例项目

查看完整示例项目，请点击[这里](https://github.com/AsteriskZuo/RNTestPushExample/tree/chat)。启动项目后，界面如下图所示。

<ImageGallery>
<ImageItem src="/images/react-native/push/push_example_ui.png" title="运行示例项目后的界面" />
</ImageGallery>

在该页面，你可以发送消息，接收方若离线会收到推送通知：

1. 在页面上输入 `pushtype` 和 `appId`，点击 `init action` 按钮, 执行初始化。
   
   初始化日志以及后续日志会在空白位置显示。

2. 在页面上输入用户 ID 和密码，点击 `login action` 按钮进行登录。

3. 点击 `get token action` 按钮获取推送 Token，并发送到服务端。

4. 设置 `target id` 和 `content` 输入对端用户 ID 和消息内容，点击 `send text message` 按钮发送文本消息。
   
5. 接收方的登录设备会在通知栏收到离线推送通知，如下图所示。

**注意：接收离线消息，需要杀死当前登录的应用，否则服务端将按照在线推送消息，不推送离线消息。**

![img](/images/android/push/push_displayattribute_1.png)
