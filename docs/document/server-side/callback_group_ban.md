# 群组封禁状态变更回调事件

## 回调说明

成功封禁或解禁群组后，IM 服务器会按照 [发送后回调规则](callback_postsending.html#回调规则) 向你的 App Server 发送回调请求，App Server 可通过该回调查看群组封禁或解禁相关信息，进行数据同步。

## 前提条件

已在 [声网控制台](https://console.shengwang.cn/overview) 设置发送后回调规则。详见 [配置回调规则](callback_postsending.html#回调规则)。
 
## 回调时机

[调用 RESTful API 封禁](/document/server-side/group_ban.html)或 [解禁了群组](/document/server-side/group_unban.html) 时触发该事件。

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
| `callId`       | String   | 回调请求的唯一标识。 |
| `security`     | String | 签名，格式如下: `MD5（callId+secret+timestamp）`。[配置回调规则](callback_postsending.html#回调规则) 后，IM 服务器会自动为该规则生成 secret，向你的 App Server 发送数据时会基于该 secret 生成该签名，作为你的服务器识别 IM 服务器的依据。若要使用自定义密钥，可联系声网商务。|
| `paylod`       | Object | 事件内容。                                                     |
|  - `disabled`| Boolean | <br/> - `true`：封禁  <br/> - `false`：解禁 |
|  - `type`   | String | `DISABLE`：封禁或解禁操作。  |
| `id`       | String | 群组 ID。                                                 |
| `type`         | String | 区分群组或聊天室事件。由于聊天室无封禁或解禁事件，本次事件仅对群组有效，因此值只能为 `GROUP`。   |
| `event`        | String | 对于群组和聊天室，该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 | 
| `operation`    | String | 操作。群组封禁或解禁的操作为 `UPDATE`。 |
| `operator`     | String | 操作人。                     | 
| `timestamp`    | Long   | 操作完成的时间戳。                | 

## 其他说明

**群组操作的事件以及子事件后续会有更多新增。若业务强依赖这些事件或者子事件，业务中需添加对`operation` 和 `payload.type` 的强判断。**


