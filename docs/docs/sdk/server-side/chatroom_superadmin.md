# 管理聊天室超级管理员

<Toc />

仅聊天室超级管理员具有在客户端创建聊天室的权限。即时通讯 IM 提供多个管理超级管理员的接口，包括获取、添加、撤销等操作。

## 前提条件

要调用即时通讯 RESTful API，请确保满足以下要求：

- 已在[声网控制台](https://console.shengwang.cn/overview)[开通配置即时通讯 IM 服务](enable_im.html)。
- 已从服务端获取 app token，详见 [使用 Token 鉴权](token_authentication.html)。
- 了解即时通讯 IM 的 API 调用频率限制，详见 [接口频率限制](limitationapi.html)。

## 公共参数

### 请求参数

| 参数          | 类型   | 是否必需 | 描述  |
| :------------ | :----- | :------- | :---------------- |
| `host`     | String | 是       | 即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `app_id`     | String | 是       | 声网为每个项目自动分配的 App ID，作为项目唯一标识。 | 
| `chatroom_id` | String | 是       | 聊天室 ID。  |
| `username`    | String | 是       | 用户 ID。    |
| `name`        | String | 是       | 聊天室名称，最大长度为 128 个字符。       |
| `description` | String | 是       | 聊天室描述，最大长度为 512 个字符。    |
| `maxusers`    | Int    | 否       | 聊天室成员数上限，创建聊天室时设置。该参数的默认最大值为 10,000，如需调整请联系声网商务。  |

### 响应参数

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
| `affiliations`       | Array  | 聊天室现有成员列表，数组类型，包含 `owner` 和 `member` 元素，即聊天室所有者和聊天室成员（包括聊天室管理员）。例如： "affiliations":[{"owner": "13800138001"},{"member":"v3y0kf9arx"},{"member":"xc6xrnbzci"}]。 |
| `owner`              | String | 聊天室所有者的用户 ID。例如：{"owner": "13800138001"}。     |
| `member`             | String | 聊天室成员的用户 ID，包括聊天室管理员和普通成员的用户 ID。例如：{"member":"xc6xrnbzci"}。    |
| `timestamp`          | Long   | HTTP 响应的 Unix 时间戳，单位为毫秒。   |
| `duration`           | Long   | 从发送 HTTP 请求到响应的时长，单位为毫秒。     |

## 认证方式

即时通讯 IM 的 RESTful API 要求 Bearer HTTP 认证。每次发送 HTTP 请求时，都必须在请求头部填入如下 `Authorization` 字段：

`Authorization: Bearer YourAppToken`

为提高项目的安全性，声网使用 Token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 IM RESTful API 推荐使用 app token 的 鉴权方式，详见[使用 Token 鉴权](token_authentication.html)。

## 添加超级管理员

添加一个聊天室超级管理员。

#### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/chatrooms/super_admin
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述  |
| :-------------- | :----- | :------- | :-------------- |
| `Content-Type`  | String | 是       | 内容类型。请填 `application/json`。   |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### 请求 body

| 参数         | 类型   | 是否必需 | 描述                                          |
| :----------- | :----- | :------- | :-------------------------------------------- |
| `superadmin` | String | 是       | 添加的超级管理员的用户 ID，每次只能添加一个。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段              | 类型   | 描述                                                                    |
| :---------------- | :----- | :---------------------------------------------------------------------- |
| `data.result`     | Bool   | 是否成功添加聊天室超级管理员：<br/> - `true`：是；<br/> - `false`：否。 |
| `data.properties` | String | 预留参数，开发者不用关注。                                              |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X POST 'https://XXXX/app-id/XXXX/chatrooms/super_admin'  \
-H 'Authorization: Bearer <YourAppToken>' \
-H 'Content-Type: application/json' \
-d '{
    "superadmin": "user1"
}'
```

##### 响应示例

```json
{
  "action": "post",
  "data": {
    "result": "success",
    "resource": ""
  },
  "duration": 1,
  "entities": [],
  "timestamp": 1656488117703,
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/super_admin"
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | resource_not_found | username XXX doesn't exist! | 要添加的用户 ID 不存在。 | 传入存在的用户 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 分页获取超级管理员列表

可以分页获取超级管理员列表的接口。

#### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/chatrooms/super_admin?pagenum={N}&pagesize={N}
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 查询参数

| 参数       | 类型 | 是否必需 | 描述                                    |
| :--------- | :--- | :------- | :-------------------------------------- |
| `pagenum`  | Int  | 否       | 当前页码，默认值为 `1`。                  |
| `pagesize` | Int  | 否       | 每页返回的超级管理员数量，取值范围为 [1,1000]，默认值为 `10`。 |

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述                                                                                                                 |
| :-------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------- |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段              | 类型  | 描述                       |
| :---------------- | :---- | :------------------------- |
| `data`            | Array | 超级管理员的用户 ID 列表。 |
| `params.pagesize` | Int   | 每页返回的超级管理员数量。 |
| `params.pagenum`  | Int   | 当前页码。                 |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X GET https://XXXX/app-id/XXXX/chatrooms/super_admin?pagenum=2&pagesize=2 -H 'Authorization: Bearer <YourAppToken>'
```

##### 响应示例

```json
{
  "action": "get",
  "params": {
    "pagesize": ["2"],
    "pagenum": ["2"]
  },
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/super_admin",
  "entities": [],
  "data": ["hXXXX1", "hXXXX11", "hXXXX10"],
  "timestamp": 1596187292391,
  "duration": 0,
  "count": 3
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 撤销超级管理员

撤销超级管理员权限，用户将不能再创建聊天室。

#### HTTP 请求

```http
DELETE https://{host}/app-id/{app_id}/chatrooms/super_admin/{superAdmin}
```

##### 路径参数

| 参数         | 类型   | 是否必需 | 描述                            |
| :----------- | :----- | :------- | :------------------------------ |
| `superAdmin` | String | 是       | 要撤销超级管理员权限的用户 ID。 |

其他参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述                                                                                                                 |
| :-------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------- |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段                 | 类型   | 描述                            |
| :------------------- | :----- | :------------------------------ |
| `data.newSuperAdmin` | String | 被撤销超级管理员权限的用户 ID。 |
| `data.resource`      | String | 预留参数，开发者不用关注。      |
| `properties`         | String | 预留参数，开发者不用关注。      |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -L -X DELETE 'https://XXXX/app-id/XXXX/chatrooms/super_admin/XXXX' \
-H 'Authorization: Bearer <YourAppToken>'
```

##### 响应示例

```json
{
  "action": "delete",
  "data": {
    "newSuperAdmin": "XXXX",
    "resource": ""
  },
  "duration": 0,
  "entities": [],
  "properties": {},
  "timestamp": 1656488154100,
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/super_admin/XXXX"
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | resource_not_found | username XXX doesn't exist! | 要撤销的用户 ID 不存在。 | 传入存在的用户 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

