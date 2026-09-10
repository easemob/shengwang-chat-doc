# 群组和聊天室白名单回调事件

## 回调说明

将群组/聊天室成员加入或移出白名单后，IM 服务器会按照 [发送后回调规则](callback_postsending.html#回调规则) 向你的 App Server 发送回调请求，App Server 可通过该回调查看添加或移出白名单的成员，进行数据同步。

## 前提条件

已在 [声网控制台](https://console.shengwang.cn/overview) 设置发送后回调规则。详见 [配置回调规则](callback_postsending.html#回调规则)。

## 将成员加入白名单

### 回调时机

- 客户端将 [群组](/document/android/group_members.html#添加成员到白名单)/[聊天室成员](/document/android/room_members.html#将成员加入聊天室白名单) 加入了白名单。
- 调用 RESTful API 将 [群组](/document/server-side/group_allowlist_add_single.html)/[聊天室成员](/document/server-side/chatroom_allowlist_add_single.html) 加入了白名单。

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
| `callId`       | String | 回调请求的唯一标识。 |
| `security`     | String | 签名，格式如下: `MD5(callId+secret+timestamp)`。[配置回调规则](callback_postsending.html#回调规则) 后，IM 服务器会自动为该规则生成 secret，向你的 App Server 发送数据时会基于该 secret 生成该签名，作为你的服务器识别 IM 服务器的依据。若要使用自定义密钥，可联系声网商务。|
| `payload`       | Object | 事件内容。                                                     |
| `payload.member` | Array   | 被加入白名单的成员的用户 ID。 | 
| `payload.type` | String | 将群组/聊天室成员加入白名单的事件，值为 `ADD`。                                    |
| `id`           | String | 群组/聊天室 ID。                                                |
| `type`         | String | 区分群组或聊天室事件：<br/> - `GROUP`：群组 <br/> - `CHATROOM` ：聊天室     |
| `event`        | String | 对于群组和聊天室，该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 |
| `operation`    | String | 操作。将群组/聊天室成员加入白名单的操作为 `WHITE`。 |
| `operator`     | String | 操作人。                                                       |
| `timestamp`    | Long   | 操作完成的时间戳。若 app 管理员将群组/聊天室成员加入白名单，该参数的值固定为 `@ppAdmin`。  |

## 将成员移出白名单

### 回调时机

1. 客户端将[群组](/document/android/group_members.html#从白名单移除成员)/[聊天室成员](/document/android/room_members.html#将成员移出聊天室白名单列表)移出了白名单。
2. 调用 RESTful API 将 [群组](/document/server-side/group_allowlist_remove.html)/[聊天室成员](/document/server-side/chatroom_allowlist_remove.html) 移出了白名单。

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
| `callId`       | String | 回调请求的唯一标识。 |
| `security`     | String | 签名，格式如下: `MD5(callId+secret+timestamp)`。[配置回调规则](callback_postsending.html#回调规则) 后，IM 服务器会自动为该规则生成 secret，向你的 App Server 发送数据时会基于该 secret 生成该签名，作为你的服务器识别 IM 服务器的依据。若要使用自定义密钥，可联系声网商务。|
| `paylod`       | Object | 事件内容。                                                     |
| `payload.member` | JSON   | 被移出白名单的成员的用户 ID。 | 
| `payload.type` | String | 将群组/聊天室成员移出白名单的事件，值为 `REMOVE`。          |
| `id`           | String | 群组/聊天室 ID。                                                |
| `type`         | String | 区分群组或聊天室事件：<br/> - `GROUP`：群组 <br/> - `CHATROOM` ：聊天室     |
| `event`        | String | 对于群组和聊天室，该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 |
| `operation`    | String | 操作。将群组/聊天室成员移出白名单的操作为 `WHITE`。 |
| `operator`     | String | 操作人。若 app 管理员将群组/聊天室成员移出白名单，该参数的值固定为 `@ppAdmin`。                                                       |
| `timestamp`    | Long   | 操作完成的时间戳。 |

## 其他说明

**群组操作的事件以及子事件后续会有更多新增。若业务强依赖这些事件或者子事件，业务中需添加对`operation` 和 `payload.type` 的强判断。**















