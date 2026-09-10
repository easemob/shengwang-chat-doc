# Restful API 调用频率限制

## 概述

### API 的调用频率限制计算

除部分 API 接口有特殊说明外，API 调用频率限制默认为 100 次/秒，你可以按模块查看每个接口的调用频率限制。

在即时通讯 IM 系统中，大部分客户端接口的调用实际上是通过对应的 RESTful API 来实现的。
- 下表中标注 * 的 RESTful API 没有对应的客户端接口，因此它们的调用频率仅由相应的 RESTful API 的调用频率决定。若这些接口的调用频率达到上限，你可以联系商务经理提升。
- 其他接口，其调用频率则为 RESTful API 和对应客户端接口调用频率的总和。若这些接口的调用频率达到上限，你可以查看是否是客户端 API 调用过于频繁。如果需要提升调用频率上限，可联系商务经理。

### API 调用频率限制周期

API 限流周期按照 UTC 时间计算，即当日的 00:00:00 至次日的 00:00:00，转换成北京时间为当日的 08:00:00 至次日的 08:00:00。

### API 调用频率叠加包

即时通讯 IM 专业版和旗舰版支持调整的服务端 API 及叠加包大小（免费版不支持），如下表所示。

单个叠加包大小为单次调整频率值，例如，上传文件 API 的默认调用频率上限为 100 次/秒/App ID，单个叠加包为 100 次/秒，购买单个叠加包后，你的该接口的 API 调用频率上限提升至 200 次/秒/App ID。

叠加包单价为国内 200 元/月，海外 400 元/月。

## 消息管理

