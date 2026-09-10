# 设置用户全局禁言

## 功能说明

- 设置单个用户 ID 的单聊、群组和/或聊天室消息的全局禁言。
- 设置成功后，该用户将无法在对应的单聊、群组和/或聊天室中发送消息，不会触发 [发送前回调](callback_presending.html)。
- 可设置禁言时长，禁言到期后，服务器会自动解除禁言，恢复该用户发送消息的权限。
- 支持单聊、群组和/或聊天室的永久禁言。

## 开通功能

- 对于专业版 IM，使用用户全局禁言前，你需要在 [声网控制台](https://console.shengwang.cn/overview) 升级至旗舰版。
- 对于旗舰版 IM，用户全局禁言功能默认开启。

## 调用频率上限

100 次/秒/App ID

## 请求 URL

```http
POST https://{host}/app-id/{app_id}/mutes
```

关于请求 URL 中的参数说明，详见 [请求 URL 参数介绍](overview.html#请求-url)。

## 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X POST 'https://XXXX/app-id/{app_id}/mutes' \
-H 'Authorization: Bearer <YourAppToken>' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json'  \
-d '{
    "username": "zs1",
    "chat": 100,
    "groupchat": 100,
    "chatroom": 100
}'
```

## 请求 header 参数

关于 `Content-Type`、`Accept` 和 `Authorization` 字段的说明，详见 [请求 header 参数说明](overview.html#请求-header)。

## 请求 body 参数

| 参数        | 类型   | 是否必需 | 描述   |
| :---------- | :----- | :------- | :----------------------- |
| `username`  | String | 是       | 设置全局禁言的用户 ID。  |
| `chat`      | Int    | 否       | 单聊禁言时长，单位为秒，最大值为 `2147483647`。<br/> - > `0`：该用户 ID 的单聊禁言时长。 <br/> - `0`：取消该用户的单聊禁言。<br/> - `-1`：该用户被设置永久单聊禁言。<br/> - 其他负值无效。 |
| `groupchat` | Int    | 否       | 群组禁言时长，单位为秒，规则同单聊禁言。       |
| `chatroom`  | Int    | 否       | 聊天室禁言时长，单位为秒，规则同单聊禁言。   |

:::tip
`chat`、`groupchat` 和 `chatroom` 三个参数均为可选，若都不传，则请求也会成功，只是不做任何禁言处理。
:::

## 响应示例

```json
{
  "path": "/mutes",
  "uri": "https://XXXX/XXXX/XXXX/mutes",
  "timestamp": 1631609754727,
  "action": "post",
  "data": {
    "result": "ok"
  },
  "duration": 74
}
```

## 响应 body 字段

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段          | 类型   | 描述                                          |
| :------------ | :----- | :-------------------------------------------- |
| `data`               | JSON   | 全局禁言结果。            |
| `data.result` | String | 是否成功设置用户全局禁言。`ok` 表示设置成功。 |

响应体中的其他参数说明如下表所示：

| 字段           | 类型   | 描述                        |
| :------------- | :----- | :---------------------- |
| `path`               | String | 请求路径，属于请求 URL 的一部分，开发者无需关注。       |
| `uri`             | String | 请求 URL。                                                                     |
| `timestamp`       | Long   | Unix 时间戳，单位为毫秒。                                                      |
| `action`          | String | 请求方法。                                                                     |
| `duration`        | Int    | 从发送请求到响应的时长，单位为毫秒。                                           |

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

## 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型  | 错误提示               | 可能原因        | 处理建议        |
| :----- | :---------- | :-------- | :------------------| :------------------------|
| 400         | required_property_not_found        | Entity user requires a property named username    | 用户不存在。  | 先注册用户或者检查用户名是否正确。 |
| 401         | unauthorized                       | Unable to authenticate (OAuth)   | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。              |
| 403 | forbidden_op | user_mute is not used for this app | 未开通全局禁言功能。 | 你需要在 [声网控制台](https://console.shengwang.cn/overview) 的 **套餐包 > 预付费套餐包 > 即时通讯 IM** 页面开通该功能。 |

关于其他错误，你可以参考 [错误码](error.html) 了解可能的原因。
