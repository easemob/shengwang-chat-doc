# 设置推送通知的显示内容

通知收到后，通知栏中显示的推送标题和内容可通过以下方式设置，配置的优先级为由低到高：

1. 设置推送通知的显示属性：使用默认的推送标题和内容，即推送通知的展示方式 `DisplayStyle` 采用默认的值（`Simple`）。推送标题为**您有一条新消息**，推送内容为**请点击查看**。
2. 使用默认推送模板：若有默认模板 `default`，发消息时无需指定。
3. 使用消息扩展字段：使用扩展字段自定义要显示的推送标题和推送内容，即 `em_push_title` 和 `em_push_content`。
4. 接收方设置了推送模板。
5. 使用自定义推送模板：发送消息时通过消息扩展字段指定推送模板名称。

## 设置和获取推送通知的显示属性

### 设置推送通知的显示属性

你可以分别调用 `updatePushNickname` 和 `updatePushDisplayStyle` 方法设置推送通知中显示的昵称（`nickname`）和通知显示样式（`DisplayStyle`），确定通知栏中的推送标题和推送内容。

```dart
try {
  ChatClient.getInstance.pushManager.updatePushNickname('nickname');
} on ChatError catch (e) {}
```

```dart
try {
  ChatClient.getInstance.pushManager.updatePushDisplayStyle(DisplayStyle.Simple);
} on ChatError catch (e) {}
```

若要在通知栏中显示消息内容，需要设置通知显示样式 `DisplayStyle`。该参数有如下两种设置：

| 参数值             | 描述                    |
| :--------------- | :---------------------- |
| （默认）`Simple`   | 不论 `nickname` 是否设置，对于推送任何类型的消息，通知栏采用默认显示设置，即推送标题为**您有一条新消息**，推送内容为**请点击查看**。 |
| `Summary` | `Summary`：显示消息内容。设置的昵称只在 `DisplayStyle` 为 `Summary` 时生效，在 `Simple` 时不生效。 |

下表以单聊文本消息为例介绍这显示属性的设置。

对于**群聊**，下表中的**消息发送方的推送昵称**和**消息发送方的 IM 用户 ID**显示为**群组 ID**。

| 参数设置      | 推送显示 | 图片    |
| :--------- | :----- |:------------- |
| <br/> - `DisplayStyle`：（默认）`Simple`<br/> - `nickname`：设置或不设置 | <br/> - 推送标题：**您有一条新消息**<br/> - 推送内容：**请点击查看**  | ![img](/images/android/push/push_displayattribute_1.png)|
| <br/> - `DisplayStyle`：`Summary`<br/> - `nickname`：设置具体值 | <br/> - 推送标题：**您有一条新消息**<br/> - 推送内容：**消息发送方的推送昵称：消息内容**  |![img](/images/android/push/push_displayattribute_2.png)  |
| <br/> - `DisplayStyle`：`Summary`<br/> - `nickname`：不设置    | <br/> - 推送标题：**您有一条新消息**<br/> - 推送内容：**消息发送方的 IM 用户 ID: 消息内容**  | ![img](/images/android/push/push_displayattribute_3.png)|

### 获取推送通知的显示属性

你可以调用 `fetchPushConfigsFromServer` 方法获取推送通知中的显示属性，如以下代码示例所示：

```dart
try {
  ChatPushConfigs configs = await ChatClient.getInstance.pushManager.fetchPushConfigsFromServer();
  // 获取推送显示昵称。
  String? pushNickname = configs.displayName;
  // 获取推送通知的显示样式。
  DisplayStyle pushDisplayStyle = configs.displayStyle;
} on ChatError catch (e) {}
```

## 使用推送模板 

推送模板主要用于服务器提供的默认配置不满足你的需求时，可使你设置全局范围的推送标题和推送内容。例如，服务器提供的默认设置为中文和英文的推送标题和内容，你若需要使用韩语或日语的推送标题和内容，则可以设置对应语言的推送模板。推送模板包括默认推送模板 `default` 和自定义推送模板。对于群组消息，你可以使用定向模板将离线通知只发送给特定用户，或向某些用户推送与其他用户不同的离线通知。

