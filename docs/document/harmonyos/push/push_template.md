# 推送模板

## 功能说明

推送模板用于在默认离线推送内容不满足业务需求时，自定义推送通知的标题和内容。例如，服务器提供的默认设置为中文和英文的推送标题和内容，你若需要使用韩语或日语的推送标题和内容，则可以设置对应语言的推送模板。

你可以通过声网控制台或 [服务端 REST API 配置推送模板](/docs/document/server-side/push_template_create.html)，并在发送消息时通过消息扩展字段指定模板名称和模板参数。

推送模板包括默认模板 `default`、`detail` 和自定义模板。默认模板适用于通用推送场景；自定义模板适用于需要按业务场景、语言或接收对象展示不同推送内容的场景。

推送模板具有以下特点：

1. 推送模板的优先级高于 [调用 API 设置通知栏的推送内容](push_display_attribute.html)。
2. 支持通过声网控制台或 [服务端 REST API](/docs/document/server-side/push_template_create.html) 自定义服务端默认推送内容。
3. 对于群组消息，你可以使用定向模板向部分用户推送与其他用户不同的离线通知。定向模板的数据结构详见 [推送扩展字段](/docs/document/server-side/push_extension.html)。
4. 接收方可配置推送模板：若发送方在发送消息时使用了推送模板，则推送通知栏中的显示内容以发送方设置的模板为准。
5. 推送模板的使用优先级如下：
   - 自定义模板的优先级高于默认模板。
   - 发送方在消息扩展字段中指定推送模板时，接收方即使设置了推送模板，收到推送通知后也按照发送方设置的模板显示。

## 开通功能

