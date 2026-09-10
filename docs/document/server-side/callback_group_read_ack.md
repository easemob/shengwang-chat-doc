# 发送群组消息已读回执回调事件

## 功能说明

成功发送群组消息已读回执后，IM 服务器会按照 [发送后回调规则](callback_postsending.html#回调规则) 向你的 App Server 发送回调请求，App Server 可通过该回调已读回执信息，进行数据同步。

## 前提条件

已在 [声网控制台](https://console.shengwang.cn/overview) 设置发送后回调规则。详见 [配置回调规则](callback_postsending.html#回调规则)。

## 回调时机

[客户端发送了群组消息已读回执](/document/android/message_receipt.html#单聊和群聊消息已读回执)。

## 回调请求

### 请求示例

下面的请求示例为发送群组消息已读回执。

```json
{
    "callId": "XXXX#XXXX_1406088760298309588",
    "channel_channel": "XXXX#XXXX_277721224642561@conference.easemob.com",
    "eventType": "chat",
    "channel_user": "XXXX#XXXX_tst@easemob.com",
    "chat_type": "read_ack",
    "security": "bc392b82e70e24cc1ea29e08aa41765d",
    "content_type": "chat:ack:read",
    "payload": {
        "ext": {},
        "ack_message_id": "1406088702140090324",
        "msg_config": {
            "allow_group_ack": true
        },
        "type": "read_ack"
    },
    "writed_channel": false,
    "host": "easemob@hsb-im-msync0",
    "from": "tst",
    "to": "277721224642561",
    "msg_id": "1406088760298309588",
    "timestamp": 1744945351097
}
```

### 请求字段说明

| 字段        | 数据类型 | 含义                                                         |
| :---------- | :------- | :----------------------------------------------------------- |
| `callId`    | String   | 回调请求的唯一标识。 |
| `channel_channel` | String   | 群聊消息的已读回执，格式为 `App Key_群组 ID@conference.easemob.com`，例如，示例中的 `easemob-demo#wang_277721224642561@conference.easemob.com`。|
| `eventType`       | String | `chat`：表示上行消息。                      |
| `security`  | String   | 签名，格式如下: `MD5（callId+secret+timestamp）`。[配置回调规则](callback_postsending.html#回调规则) 后，IM 服务器会自动为该规则生成 secret，向你的 App Server 发送数据时会基于该 secret 生成该签名，作为你的服务器识别 IM 服务器的依据。若要使用自定义密钥，可联系声网商务。 |  
| `payload`   | object   | 包括：<br/> - `ext`：消息扩展字段<br/> - `ack_message_id`：消息 ID<br/> - `msg_config.allow_group_ack`：是否需要群消息已读回执 <br/> - `type`：`read_ack` 表示消息已读回执。|
| `host`      | String   | 服务器名称。                                                 |
| `from`      | String   | 发送已读回执的用户 ID。                                        |
| `to`        | String   | 群组 ID。  |
| `msg_id`    | String   | 该回执消息的消息 ID。                                        |
| `timestamp` | long     | 即时通讯 IM 服务器收到消息已读回执的 Unix 时间戳，单位为 ms。  |