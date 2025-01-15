# 在即时通讯 IM 中集成 OPPO 推送

即时通讯 IM SDK 中已集成 OPPO 推送相关逻辑，你还需要完成以下步骤。

## **步骤一 在 OPPO 开发者后台创建应用**

在 [OPPO 开发者后台](https://open.oppomobile.com/new/loginForHeyTap?location=https%3A%2F%2Fopen.oppomobile.com)创建应用，开启推送服务，上传对应的证书指纹，详见 OPPO 官方介绍：[OPPO 推送服务集成](https://open.oppomobile.com/new/developmentDoc/info?id=10195)。

## **步骤二 上传推送证书**

在[声网控制台](https://console.shengwang.cn/overview)上传 OPPO 推送证书。

1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**功能配置**标签页。

5. 在**推送证书** 页签下，点击**添加推送证书**。

6. 在弹出的对话框中，选择**OPPO**页签，配置相关参数，点击**保存**。参数相关信息，详见你在 [OPPO 开发者后台](https://open.oppomobile.com/service/oms?service_id=1000004&app_type=app&app_id=30004346)创建的应用的 `appkey` 和 `mastersecret` 以及程序的 `包名`等信息。

![image](/images/android/push/add_oppo_push_certificate.png)

| 参数       | 类型   | 是否必需 | 描述         |
| :--------- | :----- | :------- | :---------------- |
| `证书名称`     | String | 是     | 填写 OPPO App Key。  |
| `推送密钥`     | String | 是     | 填写 OPPO Master Secret。Master Secret 需要到 [OPPO 推送平台](https://open.oppomobile.com/) > **配置管理** > **应用配置** 页面查看。|
| `应用包名`     | String | 是     | 填写 OPPO App package name。   |
| `Channel ID`     | String |  否    | 填写 Channel ID。   |
| `Activity`| String | 否     | 选择点击通知后的动作。  |
| `Category`     | String |  否    | 选择 category 类型。                       |
| `NotifyLevel`     | String |  否    | 选择 category 类型。                       |

## **步骤三 集成 OPPO 推送**

1. 配置 OPPO 推送 `aar` 包：在 OPPO 推送官网下载推送 SDK 包，将 `aar` 包存放在 `libs` 目录下并 sync。
   
   此外，也可以直接使用声网 Android IM Demo 中集成的 OPPO 推送的 `aar` 包。

2. 配置 `AndroidManifest.xml`。

   - 推送服务需要的权限列表：

   ```xml
   <!-- OPPO 推送配置 start -->
   <uses-permission android:name="com.coloros.mcs.permission.RECIEVE_MCS_MESSAGE"/>
   <uses-permission android:name="com.heytap.mcs.permission.RECIEVE_MCS_MESSAGE"/>
   <!-- OPPO 推送配置 end -->
   ```

   - 推送服务需要的 service：

   ```xml
   <!-- OPPO 推送配置 start -->
   <service
   android:name="com.heytap.msp.push.service.CompatibleDataMessageCallbackService"
   android:permission="com.coloros.mcs.permission.SEND_MCS_MESSAGE">
   <intent-filter>
       <action android:name="com.coloros.mcs.action.RECEIVE_MCS_MESSAGE"/>
   </intent-filter>
   </service> <!--兼容 Q 以下版本-->

   <service
   android:name="com.heytap.msp.push.service.DataMessageCallbackService"
   android:permission="com.heytap.mcs.permission.SEND_PUSH_MESSAGE">
   <intent-filter>
       <action android:name="com.heytap.mcs.action.RECEIVE_MCS_MESSAGE"/>
       <action android:name="com.heytap.msp.push.RECEIVE_MCS_MESSAGE"/>
   </intent-filter>
   </service> <!--兼容 Q 版本-->
   <!-- OPPO 推送配置 end -->
   ```

3. 在即时通讯 IM SDK 初始化时，配置启用 OPPO 推送。

   ```java
   ChatOptions options = new ChatOptions();
   ...
   PushConfig.Builder builder = new PushConfig.Builder(this);
   builder.enableOppoPush(String appKey,String appSecret);
   // 将 pushconfig 设置为 ChatOptions
   options.setPushConfig(builder.build());
   // 初始化 IM SDK
   ChatClient.getInstance().init(this, options);
   ```

4. 调用 OPPO 推送的初始化方法。

   ```java
   HeytapPushManager.init(context, true);
   ```