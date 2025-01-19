# 将群组/聊天室成员加入/移出黑名单事件 

在群组或聊天室中的成员被加入或移出黑名单时，环信服务器会按照[发送后回调规则](/product/enable_and_configure_IM.html#配置回调规则)向你的 App Server 发送回调请求，App Server 可通过该回调查看加入/移出的成员，进行数据同步。

:::tip
1. 你所使用的环信即时通讯 IM 的版本可能需要单独开通回调服务，详见[增值服务说明](/product/pricing.html#增值服务费用)。
2. 如果需要群组/聊天室成员被加入/移出黑名单事件，你需要在[声网控制台](https://console.shengwang.cn/overview)设置发送后回调规则，详见[配置回调规则](/product/enable_and_configure_IM.html#配置回调规则)。
3. 发送后回调的相关介绍，详见[回调说明](/docs/sdk/server-side/callback_postsending.html)。
:::

## 将成员加入黑名单

成员被加入群组/聊天室黑名单后，会被移出群组/聊天室。被移出的回调事件，详见[加入黑名单后退出事件](callback_group_room_leave.html#加入黑名单后退出)。

### 回调时机

1. 客户端将群组或聊天室成员加入黑名单。
2. 调用 RESTful API 将群组或聊天室成员加入黑名单。
3. 在[声网控制台](https://console.shengwang.cn/overview)将群组或聊天室成员添加黑名单。

### 回调请求

#### 请求示例

```json
{
	"callId": "XXXX#XXXX_e2bf62d5-XXXX-XXXX-8664-d011f9d4ccbf",
	"security": "d0b53a5aXXXX3fdf42ca362737983392",
	"payload": {
		"member": [
			"tst02"
		],
		"expire_timestamp": 4638873600000, 
		"type": "ADD"
	},
	"appkey": "XXXX#XXXX",
	"id": "255445981790209",
	"type": "GROUP",
	"event": "group_op_event",
	"operation": "BLOCK",
	"operator": "tst",
	"timestamp": 1729498876236
}

```

#### 请求字段说明

| 字段名称         | 类型   | 描述                                                         |
| :------------- | :----- | :----------------------------------------------------------- |
| `callId`       | String   | `callId` 为每个回调请求的唯一标识，格式为 `App Key_UUID`。 | 
| `security`     | String | 签名，格式如下: `MD5(callId+secret+timestamp)`。详见[配置声网控制台回调规则](/product/enable_and_configure_IM.html#配置回调规则)。|
| `paylod`       | Object | 事件内容。                                                     |
| `payload.member` | Array | 被加入或移出群组/聊天室黑名单的用户 ID。        | 
| `payload.expire_timestamp` | Long | 用户在黑名单中的过期时间。用户加入黑名单后，系统会自动分配该参数的值。  | 
| `payload.type` | String  | 事件类型。`ADD` 表示将用户加入群组/聊天室黑名单。     |
| `appkey`       | String | 你在环信管理后台注册的应用唯一标识。  |
| `id`           | String | 群组/聊天室 ID。                                                 |
| `type`         | String | 区分群组或聊天室事件：<br/> - `GROUP`：群组 <br/> - `CHATROOM` ：聊天室   |
| `event`        | String | 该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 | 
| `operation`    | String | 操作。将用户加入群组/聊天室黑名单的操作为 `BLOCK`。 |
| `operator`     | String | 操作人。若 app 管理员将成员加入黑名单，该参数的值固定为 `@ppAdmin`。                         | 
| `timestamp`    | Long   | 操作完成的时间戳。                | 

## 将成员移出黑名单 

### 回调时机 

1. 通过客户端将成员移出群组/聊天室黑名单。
2. 调用 RESTful API 将成员移出群组/聊天室黑名单。
3. 在[声网控制台](https://console.shengwang.cn/overview)将用户移出群组/聊天室黑名单。

### 回调请求

#### 请求示例

```json
{
	"callId": "XXXX#XXXX_0fb0c3cf-XXXX-XXXX-9eb8-e9b756c83ec4",
	"security": "3c10eae0ec4aXXXX891a85ea974f75ca",
	"payload": {
		"member": [
			"tst07"
		],
		"type": "REMOVE"
	},
	"appkey": "XXXX#XXXX",
	"id": "255445981790209",
	"type": "GROUP",
	"event": "group_op_event",
	"operation": "BLOCK",
	"operator": "@ppAdmin",
	"timestamp": 1729499386434
}
```

#### 请求字段说明

| 字段名称         | 类型   | 描述                                                         |
| :------------- | :----- | :----------------------------------------------------------- |
| `callId`       | String   | `callId` 为每个回调请求的唯一标识，格式为 `App Key_UUID`。 | 
| `security`     | String | 签名，格式如下: `MD5(callId+secret+timestamp)`。详见[配置声网控制台回调规则](/product/enable_and_configure_IM.html#配置回调规则)。|
| `payload`       | Object | 事件内容。                                                     |
| `payload.member` | Array | 被移出群组/聊天室黑名单的用户 ID。        | 
| `payload.type` | Array  | 将用户移出群组/聊天室黑名单的事件，值为 `REMOVE`。     |
| `appkey`       | String | 你在环信管理后台注册的应用唯一标识。  |
| `id`           | String | 群组/聊天室 ID。                                                 |
| `type`         | String | 区分群组或聊天室事件：<br/> - `GROUP`：群组 <br/> - `CHATROOM` ：聊天室   |
| `event`        | String | 对于群组和聊天室，该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 | 
| `operation`    | String | 操作。将用户移出群组/聊天室黑名单的操作为 `BLOCK`。 |
| `operator`     | String | 操作人。若 app 管理员将成员移出黑名单，该参数的值固定为 `@ppAdmin`。                       | 
| `timestamp`    | Long   | 操作完成的时间戳。  | 



