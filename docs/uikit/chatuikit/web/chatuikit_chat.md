# 聊天页面

聊天页面通过 `Chat` 组件实现，该组件提供以下功能:

- 发送和接收消息, 包括文本、表情、图片、语音、视频、文件、名片和合并类型的消息。
- 对消息进行复制、表情回复、引用、撤回、删除、置顶、翻译和编辑、重新发送和审核操作。
- 清除本地消息。
- 删除会话。
- 从服务器拉取漫游消息。

消息相关功能，详见[功能介绍文档](chatfeature_message.html)。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/web/chat.png" title="聊天页面" />
</ImageGallery>

## 使用示例

```jsx
import React from "react";
import { Chat } from "shengwang-chat-uikit";
import "shengwang-chat-uikit/style.css";

const ChatContainer = () => {
  return (
    <div style={{ width: "70%", height: "100%" }}>
      <Chat />
    </div>
  );
};
```

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/web/chat_default.png" title="聊天页面" />
</ImageGallery>

## 自定义组件

### 修改消息气泡样式

以文本消息为例，你可以按如下方式修改消息气泡样式：

- 使用 `renderMessageList` 方法自定义渲染消息列表。
- 使用 `renderMessage` 方法自定义渲染消息。
- 使用 `TextMessage` 的属性自定义文本消息。

```jsx
import React from "react";
import { Chat, MessageList, TextMessage } from "shengwang-chat-uikit";
import "shengwang-chat-uikit/style.css";

const ChatContainer = () => {
  const renderTxtMsg = (msg) => {
    return (
      <TextMessage
        bubbleStyle={{ background: "hsl(135.79deg 88.79% 36.46%)" }}
        shape="square"
        status={msg.status}
        avatar={<Avatar style={{ background: "pink" }}>A</Avatar>}
        textMessage={msg}
      ></TextMessage>
    );
  };

  const renderMessage = (msg) => {
    if (msg.type === "txt") {
      return renderTxtMsg(msg);
    }
  };

  return (
    <div style={{ width: "70%", height: "100%" }}>
      <Chat
        renderMessageList={() => <MessageList renderMessage={renderMessage} />}
      />
    </div>
  );
};
```

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/web/custom_message_cell.png" title="头像粉红且字体为白色" />
</ImageGallery>

### 设置消息日期和时间格式

通过消息组件的 `formatDateTime` 方法设置显示的消息日期和时间的格式。

```jsx
<Chat
  messageListProps={{
    messageProps: {
      formatDateTime: (time: number) => {
        // 自定义显示日期和时间
        return new Date(time).toLocaleString();
      },
    },
  }}
/>
```

### 设置显示消息操作

利用 `messageProps` 的 `customAction` 属性设置点击消息列表项旁边的 `⋮` 后要显示的消息操作按钮。

```jsx
<Chat
  messageListProps={{
    messageProps: {
      visible: true,
      icon: null,
      actions: [
        {
          // 展示单条转发
          content: 'FORWARD',
        },
        {
          // 展示消息引用
          content: 'REPLY',
        },
        {
          // 展示消息撤回
          content: 'UNSEND',
        },
        {
          // 展示消息编辑
          content: 'Modify',
        },
        {
          // 展示消息多选
          content: 'SELECT',
        },
        {
          // 展示消息置顶
          content: 'PIN',
        },
        {
          // 展示消息翻译
          content: 'TRANSLATE',
        },
        {
          // 展示消息举报
          content: 'REPORT',
        },
        {
          // 展示消息删除
          content: 'DELETE',
        },
        {
          content: '自定义按钮',
          // 自定义 icon
          icon: <Icon type="STAR"/>
          onClick: () => {},
        },
      ],
    },
  }}
/>
```

### 配置输入框功能

你可以配置消息输入框的功能，包括是否显示发送语音按钮、是否显示消息输入框、是否显示消息表情按钮和更多操作按钮、是否启用正在输入功能、是否显示发送按钮等。

