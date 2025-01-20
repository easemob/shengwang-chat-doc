# 群组/聊天室成员离开事件 

在群组或聊天室中的成员离开时，包括主动退出、被踢出以及被加入群组/聊天室黑名单时退出，声网服务器会按照[发送后回调规则](callback_postsending.html#发送后回调规则)向你的 App Server 发送回调请求，App Server 可通过该回调查看离开的成员，进行数据同步。

:::tip
1. 若你当前套餐不支持回调功能，需升级产品套餐。
2. 如果需要群组/聊天室成员离开的回调事件，你需要在[声网控制台](https://console.shengwang.cn/overview)设置发送后回调规则，详见[配置发送后回调规则](callback_postsending.html#发送后回调规则)。
3. 发送后回调的相关介绍，详见[回调说明](/docs/sdk/server-side/callback_postsending.html)。
:::

## 主动退出

### 回调时机

1. 通过客户端主动退出群组/聊天室。
2. 由于网络等原因，用户离线 2 分钟后退出聊天室。

### 回调请求

以下以主动退出群组的事件为例进行介绍，聊天室的字段与其相同。

#### 请求示例

```json
{
	"callId": "XXXX#XXXX_e90431f3-XXXX-XXXX-9bbb-231c371c7acb",
	"security": "e452d25366abXXXX2138fffa4b06726a",
	"payload": {
		"member": [
			"tst"
		],
		"type": "QUIT"
	},
	"appkey": "XXXX#XXXX",
	"id": "261958837272578",
	"type": "GROUP",
	"event": "group_op_event",
	"operation": "LEAVE",
	"operator": "tst",
	"timestamp": 1729497862844
}
```

#### 请求字段说明

| 字段名称         | 类型   | 描述                                                         |
| :------------- | :----- | :----------------------------------------------------------- |
| `callId`       | String   | `callId` 为每个回调请求的唯一标识。 | 
| `security`     | String | 签名，格式如下: `MD5（callId+secret+timestamp）`。详见[配置声网控制台回调规则](callback_postsending.html#发送后回调规则)。|
| `payload`       | Object | 事件内容。                                                     |
| `payload.member` | JSON | 退出群组/聊天室的用户 ID。        | 
| `payload.type` | Array  | 退群方式：`QUIT` 表示主动退出群组或聊天室或者因离线退出聊天室。     |
| `id`           | String | 群组/聊天室 ID。                                                 |
| `type`         | String | 区分群组或聊天室事件：<br/> - `GROUP`：群组 <br/> - `CHATROOM` ：聊天室   |
| `event`        | String | 对于群组和聊天室，该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 | 
| `operation`    | String | 操作。用户主动退出群组/聊天室的操作为 `LEAVE`。 |
| `operator`     | String | 操作人。                     | 
| `timestamp`    | Long   | 操作完成的时间戳。             | 

## 被踢

### 回调时机 

1. 通过客户端将用户踢出群组/聊天室。
2. 调用 RESTful API 将用户踢出群组/聊天室。
3. 在[声网控制台](https://console.shengwang.cn/overview)将用户踢出群组/聊天室。

### 回调请求

#### 请求示例

```json
{
	"callId": "XXXX#XXXX_3667067f-ac06-XXXX-96aa-a9a708c3b361",
	"security": "b77b545b538XXXXbb72e4cf2395050c3",
	"payload": {
		"member": [
			"tst01"
		],
		"type": "KICK"
	},
	"appkey": "XXXX#XXXX",
	"id": "254636824002561",
	"type": "GROUP",
	"event": "group_op_event",
	"operation": "LEAVE",
	"operator": "tst",
	"timestamp": 1729497896834
}
```

#### 请求字段说明

| 字段名称         | 类型   | 描述                                                         |
| :------------- | :----- | :----------------------------------------------------------- |
| `callId`       | String   | `callId` 为每个回调请求的唯一标识。 | 
| `security`     | String | 签名，格式如下: `MD5（callId+secret+timestamp）`。详见[配置声网控制台回调规则](callback_postsending.html#发送后回调规则)。|
| `payload`       | Object | 事件内容。                                                     |
| `payload.member` | JSON | 被踢出群组/聊天室的用户 ID。        | 
| `payload.type` | Array  | 退群方式：`KICK` 表示将用户踢出群组/聊天室。     |
| `id`           | String | 群组/聊天室 ID。                                                 |
| `type`         | String | 区分群组或聊天室事件：<br/> - `GROUP`：群组 <br/> - `CHATROOM` ：聊天室   |
| `event`        | String | 对于群组和聊天室，该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 | 
| `operation`    | String | 操作。将用户踢出群组/聊天室的操作为 `LEAVE`。 |
| `operator`     | String | 操作人。                     | 
| `timestamp`    | Long   | 操作完成的时间戳。             | 


## 加入黑名单后退出

### 回调时机 

1. 通过客户端将用户加入群组/聊天室黑名单时退出群组/聊天室。
2. 调用 RESTful API 将用户加入群组/聊天室黑名单时退出群组/聊天室。
3. 在[声网控制台](https://console.shengwang.cn/overview)将用户加入群组/聊天室黑名单时退出群组/聊天室。

### 回调请求

#### 请求示例

```json
{
	"callId": "XXXX#XXX_7dc24fac-3451-421e-a8aa-70ba0587e69d",
	"security": "9b30e4c2bXXXXcd51ef730836d427965",
	"payload": {
		"member": [
			"tst02"
		],
		"type": "BLOCK"
	},
	"appkey": "XXXX#XXX",
	"id": "255445981790209",
	"type": "GROUP",
	"event": "group_op_event",
	"operation": "LEAVE",
	"operator": "tst",
	"timestamp": 1729498876236
}
```

#### 请求字段说明

| 字段名称         | 类型   | 描述                                                         |
| :------------- | :----- | :----------------------------------------------------------- |
| `callId`       | String   | `callId` 为每个回调请求的唯一标识。 | 
| `security`     | String | 签名，格式如下: `MD5（callId+secret+timestamp）`。详见[配置声网控制台回调规则](callback_postsending.html#发送后回调规则)。|
| `payload`       | Object | 事件内容。                                                     |
| `payload.member` | JSON | 被加入群组/聊天室黑名单后离开的用户 ID。        | 
| `payload.type` | Array  | 退群方式：`BLOCK` 表示加入群组/聊天室黑名单后离开群组/聊天室。     |
| `id`           | String | 群组/聊天室 ID。                                                 |
| `type`         | String | 区分群组或聊天室事件：<br/> - `GROUP`：群组 <br/> - `CHATROOM` ：聊天室   |
| `event`        | String | 对于群组和聊天室，该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 | 
| `operation`    | String | 操作。将用户踢出群组/聊天室的操作为 `LEAVE`。 |
| `operator`     | String | 操作人。                     | 
| `timestamp`    | Long   | 操作完成的时间戳。                | 
