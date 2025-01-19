# SDK 初始化

初始化是使用 SDK 的必要步骤,需在所有接口方法调用前完成。

## 前提条件

有效的即时通讯 IM 开发者账号和 App ID，详见[声网控制台的相关文档](enable_im.html)。

## SDK 初始化

使用 SDK 前需要进行初始化，示例代码如下：

```javascript
const conn = new EC.connection({
  appId: "your appId",
});
```

初始化 SDK 参数说明：

| 参数      | 类型   | 是否必需 | 描述    |
| :-------------------- | :----- | :------- | :------------------------ |
| `appId`               | String | 是       | 声网控制台为你的应用生成的唯一标识。                            |
| `isHttpDNS`           | Bool   | 否       | 是否开启 DNS，防止 DNS 劫持。<br/> -（默认）`true`：开启 DNS；<br/> - `false`：关闭 DNS。              |
| `delivery`            | Bool   | 否       | 是否开启送达回执：<br/> - `true`：开启；<br/> -（默认）`false`：关闭。                      |
| `enableReportLogs`    | Bool   | 否       | 小程序平台是否允许上传日志：<br/> - `true`：开启；<br/> -（默认）`false`：关闭。      |
| `https`               | Bool   | 否       | 是否支持通过 HTTPS 访问即时通讯 IM：<br/> - （默认）`true`：支持 HTTPS 和 HTTP；<br/> -`false`：浏览器根据使用的域名自行判断。  |
| `heartBeatWait`       | Int    | 否       | 心跳间隔，单位为毫秒，默认为 30000。   |
| `deviceId`            | String | 否       | 设备 ID，为默认随机值。         |
| `useOwnUploadFun`     | Bool   | 否       | 是否支持通过自己的路径将图片、文件上传到自己的服务器。<br/> -`true`：支持，需要指定路径；<br/> -（默认）`false`：关闭，通过消息服务器上传下载文件。       |
| `autoReconnectNumMax` | Int    | 否       | 最大重连次数。       |
| `apiUrl`              | String | 是       | 指定的 REST 服务器。在未开启 DNS 的情况下使用，一般适用于开发者要实现数据隔离、特别注重数据安全的场景。要获取该服务器地址，需在[声网控制台](https://console.shengwang.cn/overview)的 **全部产品 > 即时通讯 IM > 功能配置 > 础信息** 页面，查看 **访问域名**区域中的 **REST API** 设置。                  |
| `url`                 | String | 是       | 指定的消息服务器。在未开启 DNS 的情况下使用，一般适用于开发者要实现数据隔离、特别注重数据安全的场景。需在[声网控制台](https://console.shengwang.cn/overview)的 **全部产品 > 即时通讯 IM > 功能配置 > 础信息** 页面，查看 **访问域名**区域中的 **WebSocket 地址** 设置。 | 

// TODO：上表中的 `url` 的的配置对吗？
