# 获取聊天室成员列表

<Toc />

即时通讯 IM 提供 RESTful API 接口用于分页获取聊天室成员列表。

## 前提条件

要调用即时通讯 RESTful API，请确保满足以下要求：

- 已在[声网控制台](https://console.shengwang.cn/overview)[开通配置即时通讯 IM 服务](enable_im.html)。
- 已从服务端获取 app token，详见 [使用 Token 鉴权](token_authentication.html)。
- 了解即时通讯 IM 的 API 调用频率限制，详见 [接口频率限制](limitationapi.html)。
- 了解聊天室成员相关限制，详见[使用限制](limitation.html#聊天室成员)。

## 聊天室成员角色

| 成员角色     | 描述       | 管理权限       |
| :----------- | :----------------------- | :----------------- |
| 普通成员     | 不具备管理权限的聊天室成员。                       | 普通成员可以修改自己的聊天室信息。   |
| 聊天室管理员 | 由聊天室创建者授权，协助聊天室管理，具有管理权限。 | 管理员可以管理聊天室内的普通成员。 最多支持添加 99 个管理员。  |
| 聊天室所有者 | 聊天室的创建者，具有聊天室最高权限。               | 聊天室所有者可以指定聊天室管理员、解散聊天室、更改聊天室信息、管理聊天室成员。 |

## 认证方式

即时通讯 IM 的 RESTful API 要求 Bearer HTTP 认证。每次发送 HTTP 请求时，都必须在请求头部填入如下 `Authorization` 字段：

`Authorization: Bearer YourAppToken`

为提高项目的安全性，声网使用 Token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 IM RESTful API 推荐使用 app token 的 鉴权方式，详见[使用 Token 鉴权](token_authentication.html)。

## 分页获取聊天室成员列表

可以分页获取聊天室成员列表。

### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/chatrooms/{chatroom_id}/users?pagenum={N}&pagesize={N}
```

#### 路径参数

| 参数          | 类型   | 是否必需 | 描述  |
| :------------ | :----- | :------- | :---------------- |
| `host`     | String | 是       | 即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `app_id`     | String | 是       | 声网为每个项目自动分配的 App ID，作为项目唯一标识。 | 
| `chatroom_id` | String | 是       | 聊天室 ID。  |

#### 查询参数

| 参数       | 类型 | 是否必需 | 描述      |
| :--------- | :--- | :------- | :-------------------- |
| `pagenum`  | Int  | 否       | 查询页码。默认值为 `1`。                                         |
| `pagesize` | Int  | 否       | 每页显示的聊天室成员数量。默认值为 1000。取值范围为 [0,1000]。若传入的值超过了 1000，则返回 1000 个聊天室成员。 |

#### 请求 header

| 参数            | 类型   | 是否必需 | 描述                                  |
| :-------------- | :----- | :------- | :--------------------------------- |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 参数                 | 类型   | 描述   |
| :------------------- | :----- | :------------ |
| `action`             | String | 请求方法。  |
| `params`        | JSON | 查询参数。  |
|  - `pagesize`        | Array | 每页期望显示的聊天室成员数量。  |
|  - `pagenum`        | Array | 当前页码。  |
| `uri`                | String | 请求 URL。   |
| `entities`           | JSON   | 响应实体。  |
| `data` | JSON Array | 聊天室成员信息。  |
|  - `owner`  | String | 聊天室所有者的用户 ID。例如：{“owner”: “user1”}。   |
|  - `member` | String | 普通聊天室成员或聊天室管理员的用户 ID。例如：{“member”:“user2”}。 |
| `timestamp`          | Long   | HTTP 响应的 Unix 时间戳，单位为毫秒。   |
| `duration`           | Long   | 从发送 HTTP 请求到响应的时长，单位为毫秒。     |
| `count` | Number | 本次调用实际获取的聊天室成员数量。 |

其他字段及描述详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码) 了解可能的原因。

### 示例

#### 请求示例

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X GET https://XXXX/app-id/XXXX/chatrooms/12XXXX11/users?pagenum=2&pagesize=2 -H 'Authorization: Bearer <YourAppToken>'
```

#### 响应示例

```json
{
  "action": "get",
  "params": {
    "pagesize": ["2"],
    "pagenum": ["2"]
  },
  "uri": "https://XXXX/XXXX/XXXX/chatrooms/12XXXX11/users",
  "entities": [],
  "data": [
    {
      "owner": "user1"
    },
    {
      "member": "user2"
    }
  ],
  "timestamp": 1489074511416,
  "duration": 0,
  "count": 2
}
```

### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |
| 404     | service_resource_not_found | do not find this group:XXX | 聊天室 ID 不存在。 | 传入存在的合法的聊天室 ID。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。
