# 集成 HarmonyOS 推送

即时通讯 IM SDK 已集成 HarmonyOS Push Kit 的 Push Token 获取与上传逻辑。使用离线推送前，还需完成以下配置。

## 步骤一 申请服务账号密钥

鸿蒙推送基于服务账号生成鉴权令牌，因此，[需申请服务账号密钥](https://developer.huawei.com/consumer/cn/console/)。

1. 开启鸿蒙推送服务。
   
![image](/images/harmonyos/push/push_harmonyos_enable.png)

2. 创建服务账号凭证。
   
![image](/images/harmonyos/push/push_harmonyos_account_create.png)

3. 凭证创建后，可点击**创建并下载JSON**，获取服务账号密钥。

![image](/images/harmonyos/push/push_harmonyos_key_generate.png)

## 步骤二 上传推送证书

注册完成后，需要在 [声网控制台](https://console.shengwang.cn/overview) 上传推送证书。

1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**功能配置**标签页。

5. 在**推送证书** 页签下，点击**添加推送证书**。
   
6. 选择 **鸿蒙** 页签，设置推送证书相关参数。   

:::tip
该步骤须在登录即时通讯 IM SDK 成功后进行。
:::

![image](/images/harmonyos/push/harmonyos_certificate.png)

| 推送证书参数    | 类型   | 是否必需 | 描述   |
| :-------- | :----- | :------- | :---------------- |
| 证书名称        | String | 是  | 推送证书名称，请填写鸿蒙 Client ID。<br/>证书名称是IM 服务器用来判断目标设备使用哪种推送通道的唯一条件，因此 **必须确保与 HarmonyOS 终端设备上传的证书名称一致。** <br/>详见 [**创建服务账号密钥**窗口中 **名称** 参数的值](https://developer.huawei.com/consumer/cn/doc/start/api-0000001062522591#section11695162765311)。|
| 上传文件     | - | 是  | 点击 **上传证书**，上传 JSON 推送证书，即服务账号的密钥文件。申请服务器密钥可参考官方文档：[华为 API Console操作指南-服务帐号密钥](https://developer.huawei.com/consumer/cn/doc/start/api-0000001062522591#section11695162765311)，选择启用推送服务后，再生成服务器密钥。 |
| Category | - | 否      | 通知消息类别。详见 [HarmonyOS NEXT 官网相关文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/push-apply-right-V5#section16708911111611)。 |
| Action        | - | 否  | 消息接收方在收到离线推送通知时单击通知栏时打开的应用指定页面的自定义标记。 |

## 步骤三 在项目中配置推送 Client ID

在应用模块的 `src/main/module.json5`（例如 `entry/src/main/module.json5`）中，将 `client_id` 添加到 `module.metadata`。其值必须与声网控制台中的推送证书名称一致。

```json
{
  "module": {
    "metadata": [
      {
        "name": "client_id",
        "value": "your-client-id"
      }
    ]
  }
}
```

如果 `module.metadata` 已存在，请将 `client_id` 配置项合并到现有数组中，不要覆盖其他配置项。

## 步骤四 在 SDK 初始化时配置应用的推送 Client ID

```typescript
import { ChatClient, ChatOptions } from '@easemob/chatsdk';

const options = new ChatOptions({
  appId: 'Your AppId'
});

// 传入与推送证书名称及 module.json5 中 client_id 一致的 Client ID。
options.setAppIDForPush('your-client-id');
// 初始化即时通讯 IM SDK。
ChatClient.getInstance().init(context, options);
```

## 步骤五 监听 Push Token 上传结果

SDK 初始化完成后、调用 `ChatClient#loginWithToken` 登录前，注册 `PushListener` 监听 Push Token 的获取和绑定结果。登录成功后，SDK 会自动从 HarmonyOS Push Kit 获取 Push Token，并将 Token 与初始化时配置的 Client ID 上传至IM 服务器，应用无需自行判断 Token 是否需要上传。

```typescript
import { ChatClient, ChatError, PushListener } from '@easemob/chatsdk';

const pushListener: PushListener = {
  onError: (error: ChatError): void => {
    // Push Token 获取或绑定失败，根据错误码和错误信息处理。
  },
  onBindTokenSuccess: (token: string): void => {
    // Push Token 绑定成功。
  }
};

const pushManager = ChatClient.getInstance().pushManager();
pushManager?.addListener(pushListener);

// 不再需要监听时，移除同一个监听器实例。
function releasePushListener(): void {
  pushManager?.removeListener(pushListener);
}
```

主动登录时，即使 Push Token 未发生变化，SDK 也会重新上传；上传失败时会清除本地保存的 Push Token。调用 `ChatClient#logout` 退出登录时，默认会解绑当前设备的 Push Token；若将 `unbindToken` 参数设置为 `false`，则仅退出 IM 账号而不解绑 Token，设备仍可能收到当前账号的离线推送通知。详见 [退出登录](/docs/document/harmonyos/login.html#退出登录)。
