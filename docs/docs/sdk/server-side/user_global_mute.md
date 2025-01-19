# 用户全局禁言

随着监管机制日益完善，对 app 的监管不断加强，安全合规逐渐成为 app 的生命线。

为加强 app 管理，即时通讯提供全局禁言功能，对 app 提供用户 ID 级别的禁言管理，支持在管理员发现用户违规后进行全局禁言，以维护 app 良好的内容生态环境。禁言到期后，服务器会自动解除禁言，恢复该用户发送消息的权限。

你可以对单个用户 ID 设置单聊、群组或聊天室消息全局禁言。禁言后，该用户无论通过调用客户端 API，还是使用服务端 RESTful API 都将无法在对应的单聊、群组或聊天室发送消息。

该功能可广泛用于实时互动 app 中，例如发现某用户频繁向多个聊天室发送违规广告，则可以对该用户开启全局聊天室禁言 15 天；发现某用户发表触犯红线的政治言论，则可以全局永久禁言，用户申诉通过后可以解禁。

**使用该功能前，需联系声网商务开通。**

## 公共参数

以下表格列举了即时通讯 IM 的 RESTful 接口的公共请求参数和响应参数：

### 请求参数

| 参数       | 类型   | 是否必需 | 描述   |
| :--------- | :----- | :------- | :------------------ |
| `host`     | String | 是       | 即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `app_id`     | String | 是       | 声网为每个项目自动分配的 App ID，作为项目唯一标识。 | 

### 响应参数

| 参数                 | 类型   | 描述            |
| :------------------- | :----- | :-------------------------------------------- |
| `action`             | String | 请求方法。                                   |
| `uri`                | String | 请求 URL。                |
| `path`               | String | 请求路径，属于请求 URL 的一部分，开发者无需关注。       |
| `data`               | JSON   | 实际获取的数据详情。            |
| `timestamp`          | Long   | HTTP 响应的 Unix 时间戳，单位为毫秒。       |
| `duration`           | Long   | 从发送 HTTP 请求到响应的时长, 单位为毫秒。     |

## 前提条件

要调用即时通讯 RESTful API，请确保满足以下要求：

- 已联系声网商务开通该功能。
- 已从服务端获取 app token，详见 [使用 Token 鉴权](token_authentication.html)。
- 了解即时通讯 IM API 的调用频率限制，详见 [接口频率限制](limitationapi.html)。

## 认证方式

即时通讯 IM RESTful API 要求 Bearer HTTP 认证。每次发送 HTTP 请求时，都必须在请求头部填入如下 `Authorization` 字段：

`Authorization: Bearer YourAppToken`

为提高项目的安全性，声网使用 Token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 IM RESTful API 推荐使用 app token 的 鉴权方式，详见 [使用 Token 鉴权](token_authentication.html)。

### 设置用户全局禁言

设置单个用户 ID 的单聊、群组或聊天室消息的全局禁言。设置成功后，该用户将无法在对应的单聊、群组或聊天室中发送消息。

#### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/mutes
```

##### 路径参数

参数及说明详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述          |
| :-------------- | :----- | :------- | :----------------------------- |
| `Content-Type`  | String | 是       | 内容类型。请填 `application/json`。     |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                      |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

##### 请求 body

| 参数        | 类型   | 是否必需 | 描述   |
| :---------- | :----- | :------- | :----------------------- |
| `username`  | String | 是       | 设置全局禁言的用户 ID。  |
| `chat`      | Int    | 否       | 单聊禁言时长，单位为秒，最大值为 `2147483647`。<br/> - > `0`：该用户 ID 的单聊禁言时长。 <br/> - `0`：取消该用户的单聊禁言。<br/> - `-1`：该用户被设置永久单聊禁言。<br/> - 其他负值无效。 |
| `groupchat` | Int    | 否       | 群组禁言时长，单位为秒，规则同单聊禁言。       |
| `chatroom`  | Int    | 否       | 聊天室禁言时长，单位为秒，规则同单聊禁言。     |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段          | 类型   | 描述                                          |
| :------------ | :----- | :-------------------------------------------- |
| `data`               | JSON   | 全局禁言结果。            |
| `data.result` | String | 是否成功设置用户全局禁言。`ok` 表示设置成功。 |

其他字段及说明详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -L -X POST 'https://XXXX/app-id/XXXX/mutes' \
-H 'Authorization: Bearer <YourAppToken>' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json'  \
--data-raw '{
    "username": "zs1",
    "chat": 100,
    "groupchat": 100,
    "chatroom": 100
}'
```

##### 响应示例

```json
{
  "path": "/mutes",
  "uri": "https://XXXX/XXXX/XXXX/mutes",
  "timestamp": 1631609754727,
  "action": "post",
  "data": {
    "result": "ok"
  },
  "duration": 74
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型  | 错误提示               | 可能原因        | 处理建议        |
| :----- | :---------- | :-------- | :------------------| :------------------------|
| 400         | required_property_not_found        | Entity user requires a property named username    | 用户不存在。  | 先注册用户或者检查用户名是否正确。 |
| 401         | unauthorized                       | Unable to authenticate (OAuth)   | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。              |

关于其他错误，你可以参考 [错误码](#错误码) 了解可能的原因。

### 查询单个用户 ID 全局禁言

查询单个用户的单聊、群聊和聊天室的全局禁言详情。

#### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/mutes/{username}
```

