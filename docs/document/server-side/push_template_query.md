# 查询离线推送模板

## 功能说明

查询离线推送模板。

## 调用频率上限

10 次/秒/App ID

## 请求 URL

```http
GET https://{host}/app-id/{app_id}/notification/template/{name}
```

| 参数   | 类型   | 描述                     | 是否必需 |
| :----- | :----- | :----------------------- | :------- |
| `name` | String | 要查询的推送模板的名称。 | 是       |

关于请求 URL 中的参数说明，详见 [请求 URL 参数介绍](overview.html#请求-url)。

## 请求示例

```bash
curl -X GET 'https://XXXX/app-id/{app_id}/notification/template/XXXX' \
-H 'Authorization: Bearer <YourAppToken>'
```

## 请求 header 参数

关于 `Accept` 和 `Authorization` 字段的说明，详见 [请求 header 参数说明](overview.html#请求-header)。

## 响应示例

```json
{
  "uri": "https://XXXX/XXXX/XXXX/notification/template/XXXX",
  "timestamp": 1646989686393,
  "action": "get",
  "data": {
    "name": "test7",
    "createAt": 1646989584124,
    "updateAt": 1646989584124,
    "title_pattern": "你好,{0}",
    "content_pattern": "推送测试,{0}"
  },
  "duration": 11
}
```
## 响应 body 字段

如果返回的 HTTP 状态码为 200，表示请求成功，响应包体中包含以下字段：

| 参数                   | 类型   | 描述                                           |
| :--------------------- | :----- | :--------------------------------------------- |
| `data`                 | JSON   | 推送模板的相关信息。                           |
| `data.name`            | String | 推送模板的名称。                               |
| `data.createAt`        | Number | 创建模板时的 Unix 时间戳，单位为毫秒。         |
| `data.updateAt`        | Number | 最近一次修改模板时的 Unix 时间戳，单位为毫秒。 |
| `data.title_pattern`   | String | 推送模板的自定义标题。                         |
| `data.content_pattern` | String | 推送模板的自定义内容。                         |

响应体中的其他参数说明如下表所示：

| 字段           | 类型   | 描述                        |
| :------------- | :----- | :---------------------- |
| `uri`             | String | 请求 URL。                                                                     |
| `timestamp`       | Long   | Unix 时间戳，单位为毫秒。                                                      |
| `action`          | String | 请求方法。                                                                     |
| `duration`        | Int    | 从发送请求到响应的时长，单位为毫秒。                                           |

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [常见错误码](#错误码) 了解可能的原因。

## 错误码

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [常见错误码](push_error.html) 了解可能的原因。