| RESTful API 接口 |方法  | 接口 URL| 接口最高调用频率（默认值） | 单个叠加包大小|
| :-------- | :----- | :---------------- | :--------------------- | :--------------------- |
| * 发送单聊消息                 | POST   | /app-id/{app_id}/messages/users                | 对于单个 app，该 REST API 存在以下三个限制：<br/> - 100 次/秒/App ID <br/> - 6000 条/分钟  <br/> - 600 人/次。若一次向 600 人发消息，视为 600 条消息。  | 12000 条/分钟    | 
| * 发送群聊消息                 | POST   | /app-id/{app_id}/messages/chatgroups           | 对于单个 app，该 REST API 存在以下三个限制：<br/> - 20 条/秒/App ID   <br/> - 20 次/秒 <br/> -  3 个群/次   | 50 条/秒   | 
| * 发送定向消息                 | POST   | /app-id/{app_id}/messages/chatgroups/users           | 100 条/秒/App ID   | 100 次/秒    | 
| * 发送聊天室消息               | POST   | /app-id/{app_id}/messages/chatrooms            | 对于单个 app，该 REST API 存在以下三个限制：<br/> - 100 条/秒  <br/> - 100 次/秒   <br/> -  10 个聊天室/次   | 100 条/秒    | 
| * 向 app 所有用户发送广播消息 | POST | /app-id/{app_id}/messages/broadcast | <br/> - 每 30 分钟限发 1 次，不支持上调。<br/> - 每天限发 3 次，支持联系商务上调。<br/> - 每秒最多可向 1000 个用户发消息，不支持上调。 |     | 
| * 向 app 在线用户发送广播消息 | POST | /app-id/{app_id}/messages/users/broadcast | 每分钟限 1 次，每天限 50 次（可联系商务经理提升该上限）。 |     | 
| * 发送单聊流式消息                 | POST   | /app-id/{app_id}/stream_message/user           | 100 条/秒/App ID   | ——   | 
| * 发送群聊流式消息                 | POST   | /app-id/{app_id}/stream_message/chatgroup           | 100 条/秒/App ID   | ——   | 
| * 发送聊天室全局广播消息 | POST | /app-id/{app_id}/messages/chatrooms/broadcast | 每分钟限发 10 次，每天限发 100 次广播消息。 | 100次/天    | 
| 上传文件  |    POST  | /app-id/{app_id}/chatfiles       | 100 次/秒/App ID                                                 |  100 次/秒   | 
| 下载文件      |  GET     | /app-id/{app_id}/chatfiles/{file_uuid}       | 100 次/秒/App ID       | 100 次/秒    | 
| * 获取历史消息（聊天记录）文件   |  GET     | /app-id/{app_id}/chatmessages/${time}          | 10 次/分钟/App ID  | 20 次/分钟    | 
| * 设置指定消息附件的存储方式   |  POST     | /app-id/{app_id}/users/{username}/chatfiles/lifetime          | 100 次/秒/App ID     |     | 
| * 撤回单条消息    |    POST  | /app-id/{app_id}/messages/recall        | 100 次/秒/App ID   | 100 次/秒    | 
| * 批量撤回消息    |    POST  | /app-id/{app_id}/messages/batch_recall        | 100 次/秒/App ID  | 100 次/秒    | 
| 服务端单向删除会话   |    DELETE    | /app-id/{app_id}/users/{userName}/user_channel          | 5 次/分钟/单用户 ID，100 次/秒/App ID   | 100 次/秒    | 
| 添加 Reaction         | POST   | /app-id/{app_id}/reaction/user/{userId}   | 100 次/秒/App ID | 50 次/秒    | 
| 根据消息 ID 获取 Reaction     | GET    | /app-id/{app_id}/reaction/user/{userId}  | 100 次/秒/App ID  | 25 次/秒    | 
| 删除 Reaction     | DELETE | /app-id/{app_id}/reaction/user/{userId} | 100 次/秒/App ID  | 50 次/秒    | 
| 根据消息 ID 和表情 ID 获取 Reaction 信息 | GET    | /app-id/{app_id}/reaction/user/{userId}/detail | 100 次/秒/App ID  | 25 次/秒    | 
| 编辑消息 | PUT  | /app-id/{app_id}/messages/rewrite/{msg_id} | 100 次/秒/App ID  | 50 条/秒    | 
| 翻译消息内容 | POST  | /app-id/{app_id}/translate | 100 次/秒/App ID  | 50 次/秒    | 
| 获取翻译语言列表 | GET  | /app-id/{app_id}/translate/support/language | 100 次/秒/App ID  | 50 次/秒    | 
| 检测文本的源语言 | POST  | /app-id/{app_id}/translate/detect | 100 次/秒/App ID  | 50 次/秒    | 
| 根据消息 ID 单向删除单聊漫游消息  | DELETE    | /app-id/{app_id}/rest/message/roaming/chat/user/{userId}?userId={userId}&msgIdList={msgIdList}    | 100 次/秒/App ID   | 50 次/秒    | 
| 根据消息 ID 单向删除群聊漫游消息  | DELETE    | /app-id/{app_id}/rest/message/roaming/group/user/{userId}?groupId={groupId}&msgIdList={msgIdList}   | 100 次/秒/App ID   |     | 
| 单向清空指定用户的漫游消息 | POST  | /app-id/{app_id}/rest/message/roaming/user/{userId}/delete/all | 100 次/秒/App ID  | 100 次/秒    | 
| 单向清空单聊会话某个时间点及之前的漫游消息 | POST  | /app-id/{app_id}/rest/message/roaming/chat/user/{userId}/time?userId={userId}&delTime={delTime} | 100 次/秒/App ID  | 50 次/秒    | 
| 单向清空群组或聊天室会话某个时间点及之前的漫游消息 | POST  | /app-id/{app_id}/rest/message/roaming/group/user/{userId}/time?groupId={groupId}&delTime={delTime} | 100 次/秒/App ID  | 50 次/秒    | 
| 导入单聊消息 | POST  | /app-id/{app_id}/messages/users/import | 100 条/秒/App ID    | 100 次/秒    | 

## 群组

### 群组管理

| RESTful API 接口 |方法  | 接口 URL| 接口最高调用频率（默认值） | 单个叠加包大小|
| :-------- | :----- | :---------------- | :--------------------- | :--------------------- |
| 分页获取 app 中的群组  |  GET     | /app-id/{app_id}/chatgroups?limit={N}&cursor={cursor}  | 100 次/秒/App ID   |  50 次/秒   | 
| 获取一个用户加入的所有群组   |  GET         | /app-id/{app_id}/chatgroups/user/{username}?pagesize={}&pagenum={}        | 50 次/秒/App ID   | 50 次/秒    | 
| 查看指定用户是否已加入群组 | POST  | /app-id/{app_id}/chatgroups/{group_id}/user/{user_id}/is_joined | 100 次/秒/App ID | 100 次/秒    | 
| 获取群组详情        |  GET        | /app-id/{app_id}/chatgroups/{group_ids}           | 100 次/秒/App ID  | 100 次/秒    | 
| 创建群组  |    POST      | /app-id/{app_id}/chatgroups                  | 100 次/秒/App ID   | 100 次/秒    | 
| 封禁群组  |    POST      | /app-id/{app_id}/chatgroups/{group_id}/disable                  | 100 次/秒/App ID   |     | 
| 解禁群组  |    POST      | /app-id/{app_id}/chatgroups/{group_id}/enable                  | 100 次/秒/App ID   |     | 
| 修改群组信息   |    PUT         | /app-id/{app_id}/chatgroups/{group_id}             | 100 次/秒/App ID   | 100 次/秒    | 
| 解散群组 |    DELETE    | /app-id/{app_id}/chatgroups/{group_id}                    | 100 次/秒/App ID   | 50 次/秒    | 
| 获取群组公告     |  GET     | /app-id/{app_id}/chatgroups/{group_id}/announcement         | 100 次/秒/App ID     | 100 次/秒    | 
| 修改群组公告  |    POST| /app-id/{app_id}/chatgroups/{group_id}/announcement          | 100 次/秒/App ID   | 100 次/秒    | 
| 分页获取群组共享文件   |  GET     | /app-id/{app_id}/chatgroups/{group_id}/share_files?pagenum=1&pagesize=10        | 100 次/秒/App ID    | 100 次/秒    | 
| 上传群组共享文件  |    POST  | /app-id/{app_id}/chatgroups/{group_id}/share_files       | 100 次/秒/App ID    |  100 次/秒   | 
| 下载群组共享文件    |  GET   | /app-id/{app_id}/chatgroups/{group_id}/share_files/{file_id}   | 100 次/秒/App ID    |  100 次/秒   | 
| 删除群组共享文件   |    DELETE   | /app-id/{app_id}/chatgroups/{group_id}/share_files/{file_id}     | 100 次/秒/App ID   | 100 次/秒    | 

