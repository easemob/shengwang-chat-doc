# 集成 HarmonyOS 推送

即时通讯 IM SDK 中已集成 HarmonyOS 推送相关逻辑，你还需要完成以下步骤。

## 步骤一 申请服务账号密钥

鸿蒙推送基于服务账号生成鉴权令牌，因此，[需申请服务账号密钥](https://developer.huawei.com/consumer/cn/console/)。

1. 开启鸿蒙推送服务。
   
![image](/images/harmonyos/push/push_harmonyos_enable.png)

2. 创建服务账号凭证。
   
![image](/images/harmonyos/push/push_harmonyos_account_create.png)

3. 凭证创建后，可点击**创建并下载JSON**，获取服务账号密钥。

![image](/images/harmonyos/push/push_harmonyos_key_generate.png)

## 步骤二 上传推送证书

注册完成后，按以下步骤在声网控制台上传推送证书。**该步骤须在登录声网 IM SDK 成功后进行。**

1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**功能配置**标签页。

5. 在**推送证书**页签下，点击**添加推送证书**。

6. 在弹出的对话框中选择**鸿蒙**页签，配置鸿蒙推送参数。

| 推送证书参数    | 类型   | 是否必需 | 描述   |
| :-------- | :----- | :------- | :---------------- |
| 证书名称        | String | 是  | 推送证书名称，请填写鸿蒙 Client ID。<br/>证书名称是声网服务器用来判断目标设备使用哪种推送通道的唯一条件，因此**必须确保与 HarmonyOS 终端设备上传的证书名称一致。** <br/>详见 [**创建服务账号密钥**窗口中 **名称** 参数的值](https://developer.huawei.com/consumer/cn/doc/start/api-0000001062522591#section11695162765311)。|
| 上传文件     | - | 是  | 点击 **上传证书**，上传 JSON 推送证书，即服务账号的密钥文件。申请服务器密钥可参考官方文档：[华为 API Console操作指南-服务帐号密钥](https://developer.huawei.com/consumer/cn/doc/start/api-0000001062522591#section11695162765311)，选择启用推送服务后，再生成服务器密钥。 |
| Category | - | 否      | 通知消息类别。详见 [HarmonyOS NEXT 官网相关文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/push-apply-right-V5#section16708911111611)。 |
| Action        | - | 否  | 消息接收方在收到离线推送通知时单击通知栏时打开的应用指定页面的自定义标记。 |

![image](/images/harmonyos/push/harmonyos_certificate.png)

## 步骤三 在项目中配置 Client ID

在项目模块级别下的 `src/main/module.json5`（例如 `entry/src/main/module.json5`）中，新增 `metadata` 并配置 `client_id`，如下所示：

配置 `client_id` 的 `value` 时，不能通过 `resource` 中的值配置（例如 `$media.icon`），请直接写入 `client_id` 的值。

```typescript
"module": {
  "name": "entry",
  "type": "xxx",
  "description": "xxxx",
  "mainElement": "xxxx",
  "deviceTypes": [],
  "pages": "xxxx",
  "abilities": [],
  // 配置如下信息
  "metadata": [ 
    {
      "name": "client_id",
      // 配置为步骤 1 中获取的 Client ID
      "value": "xxxxxx"  
    }
  ]
}

```

## 步骤四 在 SDK 初始化时配置应用的推送 Client ID

```typescript
// ChatOptions 需要传入 appId 参数。
let options = new ChatOptions({
  appId: "Your AppId"
});
// 传入 AppGallery Connect 获取到的 ClientID。
options.setAppIDForPush('Your ClientID');
// 初始化即时通讯 IM SDK。
ChatClient.getInstance().init(context, options);
```

## 步骤五 监听 Push Token 上传结果

你可以设置 `PushListener` 监听 Push Token 的上传结果。

```typescript
private pushListener: PushListener = {
    onError: (error: ChatError) => {
      // push token 绑定失败。
    },
    onBindTokenSuccess: (token: string) => {
      // push token 绑定成功。
    }
}
ChatClient.getInstance().pushManager()?.addListener(this.pushListener);
```


