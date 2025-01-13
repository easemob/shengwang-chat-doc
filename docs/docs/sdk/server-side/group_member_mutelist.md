# 群组成员禁言管理

<Toc />

声网即时通讯 IM 提供多个接口实现聊天室成员禁言，包括获取禁言列表、将成员添加或移出禁言列表，以及全员禁言和解除全员禁言。

## 前提条件

要调用声网即时通讯 RESTful API，请确保满足以下要求：

- 已在[声网控制台](https://console.shengwang.cn/overview) [开通配置声网即时通讯 IM 服务](enable_im.html)。
- 已从服务端获取 app token，详见 [使用 Token 鉴权](token_authentication.html)。
- 了解声网即时通讯 IM API 的调用频率限制，详见 [接口频率限制](limitationapi.html)。

## 公共参数

#### 请求参数

| 参数       | 类型   | 是否必需 | 描述        |
| :--------- | :----- | :------- | :--------------- |
| `host`     | String | 是       | 即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `app_id`     | String | 是       | 声网为每个项目自动分配的 App ID，作为项目唯一标识。 | 
| `group_id` | String | 是       | 群组 ID。    |
| `username` | String | 是       | 用户 ID。             |

#### 响应参数

| 参数              | 类型   | 描述                                                                           |
| :---------------- | :----- | :----------------------------------------------------------------------------- |
| `action`          | String | 请求方法。                                                                     |
| `uri`             | String | 请求 URL。                                                                     |
| `path`            | String | 请求路径，属于请求 URL 的一部分，开发者无需关注。                              |
| `entities`        | JSON   | 响应实体。                                                                     |
| `data`            | JSON   | 实际获取的数据详情。                                                           |
| `created`         | Long   | 群组创建时间，Unix 时间戳，单位为毫秒。                                        |
| `timestamp`       | Long   | Unix 时间戳，单位为毫秒。                                                      |
| `duration`        | Int    | 从发送请求到响应的时长，单位为毫秒。                                           |
| `properties`      | String | 响应属性。                                                                     |

## 认证方式

声网即时通讯 IM RESTful API 要求 Bearer HTTP 认证。每次发送 HTTP 请求时，都必须在请求头部填入如下 `Authorization` 字段：

`Authorization: Bearer YourAppToken`

为提高项目的安全性，声网使用 Token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 RESTful API 推荐使用 app token 的 鉴权方式，详见 [使用 Token 鉴权](token_authentication.html)。

## 获取禁言列表

获取当前群组的禁言用户列表。

#### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/chatgroups/{group_id}/mute
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述        |
| :-------------- | :----- | :------- | :--------------- |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段          | 类型   | 描述                         |
| :------------ | :----- | :--------------------------- |
| `data` | JSON Array | 响应数据。|
|  - `expire` | Long   | 禁言到期的时间，单位为毫秒。 |
|  - `user`   | String | 被禁言用户的 ID。            |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X GET HTTP://XXXX/app-id/XXXX/chatgroups/10XXXX85/mute -H 'Authorization: Bearer <YourAppToken>'
```

##### 响应示例

```json
{
  "action": "get",
  "uri": "https://XXXX/XXXX/XXXX/chatgroups/10XXXX85/mute",
  "entities": [],
  "data": [
    {
      "expire": 1489158589481,
      "user": "user1"
    }
  ],
  "timestamp": 1489072802179,
  "duration": 0
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | resource_not_found | grpID XX does not exist! | 群组不存在。 | 使用合法的群组 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 禁言指定群成员

对一个或多个群成员禁言。你一次最多可禁言 60 个群组成员。

群成员被禁言后，将无法在群组中发送消息，也无法在该群组下的子区中发送消息。

#### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/chatgroups/{group_id}/mute
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述     |
| :-------------- | :----- | :------- | :----------- |
| `Content-Type`  | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

##### 请求 body

| 参数            | 类型  | 是否必需 | 描述                                                       |
| :-------------- | :---- | :------- | :--------------------------------------------------------- |
| `mute_duration` | Long  | 是       | 禁言时长，单位为毫秒。                                     |
| `usernames`     | Array | 是       | 要添加到禁言列表的用户 ID 列表，每次最多可添加 60 个。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段          | 类型   | 描述                                                            |
| :------------ | :----- | :-------------------------------------------------------------- |
| `data` | JSON Array | 响应数据。|
|  - `result` | Bool   | 操作结果：<br/> - `true`：添加成功；<br/> - `false`：添加失败。 |
|  - `expire` | Long   | 禁言到期的时间。该时间为 Unix 时间戳，单位为毫秒。              |
|  - `user`   | String | 被禁言用户的 ID。                                               |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X POST HTTP://XXXX/app-id/XXXX/chatgroups/10XXXX85/mute -d '{"usernames":["user1"], "mute_duration":86400000}' -H 'Authorization: Bearer <YourAppToken>'
```

##### 响应示例

```json
{
  "action": "post",
  "uri": "https://XXXX/XXXX/XXXX/chatgroups/10XXXX85/mute",
  "entities": [],
  "data": [
    {
      "result": true,
      "expire": 1489158589481,
      "user": "user1"
    }
  ],
  "timestamp": 1489072189508,
  "duration": 0
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 403     | forbidden_op | users [XX] are not members of this group! | 要禁言的用户 ID 不在群组中。 | 传入群组中的用户 ID。 |
| 404     | resource_not_found | grpID XX does not exist! | 群组不存在。 | 使用合法的群 ID。 |
| 400     | invalid_parameter | userNames size is more than max limit : 60 | 批量禁言指定群成员数量超过60 | 控制禁言指定群成员数量在 60 以内。 |
| 403    | forbidden_op   | "forbidden operation on group owner!"   | 无法对群主禁言。  | 

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 禁言全体群成员

对所有群组成员一键禁言，即将群组的所有成员加入禁言列表。设置群组全员禁言后，仅群组白名单中的用户可在群组以及该群组下的子区内发送消息。

#### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/chatgroups/{group_id}/ban
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述     |
| :-------------- | :----- | :------- | :---------- |
| `Content-Type`  | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段          | 类型 | 描述                                                            |
| :------------ | :--- | :-------------------------------------------------------------- |
| `data.mute` | Bool | 操作结果：<br/> - `true`：禁言成功；<br/> - `false`：禁言失败。 |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' 'https://XXXX/app-id/XXXX/chatgroups/{groupid}/ban'
```

##### 响应示例

```json
{
  "action": "post",
  "uri": "https://XXXX/XXXX/XXXX/chatgroups/12XXXX53/ban",
  "entities": [],
  "data": {
    "mute": true
  },
  "timestamp": 1594628861058,
  "duration": 1
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | resource_not_found | grpID XX does not exist! | 群组不存在。 | 使用合法的群 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 解除成员禁言

将一个或多个群成员移出禁言列表。你一次最多可对 60 个成员解除禁言。

移除后，群成员可以在群组中正常发送消息，同时也可以在该群组下的子区中发送消息。

#### HTTP 请求

```http
DELETE https://{host}/app-id/{app_id}/chatgroups/{group_id}/mute/{member1}(,{member2},…)
```

##### 路径参数

| 参数     | 类型   | 是否必需 | 描述                                                                                      |
| :------- | :----- | :------- | :---------------------------------------------------------------------------------------- |
| `member` | String | 是       | 要解除禁言的成员的用户 ID，每次最多可传 60 个，多个用户 ID 之间以英文逗号（","）分隔，例如 `{member1},{member2}`。 |

其他参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述    |
| :-------------- | :----- | :------- | :------- |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段          | 类型  | 描述                                                            |
| :------------ | :---- | :-------------------------------------------------------------- |
| `data` | JSON Array | 响应数据。|
|  - `result` | Bool  | 操作结果：<br/> - `true`：解除成功；<br/> - `false`：解除失败。 |
|  - `user`   | Array | 被移出禁言列表的用户 ID。                                       |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X DELETE -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' 'https://XXXX/app-id/XXXX/chatgroups/10130212061185/mute/user1'
```

##### 响应示例

```json
{
  "action": "delete",
  "uri": "https://XXXX/XXXX/XXXX/chatgroups/10XXXX85/mute/user1",
  "entities": [],
  "data": [
    {
      "result": true,
      "user": "user1"
    }
  ],
  "timestamp": 1489072695859,
  "duration": 0
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | resource_not_found | grpID XX does not exist! | 群组不存在。 | 使用合法的群 ID。 |
| 400     | invalid_parameter | removeMute member size more than max limit : 60 | 批量移除禁言列表的用户数超过上限 60。 | 控制解除成员禁言数量在 60 以内。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 解除全员禁言

一键取消对群组全体成员的禁言。解除禁言后，群成员可以在群组和该群组下的子区中正常发送消息。

#### HTTP 请求

```http
DELETE https://{host}/app-id/{app_id}/chatgroups/{group_id}/ban
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述             |
| :-------------- | :----- | :------- | :------------------------------ |
| `Content-Type`  | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段        | 类型 | 描述                                                             |
| :---------- | :--- | :--------------------------------------------------------------- |
| `data.mute` | Bool | 是否处于全员禁言状态。<br/> - `true`：是； <br/> - `false`：否。 |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X DELETE -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' 'https://XXXX/app-id/XXXX/chatgroups/{groupid}/ban'
```

##### 响应示例

```json
{
  "action": "delete",
  "uri": "https://XXXX/XXXX/XXXX/chatgroups/12XXXX53/ban",
  "entities": [],
  "data": {
    "mute": false
  },
  "timestamp": 1594628899502,
  "duration": 1
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | resource_not_found | grpID XX does not exist! | 群组不存在。 | 使用合法的群 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

