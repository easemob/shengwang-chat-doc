# 群组和聊天室公告回调事件

## 功能说明

设置或更新群组/聊天室公告后，IM 服务器会按照 [发送后回调规则](callback_postsending.html#回调规则) 向你的 App Server 发送回调请求，App Server 可通过该回调查看公告信息，进行数据同步。

## 前提条件

已在 [声网控制台](https://console.shengwang.cn/overview) 设置发送后回调规则。详见 [配置回调规则](callback_postsending.html#回调规则)。

## 回调时机

- 客户端设置或更新了 [群组](/document/android/group_attributes.html#更新群公告)/[聊天室公告](/document/android/room_attributes.html#更新聊天室公告)。
- 调用 RESTful API 设置/更新了 [群组](/document/server-side/group_announcement_modify.html)/[聊天室公告](/document/server-side/chatroom_announcement_update.html)。

## 回调请求

### 请求示例

```json
{
	"callId": "XXXX#XXXX_b9a9862f-XXXX-XXXX-acf5-8816f0303c7c",
	"security": "de170d1c00XXXX9f294306ec72831d53",
	"payload": {
		"type": "ANNOUNCEMENT",
		"announcement": "公告"
	},
	"id": "262246968131585",
	"type": "GROUP",
	"event": "group_op_event",
	"operation": "UPDATE",
	"operator": "tst",
	"timestamp": 1729496921620
}
```

### 请求字段说明

| 字段名称         | 类型   | 描述                                                         |
| :------------- | :----- | :----------------------------------------------------------- |
| `callId`       | String   | 回调请求的唯一标识。 |
| `security`     | String | 签名，格式如下: `MD5(callId+secret+timestamp)`。[配置回调规则](callback_postsending.html#回调规则) 后，IM 服务器会自动为该规则生成 secret，向你的 App Server 发送数据时会基于该 secret 生成该签名，作为你的服务器识别 IM 服务器的依据。若要使用自定义密钥，可联系声网商务。|
| `paylod`       | Object | 事件内容。                                                     |
|  - `type` | String | 公告更新事件。 | 
|  - `announcement`   | String | 新公告内容。若删除了公告内容，则该字段不存在。 |
| `id`       | String | 群组 ID。                                                 |
| `type`         | String | 区分群组或聊天室事件：<br/> - `GROUP`：群组 <br/> - `CHATROOM` ：聊天室   |
| `event`        | String | 对于群组和聊天室，该参数的值固定为 `group_op_event`。接收方可按此字段区分是否是群组/聊天室操作事件。 | 
| `operation`    | String | 操作。设置或更新群组公告的操作为 `UPDATE`。 |
| `operator`     | String | 操作人。若 app 管理员设置或更新了公告，该参数的值固定为 `@ppAdmin`。 | 
| `timestamp`    | Long   | 操作完成的时间戳。                | 

## 其他说明

**群组操作的事件以及子事件后续会有更多新增。若业务强依赖这些事件或者子事件，业务中需添加对 `operation` 和 `payload.type` 的强判断。**