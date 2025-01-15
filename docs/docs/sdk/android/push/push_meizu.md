# 在即时通讯 IM 中集成魅族推送

即时通讯 IM SDK 中已集成魅族推送相关逻辑，你还需要完成以下步骤。

## **步骤一 在魅族开发者后台创建应用**

在魅族开发者后台创建应用，开启推送服务，并上传对应的证书指纹。详见魅族官方介绍：[Flyme 推送服务集成](https://open.flyme.cn/docs?id=129)。

## **步骤二 上传推送证书**

在[声网控制台](https://console.shengwang.cn/overview)上传魅族推送证书。

1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**功能配置**标签页。

5. 在**推送证书** 页签下，点击**添加推送证书**。

6. 在弹出的对话框中，选择**魅族**页签，配置相关参数，点击**保存**。参数相关信息，详见你在 [flyme 推送平台](https://login.flyme.cn/sso?appuri=https%3A%2F%2Fapiopen.flyme.cn%2Flogin&useruri=https%3A%2F%2Fopen.flyme.cn%3Ft%3D1722914343470&sid=node0mpa52w0llp341dncyz6wr7yi56208487&service=open&autodirct=true)创建的应用的 `APP ID` 和 `APP SECRET` 以及程序的 `包名`。

![image](/images/android/push/add_meizu_push_certificate.png)

| 参数       | 类型   | 是否必需 | 描述         |
| :--------- | :----- | :------- | :---------------- |
| `证书名称`     | String | 是     | 填写魅族 App ID。  |
| `推送密钥`     | String | 是     | 填写魅族 App Secret。|
| `应用包名`     | String | 是     | 填写魅族 App package name。   |
| `Activity`| String | 否     | 选择点击通知后的动作。  |
| `推送送达回执`     | String |  否    | <br/> - **开启**<br/> - **关闭**   |

## **步骤三 集成魅族推送 SDK** 

1. 配置魅族推送远程依赖包。
   
   在 `app level/build.gradle` 中添加依赖。

   ```gradle
   dependencies{
       // 从 PushSDK4.1.0 开始 其已发布⾄ mavenCentral
       implementation 'com.meizu.flyme.internet:push-internal:4.3.0'
   }
   ```

2. 配置 `AndroidManifest.xml`。

   - 推送服务需要的权限列表：

   ```xml
   <!-- 魅族推送配置 start-->
   <!-- 兼容 flyme5.0 以下版本，魅族内部集成 pushSDK 必填，不然无法收到消息-->
   <uses-permission android:name="com.meizu.flyme.push.permission.RECEIVE" />
   <permission
       android:name="${applicationId}.push.permission.MESSAGE"
       android:protectionLevel="signature" />
   <uses-permission android:name="${applicationId}.push.permission.MESSAGE" />
   <!-- 兼容 flyme3.0 配置权限-->
   <uses-permission android:name="com.meizu.c2dm.permission.RECEIVE" />
   <permission
       android:name="${applicationId}.permission.C2D_MESSAGE"
       android:protectionLevel="signature" />
   <uses-permission android:name="${applicationId}.permission.C2D_MESSAGE" />
   <!-- 魅族推送配置 end-->
   ```

   - 推送服务需要的 `receiver`：

   ```xml
   <!-- MEIZU 推送配置 start -->
   <receiver android:name="io.agora.push.platform.meizu.MzMsgReceiver">
       <intent-filter>
           <!-- 接收 push 消息 -->
           <action android:name="com.meizu.flyme.push.intent.MESSAGE"
               />
           <!-- 接收 register 消息 -->
           <action
               android:name="com.meizu.flyme.push.intent.REGISTER.FEEDBACK" />
           <!-- 接收 unregister 消息-->
           <action
               android:name="com.meizu.flyme.push.intent.UNREGISTER.FEEDBACK"/>
           <!-- 兼容低版本 Flyme3 推送服务配置 -->
           <action android:name="com.meizu.c2dm.intent.REGISTRATION"
               />
           <action android:name="com.meizu.c2dm.intent.RECEIVE" />
           <category android:name="${applicationId}"></category>
       </intent-filter>
   </receiver>
   <!-- MEIZU 推送配置 end -->
   ```

3. 在即时通讯 IM SDK 初始化时，配置启用魅族推送。

   ```java
   ChatOptions options = new ChatOptions();
   ...
   PushConfig.Builder builder = new PushConfig.Builder(this);
   builder.enableMeiZuPush(String appId,String appKey);
   // 将 pushconfig 设置为 ChatOptions
   options.setPushConfig(builder.build());
   // 初始化 IM SDK
   ChatClient.getInstance().init(this, options);
   ```



