# 在即时通讯 IM 中集成 FCM

即时通讯 IM SDK 中已集成 FCM 推送相关逻辑，你还需要完成以下步骤。

## **FCM 推送集成**

### **步骤一 在 [Firebase 控制台](https://console.firebase.google.com/)添加 Firebase**

详见 [FCM 的官网介绍](https://firebase.google.com/docs/android/setup?hl=zh-cn#console)。

### **步骤二 获取 FCM V1 版本证书**

1. 登录 [FCM 控制台](https://console.firebase.google.com)，选择你的项目。

![image](/images/android/push/fcmproject.png)

2. 选择该项目下的应用。

![image](/images/android/push/appsetting.png)

3. 选择**服务账号**页签，点击**生成新的私钥**。

![image](/images/android/push/v1json.png)

4. 下载证书，保存备用。

下载证书文件，例如 `myapplication-72d8c-firebase-adminsdk-yqa7z-4766fefcaf.json`。

```json
{
  "type": "service_account",
  "project_id": "myapplication-72d8c",
  "private_key_id": "xxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\xxx\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-yqa7z@myapplication-72d8c.iam.gserviceaccount.com",
  "client_id": "xxx",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yqa7z%40myapplication-72d8c.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```

### **步骤三 上传推送证书**

在[声网控制台](https://console.shengwang.cn/overview)上传推送证书。
   
1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**功能配置**标签页。

5. 在**推送证书** 页签下，点击**添加推送证书**。

6. 在弹出的对话框中，默认打开**谷歌**页签，配置相关参数，点击**保存**。

![image](/images/android/push/fcm_certificate_v1.png)

| 参数       | 是否必需 | 描述         |
| :--------- | :------- | :---------------- |
| `证书类型`     | 是     | 值为 **V1**。  |
| `上传文件`     | 是     | 点击 **上传证书** 上传获取的 FCM V1 版本证书文件（.json 文件）。|
| `证书名称`     | 是     | 设置为 FCM 的发送者 ID。你需要在[Firebase 控制台](https://console.firebase.google.com/?hl=zh-cn)的 **项目设置** > **云消息传递** 页面中，在 **Firebase Cloud Messaging API（V1）** 区域中获取发送者 ID，如下图所示。 |
| `铃声`      | 否     | 铃声。                     |
| `推送优先级设置`     | 否    | 消息的推送优先级：<br/>- 高优先级消息 <br/>- 低优先级消息                        |
| `推送消息类型`       | 否    | 推送消息类型：<br/>- 数据 <br/>- 通知  <br/>- 数据+通知                   |
| `APNs跨平台推送支持`| 否     | 是否支持 APNs 跨平台推送：<br/>- 开启 <br/>- 关闭 |

![image](/images/android/push/fcm_v1.png)

### **步骤四 FCM 推送集成**

1. 在你的 app 项目的 `build.gradle` 文件中，配置 FCM 库的依赖：

```gradle
plugins {
    id 'com.android.application'
    // Add the Google services Gradle plugin
    id 'com.google.gms.google-services'
}

dependencies {
    // ...
    // 导入 Firebase BoM。
    implementation platform('com.google.firebase:firebase-bom:32.7.4')
    // 声明 FCM 的依赖。
    // 使用 BoM 时，不要在 Firebase 库依赖中指定版本。
    implementation 'com.google.firebase:firebase-messaging'
}
```

在你的根级（项目级）Gradle 文件 (\<project\>/build.gradle)：

```gradle
plugins {
  // ...

  // Add the dependency for the Google services Gradle plugin
  id 'com.google.gms.google-services' version '4.4.1' apply false

}
```

对于 Gradle 5.0 及以上版本，BoM 自动开启，而对于 Gradle 5.0 之前的版本，你需要开启 BoM 特性。详见[Firebase Android BoM](https://firebase.google.cn/docs/android/learn-more#bom)和[Firebase Android SDK Release Notes](https://firebase.google.cn/support/release-notes/android)。

2. 同步应用后，继承 `FirebaseMessagingService` 的服务，并将其在 `AndroidManifest.xml` 中注册。

```xml
<service android:name=".common.push.fcm.MyFCMMSGService"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

3. 在即时通讯 IM SDK 中启用 FCM。

```java
ChatOptions options = new ChatOptions();
...
PushConfig.Builder builder = new PushConfig.Builder(this);
// 替换为你的 FCM 发送方的用户 ID
builder.enableFCM("Your FCM sender id");
// 将 pushconfig 设置到 ChatOptions 中
options.setPushConfig(builder.build());
// 初始化即时通讯 IM SDK
ChatClient.getInstance().init(this, options);
// 即时通讯 IM SDK 初始化后
PushHelper.getInstance().setPushListener(new PushListener() {
    @Override
    public void onBindTokenSuccess(PushType pushType, String pushToken) {
        EMLog.e("PushClient", "Push client bind token to agora server success: " + pushType + " - " + pushToken);
    }
   @Override
   public void onError(PushType pushType, long errorCode) {
       EMLog.e("PushClient", "Push client occur a error: " + pushType + " - " + errorCode);
   }
   @Override
   // 选择推送类型。当设备同时支持 FCM 推送和其它推送时，可以使用 isSupportPush 选择使用其中一种推送。
   public boolean isSupportPush(PushType pushType, PushConfig pushConfig) {
       // 设置是否支持 FCM。
       if(pushType == PushType.FCM) {
           return GoogleApiAvailabilityLight.getInstance().isGooglePlayServicesAvailable(MainActivity.this)
                    == ConnectionResult.SUCCESS;
       }
       return super.isSupportPush(pushType, pushConfig);
   }
});
```

4. 即时通讯 IM SDK 登录成功后，上传 FCM 的 device token。

在应用初始化时，FCM SDK 会为用户的设备上的客户端应用生成唯一的注册 token。由于 FCM 使用该 token 确定要将推送消息发送给哪个设备，因此，声网服务器需要获得客户端应用的注册 token 才能将通知请求发送给 FCM，然后 FCM 验证注册 token，将通知消息发送给 Android 设备。建议该段代码放在成功登录即时通讯 IM 后的主页面。

```java
// 查看是否支持 FCM
if(GoogleApiAvailabilityLight.getInstance().isGooglePlayServicesAvailable(MainActivity.this) != ConnectionResult.SUCCESS) {
    return;
}
FirebaseMessaging.getInstance().getToken().addOnCompleteListener(new OnCompleteListener<String>() {
    @Override
    public void onComplete(@NonNull Task<String> task) {
        if (!task.isSuccessful()) {
            EMLog.d("PushClient", "Fetching FCM registration token failed:"+task.getException());
            return;
    }
    // 获取新的 FCM 注册 token
    String token = task.getResult();
    ChatClient.getInstance().sendFCMTokenToServer(token);
    }
});

```

5. 监控 device token 生成。

重写 `FirebaseMessagingService` 中的 `onNewToken` 方法，device token 更新后及时更新到即时通讯 IM SDK。

```java
public class MyFCMMSGService extends FirebaseMessagingService {
    private static final String TAG = "FCMMSGService";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        if (remoteMessage.getData().size() > 0) {
            String message = remoteMessage.getData().get("alert");
            Log.d(TAG, "onMessageReceived: " + message);
        }
    }

    @Override
    public void onNewToken(@NonNull String token) {
        Log.i("MessagingService", "onNewToken: " + token);
        // 若要对该应用实例发送消息或管理服务端的应用订阅，将 FCM 注册 token 发送至你的应用服务器。
        if(ChatClient.getInstance().isSdkInited()) {
            ChatClient.getInstance().sendFCMTokenToServer(token);
        }
    }
}
```

## **测试 FCM 推送**

在即时通讯 IM 中集成并启用 FCM 后，可测试推送是否成功集成。

### **前提条件**

准备一台在海外正式发售的 Android 设备用于接收推送通知，确保该设备满足以下条件：
- 使用国外 IP 地址与即时通讯 IM 建立连接。
- 支持 Google GMS 服务（Google Mobile Services）。
- 可以正常访问 Google 网络服务，否则该设备无法从 FCM 服务接收推送通知。

为了确保测试效果可靠，请避免使用模拟器进行测试。

### **测试步骤**

1. 在设备上登录应用，并确认 device token 绑定成功。
   可以查看日志或调用[获取用户详情的 RESTful 接口](/docs/sdk/server-side/account_system.html#获取单个用户的详情)确认 device token 是否绑定成功。成功后在 `entities` 字段下会有 `pushInfo` 字段，且 `pushInfo` 下会有 `device_Id`、`device_token`、`notifier_name` 等相关信息。
2. 开启应用通知栏权限。
3. 杀掉应用进程。
4. 在[声网控制台](https://console.shengwang.cn/overview)发送测试消息。
   在左侧导航栏中选择**即时通讯 IM** > **运营管理** > **用户**。在**用户**页面中，在对应用户 ID 的**操作**栏中点击**更多**，然后选择**发送rest消息**。在弹出的对话框中选择消息类型，输入消息内容，然后点击**发送**。
5. 查看设备是否收到推送通知。

### **故障排除**

1. 检查在即时通讯 IM 中是否正确集成或启用了 FCM 推送。
   在左侧导航栏中选择**即时通讯 IM** > **运营管理** > **用户**。在**用户**页面中，在对应用户 ID 的 **更多** 栏中选择 **查看IM用户绑定推送证书**。在弹出框中查看是否正确显示了证书名称和 device token。
2. 检查是否在控制台上传了正确的 FCM 证书。
3. 检查是否在聊天室中推送消息。聊天室不支持离线消息推送。
4. 检查设备是否为国行手机的 ROM。一些品牌的国产手机不支持 GMS 服务，需替换为海外发售的设备。
5. 检查发送消息时是否设置了只发在线(`deliverOnlineOnly = true`)。只发在线的消息不推送。