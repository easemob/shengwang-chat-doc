# 修改文本或自定义消息

本文展示如何调用即时通讯 IM RESTful API 在服务端修改发送成功的文本消息或自定义消息。

**调用频率**：100 次/秒/App ID

:::tip
若使用该功能，需联系声网商务开通。
:::

## 前提条件

要调用即时通讯 RESTful API，请确保满足以下要求：

- 已在[声网控制台](https://console.shengwang.cn/overview)[开通配置即时通讯 IM 服务](enable_im.html)。
- 已从服务端获取 app token，详见 [使用 Token 鉴权](token_authentication.html)。
- 了解即时通讯 IM API 的调用频率限制，详见 [接口频率限制](limitationapi.html)。

## 认证方式

即时通讯 IM RESTful API 要求 Bearer HTTP 认证。每次发送 HTTP 请求时，都必须在请求头部填入如下 `Authorization` 字段：

`Authorization: Bearer YourAppToken`

为提高项目的安全性，声网使用 Token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 IM RESTful API 推荐使用 app token 的 鉴权方式，详见 [使用 Token 鉴权](token_authentication.html)。

## HTTP 请求

```http
PUT https://{host}/app-id/{app_id}/messages/rewrite/{msg_id}
```

### 路径参数

| 参数       | 类型   | 是否必需 | 描述         |
| :--------- | :----- | :------- | :------------------------- |
| `host`     | String | 是       | 即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `app_id`     | String | 是       | 声网为每个项目自动分配的 App ID，作为项目唯一标识。 | 

### 请求 header

| 参数       | 类型   | 是否必需 | 描述          |
| :-------------- | :----- | :------- | :-------------- |
| `Content-Type`  | String | 是       | 内容类型。请填 `application/json`。       |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。      |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

### 请求 body

| 参数            | 类型   | 是否必需 | 描述       |
| :-------------- | :----- | :------- | :--------------- |
| `user`| String | 否 | 修改消息的用户。|
| `new_msg` | JSON | 是 | 修改后的消息。|
| `new_msg.type` | String | 是 | 修改的消息类型：<br/> - `txt`：文本消息；<br/> - `custom`：自定义消息。|
| `new_msg.msg` | String | 是 | 修改后的消息内容。**该字段只对文本消息生效。**|
| `new_msg.customEvent` | String | 否      | 用户自定义的事件类型。该参数的值必须满足正则表达式 `[a-zA-Z0-9-_/\.]{1,32}`，长度为 1-32 个字符。**该字段只对自定义消息生效。**  |
| `new_msg.customExts`  | JSON   | 否       | 用户自定义的事件属性，类型必须是 `Map<String,String>`，最多可以包含 16 个元素。**该字段只对自定义消息生效。** |
| `new_ext` | JSON | 否 | 修改后的消息扩展信息。|
| `is_combine_ext` | Boolean | 否 | 修改后的消息扩展信息与原有扩展信息是合并还是替换。<br/> - （默认）`true`：合并；<br/> - `false`：替换。|

## HTTP 响应

### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应 body 包含如下字段：

| 参数              | 类型   | 描述          |
| :---------------- | :----- | :------------------------------- |
| `path`            | String | 请求路径，属于请求 URL 的一部分，开发者无需关注。      |
| `uri`             | String | 请求 URL。     |
| `timestamp`       | Long   | HTTP 响应的 Unix 时间戳，单位为毫秒。  |
| `action`          | String | 请求方法。     |
| `data` | String | 值为 `success`，表示消息成功修改。| 
| `duration`        | Int    | 从发送 HTTP 请求到响应的时长，单位为毫秒。 |

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [响应状态码](error.html) 了解可能的原因。

## 示例

### 请求示例

- 修改发送成功的文本消息：

```bash
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X PUT -i 'http://XXXX/app-id/XXXX/messages/rewrite/1235807318835202004' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <YourAppToken>' \
-d '{
  "user": "user1",
  "new_msg": { 
    "type": "txt",
    "msg": "update message content"
  },
}'
```

- 修改发送成功的自定义消息：

```bash
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X PUT -i 'http://XXXX/app-id/XXXX/messages/rewrite/1235807318835202004' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: Bearer <YourAppToken>' \
-d '{
  "user": "user1",
  "new_msg": { 
    "type": "custom",
    "customEvent": "custom_event",
    "customExts":{
      "ext_key1":"ext_value1"
    }
  },
  "new_ext": { 
    "key": "value",
    "old_key": "new_value"
  },
  "is_combine_ext": true
}'
```

### 响应示例

```json
{
  "path": "/messages/rewrite/1235807318835202004",
  "uri": "http://XXXX/XXXX/XXXX/messages/rewrite/1235807318835202004",
  "timestamp": 1705372388118,
  "action": "put",
  "data": "success",
  "duration": 49
}
```

## 错误码

调用该 REST API 如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型   | 错误提示   | 可能原因      | 处理建议     |
|:---------|:-------------------|:----------------------|:------------------|:----------------------|
| 400      | invalid_request_body   | Request body is invalid. Please check body is correct.   | 请求体格式不正确。 | 检查请求体内容是否合法(字段类型是否正确)。 |
| 400      |  illegal_argument  | new_msg is required     | 请求参数 `new_msg` 是空。  | 输入正确的请求参数 `new_msg`。 |
| 400      | message_rewrite_error    | The message is of a type that is currently not supported for modification. | 请求参数 `msg.type` 内容不正确。 | 输入正确的请求参数 `msg.type`。|
| 400 | InvalidMessageIdException  | The provided message ID is not a valid number.  | 消息 ID 必须是数字。 | 消息 ID 只能传入数字。   |
| 404      | message_rewrite_error  | The message is unavailable or has expired.   | 请求参数 `msg_id` 不存在。 | 输入正确的请求参数 `msg_id`。     |
| 401      | message_rewrite_error   | You are not authorized to edit this message.   | 请求参数 `msg_id` 不正确。 |  输入正确的请求参数 `msg_id`。 |
| 403      | message_rewrite_error   | The message has reached its edit limit and cannot be modified further.   | 消息 `msg_id` 的修改次数到达上线。 | 消息修改次数限制在 10 次以内。   |
| 403      | message_rewrite_error   | The rewrite message feature is not open.   | 消息修改功能未开通。  |  联系声网商务开通消息修改功能。  |
| 404 | MessageUnavailableException  | The message is unavailable or has expired.   | 修改的消息不存在或者已经过期。 | 只能修改服务端存储的消息，若消息不存在或已过期，则不能修改。|
| 409         | concurrent_operation_error         | The message has been edited by another.    | 并发调用了修改消息接口修改同一消息。 | 避免同时请求修改同一消息。  |
| 500 | RewriteMessageInternalErrorException | An unknown error occurred while processing the request.   | 内部服务异常，修改消息失败。 |    |

关于其他异常，你可以参考 [响应状态码](error.html) 了解可能的原因。



