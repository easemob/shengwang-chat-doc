# 解禁群组

## 功能说明

- 解除对单个群组的封禁。
- 群组解禁后，群成员可以在该群组以及该群组下的消息话题中发送和接收消息，并进行群组和消息话题管理相关操作。
- 群组解禁后会触发发送后回调，详见 [群组封禁/解禁事件](callback_group_ban.html)。

## 调用频率上限

100 次/秒/App ID

## 请求 URL

```http
POST https://{host}/app-id/{app_id}/chatgroups/{group_id}/enable
```

| 参数     | 类型   | 是否必需 | 描述                                                        |
| :------- | :----- | :------- | :---------------------------------------------------------- |
| `group_id`  | Int    |  是       | 要解禁的群组 ID。 |

关于请求 URL 中的其他参数说明，详见 [请求结构介绍](overview.html#请求结构)。

## 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X POST 'https://XXXX/app-id/{app_id}/chatgroups/XXXX/enable'  \
-H 'Content-Type: application/json'   \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <YourAppToken>' 
```

## 响应示例

```json
{
  "action": "post",
  "data": {
    "disabled": false
  },
  "duration": 22,
  "entities": [],
  "properties": {},
  "timestamp": 1672974668171,
  "uri": "https://XXXX/XXXX/XXXX/chatgroups/XXXX/enable"
}
```

## 响应 body 字段

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中的 `data` 字段说明如下：

| 字段          | 类型 | 描述            |
| :------------ | :--- | :------------------------- |
| `data.disabled` | Bool | 群组是否为禁用状态：<br/> - `true`：群组被禁用；<br/> - `false`：群组为启用状态。 |

其他字段的说明如下：

| 字段          | 类型 | 描述                                                                              |
| :------------ | :--- | :-------------------------------------------------------------------------------- |
| `action`          | String | 请求方法。                                                                     |
| `duration`        | Int    | 从发送请求到响应的时长，单位为毫秒。                                           |
| `entities`        | JSON Array   | 响应实体。                                                                     |
| `properties` | JSON | 开发者无需关注该字段。 |
| `timestamp`       | Long   | Unix 时间戳，单位为毫秒。                                                      |
| `uri`             | String | 请求 URL。                                                                     |

## 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | resource_not_found | grpID XX does not exist! | 群组不存在。 | 使用合法的群 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。
