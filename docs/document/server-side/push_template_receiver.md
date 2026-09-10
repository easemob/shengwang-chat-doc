# 接收方配置模板名称

## 功能说明

接收方可以调用该 API 设置推送模板。

## 调用频率上限

100 次/秒/App ID

## 请求 URL

```http
PUT https://{host}/app-id/{app_id}/users/{userId}/notification/template
```

| 参数       | 类型   | 描述          | 是否必需 |
| :--------- | :----- | :--------------------------------- | :------- |
| `userId` | String | 当前用户的用户 ID。    | 是       | 

关于请求 URL 中的参数说明，详见 [请求 URL 参数介绍](overview.html#请求-url)。

## 请求示例

```shell
curl -X PUT 'https://XXXX/app-id/{app_id}/users/XXXX/notification/template' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <YourUserToken>' \
-d '{    
  "templateName": "hxtest"
 }
```

## 请求 header 参数

关于 `Content-Type` 和 `Authorization` 字段的说明，详见 [请求 header 参数说明](overview.html#请求-header)。

## 请求 body 参数

| 参数       | 类型   | 是否必需 | 描述          |
| :--------- | :----- | :------- | :------------ |
| `templateName` | String | 是   | 模板名称。| 

## 响应示例

```json
{
    "path": "/users",
    "uri": "http://XXX/XXX/XXX/users/XXX/notification/template",
    "timestamp": 1705470003984,
    "action": "put",
    "data": {
        "templateName": "hxtest"
    },
    "duration": 43
}
```


## 响应 body 字段

如果返回的 HTTP 状态码为 200，表示请求成功，响应包体中 `data` 字段说明如下：

| 参数           | 类型   | 描述           |
| :------------- | :----- | :------------- |
| `data`         | JSON   | 响应数据。     |
| `data.templateName` | String | 模板名称。     |

响应体中的其他参数说明如下表所示：

| 字段           | 类型   | 描述                        |
| :------------- | :----- | :---------------------- |
| `path`               | String | 请求路径，属于请求 URL 的一部分，开发者无需关注。       |
| `uri`             | String | 请求 URL。                                                                     |
| `timestamp`       | Long   | Unix 时间戳，单位为毫秒。                                                      |
| `action`          | String | 请求方法。                                                                     |
| `duration`        | Int    | 从发送请求到响应的时长，单位为毫秒。                                           |

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

## 错误码

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [常见错误码](push_error.html) 了解可能的原因。
