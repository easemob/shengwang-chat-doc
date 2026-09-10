# 推送模板

## 概述

推送模板主要用于服务器提供的默认离线推送配置不满足你的需求时，设置全局范围的推送标题和推送内容。例如，服务器提供的默认设置为中文和英文的推送标题和内容，你若需要使用韩语或日语的推送标题和内容，则可以设置对应语言的推送模板。

推送模板包括默认推送模板 `default`、`detail` 和自定义推送模板。

推送模板的特点如下：
1. 推送模板的优先级高于 [调用 API 设置通知栏的推送内容](push_display_attribute.html)。
2. 实现自定义修改 IM 服务端默认推送内容。   
3. 对于群组消息，你可以使用定向模板向某些用户推送与其他用户不同的离线通知。
4. 接收方可以决定使用哪个模板。 
5. 按优先级选择模板使用方式： 
   - 使用自定义推送模板的优先级高于默认推送模板。
   - 若发送方发消息时设置了推送模板，接收方即使设置了推送模板，收到推送通知后也按照发送方设置的推送模板显示。

## 开通功能

[推送模板](push_template.html) 是推送的高级功能。使用前，你需要在 [声网控制台](https://console.shengwang.cn/overview) 免费开通。**激活后，如需关闭推送高级功能，必须联系商务，因为该操作会删除高级功能相关的所有配置。**

1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**功能配置**标签页。

5. 在**推送模板** 页签下，点击**启用**。

6. 在弹出的对话框中，配置用户相关参数，点击**确定**。

![image](/images/android/push/push_android_enable_push.png)

## 设置推送模板

你可以通过以下两种方式设置离线推送模板：

- [调用 REST API 配置](/document/server-side/push_template_overview.html)。
- 在 [声网控制台](https://console.shengwang.cn/overview) 设置推送模板。

推送模板相关的数据结构，详见[推送扩展字段](/document/server-side/push_extension.html)。

下面为在声网控制台设置离线推送模板。

离线推送模板开通后，**推送模板** 页面默认添加两个模板，`default` 和 `detail`。若未配置自定义推送模板，消息推送时自动使用默认模板，创建消息时无需传入模板名称。

- `default`：默认情况下，推送标题为 **您有一条新消息**，推送内容为 **请点击查看**。若调用了 `updatePushDisplayStyle` 方法将 `DisplayStyle` 设置为 `EMPushDisplayStyleSimpleBanner`，则默认推送模板为 `default`。
- `detail`：默认情况下，推送标题为 **您有一条新消息**，推送内容为消息内容。若调用了 `updatePushDisplayStyle` 方法将 `DisplayStyle` 设置为 `EMPushDisplayStyleMessageSummary`，则默认推送模板为 `detail`。

默认推送模板支持修改推送标题和推送内容，但模板名称不能编辑。

点击**添加模板**，配置相关参数，添加自定义推送模板。

| 推送模板参数       | 类型 |参数描述|
| :------------------- | :------------------- | :------------------- |
| 模板名称     | String    | 推送模板名称。<br/> 该参数必须填写。模板名称最多可包含 64 个字符，支持以下字符集：<br/> - 26 个小写英文字母 a-z<br/> - 26 个大写英文字母 A-Z<br/> - 10 个数字 0-9|
| 标题/内容     | Array    | 推送标题/内容。该参数必须填写。这两个参数的设置方式如下：<br/> - 输入固定的推送标题/内容，例如，标题为 “您好”，内容为“您有一条新消息”。<br/> - 内置参数填充：1. `{$dynamicFrom}`：按优先级从高到底的顺序填充好友备注、群昵称（仅限群消息）和推送昵称。2. `{$fromNickname}`：推送昵称。3. `{$msg}`：消息内容。<br/> -  自定义参数填充：模板输入数组索引占位符，格式为: {0} {1} {2} ... {n} <br/> 对于默认模板 `default`，参数的前两种设置方式在创建消息时无需传入该参数，第三种设置方式则需要通过扩展字段传入。使用自定义模板时，这两个参数无论通过哪种方式设置，创建消息时均需通过扩展字段传入。|

:::tip
自定义推送模板的级别比默认模板高。
:::

![img](/images/product/push/push_template_add.png)

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

  群昵称即群成员在群组中的昵称。若要在推送通知中展示群昵称，群成员在发送群消息时可通过扩展字段设置，JSON 结构如下：

```json
  {
    "ext":{
            "em_push_ext":{
                "group_user_nickname":"Jane"
            }
        }
  }      
```

## 发送消息时使用推送模板

创建模板后，你可以在发送消息时选择此推送模板。

你可以在发送消息时选择推送模板，可通过三种方式设置推送模板。

:::tip
1. 若使用默认模板 **default** 或 **detail**，消息推送时自动使用默认模板，创建消息时无需传入模板名称。
2. 使用自定义模板时，**标题** 和 **内容** 参数无论通过哪种方式设置，创建消息时均需通过扩展字段传入。
:::

### 使用固定内容的推送模板

使用固定内容的推送模板，通过 `ext` 扩展字段指定推送模板名称。

这种情况下，创建消息时无需传入 `title_args` 和 `content_args` 参数。 

```objectivec
//下面以文本消息为例，其他类型的消息设置方法相同。
EMTextMessageBody *body = [[EMTextMessageBody alloc]initWithText:@"test"];
EMChatMessage *message = [[EMChatMessage alloc]initWithConversationID:@"conversationId" from:@"currentUsername" to:@"conversationId" body:body ext:nil];
//设置推送模板。设置前需在声网控制台或调用 REST 接口创建推送模板。
NSDictionary *pushObject = @{
   //设置推送模板名称。
   //若为默认模板 `default` 或 `detail`，无需传入模板名称。若为自定义模板，需传入模板名称。
    @"name":@"templateName",
};
message.ext = @{
    @"em_push_template":pushObject,
};
message.chatType = EMChatTypeChat;
[[EMClient sharedClient].chatManager sendMessage:message progress:nil completion:nil];
```

### 使用包含内置参数的推送模板

使用自定义或者默认推送模板，模板中的推送标题和推送内容使用以下内置参数：
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

内置参数的介绍，详见 [设置推送模板](#设置推送模板)。

这种方式的示例代码与 [使用固定内容的推送模板](#使用固定内容的推送模板)的相同。

### 使用包含自定义参数的推送模板

使用自定义推送模板，而且推送标题和推送内容为自定义参数：

例如，推送模板的设置如下图所示：

![img](/images/android/push/push_template_custom.png)

使用下面的示例代码后，通知栏中弹出的推送通知为：

![img](/images/android/push/push_template_custom_example.png)

```objectivec
//下面以文本消息为例，其他类型的消息设置方法相同。
EMTextMessageBody *body = [[EMTextMessageBody alloc]initWithText:@"test"];
EMChatMessage *message = [[EMChatMessage alloc]initWithConversationID:@"conversationId" from:@"currentUsername" to:@"conversationId" body:body ext:nil];
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
message.chatType = EMChatTypeChat;
[[EMClient sharedClient].chatManager sendMessage:message progress:nil completion:nil];
```

## 消息接收方使用推送模板

消息接收方可以调用 `setPushTemplate` 方法传入推送模板名称，选择要使用的模板。

:::tip
若发送方在发送消息时使用了推送模板，则推送通知栏中的显示内容以发送方的推送模板为准。
:::

```objectivec
[EMClient.sharedClient.pushManager setPushTemplate:@"templateName" completion:^(EMError * _Nullable aError) {

}];
```

