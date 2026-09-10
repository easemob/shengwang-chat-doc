# 解散群组/聊天室事件 

成功解散群组或聊天室后，声网服务器会按照[发送后回调规则](callback_postsending.html#发送后回调规则)向你的 App Server 发送回调请求，App Server 可通过该回调进行数据同步。

:::tip
1. 若你当前套餐不支持回调功能，需升级产品套餐。
2. 如果需要群组/聊天室解散的回调事件，你需要在[声网控制台](https://console.shengwang.cn/overview)设置发送后回调规则，详见[配置发送后回调规则](callback_postsending.html#发送后回调规则)。
3. 发送后回调的相关介绍，详见[回调说明](/docs/sdk/server-side/callback_postsending.html)。
:::
 
## 回调时机

1. 用户通过客户端解散了群组/聊天室。
2. 用户调用 RESTful API 解散了群组/聊天室。
3. 用户在[声网控制台](https://console.shengwang.cn/overview)删除了群组/聊天室。

## 回调请求

### 请求示例

```json
{
	"callId": "XXXX#XXXX_2e962475-XXXX-XXXX-a90c-d7e2949440f2",
	"security": "4e5d778c77dXXXXab41ed2528594e449",
	"appkey": "XXXX#XXXX",
	"id": "255445981790209",
	"type": "GROUP",
	"event": "group_op_event",
	"operation": "DELETE",
	"operator": "@ppAdmin",
	"timestamp": 1729499587640
}
```

### 请求字段说明

| 字段名称         | 类型   | 描述                                                         |
| :------------- | :----- | :----------------------------------------------------------- |
| `callId`       | String | `callId` 为每个回调请求的唯一标识。 | 
| `security`     | String | 签名，格式如下: `MD5（callId+secret+timestamp）`。详见[配置声网控制台回调规则](callback_postsending.html#发送后回调规则)。|
| `id`           | String | 群组/聊天室 ID。                                                 |
| `type`         | String | 区分群组或聊天室事件：<br/> - `GROUP`：群组 <br/> - `CHATROOM` ：聊天室   |
| `event`        | String | 对于群组和聊天室，该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 | 
| `operation`    | String | 操作。群组/聊天室解散的操作为 `DELETE`。 |
| `operator`     | String | 操作人。                               | 
| `timestamp`    | Long   | 操作完成的时间戳。                      | 
