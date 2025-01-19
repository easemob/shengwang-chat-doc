# 在线状态（Presence）订阅

<Toc />

在线状态（Presence）表示用户的当前状态信息。除了即时通讯 IM 内置的在线和离线状态，你还可以添加自定义在线状态，例如忙碌、马上回来、离开、接听电话、外出就餐等。**若你当前套餐不支持该功能，需升级产品套餐。**

本文展示如何调用声网即时通讯 RESTful API 实现用户在线状态（Presence）订阅，包括设置用户在线状态信息、批量订阅和获取在线状态、取消订阅以及查询订阅列表。

关于用户的在线、离线和自定义状态的定义，详见[用户在线状态管理](product_user_presence.html)。

## 公共参数

以下表格列举了即时通讯 RESTful API 的公共请求参数和响应参数：

### 请求参数

| 参数       | 类型   | 是否必需 | 描述   |
| :--------- | :----- | :------- | :------------------ |
| `host`     | String | 是       | 即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `app_id`     | String | 是       | 声网为每个项目自动分配的 App ID，作为项目唯一标识。 | 
| `username`      | String | 是 |用户在即时通讯服务器上的唯一 ID。                            | 

## 前提条件

要调用声网即时通讯 RESTful API，请确保满足以下要求：

- 产品套餐包支持 Presence 功能。
- 已从服务端获取 app token，详见 [使用 Token 鉴权](token_authentication.html)。
- 了解即时通讯 IM API 的调用频率限制，详见 [接口频率限制](limitationapi.html)。

## 认证方式

即时通讯 IM RESTful API 要求 Bearer HTTP 认证。每次发送 HTTP 请求时，都必须在请求头部填入如下 `Authorization` 字段：

`Authorization: Bearer YourAppToken`

为提高项目的安全性，声网使用 Token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 RESTful API 推荐使用 app token 的 鉴权方式，详见 [使用 Token 鉴权](token_authentication.html)。

## 设置用户在线状态信息

可以设置用户在指定设备的在线状态信息。

### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/users/{username}/presence/{resource}/{status}
```

#### 路径参数

| 参数       | 类型  | 是否必需 | 描述           | 
| :--------- | :----- | :---------------------- | :------- |
| `username`       | String  | 是 | 设置哪个用户的在线状态信息。           | 
| `resource` | String | 是     | 要设置用户在哪个设备的在线状态信息，即传入服务器分配给每个设备资源的唯一标识符，格式为 `{device type}_{resource ID}`，其中设备类型 `device type` 可以是 `android`、`ios` 或 `web`，资源 ID `resource ID` 由 SDK 分配。例如，`android_123423453246`。 |
| `status`   | String | 是     | 用户的在线状态：<br> - `0`：离线；<br> - `1`：在线；<br> - 其它数字字符串：自定义在线状态。 | 

其他参数及描述详见 [公共参数](#公共参数)。

#### 请求 header

| 参数            | 类型   | 是否必需 | 描述                       | 
| :-------------- | :----- | :------------ | :------- |
| `Content-Type`  | String | 是    | 内容类型：`application/json`。                               | 
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                      |
| `Authorization` | String | 是    | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 | 

#### 请求体 body

请求包体为 JSON Object 类型，包含以下字段：

| 参数  | 类型 | 是否必需  | 描述             | 
| :---- | :----- | :---------------------- | :------- |
| `ext` | String | 是 | 在线状态扩展信息。建议不超过 1024 字节。 | 

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段     | 类型   | 描述                                                 |
| :------- | :----- | :--------------------------------------------------- |
| `result` | String | 在线状态是否成功设置。`ok` 表示在线状态设置成功；否则，你可以根据返回的原因进行故障排除。 |

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](error.html) 了解可能的原因。

### 示例

#### 请求示例

```shell
curl -X POST 'https://XXXX/app-id/XXXX/users/c1/presence/android/0' \
-H 'Authorization: Bearer YWMtnjEbUopPEeybKGMmN0wpeZsaLSh8UEgpirS4wNAM_qx8oS2wik8R7LE4Rclv5hu9AwMAAAF-4tr__wBPGgDWGAeO86wl2lHGeTnU030fpWuEDR015Vk6ULWGYGKccA' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json'
-d '{"ext":"123"}'
```

#### 响应示例

```json
{"result":"ok"}
```

### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 400   | illegal_argument | ext cannot be null | 在线状态扩展参数 `ext` 传了空值。 | 保证 `ext` 参数传非空值。 |
| 400   | illegal_argument | ext is too big | 在线状态扩展信息超过了 1024 字节长度限制。 | 控制在线状态扩展信息的长度不要超过 1024 字节。 |
| 400   | service open exception | the app not open presence | 没有开通在线状态 Presence 服务。 | 联系声网商务开通在线状态 Presence 服务。|
| 401  | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |

关于其他错误，你可以参考 [错误码](#错误码) 了解可能的原因。

## 批量订阅在线状态

一次可订阅多个用户的在线状态。

### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/users/{username}/presence/{expiry}
```

