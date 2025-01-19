# 导入消息

<Toc />

数据迁移时，你可以调用接口导入单聊和群聊的历史消息到声网服务器。本文中的两个 RESTful API 只支持单条消息的导入。                   

## 前提条件

要调用即时通讯 RESTful API，请确保满足以下要求：

- 已在[声网控制台](https://console.shengwang.cn/overview)[开通配置即时通讯 IM 服务](enable_im.html)。
- 已从服务端获取 app token，详见 [使用 Token 鉴权](token_authentication.html)。
- 了解即时通讯 IM API 的调用频率限制，详见 [接口频率限制](limitationapi.html)。

## 公共参数

#### 请求参数

| 参数       | 类型   | 是否必需 | 描述         |
| :--------- | :----- | :------- | :------------------------- |
| `host`     | String | 是       | 即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `app_id`     | String | 是       | 声网为每个项目自动分配的 App ID，作为项目唯一标识。 | 
| `username`     | String | 是       | 调用该接口的用户 ID。 | 

#### 响应参数

| 参数              | 类型   | 描述                                                                           |
| :---------------- | :----- | :----------------------------------------------------------------------------- |
| `action`          | String | 请求方法。                                                                     |
| `uri`             | String | 请求 URL。                                                                     |
| `path`            | String | 请求路径，属于请求 URL 的一部分，开发者无需关注。                              |
| `entities`        | JSON   | 响应实体。                                                                     |
| `host`     | String | 是       | 即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `data`            | JSON   | 实际获取的数据详情。                                                           |
| `timestamp`       | Long   | HTTP 响应的 Unix 时间戳，单位为毫秒。                                          |
| `duration`        | Int    | 从发送 HTTP 请求到响应的时长，单位为毫秒。                                     |

## 认证方式

即时通讯 IM RESTful API 要求 Bearer HTTP 认证。每次发送 HTTP 请求时，都必须在请求头部填入如下 `Authorization` 字段：

`Authorization: Bearer YourAppToken`

为提高项目的安全性，声网使用 Token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 IM RESTful API 推荐使用 app token 的 鉴权方式，详见 [使用 Token 鉴权](token_authentication.html)。

## 导入单聊消息

你可以在数据迁移时导入单聊消息。每次调用该接口只能导入一条消息。

### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/messages/users/import
```

#### 路径参数

参数及描述详见 [公共参数](#公共参数)。

#### 请求 header

| 参数            | 类型   | 是否必需 | 描述            |
| :-------------- | :----- | :------- | :--------------------------------------------------------- |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### 请求 body

| 参数            | 类型   | 是否必需 | 描述        |
| :-------------- | :----- | :------- | :------------------------------------------------ |
| `from`          | String | 是       | 消息发送方的用户 ID。        |
| `target`        | String | 是       | 消息接收方的用户 ID。          |
| `type`          | String | 是       | 消息类型：<br/> - `txt`：文本消息；<br/> - `img`：图片消息；<br/> - `audio`：语音消息；<br/> - `video`：视频消息；<br/> - `file`：文件消息；<br/> - `loc`：位置消息；<br/> - `cmd`：透传消息；<br/> - `custom`：自定义消息。 |
| `body`          | JSON   | 是       | 消息内容。      |
| `ext`   | JSON   | 否       | 消息支持扩展字段，可添加自定义信息。例如，请求中的 "key1": "value1"。  |
| `is_ack_read`   | Bool   | 否       | 是否设置会话已读。<br/> - `true`：是；<br/> - `false`：否。<br/>调用该接口导入消息后会生成对应的会话，若该字段为 `true`，则会话为已读状态，为 `false` 表示会话为未读状态。 |
| `msg_timestamp` | Long   | 否       | 要导入的消息的时间戳，单位为毫秒。若不传该参数，声网服务器会将导入的消息的时间戳设置为当前时间。   |
| `need_download` | Bool   | 否       | 是否需要下载附件并上传到服务器。<br/> - `true`：是。这种情况下，需确保附件地址可直接访问，没有访问权限的限制。<br/> - （默认）`false`：否。  |

与发送单聊消息类似，不同类型的消息只是 `body` 字段内容存在差异。详见 [发送单聊消息](message_single.html)。

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段     | 类型   | 描述                    |
| :------- | :----- | :---------------------- |
| `msg_id` | String | 导入消息返回的消息 ID。 |

其他参数及说明详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [响应状态码](error.html) 了解可能的原因。

### 示例

#### 请求示例

导入文本消息：

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token
curl -X POST -H "Authorization: Bearer <YourAppToken>" "http://XXXX/app-id/XXXX/messages/users/import" -d '{
    "target": "username2",
    "type": "txt",
    "body": {
        "msg": "import message."
    },
    "ext": {
      "key1": "value1"
    },
    "from": "username1",
    "is_ack_read": true,
    "msg_timestamp": 1656906628428
}'
```

导入图片消息：

```bash
# 将 <YourAppToken> 替换为你在服务端生成的 App Token
curl -X POST -H "Authorization: Bearer <YourAppToken>" "http://XXXX/app-id/XXXX/messages/users/import" -d '{
    "target": "username2",
    "type": "img",
    "body": {
        "url": "<YourImageUrl>",
        "filename": "<ImageFileName>",
        "size": {
            "width": 1080,
            "height": 1920
        }   
    },
    "ext": {
        "key1": "value1"
    }, 
    "from": "username1",
    "is_ack_read": true,
    "msg_timestamp": 1656906628428,
    "need_download": true
}'
```

#### 响应示例

```json
{
  "path": "/messages/users/import",
  "uri": "http://XXXX/app-id/XXXX/messages/users/import",
  "timestamp": 1638440544078,
  "entities": [],
  "action": "post",
  "data": {
    "msg_id": "10212123848595"
  },
  "duration": 3
}
```

### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型    | 错误提示       | 可能原因    | 处理建议       |
|:---------|:-------------------|:--------------|:--------------|:----------------------|
| 400      | invalid_request_body     | Request body is invalid. Please check body is correct.    | 请求体格式不正确。  | 检查请求体内容是否合法(字段类型是否正确)。 |
| 400      | illegal_argument   | message body not allow empty  | 请求参数 `body` 是空。  | 输入正确的请求参数 `body`。         |
| 400      | illegal_argument    | type not allow empty  | 请求参数 `type` 是空字符串。 | 输入正确的请求参数 `type`。         |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。

## 导入群聊消息

你可以在数据迁移时导入群聊消息。每次调用该接口只能导入一条消息。

### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/messages/chatgroups/import
```

#### 路径参数

参数及描述详见 [公共参数](#公共参数)。

#### 请求 header

| 参数            | 类型   | 是否必需 | 描述           |
| :-------------- | :----- | :------- | :------------------------------------------------------------------------- |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### 请求 body

| 参数            | 类型   | 是否必需 | 描述                |
| :-------------- | :----- | :------- | :---------------------------------------------- |
| `from`          | String | 是       | 消息发送方的用户 ID。                  |
| `target`        | String | 是       | 群组 ID。                |
| `type`          | String | 是       | 消息类型：<br/> - `txt`：文本消息；<br/> - `img`：图片消息；<br/> - `audio`：语音消息；<br/> - `video`：视频消息；<br/> - `file`：文件消息；<br/> - `loc`：位置消息；<br/> - `cmd`：透传消息；<br/> - `custom`：自定义消息。 |
| `body`          | JSON   | 是       | 消息内容。                  |
| `ext`   | JSON   | 否       | 消息支持扩展字段，可添加自定义信息。例如，请求中的 "key1": "value1"。  |
| `is_ack_read`   | Bool   | 否       | 是否设置消息是否已读。<br/> - `true`：是；<br/> - `false`：否。 |
| `msg_timestamp` | Long   | 否       | 要导入的消息的时间戳，单位为毫秒。若不传该参数，声网服务器会将导入的消息的时间戳设置为当前时间。 |
| `need_download` | Bool   | 否       | 是否需要下载附件并上传到服务器。<br/> - `true`：是。这种情况下，需确保附件地址可直接访问，没有访问权限的限制。<br/> - （默认）`false`：否。     |

:::tip
与发送消息类似，不同类型的消息只是 `body` 字段内容存在差异。详见 [发送群聊消息](message_group.html)。
:::

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 字段     | 类型   | 描述                    |
| :------- | :----- | :---------------------- |
| `msg_id` | String | 导入消息返回的消息 ID。 |

其他参数及说明详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [响应状态码](error.html) 了解可能的原因。

### 示例

#### 请求示例

导入文本消息：

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token
curl -X POST -H "Authorization: Bearer <YourAppToken> " "http://XXXX/app-id/XXXX/messages/chatgroups/import" -d '{
    "target": "1123376564212",
    "type": "txt",
    "body": {
        "msg": "import message."
    },
    "ext": {
        "key1": "value1"
    }, 
    "from": "username1",
    "is_ack_read": true,
    "msg_timestamp": 1656906628428
}'
```

导入图片消息：

```shell
# 将 <YourAppToken> 替换为你在服务端生成的 App Token
curl -X POST -H "Authorization: Bearer <YourAppToken> " "http://XXXX/app-id/XXXX/messages/chatgroups/import" -d '{
    "target": "1123376564212",
    "type": "img",
    "body": {
        "url": "<YourImageUrl>",
        "filename": "<ImageFileName>",
        "size": {
            "width": 1080,
            "height": 1920
        }
    },
    "ext": {
        "key1": "value1"
    }, 
    "from": "username1",
    "is_ack_read": true,
    "msg_timestamp": 1656906628428,
    "need_download": true
}'

```

#### 响应示例

```json
{
  "path": "/messages/users/import",
  "uri": "http://XXXX/XXXX/XXXX/messages/chatgroups/import",
  "timestamp": 1638440544078,
  "entities": [],
  "action": "post",
  "data": {
    "msg_id": "10212123848595"
  },
  "duration": 3
}
```

### 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码 | 错误类型       | 错误提示   | 可能原因    | 处理建议                  |
|:---------|:-------------------|:----------------|:--------------|:----------------------|
| 400      | invalid_request_body | Request body is invalid. Please check body is correct.   | 请求体格式不正确。  | 检查请求体内容是否合法(字段类型是否正确)。 |
| 400      | illegal_argument   | message body not allow empty    | 请求参数 `body` 是空。    | 输入正确的请求参数 `body`。  |
| 400      | illegal_argument  | type not allow empty   | 请求参数 `type` 是空字符串。 | 输入正确的请求参数 `type`。 |

关于其他错误，你可以参考 [响应状态码](error.html) 了解可能的原因。