```jsx
import React from "react";
import { Chat, Icon, MessageInput } from "shengwang-chat-uikit";
import "shengwang-chat-uikit/style.css";

const ChatContainer = () => {
  return (
    <div style={{ width: "70%", height: "100%" }}>
      <Chat
        renderMessageInput={() => (
          <MessageInput
            actions={[
              {
                // 发送语音功能
                name: "RECORDER",
                visible: true,
              },
              {
                // 消息输入框
                name: "TEXTAREA",
                visible: true,
              },
              {
                // 表情
                name: "EMOJI",
                visible: true,
              },
              {
                // 更多操作
                name: "MORE",
                visible: true,
              },
            ]}
            enabledTyping={true} // 是否启用正在输入功能
            showSendButton={true} // 是否展示发送按钮
            sendButtonIcon={<Icon type="AIR_PLANE" />} // 发送按钮 Icon
            row={1} // Input 行数
            placeHolder="请输入内容" // 默认占位符
            enabledMention={true} // 是否开启群 @ 功能
            onSendMessage={(message) => {}} //发送消息的回调
            onBeforeSendMessage={(message) => {}} // 消息发送前回调，该回调返回 promise，如果返回的 promise 的状态为已解决（resolved），则发送消息；如果返回的 promise 的状态为已失败（rejected），则不发送消息。
          />
        )}
      />
    </div>
  );
};
```

### 消息输入框中添加图标

在消息输入框中添加一个自定义图标，实现指定的功能:

1. 使用 `renderMessageInput` 方法自定义渲染消息输入框。
2. 使用 `actions` 自定义 `MessageInput` 组件。

```jsx
import React from "react";
import { Chat, Icon, MessageInput } from "shengwang-chat-uikit";
import "shengwang-chat-uikit/style.css";

const ChatContainer = () => {
  // 自定义要添加的图标
  const CustomIcon = {
    visible: true,
    name: "CUSTOM",
    icon: (
      <Icon
        type="DOC"
        onClick={() => {
          console.log("click custom icon");
        }}
      ></Icon>
    ),
  };

  const actions = [...MessageInput.defaultActions];
  // 在消息输入框中添加图标
  actions.splice(2, 0, CustomIcon);
  return (
    <div style={{ width: "70%", height: "100%" }}>
      <Chat renderMessageInput={() => <MessageInput actions={actions} />} />
    </div>
  );
};
```

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/web/chat_input_bar.png" title="会话列表页面" />
</ImageGallery>

### 实现发送自定义消息

1. 使用 `messageStore` 中提供的 `sendMessage` 方法发送自定义消息。
2. 使用 `renderMessage` 渲染自定义消息。

:::tip
为了保证消息在当前会话中展示，消息中的 `to` 字段必须是对方的用户 ID 或者群组的 ID。
:::

```jsx
import React from "react";
import {
  Chat,
  MessageList,
  TextMessage,
  rootStore,
  MessageInput,
  Icon,
} from "shengwang-chat-uikit";
import "shengwang-chat-uikit/style.css";

const ChatContainer = () => {
  // 展示自定义消息
  const renderCustomMsg = (msg) => {
    return (
      <div>
        <h1>Business Card </h1>
        <div>{msg.customExts.id}</div>
      </div>
    );
  };
  const renderMessage = (msg) => {
    if (msg.type === "custom") {
      return renderCustomMsg(msg);
    }
  };

  // 在消息输入框中添加图标
  const CustomIcon = {
    visible: true,
    name: "CUSTOM",
    icon: (
      <Icon
        type="DOC"
        onClick={() => {
          sendCustomMessage();
        }}
      ></Icon>
    ),
  };
  const actions = [...MessageInput.defaultActions];
  actions.splice(2, 0, CustomIcon);

  // 实现发送自定义消息
  const sendCustomMessage = () => {
    const customMsg = ChatSDK.message.create({
      type: "custom",
      to: "targetId", //消息接收方：单聊为对端用户 ID，群聊为群组 ID。
      chatType: "singleChat",
      customEvent: "CARD",
      customExts: {
        id: "userId3",
      },
    });
    rootStore.messageStore.sendMessage(customMsg).then(() => {
      console.log("send success");
    });
  };
  return (
    <div style={{ width: "70%", height: "100%" }}>
      <Chat
        renderMessageList={() => <MessageList renderMessage={renderMessage} />}
        renderMessageInput={() => <MessageInput actions={actions} />}
      />
    </div>
  );
};
```

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/web/custom_message.png" title="自定义消息" />
</ImageGallery>