#### 路径参数

| 参数     | 类型  | 是否必需 | 描述                                |
| :------- | :----- | :---------------- | :------- |
| `username` | String | 是 | 为哪个用户订阅在线状态。|
| `expiry` | String | 是  | 订阅时长，单位为秒，最大值为 `2,592,000`，即 30 天。  |

其他参数及描述详见 [公共参数](#公共参数)。

#### 请求 header

| 参数            | 类型  | 是否必需 | 描述                  | 
| :-------------- | :----- | :------------------------- | :------- |
| `Content-Type`  | String | 是   | 内容类型：`application/json`。                  |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                      |
| `Authorization` | String | 是   | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。      |

#### 请求 body

请求包体为 JSON Object 类型，包含以下字段：

| 字段        | 类型    | 是否必需   | 描述                                                         |
| :---------- | :--------- | :--------------------- | :------- |
| `usernames` | Array | 是  | 被订阅用户的用户 ID 数组，例如 ["user1", "user2"]。该数组最多可包含 100 个用户 ID。      |

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段        | 类型       | 描述                                                         |
| :---------- | :--------- | :----------------------------------------------------------- |
| `result`    | JSON Array | 是否成功批量订阅了多个用户的在线状态。若成功，则返回被订阅用户的在线状态信息，失败则返回相应的错误原因。 |
|  - `uid`       | String     | 被订阅用户在即时通讯服务器的唯一 ID。                              |
|  - `last_time` | Long    | 被订阅用户的最近在线时间，Unix 时间戳，单位为秒。服务端会在被订阅的用户登录和登出时记录该时间。 |
|  - `expiry`    | Long    | 订阅过期的 Unix 时间戳，单位为秒。                                           |
|  - `ext`       | String     | 被订阅用户的在线状态扩展信息。                   |
|  - `status`    | JSON | 被订阅用户在多端的状态：<br> - `0`：离线；<br> - `1`：在线；<br/> - 其他值：用户可设置其他值自定义在线状态。 |

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](error.html) 了解可能的原因。

### 示例

#### 请求示例

```shell
curl -X POST 'https://XXXX/app-id/XXXX/users/wzy/presence/1000' \
-H 'Authorization: Bearer YWMtnjEbUopPEeybKGMmN0wpeZsaLSh8UEgpirS4wNAM_qx8oS2wik8R7LE4Rclv5hu9AwMAAAF-4tr__wBPGgDWGAeO86wl2lHGeTnU030fpWuEDR015Vk6ULWGYGKccA' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json'
-d '{"usernames":["c2","c3"]}'
```

#### 响应示例

```json
{
"result":[
  {"uid":"",
  "last_time":"1644466063",
  "expiry":"1645500371",
  "ext":"123",
  "status":{"android":"1","android_6b5610ac-4e11-4661-82b3-dee17bc7b2cc":"0"}
    },
    {"uid":"c3",
    "last_time":"1645183991",
    "expiry":"1645500371",
    "ext":"",
    "status":{
        "android":"0",
        "android_6b5610ac-4e11-4661-82b3-dee17bc7b2cc":"0"}
    }]
}
```

### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型     | 错误提示    | 可能原因   | 处理建议     |
| :---------- | :--- | :----------- | :----- | :-------------- |
| 400         | illegal_argument       | usernames is empty   | 被订阅用户的用户 ID 数组为空。           | 保证被订阅用户的用户 ID 数组非空值。  |
| 400         | illegal_argument       | too many sub presence   | 被订阅用户的用户列表超过了 100 个用户 ID 限制。    | 控制被订阅用户的用户列表不要超过 100 个用户 ID 限制。 |
| 400         | illegal_argument       | you can't sub yourself  | 被订阅用户的用户列表中包含了自己（被订阅用户列表中包含了请求 URL 路径中的 `username`）。 | 将自己从被订阅用户的用户列表中移除。  |
| 400         | service open exception | the app not open presence  | 没有开通 Presence 服务。                 | 联系商务开通 Presence 服务。    |
| 401         | unauthorized           | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。      | 使用新的 token 访问。           |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 批量获取在线状态信息

你一次可获取多个用户的在线状态信息。

:::tip
默认情况下，若用户在 1 秒内进行多次登录和登出，服务器以最后一次操作为准向客户端 SDK 发送状态变更通知。
:::

### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/users/{username}/presence
```

#### 路径参数

| 参数     | 类型  | 是否必需 | 描述                                |
| :------- | :----- | :---------------- | :------- |
| `username` | String | 是 | 获取哪个用户订阅的在线状态。若传入的用户 ID 不存在或未订阅其他用户的在线状态，返回空列表。|

参数及描述详见 [公共参数](#公共参数)。

#### 请求 header

| 参数            | 类型  | 是否必需 | 描述               |
| :-------------- | :----- | :----------------- | :------- |
| `Content-Type`  | String | 是  | 内容类型。请填 `application/json`。         |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                      |
| `Authorization` | String | 是  | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 | 

#### 请求 body

请求包体为 JSON Object 类型，仅支持以下字段：

| 参数        | 类型  | 是否必需 | 描述                                                       |
| :---------- | :---- | :------- | :----------------------------------------------------------- |
| `usernames` | JSON Array | 是    | 需要获取其在线状态的用户列表，例如 `["user1", "user2"]`，最多可传 100 个用户 ID。 |

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 参数        | 类型       | 描述                                                         |
| :---------- | :--------- | :----------------------------------------------------------- |
| `result`    | JSON Array | 是否成功批量获取用户的在线状态信息。若成功获取，返回被订阅用户的在线状态信息，失败则返回相应的错误原因。 |
|  - `uid`       | String     | 用户在即时通讯服务器的唯一 ID。                              |
|  - `last_time` | Long       | 用户的最近在线时间，Unix 时间戳，单位为秒。                                           |
|  - `ext`       | String     | 用户的在线状态扩展信息。                 |
|  - `status`    | JSON | 用户在多个设备上的在线状态：<br/> - `0`： 离线。<br/> - `1`： 在线。<br/> - 其他值：用户自定义的在线状态。                                            |

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](error.html) 了解可能的原因。

### 示例

#### 请求示例

```shell
curl -X POST 'https://XXXX/app-id/XXXX/users/wzy/presence' \
-H 'Authorization: Bearer YWMtnjEbUopPEeybKGMmN0wpeZsaLSh8UEgpirS4wNAM_qx8oS2wik8R7LE4Rclv5hu9AwMAAAF-4tr__wBPGgDWGAeO86wl2lHGeTnU030fpWuEDR015Vk6ULWGYGKccA' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json'
-d '{"usernames":["c2","c3"]}'
```

#### 响应示例

```json
{
  "result":[
    {"uid":"c2",
    "last_time":"1644466063",
    "ext":"",
    "status":{"android":"0"}
    },
    {"uid":"c3",
    "last_time":"1644475330",
    "ext":"",
    "status":{
      "android":"0",
      "android":"0"}
    }
  ]
 }
```

### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型               | 错误提示 | 可能原因                | 处理建议|
| :---------- | :--- | :----------- | :-------- | :-------------- |
| 400         | illegal_argument       | too many get presences        | 获取在线状态用户列表超过了 100 个用户 ID 限制。 | 控制获取在线状态用户列表不超过 100 个用户 ID。 |
| 400         | service open exception | the app not open presence      | 没有开通 presence 服务。  | 联系商务开通 presence 服务。    |
| 401         | unauthorized           | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。   | 使用新的 token 访问。  |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 查询单个群组的在线成员数量

你可以查询单个群组的在线成员数量。**如需使用该 API，需要联系声网商务开通。**

这里的在线状态指用户的 app 与服务器成功建立连接，不包括用户的自定义在线状态，如忙碌、马上回来等。

### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/presence/online/{group_id}/type/{query_type}
```

