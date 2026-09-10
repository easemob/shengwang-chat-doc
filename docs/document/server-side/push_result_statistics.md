# 查询离线推送结果统计数据

## 功能说明

离线推送服务会产生推送结果消息。即时通讯 IM 支持查询离线推送结果。

## 功能开通

调用该接口前，你需要联系声网商务开通该功能。

## 调用频率上限

10 次/10 秒/App ID

## 请求 URL

```shell
GET https://{host}/app-id/{app_id}/push/data/offline-push/begin/{startTime}/end/{endTime}?platform={ALL}
```

| 参数       | 类型   | 是否必需 | 描述         |
| :--------- | :----- | :------- | :------------------------- |
| `startTime` | String |  是       | 查询数据的开始时间，格式为 yyyy-MM-dd，例如，`2024-04-01`。 |
| `endTime`   | String |  是       | 查询数据的结束时间，格式为 yyyy-MM-dd，例如，`2024-04-02`。 |
| `platform` | enum |  是      | 查询的平台，取值如下：<br/> - （默认）`ALL`：查询所有推送平台的推送统计结果。<br/> - `APNS`：APNs 推送；<br/> - `ANDROID`：FCM 推送；<br/> - `XIAOMIPUSH`：小米推送；<br/> - `HUAWEIPUSH`：华为推送<br/> - `MEIZUPUSH`：魅族推送；<br/> - `OPPOPUSH`：OPPO 推送；<br/> - `VIVOPUSH`：vivo 推送；<br/> - `HONOR`：荣耀推送。|

关于请求 URL 中的参数说明，详见 [请求 URL 参数介绍](overview.html#请求-url)。

## 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token
curl -g -X GET 'https://XXXX/app-id/{app_id}/push/data/offline-push/begin/2024-04-01/end/2024-04-02?platform=ALL' \
-H 'Authorization: Bearer <YourAppToken>
```

## 请求 header 参数

| 参数            | 类型   | 描述        | 是否必需 |
| :-------------- | :----- | :------------------- | :------- |
| `Authorization` | String | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 | 是       |

## 响应示例

```json
{
    "status": "OK",
    "data": {
        "2024-04-02": {
            "HONOR": {
                "successCount": 7218,
                "failCount": 239
            },
            "HUAWEIPUSH": {
                "successCount": 48852,
                "failCount": 1969
            },
            "OPPOPUSH": {
                "successCount": 66226,
                "failCount": 3774
            },
            "VIVOPUSH": {
                "successCount": 42380,
                "failCount": 2189,
                "arriveCount": 40559
            },
            "XIAOMIPUSH": {
                "successCount": 23071
            }
        },
        "2024-04-01": {
            "HONOR": {
                "successCount": 8306,
                "failCount": 1208
            },
            "HUAWEIPUSH": {
                "successCount": 55933,
                "failCount": 1335
            },
            "OPPOPUSH": {
                "successCount": 76026,
                "failCount": 4534
            },
            "VIVOPUSH": {
                "successCount": 52091,
                "failCount": 3042,
                "arriveCount": 49623
            },
            "XIAOMIPUSH": {
                "successCount": 26364
            }
        }
    }
}
```

## 响应 body 字段

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 参数        | 类型   | 描述                                                         |
| :---------- | :----- | :----------------------------------------------------------- |
| `status`  | String | 请求状态。若请求成功，返回 `OK`。 |
| `data`  | JSON | 离线推送结果。 |
| `data.successCount`  | Int | 成功发送的离线推送通知数量。 |
| `data.failCount`  | Int | 发送失败的离线推送通知数量。 |
| `data.arriveCount`  | Int | 送达到接收方的离线推送通知的数量。 |

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

## 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型         | 错误提示       | 可能原因            | 处理建议             |
| :---------- | :--------------- | :------------------ | :-------------- | :--------------- |
| 403         | forbidden_op     |        | 查询离线推送结果统计的功能未开通。                               | 联系商务经理开通该功能。                                     |
| 401         | unauthorized     | Unable to authenticate (OAuth)                               | token 不合法，可能过期或 token 错误。                        | 使用新的 token 访问。                                        |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。
