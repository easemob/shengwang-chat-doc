# 好友关系操作

| 事件                  | payload 中类型                 | 触发事件             |
| :-------------------- | :----------------------------- | :------------------- |
| `roster`                | -                              | 好友关系操作所有事件 |
| `roster:add`            | `{“operation”:“add”}`           | 添加好友             |
| `roster:remove`         | `{“operation”:“remove”}`         | 删除好友             |
| `roster:accept`         | `{“operation”:“accept”}`         | 同意好友申请。对方用户收到该事件。         |
| `roster:decline`        | `{“operation”:“decline”}`        | 拒绝好友申请。对方用户收到该事件。       |
| `roster:ban`            | `{“operation”:“ban”}`           | 拉黑好友             |
| `roster:allow`          | `{“operation”:“allow”}`          | 解除拉黑好友         |

## 添加好友

payload 字段含义：

| 字段        | 数据类型 | 含义              |
| :---------- | :------- | :---------------- |
| `reason`    | object   | /                 |
| `operation` | String   | `add`：添加好友。 |

payload 之外的字段如下表所示：

| 字段     | 数据类型 | 含义                                                         |
| :------- | :------- | :----------------------------------------------------------- |
| `callId`    | String   | `callId` 为每个回调请求的唯一标识，格式为 “App Key_添加好友事件的消息 ID”。 | 
| `msg_id`    | String   | 添加好友事件的消息 ID。 | 

payload 示例：

```json
{
    "chat_type":"roster",
    "callId":"XXXX#XXXX",
    "security":"XXXX",
    "payload":{
        "reason":"",
        "operation":"add"
        },
    "host":"XXXX",
    "appkey":"XXXX#XXXX",
    "from":"XXXX#XXXX",
    "to":"tst01",
    "eventType":"chat",
    "msg_id":"9XXXX2",
    "timestamp":1642648175092
    }
```

## 删除好友

payload 字段含义：

| 字段         | 数据类型 | 含义                 |
| :----------- | :------- | :------------------- |
| `roster_ver` | String   | 好友列表的版本号。   |
| `operation`  | String   | `remove`：移除好友。 |

payload 之外的字段如下表所示：

| 字段     | 数据类型 | 含义                                                         |
| :------- | :------- | :----------------------------------------------------------- |
| `callId`    | String   | `callId` 为每个回调请求的唯一标识，格式为 “App Key_删除好友事件的消息 ID”。 | 
| `msg_id`    | String   | 删除好友事件的消息 ID。 | 

payload 示例：

```json
{
    "chat_type":"roster",
    "callId":"XXXX#XXXX736",
    "security":"2e7XXXX2d7",
    "payload":{
        "roster_ver":"003DD920ADD15B51EB0B806E83BDD97F089B0092",
        "operation":"remove"
        },
    "host":"XXXX",
    "appkey":"XXXX#XXXX",
    "from":"XXXX#XXXX",
    "to":"tst01",
    "eventType":"chat",
    "msg_id":"XXXX463736",
    "timestamp":1642648138571
    }
```

## 同意好友申请

用户发送好友申请后，对方用户同意加好友后会收到服务器发送的该事件。

payload 字段含义：

| 字段         | 数据类型 | 含义                     |
| :----------- | :------- | :----------------------- |
| `roster_ver` | String   | 好友列表的版本号。       |
| `operation`  | String   | `accept`：同意好友申请。 |

payload 之外的字段如下表所示：

| 字段     | 数据类型 | 含义                                                         |
| :------- | :------- | :----------------------------------------------------------- |
| `callId`    | String   | `callId` 为每个回调请求的唯一标识，格式为 “App Key_同意好友申请事件的消息 ID”。 | 
| `msg_id`    | String   | 同意好友申请事件的消息 ID。 | 

回调请求示例：

```json
{
    "chat_type":"roster",
    "callId":"XXXX#XXXX_966725899779049516",
    "security":"a2e1545231e8acf60513b50984af0c6c",
    "payload":{
        "roster_ver":"DD6E14FE5EE5A9ABC52CA86C5DE1601CF729BFD6",
        "operation":"accept"
        },
    "host":"XXXX",
    "appkey":"XXXX#XXXX",
    "from":"XXXX#XXXX",
    "to":"tst01",
    "eventType":"chat",
    "msg_id":"96XXXX516",
    "timestamp":1642648213494
    }
```

