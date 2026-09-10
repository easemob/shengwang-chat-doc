# 强制用户从单设备下线

## 功能说明

- 如果用户在多个设备上登录，你可以调用该接口强制其在某一台设备上下线。
- 若强制用户从所有设备下线，可以调用 [强制用户下线](account_offline_forced.html) 接口。

## 调用频率上限

该 API、用户账户管理的其他接口、以及离线推送的相关接口的总调用频率上限为 100 次/秒/App ID，详见 [接口频率限制文档](limitationapi.html#用户体系管理)。

## 请求 URL

```http
DELETE https://{host}/app-id/{app_id}/users/{username}/disconnect/{resourceId}
```

| 参数       | 类型     | 描述               |
|:---------|:-------|:-----------------|
| `username` | String | 要将哪个用户从指定设备下线。|
| `resourceId` | String | 要将用户从哪个设备下线，即用户已登录设备的资源 ID，即服务器分配给每个设备资源的唯一标识符。资源 ID 的格式为 `{device type}_{resource ID}`，其中设备类型 `device type` 可以是 `android`、`ios` 或 `web`，`resource ID` 由 SDK 分配。例如，`android_123423453246`。|

关于请求 URL 中的参数说明，详见 [请求 URL 参数介绍](overview.html#请求-url)。

## 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token 
curl -X DELETE 'https://XXX/XXX/XXX/users/{username}/disconnect/{resourceId}'  \
-H 'Accept: application/json'   \
-H 'Authorization: Bearer <YourAppToken>' 
```

## 请求 header 参数

关于 `Accept` 和 `Authorization` 字段的说明，详见 [请求 header 参数说明](overview.html#请求-header)。

## 响应示例

```json
{
    "uri": "https://XXX/XXX/XXX",
    "timestamp": 1709865422596,
    "entities": [],
    "action": "delete",
    "data": {
        "result": true
    },
    "duration": 0
}
```

## 响应 body 字段

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中的 `data` 字段说明如下：

| 字段     | 类型 | 描述               |
| :------- | :--- | :----------------- |
| `result` | Bool  | 用户是否已被强制从该设备下线：<br/> - `true`：是；<br/> - `false`：否。|

响应体中的其他参数说明如下表所示：

| 字段           | 类型   | 描述                        |
| :------------- | :----- | :---------------------- |
| `uri`             | String | 请求 URL。                                                                     |
| `timestamp`       | Long   | Unix 时间戳，单位为毫秒。                                                      |
| `action`          | String | 请求方法。                                                                     |
| `entities`        | JSON Array   | 响应实体。                                                                     |
| `duration`        | Int    | 从发送请求到响应的时长，单位为毫秒。                                           |

## 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型  | 错误提示    | 可能原因     | 处理建议   |
| :---------- | :-------| :------| :---------| :------------------|
| 401  | unauthorized    | Unable to authenticate (OAuth)   | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。    |
| 404  | organization_application_not_found | Could not find application for XXX/XXX from URI: XXX/XXX/users | App ID 不存在。 | 检查 App ID 是否正确或 [创建项目并开通 IM](/product/enable_im.html#_2-开通即时通讯-im-服务) 。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。
