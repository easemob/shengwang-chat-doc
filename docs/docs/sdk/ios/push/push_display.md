# 设置推送通知的显示内容

通知收到后，通知栏中显示的推送标题和内容可通过以下方式设置，配置的优先级为由低到高：

1. **设置推送通知的显示属性**：使用默认的推送标题和内容，即推送通知的展示方式 `DisplayStyle` 采用默认的值（`AgoraChatPushDisplayStyleSimpleBanner`）。推送标题为**您有一条新消息**，推送内容为**请点击查看**。
2. **使用默认推送模板**：若有默认模板 `default`，发消息时无需指定。
3. **使用消息扩展字段**：使用扩展字段自定义要显示的推送标题和推送内容，即 `em_push_title` 和 `em_push_content`。
4. **接收方设置了推送模板**。
5. **使用自定义推送模板**：发送消息时通过消息扩展字段指定推送模板名称。

## 设置和获取推送通知的显示属性

### 设置推送通知的显示属性

你可以调用 `updatePushDisplayName` 设置推送通知中显示的昵称，如以下代码示例所示：

```objectivec
// 异步方法
[AgoraChatClient.sharedClient.pushManager updatePushDisplayName:@"displayName" completion:^(NSString * aDisplayName, AgoraChatError * aError) {
    if (aError) {
        NSLog(@"update push display name error: %@", aError.errorDescription);
    }
}];
```

你也可以调用 `updatePushDisplayStyle` 设置推送通知的显示样式，如下代码示例所示：

```objectivec
// 异步方法
[AgoraChatClient.sharedClient.pushManager updatePushDisplayStyle:AgoraChatPushDisplayStyleSimpleBanner completion:^(AgoraChatError * aError)
{
    if (aError) {
        NSLog(@"update display style error --- %@", aError.errorDescription);
    }
}];
```

若要在通知栏中显示消息内容，需要设置通知显示样式 `DisplayStyle`。`DisplayStyle` 是枚举类型，有如下两种设置：

| 参数值             | 描述                    |
| :--------------- | :---------------------- |
| （默认）`AgoraChatPushDisplayStyleSimpleBanner`   | 不论 `displayName` 是否设置，对于推送任何类型的消息，通知栏采用默认显示设置，即推送标题为**您有一条新消息**，推送内容为**请点击查看**。 |
| `AgoraChatPushDisplayStyleMessageSummary` | `AgoraChatPushDisplayStyleMessageSummary`：显示消息内容。设置的昵称只在 `DisplayStyle` 为 `AgoraChatPushDisplayStyleMessageSummary` 时生效，在 `AgoraChatPushDisplayStyleSimpleBanner` 时不生效。 |

下表以**单聊文本消息**为例介绍显示属性的设置。

对于**群聊**，下表中的**消息发送方的推送昵称**和**消息发送方的 IM 用户 ID**显示为**群组 ID**。

| 参数设置      | 推送显示 | 图片    |
| :--------- | :----- |:------------- |
| <br/> - `DisplayStyle`：（默认）`AgoraChatPushDisplayStyleSimpleBanner`<br/> - `displayName`：设置或不设置 | <br/> - 推送标题：**您有一条新消息**<br/> - 推送内容：**请点击查看**  | ![img](/images/android/push/push_displayattribute_1.png)  |
| <br/> - `DisplayStyle`：`AgoraChatPushDisplayStyleMessageSummary`<br/> - `displayName`：设置具体值 | <br/> - 推送标题：**您有一条新消息**<br/> - 推送内容：**消息发送方的推送昵称：消息内容**  | ![img](/images/android/push/push_displayattribute_2.png)|
| <br/> - `DisplayStyle`：`AgoraChatPushDisplayStyleMessageSummary`<br/> - `displayName`：不设置    | <br/> - 推送标题：**您有一条新消息**<br/> - 推送内容：**消息发送方的 IM 用户 ID: 消息内容**  | ![img](/images/android/push/push_displayattribute_3.png) |

### 获取推送通知的显示属性

你可以调用 `getPushNotificationOptionsFromServerWithCompletion` 方法获取推送通知中的显示属性，如以下代码示例所示：

```objectivec
// 异步方法
[AgoraChatClient.sharedClient.pushManager getPushNotificationOptionsFromServerWithCompletion:^(AgoraChatPushOptions * aOptions, AgoraChatError * aError)
{
    if (aError) {
        NSLog(@"get push options error --- %@", aError.errorDescription);
    }
}];
```

`AgoraChatPushOptions` 推送配置对象。 