**推送模板为推送的高级功能**，若要设置，你需要在 [声网控制台](https://console.shengwang.cn/overview)[开通推送高级功能](push_overview.html#离线推送高级功能)。

使用推送模板有以下优势：

1. 自定义修改声网服务端默认推送内容。   

2. 接收方可以决定使用哪个模板。 

3. 按优先级选择模板使用方式：
   
   - 使用自定义推送模板的优先级高于默认推送模板。

   - 若发送方发消息时设置了推送模板，接收方即使设置了推送模板，收到推送通知后也按照发送方设置的推送模板显示。

:::tip
推送模板相关的数据结构，详见[推送扩展字段](/docs/sdk/server-side/push_extension.html)。
:::

### 配置推送模板

你可以通过以下两种方式设置：

1. [调用 RESTful API 配置](/docs/sdk/server-side/push.html#使用推送模板)。

2. 在[声网控制台](https://console.shengwang.cn/overview)设置推送模板。

  展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。点击左侧导航栏的**全部产品**。在下拉列表中找到**即时通讯 IM** 并点击。 在**即时通讯 IM** 页面，进入**功能配置**标签页。在**推送模板**页签下，点击**添加推送模板**，配置相关参数，添加推送模板。

| 推送模板参数       | 类型 | 参数描述  |
| :------------------- | :------------------- | :------------------- |
| 模板名称     | String    | 推送模板名称，默认模板为 `default`。<br/> 该参数必须填写。模板名称最多可包含 64 个字符，支持以下字符集：<br/>- 26 个小写英文字母 a-z<br/>- 26 个大写英文字母 A-Z<br/>- 10 个数字 0-9|
| 标题/内容     | Array    | 推送标题/内容。该参数必须填写。这两个参数的设置方式如下：<br/>- 输入固定的推送标题/内容，例如，标题为 “您好”，内容为“您有一条新消息”。<br/>- 内置参数填充：1. `{$dynamicFrom}`：按优先级从高到底的顺序填充好友备注、群昵称（仅限群消息）和推送昵称。2. `{$fromNickname}`：推送昵称。3. `{$msg}`：消息内容。<br/>-  自定义参数填充：模板输入数组索引占位符，格式为: {0} {1} {2} ... {n} <br/> 对于默认模板 `default`，参数的前两种设置方式在创建消息时无需传入该参数，第三种设置方式则需要通过扩展字段传入。使用自定义模板时，这两个参数无论通过哪种方式设置，创建消息时均需通过扩展字段传入。|

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

### 发消息时使用推送模板 

创建模板后，你可以在发送消息时选择此推送模板，分为以下三种情况：

:::tip
若使用默认模板 **default**，消息推送时自动使用默认模板，创建消息时无需传入模板名称。
:::

1. 使用固定内容的推送模板，通过 `ext` 扩展字段指定推送模板名称。

这种情况下，创建消息时无需传入 `title_args` 和 `content_args` 参数。 

```dart
    final msg = ChatMessage.createTxtSendMessage(
      targetId: 'userId',
      content: '消息内容',
    );

    msg.attributes = {
      // 设置推送模板名称'test7'。若不指定，设置默认推送模板的信息。
      'em_push_template': {'name': 'test7'},
    };

    await ChatClient.getInstance.chatManager.sendMessage(msg);
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

```dart
    final msg = ChatMessage.createTxtSendMessage(
      targetId: 'userId',
      content: '消息内容',
    );

    msg.attributes = {
      'em_push_template': {
        // 设置推送模板名称。若不指定，设置默认推送模板的信息。
        'name': 'push',
        'title_args': ['您', '消息'],
        'content_args': ['请', '查看'],
      },
    };

    await ChatClient.getInstance.chatManager.sendMessage(msg);
```

### 消息接收方使用推送模板

消息接收方可以调用 `setPushTemplate` 方法传入推送模板名称，选择要使用的模板。

:::tip
若发送方在发送消息时使用了推送模板，则推送通知栏中的显示内容以发送方的推送模板为准。
:::

```dart
try {
  await ChatClient.getInstance.pushManager.setPushTemplate('Template Name');
} on ChatError catch (e) {}
```

## 使用消息扩展字段

创建推送消息时，你可以设置消息扩展字段自定义要显示的推送标题 `em_push_title` 和推送内容 `em_push_content`。

```dart
ChatMessage msg = ChatMessage.createTxtSendMessage(
  targetId: 'receiveId',
  content: 'content',
);
msg.attributes = {
  // 将推送扩展设置到消息中。该字段为内置的推送扩展字段。
  'em_push_ext': {
    // 自定义推送消息标题。该字段为内置内置字段，字段名不可修改。
    'em_push_title': 'custom push title',
    // 自定义推送消息内容。该字段为内置内置字段，字段名不可修改。
    'em_push_content': 'custom push content'
  }
};

try {
  await ChatClient.getInstance.chatManager.sendMessage(msg);
} on ChatError catch (e) {}
```

自定义显示字段的数据结构如下：

```dart
{
    "em_apns_ext": {
        "em_push_title": "custom push title",
        "em_push_content": "custom push content"
    }
}
```

| 参数              | 描述          |
| :---------------- | :----------- |
| `em_apns_ext`     | 消息扩展，使用扩展的方式向推送中添加自定义字段，该值为固定值，不可修改。 |
| `em_push_title`   | 自定义字段 key，用于设置自定义的标题，该值为固定值，不可修改。           |
| `em_push_content` | 自定义字段 key，用于设置自定义的内容，该值为固定值，不可修改。           |


