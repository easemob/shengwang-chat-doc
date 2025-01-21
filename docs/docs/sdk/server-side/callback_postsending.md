# 发送后回调

## 概述

发送后回调对所有聊天消息有效，包含通过 SDK 和 RESTful API 发送的单聊、群组和聊天室的消息。发送后回调通常用于 app 后台需要实现必要的数据同步的场景，例如：
- 针对客户消息的内容进行自动回复；
- 在你的应用服务器端及时保存聊天历史记录或者离线消息。

:::tip
如果你对聊天消息没有时效性需求，可以直接通过免费的[聊天记录文件拉取 RESTful API](message_historical.html#历史消息记录的内容) 获取聊天记录，无需使用发送后回调。
:::

![](/images/server-side/callback_postsending_flowchart.png)

## 实现步骤

1. [开通回调服务](callback.overview.html#开通回调服务)。
2. [配置回调规则](#回调规则)。
3. 发送消息或进行群组、聊天室或联系人相关操作后，声网服务器向你的应用服务器发送回调请求。

## 发送后回调规则

开通发送前回调服务后，你需要在[声网控制台](https://console.shengwang.cn/overview)配置回调规则才能使用该服务。

1. 登录[声网控制台](https://console.shengwang.cn/overview)。

2. 在左上角下拉框中选择想要开通消息回调服务的项目，然后点击左侧导航栏的**全部产品**，点击**基础能力**分组下的**即时通讯 IM**，进入**功能配置**标签页。

3. 在**消息功能**页签中，点击**消息回调**区域下的**添加回调地址**按钮。

4. 在弹出的对话框中的**发送后回调**页签中，配置发送后回调相关信息，点击 **保存** 按钮，完成回调配置。

| 参数<div style="width: 80px;"></div> | 是否必填 | 内容       |
| :--------------------- | :------- | :--------------- |
| 规则名称 | 是 | 唯一的规则名称，只支持字母、数字和下划线，不支持中文字符，且长度不超过 32 字符。 |
| 回调地址 | 是 |声网服务器会将消息推送到指定的 URL 地址，支持针对不同类型的消息配置不同的 HTTP 和 HTTPS 回调地址。   |
| 启用状态 | 否 |是否启用该规则：<br/> - 启用：立即生效； <br/> - 关闭：暂不生效。|
| 回调类型 | 是 |回调类型。你可以选择对各种类型的单聊、群聊、和聊天室消息以及各种事件进行回调，详见[回调事件](/docs/sdk/server-side/callback_message_send.html)。<Container type="tip" title="提示">对于表情回复 Reaction 和子区 Thread，如要获取回调事件，无需单独配置，只需选择对应的消息类型即可。例如，如果需要单聊文本消息的 Reaction，你需要选中 **单聊消息 > 文本消息**，服务器发送回调事件时即会返回 Reaction 信息。</Container>|
| 消息类型 | 是 |需要回调的类型：<br/> - **聊天消息**：发送成功的消息，包括通过客户端和 RESTful API 发送的消息。这些消息与通过 REST 导出的聊天记录查询到的消息一致。例如，用户 u1 向用户 u2 发送消息，则会产生一条聊天消息，与接收方是否在线无关。收到的消息中 `from` 为 u1，`to` 为 u2。用户 u1 在群组 g1 中发送消息，则会产生一条聊天消息，收到的消息中 `from` 为 u1，`to` 为 g1，且返回值包含 `group_id` 字段。<br/> - **离线消息**：消息发送时接收方为离线的消息。例如：单聊中发送消息，若对端用户不在线，则会产生一条离线消息；在群聊中发送消息，若有几个群成员不在线，则会产生几条离线消息，这些离线消息的 `to` 参数为接收消息用户的 ID，并不是群组 ID。App 可以通过推送服务对这些消息进行个性化推送。<br/>对于同一个 app 可针对聊天消息、离线消息和通过 RESTful API 发送的消息配置不同的规则。如果 app 同时需要聊天消息和离线消息两种消息，建议区分回调地址。不过，规则也可以将这两种消息同时回调至一个指定服务器地址，在接收到消息后，可以对 `eventType` 判断，区分消息类型。|
| REST 消息是否需要 | 是 | 通过 REST API 发送的消息是否需要回调：<br/> - **是**：需要；<br/> - **否**：不需要。 |

![img](/images/callback/callback_post_sending.png)

## 发送后回调延时

发送后回调接收延时指消息服务器接收到客户端聊天消息、再将消息成功回调至客户指定服务器地址的时间间隔。消息接收延时保障是 99.95% 的消息在 30s 内。

## 发送后回调重试

发送后回调重试，当声网服务器执行发出回调后，响应状态码非 200，则认为回调失败，然后立即重试。若再次失败，再记录一次失败。针对一条回调仅重试一次，重试失败后即丢弃。若开通了[补发回调存储信息功能](#补发回调存储信息)，则将消息放入异常存储中。

若 30 秒内累计 90 次失败，会封禁该 app 的回调规则。封禁规则为，24 小时内连续封禁计数最大为 5（若封禁次数超过 5 次，仍计为 5），首次封禁默认 5 分钟，后续封禁时间为封禁次数 * 5 分钟，即第一次封禁 5 分钟，第二次封禁 10 分钟，第三次封禁 15 分钟，第四次封禁 20 分钟，第五次封禁 25 分钟，后续封禁时间与第 5 次保持一致为 25 分钟。重试失败以及封禁期间的回调不会自动补录，可以下载历史消息记录自行补充。

:::tip
若有特殊需求不能丢失回调消息的情况下，请联系声网商务开通回调异常缓存功能，并使用[查询回调异常缓存](#查询回调存储详情)和[补发回调储存信息](#补发回调存储信息) 接口。
:::

#### 回调示例

消息发送或相关操作发送时，声网服务器会向你的应用服务器发送 HTTP/HTTPS POST 请求，正文部分为 JSON 格式的字符串，字符集为 UTF-8。

回调时，声网服务器会对发送的正文进行 MD5 签名，使用的 MD5 为 `org.apache.commons.codec.digest.DigestUtils#md5Hex`。

##### 请求示例

```json
{
  "callId": "XXXX-demo#XXXX-dp01-XXXX-8696-cf3b48b20e7e",
  "eventType": "chat_offline",
  "timestamp": 1600060847294,
  "chat_type": "groupchat",
  "group_id": "169XXXX21545",
  "from": "user1",
  "to": "user2",
  "msg_id": "8924312242322",
  "payload": {
    // 具体的消息内容。
  },
  "securityVersion": "1.0.0",
  "security": "2ca02c394bef9e7abc83958bcc3156d3"
}
```

| 参数              | 类型             |
| :---------------- | :------------------------------ |
| `callId`          | `callId` 为每条回调的唯一标识。 |
| `eventType`       | - `chat` 聊天消息；<br/> - `chat_offline` 离线消息。  |
| `timestamp`       | 声网服务器接收到此消息的 Unix 时间戳，单位为毫秒。  |
| `chat_type`       | - `chat` 单聊回调；<br/> - `groupchat` 群聊回调包含了群组和聊天室的消息回调，默认全选。 |
| `group_id`        | 回调消息所在的群组，群聊时才有此参数。       |
| `from`            | 消息的发送方。         |
| `to`              | 消息的接收方。    |
| `msg_id`          | 消息的 ID。         |
| `payload`         | 消息内容，与通过 RESTful API 发送过来的一致，查看 [消息格式文档](message_historical.html#历史消息记录的内容)。 |
| `securityVersion` | 安全校验版本，目前为 1.0.0。请忽略此参数。      | 
| `security`        | 签名，格式如下: MD5（callId+Secret+timestamp）。关于 Secret，详见[配置发送后回调规则](callback_postsending.html#发送后回调规则)。   | 

##### 回调响应

声网服务器不会验证响应的内容，只要应用服务器返回的 HTTP 状态码为 200，即视为消息回调成功。

应用服务器收到回调消息后，向声网服务器发送的响应内容不能超过 1,000 个字符长度。如果连续发送超长的响应内容（30 秒内累计 90 次），会导致[回调规则封禁](#发送后回调重试)。

## 查询回调存储详情

查询 App ID 下由于异常（例如，连接超时、响应超时、回调规则封禁等）回调失败时存储的消息和事件类型集合，按每十分钟一个 date key 存储，然后用户可以根据消息集合按需拉取。

#### 功能限制

- 异常存储过期时间默认 3 天，若有存储需及时补发。
- 补发重试次数建议控制在 10 次以内。

#### 认证方式

即时通讯 RESTful API 要求 Bearer HTTP 认证。每次发送 HTTP 请求时，都必须在请求头部填入如下 `Authorization` 字段：

`Authorization：Bearer YourAppToken`

为提高项目的安全性，使用 token（动态密钥）对即将登录即时通讯系统的用户进行鉴权。即时通讯 RESTful API 支持使用 App Token 的鉴权方式，详见 [使用 Token 鉴权](token_authentication.html)。

#### HTTP 请求

```http
GET https://{host}/app-id/{app_id}/callbacks/storage/info    
```

##### 路径参数

| 参数       | 类型   | 是否必需 | 描述       |
| :--------- | :----- | :------- | :--------------------- |
| `host`     | String | 是       | 即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `app_id`     | String | 是       | 声网为每个项目自动分配的 App ID，作为项目唯一标识。 | 

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述                                     |
| :-------------- | :----- | :------- | :--------------------------------------- |
| `Authorization` | String | 是       | 鉴权 Token，管理员 Token（含）以上权限。 |

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应 body 包含如下字段：

| 参数              | 类型   | 描述                                                                           |
| :---------------- | :----- | :------------------ |
| `path`            | String | 请求路径。              |
| `uri`             | String | 请求路径的 URI。                                                               |
| `timestamp`       | Long   | 声网服务器接收到此消息的 Unix 时间戳，单位为毫秒。                         |
| `action`          | String | 请求方法。   |
| `duration`        | Long   | 请求耗时，单位为毫秒。                                                         |
| `data`            | Object | 响应数据内容。包括以下三个参数：`date`、`size` 和 `retry`。                    |
| - `date`            | String | 当前的 date key，即每 10 分钟内的消息和事件。key 为 10 分钟的起点。              |
| - `size`            | Int    | 该 date key 内的消息数量。                                                               |
| - `retry`           | Int    | 该 date key 内的数据已经重试补发的次数。未重试时值为 `0`。 |

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考[响应状态码](#响应状态码)了解可能的原因。

#### 示例

##### 请求示例

```shell
curl -X GET 'https://XXXX/app-id/XXXX/callbacks/storage/info' \
-H 'Authorization: Bearer <YourAppToken>'
```

##### 响应示例

```json
{
  "path": "/callbacks",
  "uri": "https://XXXX/XXXX/XXXX/callbacks/storage/info",
  "timestamp": 1631193031254,
  "action": "post",
  "data": [
    {
      "date": "202109091440",
      "size": 15,
      "retry": 0
    },
    {
      "date": "202109091450",
      "size": 103,
      "retry": 1
    }
  ],
  "duration": 153
}
```

## 补发回调存储信息

调用接口根据存储集合进行回调补发。

#### HTTP 请求

```http
POST https://{host}/app-id/{app_id}/callbacks/storage/retry  
```

##### 路径参数

| 参数       | 类型   | 是否必需 | 描述           |
| :--------- | :----- | :------- | :---------------------------- |
| `host`     | String | 是       | 即时通讯 IM 分配的用于访问 RESTful API 的域名。 | 
| `app_id`     | String | 是       | 声网为每个项目自动分配的 App ID，作为项目唯一标识。 | 

##### 请求 header

| 参数            | 类型   | 是否必需 | 描述                                                                      |
| :-------------- | :----- | :------- | :------------------------------------------------------------------------ |
| `Content-Type`  | String | 是       | 内容类型，请填 `application/json`。                                       |
| `Authorization` | String | 是       | 鉴权 App Token 的值。详见[使用 Token 鉴权](token_authentication.html)。 |

##### 请求 body

| 参数        | 类型   | 是否必需 | 描述                                                                   |
| :---------- | :----- | :------- | :--------------------------------------------------------------------- |
| `date`      | String | 是       | 可以补发的一个十分钟 date key，key 为十分钟的起点。                    |
| `retry`     | Int    | 否       | 开发已重试的次数。考虑到补发也可能失败，服务器会继续存储。最开始是 0。 |
| `targetUrl` | String | 否       | 补发消息的回调地址，如果为空，则使用原回调规则的回调地址。             |

#### HTTP 响应

##### 响应 body

如果返回的 HTTP 状态码为 `200`，表示请求成功，响应 body 包含如下字段：

| 参数           | 类型   | 描述                                                                           |
| :------------- | :----- | :----------------------------------------------------------------------------- |
| `path`         | String | 请求路径。                                                                     |
| `uri`          | String | 请求路径的 URI。                                                               |
| `timestamp`    | long   | 即时通讯 IM 服务器接收到此消息的 Unix 时间戳，单位为毫秒。                         |
| `action`       | String | 请求方法。                                                                     |
| `data`         | Bool   | - `success`：成功；<br/> - `failure`：失败。                                   |
| `duration`     | long   | 请求耗时，单位为毫秒。                                                         |

如果返回的 HTTP 状态码非 `200`，表示请求失败。你可以参考[响应状态码](#响应状态码)了解可能的原因。

#### 示例

##### 请求示例

```shell
curl -X POST 'https://XXXX/app-id/XXXX/callback/storage/retry' \
-H 'Authorization: Bearer <YourAppToken>' \
-H 'Content-Type: application/json' \
--data-raw '{
    "date": "202108272230",
    "retry": 0,
    "targetUrl": "https://localhost:8000/test"
}'
```

##### 响应示例

```json
{
  "path": "/callbacks",
  "uri": "https://XXXX/XXXX/XXXX/callback/storage/retry",
  "timestamp": 1631194031721,
  "organization": "XXXX",
  "application": "8dfb1641-XXXX-XXXX-bbe9-d8d45a3be39f",
  "action": "post",
  "data": "success",
  "duration": 225,
  "applicationName": "XXXX"
}
```

#### 响应状态码

| 状态码 | 描述                               |
| :----- | :--------------------------------- |
| 200    | 请求成功。                         |
| 400    | 请求参数错误，请根据返回提示检查。 |
| 401    | 用户权限错误。                     |
| 403    | 服务未开通或权限不足。             |
| 429    | 单位时间内请求过多。               |
| 500    | 服务器内部错误。                   |
