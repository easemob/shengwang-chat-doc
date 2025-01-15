# 在即时通讯 IM 中集成荣耀推

即时通讯 IM SDK 中集成了荣耀推送。本节介绍如何集成荣耀厂商的离线推送通道，使消息通过荣耀推送服务推送至离线的用户。

## **步骤一 在[荣耀开发者服务平台](https://developer.hihonor.com/cn/)创建应用并申请开通推送服务**

详见[荣耀推送官网说明](https://developer.honor.com/cn/docs/11002/guides/kit-history)。

## **步骤二 在声网控制台上传荣耀推送证书**

1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**功能配置**标签页。

5. 在**推送证书** 页签下，点击**添加推送证书**。

6. 在弹出的对话框中，选择**荣耀**页签，配置相关参数，点击**保存**。

![image](/images/android/push/add_honor_push_template.png)

| 推送证书参数    | 类型   | 是否必需 | 描述           |
| :-------------- | :----- | :------- | :--------------------------------------- |
| `App ID`        | String | 是       | 应用标识符，应用的唯一标识，在荣耀开发者服务平台开通对应用的荣耀推送服务时生成。                   |
| `Client ID`     | String | 是       | 应用的客户 ID，用于获取发送消息令牌的 ID，在荣耀开发者服务平台开通对应应用的荣耀推送服务时生成。   |
| `Client Secret` | String | 是       | 应用的客户密钥，用于获取发送消息令牌的密钥，在荣耀开发者服务平台开通对应应用的荣耀推送服务时生成。 |
| `Badge Class`   | String | 否       | 应用入口 Activity 类全路径，例如 com.example.test.MainActivity。                                   |
| `Action`        | String | 否       | 消息接收方在收到离线推送通知时单击通知栏时打开的应用指定页面的自定义标记。该参数需要与客户端 `AndroidManifest.xml` 文件中注册启动的 `Activity` 类中 `intent-filter` 标签中设置的 `action` 一致。   |

:::tip
关于**App ID**、**Client ID**和**Client Secret**，可在荣耀开发者服务平台申请开通推送服务后，在**推送服务**页面选择创建的应用，在[**查看推送服务**](https://developer.honor.com/cn/docs/11002/guides/app-registration#申请开通推送服务)页面查看。
:::

![image](/images/android/push/view_push_service.png)

## **步骤三 集成荣耀推送 SDK**

本节以荣耀推送 SDK 7.0 版本为例介绍如何在 IM 中集成荣耀推送。关于如何集成荣耀推送 SDK 7.1 或 7.0 以下版本，详见[荣耀官网](https://developer.honor.com/cn/docs/11002/guides/intergrate)。

1. 选择本地或远程集成方式。

- 在荣耀官网[下载荣耀推送 SDK](https://developer.honor.com/cn/docs/11002/sdk/android)，将 SDK 导入项目，添加本地依赖。

- 在 app 级的 `build.gradle` 文件中添加远程依赖。

  ```gradle
  implementation 'com.hihonor.mcs:push:7.0.41.301'
  ```

2. 从荣耀推送平台获取 `mcs-services.json` 配置文件放入应用级根目录下。

  如果 App 中已添加 `mcs-services.json` 文件，则需要在 `buildscript` > `dependencies` 中添加 `asplugin` 插件配置。

  ```gradle
  buildscript {
      repositories {
          google()
          jcenter()
          // 配置 SDK 的 Maven 仓地址。
          maven {url 'https://developer.hihonor.com/repo'}
      }
      dependencies {
          ...
          // 增加 asplugin 插件配置，推荐使用最新版本。
          classpath 'com.hihonor.mcs:asplugin:2.0.0'
          // 增加 gradle 插件配置，根据 gradle 版本选择对应的插件版本号。
          classpath 'com.android.tools.build:gradle:7.0'
      }
  }
  ```

  打开项目级 `settings.gradle` 文件，配置 SDK 的 Maven 仓地址。

  ```gradle
  dependencyResolutionManagement {
    ...
    repositories {
        google()
        jcenter()
        // 配置 SDK 的 Maven 仓地址。
        maven {
            url 'https://developer.hihonor.com/repo'
        }
    }
  }
  ```

3. 初始化配置。可以参考 Demo 中 demoHelper 的 `initPush()` 方法中的荣耀推送配置。

```java
// 初始化 IM，开启荣耀推送。
ChatOptions options = new ChatOptions();
PushConfig.Builder builder = new PushConfig.Builder(context);
builder.enableHonorPush();// 需要在 AndroidManifest.xml 中配置 App ID。
options.setPushConfig(builder.build());

// 荣耀推送 7.0.41.301 及以上版本，无需调用 `init` 方法初始化荣耀推送 SDK 即可调用以下方法。
// 检查是否支持荣耀推送。
boolean isSupport = HonorPushClient.getInstance().checkSupportHonorPush(context);
if (isSupport) {
   // true：调用初始化接口时，SDK 会同时进行异步请求 device token，会触发 HonorMessageService.onNewToken(String) 回调。
   // false：不会异步请求 device token，需要应用主动请求获取 device token。建议用 `false`，自己控制获取 device token 的时机。
   HonorPushClient.getInstance().init(context, false);
}
// 设置推送配置监听。若推送初始化失败，返回相应错误。
PushHelper.getInstance().setPushListener(new PushListener() {
    @Override
    public void onError(PushType pushType, long errorCode) {
        // 返回的 errorCode 仅 9xx 为声网内部错误，可从 Error 中查询，其他错误请根据 pushType 去相应第三方推送网站查询。
        EMLog.e("PushClient", "Push client occur a error: " + pushType + " - " + errorCode);
    }

    @Override
    public boolean isSupportPush(PushType pushType, PushConfig pushConfig) {
        // 由外部实现代码判断设备是否支持荣耀推送。
        if (pushType == PushType.HONORPUSH){
            return isSupport;
        }
        return super.isSupportPush(pushType, pushConfig);
    }
});
```

## **步骤四 清单文件配置**

在 `AndroidManifest.xml` 文件中，配置荣耀推送 App ID 和注册荣耀推送服务。

```xml
<!-- 荣耀推送配置 start -->
<meta-data
    android:name="com.hihonor.push.app_id"
    android:value="${HONOR_PUSH_APPID}" />

<service
    android:name=".common.service.HONORPushService"
    android:exported="false">
    <intent-filter>
        <action android:name="com.hihonor.push.action.MESSAGING_EVENT" />
    </intent-filter>
</service>
<!-- 荣耀推送配置 end -->
```

对于注册荣耀推送服务，需自定义 Service，继承荣耀推送的 `HonorMessageService` 类，重写 `onNewToken` 方法。

```java
public class HONORPushService extends HonorMessageService {
  //Device token 发生变化时，会触发 `onNewToken` 回调返回新 Token。
  @Override
  public void onNewToken(String token) {
      if(token != null && !token.equals("")){
          EMLog.d("HONORPush", "service register honor push token success token:" + token);
        // IM SDK 提供的上传 device token 的 API
          ChatClient.getInstance().sendHonorPushTokenToServer(token);
      }else{
          EMLog.e("HONORPush", "service register honor push token fail!");
      }
  }
  @Override
  public void onMessageReceived(HonorPushDataMsg honorPushDataMsg) {
      EMLog.d("HONORPush", "onMessageReceived" + honorPushDataMsg.getData());
  }
}
```

## **步骤五 将 device token 与 IM 的登录账号绑定**

打开应用，初始化即时通讯 IM SDK 成功且成功登录后，获取一次 device token，将 token 上传至声网服务器，与 IM 的登录账号绑定。

如果当前 IM 的登录账号已经绑定了 device token，则 IM SDK 不会上传 token。

```java
if (HonorPushClient.getInstance().checkSupportHonorPush(this)){
    // 获取荣耀 device token。
    HonorPushClient.getInstance().getPushToken(new HonorPushCallback<String>() {
        @Override
        public void onSuccess(String token) {
            EMLog.d("HonorPushClient","getPushToken onSuccess: " + token);
            ChatClient.getInstance().sendHonorPushTokenToServer(token);
        }

        @Override
        public void onFailure(int code, String error) {
            EMLog.e("HonorPushClient","getPushToken onFailure: " + code + " error:" + error);
        }
    });
}
```

## **步骤六 实现通知栏消息点击动作**

通知栏消息点击动作分为以下两类：
- （默认）点击后打开应用首页；
- 打开应用自定义页面。

下面详细介绍如何实现点击通知栏消息打开应用自定义页面。通过如下三步实现打开应用自定义页面并携带数据给应用。

1. 设置 `action` 参数。

在声网控制台的**添加推送证书**对话框中设置 `action` 参数。该参数需要与客户端 `AndroidManifest.xml` 文件中注册启动的 `Activity` 类中 `intent-filter` 标签中设置的 `action` 一致。该配置只能实现跳转到无需前置参数的页面。若启动应用自定义页面需要前置参数，你还需要在消息扩展中添加前置参数。

若推送不同的消息时，接收方收到后点击推送通知栏打开不同应用自定义页面，你可以添加相应的消息扩展属性实现。

以下为即时通讯 IM 提供的通知栏消息点击动作的扩展字段：

```java
{
    "payload":{
        "ext":{
            "em_android_push_ext":{
                "honor_click_action":"io.agora.chatdemo.section.me.action"
            }
        }
    }
}
```

示例代码如下：

```java
// 下面以 TXT 消息为例，图片、文件等类型的消息设置方法相同。
ChatMessage message = ChatMessage.createSendMessage(ChatMessage.Type.TXT);
TextMessageBody txtBody = new TextMessageBody("test");
// 设置接收方：单聊为对端用户的用户 ID；群聊为群组 ID；聊天室聊天为聊天室 ID。
message.setTo("toChatUsername");
JSONObject jsonObject = new JSONObject();
jsonObject.put("honor_click_action","io.agora.chatdemo.section.me.action");// 设置点击推送通知栏打开的应用自定义页面的自定义标记。
message.setAttribute("em_android_push_ext",jsonObject);// 发送消息。
ChatClient.getInstance().chatManager().sendMessage(message);
```

2. 在 `AndroidMainfest.xml` 中配置 Activity intent-filter。

```xml
  <activity android:name=".YourActivity">
    <intent-filter>
        <!-- `name` 为 Activity 类全路径，例如 com.example.test.MainActivity。 -->
        <action android:name="com.honor.push.intent.action.test" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
  </activity>
```

3. 接收数据。

客户端应用主 Activity 中接收数据。在 `YourActivity` 类的 `onCreate` 方法中实现数据读取。

```java
private void getIntentData(Intent intent) {
  if (null != intent) {
      // 获取 data 里的值
      Bundle bundle = intent.getExtras();
      if (bundle != null) {
          for (String key : bundle.keySet()) {
              String content = bundle.getString(key);
              Log.i(TAG, "receive data from push, key = " + key + ", content = " + content);
          }
      }
  }
}
```

## **步骤七 配置混淆脚本**

你编译 APK 前需要配置混淆配置文件，避免混淆荣耀推送 SDK 导致功能异常。

在 app 级根目录下打开混淆配置文件 `proguard-rules.pro`，加入排除荣耀推送 SDK 的混淆配置脚本。

```java
  -ignorewarnings
  -keepattributes *Annotation*
  -keepattributes Exceptions
  -keepattributes InnerClasses
  -keepattributes Signature
  -keepattributes SourceFile,LineNumberTable
```

关于荣耀推送详情，请参见[荣耀推送官网](https://developer.honor.com/cn/docs/11002/guides/introduction)。