# 发送单聊消息已读回执回调事件

## 功能说明

成功发送单聊消息已读回执后，IM 服务器会按照 [发送后回调规则](callback_postsending.html#回调规则) 向你的 App Server 发送回调请求，App Server 可通过该回调已读回执信息，进行数据同步。

## 前提条件

已在 [声网控制台](https://console.shengwang.cn/overview) 设置发送后回调规则。详见 [配置回调规则](callback_postsending.html#回调规则)。

## 回调时机

[客户端发送了单聊消息已读回执](/document/android/message_receipt.html#单聊和群聊消息已读回执)。

## 回调请求

### 请求示例

下面的请求示例为发送单聊消息已读回执。

```json
{
    "chat_type": "read_ack",
    "callId": "XXXX#XXXX_968665325555943556",
    "channel_channel": "XXXX#XXXX_2222@conference.easemob.com",
    "security": "bd63d5fa8f72823e6d33e09a43aa4239",
    "os": "ios",
    "payload": {
        "ext": {},
        "ack_message_id": "968665323572037776",
        "bodies": []
    },
    "host": "msync@ebs-ali-beijing-msync45",
    "from": "1111",
    "to": "2222",
    "eventType": "chat",
    "msg_id": "968665325555943556",
    "timestamp": 1643099771248
}
```

### 请求字段说明

| 字段        | 数据类型 | 含义                                                         |
| :---------- | :------- | :----------------------------------------------------------- |
| `chat_type` | String   | `read_ack` 已读回执。                                        |
| `callId`    | String   | 回调请求的唯一标识。 |
| `channel_channel` | String   | 单聊消息的已读回执，格式为 `xxxx#xxxx_接收已读回执用户 ID@conference.easemob.com`，例如，示例中的 `easemob-demo#wang_277721224642561@conference.easemob.com`。|
| `security`  | String   | 签名，格式如下: `MD5（callId+secret+timestamp）`。 [配置回调规则](callback_postsending.html#回调规则) 后，IM 服务器会自动为该规则生成 secret，向你的 App Server 发送数据时会基于该 secret 生成该签名，作为你的服务器识别 IM 服务器的依据。若要使用自定义密钥，可联系声网商务。 |
| `os` | String | 发送单聊消息已读回执的客户端使用的 IM SDK 平台标识，常见取值如下：<br/> - `android`：Android 平台。适用于使用 Android IM SDK 的客户端，以及使用 Flutter、React Native、Unity 等跨平台 IM SDK 并运行在 Android 平台上的客户端。<br/> - `ios`：iOS 平台。适用于使用 iOS IM SDK 的客户端，以及使用 Flutter、React Native、Unity 等跨平台 IM SDK 并运行在 iOS 平台上的客户端。<br/> - `webim`：Web SDK。适用于使用 Web IM SDK 的客户端。<br/> - `harmony`：HarmonyOS 平台。<br/> - `win`：Windows 平台。<br/> - `custom`：自定义平台。IM 支持自定义设备平台，以便对登录设备进行精细化管理，详见 [设置设备平台文档](/docs/document/android/multi_device.html#设置登录设备的平台)。 |
| `payload`   | object   | 包括：<br/> - `ext`：消息扩展字段<br/> - `ack_message_id`：消息 ID<br/> - `bodies`：消息体内容。 |
| `host`      | String   | 服务器名称。                                                 |
| `from`      | String   | 发送已读回执用户 ID。                                        |
| `to`        | String   | 接收已读回执用户 ID。                                        |
| `eventType`       | String | `chat`：表示上行消息。                      |
| `timestamp` | long     | 即时通讯 IM 服务器收到消息已读回执的 Unix 时间戳，单位为 ms。                  |
| `msg_id`    | String   | 该回执消息的消息 ID。                                        |