### 群成员管理

| RESTful API 接口 |方法  | 接口 URL| 接口最高调用频率（默认值） | 单个叠加包大小|
| :-------- | :----- | :---------------- | :--------------------- | :--------------------- |
| 分页获取群组成员  |  GET     | /app-id/{app_id}/chatgroups/{group_id}/users       | 100 次/秒/App ID     |  100 次/秒   | 
| 添加单个群组成员     |    POST | /app-id/{app_id}/chatgroups/{group_id}/users/{username}?need_notify=false    | 100 次/秒/App ID      | 50 次/秒    | 
| 批量添加群组成员    |    POST   | /app-id/{app_id}/chatgroups/{group_id}/users?need_notify=false           | 100 次/秒/App ID     | 50 次/秒    | 
| 移除单个群组成员     |    DELETE    | /app-id/{app_id}/chatgroups/{group_id}/users/{username}?need_notify=false    | 100 次/秒/App ID    |     | 
| 批量移除群组成员    |    DELETE     | /app-id/{app_id}/chatgroups/{group_id}/users/{usernames}?need_notify=false    | 100 次/秒/App ID   | 50 次/秒    | 
| 设置群成员自定义属性    |  PUT       | /app-id/{app_id}/metadata/chatgroup/{group_id}/user/{username}              | 100 次/秒/App ID   | 100 次/秒    | 
| 批量设置群成员自定义属性    |  PUT       | /app-id/{app_id}/metadata/chatgroup/{group_id}/users/batch  | 100 次/秒/App ID  |     | 
| 获取单个群成员的所有自定义属性    |  GET       | /app-id/{app_id}/metadata/chatgroup/{group_id}/user/{username}            | 100 次/秒/App ID   | 100 次/秒    | 
| 根据属性 key 获取多个群成员的自定义属性    |  POST       | /app-id/{app_id}/metadata/chatgroup/{group_id}/get              | 100 次/秒/App ID     | 100 次/秒    | 
| 获取群管理员列表    |  GET       | /app-id/{app_id}/chatgroups/{group_id}/admin              | 100 次/秒/App ID   | 100 次/秒    | 
| 添加群管理员     |    POST    | /app-id/{app_id}/chatgroups/{group_id}/admin              | 100 次/秒/App ID  | 100 次/秒    | 
| 移除群管理员     |    DELETE  | /app-id/{app_id}/chatgroups/{group_id}/admin/{oldadmin}    | 100 次/秒/App ID  | 100 次/秒    | 
| 转让群组       |    PUT | /app-id/{app_id}/chatgroups/{group_id}                     | 100 次/秒/App ID   |     | 
| 查询群组黑名单    |    GET   | /app-id/{app_id}/chatgroups/{group_id}/blocks/users       | 100 次/秒/App ID    | 50 次/秒    | 
| 添加单个用户至群组黑名单   |    POST      | /app-id/{app_id}/chatgroups/{group_id}/blocks/users/{username}    | 100 次/秒/App ID | 100 次/秒    | 
| 批量添加用户至群组黑名单   |    POST    | /app-id/{app_id}/chatgroups/{group_id}/blocks/users       | 100 次/秒/App ID | 50 次/秒    | 
| 从群组黑名单移除单个用户   |    DELETE  | /app-id/{app_id}/chatgroups/{group_id}/blocks/users/{username}    | 100 次/秒/App ID  | 50 次/秒    | 
| 批量从群组黑名单移除用户  |    DELETE  | /app-id/{app_id}/chatgroups/{group_id}/blocks/users/{usernames}    | 100 次/秒/App ID   | 50 次/秒    | 
| 查询群组白名单  |    GET | /app-id/{app_id}/chatgroups/{group_id}/white/users        | 100 次/秒/App ID         | 100 次/秒   | 
| 添加单个用户至群组白名单 |    POST    | /app-id/{app_id}/chatgroups/{group_id}/white/users/{username}    | 100 次/秒/App ID  | 100 次/秒    | 
| 批量添加用户至群组白名单|    POST    | /app-id/{app_id}/chatgroups/{group_id}/blocks/users       | 100 次/秒/App ID  | 50 次/秒    | 
| 将用户移除群组白名单 |    DELETE    | /app-id/{app_id}/chatgroups/{group_id}/white/users/{username}    | 100 次/秒/App ID    | 100 次/秒    | 
| 获取禁言列表 |    GET    | /app-id/{app_id}/chatgroups/{group_id}/mute              | 100 次/秒/App ID    | 100 次/秒    | 
| 禁言单个群成员    |    POST    | /app-id/{app_id}/chatgroups/{group_id}/mute               | 100 次/秒/App ID      | 100 次/秒    | 
| 禁言全体成员    |    POST    | /app-id/{app_id}/chatgroups/{group_id}/ban                | 100 次/秒/App ID  | 100 次/秒    | 
| 解除成员禁言   |    DELETE   | /app-id/{app_id}/chatgroups/{group_id}/mute/{member1}(,{member2},…)    | 100 次/秒/App ID    |  100 次/秒   | 
| 解除全员禁言 |    DELETE    | /app-id/{app_id}/chatgroups/{group_id}/ban                | 100 次/秒/App ID     | 100 次/秒    | 

