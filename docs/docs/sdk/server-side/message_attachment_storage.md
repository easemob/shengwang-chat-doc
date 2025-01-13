# 设置指定消息附件的存储方式 

声网服务器支持对用户指定的消息附件设置存储方式，可延长存储时间或实现永久存储，支持通过客户端和 RESTful API 发送图片、语音、视频、文件消息和合并消息时上传的附件（包括图片和视频的缩略图）。

对于永久存储的消息附件，用户可以随时获取这些附件。

:::tip
若使用该接口，需联系声网商务开通。
:::

**调用频率**：100 次/秒/App ID

## 前提条件

要调用声网即时通讯 RESTful API，请确保满足以下要求：

- 已在[声网控制台](https://console.shengwang.cn/overview) [开通配置声网即时通讯 IM 服务](enable_im.html)。
- 已从服务端获取 app token，详见 [使用 Token 鉴权](token_authentication.html)。
- 了解声网即时通讯 IM API 的调用频率限制，详见 [接口频率限制](limitationapi.html)。

## 认证方式

声网即时通讯 IM RESTful API 要求 Bearer HTTP 认证。每次发送 HTTP 请求时，都必须在请求头部填入如下 `Authorization` 字段：

`Authorization: Bearer YourAppToken`

为提高项目的安全性，声网使用 Token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 RESTful API 推荐使用 app token 的 鉴权方式，详见 [使用 Token 鉴权](token_authentication.html)。

## HTTP 请求

```http
POST https://{host}/app-id/{app_id}/users/{username}/chatfiles/lifetime
```

#### 路径参数

| 参数       | 类型   | 是否必需 | 描述         |
| :--------- | :----- | :------- | :------------------------- |
| `host`     | String | 是       | 即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `app_id`     | String | 是       | 声网为每个项目自动分配的 App ID，作为项目唯一标识。 | 
| `username`     | String | 是       | 调用该接口的用户 ID。 | 

其他参数及说明详见 [公共参数](#公共参数)。

#### 请求 Header

| 参数           | 类型   | 是否必需 | 描述                                |
| :------------- | :----- | :------- | :---------------------------------- |
| `Content-Type` | String | 是       | 内容类型。请填 `application/json`。 |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。  |            
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |
    
#### 请求 body

| 参数       | 类型   | 是否必需 | 描述          |
| :--------- | :----- | :------- | :-------------------------------------------- |
| `lifetime`      | String   | 是 | 消息附件保存时间：<br/> - （默认）`default`：配置的消息附件的默认有效期；<br/> - `refresh`：刷新消息附件的有效期，相当于重新设置存储时间，延长了存储时长。例如，消息附件可存储 7 天，在存储的第五天时调用了该接口，即将附件的存储时间设置为 7 天，则附件的剩余存储时间为 7 天。该设置可用于延长合并消息的附件存储时间，例如，发送合并消息时，原始图片的存储时间只剩余 1 天，调用该接口时利用该设置可将存储时间延长。<br/> - `forever`：永久有效。 |
| `chatfile_ids`      | Array   | 是 | 消息附件的文件 UUID，最多可传入 100 个。 | 

## HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 参数                 | 类型   | 描述            |
| :------------------- | :----- | :-------------------------------------------- |
| `path`               | String | 请求路径，属于请求 URL 的一部分，开发者无需关注。       |
| `uri`                | String | 请求 URL。                |
| `timestamp`          | Long   | HTTP 响应的 Unix 时间戳，单位为毫秒。       |
| `action`             | String | 请求方法。                                   |
| `data`               | JSON   | 是否成功设置消息附件的存储：<br/> - `success`：成功；<br/> - `failed`：失败。 |
| `duration`           | Long   | 从发送 HTTP 请求到响应的时长, 单位为毫秒。     |

响应字段及说明详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [错误码](#错误码)了解可能的原因。

## 示例

#### 请求示例

```shell
# 将 <YourUserToken> 替换为你的用户 Token
curl -X PUT -L "http://XXXX/app-id/XXXX/users/{username}/chatfiles/lifetime" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YourUserToken>" \
-d '{
          "lifetime": "default",
          "chatfile_ids": [
            "2fe7f0b0-0b55-XXXX-XXXX-231441e42458"
          ]
    }'
```

#### 响应示例

```json
{
  "path": "/users/test/chatfiles/lifetime",
  "uri": "https://XXXX/XXXX/XXXX/users/test/chatfiles/lifetime",
  "timestamp": 1731382587142,
  "action": "put",
  "data": {
      "359f9c50-XXXX-XXXX-92cd-07eff71e8a37": "success"
  },
  "duration": 102
}
```
## 错误码

如果返回的 HTTP 状态码非 `200`，表示请求失败，可能提示以下错误码：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 403                 | forbidden_op        |                 | 设置消息附件存储的功能未开通。          | 联系声网商务开通该功能。          |
| 400                 | illegal_argument   | chatfile_ids size is too large    | 请求中传入的消息附件的文件 ID `chatfile_ids` 超过了上限 100.  | 消息附件的文件 ID 最多可传 100 个。|
| 400               | illegal_argument   |  lifetime must be either 'forever' or 'default' or 'refresh'。     | 消息附件保存时间 `lifetime` 传入了 `forever`、`default` 或 `refresh` 之外的值。       | 消息附件保存时间 `lifetime` 只能设置为 `forever`、`default` 或 `refresh`，不能传入其他值。          |
| 401     | unauthorized | Unable to authenticate (OAuth) | token 不合法，可能过期或 token 错误。 | 使用新的 token 访问。 |

关于其他错误，你可以参考 [错误码](error.html) 了解可能的原因。
