# 获取群组公告

## 功能说明

获取指定群组 ID 的群组公告。

## 调用频率上限

100 次/秒/App ID

## 请求 URL

```http
GET https://{host}/app-id/{app_id}/chatgroups/{group_id}/announcement
```

| 参数     | 类型   | 是否必需 | 描述                                                        |
| :------- | :----- | :------- | :---------------------------------------------------------- |
| `group_id`  | Int    |  是       | 要获取公告的群组 ID。 |

关于请求 URL 中的参数说明，详见 [请求 URL 参数介绍](overview.html#请求-url)。

## 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X GET 'https://XXXX/app-id/{app_id}/chatgroups/6XXXX7/announcement'   \
-H 'Content-Type: application/json'  \
-H 'Accept: application/json'   \
-H 'Authorization: Bearer <YourAppToken>' 
```

## 请求 Header 参数

关于 `Content-Type`、`Accept` 和 `Authorization` 字段的说明，详见 [请求 Header 参数说明](overview.html#请求-header)。

## 响应示例

```json
{
  "action": "get",
  "uri": "https://XXXX/XXXX/XXXX/chatgroups/6XXXX7/announcement",
  "entities": [],
  "data": {
    "announcement": "群组公告..."
  },
  "timestamp": 1542363546590,
  "duration": 0
}
```

## 响应 body 字段

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中 `data` 字段的说明如下表所示：

| 字段                | 类型   | 描述         |
| :------------------ | :----- | :----------- |
| `data.announcement` | String | 群公告内容。 |

其他字段的描述如下表所示：

| 字段              | 类型   | 描述                                                    |
| :---------------- | :----- | :------------------------------------------------------ |
| `action`          | String | 请求方法。                                                                     |
| `uri`             | String | 请求 URL。                                                                     |
| `entities`        | JSON Array   | 响应实体。                                                                     |
| `timestamp`       | Long   | Unix 时间戳，单位为毫秒。                                                      |
| `duration`        | Int    | 从发送请求到响应的时长，单位为毫秒。                                           |

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

## 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | resource_not_found | grpID XX does not exist! | 群组不存在。 | 使用合法的群 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。
