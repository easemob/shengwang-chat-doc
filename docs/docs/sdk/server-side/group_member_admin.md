# 管理群组主和群管理员

<Toc />

即时通讯 IM 提供了多个 RESTful API 管理群主和管理员，包括转让群组、查询管理员和添加和移除单个群组管理员。

## 前提条件

要调用即时通讯 RESTful API，请确保满足以下要求：

- 已在[声网控制台](https://console.shengwang.cn/overview)[开通配置即时通讯 IM 服务](enable_im.html)。
- 已从服务端获取 app token，详见 [使用 Token 鉴权](token_authentication.html)。
- 了解即时通讯 IM API 的调用频率限制，详见 [接口频率限制](limitationapi.html)。

## 公共参数

#### 请求参数

| 参数       | 类型   | 是否必需 | 描述        |
| :--------- | :----- | :------- | :--------------- |
| `host`     | String | 是       | 即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `app_id`     | String | 是       | 声网为每个项目自动分配的 App ID，作为项目唯一标识。 | 
| `group_id` | String | 是       | 群组 ID。    |

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

## 群组角色

群组角色包含群主、群管理员和普通群成员，三个角色权限范围依次递减。

- 群主拥有群的所有权限；
- 群管理员拥有管理黑名单、白名单和禁言等权限；
- 群主加管理员数量共 100 个，即管理员最多可添加 99 个。

## 认证方式

即时通讯 IM RESTful API 要求 Bearer HTTP 认证。每次发送 HTTP 请求时，都必须在请求头部填入如下 `Authorization` 字段：

`Authorization: Bearer YourAppToken`

为提高项目的安全性，声网使用 Token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 IM RESTful API 推荐使用 app token 的 鉴权方式，详见 [使用 Token 鉴权](token_authentication.html)。

## 转让群组

修改群主为同一群组中的其他成员。

#### HTTP 请求

```http
PUT https://{host}/app-id/{app_id}/chatgroups/{group_id}
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述          |
| :-------------- | :----- | :------- | :------------- |
| `Content-Type`  | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                                                                                  |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

##### 请求 body

| 参数       | 类型   | 描述                      |
| :--------- | :----- | :------------------------ |
| `newowner` | String | 群组的新群主的用户 ID。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段            | 类型 | 描述                                                            |
| :-------------- | :--- | :-------------------------------------------------------------- |
| `data.newowner` | Bool | 操作结果：<br/> - `true`：转让成功。<br/> - `false`：转让失败。 |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Bearer <YourAppToken>' -d '{ "newowner": "user2" }' 'https://XXXX/app-id/XXXX/chatgroups/66XXXX85'
```

##### 响应示例

```json
{
  "action": "put",
  "uri": "https://XXXX/XXXX/XXXX/chatgroups/66XXXX85",
  "entities": [],
  "data": {
    "newowner": true
  },
  "timestamp": 1542537813420,
  "duration": 0
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 403     | forbidden_op | user: XX doesn't exist in group: XXX | 要转让的新群主不在群组中。 | 传入群组成员的用户 ID。 |
| 403     | forbidden_op | new owner and old owner are the same | 新群主和旧群主不能是同一群成员。 | 传入的新群主的用户 ID 不能与旧群主的用户 ID 相同。 |
| 404     | resource_not_found | grpID XX does not exist! | 群组不存在。 | 使用合法的群 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 获取群管理员列表

获取群组管理员列表。

#### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/chatgroups/{group_id}/admin
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述            |
| :-------------- | :----- | :------- | :-------------------------------- |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段   | 类型  | 描述                       |
| :----- | :---- | :------------------------- |
| `data` | Array | 群组管理员的用户 ID 列表。 |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X GET HTTP://XXXX/app-id/XXXX/chatgroups/10XXXX85/admin -H 'Authorization: Bearer <YourAppToken>'
```

##### 响应示例

```json
{
  "action": "get",
  "uri": "https://XXXX/XXXX/XXXX/chatgroups/10XXXX85/admin",
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
| 404     | resource_not_found | grpID XX does not exist! | 群组不存在。 | 使用合法的群 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 添加群管理员

将一个普通群成员设为群管理员。群管理员有管理黑名单、禁言等权限。最多可以添加 99 个群管理员。

#### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/chatgroups/{group_id}/admin
```

##### 路径参数

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述    |
| :-------------- | :----- | :------- | :-------- |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

##### 请求 body

| 参数       | 类型   | 是否必需 | 描述                        |
| :--------- | :----- | :------- | :-------------------------- |
| `newadmin` | String | 是       | 要添加的新管理员的用户 ID。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段            | 类型   | 描述                    |
| :-------------- | :----- | :---------------------- |
| `data`          | JSON   | 群管理员添加结果。      |
| `data.result`   | String | 群管理员是否添加成功。  |
| `data.newadmin` | String | 添加的管理员的用户 ID。 |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X POST HTTP://XXXX/app-id/XXXX/chatgroups/10XXXX85/admin -d '{"newadmin":"user1"}' -H 'Authorization: Bearer <YourAppToken>'
```

##### 响应示例

```json
{
  "action": "post",
  "data": {
    "result": "success",
    "newadmin": "man"
  },
  "duration": 0,
  "entities": [],
  "properties": {},
  "timestamp": 1680074570600,
  "uri": "https://XXXX/XXXX/XXXX/chatgroups/190141728620545/admin"
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | resource_not_found | user: XX doesn't exist in group: XXX | 用户不在群组中。 | 传入群组成员的用户 ID。 |
| 404     | resource_not_found | grpID XX does not exist! | 群组不存在。 | 使用合法的群 ID。|

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 移除群管理员

将用户的角色从群管理员降为群普通成员。

#### HTTP 请求

```http
DELETE https://{host}/app-id/{app_id}/chatgroups/{group_id}/admin/{username}
```

##### 路径参数

| 参数       | 类型   | 是否必需 | 描述        |
| :--------- | :----- | :------- | :--------------- |
| `username` | String | 是       | 要移出群组管理员列表的管理员的用户 ID。             |

参数及描述详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述     |
| :-------------- | :----- | :------- | :----------- |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段            | 类型   | 描述                                                                         |
| :-------------- | :----- | :--------------------------------------------------------------------------- |
| `data.result`   | Bool   | 操作结果：<br/> - `success`：表示移除成功; <br/> - `failure`：表示移除失败。 |
| `data.oldadmin` | String | 被移除的管理员用户 ID。                                                      |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X DELETE HTTP://XXXX/app-id/XXXX/chatgroups/10XXXX85/admin/user1 -H 'Authorization: Bearer <YourAppToken>'
```

##### 响应示例

```json
{
  "action": "delete",
  "uri": "https://XXXX/XXXX/XXXX/chatgroups/10XXXX85/admin/user1",
  "entities": [],
  "data": {
    "result": "success",
    "oldadmin": "user1"
  },
  "timestamp": 1489073432732,
  "duration": 1
}
```

#### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 403     | forbidden_op | user:XX is not admin of group:XX | 用户不是这个群的管理员。 | 传入在群组中管理员的用户 ID。 |
| 404     | resource_not_found | grpID XX does not exist! | 群组不存在。 | 使用合法的群 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。