### 消息话题管理

| RESTful API 接口 |方法  | 接口 URL| 接口最高调用频率（默认值） | 单个叠加包大小|
| :-------- | :----- | :---------------- | :--------------------- | :--------------------- |
| 分页获取 app 中的消息话题  | GET  | /app-id/{app_id}/thread | 100 次/秒/App ID   |     | 
| 分页获取单个用户加入的所有消息话题  | GET     | /app-id/{app_id}/threads/user/{username}    | 100 次/秒/App ID   |     | 
| 分页获取单个用户在指定群组中加入的所有消息话题  | GET  | /app-id/{app_id}/threads/chatgroups/{group_id}/user/{username}    | 100 次/秒/App ID   |
| 创建消息话题  | POST     | /app-id/{app_id}/thread    | 100 次/秒/App ID  |     | 
| 修改消息话题  | PUT     | /app-id/{app_id}/thread/{thread_id}    | 100 次/秒/App ID   |     | 
| 删除消息话题  | DELETE     | /app-id/{app_id}/thread/{thread_id}    | 100 次/秒/App ID   |     | 
| 分页获取消息话题成员列表  | GET     | /app-id/{app_id}/thread/{thread_id}/users    | 100 次/秒/App ID   |     | 
| 用户批量加入消息话题  | POST     | /app-id/{app_id}/thread/{thread_id}/users   | 100 次/秒/App ID   |     | 
| 批量踢出消息话题成员  | DELETE     | /app-id/{app_id}/threads/{thread_id}/users   | 100 次/秒/App ID  |     | 

## 聊天室

### 聊天室管理

