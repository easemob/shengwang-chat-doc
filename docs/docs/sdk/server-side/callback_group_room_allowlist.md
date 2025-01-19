# 将群组/聊天室成员加入或移出白名单的事件

将群组/聊天室成员加入或移出白名单后，环信服务器会按照[发送后回调规则](/product/enable_and_configure_IM.html#配置回调规则)向你的 App Server 发送回调请求，App Server 可通过该回调查看添加或移出白名单的成员，进行数据同步。

:::tip
1. 你所使用的环信即时通讯 IM 的版本可能需要单独开通回调服务，详见[增值服务说明](/product/pricing.html#增值服务费用)。
2. 如果需要将群组/聊天室成员加入或移出白名单的事件，你需要在[声网控制台](https://console.shengwang.cn/overview)设置发送后回调规则，详见[配置回调规则](/product/enable_and_configure_IM.html#配置回调规则)。
3. 发送后回调的相关介绍，详见[回调说明](/docs/sdk/server-side/callback_postsending.html)。
:::

## 将成员加入白名单

### 回调时机

1. 客户端将群组/聊天室成员加入白名单。
2. 调用 RESTful API 将群组/聊天室成员加入白名单。

### 回调请求

#### 请求示例

```json
{
	"callId": "XXXX#XXXX_763084e9-XXXX-XXXX-b550-9196e3163b6b",
	"security": "8131be530aXXXX9108ee0411958b91b9",
	"payload": {
		"member": [
			"tst01"
		],
		"type": "ADD"
	},
	"appkey": "XXXX#XXXX",
	"id": "255445981790209",
	"type": "GROUP",
	"event": "group_op_event",
	"operation": "WHITE",
	"operator": "@ppAdmin",
	"timestamp": 1729499291465
}
```

#### 请求字段说明

| 字段名称         | 类型   | 描述                                                         |
| :------------- | :----- | :----------------------------------------------------------- |
| `callId`       | String | `callId` 为每个回调请求的唯一标识，格式为 `App Key_UUID`。      |
| `security`     | String | 签名，格式如下: `MD5(callId+secret+timestamp)`。详见[配置声网控制台回调规则](/product/enable_and_configure_IM.html#配置回调规则)。|
| `payload`       | Object | 事件内容。                                                     |
| `payload.member` | Array   | 被加入白名单的成员的用户 ID。 | 
| `payload.type` | String | 将群组/聊天室成员加入白名单的事件，值为 `ADD`。                                    |
| `appkey`       | String | 你在环信管理后台注册的应用唯一标识。                           |
| `id`           | String | 群组/聊天室 ID。                                                |
| `type`         | String | 区分群组或聊天室事件：<br/> - `GROUP`：群组 <br/> - `CHATROOM` ：聊天室     |
| `event`        | String | 对于群组和聊天室，该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 |
| `operation`    | String | 操作。将群组/聊天室成员加入白名单的操作为 `WHITE`。 |
| `operator`     | String | 操作人。                                                       |
| `timestamp`    | Long   | 操作完成的时间戳。若 app 管理员将群组/聊天室成员加入白名单，该参数的值固定为 `@ppAdmin`。  |

## 将成员移出白名单

### 回调时机

1. 客户端将群组/聊天室成员移出白名单。
2. 调用 RESTful API 将群组/聊天室成员移出白名单。

### 回调请求

#### 请求示例

```json
{
	"callId": "XXXX#XXXX_7907fe50-15c1-493e-9774-4a628c050fc9",
	"security": "2f73f64eXXXX1f86e9db9ab6ffe746f4",
	"payload": {
		"member": [
			"tst01",
			"tst02"
		],
		"type": "REMOVE"
	},
	"appkey": "XXXX#XXXX",
	"id": "255445981790209",
	"type": "GROUP",
	"event": "group_op_event",
	"operation": "WHITE",
	"operator": "@ppAdmin",
	"timestamp": 1729499336703
}
```

#### 请求字段说明

| 字段名称         | 类型   | 描述                                                         |
| :------------- | :----- | :----------------------------------------------------------- |
| `callId`       | String | `callId` 为每个回调请求的唯一标识，格式为 `App Key_UUID`。      |
| `security`     | String | 签名，格式如下: `MD5(callId+secret+timestamp)`。详见[配置声网控制台回调规则](/product/enable_and_configure_IM.html#配置回调规则)。|
| `paylod`       | Object | 事件内容。                                                     |
| `payload.member` | JSON   | 被移出白名单的成员的用户 ID。 | 
| `payload.type` | String | 将群组/聊天室成员移出白名单的事件，值为 `REMOVE`。          |
| `appkey`       | String | 你在环信管理后台注册的应用唯一标识。                           |
| `id`           | String | 群组/聊天室 ID。                                                |
| `type`         | String | 区分群组或聊天室事件：<br/> - `GROUP`：群组 <br/> - `CHATROOM` ：聊天室     |
| `event`        | String | 对于群组和聊天室，该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 |
| `operation`    | String | 操作。将群组/聊天室成员移出白名单的操作为 `WHITE`。 |
| `operator`     | String | 操作人。若 app 管理员将群组/聊天室成员移出白名单，该参数的值固定为 `@ppAdmin`。                                                       |
| `timestamp`    | Long   | 操作完成的时间戳。 |















