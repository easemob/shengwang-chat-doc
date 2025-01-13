# 离线推送设置

<Toc />

本文展示如何调声网即时通讯 RESTful API 实现离线推送，包括设置离线推送通知显示的昵称、推送通知方式及免打扰模式。调用以下方法前，请先参考 [接口频率限制](limitationapi.html) 了解即时通讯 RESTful API 的调用频率限制。

:::tip
若要使用离线推送的高级功能，即设置推送通知模式、免打扰模式和自定义推送模板，你需要在[声网控制台](https://console.shengwang.cn/overview)中点击你的应用后选择 **即时通讯** > **功能配置** > **总览** 开通离线推送高级功能。
:::

## 公共参数

以下表格列举了即时通讯 RESTful API 的公共请求参数和响应参数：

### 请求参数

| 参数       | 类型   | 是否必需 | 描述   |
| :--------- | :----- | :------- | :------------------ |
| `host`     | String | 是       | 即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `app_id`     | String | 是       | 声网为每个项目自动分配的 App ID，作为项目唯一标识。 | 

### 响应参数

| 参数              | 类型   | 描述                                                                           |
| :---------------- | :----- | :----------------------------------------------------------------------------- |
| `action`          | String | 请求方式。                                                                     |
| `uri`             | String | 请求 URL。                                                                     |
| `timestamp`       | Long   | HTTP 响应的 Unix 时间戳，单位为毫秒。                                          |
| `duration`        | Int    | 从发送 HTTP 请求到响应的时长，单位为毫秒。                                     |
## 前提条件

要调用声网即时通讯 RESTful API，请确保满足以下要求：

- 已在[声网控制台](https://console.shengwang.cn/overview) [开通配置声网即时通讯 IM 服务](enable_im.html)。
- 已从服务端获取 app token，详见 [使用 Token 鉴权](token_authentication.html)。
- 了解声网即时通讯 IM API 的调用频率限制，详见 [接口频率限制](limitationapi.html)。

## 认证方式

声网即时通讯 IM RESTful API 要求 Bearer HTTP 认证。每次发送 HTTP 请求时，都必须在请求头部填入如下 `Authorization` 字段：

`Authorization: Bearer YourAppToken`

为提高项目的安全性，声网使用 Token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 RESTful API 推荐使用 app token 的 鉴权方式，详见 [使用 Token 鉴权](token_authentication.html)。

## 绑定和解绑推送信息 

推送消息时，设备与推送信息会进行绑定，包括设备 ID、推送证书和 device token。

- 设备 ID：SDK 为每个设备分配的唯一标识符。

- device token：第三方推送服务提供的推送 token，该 token 用于标识每台设备上的每个应用，第三方推送服务通过该 token 明确消息是发送给哪个设备的，然后将消息转发给设备，设备再通知应用程序。例如，对于 FCM 推送，device token 指初次启动你的应用时 FCM SDK 为客户端应用实例生成的注册令牌 (registration token)。

- 推送证书：推送证书由第三方推送服务提供，一个 app 对应一个推送证书。

用户从第三方推送服务器获取 device token 和证书名称，然后向声网即时通讯服务器上传，服务器根据 device token 向用户推送消息。

你可以调用该接口对设备与推送信息进行绑定或解绑。

### HTTP 请求

```
PUT https://{host}/app-id/{app_id}/users/{userId}/push/binding
```

#### 路径参数

| 参数       | 类型   | 描述   | 是否必需 | 
| :--------- | :----- | :------- | :------------------ |
| `userId` | String | 要绑定或解绑哪个用户的设备与推送信息。    | 是       | 

其他参数及说明详见 [公共参数](#公共参数)。

#### 请求 header

| 参数            | 类型   | 描述                                                         | 是否必需 |
| :-------------- | :----- | :----------------------------------------------------------- | :------- |
| `Content-Type`  | String | 内容类型。请填 `application/json`。                          | 是       |
| `Authorization` | String | `Bearer ${YourAppToken}` Bearer 是固定字符，后面加英文空格，再加上获取到的 app token 的值。 | 是       |

### 请求 body

| 参数            | 类型   | 描述                                                         | 是否必需 |
| :-------------- | :----- | :----------------------------------------------------------- | :------- |
| `device_id`     | String | 移动端设备标识，服务端用于识别设备，进行推送信息的绑定和解绑。 | 是       |
| `notifier_name` | String | 推送证书名称。<br/> - 传入的证书名称必需与你在[声网控制台](https://console.shengwang.cn/overview)的**添加推送证书**页面上填写的证书名称一致，否则推送失败。<br/> - 若 `notifier_name` 为空，表示解除当前设备与所有推送信息的绑定。 | 是       |
| `device_token`  | String | 推送设备 token。错误的信息会推送失败，且服务端自动解除绑定。若 `device_token` 为空，则会解除当前用户当前设备 ID 和当前证书名的绑定。 | 是       |

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 参数        | 类型   | 描述                                                         |
| :---------- | :----- | :----------------------------------------------------------- |
| `entities`  | Array  | 当前设备绑定的推送信息列表。如果发送该绑定请求后该设备无任何推送绑定信息，则返回空列表。 |

其他参数及说明详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [常见错误码](#常见错误码) 了解可能的原因。

### 示例

#### 请求示例

**绑定请求**

```shell
curl -L -X PUT 'https://XXXX/app-id/XXXX/users/XXXX/push/binding' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <YourAppToken>' \
-d '{    
    "device_id": "8ce08cad-XXXX-XXXX-86c8-695a0d247cda",    
    "device_token": "XXXX",    
    "notifier_name": "104410638"
}'
```

**解除绑定**

```shell
curl -L -X PUT 'https://XXXX/app-id/XXXX/users/XXXX/push/binding' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <YourAppToken>' \
-d '{    
    "device_id": "8ce08cad-XXXX-XXXX-86c8-695a0d247cda",    
    "device_token": "",    
    "notifier_name": "104410638"
}'
```

#### 响应示例

**绑定响应**

```json
{ 
  "timestamp": 1688030642443, 
  "entities": [ 
    {            
      "device_id": "8ce08cad-9369-XXXX-XXXX-695a0d247cda",
      "device_token": "BAEAAAAAB.jkuDmf8hRUPDgOel-zX9exVlcjS1akCWQIUA3cBbB_DprnHMeFR11PV1of1sVNKPmKdKhMB22YuO8-Z_Ksoqxo8Y",
      "notifier_name": "104410638"       
    }   
  ],    
  "action": "put",   
  "duration": 28
}
```

**解除绑定响应**

```json
{    
  "timestamp": 1688030767345,    
  "entities": [],    
  "action": "put",    
  "duration": 24
}
```

## 查询推送绑定信息

查询当前用户的所有设备的推送绑定信息。

### HTTP 请求

```
GET https://{host}/app-id/{app_id}/users/{userId}/push/binding
```

#### 路径参数

| 参数       | 类型   | 描述   | 是否必需 | 
| :--------- | :----- | :------- | :------------------ |
| `userId` | String | 要查询哪个用户的推送绑定信息。    | 是       | 

其他参数及说明详见 [公共参数](#公共参数)。

#### 请求 header

| 参数            | 类型   | 描述             | 是否必需 |
| :-------------- | :----- | :------------------------------ | :------- |
| `Authorization` | String | `Bearer ${YourAppToken}` Bearer 是固定字符，后面加英文空格，再加上获取到的 app token 的值。 | 是       |

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 参数       | 类型  | 描述                                                         |
| :--------- | :---- | :----------------------------------------------------------- |
| `entities` | Array | 当前用户的所有设备的推送绑定信息列表。若当前用户的任何设备均无推送绑定信息，则返回空列表。 |

其他参数及说明详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [常见错误码](#常见错误码) 了解可能的原因。

### 示例

#### 请求示例

```shell
curl -L -X GET 'https://XXXX/XXXX/XXXX/users/XXXX/push/binding' \
-H 'Authorization: Bearer <YourAppToken>'
```

### 响应示例

```json
{    
  "timestamp": 1688031327535,   
  "entities": [       
    {            
      "device_id": "8ce08cad-9369-XXXX-XXXX-695a0d247cda",      
      "device_token": "BAEAAAAAB.jkuDmf8hRUPDgOel-XXXX_XXXX_Ksoqxo8Y",  
      "notifier_name": "104410638"      
    }   
    {            
      "device_id": "8ce08cad-9369-XXXX-XXXX-695a0d247cda",      
      "device_token": "BAEAAAAAB.jkuDmf8hRUPDgOel-XXXX_XXXX_Ksoqxo8Y",  
      "notifier_name": "104410638"      
    }  
  ],    
  "action": "get",    
  "duration": 6
}
```

## 设置离线推送时显示的昵称

设置离线推送时显示的昵称。

### HTTP 请求

```http
PUT https://{host}/app-id/{app_id}/users/{userId}
```

#### 路径参数

| 参数       | 类型   | 描述   | 是否必需 | 
| :--------- | :----- | :------- | :------------------ |
| `userId` | String | 要设置哪个用户的推送显示昵称。传入该用户的用户 ID。    | 是       | 

其他参数及说明详见 [公共参数](#公共参数)。

#### 请求 header

| 参数            | 类型   | 描述                                                                                                                 | 是否必需 |
| :-------------- | :----- | :------------------------------------------------------------------------------------------------------------------- | :------- |
| `Content-Type`  | String | 内容类型。请填 `application/json`。                                                                                  | 是       |
| `Accept`        | String | 内容类型。请填 `application/json`。                                                                                  | 是       |
| `Authorization` | String | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 | 是       |

#### 请求 body

请求包体为 JSON Object 类型，包含以下字段：

| 参数       | 类型   | 描述         | 是否必需 |
| :--------- | :----- | :------------------- | :------- |
| `nickname` | String | 离线推送时在接收方的客户端推送通知栏中显示的发送方的昵称。你可以自定义该昵称，长度不能超过 100 个字符。<br/>支持以下字符集：<br/> - 26 个小写英文字母 a-z；<br/> - 26 个大写英文字母 A-Z；<br/> - 10 个数字 0-9；<br/> - 中文；<br/> - 特殊字符。<br/><Container type="tip" title="提示">1. 若不设置昵称，推送时会显示发送方的用户 ID，而非昵称。<br/>2. 该昵称可与用户属性中的昵称设置不同，不过我们建议这两种昵称的设置保持一致。因此，修改其中一个昵称时，也需调用相应方法对另一个进行更新，确保设置一致。更新用户属性中的昵称的方法，详见 [设置用户属性](userprofile.html#设置用户属性)。</Container>| 否       |

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 200，表示请求成功，响应包体中包含以下字段：

| 参数        | 类型    | 描述      |
| :------------------- | :------ | :-------------- |
| `entities`           | JSON Array  | 用户在推送通知中显示的昵称以及用户相关信息。     |
|  - `uuid`      | String  | 用户的 UUID。系统为该请求中的 app 或用户生成的唯一内部标识，用于生成用户权限 token。      |
|  - `type`      | String  | 用户类型，即 `user`。 |
|  - `created`   | Number  | 用户注册的 Unix 时间戳，单位为毫秒。       |
|  - `modified`  | Number  | 最近一次修改用户信息的 Unix 时间戳，单位为毫秒。      |
|  - `username`  | String  | 用户 ID。用户登录的唯一账号。         |
|  - `activated` | Boolean | 用户是否为活跃状态：<br/> - `true`：用户为活跃状态。<br/> - `false`：用户为封禁状态。如要使用已被封禁的用户账户，你需要调用[解禁用户](/docs/sdk/server-side/account_system.html#账号封禁)解除封禁。|
|  - `nickname`  | String  | 推送通知中显示的昵称。 |

其他参数及说明详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [常见错误码](#常见错误码) 了解可能的原因。

### 示例

#### 请求示例

```bash
curl -X PUT https://XXXX/app-id/XXXX/users/XXXX  \
-H 'Content-Type: application/json'  \
-H 'Accept: application/json'  \
-H 'Authorization: Bearer <YourAppToken>'  \
-d '{ "nickname": "testuser"   }' 
```

#### 响应示例

```json
{
  "action": "put",
  "path": "/users",
  "uri": "https://XXXX/XXXX/XXXX/users/XXXX",
  "entities": [
    {
      "uuid": "4759aa70-XXXX-XXXX-XXXX-6fa0510823ba",
      "type": "user",
      "created": 1542595573399,
      "modified": 1542596083687,
      "username": "user1",
      "activated": true,
      "nickname": "testuser"
    }
  ],
  "timestamp": 1542596083685,
  "duration": 6
}
```

## 批量设置离线推送时显示的昵称

批量设置用户离线推送时显示的昵称。

**调用频率上限**：100 次/秒/App ID

### HTTP 请求

```http
PUT https://{host}/app-id/{app_id}/push/nickname
```

#### 路径参数

参数及描述详见[公共参数](#公共参数)。

#### 请求 header

| 参数            | 类型   | 是否必需 | 描述                                                         |
| :-------------- | :----- | :------- | :----------------------------------------------------------- |
| `Content-Type`  | String | 是       | 内容类型。请填 `application/json`。                          |
| `Accept`        | String | 是       | 内容类型。请填 `application/json`。                          |
| `Authorization` | String | 是       | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 |

#### 请求 body

| 参数            | 类型   | 是否必需 | 描述      |
| :-------------- | :----- | :------- | :------------------ |
| `username`      | String | 是       | 需要修改用户推送昵称的用户 ID。单次请求最多可对 50 个用户 ID 设置。    |
| `push_nickname` | String | 是       | 离线推送时在接收方的客户端推送通知栏中显示的发送方的昵称。你可以自定义该昵称，长度不能超过 100 个字符。<br/>支持以下字符集：<br/> - 26 个小写英文字母 a-z；<br/> - 26 个大写英文字母 A-Z；<br/> - 10 个数字 0-9；<br/> - 中文；<br/> - 特殊字符。<br/><Container type="tip" title="提示">1. 若不设置昵称，推送时会显示发送方的用户 ID，而非昵称。<br/>2. 该昵称可与用户属性中的昵称设置不同，不过我们建议这两种昵称的设置保持一致。因此，修改其中一个昵称时，也需调用相应方法对另一个进行更新，确保设置一致。更新用户属性中的昵称的方法，详见 [设置用户属性](userprofile.html#设置用户属性)。</Container>       |

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应包体中包含以下字段：

| 参数            | 类型   | 描述                                                         |
| :-------------- | :----- | :------- | 
| `entities`           | JSON Array  | 用户在推送通知中显示的昵称以及用户相关信息。     |
| `entities.push_nickname`  | String | 离线推送时在接收方的客户端推送通知栏中显示的发送方的昵称。  |
| `entities.username`        | String | 为哪个用户设置离线推送时显示的发送方昵称。    |

其他响应字段详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 `200`，表示请求失败。常见的异常类型如下表所示。

| HTTP 状态码 | 错误类型  | 错误提示   | 可能原因 | 处理建议        |
| :----- | :------- | :-------------------- | :----------- | :----------- |
| 400         | illegal_argument | put user push nicknames illegal empty request body | 请求 body 中没有携带设置的推送昵称。 | 设置请求 body 中的 `push_nickname` 参数。  |
| 400         | illegal_argument | put user push nicknames exceeds the limit          | 修改推送昵称的用户数量超过限制（单次请求最多可对 50 个用户 ID 设置）。  | 控制修改推送昵称的用户不要超过 50 个用户 ID。 |
| 400         | illegal_argument | XXX push nickname length exceeds the limit         | 推送昵称的长度超过限制。 | 控制设置的推送昵称长度不要超过 100 个字符。        |
| 401         | unauthorized     | Unable to authenticate (OAuth)                     | token 不合法，可能过期或 token 错误。| 使用新的 token 访问。 |

关于其他错误码，你可以参考 [常见错误码](#常见错误码) 了解可能的原因。

### 示例

#### 请求示例

```shell
curl -X PUT -H 'Content-Type: application/json'  \
-H 'Accept: application/json'  \
-H 'Authorization: Bearer <YourAppToken>' 'https://XXX/app-id/XXX/push/nickname'  \
-d '[
      {"username":"user1", "push_nickname":"推送昵称-1"}, 
      {"username":"user2", "push_nickname":"推送昵称-2"}
]'
```

#### 响应示例

```json
{
    "path": "/push",
    "uri": "http://XXXX/XXXX/XXXX/push",
    "timestamp": 1719542740148,
    "entities": [
        {
            "push_nickname": "推送昵称-1",
            "username": "user1"
        },
        {
            "push_nickname": "推送昵称-2",
            "username": "user2"
        }
    ],
    "action": "put",
    "duration": 0
}
```

## 设置离线推送通知的展示方式

设置离线推送通知在客户端的展示方式，设置即时生效。服务端据此向用户推送离线消息。

### HTTP 请求

```http
PUT https://{host}/app-id/{app_id}/users/{userId}
```

#### 路径参数

| 参数       | 类型   | 描述   | 是否必需 | 
| :--------- | :----- | :------- | :------------------ |
| `userId` | String | 要设置哪个用户的推送通知的展示方式。传入该用户的用户 ID。   | 是       | 

其他参数及说明详见 [公共参数](#公共参数)。

#### 请求 header

| 参数            | 类型   | 描述                               | 是否必需 |
| :-------------- | :----- | :-------------------------------------- | :------- |
| `Content-Type`  | String | 内容类型。请填 `application/json`。     | 是       |
| `Authorization` | String | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 | 是       |

#### 请求 body

请求包体为 JSON Object 类型，包含以下字段：

| 参数                         | 类型 | 描述             | 是否必需 |
| :--------------------------- | :--- | :--------------------------------- | :------- |
| `notification_display_style` | Int  | 离线推送通知的展示方式：<br/> - （默认）`0`：推送标题为“您有一条新消息”，推送内容为“请点击查看”；<br/> - `1`：推送标题为“您有一条新消息”，推送内容为发送人昵称和离线消息的内容。| 是       |

### HTTP 响应

#### 响应 body

| 参数      | 类型    | 描述   |
| :-------------------- | :------ | :------------------------------------------------ |
| `entities`                            | JSON Array   | 用户的离线推送通知的展示方式以及相关信息。        |
|  - `uuid`                             | String  | 用户的 UUID。系统为该请求中的 app 或用户生成的唯一内部标识，用于生成用户权限 token。   |
|  - `type`                             | String  | 用户类型，即 `user`。     |
|  - `created`                          | Long    | 用户创建的 Unix 时间戳，单位为毫秒。            |
|  - `modified`                         | Long    | 最近一次修改用户信息的 Unix 时间戳，单位为毫秒。      |
|  - `username`                         | String  | 用户 ID。用户登录的唯一账号。      |
|  - `activated`                        | Boolean | 用户是否为活跃状态：<br/> - `true`：用户为活跃状态。<br/> - `false`：用户为封禁状态。如要使用已被封禁的用户账户，你需要调用[解禁用户](/docs/sdk/server-side/account_system.html#账号封禁)解除封禁。|
|  - `notification_display_style`       | Int     | 离线推送通知的展示方式。      |
|  - `nickname`                         | String  | 离线推送通知收到时显示的昵称。    |
|  - `notifier_name`                    | String  | 推送证书名称。   |

其他参数及说明详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [常见错误码](#常见错误码) 了解可能的原因。

### 示例

#### 请求示例

```bash
curl -X PUT https://XXXX/app-id/XXXX/users/XXXX
-H 'Content-Type: application/json'  \
-H "Authorization: Bearer <YourAppToken>"
-d '{"notification_display_style": "1"}'
```


#### 响应示例

```json
{
  "action": "put",
  "path": "/users",
  "uri": "http://XXXX/XXXX/XXXX/users/XXXX",
  "entities": [
    {
      "uuid": "3b8c9890-XXXX-XXXX-XXXX-f50bf55cafad",
      "type": "user",
      "created": 1530276298905,
      "modified": 1534407146060,
      "username": "user1",
      "activated": true,
      "notification_display_style": 1,
      "nickname": "testuser",
      "notifier_name": "2882303761517426801"
    }
  ],
  "timestamp": 1534407146058,
  "duration": 3
}
```

## 设置离线推送

你可以设置全局离线推送的通知方式和免打扰模式以及单个单聊或群聊会话的离线推送设置。

### HTTP 请求

```http
PUT https://{host}/app-id/{app_id}/users/{userId}/notification/{chattype}/{key}
```

#### 路径参数

| 参数       | 类型   | 描述              | 是否必需 |
| :--------- | :----- | :----------------------- | :------- |
| `userId` | String | 要设置哪个用户的离线推送设置。传入该用户的用户 ID。    | 是       | 
| `chattype` | String | 对象类型，即会话类型：<br/> - `user`：用户，表示单聊；<br/> - `chatgroup`：群组，表示群聊。 | 是       |
| `key`      | String | 对象名称：<br/> - 单聊时为对端用户的用户 ID；<br/> - 群聊时为群组 ID。                      | 是       |

:::tip
如需设置 app 全局离线推送，`chattype` 需传 `user`，`key` 为当前用户 ID。
:::

其他参数及说明详见 [公共参数](#公共参数)。

#### 请求 header

| 参数            | 类型   | 描述        | 是否必需 |
| :-------------- | :----- | :------------------------------ | :------- |
| `Content-Type`  | String | 内容类型。请填 `application/json`。     | 是       |
| `Authorization` | String | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 | 是    |

#### 请求 body

| 参数             | 类型   | 描述      | 是否必需<div style="width: 80px;"></div> |
| :--------------- | :----- | :------------ | :--------------------------------------- |
| `type`           | String | 离线推送通知方式：<br/> - `DEFAULT`：指定的会话采用 app 的设置。该值仅对单聊或群聊会话有效，对 app 级别无效。<br/> - `ALL`：接收全部离线消息的推送通知；<br/> - `AT`：只接收提及当前用户的离线消息的推送通知。该字段推荐在群聊中使用。若提及一个或多个用户，需在创建消息时对 `ext` 字段传 "em_at_list":["user1", "user2" ...]；若提及所有人，对该字段传 "em_at_list":"all"。<br/> - `NONE`：不接收离线消息的推送通知。 <Container type="notice" title="注意">若 app 和指定会话均设置了该参数，则该会话采用自身的设置，其他会话采用 app 的设置。</Container> | 否      |
| `ignoreInterval` | String | 每天触发离线推送免打扰的时间段，精确到分钟，格式为 HH:MM-HH:MM，例如 08:30-10:00。该时间为 24 小时制，免打扰时间段的开始时间和结束时间中的小时数和分钟数的取值范围分别为 [00,23] 和 [00,59]。<br/> 该参数的设置说明如下：<br/> - 该参数仅针对 app 生效，对单聊或群聊不生效。<br/> - 该参数设置后，免打扰模式每天定时触发。例如，开始时间为 `08:00`，结束时间为 `10:00`，免打扰模式在每天的 8:00-10:00 内生效。若你在 11:00 设置开始时间为 `08:00`，结束时间为 `12:00`，则免打扰模式在当天的 11:00-12:00 生效，以后每天均在 8:00-12:00 生效。<br/> - 若开始时间和结束时间相同，则全天免打扰。<br/> - 若结束时间早于开始时间，则免打扰模式在每天的开始时间到次日的结束时间内生效。例如，开始时间为 `10:00`，结束时间为 `08:00`，则免打扰模式的在当天的 10:00 到次日的 8:00 生效。<br/> - 目前仅支持在每天的一个指定时间段内开启免打扰模式，不支持多个免打扰时间段，新的设置会覆盖之前的设置。<br/> - 若不设置该参数，传空字符串。<br/> - 若该参数和 `ignoreDuration` 均设置，免打扰模式当日在这两个时间段均生效，例如，上午 8:00 将 app 级的 `ignoreInterval` 设置为 8:00-10:00，`ignoreDuration` 设置为 14400000 毫秒（4 个小时），则 app 在今天 8:00-12:00 和以后每天 8:00-10:00 处于免打扰模式。| 否      |
| `ignoreDuration` | Long   | 离线推送免打扰时长，单位为毫秒。该参数的取值范围为 [0,604800000]，`0` 表示该参数无效，`604800000` 表示免打扰模式持续 7 天。<br/> - 该参数对 app 和单聊和群聊均生效。<br/> - 与 `ignoreInterval` 的设置每天生效不同，该参数为一次有效，设置后立即生效，例如，上午 8:00 将 app 层级的 `ignoreDuration` 设置为 14400000 毫秒（4 个小时），则 app 只在今天 8:00-12:00 处于免打扰模式。<br/> - 若该参数和 `ignoreInterval` 均设置，免打扰模式当日在这两个时间段均生效，例如，上午 8:00 将 app 级的 `ignoreInterval` 设置为 8:00-10:00，`ignoreDuration` 设置为 14400000 毫秒（4 个小时），则 app 在今天 8:00-12:00 和以后每天 8:00-10:00 处于免打扰模式。 |

:::tip
对于 app 和 app 中的所有会话，免打扰模式的设置，即 `ignoreInterval` 和 `ignoreDuration` 参数设置，优先于推送通知方式（`type`）的设置。例如，假设在 app 级别指定了免打扰时间段，并将指定会话的推送通知方式设置为 `ALL`，则 app 进入免打扰模式，你不会收到任何推送通知。
:::

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 200，表示请求成功，响应包体中包含以下字段：

| 参数                  | 类型   | 描述                   |
| :-------------------- | :----- | :--------------------- |
| `data`                | JSON   | 离线推送的设置。       |
| `data.type`           | String | 离线推送通知方式。     |
| `data.ignoreInterval` | String | 离线推送免打扰时间段。 |
| `data.ignoreDuration` | Long   | 离线推送免打扰时长。   |

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [常见错误码](#常见错误码) 了解可能的原因。

### 示例

#### 请求示例

```bash
curl -L -X PUT 'https://XXXX/app-id/XXXX/users/XXXX/notification/user/XXXX' \
-H 'Authorization: Bearer <YourAppToken>' \
-H 'Content-Type: application/json' \
-d '{
    "type":"NONE",
    "ignoreInterval":"21:30-08:00",
    "ignoreDuration":86400000
}'
```

#### 响应示例

```json
{
  "path": "/users",
  "uri": "http://XXXX/XXXX/XXXX/users/notification/user/XXXX",
  "timestamp": 1647503749918,
  "action": "put",
  "data": {
    "type": "NONE",
    "ignoreDuration": 1647590149924,
    "ignoreInterval": "21:30-08:00"
  },
  "duration": 20
}
```

## 查询离线推送设置

查询指定单聊、指定群聊或全局的离线推送设置。

### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/users/{userId}/notification/{chattype}/{key}
```

#### 路径参数

| 参数       | 类型   | 描述          | 是否必需 |
| :--------- | :----- | :--------------------------------- | :------- |
| `userId` | String | 要查询哪个用户的离线推送设置。传入该用户的用户 ID。    | 是       | 
| `chattype` | String | 对象类型，即会话类型：<br/> - `user`：用户，表示单聊；<br/> - `chatgroup`：群组，表示群聊。 | 是       |
| `key`      | String | 对象名称：<br/> - 单聊时为对端用户的用户 ID；<br/> - 群聊时为群组 ID。                      | 是       |

其他参数及说明详见 [公共参数](#公共参数)。

#### 请求 header

| 参数            | 类型   | 描述              | 是否必需 |
| :-------------- | :----- | :----------------------- | :------- |
| `Authorization` | String | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 | 是  |

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 200，表示请求成功，响应包体中包含以下字段：

| 参数                  | 类型   | 描述                   |
| :-------------------- | :----- | :--------------------- |
| `data`                | JSON   | 离线推送通知的设置。   |
| `data.type`           | String | 离线推送通知方式。     |
| `data.ignoreInterval` | String | 离线推送免打扰时间段。 |
| `data.ignoreDuration` | Long   | 离线推送免打扰时长。   |

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [常见错误码](#常见错误码) 了解可能的原因。

### 示例

#### 请求示例

```bash
curl -L -X GET 'https://XXXX/app-id/XXXX/users/XXXX/notification/chatgroup/XXXX' \
-H 'Authorization: Bearer <YourAppToken>'
```

#### 响应示例

```json
{
  "path": "/users",
  "uri": "http://XXXX/XXXX/XXXX/users/notification/chatgroup/12312312321",
  "timestamp": 1647503749918,
  "action": "get",
  "data": {
    "type": "NONE",
    "ignoreDuration": 1647590149924,
    "ignoreInterval": "21:30-08:00"
  },
  "duration": 20,
}
```

## 设置推送通知的首选语言

设置离线推送消息的首选语言。

### HTTP 请求

```http
PUT https://{host}/app-id/{app_id}/users/{userId}/notification/language
```

#### 路径参数

| 参数       | 类型   | 描述          | 是否必需 |
| :--------- | :----- | :--------------------------------- | :------- |
| `userId` | String | 要设置哪个用户的推送通知的首选语言。传入该用户的用户 ID。   | 是       | 

其他参数及说明详见 [公共参数](#公共参数)。

#### 请求 header

| 参数            | 类型   | 描述    
| :-------------- | :----- | :-------------- |
| `Content-Type`  | String | 内容类型。请填 `application/json`。    | 是       |
| `Authorization` | String | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 | 是       |

#### 请求 body

| 参数                  | 类型   | 描述                        | 是否必需 |
| :-------------------- | :----- | :--- | :------- |
| `translationLanguage` | String | 用户接收的推送通知的首选语言的代码。如果设置为空字符串，表示无需翻译，服务器直接推送原语言的通知。 | 是       |

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 200，表示请求成功，响应包体中包含以下字段：

| 参数            | 类型   | 描述                               |
| :-------------- | :----- | :--------------------------------- |
| `data`          | JSON   | 用户接收推送通知的首选语言。       |
| `data.language` | String | 用户接收推送通知的首选语言的代码。 |

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [常见错误码](#常见错误码) 了解可能的原因。

### 示例

#### 请求示例

```bash
curl -L -X PUT 'https://XXXX/app-id/XXXX/users/XXXX/notification/language' \
-H 'Authorization: Bearer <YourAppToken>' \
-H 'Content-Type: application/json' \
-d '{
    "translationLanguage":"EU"
}'
```

#### 响应示例

```json
{
  "path": "/users",
  "uri": "http://XXXX/XXXX/XXXX/users/XXXX/notification/language",
  "timestamp": 1648089630244,
  "action": "put",
  "data": {
    "language": "EU"
  },
  "duration": 66,
}
```

## 获取推送通知的首选语言

获取推送通知的首选语言。

### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/users/{userId}/notification/language
```

#### 路径参数

| 参数       | 类型   | 描述          | 是否必需 |
| :--------- | :----- | :--------------------------------- | :------- |
| `userId` | String | 要获取哪个用户的推送通知的首选语言。传入该用户的用户 ID。  | 是       | 

其他参数及说明详见 [公共参数](#公共参数)。

#### 请求 header

| 参数         | 类型   | 描述    | 是否必需 |
| :-------------- | :----- | :------------------------ | :------- |
| `Authorization` | String | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 | 是   |

### HTTP 响应

#### 响应 body

如果返回的 HTTP 状态码为 200，表示请求成功，响应包体中包含以下字段：

| 参数            | 类型   | 描述                               |
| :-------------- | :----- | :--------------------------------- |
| `data`          | JSON   | 用户接收推送通知的首选语言。       |
| `data.language` | String | 用户接收推送通知的首选语言的代码。 |

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [常见错误码](#常见错误码) 了解可能的原因。

### 示例

#### 请求示例

```bash
curl -L -X GET 'https://XXXX/app-id/XXXX/users/XXXX/notification/language' \
-H 'Authorization: Bearer <YourAppToken>'
```

#### 响应示例

```json
{
  "path": "/users",
  "uri": "http://XXXX/XXXX/XXXX/users/XXXX/notification/language",
  "timestamp": 1648089630244,
  "action": "put",
  "data": {
    "language": "EU"
  },
  "duration": 66
}
```

## 使用推送模板

你可以使用推送模板设置推送标题和内容。你可以调用以下 RESTful API 配置默认推送模板 `default` 和自定义推送模板。除此之外，你也可以在[声网控制台](https://console.shengwang.cn/overview)设置推送模板，详见[控制台文档](enable_and_configure_IM.html#配置推送模板)。

对于群组消息，你可以使用定向模板将离线通知只发送给特定用户，或向某些用户推送与其他用户不同的离线通知。

使用推送模板有以下优势：

1. 自定义修改声网服务端默认推送内容。   

2. 接收方可以决定使用哪个模板。 

3. 按优先级选择模板使用方式。

**推送通知栏内容设置的使用优先级**

通知栏中显示的推送标题和内容可通过以下方式设置，优先级为由低到高：

1. 发送消息时使用默认的推送标题和内容：设置推送通知的展示方式 `notification_display_style`。推送标题为“您有一条新消息”，推送内容为“请点击查看”。  
2. 发送消息时使用默认模板：若有默认模板 `default`，发消息时无需指定。
3. 发送消息时使用扩展字段自定义要显示的推送标题和推送内容，即 `em_push_title` 和 `em_push_content`。
4. 接收方设置了推送模板。
5. 发送消息时通过消息扩展字段指定模板名称。

### 创建离线推送模板

创建离线推送消息模板，包括默认模板 `default` 和自定模板。你可以通过[声网控制台](https://console.shengwang.cn/overview)创建推送模板，详见[控制台文档](enable_and_configure_IM.html#配置推送模板)。

若使用默认模板 **default**，消息推送时自动使用默认模板，创建消息时无需传入模板名称。

#### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/notification/template
```

##### 路径参数

参数及说明详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 描述       | 是否必需 |
| :-------------- | :----- | :---------------------------------- | :------- |
| `Content-Type`  | String | 内容类型。请填 `application/json`。    | 是       |
| `Authorization` | String | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 | 是   |

##### 请求 body

| 参数              | 类型   | 描述                                  | 是否必需 |
| :---------------- | :----- | :------------------------------------ | :------- |
| `name`            | String | 要添加的推送模板的名称。模板名称最多可包含 64 个字符，支持以下字符集：<br/>- 26 个小写英文字母 a-z；<br/>- 26 个大写英文字母 A-Z；<br/>- 10 个数字 0-9。              | 是       |
| `title_pattern`   | String | 自定义推送标题，例如： 标题 {0}。     | 是       |
| `content_pattern` | String | 自定义推送内容，例如：内容 {0}, {1}。 | 是       |

`title_pattern` 和 `content_pattern` 的设置方式如下：
- 输入固定的内容，例如，标题为 “您好”，内容为“您有一条新消息”。
- 内置参数填充：
  - `{$dynamicFrom}`：按优先级从高到底的顺序填充好友备注、[群昵称](#发消息时配置推送模板)和推送昵称。
  - `{$fromNickname}`：推送昵称。  
  - `{$msg}`：消息内容。
- 自定义参数填充：模板输入数组索引占位符，格式为: {0} {1} {2} ... {n}

 对于推送标题和内容来说，前两种设置方式在创建消息时无需传入该参数，服务器自动获取，第三种设置方式则需要通过扩展字段 `ext.em_push_template` 传入，JSON 结构如下：

  ```json
  {
      "ext":{
          "em_push_template":{
              "title_args":[
                  "声网"
              ],
              "content_args":[
                  "欢迎使用im-push",
                  "加油"
              ]
          }
      }
  }
  
  # title: {0} = "声网"
  # content: {0} = "欢迎使用im-push" {1} = "加油"
  ```

群昵称即群成员在群组中的昵称，群成员在发送群消息时通过扩展字段设置，JSON 结构如下：

```json
  {
    "ext":{
            "em_push_ext":{
                "group_user_nickname":"Jane"
            }
        }
  }      
```        

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 200，表示请求成功，响应包体中包含以下字段：

| 参数                   | 类型   | 描述                                         |
| :--------------------- | :----- | :------------------------------------------- |
| `data`                 | JSON   | 推送模板的相关信息。                         |
| `data.name`            | String | 推送模板的名称。                             |
| `data.createAt`        | Number | 创建模板的 Unix 时间戳，单位为毫秒。         |
| `data.updateAt`        | Number | 最近一次修改模板的 Unix 时间戳，单位为毫秒。 |
| `data.title_pattern`   | String | 推送模板的自定义标题。                       |
| `data.content_pattern` | String | 推送模板的自定义内容。                       |

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [常见错误码](#常见错误码) 了解可能的原因。

#### 示例

##### 请求示例

```bash
curl -X POST 'https://XXXX/app-id/XXXX/notification/template' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <YourAppToken>' \
-d '{
    "name": "test7",
    "title_pattern": "你好,{0}",
    "content_pattern": "推送测试,{0}"
}'
```

##### 响应示例

```json
{
  "uri": "http://XXXX/XXXX/XXXX/notification/template",
  "timestamp": 1646989584108,
  "action": "post",
  "data": {
    "name": "test7",
    "createAt": 1646989584124,
    "updateAt": 1646989584124,
    "title_pattern": "你好,{0}",
    "content_pattern": "推送测试,{0}"
  },
  "duration": 26
}
```

### 查询离线推送模板

查询离线推送消息使用的模板。

#### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/notification/template/{name}
```

##### 路径参数

| 参数   | 类型   | 描述                     | 是否必需 |
| :----- | :----- | :----------------------- | :------- |
| `name` | String | 要查询的推送模板的名称。 | 是       |

其他参数及说明详见 [公共参数](#公共参数)。

##### 请求 header

| 参数            | 类型   | 描述        | 是否必需 |
| :-------------- | :----- | :------------------------- | :------- |
| `Authorization` | String | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 | 是 |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 200，表示请求成功，响应包体中包含以下字段：

| 参数                   | 类型   | 描述                                           |
| :--------------------- | :----- | :--------------------------------------------- |
| `data`                 | JSON   | 推送模板的相关信息。                           |
| `data.name`            | String | 推送模板的名称。                               |
| `data.createAt`        | Number | 创建模板时的 Unix 时间戳，单位为毫秒。         |
| `data.updateAt`        | Number | 最近一次修改模板时的 Unix 时间戳，单位为毫秒。 |
| `data.title_pattern`   | String | 推送模板的自定义标题。                         |
| `data.content_pattern` | String | 推送模板的自定义内容。                         |

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [常见错误码](#常见错误码) 了解可能的原因。

#### 示例

##### 请求示例

```bash
curl -X GET 'https://XXXX/app-id/XXXX/notification/template/XXXX' \
-H 'Authorization: Bearer <YourAppToken>'
```

##### 响应示例

```json
{
  "uri": "http://XXXX/XXXX/XXXX/notification/template/XXXX",
  "timestamp": 1646989686393,
  "action": "get",
  "data": {
    "name": "test7",
    "createAt": 1646989584124,
    "updateAt": 1646989584124,
    "title_pattern": "你好,{0}",
    "content_pattern": "推送测试,{0}"
  },
  "duration": 11
}
```

### 接收方配置模板名称

接收方可以调用该 API 设置推送模板。

#### HTTP 请求

```
PUT https://{host}/app-id/{app_id}/users/{userId}/notification/template
```

##### 路径参数

| 参数       | 类型   | 描述          | 是否必需 |
| :--------- | :----- | :--------------------------------- | :------- |
| `userId` | String | 当前用户的用户 ID。    | 是       | 

其他参数及说明详见 [公共参数](#公共参数)。


##### 请求 Header

| 参数            | 类型   | 是否必需 | 描述                                                         |
| :-------------- | :----- | :------- | :------------- |
| `Content-Type`  | String | 是       | 内容类型。请填 `application/json`。                          |
| `Authorization` | String | 是       | App User 鉴权 token，格式为 `Bearer YourUserToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 user token。<Container type="notice" title="注意">这里是用户 token，而非 App token。</Container> |

其他参数及说明详见 [公共参数](#公共参数)。

##### 请求 body 

| 参数       | 类型   | 是否必需 | 描述          |
| :--------- | :----- | :------- | :------------ |
| `templateName` | String | 是   | 模板名称。| 

####  HTTP 响应

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应 body 包含如下字段：

| 参数   | 类型 | 描述                                                    |
| :----- | :--- | :------------------------------------------------------ |
| `data` | JSON | 响应中的数据详情。`templateName` 为设置成功后的模板名称。 |

其他参数及说明详见 [公共参数](#公共参数)。

如果返回的 HTTP 状态码非 200，表示请求失败。你可以参考 [常见错误码](#常见错误码) 了解可能的原因。

#### 示例

##### 请求示例

```shell
curl -X PUT 'https://XXXX/app-id/XXXX/users/XXXX/notification/template' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <YourUserToken>' \
-d '{    
  "templateName": "hxtest"
 }
```

##### 响应示例

```json
{
    "path": "/users",
    "uri": "http://XXXX/XXXX/XXXX/users/XXX/notification/template",
    "timestamp": 1705470003984,
    "action": "put",
    "data": {
        "templateName": "hxtest"
    },
    "duration": 43
}
```

### 发消息时配置推送模板

发送消息时，可使用消息扩展参数 `ext.em_push_template.name` 指定推送模板名称。

若使用默认模板 **default**，消息推送时自动使用默认模板，创建消息时无需传入模板名称。

该扩展参数的 JSON 结构如下：

```json
{
    "ext":{
        "em_push_template":{
            "name":"hxtest"
        },
         "em_push_ext":{
                "group_user_nickname":"Jane"
            }
    }
}
```

1. 下面以发送单聊文本消息时使用自定义推送模板为例进行介绍：

#### 请求示例

关于推送标题和推送内容参数的填充，即 `title_pattern` 和 `content_pattern`，详见[创建离线推送模板](#创建离线推送模板)。

```shell
curl -L -X POST 'https://XXXX/app-id/XXXX/messages/users' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <YourAppToken>' \
-d '{
    "from": "user1",
    "to": [
        "user2"
    ],
    "type": "txt",
    "body": {
        "msg": "testmessages"
    },
    "ext": {
        "em_push_template": {
            "name": "hxtest"
        }
    }
}'
```

#### 响应示例 

```json
{
  "path": "/messages/users",
  "uri": "https://XXXX/XXXX/XXXX/messages/users",
  "timestamp": 1657254052191,
  "action": "post",
  "data": {
    "user2": "1029457500870543736"
  },
  "duration": 0
}
```

接口详情，请参见[发送文本消息](message_single.html#发送文本消息)。

单聊会话中发送其他类型的消息的接口，请参见[发送单聊消息](message_single.html)接口描述。

1. 下面以发送群聊文本消息时使用群组昵称为例进行介绍：

#### 请求示例

```bash
# 将 <YourAppToken> 替换为你在服务端生成的 App Token

curl -X POST -i 'https://XXXX/app-id/XXXX/messages/chatgroups' 
-H 'Content-Type: application/json' 
-H 'Accept: application/json' 
-H 'Authorization: Bearer <YourAppToken>' 
-d '{
    "from": "user1",
    "to": ["184524748161025"],
    "type": "txt",
    "need_group_ack": false,
    "body": {
        "msg": "testmessages"
    },
    "ext": {
        "em_push_template": {
            "name": "hxtest"
        },
        "em_push_ext":{
                "group_user_nickname":"Jane"
            }
    },        
    "routetype":"ROUTE_ONLINE"
}'
```

#### 响应示例

```json
{
  "path": "/messages/chatgroups",
  "uri": "https://XXXX/XXXX/XXXX/messages/chatgroups",
  "timestamp": 1657254052191,
  "action": "post",
  "data": {
    "184524748161025": "1029544257947437432"
  },
  "duration": 0,
}
```

接口详情，请参见[发送文本消息](https://doc.easemob.com/docs/sdk/server-side/message_group.html#发送文本消息)。

群聊会话中发送其他类型的消息的接口，请参见[发送群聊消息](message_group.html)接口描述。

### 删除离线推送模板
 
删除离线消息推送模板。

#### HTTP 请求

```http
DELETE https://{host}/app-id/{app_id}/notification/template/{name}
```

##### 路径参数

| 参数   | 类型   | 描述                     | 是否必需 |
| :----- | :----- | :----------------------- | :------- |
| `name` | String | 要删除的推送模板的名称。 | 是       |

其他参数及说明详见 [公共参数](#公共参数)。

##### 请求 header

| 参数      | 类型   | 描述           | 是否必需 |
| :-------------- | :----- | :----------------------------- | :------- |
| `Content-Type`  | String | 内容类型。请填 `application/json`。        | 是  |
| `Authorization` | String | App 管理员的鉴权 token，格式为 `Bearer YourAppToken`，其中 `Bearer` 为固定字符，后面为英文空格和获取到的 app token。 | 是  |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 200，表示请求成功，响应包体中包含以下字段：

| 参数                   | 类型   | 描述                                           |
| :--------------------- | :----- | :--------------------------------------------- |
| `data`                 | JSON   | 删除的推送模板的相关信息。                     |
| `data.name`            | String | 推送模板的名称。                               |
| `data.createAt`        | Number | 推送模板的创建时间戳，单位为毫秒。             |
| `data.updateAt`        | Number | 最近一次修改模板时的 Unix 时间戳，单位为毫秒。 |
| `data.title_pattern`   | String | 推送模板的自定义标题。                         |
| `data.content_pattern` | String | 推送模板的自定义内容。                         |

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考 [常见错误码](#常见错误码) 了解可能的原因。

#### 示例

##### 请求示例

```bash
curl -X DELETE 'https://XXXX/app-id/XXXX/notification/template/XXXX' \
-H 'Authorization: Bearer {YourAppToken}'
```

##### 响应示例

```json
{
  "uri": "https://XXXX/XXXX/XXXX/notification/template/XXXX",
  "timestamp": 1646989686393,
  "action": "delete",
  "data": {
    "name": "test7",
    "createAt": 1646989584124,
    "updateAt": 1646989584124,
    "title_pattern": "你好,{0}",
    "content_pattern": "推送测试,{0}"
  },
  "duration": 11
}
```

## 常见错误码

调用离线推送相关的 REST API 时，若返回的 HTTP 状态码非 200，则请求失败，提示错误。本节列出这些接口的常见错误码。 

### 推送设置和查询相关的常见错误码

离线推送的设置以及查询相关的 REST API（包括**设置接收方配置模板名称**和**获取接收方配置模板名称**两个接口）如下表所示：

| RESTful API 接口        | 方法 | 接口 URL           |
| :----------- | :--- | :------------- |
| 绑定和解绑推送信息           | PUT  | /app-id/{app_id}/users/{userId}/push/binding |
| 查询推送绑定信息    | GET  | /app-id/{app_id}/users/{userId}/push/binding |
| 设置离线推送时显示的昵称 | PUT  | /app-id/{app_id}/users/{userId} |
| 设置离线推送通知的展示方式 | PUT  | /app-id/{app_id}/users/{userId} |
| 设置离线推送         | PUT  | /app-id/{app_id}/users/{userId}/notification/{chattype}/{key} |
| 查询离线推送设置     | GET  | /app-id/{app_id}/users/{userId}/notification/{chattype}/{key} |
| 设置推送通知的首选语言     | PUT  | /app-id/{app_id}/users/{userId}/notification/language |
| 获取推送通知的首选语言 | GET  | /app-id/{app_id}/users/{userId}/notification/language |
| 设置接收方配置模板名称 | PUT  | /app-id/{app_id}/users/{userId}/notification/template |
| 获取接收方配置模板名称 | GET | /app-id/{app_id}/users/{userId}/notification/template |

以上 API 的常见错误码如下所示：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 400 | RequiredPropertyNotFoundException | Entity user requires a property named username | 用户不存在 | 检查并修改请求参数，请使用正确的且存在的用户 ID。 |
| 400  | IllegalArgumentException | parameters is invalid : XXX | XXX 属性值不合法 | 检查并修改请求参数，在限定范围内使用请求参数。|
| 404 | 请求路径不存在 | url is invalid | 请求路径错误 | 检查并修改，请使用正确的请求路径。 |
| 5xx | 服务器内部错误   | 任意      | 服务器在尝试处理请求时发生内部错误| 联系声网技术支持。 |

### 推送模板相关接口的常见错误码

离线推送模板相关的接口如下：

| RESTful API 接口        | 方法 | 接口 URL           |
| :----------- | :--- | :------------- |
| 创建离线推送模板          | POST  | /app-id/{app_id}/notification/template |
| 修改离线推送模板      | PUT  | /app-id/{app_id}/notification/template/{name} |
| 查询离线推送模板 | GET | /app-id/{app_id}/notification/template/{name} |
| 删除离线推送模板          | DELETE  | /app-id/{app_id}/notification/template/{name} |

这些 REST API 的常见错误码如下所示：

| HTTP 状态码        | 错误类型 | 错误提示          | 可能原因 | 处理建议 |
| :----------- | :--- | :------------- | :----------- | :----------- |
| 400  | EntityNotFoundException | XXX template is not exist | XXX 模板不存在 | 检查并修改请求参数，使用正确存在的模板名称。 |
| 404 | 请求路径不存在 | url is invalid | 请求路径错误 | 检查并修改，使用正确的请求路径。 |
| 5xx | 服务器内部错误   | 任意      | 服务器在尝试处理请求时发生内部错误 | 联系声网技术支持。 |

其他错误，你可以参考 [错误码](error.html) 了解可能的原因。