[推送模板](push_template.html) 是推送的高级功能。使用前，你需要在 [声网控制台](https://console.shengwang.cn/overview)[免费开通推送高级功能](push_overview.html#推送高级功能)。**激活后，如需关闭推送高级功能，必须联系商务，因为该操作会删除高级功能相关的所有配置。**

## 设置推送模板

你可以通过以下两种方式设置离线推送模板：

- [调用 REST API 配置](/document/server-side/push_template_overview.html)。
- 在 [声网控制台](https://console.shengwang.cn/overview) 设置推送模板。

推送模板相关的数据结构，详见 [推送扩展字段](/document/server-side/push_extension.html)。

本节介绍在声网控制台设置离线推送模板。

### 编辑默认推送模板

离线推送模板开通后，**推送模板** 页面默认添加两个模板，`default` 和 `detail`。若未配置自定义推送模板，消息推送时自动使用默认模板，创建消息时无需传入模板名称。

- `default`：默认情况下，推送标题为 **您有一条新消息**，推送内容为 **请点击查看**。若调用了 `updatePushDisplayStyle` 方法将 `PushDisplayStyle` 设置为 `SimpleBanner`，则默认推送模板为 `default`。
 - `detail`：默认情况下，推送标题为 **您有一条新消息**，推送内容为消息内容。若调用了 `updatePushDisplayStyle` 方法将 `PushDisplayStyle` 设置为 `MessageSummary`，则默认推送模板为 `detail`。
  
![img](/images/product/push/push_template_default.png)

你可以在 **操作** 栏中选择 **编辑**，修改默认推送模板的推送标题和推送内容，模板名称不能编辑。

![img](/images/product/push/push_template_default_edit.png)

| 参数            | 类型   | 描述   |
| :-------------- | :----- | :----- | 
| 标题/内容  | Array   | 参数的设置方式如下：<br/> - 输入固定内容，例如，标题为 **您好**，内容为 **您有一条新消息**。 <br/> - 内置参数填充：1. `{$dynamicFrom}`：按优先级从高到底的顺序填充好友备注、群昵称（仅限群消息）和推送昵称。2. `{$fromNickname}`：推送昵称。 3. `{$msg}`：消息内容。<br/> - 自定义参数填充：模板输入数组索引占位符，格式为: {0} {1} {2} ... {n}  | 

对于推送标题和内容来说，前两种设置方式在创建消息时无需传入该参数，第三种设置方式则需要通过扩展字段传入。

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

### 添加自定义推送模板

即时通讯 IM 支持添加自定义推送模板。除了 [调用 RESTful 接口](/document/server-side/push_template_create.html) 创建自定义推送模板，你还可以在 [声网控制台](https://console.shengwang.cn/overview) 添加自定义推送模板。**自定义推送模板的级别比默认模板高。**
  
在 **推送模板** 页面，点击 **添加模板** 创建自定义推送模板。

| 参数            | 类型   | 描述   |
| :-------------- | :----- | :----- |
| 模板名称 | String | 推送模板名称，最多可包含 64 个字符，支持以下字符集：<br/> - 26 个小写英文字母 a-z <br/> - 26 个大写英文字母 A-Z <br/> - 10 个数字 0-9| 
| 标题/内容  | Array   | 详见 [默认推送模板中的配置](#编辑默认推送模板)。 | 

**创建消息时需通过使用扩展字段传入模板名称、推送标题和推送内容**，通知栏中的推送标题和内容分别使用模板中的格式。详见 [消息扩展中的默认推送模板的参数](#编辑默认推送模板)。

![img](/images/product/push/push_template_add.png)

## 发消息时使用推送模板

你可以在发送消息时选择推送模板，按模板内容分为以下三种使用方式。

:::tip
1. 使用默认模板 `default` 或 `detail` 时，创建消息时无需传入默认模板名称。
2. 使用自定义模板时，需通过 `em_push_template.name` 指定模板名称；标题和内容的参数数组按下表规则传入。
:::

发送方指定自定义模板时，应遵循以下参数传入规则：

| 模板内容   | 消息扩展中需要传入的内容                                     |
| :--- | :--- |
| 固定内容   | 模板名称 `name`，无需传入 `title_args` 和 `content_args`。   |
| 内置参数   | 模板名称 `name`，无需通过 `title_args` 和 `content_args` 传入内置参数的值。 |
| 索引占位符 | 模板名称 `name`；标题包含索引占位符时传入 `title_args`，内容包含索引占位符时传入 `content_args`。 |

上述字段均位于消息扩展 `em_push_template` 中，可通过 `ChatMessage#setJsonAttribute('em_push_template', pushTemplate)` 设置。标题和内容分别判断是否需要参数数组，不要求两个数组同时传入；数组中的值和顺序应与对应模板中的索引占位符匹配。通知栏中的标题和内容由模板格式及对应参数生成，无需另行传入完整的标题、内容文本。

发送方指定自定义模板时，消息扩展 `em_push_template` 中的参数规则如下：

| 模板内容 | 需要传入的字段 |
| :--- | :--- |
| 固定内容 | 模板名称 `name`，无需传入 `title_args` 和 `content_args`。 |
| 内置参数 | 模板名称 `name`，无需通过参数数组传入内置参数的值。 |
| 索引占位符 | 模板名称 `name`；标题包含索引占位符时传入 `title_args`，内容包含索引占位符时传入 `content_args`。 |

标题和内容分别判断是否需要参数数组，不要求两个数组同时传入。数组中的值及顺序应与对应模板中的索引占位符匹配，无需另行传入完整的标题、内容文本。

### 使用固定内容的推送模板

使用固定内容的自定义推送模板时，通过 `em_push_template` 扩展字段指定模板名称，无需传入 `title_args` 和 `content_args`。

```typescript
interface PushTemplate {
  name?: string;
  title_args?: Array<string>;
  content_args?: Array<string>;
}

// 以下以单聊文本消息为例，其他消息类型的设置方式相同。
const conversationId: string = 'user-id';
const message = ChatMessage.createTextSendMessage(
  conversationId,
  '消息内容'
);

if (message) {
  const pushTemplate: PushTemplate = {
    // 设置前需在声网控制台或通过 REST API 创建该模板。
    name: 'custom-template-name'
  };

  // 将推送模板设置到消息扩展字段中。
  message.setJsonAttribute('em_push_template', pushTemplate);

  // 监听消息发送结果。
  const callback: ChatCallback = {
    onSuccess: (): void => {
      // 消息发送成功。
    },
    onError: (code: number, error: string): void => {
      // 消息发送失败，根据错误码和错误信息处理。
    },
    onProgress: (progress: number): void => {
      // 消息发送进度发生变化。
    }
  };
  message.setMessageStatusCallback(callback);

  // 发送消息。
  ChatClient.getInstance().chatManager()?.sendMessage(message);
}
```

### 使用包含内置参数的推送模板

自定义模板或默认模板的推送标题和内容可以使用以下内置参数：

- `{$dynamicFrom}`：服务器按优先级从高到低依次填充好友备注、群昵称（仅限群消息）和推送昵称。
- `{$fromNickname}`：推送昵称。  
- `{$msg}`：消息内容。

群昵称即群成员在群组中的昵称。群成员发送群消息时，可通过以下消息扩展字段设置群昵称：

```json
{
  "ext": {
    "em_push_ext": {
      "group_user_nickname": "Jane"
    }
  }
}       
```

内置参数的介绍，详见 [编辑默认推送模板](#编辑默认推送模板)。

使用内置参数时，只需指定模板名称，无需为内置参数传值，示例代码与 [使用固定内容的推送模板](#使用固定内容的推送模板) 相同。

### 使用包含自定义参数的推送模板

使用包含自定义参数的推送模板时，需要在 `em_push_template` 扩展字段中传入模板名称、标题参数数组和内容参数数组。

例如，推送模板的设置如下图所示：

![包含自定义参数的推送模板](/images/android/push/push_template_custom.png)

使用下面的示例代码后，通知栏中弹出的推送通知如下：

![使用自定义参数后的推送通知](/images/android/push/push_template_custom_example.png)

```typescript
interface PushTemplate {
  name?: string;
  title_args?: Array<string>;
  content_args?: Array<string>;
}

// 以下以单聊文本消息为例，其他消息类型的设置方式相同。
const conversationId: string = 'user-id';
const message = ChatMessage.createTextSendMessage(
  conversationId,
  '消息内容'
);

if (message) {
  const pushTemplate: PushTemplate = {
    // 设置前需在声网控制台或通过 REST API 创建该模板。
    name: 'push',
    // 按占位符索引依次设置标题参数。
    title_args: ['您', '消息,'],
    // 按占位符索引依次设置内容参数。
    content_args: ['请', '查看']
  };

  // 将推送模板及参数设置到消息扩展字段中。
  message.setJsonAttribute('em_push_template', pushTemplate);

  // 监听消息发送结果。
  const callback: ChatCallback = {
    onSuccess: (): void => {
      // 消息发送成功。
    },
    onError: (code: number, error: string): void => {
      // 消息发送失败，根据错误码和错误信息处理。
    },
    onProgress: (progress: number): void => {
      // 消息发送进度发生变化。
    }
  };
  message.setMessageStatusCallback(callback);

  // 发送消息。
  ChatClient.getInstance().chatManager()?.sendMessage(message);
}
```

## 消息接收方使用推送模板

消息接收方可以调用 `PushManager#setPushTemplate`，传入模板名称以选择接收离线消息时使用的推送模板。设置成功后，可以调用 `PushManager#getPushTemplate` 获取当前设置的模板名称。

:::tip
若发送方在发送消息时指定了推送模板，则推送通知栏中的显示内容以发送方设置的模板为准。
:::

```typescript
const templateName: string = 'custom-template-name';
const pushManager = ChatClient.getInstance().pushManager();

if (pushManager) {
  pushManager.setPushTemplate(templateName)
    .then((): void => {
      // 设置成功。
    })
    .catch((error: ChatError): void => {
      // 设置失败，根据错误码和错误信息处理。
    });
}
```

```typescript
const pushManager = ChatClient.getInstance().pushManager();

if (pushManager) {
  pushManager.getPushTemplate()
    .then((templateName: string): void => {
      // templateName 为当前设置的推送模板名称。
    })
    .catch((error: ChatError): void => {
      // 获取失败，根据错误码和错误信息处理。
    });
}
```
