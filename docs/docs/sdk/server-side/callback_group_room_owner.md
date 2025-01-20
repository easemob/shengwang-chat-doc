# 变更群主/聊天室所有者事件

成功变更群主或聊天室所有者后，声网服务器会按照[发送后回调规则](callback_postsending.html#发送后回调规则)向你的 App Server 发送回调请求，App Server 可通过该回调查看新群主信息，进行数据同步。

:::tip
1. 若你当前套餐不支持回调功能，需升级产品套餐。
2. 如果需要变更群主或聊天室所有者的回调事件，你需要在[声网控制台](https://console.shengwang.cn/overview)设置发送后回调规则，详见[配置发送后回调规则](callback_postsending.html#发送后回调规则)。
3. 发送后回调的相关介绍，详见[回调说明](/docs/sdk/server-side/callback_postsending.html)。
:::
 
## 回调时机

1. 通过客户端变更了群主/聊天室所有者。
2. 调用 RESTful API 变更了群主/聊天室所有者。

## 回调请求

### 请求示例

以下以变更群主的事件为例进行介绍，变更聊天室所有者的字段与其相同。

```json
{
	"callId": "XXXX#XXXX_f8349be2-XXXX-XXXX-96e9-7a3802ef85c8",
	"security": "5ed7072a9XXXX57c2633fe674faaf71",
	"payload": {
		"owner": "tst",
		"new_owner": "tst01",
		"type": "OWNER"
	},
	"appkey": "XXXX#XXXX",
	"id": "262246968131585",
	"type": "GROUP",
	"event": "group_op_event",
	"operation": "UPDATE",
	"operator": "@ppAdmin",
	"timestamp": 1729497333975
}

```

### 请求字段说明

以下以变更群主的事件为例进行字段介绍，变更聊天室所有者的字段与其相同。

| 字段名称         | 类型   | 描述                                                         |
| :------------- | :----- | :----------------------------------------------------------- |
| `callId`       | String   | `callId` 为每个回调请求的唯一标识。 | 
| `security`     | String | 签名，格式如下: `MD5（callId+secret+timestamp）`。详见[配置声网控制台回调规则](callback_postsending.html#发送后回调规则)。|
| `payload`       | Object | 事件内容。                                                     |
|  - `owner`| String | 原群主。 |
|  - `new_owner`   | String | 新群主。 |
|  - `type`   | String | 值为 `OWNER`，表示操作类型为变更群主。 |
| `id`       | String | 群组/聊天室 ID。                                                 |
| `type`         | String | 区分群组或聊天室事件：<br/> - `GROUP`：群组 <br/> - `CHATROOM` ：聊天室   |
| `event`        | String | 对于群组和聊天室，该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 | 
| `operation`    | String | 操作。变更群主的操作为 `UPDATE`。 |
| `operator`     | String | 操作人。                      | 
| `timestamp`    | Long   | 操作完成的时间戳。             | 