| RESTful API 接口 |方法  | 接口 URL| 接口最高调用频率（默认值） | 单个叠加包大小|
| :-------- | :----- | :---------------- | :--------------------- | :--------------------- |
| 获取 app 中的聊天室  |    GET   | /app-id/{app_id}/chatrooms?limit={N}&cursor={cursor}       | 50 次/秒/App ID          | 50 次/秒    | 
| 获取用户加入的聊天室 |    GET       | /app-id/{app_id}/users/{username}/joined_chatrooms         | 50 次/秒/App ID             |  50 次/秒   | 
| 获取聊天室详情     |    GET    | /app-id/{app_id}/chatrooms/{chatroom_id}       | 100 次/秒/App ID       | 50 次/秒    | 
| 创建一个聊天室   |    POST   | /app-id/{app_id}/chatrooms                                 | 50 次/秒/App ID                                                  | 100 次/秒    | 
| 修改聊天室信息 |    PUT     | /app-id/{app_id}/chatrooms/{chatroom_id}                   | 100 次/秒/App ID                                                 |  100 次/秒   | 
| 转让聊天室          | PUT    | /app-id/{app_id}/chatrooms/{chatroom_id}              | 100 次/秒/App ID    |     | 
| 解散聊天室  |  DELETE  | /app-id/{app_id}/chatrooms/{chatroom_id}                   | 100 次/秒/App ID     | 50 次/秒    | 
| 获取聊天室公告  |   GET  | /app-id/{app_id}/chatrooms/{chatroom_id}/announcement      | 100 次/秒/App ID                                                 | 100 次/秒    | 
| 修改聊天室公告   |    POST | /app-id/{app_id}/chatrooms/{chatroom_id}/announcement      | 100 次/秒/App ID        | 100 次/秒    | 
| 获取聊天室自定义属性 | POST  | /app-id/{app_id}/metadata/chatroom/{chatroom_id} | 100 次/秒/App ID       | 100 次/秒    | 
| 设置聊天室自定义属性 | PUT  | /app-id/{app_id}/metadata/chatroom/{chatroom_id}/user/{username} | 100 次/秒/App ID       |  25 次/秒   | 
| 强制设置聊天室自定义属性 | PUT | /app-id/{app_id}/metadata/chatroom/{chatroom_id}/user/{username}/forced | 100 次/秒/App ID        | 25 次/秒    | 
| 删除聊天室自定义属性 | DELETE  | /app-id/{app_id}/metadata/chatroom/{chatroom_id}/user/{username} | 100 次/秒/App ID             | 25 次/秒    | 
| 强制删除聊天室自定义属性 | DELETE  | /app-id/{app_id}/metadata/chatroom/{chatroom_id}/user/{username}/forced | 100 次/秒/App ID           | 25 次/秒    | 

### 聊天室成员管理

| RESTful API 接口 |方法  | 接口 URL| 接口最高调用频率（默认值） | 单个叠加包大小|
| :-------- | :----- | :---------------- | :--------------------- | :--------------------- |
| 分页获取聊天室成员   |   GET   | /app-id/{app_id}/chatrooms/{chatroom_id}/users          | 100 次/秒/App ID                                                 |  50 次/秒   | 
| 添加单个聊天室成员    |    POST   | /app-id/{app_id}/chatrooms/{chatroom_id}/users/{username}  | 100 次/秒/App ID                                                 | 100 次/秒    | 
| 批量添加聊天室成员    |    POST   | /app-id/{app_id}/chatrooms/{chatroom_id}/users           | 100 次/秒/App ID                                                 | 50 次/秒    | 
| 删除单个聊天室成员  |  DELETE   | /app-id/{app_id}/chatrooms/{chatroom_id}/users/{username}  | 100 次/秒/App ID                                                 |     | 
| 批量删除聊天室成员 |  DELETE   | /app-id/{app_id}/chatrooms/{chatroom_id}/users/{usernames}  | 100 次/秒/App ID                                                 | 50 次/秒    | 
| 获取聊天室管理员列表    |   GET    | /app-id/{app_id}/chatrooms/{chatroom_id}/admin          | 100 次/秒/App ID                                                 | 100 次/秒    | 
| 添加聊天室管理员  |    POST    | /app-id/{app_id}/chatrooms/{chatroom_id}/admin          | 100 次/秒/App ID                                                 | 100 次/秒    | 
| 移除聊天室管理员   |  DELETE    | /app-id/{app_id}/chatrooms/{chatroom_id}/admin/{oldadmin}  | 100 次/秒/App ID                                                 | 100 次/秒    | 
| 查询聊天室黑名单    |   GET   | /app-id/{app_id}/chatrooms/{chatroom_id}/blocks/users   | 100 次/秒/App ID                                                 | 100 次/秒    | 
| 添加单个用户至聊天室黑名单 |    POST    | /app-id/{app_id}/chatrooms/{chatroom_id}/blocks/users/{username}  | 100 次/秒/App ID                                                 | 100 次/秒    | 
| 批量添加用户至聊天室黑名单  |    POST     | /app-id/{app_id}/chatrooms/{chatroom_id}/blocks/users   | 100 次/秒/App ID                                                 | 50 次/秒    | 
| 从聊天室黑名单移除单个用户   |  DELETE     | /app-id/{app_id}/chatrooms/{chatroom_id}/blocks/users/{username}  | 100 次/秒/App ID                                                 |     | 
| 批量从聊天室黑名单移除用户   |  DELETE     | /app-id/{app_id}/chatrooms/{chatroom_id}/blocks/users/{usernames}  | 100 次/秒/App ID                                                 |  50 次/秒   | 
| 查询聊天室白名单   |   GET   | /app-id/{app_id}/chatrooms/{chatroom_id}/white/users   | 100 次/秒/App ID                                                 | 100 次/秒    | 
| 添加单个用户至聊天室白名单  |    POST     | /app-id/{app_id}/chatrooms/{chatroom_id}/white/users/{username}  | 100 次/秒/App ID                                                 | 100 次/秒    | 
| 批量添加用户至聊天室白名单   |    POST    | /app-id/{app_id}/chatrooms/{chatroom_id}/white/users    | 100 次/秒/App ID                                                 | 50 次/秒   | 
| 将用户移除聊天室白名单  |  DELETE       | /app-id/{app_id}/chatrooms/{chatroom_id}/white/users/{username}  | 100 次/秒/App ID                                                 |  100 次/秒   | 
| 获取聊天室的禁言列表  |   GET   | /app-id/{app_id}/chatrooms/{chatroom_id}/mute           | 100 次/秒/App ID                                                 | 100 次/秒    | 
| 禁言聊天室成员   |    POST    | /app-id/{app_id}/chatrooms/{chatroom_id}/mute           | 100 次/秒/App ID                                                 | 100 次/秒    | 
| 禁言聊天室全体成员    |    POST  | /app-id/{app_id}/chatrooms/{chatroom_id}/ban            | 100 次/秒/App ID  | 100 次/秒    | 
| 解除聊天室禁言成员   |  DELETE     | /app-id/{app_id}/chatrooms/{chatroom_id}/mute/{member1}(,{member2},…)  | 100 次/秒/App ID      | 100 次/秒    | 
| 解除聊天室全员禁言    |  DELETE     | /app-id/{app_id}/chatrooms/{chatroom_id}/ban            | 100 次/秒/App ID   | 100 次/秒    | 
| 按聊天室用户标签禁言    |  PUT     | /app-id/{app_id}/chatrooms/{chatroom_id}/tag/mute    | 100 次/秒/App ID   |     | 
| 设置用户在聊天室中的标签    |  PUT     | /app-id/{app_id}/chatrooms/{chatroom_id}/users/{username}/tag    | 100 次/秒/App ID   |     | 
| 获取用户聊天室标签    |  GET     | /app-id/{app_id}/chatrooms/{chatroom_id}/users/{username}/tag    | 100 次/秒/App ID   |     | 
| 获取超级管理员列表   |   GET    | /app-id/{app_id}/chatrooms/super_admin                  | 100 次/秒/App ID  |  100 次/秒   | 
| 添加超级管理员   |    POST    | /app-id/{app_id}/chatrooms/super_admin                  | 100 次/秒/App ID   | 100 次/秒    | 
| 移除超级管理员    |  DELETE    | /app-id/{app_id}/chatrooms/super_admin/{superAdmin}     | 100 次/秒/App ID  | 100 次/秒    | 

