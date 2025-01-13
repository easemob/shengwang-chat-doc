# 聊天室成员禁言管理

<Toc />

即时通讯 IM 提供多个接口实现聊天室成员禁言，包括添加和移除聊天室成员、转让聊天室所有权以及聊天室黑名单、白名单和禁言列表相关操作。

## 前提条件

要调用即时通讯 RESTful API，请确保满足以下要求：

- 已在[声网控制台](https://console.shengwang.cn/overview) [开通配置即时通讯 IM 服务](enable_im.html)。
- 已从服务端获取 app token，详见 [使用 Token 鉴权](token_authentication.html)。
- 了解即时通讯 IM 的 API 调用频率限制，详见 [接口频率限制](limitationapi.html)。
- 了解聊天室成员相关限制，详见[使用限制](/product/limitation.html#聊天室成员)。

## 公共参数

#### 请求参数

| 参数          | 类型   | 是否必需 | 描述  |
| :------------ | :----- | :------- | :---------------- |
| `host`     | String | 是       | 即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `app_id`     | String | 是       | 声网为每个项目自动分配的 App ID，作为项目唯一标识。 | 
| `chatroom_id` | String | 是       | 聊天室 ID。  |
| `username`    | String | 是       | 用户 ID。    |

#### 响应参数

| 参数                 | 类型   | 描述   |
| :------------------- | :----- | :------------ |
| `action`             | String | 请求方法。  |
| `host`               | String | 即时通讯 IM 分配的用于访问 RESTful API 的域名，与请求参数 `host` 相同。    |
| `uri`                | String | 请求 URL。   |
| `path`               | String | 请求路径，属于请求 URL 的一部分，开发者无需关注。   |
| `id`                 | String | 聊天室 ID，聊天室唯一标识，由即时通讯 IM 服务器生成。    |
| `entities`           | JSON   | 响应实体。  |
| `data`               | JSON   | 数据详情。 |
| `created`            | String | 用户、群组或聊天室的创建时间，Unix 时间戳，单位为毫秒。    |
| `timestamp`          | Long   | HTTP 响应的 Unix 时间戳，单位为毫秒。   |
| `duration`           | Long   | 从发送 HTTP 请求到响应的时长，单位为毫秒。     |

## 认证方式

即时通讯 IM 的 RESTful API 要求 Bearer HTTP 认证。每次发送 HTTP 请求时，都必须在请求头部填入如下 `Authorization` 字段：

`Authorization: Bearer YourAppToken`

为提高项目的安全性，声网使用 Token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 RESTful API 推荐使用 app token 的 鉴权方式，详见[使用 Token 鉴权](token_authentication.html)。

##  获取禁言列表

获取当前聊天室的禁言用户列表。

#### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/chatrooms/{chatroom_id}/mute
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述      |
| :-------------- | :----- | :------- | :------------------- |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段          | 类型   | 描述                                 |
| :------------ | :----- | :----------------------------------- |
| `data` | JSON Array | 响应数据。 |
|  - `expire` | Long   | 禁言到期的 Unix 时间戳，单位为毫秒。 |
|  - `user`   | String | 被禁言的用户 ID。                    |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X GET HTTP://XXXX/app-id/XXXX/chatrooms/12XXXX11/mute -H 'Authorization: Bearer <YourAppToken>'
```

##### 响应示例

```json
{
  "action": "get",
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/12XXXX11/mute",
  "entities": [],
  "data": [
    {
      "expire": 1489158589481,
      "user": "user1"
    },
    {
      "expire": 1489158589481,
      "user": "user2"
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
| 404     | resource_not_found | grpID XXX does not exist! | 聊天室不存在。 | 使用合法的聊天室 ID。|

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 禁言聊天室成员

禁言单个或多个聊天室成员。你一次最多可禁言 60 个成员。

用户被禁言后，将无法在聊天室中发送消息。

#### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/chatrooms/{chatroom_id}/mute
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述          |
| :-------------- | :----- | :------- | :-------------------------- |
| `Content-Type`  | String | 是       | 内容类型。请填 `application/json`。    |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。     |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### 请求 body

| 参数            | 类型   | 是否必需 | 描述       |
| :-------------- | :----- | :------- | :----------------- |
| `mute_duration` | Long   | 是       | 禁言时长，从当前时间开始计算。单位为毫秒。`-1` 表示永久禁言。 |
| `usernames`     | Array | 是       | 要被禁言的用户 ID，一次最多可传 60 个。                                           |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段          | 类型   | 描述           |
| :------------ | :----- | :------------------- |
| `data` | JSON Array | 响应数据。 |
|  - `result` | Bool   | 是否成功禁言用户：<br/> - `true`：是；<br/> - `false`：否。 |
|  - `expire` | Long   | 禁言到期时间，Unix 时间戳，单位为毫秒。                     |
|  - `user`   | String | 被禁言的用户 ID。                                           |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' -d
'{
    "usernames": [
        "user1",
        "user2"
    ],
    "mute_duration": 86400000
}'https://XXXX/app-id/XXXX/chatrooms/12XXXX11/mute'
```

##### 响应示例

```json
{
  "action": "post",
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/12XXXX11/mute",
  "entities": [],
  "data": [
    {
      "result": true,
      "expire": 1642148173726,
      "user": "user1"
    },
    {
      "result": true,
      "expire": 1642148173726,
      "user": "user2"
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
| 400     | forbidden_op | users [XXX] are not members of this group! | 要禁言的用户 ID 不在聊天室中。 | 传入聊天室中的用户 ID。 |
| 404     | resource_not_found | grpID XXX does not exist! | 聊天室不存在。 | 使用合法的聊天室 ID。 |
| 400     | invalid_parameter | userNames size is more than max limit : 60 | 批量禁言指定聊天室成员数量超过60 | 控制禁言指定聊天室成员数量在 60 以内。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 禁言聊天室全体成员

对所有聊天室成员一键禁言。该操作不影响聊天室禁言列表，即一键禁言不会将聊天室所有成员加入聊天室禁言列表。

设置聊天室全员禁言后，仅聊天室白名单中的用户可在聊天室内发消息。

#### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/chatrooms/{chatroom_id}/ban
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述        |
| :-------------- | :----- | :------- | :------------------------------------------------ |
| `Content-Type`  | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段        | 类型 | 描述             |
| :---------- | :--- | :------------ |
| `data.mute` | Bool | 是否处于聊天室全员禁言状态：<br/> - `true`：是；<br/> - `false`：否。 |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' 'https://XXXX/app-id/XXXX/chatrooms/12XXXX11/ban'
```

##### 响应示例

```json
{
  "action": "put",
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/12XXXX11/ban",
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
| 404     | resource_not_found | grpID XXX does not exist! | 聊天室不存在。 | 使用合法的聊天室 ID。 |

## 解除聊天室禁言成员

解除对一个或多个聊天室成员的禁言。你一次最多可对 60 个成员解除禁言。

解除禁言后，该成员可以正常在聊天室中发送消息。

#### HTTP 请求

```http
DELETE https://{host}/app-id/{app_id}/chatrooms/{chatroom_id}/mute/{member1}(,{member2},…)
```

##### 路径参数

| 参数      | 类型   | 是否必需 | 描述 |
| :-------- | :----- | :------- | :------- |
| `member1` | String | 是       | 待被移出禁言列表的聊天室成员的用户 ID。<br/>一次最多可传 60 个用户 ID，用户 ID 之间用英文逗号（","）隔开，逗号在 URL 中转义为 "%2C"。 |

其他字段及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数       | 类型   | 是否必需 | 描述   |
| :-------------- | :----- | :------- | :----------------------- |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段          | 类型    | 描述                                                                       |
| :------------ | :------ | :------------------------------------------------------------------------- |
| `data` | JSON Array | 响应数据。 |
|  - `result` | Boolean | 是否成功将指定用户移出禁言列表：<br/> - `true`：是； <br/> - `false`：否。 |
|  - `user`   | String  | 被解除禁言的聊天室成员的用户 ID。                                          |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X DELETE HTTP://XXXX/app-id/XXXX/chatrooms/12XXXX11/mute/user1  -H 'Authorization: Bearer <YourAppToken>'
```

##### 响应示例

```json
{
  "action": "delete",
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/12XXXX11/mute/user1",
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
| 400     | invalid_parameter | removeMute member size more than max limit :  60 | 批量移除禁言超过上限（60）。 | 调整要移除的数量在限制（60）以下. |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | resource_not_found | grpID XXX does not exist! | 聊天室不存在。 | 使用合法的聊天室 ID。 |

## 解除聊天室全员禁言

一键取消对聊天室全体成员的禁言。解除禁言后，聊天室成员可以在聊天室中正常发送消息。

#### HTTP 请求

```http
DELETE https://{host}/app-id/{app_id}/chatrooms/{chatroom_id}/ban
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数   | 类型   | 是否必需 | 描述        |
| :-------------- | :----- | :------- | :------------------ |
| `Content-Type`  | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段        | 类型 | 描述                                                                  |
| :---------- | :--- | :--------------- |
| `data.mute` | Bool | 是否处于聊天室全员禁言状态：<br/> - `true`：是；<br/> - `false`：否。 |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X DELETE -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' 'https://XXXX/app-id/XXXX/chatrooms/12XXXX11/ban'
```

##### 响应示例

```json
{
  "action": "delete",
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/12XXXX11/ban",
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
| 404     | resource_not_found | grpID XXX does not exist! | 聊天室不存在。 | 使用合法的聊天室 ID。 |