| 属性名               | 描述                                                         |
| :------------------- | :----------------------------------------------------------- |
| `displayName`        | 对方收到推送时发送方展示的名称。                             |
| `displayStyle`       | 推送显示类型。                                               |

## 使用推送模板

推送模板主要用于服务器提供的默认配置不满足你的需求时，可使你设置全局范围的推送标题和推送内容。例如，服务器提供的默认设置为中文和英文的推送标题和内容，你若需要使用韩语或日语的推送标题和内容，则可以设置对应语言的推送模板。推送模板包括默认推送模板 `default` 和自定义推送模板。对于群组消息，你可以使用定向模板将离线通知只发送给特定用户，或向某些用户推送与其他用户不同的离线通知。

使用推送模板有以下优势：

1. 自定义修改声网服务端默认推送内容。   

2. 接收方可以决定使用哪个模板。 

3. 按优先级选择模板使用方式：
   
   - 使用自定义推送模板的优先级高于默认推送模板。

   - 若发送方发消息时设置了推送模板，接收方即使设置了推送模板，收到推送通知后也按照发送方设置的推送模板显示。

:::tip
- 设置推送模板为推送的高级功能，默认为开启状态。如需关闭推送高级功能必须联系商务，因为该操作会删除所有相关配置。
- 推送模板相关的数据结构，详见[推送扩展字段](/docs/sdk/server-side/push_extension.html)。
:::


### 配置推送模板

你可以通过以下两种方式设置：