## 用户相关

###  用户体系管理

| RESTful API 接口 |方法  | 接口 URL| 接口最高调用频率（默认值） | 单个叠加包大小|
| :-------- | :----- | :---------------- | :--------------------- | :--------------------- |
| * 获取 app/用户 token  | POST   | /app-id/{app_id}/token   | 300 次/秒/App ID          | 免费    | 

以下两个表格中的用户体系 API 和离线推送相关 API 的接口总调用频率（默认值）为 100 次/秒/App ID，单个叠加包大小为 50 次/秒。

| RESTful API 接口 |方法  | 接口 URL| 
| :-------- | :----- | :---------------- | 
| 注册单个用户  |  POST  | /app-id/{app_id}/users        | 
| * 批量注册用户 |  POST   | /app-id/{app_id}/users       | 
| 获取单个用户  |  GET | /app-id/{app_id}/users/{username}   |
| * 批量获取用户 |  GET  | /app-id/{app_id}/users      | 
| * 删除单个用户 |  DELETE  | /app-id/{app_id}/users/{username}         | 
| * 批量删除用户 |  DELETE   | /app-id/{app_id}/users  | 30 次/秒/App ID   | 
| * 修改用户密码  |  POST | /app-id/{app_id}/users/{username}/password   | 
| * 获取用户在线状态  |  GET | /app-id/{app_id}/users/{username}/status   | 
| * 批量获取用户在线状态  |  POST    | /app-id/{app_id}/users/batch/status  | 
| * 获取离线消息数       |  GET     | /app-id/{app_id}/users/{owner_username}/offline_msg_count    |
| * 获取离线消息的状态    |  GET   | /app-id/{app_id}/users/{username}/offline_msg_status/{msg_id}   | 
| * 账号封禁   |  POST     | /app-id/{app_id}/users/{username}/deactivate          | 
| * 账号解禁    |  POST                    | /app-id/{app_id}/users/{username}/activate         | 
| * 强制用户下线         |  GET    | /app-id/{app_id}/users/{username}/disconnect    | 
| * 强制用户从单设备下线 | DELETE | /app-id/{app_id}/users/{username}/disconnect/{resourceId} | 
| * 获取指定账号的在线登录设备列表    | GET  | /app-id/{app_id}/users/{username}/resources | 

