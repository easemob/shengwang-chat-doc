# 发送单聊消息已读回执

回调请求主要字段含义：

| 字段        | 数据类型 | 含义                                                         |
| :---------- | :------- | :----------------------------------------------------------- |
| `chat_type` | String   | `read_ack` 已读回执。                                        |
| `callId`    | String   | `callId` 为每个回调请求的唯一标识，格式为 “App Key_回执消息的消息 ID”。 | 
| `security`  | String   | 签名，格式如下: `MD5（callId+secret+timestamp）`。 Secret 见 [Console 后台回调规则](/product/enable_and_configure_IM.html#配置回调规则)。 |
| `payload`   | object   | 包括：<br/> - `ext`：消息扩展字段<br/> - `ack_message_id`：消息 ID<br/> - `bodies`：消息体内容。 |
| `host`      | String   | 服务器名称。                                                 |
| `appkey`    | String   | 你在环信管理后台注册的应用唯一标识。                         |
| `from`      | String   | 发送已读回执用户 ID。                                        |
| `to`        | String   | 接收已读回执用户 ID。                                        |
| `eventType` | String   | `chat`：单聊。                                               |
| `timestamp` | long     | 到环信 IM 服务器的 Unix 时间戳，单位为 ms。                  |
| `msg_id`    | String   | 该回执消息的消息 ID。                                        |

回调请求示例：

```json
{
    "chat_type": "read_ack",
    "callId": "XXXX#XXXX_968665325555943556",
    "security": "bd63d5fa8f72823e6d33e09a43aa4239",
    "payload": {
        "ext": {},
        "ack_message_id": "968665323572037776",
        "bodies": []
    },
    "host": "msync@ebs-ali-beijing-msync45",
    "appkey": "XXXX#XXXX",
    "from": "1111",
    "to": "2222",
    "eventType": "chat",
    "msg_id": "968665325555943556",
    "timestamp": 1643099771248
}
```