#### 路径参数

参数及描述详见 [公共参数](#公共参数)。

#### 查询参数

| 参数   | 类型   | 是否必需 | 描述                                    |
| :----- | :----- | :------- | :-------------------------------------- |
| `group_id`   | String | 是       | 群组 ID。                                |
| `query_type` | Int    | 是       | 查询类型，查询群组的在线成员数量，传 `1` 即可。 |

#### 请求 header

| 参数            | 类型   | 是否必需 | 描述                                                         |
| :-------------- | :----- | :------- | :--------------- |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                          |
| `Authorization` | String | 是       | 该管理员的鉴权 token，格式为 `Bearer ${YourAppToken}`，其中 `Bearer` 是固定字符，后面加英文空格，再加获取到的 token 值。 |

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段     | 类型 | 描述               |
| :------- | :--- | :----------------- |
| `result` | Int  | 群组内的在线成员数量。 |

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考[错误码](#错误码)了解可能的原因。

### 示例

#### 请求示例

```shell
将 <YourAppToken> 替换为你在服务端生成的 App Token
curl -X GET -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' 'http://XXX/app-id/XXX/presence/online/XXX/type/XXX'
```

#### 响应示例

```json
{
    "result": 100
}
```

### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型               | 错误提示                 | 可能原因  | 处理建议   |
| :---------- | :--- | :--------- | :------------ | -------------- |
| 400         | illegal_argument       | Id cannot be null.       | 群组 ID 为空。 | 保证群组 ID 为非空值。 |
| 400         | illegal_argument       | Type cannot be null.     | 查询类型为空。    | 保证查询类型为非空值。 |
| 400         | illegal_argument       | Type must be 0 or 1.     | 查询类型（`query_type`）不为 0 或 1。  | 若查询单个群组的在线成员数量，需保证查询类型为 `1`。若传 `0` 是获取超级社区中社区 server 在线成员数量，与群组不相关。 |
| 400         | service open exception | this appkey not open rest group online service | 没有开通统计群组在线人数服务。 | 联系商务开通统计群组在线人数服务。 |
| 401         | unauthorized           | Unable to authenticate (OAuth)    | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

##  取消订阅多个用户的在线状态

取消订阅多个用户的在线状态。

### HTTP 请求

```http
DELETE https://{host}/app-id/{app_id}/users/{username}/presence
```

### 路径参数

| 参数     | 类型  | 是否必需 | 描述                                |
| :------- | :----- | :---------------- | :------- |
| `username` | String | 是 | 为哪个用户取消订阅的在线状态。|

参数及描述详见 [公共参数](#公共参数)。

### 请求 header

| 参数            | 类型   | 是否必需 | 描述         | 
| :-------------- | :----- | :-------------------------- | :------- |
| `Content-Type`  | String | 是    | 内容类型。请填 `application/json`。                                   |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                      |
| `Authorization` | String | 是    | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |
### 请求 body

| 参数    | 类型  | 是否必需 | 描述                                                         | 
| :------ | :---- | :--------------------------- | :------- |
| `users` | JSON Array |  是  | 要取消订阅在线状态的用户 ID 数组，例如 ["user1", "user2"]，最多可传 100 个用户 ID。      |

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 参数     | 类型   | 描述                                           |
| :------- | :----- | :--------------------------------------------- |
| `result` | String | 是否成功取消订阅用户的在线状态。若成功，返回 "ok"，失败则返回相应的错误原因。 |

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](error.html) 了解可能的原因。

### 示例

#### 请求示例

```shell
curl -X DELETE 'https://XXXX/app-id/XXXX/users/XXXX/presence' \
-H 'Authorization: Bearer YWMtnjEbUopPEeybKGMmN0wpeZsaLSh8UEgpirS4wNAM_qx8oS2wik8R7LE4Rclv5hu9AwMAAAF-4tr__wBPGgDWGAeO86wl2lHGeTnU030fpWuEDR015Vk6ULWGYGKccA' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json'  \
-d '["c1"]'
```

#### 响应示例

```json
{"result":"ok"}
```

### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型               | 错误提示 | 可能原因| 处理建议      |
| :---------- | :--- | :----------- | :-------------- | :-- |
| 400         | illegal_argument       | usernames cannot be null       | 要取消订阅在线状态的用户 ID 数组为空。    | 保证要取消订阅在线状态的用户 ID 数组为非空值。  |
| 400         | illegal_argument       | too many unsub presences      | 取消订阅在线状态的用户列表超过了 100 个用户 ID。 | 控制取消订阅在线状态的用户列表在 100 个用户 ID 以内。 |
| 400         | service open exception | the app not open presence      | 没有开通 Presence 服务。        | 联系商务开通 Presence 服务。   |
| 401         | unauthorized           | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。  | 使用新的 token 访问。  |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 查询订阅列表

查询当前用户已订阅在线状态的用户列表。

### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/users/{uid}/presence/sublist?pageNum={pagenumber}&pageSize={pagesize}
```

#### 路径参数

| 参数     | 类型  | 是否必需 | 描述                                |
| :------- | :----- | :---------------- | :------- |
| `username` | String | 是 | 查询哪个用户的订阅列表。若传入的用户 ID 不存在或未订阅其他用户的在线状态，返回空列表。|

参数及描述详见 [公共参数](#公共参数)。

#### 查询参数

| 参数       | 类型 |  是否必需 | 描述                       |
| :--------- | :--- | :--------------- | :------- |
| `pageNum`  | Int  | 是       | 要查询的页码。该参数的值须大于等于 1。若不传，默认值为 `1`。          |
| `pageSize` | Int  | 是       | 每页显示的订阅用户数量。取值范围为 [1,500]，若不传默认值为 `1`。| 

#### 请求 header

| 参数            | 类型   | 是否必需 | 描述                                                         |
| :-------------- | :----- | :------- | :----------------------------------------------------------- |
| `Content-Type`  | String | 是     | 内容类型：`application/json`。                               |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                      |
| `Authorization` | String | 是     | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 参数       | 类型   | 描述                                                         |
| :--------- | :----- | :----------------------------------------------------------- |
| `result`   | JSON | 是否成功获取了订阅列表。若操作成功，返回被订阅用户的在线状态信息。若操作失败，返回相应的错误原因。 |
| `result.totalnum` | Int | 当前订阅的用户总数。                                         |
| `result.sublist`  | JSON Array | 订阅列表。列表中的每个对象均包含被订阅的用户的 ID 字段 `uid` 以及订阅过期字段 `expiry`。    |
| `result.sublist.uid`      | String | 被订阅用户在即时通讯服务器的唯一 ID。                              |
| `result.sublist.expiry`   | Int | 订阅的过期时间戳，单位为秒。                                           |

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](error.html) 了解可能的原因。

### 示例

#### 请求示例

```shell
curl -X GET 'a1-test.easemob.com:8089/5101220107132865/test/users/wzy/presence/sublist?pageNum=1&pageSize=100' \
-H 'Authorization: Bearer YWMtnjEbUopPEeybKGMmN0wpeZsaLSh8UEgpirS4wNAM_qx8oS2wik8R7LE4Rclv5hu9AwMAAAF-4tr__wBPGgDWGAeO86wl2lHGeTnU030fpWuEDR015Vk6ULWGYGKccA' \
-H 'Content-Type: application/json'
-H 'Accept: application/json'
```

#### 响应示例

```json
{
  "result":{
    "totalnum":"2",
    "sublist":[
     {
        "uid":"lxml2",
        "expiry":"1645822322"},
      {
        "uid":"lxml1",
        "expiry":"1645822322"}
      ]
  }
}
```

### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型   | 错误提示 | 可能原因  | 处理建议      |
| :---------- | :--- | :----------- | :------------ | :----- |
| 400         | service open exception | the app not open presence   | 没有开通 presence 服务。  | 联系商务开通 presence 服务。 |
| 401         | unauthorized           | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。|

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。