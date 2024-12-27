# 获取用户离线消息数据

你可以获取单个用户的离线消息数量，以及查看该用户单个离线消息的投递状态。

## 公共参数

以下表格列举了声网即时通讯 IM 的 RESTful 接口的公共请求参数和响应参数：

### 请求参数

| 参数       | 类型   | 是否必需 | 描述         |
| :--------- | :----- | :------- | :------------------------- |
| `host`     | String | 是       | 声网即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `app_id`     | String | 是       | 声网为每个项目自动分配的 App ID，作为项目唯一标识。 | 
| `username`     | String | 是       | 调用该接口的用户 ID。 | 

### 响应参数

| 参数                 | 类型   | 描述            |
| :------------------- | :----- | :-------------------------------------------- |
| `action`             | String | 请求方法。                                   |
| `uri`                | String | 请求 URL。                |
| `path`               | String | 请求路径，属于请求 URL 的一部分，开发者无需关注。       |
| `entities`           | JSON Array | 响应实体。          |
| `data`               | JSON   | 实际获取的数据详情。            |
| `timestamp`          | Long   | HTTP 响应的 Unix 时间戳，单位为毫秒。       |
| `duration`           | Long   | 从发送 HTTP 请求到响应的时长, 单位为毫秒。     |

## 前提条件

要调用声网即时通讯 RESTful API，请确保满足以下要求：

- 已在[声网控制台](https://console.shengwang.cn/overview) [开通配置声网即时通讯 IM 服务](enable_im.html)。
- 已从服务端获取 app token，详见 [使用 Token 鉴权](token_authentication.html)。
- 了解声网即时通讯 IM API 的调用频率限制，详见 [接口频率限制](limitationapi.html)。

## 认证方式

声网即时通讯 IM RESTful API 要求 Bearer HTTP 认证。每次发送 HTTP 请求时，都必须在请求头部填入如下 `Authorization` 字段：

`Authorization: Bearer YourAppToken`

为提高项目的安全性，声网使用 Token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 RESTful API 推荐使用 app token 的 鉴权方式，详见 [使用 Token 鉴权](token_authentication.html)。

## 获取用户离线消息数量

获取声网 IM 用户的离线消息数量。

#### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/users/{owner_username}/offline_msg_count
```

##### 路径参数

| 参数             | 类型   | 是否必需 | 描述                          |
| :--------------- | :----- | :------- | :---------------------------- |
| `owner_username` | String | 是       | 要获取离线消息数量的用户 ID。 |

其他参数及说明详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述      |
| :-------------- | :----- | :------- | :-------------------------- |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段   | 类型 | 描述                                                                                  |
| :----- | :--- | :------------------------------------------------------------------------------------ |
| `data` | JSON | 用户的离线消息数量。数据格式为："用户 ID": "当前离线消息的数量"，例如，"user1": "0"。 |

其他字段及说明详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X GET -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' 'http://XXXX/app-id/XXXX/users/user1/offline_msg_count'
```

##### 响应示例

```json
{
  "action": "get",
  "uri": "http://XXXX/XXXX/XXXX/users/user1/offline_msg_count",
  "entities": [],
  "data": {
    "user1": 0
  },
  "timestamp": 1542601518137,
  "duration": 3,
  "count": 0
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型     | 错误提示     | 可能原因   | 处理建议   |
| :------ | :--------- | :----------- | :--------- | :--------- |
| 401         | unauthorized                       | Unable to authenticate (OAuth)  | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。  |
| 404         | organization_application_not_found | Could not find application for XXX/XXX from URI: XXX/XXX/users | App key 不存在。   | 检查 `orgName` 和 `appName` 是否正确或[创建应用](/product/enable_and_configure_IM.html#创建应用)。 |

关于其他错误，你可以参考 [错误码](#错误码) 了解可能的原因。

## 获取指定离线消息的投递状态

获取用户的指定离线消息的投递状态，即查看该消息是否已投递。

#### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/users/{username}/offline_msg_status/{msg_id}
```

##### 路径参数

| 参数       | 类型   | 是否必需 | 描述                          |
| :--------- | :----- | :------- | :---------------------------- |
| `username` | String | 是       | 要获取离线消息状态的用户 ID。 |
| `msg_id`   | String | 是       | 要查看状态的离线消息 ID。     |

其他参数及说明详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述       |
| :-------------- | :----- | :------- | :-------------------- |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中的字段如下：

| 字段   | 类型 | 描述     |
| :----- | :--- | :--------------- |
| `data` | JSON | 指定离线消息的投递状态。数据格式为 "消息 ID": "投递状态"。消息的投递状态有两种：<br/> - `delivered`：已投递；<br/> - `undelivered`：未投递。 |

其他字段及说明详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X GET -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' 'http://XXXX/app-id/XXXX/users/user1/offline_msg_status/123'
```

##### 响应示例

```json
{
  "action": "get",
  "uri": "http://XXXX/XXXX/XXXX/users/user1/offline_msg_status/123",
  "entities": [],
  "data": {
    "123": "delivered"
  },
  "timestamp": 1542601830084,
  "duration": 5,
  "count": 0
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型     | 错误提示           | 可能原因          | 处理建议     |
| :---------- | :------------ | :-------------- | :------------------| :----------- |
| 401         | unauthorized                       | Unable to authenticate (OAuth)   | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。     |

关于其他错误，你可以参考 [错误码](#错误码) 了解可能的原因。