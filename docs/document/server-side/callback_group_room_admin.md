# 群组和聊天室管理员变更回调事件

## 功能说明

成功添加或删除群组或聊天室管理员后，IM 服务器会按照 [发送后回调规则](callback_postsending.html#回调规则) 向你的 App Server 发送回调请求，App Server 可通过该回调查看添加/删除的群组/聊天室管理员，进行数据同步。

## 前提条件

已在 [声网控制台](https://console.shengwang.cn/overview) 设置发送后回调规则。详见 [配置回调规则](callback_postsending.html#回调规则)。

## 添加管理员
 
### 回调时机

- 客户端添加了 [群组](/document/android/group_members.html#添加群管理员)/[聊天室管理员](/document/android/room_members.html#添加聊天室管理员)。
- 调用 RESTful API 添加了 [群组](/document/server-side/group_admin_add.html)/[聊天室管理员](/document/server-side/chatroom_admin_add.html)。
- 在 [声网控制台](https://console.shengwang.cn/overview) 上添加了群组/聊天室管理员。 

### 回调请求

#### 请求示例

以下以添加群管理员的事件为例进行介绍，添加聊天室管理员的字段与其相同。

```json
{
	"callId": "XXXX#XXXX_c74187f1-XXXX-XXXX-87cd-0c5607b777ce",
	"security": "7a219f7d318dbXXXX163aebe845018e1",
	"payload": {
		"admin": [
			"tst028"
		],
		"type": "ADD"
	},
	"id": "259794904612865",
	"type": "GROUP",
	"event": "group_op_event",
	"operation": "ADMIN",
	"operator": "tst01",
	"timestamp": 1729499145684
}
```

#### 请求字段说明

| 字段名称         | 类型   | 描述                                                         |
| :------------- | :----- | :----------------------------------------------------------- |
| `callId`       | String | 回调请求的唯一标识。 |
| `security`     | String | 签名，格式如下: `MD5(callId+secret+timestamp)`。[配置回调规则](callback_postsending.html#回调规则) 后，IM 服务器会自动为该规则生成 secret，向你的 App Server 发送数据时会基于该 secret 生成该签名，作为你的服务器识别 IM 服务器的依据。若要使用自定义密钥，可联系声网商务。|
| `payload`       | Object | 事件内容。                                                     |
| `payload.admin`| JSON   | 添加为群组/聊天室管理员的用户 ID。 | 
| `payload.type` | String | 添加群组/聊天室管理员的事件，值为 `ADD`。  | 
| `id`           | String | 群组/聊天室 ID。                                                 |
| `type`         | String | 区分群组或聊天室事件：<br/> - `GROUP`：群组 <br/> - `CHATROOM` ：聊天室     |
| `event`        | String | 对于群组和聊天室，该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 |
| `operation`    | String | 操作。添加群组/聊天室管理员的操作为 `ADMIN`。 |
| `operator`     | String | 操作人。若 app 管理员添加了管理员，该参数的值固定为 `@ppAdmin`。        |
| `timestamp`    | Long   | 操作完成的时间戳。      | 


## 删除管理员
 
### 回调时机

- 客户端删除了 [群组](/document/android/group_members.html#移除群管理员)/[聊天室管理员](/document/android/room_members.html#移除聊天室管理员)。
- 调用 RESTful API 删除了 [群组](/document/server-side/group_delete.html)/[聊天室管理员](/document/server-side/chatroom_delete.html)。

### 回调请求

#### 请求示例

以下以删除群管理员的事件为例进行介绍，删除聊天室管理员的字段与其相同。

```json
{
	"callId": "XXXX#XXXX_350defcb-XXXX-XXXX-8235-a0873b63ae26",
	"security": "cb8a62aXXXXacda7a1b781b85ff547a4",
	"payload": {
		"admin": [
			"tst01"
		],
		"type": "REMOVE"
	},
	"id": "255445981790209",
	"type": "GROUP",
	"event": "group_op_event",
	"operation": "ADMIN",
	"operator": "tst",
	"timestamp": 1729499013517
}
```

#### 请求字段说明

| 字段名称         | 类型   | 描述                                                         |
| :------------- | :----- | :----------------------------------------------------------- |
| `callId`       | String | 回调请求的唯一标识。 |
| `security`     | String | 签名，格式如下: `MD5(callId+secret+timestamp)`。[配置回调规则](callback_postsending.html#回调规则) 后，IM 服务器会自动为该规则生成 secret，向你的 App Server 发送数据时会基于该 secret 生成该签名，作为你的服务器识别 IM 服务器的依据。若要使用自定义密钥，可联系声网商务。|
| `payload`       | Object | 事件内容。                                                     |
| `payload.admin`| JSON   | 被移除的群组/聊天室管理员的用户 ID。 | 
| `payload.type` | String | 移除群组/聊天室管理员的事件，值为 `REMOVE`。    | 
| `id`           | String | 群组/聊天室 ID。                                                 |
| `type`         | String | 区分群组或聊天室事件：<br/> - `GROUP`：群组 <br/> - `CHATROOM` ：聊天室     |
| `event`        | String | 对于群组和聊天室，该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 |
| `operation`    | String | 操作。移除群组/聊天室管理员的操作为 `ADMIN`。 |
| `operator`     | String | 操作人。若 app 管理员移除了管理员，该参数的值固定为 `@ppAdmin`。         |
| `timestamp`    | Long   | 操作完成的时间戳。      | 

## 其他说明

**群组操作的事件以及子事件后续会有更多新增。若业务强依赖这些事件或者子事件，业务中需添加对`operation` 和 `payload.type` 的强判断。**