1. [调用 RESTful API 配置](/docs/sdk/server-side/push.html#使用推送模板)。

2. 在[声网控制台](https://console.shengwang.cn/overview)设置推送模板。

  展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。点击左侧导航栏的**全部产品**。在下拉列表中找到**即时通讯 IM** 并点击。 在**即时通讯 IM** 页面，进入**功能配置**标签页。在**推送模板**页签下，点击**添加推送模板**，配置相关参数，添加推送模板。

| 推送模板参数       | 类型 |参数描述|
| :------------------- | :------------------- |
| 模板名称     | String    | 推送模板名称，默认模板为 `default`。<br/> 该参数必须填写。模板名称最多可包含 64 个字符，支持以下字符集：<br/>- 26 个小写英文字母 a-z<br/>- 26 个大写英文字母 A-Z<br/>- 10 个数字 0-9|
| 标题/内容     | Array    | 推送标题/内容。该参数必须填写。这两个参数的设置方式如下：<br/>- 输入固定的推送标题/内容，例如，标题为 “您好”，内容为“您有一条新消息”。<br/>- 内置参数填充：1. `{$dynamicFrom}`：按优先级从高到底的顺序填充好友备注、群昵称（仅限群消息）和推送昵称。2. `{$fromNickname}`：推送昵称。3. `{$msg}`：消息内容。<br/>-  自定义参数填充：模板输入数组索引占位符，格式为: {0} {1} {2} ... {n} <br/> 对于默认模板 `default`，参数的前两种设置方式在创建消息时无需传入该参数，第三种设置方式则需要通过扩展字段传入。使用自定义模板时，这两个参数无论通过哪种方式设置，创建消息时均需通过扩展字段传入。|

推送模板参数在消息扩展 `ext.em_push_template` 中。推送模板参数的 JSON 结构如下：

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
// TODO：重新截图
![img](https://doc.easemob.com/images/product/push/push_template_add.png)

### 发送消息时使用推送模板

创建模板后，你可以在发送消息时选择此推送模板，分为以下三种情况：

:::tip
若使用默认模板 **default**，消息推送时自动使用默认模板，创建消息时无需传入模板名称。
:::

1. 使用固定内容的推送模板，通过 `ext` 扩展字段指定推送模板名称。

这种情况下，创建消息时无需传入 `title_args` 和 `content_args` 参数。 

```objectivec
//下面以文本消息为例，其他类型的消息设置方法相同。
AgoraChatTextMessageBody *body = [[AgoraChatTextMessageBody alloc]initWithText:@"test"];
AgoraChatMessage *message = [[AgoraChatMessage alloc]initWithConversationID:@"conversationId" from:@"currentUsername" to:@"conversationId" body:body ext:nil];
//设置推送模板。设置前需在声网控制台或调用 RESTful 接口创建推送模板。
NSDictionary *pushObject = @{
   //设置推送模板名称。
   //若为默认模板 `default`，无需传入模板名称。若为自定义模板，需传入模板名称。
    @"name":@"templateName",
};
message.ext = @{
    @"em_push_template":pushObject,
};
message.chatType = AgoraChatTypeChat;
[[AgoraChatClient sharedClient].chatManager sendMessage:message progress:nil completion:nil];
```

2. 使用自定义或者默认推送模板，模板中的推送标题和推送内容使用以下内置参数：
- `{$dynamicFrom}`：服务器按优先级从高到底的顺序填充备注、群昵称（仅限群消息）和推送昵称。
- `{$fromNickname}`：推送昵称。  
- `{$msg}`：消息内容。

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

这种方式的示例代码与“使用固定内容的推送模板”的相同。

3. 使用自定义推送模板，而且推送标题和推送内容为自定义参数：

例如，推送模板的设置如下图所示：

![img](/images/android/push/push_template_custom.png)

使用下面的示例代码后，通知栏中弹出的推送通知为：

![img](/images/android/push/push_template_custom_example.png)

```objectivec
//下面以文本消息为例，其他类型的消息设置方法相同。
AgoraChatTextMessageBody *body = [[AgoraChatTextMessageBody alloc]initWithText:@"test"];
AgoraChatMessage *message = [[AgoraChatMessage alloc]initWithConversationID:@"conversationId" from:@"currentUsername" to:@"conversationId" body:body ext:nil];
//设置推送模板。设置前需在声网控制台上创建推送模板。
NSDictionary *pushObject = @{
    //设置推送模板名称。若不指定，设置默认推送模板的信息。
    //设置前需在声网控制台或调用 REST 接口创建推送模板。
    @"name":@"templateName",
    @"title_args":@[@"您",@"消息"],//设置填写模板标题的 value 数组。
    @"content_args":@[@"请",@"查看"]//设置填写模板内容的 value 数组。
};
message.ext = @{
    @"em_push_template":pushObject,
};
message.chatType = AgoraChatTypeChat;
[[AgoraChatClient sharedClient].chatManager sendMessage:message progress:nil completion:nil];
```

### 消息接收方使用推送模板

消息接收方可以调用 `setPushTemplate` 方法传入推送模板名称，选择要使用的模板。

:::tip
若发送方在发送消息时使用了推送模板，则推送通知栏中的显示内容以发送方的推送模板为准。
:::

```objectivec
[AgoraChatClient.sharedClient.pushManager setPushTemplate:@"templateName" completion:^(AgoraChatError * _Nullable aError) {

}];
```

## 使用消息扩展字段设置推送通知显示内容

创建推送消息时，你可以设置消息扩展字段自定义要显示的推送标题 `em_push_title` 和推送内容 `em_push_content`。

```objectivec
AgoraChatTextMessageBody *body = [[AgoraChatTextMessageBody alloc] initWithText:@"test"];
AgoraChatMessage *message = [[AgoraChatMessage alloc] initWithConversationID:conversationId from:currentUsername to:conversationId body:body ext:nil];
message.ext = @{@"em_apns_ext":@{
    @"em_push_title": @"customTitle",
    @"em_alert_subTitle": @"customSubTitle",
    @"em_push_content": @"customContent"
}};

message.chatType = AgoraChatTypeChat;
[AgoraChatClient.sharedClient.chatManager sendMessage:message progress:nil completion:nil];
```

| 参数                  | 描述                                                         |
| :-------------------- | :----------------------------------------------------------- |
| `body`                | 消息体。                                                     |
| `ConversationID`      | 消息所属的会话 ID。                                          |
| `from`                | 消息发送方，一般为当前登录 ID。                              |
| `to`                  | 消息接收方 ID，一般与 `ConversationID` 一致。                |
| `em_apns_ext`         | 消息扩展，使用扩展的方式向推送中添加自定义字段，该值为固定值，不可修改。 |
| `em_push_title`          | 推送通知的自定义标题。 |
| `em_alert_subTitle`        | 推送通知的自定义副标题。 |
| `em_push_content`          | 推送通知展示的自定义内容。 |

**解析的内容**

```json
{
    "aps":{
        "alert":{
            "body":"custom push content"
        },   
        "badge":1,               
        "sound":"default"        
    },
    "f":"6001",                  
    "t":"6006",                  
    "m":"373360335316321408",
}
```

| 参数    | 描述            |
| :------ | :-------------- |
| `body`  | 显示内容。      |
| `badge` | 角标数。        |
| `sound` | 提示铃声。      |
| `f`     | 消息发送方 ID。 |
| `t`     | 消息接收方 ID。 |
| `m`     | 消息 ID。       |