| RESTful API 接口 |方法  | 接口 URL| 
| :-------- | :----- | :---------------- |
| 绑定和解绑推送信息           | PUT  | /app-id/{app_id}/users/{userId}/push/binding | 
| 查询当前用户的所有设备的推送绑定信息    | GET  | /app-id/{app_id}/users/{userId}/push/binding | 
| 设置推送消息显示昵称 | PUT  | /app-id/{app_id}/users/{userId} |
| 设置推送消息展示方式 | PUT  | /app-id/{app_id}/users/{userId} |

### 用户属性

| RESTful API 接口 |方法  | 接口 URL| 接口最高调用频率（默认值） | 单个叠加包大小|
| :-------- | :----- | :---------------- | :--------------------- | :--------------------- |
| 设置用户属性      | PUT     | /app-id/{app_id}/metadata/user/{username}            | 100 次/秒/App ID | 100 次/秒    | 
| 批量获取用户属性    | POST      | /app-id/{app_id}/metadata/user/get           | 100 次/秒/App ID    | 50 次/秒    | 
| 删除用户属性   | DELETE     | /app-id/{app_id}/metadata/user/{username}      | 100 次/秒/App ID  | 100 次/秒    | 
| 获取指定用户的所有用户属性/获取 app 下的用户属性总大小    | GET     | <br/> - /app-id/{app_id}/metadata/user/{username} <br/> - /app-id/{app_id}/metadata/user/capacity      | 100 次/秒/App ID | 100 次/秒    | 

### 用户在线状态订阅

| RESTful API 接口 |方法  | 接口 URL| 接口最高调用频率（默认值） | 单个叠加包大小|
| :-------- | :----- | :---------------- | :--------------------- | :--------------------- |
| 设置用户在线状态信息  |  POST     | /app-id/{app_id}/users/{uid}/presence/{resource}/{status} | 50 次/秒/App ID  | 100 次/秒    | 
| 批量订阅在线状态    |  POST      | /app-id/{app_id}/users/{uid}/presence/{expiry}         | 50 次/秒/App ID   | 50 次/秒    | 
| 批量获取在线状态信息    |  POST   | /app-id/{app_id}/users/{uid}/presence                  | 50 次/秒/App ID | 50 次/秒    | 
| 查询单个群组的在线成员数量    |  GET   | /app-id/{app_id}/presence/online/{group_id}/type/{query_type}  | 100 次/秒/App ID |     | 
|  取消订阅多个用户的在线状态     |  DELETE           | /app-id/{app_id}/users/{uid}/presence                  | 50 次/秒/App ID    | 100 次/秒    | 
| 查询订阅列表    |   GET       | /app-id/{app_id}/users/{uid}/presence/sublist?pageNum={pagenumber}&pageSize={pagesize} | 50 次/秒/App ID  | 100 次/秒    | 

### 全局禁言

| RESTful API 接口 |方法  | 接口 URL| 接口最高调用频率（默认值） | 单个叠加包大小|
| :-------- | :----- | :---------------- | :--------------------- | :--------------------- |
| * 设置用户全局禁言  |  POST      | /app-id/{app_id}/mutes         | 100 次/秒/App ID  | 50 次/秒    | 
| * 查询单个用户 ID 全局禁言 |   GET   | /{org_name}/{appName}/mutes/{username}  | 100 次/秒/App ID  |  100 次/秒   | 
| * 查询 app 下的所有全局禁言的用户  |   GET  | /app-id/{app_id}/mutes        | 100 次/秒/App ID  | 50 次/秒    | 

### 用户收藏

| RESTful API 接口 |方法  | 接口 URL| 接口最高调用频率（默认值） | 单个叠加包大小|
| :-------- | :----- | :---------------- | :--------------------- | :--------------------- |
| 分页获取用户收藏      | GET  | /app-id/{app_id}/users/{username}/collections   | 100 次/秒/App ID |     | 
| 添加一条收藏      | POST  | /app-id/{app_id}/users/{username}/collections   | 100 次/秒/App ID |     | 
| 批量添加用户收藏      | POST  | /app-id/{app_id}/collections   | 100 次/秒/App ID |     | 
| 修改用户收藏的扩展信息   | PUT  | /app-id/{app_id}/users/{username}/collections/{collectionId}  | 100 次/秒/App ID |     | 
| 删除用户收藏   | DELETE | /app-id/{app_id}/users/{username}/collections  | 100 次/秒/App ID |     | 

