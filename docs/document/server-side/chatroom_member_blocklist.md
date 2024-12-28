# 聊天室黑名单管理

<Toc />

即时通讯 IM 提供多个接口实现聊天室黑名单管理，包括查询聊天室黑名单、将成员添加和移除聊天室黑名单。

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
| `name`        | String | 是       | 聊天室名称，最大长度为 128 个字符。       |
| `description` | String | 是       | 聊天室描述，最大长度为 512 个字符。    |
| `maxusers`    | Int    | 否       | 聊天室成员数上限，创建聊天室时设置。该参数的默认最大值为 10,000，如需调整请联系商务。  |

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
| `username`           | String | 用户 ID。     |
| `affiliations_count` | Int    | 聊天室现有成员总数。     |
| `affiliations`       | Array  | 聊天室现有成员列表，数组类型，包含 `owner` 和 `member` 元素，即聊天室所有者和聊天室成员（包括聊天室管理员）。例如："affiliations":[{"owner": "13800138001"},{"member":"v3y0kf9arx"},{"member":"xc6xrnbzci"}]。 |
| `owner`              | String | 聊天室所有者的用户 ID。例如：{"owner": "13800138001"}。     |
| `member`             | String | 聊天室成员的用户 ID，包括聊天室管理员和普通成员的用户 ID。例如：{"member":"xc6xrnbzci"}。    |
| `timestamp`          | Long   | HTTP 响应的 Unix 时间戳，单位为毫秒。   |
| `duration`           | Long   | 从发送 HTTP 请求到响应的时长，单位为毫秒。     |

## 认证方式

即时通讯 IM 的 RESTful API 要求 Bearer HTTP 认证。每次发送 HTTP 请求时，都必须在请求头部填入如下 `Authorization` 字段：

`Authorization: Bearer YourAppToken`

为提高项目的安全性，声网使用 Token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 RESTful API 推荐使用 app token 的 鉴权方式，详见[使用 Token 鉴权](token_authentication.html)。

## 添加单个聊天室成员

向聊天室添加一个成员。如果待添加的用户在 app 中不存在或已经在聊天室中，则请求失败并返回错误码 400。

#### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/chatrooms/{chatroomid}/users/{username}
```

##### 路径参数

| 参数          | 类型   | 是否必需 | 描述  |
| :------------ | :----- | :------- | :---------------- |
| `username`    | String | 是       | 要加入聊天室黑名单的用户 ID。    |

其它参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述       |
| :-------------- | :----- | :------- | :---------- |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。      |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 参数          | 类型   | 描述                                                        |
| :------------ | :----- | :---------------------------------------------------------- |
| `data.result` | Bool   | 是否添加成功：<br/> - `true`：是；<br/> - `false`：否。     |
| `data.action` | String | 执行的操作，`add_member` 表示向聊天室添加成员。             |
| `data.id`     | String | 聊天室 ID，聊天室唯一标识符，由即时通讯 IM 服务器生成。 |
| `data.user`   | String | 添加到聊天室的用户。                                        |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X POST -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' 'https://XXXX/app-id/XXXX/chatrooms/66XXXX33/users/user1'
```

##### 响应示例

```json
{
  "action": "post",
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/66XXXX33/users/user1",
  "entities": [],
  "data": {
    "result": true,
    "action": "add_member",
    "id": "66XXXX33",
    "user": "user1"
  },
  "timestamp": 1542554038353,
  "duration": 0
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | resource_not_found | grpID XX does not exist! | 聊天室 ID 不存在。 | 传入存在的合法的聊天室 ID。 |
| 404     | resource_not_found | username XXX doesn't exist! | 要添加的用户 ID 不存在。 | 传入存在的用户 ID。 |
| 403     | forbidden_op | can not join this group, reason:user XXX has joined too many chatrooms! | 要添加的用户已加入了太多的聊天室。 | 传入其他用户 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 批量添加聊天室成员

向聊天室添加多位用户，一次性最多可添加 60 位用户。

#### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/chatrooms/{chatroomid}/users
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述                |
| :-------------- | :----- | :------- | :----------------------- |
| `Content-Type`  | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

##### 请求 body

| 参数        | 类型  | 是否必需 | 描述                 |
| :---------- | :---- | :------- | :------------------- |
| `usernames` | Array | 是       | 添加的用户 ID 数组，每次最多可传 60 个用户 ID。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 参数              | 类型   | 描述                                                                  |
| :---------------- | :----- | :-------------------------------------------------------------------- |
| `data.newmembers` | Array  | 添加成功的用户 ID 数组。                                              |
| `data.action`     | String | 执行的操作内容。在该响应中，该字段的值为 `add_member`，表示添加用户。 |
| `data.id`         | String | 聊天室 ID。                                                           |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' -d '{
   "usernames": [
     "user1","user2"
   ]
 }' 'https://XXXX/app-id/XXXX/chatrooms/66XXXX33/users'
```

##### 响应示例