##### 路径参数

| 参数        | 类型   | 是否必需 | 描述   |
| :---------- | :----- | :------- | :----------------------- |
| `username`  | String | 是       | 要查询哪个用户的全局禁言详情。  |

其他参数及说明详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述           |
| :-------------- | :----- | :------- | :------------------------------------------------------ |
| `Content-Type`  | String | 是       | 内容类型，请填 `application/json`。                                                                                  |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                      |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段             | 类型   | 描述      |
| :--------------- | :----- | :------------------ |
| `data`               | JSON   | 用户的全局禁言详情。            |
| `data.userid`    | String | 设置禁言的用户 ID。      |
| `data.chat`      | Int    | 单聊剩余禁言时间，单位为秒。最大值为 `2147483647`。<br/> - > 0：该用户 ID 剩余的单聊禁言时长。<br/> - `0`：该用户的单聊消息禁言已取消。 <br/> - `-1`：该用户被设置永久单聊消息禁言。 |
| `data.groupchat` | Int    | 群组消息剩余禁言时长，单位为秒，规则同单聊禁言。     |
| `data.chatroom`  | Int    | 聊天室消息剩余禁言时长，单位为秒，规则同单聊禁言。       |
| `data.unixtime`  | Int    | 当前操作的 Unix 时间戳。    |

其他字段及说明详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -L -X GET 'https://XXXX/app-id/XXXX/mutes/zs1' \
-H 'Authorization: Bearer <YourAppToken>' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json'  \
```

##### 响应示例

```json
{
  "path": "/mutes",
  "uri": "https://XXXX/XXXX/XXXX/mutes/zs1",
  "timestamp": 1631609831800,
  "action": "get",
  "data": {
    "userid": "XXXX#restys_zs1",
    "chat": 96,
    "groupchat": 96,
    "chatroom": 96,
    "unixtime": 1631609831
  },
  "duration": 13
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型     | 错误提示        | 可能原因  | 处理建议                         |
| :---------- | :------------------| :-------------------| :-----------| :------------|
| 400         | required_property_not_found        | Entity user requires a property named username     | 用户不存在。 | 先注册用户或者检查用户名是否正确。 |
| 401         | unauthorized      | Unable to authenticate (OAuth)   | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。              |

关于其他错误，你可以参考 [错误码](#错误码) 了解可能的原因。

### 查询 app 下的所有全局禁言的用户

该方法查询 app 下所有全局禁言的用户及其禁言剩余时间。

#### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/mutes
```

##### 路径参数

参数及说明详见[公共参数](#公共参数)。

##### 查询参数

| 参数       | 类型 | 是否必需 | 描述                                                  |
| :--------- | :--- | :------- | :---------------------------------------------------- |
| `pageNum`  | Int  | 否       | 请求查询的页码。                                      |
| `pageSize` | Int  | 否       | 请求查询每页显示的禁言用户的数量。取值范围为 [1,50]。 |

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述                                     |
| :-------------- | :----- | :------- | :--------------------------------------- |
| `Content-Type`  | String | 是       | 内容类型。请填 `application/json`。      |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                      |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中的 `data` 字段描述如下：

| 字段     | 类型      | 描述     |
| :-------------------- | :-------- | :---------------------- |
| `data`           | JSON Array | 获取的所有全局禁言的用户的信息。       |
|  - `username`  | String    | 设置禁言的用户 ID。   |
|  - `chat`      | Int       | 单聊消息剩余禁言时间，单位为秒。最大值为 `2147483647`。 <br/> - > 0：该用户 ID 具体的单聊消息禁言时长。 <br/> - `0`：该用户的单聊消息禁言已取消。 <br/> - `-1`：该用户被设置永久单聊消息禁言。 |
|  - `groupchat` | Int       | 群组消息剩余禁言时长，单位为秒，规则同上。|
|  - `chatroom`  | Int       | 聊天室消息剩余禁言时长，单位为秒，规则同上。    |
|  - `unixtime`       | Long      | 当前操作的 Unix 时间戳，单位为毫秒。 |

其他字段及说明详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -L -X GET 'https://XXXX/app-id/XXXX/mutes?pageNum=1&pageSize=10' \
-H 'Authorization: Bearer <YourAppToken>' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json'  \
```

##### 响应示例

```json
{
  "path": "/mutes",
  "uri": "https://XXXX/XXXX/XXXX/mutes",
  "timestamp": 1631609858771,
  "action": "get",
  "data": {
    "data": [
      {
        "username": "zs2",
        "chatroom": 0
      },
      {
        "username": "zs1",
        "groupchat": 69
      },
      {
        "username": "zs1",
        "chat": 69
      },
      {
        "username": "zs1",
        "chatroom": 69
      },
      {
        "username": "h2",
        "chatroom": 0
      },
      {
        "username": "h2",
        "groupchat": 0
      },
      {
        "username": "h2",
        "chat": 0
      }
    ],
    "unixtime": 1631609858
  },
  "duration": 17
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型    | 错误提示        | 可能原因     | 处理建议         |
| :---------- | :------------------| :--------------------| :------------------| :----------------|
| 401         | unauthorized    | Unable to authenticate (OAuth)   | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。              |

关于其他错误，你可以参考 [错误码](#错误码) 了解可能的原因。







