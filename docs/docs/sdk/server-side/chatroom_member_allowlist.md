# 聊天室白名单管理

<Toc />

即时通讯 IM 提供多个接口实现聊天室白名单管理，包括查看白名单中的用户以及将用户添加至和移出白名单等。

聊天室白名单中的成员在聊天室中发送的消息为高优先级，会优先送达，但不保证必达。当负载较高时，服务器会优先丢弃低优先级的消息。若即便如此负载仍很高，服务器也会丢弃高优先级消息。

## 前提条件

要调用即时通讯 RESTful API，请确保满足以下要求：

- 已在[声网控制台](https://console.shengwang.cn/overview)[开通配置即时通讯 IM 服务](enable_im.html)。
- 已从服务端获取 app token，详见 [使用 Token 鉴权](token_authentication.html)。
- 了解即时通讯 IM 的 API 调用频率限制，详见 [接口频率限制](limitationapi.html)
- 了解聊天室成员相关限制，详见[使用限制](limitation.html#聊天室成员)。

## 公共参数

#### 请求参数

| 参数          | 类型   | 是否必需 | 描述  |
| :------------ | :----- | :------- | :---------------- |
| `host`     | String | 是       | 即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `app_id`     | String | 是       | 声网为每个项目自动分配的 App ID，作为项目唯一标识。 | 
| `chatroom_id` | String | 是       | 聊天室 ID。  |

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

为提高项目的安全性，声网使用 Token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 IM RESTful API 推荐使用 app token 的 鉴权方式，详见[使用 Token 鉴权](token_authentication.html)。

## 查询聊天室白名单

查询一个聊天室白名单中的用户列表。

#### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/chatrooms/{chatroom_id}/white/users
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述         |
| :-------------- | :----- | :------- | :----------------------- |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。    |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段   | 类型  | 描述                      |
| :----- | :---- | :------------------------ |
| `data` | Array | 聊天室白名单中的用户 ID。 |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X GET -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' 'https://XXXX/app-id/XXXX/chatrooms/66XXXX33/white/users'
```

##### 响应示例

```json
{
  "action": "get",
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/66XXXX33/white/users",
  "entities": [],
  "data": ["wzy_test", "wzy_vivo", "wzy_huawei", "wzy_xiaomi", "wzy_meizu"],
  "timestamp": 1594724947117,
  "duration": 3,
  "count": 5
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | resource_not_found | grpID XXX does not exist! | 聊天室不存在。 | 使用合法的聊天室 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 添加单个用户至聊天室白名单

将单个用户添加至聊天室白名单。用户添加至聊天室白名单后，当聊天室全员禁言时，仍可以在聊天室中发送消息。

#### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/chatrooms/{chatroom_id}/white/users/{username}
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述        |
| :-------------- | :----- | :------- | :---------------------- |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。       |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段              | 类型   | 描述            |
| :---------------- | :----- | :-------------------- |
| `data.result`     | Bool   | 是否成功将单个用户添加至聊天室白名单：<br/> - `true`：是；<br/> - `false`：否。           |
| `data.chatroomid` | String | 聊天室 ID。                                                                               |
| `data.action`     | String | 执行操作。在该响应中，该字段的值为 `add_user_whitelist`，表示将用户添加至聊天室白名单中。 |
| `data.user`       | String | 添加的用户 ID。                                                                           |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X POST -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' 'https://XXXX/app-id/XXXX/chatrooms/{66XXXX33}/white/users/{username}'
```

##### 响应示例

```json
{
  "action": "post",
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/66XXXX33/white/users/wzy_xiaomi",
  "entities": [],
  "data": {
    "result": true,
    "action": "add_user_whitelist",
    "user": "wzy_xiaomi",
    "chatroomid": "66XXXX33"
  },
  "timestamp": 1594724293063,
  "duration": 4
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 400     | forbidden_op | users [XXX] are not members of this group! | 要添加白名单的用户 ID 不在聊天室中。 | 传入聊天室成员的用户 ID。 |
| 404     | resource_not_found | grpID XXX does not exist! | 聊天室不存在。 | 使用合法的聊天室 ID。|

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 批量添加用户至聊天室白名单

添加多个用户至聊天室白名单。你一次最多可添加 60 个用户。用户添加至聊天室白名单后，在聊天室全员禁言时，仍可以在聊天室中发送消息。

#### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/chatrooms/{chatroom_id}/white/users
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述          |
| :-------------- | :----- | :------- | :----------------------------------------------- |
| `Content-Type`  | String | 是       | 内容类型。请填 `application/json`。        |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。         |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### 请求 body

| 参数        | 类型  | 描述              |
| :---------- | :---- | :------------------- |
| `usernames` | Array | 待添加至聊天室白名单中的用户 ID，每次最多可传 60 个。|

其他字段及描述详见 [公共参数](#公共参数)。

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段              | 类型   | 描述                |
| :---------------- | :----- | :--------------- |
| `data` | JSON Array | 响应数据。|
|  - `result`     | Bool   | 是否成功将用户批量添加至聊天室白名单：<br/> - `true`：是；<br/> - `false`：否。         |
|  - `reason`     | String | 添加失败的原因。                                                                        |
|  - `chatroomid` | String | 聊天室 ID。                                                                             |
|  - `action`     | String | 执行的操作。在该响应中，该字段的值为 `add_user_whitelist`，表示添加用户至聊天室白名单。 |
|  - `user`       | String | 添加至聊天室白名单中的用户 ID。                                                         |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' -d '{"usernames" : ["user1"]}' 'https://XXXX/app-id/XXXX/chatrooms/{chatroomid}/white/users'
```

##### 响应示例

```json
{
  "action": "post",
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/66XXXX33/white/users",
  "entities": [],
  "data": [
    {
      "result": true,
      "action": "add_user_whitelist",
      "user": "wzy_test",
      "chatroomid": "66XXXX33"
    },
    {
      "result": true,
      "action": "add_user_whitelist",
      "user": "wzy_meizu",
      "chatroomid": "66XXXX33"
    }
  ],
  "timestamp": 1594724634191,
  "duration": 2
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 400     | invalid_parameter | usernames size is more than max limit : 60 | 批量添加白名单超过上限（60）。 | 调整要添加的数量在限制（60）以下. |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 400     | forbidden_op | users [XXX] are not members of this group! | 要添加白名单的用户 ID 不在聊天室中。 | 传入聊天室成员的用户 ID。 |
| 404     | resource_not_found | grpID XXX does not exist! | 聊天室不存在。 | 使用合法的聊天室 ID。|

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 将用户移出聊天室白名单

将指定用户从聊天室白名单移除。你每次最多可移除 60 个用户。

#### HTTP 请求

```http
DELETE https://{host}/app-id/{app_id}/chatrooms/{chatroom_id}/white/users/{username}
```

##### 路径参数

| 参数        | 类型   | 描述                | 是否必填 |
| :---------- | :----- | :------------------------- | :------- |
| `usernames` | String | 要从聊天室白名单中移除的用户 ID，最多可传 60 个，用户 ID 之间以英文逗号（","）分隔。   | 是       |

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述             |
| :-------------- | :----- | :------- | :--------------------------- |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。       |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段              | 类型   | 描述                |
| :---------------- | :----- | :-------------- |
| `data`          | JSON Array | 响应数据。 |
|  - `result`     | Bool   | 是否成功将用户移出聊天室白名单：<br/> - `true`：是；<br/> - `false`：否。                  |
|  - `chatroomid` | String | 聊天室 ID。                                                                                |
|  - `action`     | String | 执行的操作。在该响应中，该字段的值为 `remove_user_whitelist`，表示将用户移出聊天室白名单。 |
|  - `user`       | String | 移除聊天室白名单的用户 ID。    |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X DELETE -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' 'https://XXXX/app-id/XXXX/chatrooms/{66XXXX33}/white/users/{username}'
```

##### 响应示例

```json
{
  "action": "delete",
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/66XXXX33/white/users/wzy_huawei,wzy_meizu",
  "entities": [],
  "data": [
    {
      "result": true,
      "action": "remove_user_whitelist",
      "user": "wzy_huawei",
      "chatroomid": "66XXXX33"
    },
    {
      "result": true,
      "action": "remove_user_whitelist",
      "user": "wzy_meizu",
      "chatroomid": "66XXXX33"
    }
  ],
  "timestamp": 1594725137704,
  "duration": 1
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 400     | invalid_parameter | removeWhitelist size is more than max limit : 60 | 批量移除白名单超过上限（60）。 | 调整要移除的数量在限制（60）以下。 |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 400     | forbidden_op | users [XXX] are not members of this group! | 要加入白名单的用户 ID 不在聊天室中。 | 传入聊天室成员的用户 ID。 |
| 404     | resource_not_found | grpID XXX does not exist! | 聊天室不存在。 | 使用合法的聊天室 ID。|

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。