```json
{
  "action": "post",
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/66XXXX33/users",
  "entities": [],
  "data": {
    "newmembers": ["user1", "user2"],
    "action": "add_member",
    "id": "66XXXX33"
  },
  "timestamp": 1542554537237,
  "duration": 9
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 400     | invalid_parameter | addMembers: addMembers number more than maxSize : 60 | 批量添加数量达到限制（60）。 | 将添加的成员数量调整在限制（60）以下。 |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | resource_not_found | grpID XX does not exist! | 聊天室 ID 不存在。 | 传入存在的合法的聊天室 ID。 |
| 404     | resource_not_found | username XXX doesn't exist! | 要添加的用户 ID 不存在。 | 传入存在的用户 ID。 |
| 403     | forbidden_op | can not join this group, reason:user XXX has joined too many chatrooms! | 要添加的用户已加入了太多的聊天室。 | 传入其他用户 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 移除单个聊天室成员

从聊天室移除一个成员。如果被移除用户不在聊天室中或聊天室不存在，将返回错误。

#### HTTP 请求

```http
DELETE https://{host}/app-id/{app_id}/chatrooms/{chatroomid}/users/{username}
```

##### 路径参数

| 参数          | 类型   | 是否必需 | 描述  |
| :------------ | :----- | :------- | :---------------- |
| `username`    | String | 是       | 要移出聊天室黑名单的用户 ID。    |

其它参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述       |
| :-------------- | :----- | :------- | :----------------------- |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。      |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 参数          | 类型   | 描述                           |
| :------------ | :----- | :------------------------------------- |
| `data.result` | Bool   | 是否成功移出聊天室成员：<br/> - `true`：是；<br/> - `false`：否。          |
| `data.action` | String | 执行的操作。在该响应中，该字段的值为 `remove_member`，表示移除聊天室成员。 |
| `data.user`   | String | 用户 ID。                                                                  |
| `data.id`     | String | 聊天室 ID。                                                                |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X DELETE -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' 'https://XXXX/app-id/XXXX/chatrooms/66XXXX33/users/user1'
```

##### 响应示例

```json
{
  "action": "delete",
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/66XXXX33/users/user1",
  "entities": [],
  "data": {
    "result": true,
    "action": "remove_member",
    "user": "user1",
    "id": "66XXXX33"
  },
  "timestamp": 1542555744726,
  "duration": 1
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 400     | forbidden_op | users [XX] are not members of this group! | 用户不在聊天室中。 | 传入聊天室中成员的用户 ID。 |
| 404     | resource_not_found | grpID XX does not exist! | 聊天室 ID 不存在。 | 传入存在的合法的聊天室 ID。 |
| 404     | resource_not_found | username XXX doesn't exist! | 要删除的用户 ID 不存在。 | 传入聊天室中成员的用户 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 批量移除聊天室成员

从聊天室移除多个成员，单次请求最多可移除 100 个成员。如果被移除用户不在聊天室中或聊天室不存在，将返回错误。

#### HTTP 请求

```http
DELETE https://{host}/app-id/{app_id}/chatrooms/{chatroomid}/users/{usernames}
```

##### 路径参数

| 参数       | 类型   | 是否必需 | 描述         |
| :--------- | :----- | :------- | :------------------ |
| `username` | String | 是 | 要移除的一个或多个用户 ID。每次最多可传 100 个用户 ID，用户 ID 之间用英文逗号（","）分隔，逗号在 URL 中转义为 "%2C"。|

其他字段及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述                                                                                                                 |
| :-------------- | :----- | :------- | :-------------------------------- |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。       |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 参数          | 类型   | 描述                                                                  |
| :------------ | :----- | :--------------------------------------- |
| `data` | JSON Array | 响应数据。|
|  - `result` | Bool   | 是否成功批量移除聊天室成员：<br/> - `true`：是；<br/> - `false`：否。 |
|  - `action` | String | 执行的操作。在该响应中，该字段的值为 `remove_member`，表示移除成员。  |
|  - `reason` | String | 移除失败的原因。                                                      |
|  - `user`   | String | 已删除成员的用户 ID 列表。                                            |
|  - `id`     | String | 聊天室 ID。                                                           |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X DELETE -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' 'https://XXXX/app-id/XXXX/chatrooms/66XXXX33/users/user1%2Cuser2'
```

##### 响应示例

```json
{
  "action": "delete",
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/66XXXX33/users/user1%2Cuser2",
  "entities": [],
  "data": [
    {
      "result": false,
      "action": "remove_member",
      "reason": "user: user1 doesn't exist in group: 66XXXX33",
      "user": "user1",
      "id": "66XXXX33"
    },
    {
      "result": true,
      "action": "remove_member",
      "user": "user2",
      "id": "66XXXX33"
    }
  ],
  "timestamp": 1542556177147,
  "duration": 0
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 400     | invalid_parameter | kickMember: kickMembers number more than maxSize : 60 | 批量删除数量达到限制（60）。 | 将传入的成员数量调整到限制（60）以下。 |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 400     | forbidden_op | users [XX] are not members of this group! | 用户不在聊天室中。 | 传入聊天室中成员的用户 ID。 |
| 404     | resource_not_found | grpID XX does not exist! | 聊天室 ID 不存在。 | 传入存在的合法的聊天室 ID。 |
| 404     | resource_not_found | username XXX doesn't exist! | 要删除的用户 ID 不存在。 | 传入聊天室中成员的用户 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 获取聊天室管理员列表

获取聊天室管理员列表的接口。

#### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/chatrooms/{chatroom_id}/admin
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述        |
| :-------------- | :----- | :------- | :--------------------------- |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。          |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 参数   | 类型  | 描述                       |
| :----- | :---- | :------------------------- |
| `data` | Array | 聊天室管理员用户 ID 数组。 |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X GET https://XXXX/app-id/XXXX/chatrooms/12XXXX11/admin -H 'Authorization: Bearer <YourAppToken>'
```

##### 响应示例

```json
{
  "action": "get",
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/12XXXX11/admin",
  "entities": [],
  "data": ["user1"],
  "timestamp": 1489073361210,
  "duration": 0,
  "count": 1
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | resource_not_found | grpID XX does not exist! | 聊天室 ID 不存在。 | 传入存在的合法的聊天室 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。