### 修改聊天相关的主题

`Chat` 组件提供了聊天页面主题相关的变量支持自定义，如下所示。关于如何修改主题，请点击[这里](chatuikit_theme.html)。

```scss
$chat-bg: $component-background;
$msg-base-font-size: $font-size-lg;
$msg-base-color: $font-color;
$msg-base-margin: $margin-xs 0;
$msg-base-padding: 0 $padding-lg;
$msg-bubble-border-radius-left: 12px 16px 16px 4px;
$msg-bubble-border-radius-right: 16px 12px 4px 16px;
$msg-bubble-arrow-border-size: 6px;
$msg-bubble-arrow-bottom: 8px;
$msg-bubble-arrow-left: -11px;
$msg-bubble-arrow-right: -11px;
$msg-bubble-color-secondly: $blue-95;
$msg-bubble-color-primary: $blue-5;
$msg-bubble-font-color-secondly: $font-color;
$msg-bubble-font-color-primary: $gray-98;
$msg-base-content-margin: 0 $margin-xs 0 $margin-sm;
$msg-base-content-padding: $padding-xs $padding-sm;
$msg-base-content-minheight: 24px;
$msg-bubble-none-bg: transparent;
$msg-bubble-none-color: $font-color;
$msg-bubble-square-border-radius: 4px;
$msg-info-margin-left: $margin-sm;
$msg-nickname-font-size: $font-size-sm;
$msg-nickname-font-weight: 500;
$msg-nickname-font-color: #5270ad;
$msg-nickname-height: 16px;
$msg-time-font-size: $font-size-sm;
$msg-time-font-weight: 400;
$msg-time-font-color: $gray-7;
$msg-time-height: 16px;
$msg-time-margin: 0 $margin-xss;
$msg-time-width: 106px;
```

## Chat 组件属性总览

`Chat` 组件包含以下属性：

<table>
<tr>
        <td>属性</td>
        <td>类型</td>
        <td>描述</td>
    </tr>
 <tr>
      <td style=font-size:15px>
	className
	  </td>
      <td style=font-size:15px>
	String
	  </td>
	  <td style=font-size:15px>
	  组件的类名。
	  </td>
	  <tr>
	    <td style=font-size:15px>prefix</td>
        <td style=font-size:15px>String</td>
		<td style=font-size:15px>CSS 类名前缀。</td>
	  </tr>
	  <tr>
	    <td style=font-size:15px>headerProps</td>
        <td style=font-size:15px>HeaderProps</td>
		<td style=font-size:15px>Header 组件中的属性。</td>
	  </tr>
	  <tr>
	    <td style=font-size:15px>messageListProps</td>
        <td style=font-size:15px>MsgListProps</td>
		<td style=font-size:15px>MessageList 组件中的属性。</td>
	  </tr>
	  <tr>
	    <td style=font-size:15px>messageInputProps</td>
        <td style=font-size:15px> MessageInputProps</td>
		<td style=font-size:15px>MessageInput 组件中的属性。</td>
	  </tr>
	  <tr>
	    <td style=font-size:15px>renderHeader</td>
        <td style=font-size:15px>(cvs: CurrentCvs) => React.ReactNode</td>
		<td style=font-size:15px>自定义渲染 Header 组件的方法。</td>  
	  </tr>
	   <tr>
	    <td style=font-size:15px>renderMessageList</td>
        <td style=font-size:15px>() => ReactNode; </td>
		<td style=font-size:15px>自定义渲染 MessageList 组件的方法。</td>
	  </tr>
	  <tr>
	    <td style=font-size:15px>renderMessageInput </td>
         <td style=font-size:15px>() => ReactNode; </td>
		<td style=font-size:15px>自定义渲染 MessageInput 组件的方法。</td>
	  </tr>
	  <tr>
	    <td style=font-size:15px>renderEmpty</td>
        <td style=font-size:15px>() => ReactNode; </td>
		<td style=font-size:15px>自定义渲染空内容组件的方法。</td>  
	  </tr>
   </tr>
</table>