## 拒绝好友申请

用户发送好友申请后，对方用户拒绝添加好友后会收到服务器发送的该事件。

payload 字段含义：

| 字段         | 数据类型 | 含义                      |
| :----------- | :------- | :------------------------ |
| `roster_ver` | String   | 好友列表的版本号。        |
| `operation`  | String   | `decline`：拒绝好友申请。 |

payload 之外的字段如下表所示：

| 字段     | 数据类型 | 含义                                                         |
| :------- | :------- | :----------------------------------------------------------- |
| `callId`    | String   | `callId` 为每个回调请求的唯一标识，格式为 “App Key_拒绝好友申请事件的消息 ID”。 | 
| `msg_id`    | String   | 拒绝好友申请事件的消息 ID。 | 

回调请求示例：

```json
{
    "chat_type":"roster",
    "callId":"XXXX#XXXX_966726099692161068",
    "security":"747d6297660e57bcf38315aa98c206ac",
    "payload":{
        "roster_ver":"3D81EC24A6E732B2EB1B654AA446930DB9BAFE59",
        "operation":"remote_decline"
        },
    "host":"XXXX",
    "appkey":"XXXX#XXXX",
    "from":"XXXX#XXXX",
    "to":"tst",
    "eventType":"chat",
    "msg_id":"9XXXX68",
    "timestamp":1642648260029
    }
```

## 拉黑好友

payload 字段含义：

| 字段         | 数据类型 | 含义                   |
| :----------- | :------- | :--------------------- |
| `operation`  | String   | `ban`：拉黑好友。      |
| `status`     | object   | 包含 `error_code`。    |
| `error_code` | String   | 操作失败对应的错误码。 |

payload 之外的字段如下表所示：

| 字段     | 数据类型 | 含义                                                         |
| :------- | :------- | :----------------------------------------------------------- |
| `callId`    | String   | `callId` 为每个回调请求的唯一标识，格式为 “App Key_拉黑好友事件的消息 ID”。 | 
| `msg_id`    | String   | 拉黑好友事件的消息 ID。 | 

payload 示例：

```json
{
    "chat_type":"roster",
    "callId":"XXXX#XXXX_966725184268539960",
    "security":"00f070116668034ddecf3fb7db92087c",
    "payload":{
        "operation":"ban",
        "status":{
            "error_code":"ok"
            }
        },
    "host":"XXXX",
    "appkey":"XXXX#XXXX",
    "from":"XXXX#XXXX",
    "to":"tst",
    "eventType":"chat",
    "msg_id":"9XXXX0",
    "timestamp":1642648046912
}
```


## 解除拉黑好友

payload 字段含义：

| 字段         | 数据类型 | 含义                    |
| :----------- | :------- | :---------------------- |
| `operation`  | String   | `allow`：解除拉黑好友。 |
| `status`     | object   | 包含 `error_code`。     |
| `error_code` | String   | 操作失败对应的错误码。  |

payload 之外的字段如下表所示：

| 字段     | 数据类型 | 含义                                                         |
| :------- | :------- | :----------------------------------------------------------- |
| `callId`    | String   | `callId` 为每个回调请求的唯一标识，格式为 “App Key_解除拉黑好友事件的消息 ID”。 | 
| `msg_id`    | String   | 解除拉黑好友事件的消息 ID。 | 

回调请求示例：

```json
{
    "chat_type":"roster",
    "callId":"XXXX#XXXX_966725018736134200",
    "security":"cbe8a5f1ba384107b63ef61637f55cad",
    "payload":{
        "operation":"allow",
        "status":{
            "error_code":"ok"
            }
        },
    "host":"XXXX",
    "appkey":"XXXX#XXXX",
    "from":"XXXX#XXXX",
    "to":"tst",
    "eventType":"chat",
    "msg_id":"966725018736134200",
    "timestamp":1642648008357
}
```