### 用户关系管理

| RESTful API 接口 |方法  | 接口 URL| 接口最高调用频率（默认值） | 单个叠加包大小|
| :-------- | :----- | :---------------- | :--------------------- | :--------------------- |
| 添加好友   | POST   | /app-id/{app_id}/users/{owner_username}/contacts/users/{friend_username}    | 100 次/秒/App ID   | 100 次/秒    | 
| 校验好友   | POST   | /app-id/{app_id}/contacts/check    | 100 次/秒/App ID   | 50 次/秒    | 
| 删除单个好友    | DELETE | /app-id/{app_id}/users/{owner_username}/contacts/users/{friend_username}    | 100 次/秒/App ID                                                 |  100 次/秒   | 
| 删除所有好友    | DELETE | /app-id/{app_id}/contacts/users/{username}    | 100 次/秒/App ID                                                 |  50 次/秒   | 
| 设置好友备注 | PUT | /app-id/{app_id}/user/{owner_username}/contacts/users/{friend_username} | 100 次/秒/App ID | |
| 分页获取好友列表    |  GET  | /app-id/{app_id}/user/{username}/contacts?limit={N}&cursor={cursor}&needReturnRemark={true/false}  | 100 次/秒/App ID   | 50 次/秒| 
| 一次性获取好友列表    |  GET  | /app-id/{app_id}/users/{owner_username}/contacts/users   | 100 次/秒/App ID   | 100 次/秒    | 
| * 导入好友列表    |  POST  | /app-id/{app_id}/users/{username}/contacts/import   | 100 次/秒/App ID   |   | 
| 获取黑名单列表     | GET   | /app-id/{app_id}/users/{owner_username}/blocks/users   | 50 次/秒/App ID                                                  | 100 次/秒    | 
| 校验黑名单     | POST   | /app-id/{app_id}/blocks/check   | 100 次/秒/App ID                                                  | 50 次/秒    | 
| 添加用户至黑名单    | POST  | /app-id/{app_id}/users/{owner_username}/blocks/users    | 50 次/秒/App ID                                                  | 100 次/秒    | 
| 从黑名单移除用户 | DELETE  | /app-id/{app_id}/users/{owner_username}/blocks/users/{blocked_username}   | 50 次/秒/App ID                                                  | 100 次/秒    | 

## 离线推送

| RESTful API 接口 |方法  | 接口 URL| 接口最高调用频率（默认值） | 单个叠加包大小|
| :-------- | :----- | :---------------- | :--------------------- | :--------------------- |
| 设置离线推送         | PUT  | /app-id/{app_id}/users/{userId}/notification/{chattype}/{key} | 100 次/秒/App ID          | 与下行的 “查询离线推送设置” API 的叠加包大小之和为 100 次/秒    | 
| 查询离线推送设置     | GET  | /app-id/{app_id}/users/{userId}/notification/{chattype}/{key} | 100 次/秒/App ID  | 与上行的 “设置离线推送” API 的叠加包大小之和为 100 次/秒    | 
| 批量设置离线推送时显示的昵称     | PUT | /app-id/{app_id}/push/nickname | 100 次/秒/App ID  |     | 
| 设置推送通知的首选语言     | PUT  | /app-id/{app_id}/users/{userId}/notification/language | 100 次/秒/App ID          |     | 
| 获取推送通知的首选语言 | GET  | /app-id/{app_id}/users/{userId}/notification/language | 100 次/秒/App ID  |     | 
| 创建离线推送模板          | POST  | /app-id/{app_id}/notification/template | 10 次/秒/App ID  |     | 
| 查询离线推送模板          | GET  | /app-id/{app_id}/notification/template/{name} | 10 次/秒/App ID  |     | 
| 删除离线推送模板          | DELETE  | /app-id/{app_id}/notification/template/{name} | 10 次/秒/App ID  |     | 
| 接收方配置模板名称   | PUT  | /app-id/{app_id}/users/{userId}/notification/template | 100 次/秒/App ID。 |     | 

## 发送后回调

| RESTful API 接口 |方法  | 接口 URL| 接口最高调用频率（默认值） | 单个叠加包大小|
| :-------- | :----- | :---------------- | :--------------------- | :--------------------- |
| 查询回调储存详情         | GET  | /app-id/{app_id}/callbacks/storage/info | 100 次/秒/App ID          | 50 次/秒  |
| 补发回调存储信息   | POST  | /app-id/{app_id}/callbacks/storage/retry | 100 次/秒/App ID  | 50 次/秒  |
