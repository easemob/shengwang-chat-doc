 # 群组封禁/解禁事件

成功封禁或解禁群组后，声网服务器会按照[发送后回调规则](callback_postsending.html#发送后回调规则)向你的 App Server 发送回调请求，App Server 可通过该回调查看群组封禁或解禁相关信息，进行数据同步。

:::tip
1. 若你当前套餐不支持回调功能，需升级产品套餐。
2. 如果需要群组封禁或解禁的回调事件，你需要在[声网控制台](https://console.shengwang.cn/overview)设置发送后回调规则，详见[配置发送后回调规则](callback_postsending.html#发送后回调规则)。
3. 发送后回调的相关介绍，详见[回调说明](/docs/sdk/server-side/callback_postsending.html)。
:::
 
## 回调时机

[调用 RESTful API 封禁](/docs/sdk/server-side/group_manage.html#封禁群组)或[解禁群组](/docs/sdk/server-side/group_manage.html#解禁群组)时触发该事件。

## 回调请求

### 请求示例

```json
{
	"callId": "XXXX#XXXX_9536cc9b-XXXX-XXXX-affb-8eaf67741180",
	"security": "2106f88ddbaXXXX57c60430493e74dc3",
	"payload": {
		"disable": true,
		"type": "DISABLE"
	},
	"appkey": "XXXX#XXXX",
	"id": "262246968131585",
	"type": "GROUP",
	"event": "group_op_event",
	"operation": "UPDATE",
	"operator": "@ppAdmin",
	"timestamp": 1729497011797
}
```

### 请求字段说明

| 字段名称         | 类型   | 描述                                                         |
| :------------- | :----- | :----------------------------------------------------------- |
| `callId`       | String   | `callId` 为每个回调请求的唯一标识。 | 
| `security`     | String | 签名，格式如下: `MD5（callId+secret+timestamp）`。详见[配置声网控制台回调规则](callback_postsending.html#发送后回调规则)。|
| `paylod`       | Object | 事件内容。                                                     |
|  - `disabled`| Boolean | <br/> - `true`：封禁  <br/> - `false`：解禁 |
|  - `type`   | String | `DISABLE`：封禁或解禁操作。  |
| `id`       | String | 群组 ID。                                                 |
| `type`         | String | 区分群组或聊天室事件。由于聊天室无封禁或解禁事件，本次事件仅对群组有效，因此值只能为 `GROUP`。   |
| `event`        | String | 对于群组和聊天室，该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 | 
| `operation`    | String | 操作。群组封禁或解禁的操作为 `UPDATE`。 |
| `operator`     | String | 操作人。                     | 
| `timestamp`    | Long   | 操作完成的时间戳。                | 

