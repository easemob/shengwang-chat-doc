# 添加用户至黑名单

## 功能说明

- 将一个或多个用户添加到黑名单。
- 用户黑名单服务限制用户之间通过客户端发送单聊消息。
- 用户可以将任何其他用户添加到黑名单列表，无论该用户是否是好友。
- 每个用户的黑名单人数上限为 500。
- 好友被加入黑名单后仍在好友列表上显示。
- 调用该接口会触发拉黑用户的发送后回调事件，详见 [回调事件文档](callback_contact.html#拉黑用户)。

## 调用频率上限  

100 次/秒/App ID

## 请求 URL

```http
POST https://{host}/app-id/{app_id}/users/{owner_username}/blocks/users
```

| 参数             | 类型   | 是否必需 | 描述                |
| :--------------- | :----- | :------- | :------------------ |
| `owner_username` | String | 是       | 添加到哪个用户的黑名单。 |

关于请求 URL 中的其他参数说明，详见 [请求 URL 参数介绍](overview.html#请求-url)。

## 请求示例

```shell
curl -X POST 'https://XXXX/app-id/{app_id}/users/user1/blocks/users'  \
-H 'Content-Type: application/json'  \
-H 'Accept: application/json'  \
-H 'Authorization: Bearer <YourAppToken>'  \
-d '{
   "usernames": [
     "user2"
   ]
 }' 
```

## 请求 header 参数

关于 `Content-Type`、`Accept` 和 `Authorization` 字段的说明，详见 [请求 header 参数说明](overview.html#请求-header)。

## 请求 body 参数

| 参数        | 类型  | 是否必需 | 描述                                             |
| :---------- | :---- | :------- | :----------------------------------------------- |
| `usernames` | Array | 是       | 要加入黑名单的用户 ID，例如 ["user1", "user2"]。 |

## 响应示例

```json
{
  "action": "post",
  "uri": "https://XXXX.com/XXXX/testapp",
  "entities": [],
  "data": ["user2"],
  "timestamp": 1542600372046,
  "duration": 11
}
```

## 响应 body 字段

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中 `data` 字段的说明如下：

| 字段   | 类型  | 描述                    |
| :----- | :---- | :---------------------- |
| `data` | Array | 添加至黑名单的用户 ID。 |

其他字段的说明如下：

| 字段   | 类型  | 描述                    |
| :----- | :---- | :---------------------- |
| `action`             | String | 请求方法。                                   |
| `uri`                | String | 请求 URL。                |
| `entities`           | Array | 响应实体。                                                      |
| `timestamp`       | Long   | Unix 时间戳，单位为毫秒。                                                      |
| `duration`        | String | 请求响应时间，单位为毫秒。                                                     |

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

## 错误码

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | service_resource_not_found | Service resource not found | 要添加或被添加的用户 ID 不存在。 | 检查添加和被添加的用户 ID 是否存在。 | 
