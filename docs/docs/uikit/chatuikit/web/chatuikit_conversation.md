# 会话列表页面

会话列表页面通过 `ConversationList` 组件实现，该组件用于展示当前用户的所有会话 (包含单聊和群聊, 但是不包括聊天室)，并且提供会话搜索、删除、置顶和免打扰功能。

- 在会话列表上方的搜索框中输入关键字，搜索会话名称。
- 点击会话列表项，跳转到单聊或群聊页面。
- 点击会话列表页面的 header 中的扩展按钮，选择新会话，创建新会话。
- 点击会话列表项旁边的 `⋮` 可以进行删除会话、置顶会话和消息免打扰操作。

单条会话展示会话名称、最后一条消息、最后一条消息的时间以及置顶和禁言状态等。

- 对于单聊, 会话展示的名称为对方昵称，若对方未设置昵称则展示对方的用户 ID，会话头像是对方的头像，如果没有设置则使用默认头像。
- 对于群聊，会话名称为当前群组的名称，头像为默认头像。

会话列表相关功能，详见[功能介绍文档](chatfeature_conversation.html)。

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/web/conversation_list.png" title="会话列表页面" />
</ImageGallery>

## 使用示例

```jsx
import React, { useEffect, useState } from "react";
import { ConversationList } from "shengwang-chat-uikit";
import "shengwang-chat-uikit/style.css";

const Conversation = () => {
  return (
    <div style={{ width: "30%", height: "100%" }}>
      <ConversationList />
    </div>
  );
};
```

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/web/cvs-header1.png" title="会话列表页面示例" />
</ImageGallery>

## 自定义会话列表页面

如果默认的会话列表页面不能满足需求，你可以使用 `ConversationList` 组件提供的属性进行自定义。

你可以自定义会话列表页面的背景颜色、大小等样式。

1. 对组件添加 `className` 定义样式。

```jsx
import React from "react";
import { ConversationList } from "shengwang-chat-uikit";
import "shengwang-chat-uikit/style.css";
import "./index.css";

const Conversation = () => {
  return (
    <div style={{ width: "30%", height: "100%" }}>
      <ConversationList className="conversation" />
    </div>
  );
};
```

2. 在 `index.css` 中定义会话 UI 样式：

```css
.conversation {
  background-color: "#03A9F4";
  height: 100%;
  width: 100%;
}
```

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/web/cvs-bg.png" title="自定义会话列表页面示例" />
</ImageGallery>

## 自定义会话列表页面的 header

你可以自定义 `ConversationList` 组件的 header 元素，例如，标题名称为 `custom header`。

```jsx
import React from "react";
import { ConversationList, Header, Avatar } from "shengwang-chat-uikit";
import "shengwang-chat-uikit/style.css";

const Conversation = () => {
  return (
    <div style={{ width: "30%", height: "100%" }}>
      <ConversationList
        renderHeader={() => (
          <Header
            avatar={<Avatar>D</Avatar>}
            content="custom header"
            moreAction={{
              visible: true,
              actions: [
                {
                  content: "my info",
                  onClick: () => {
                    console.log("my info");
                  },
                },
              ],
            }}
          />
        )}
      ></ConversationList>
    </div>
  );
};
```

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/web/custom_conversation_list_header.png" title="自定义会话列表页面的 header" />
</ImageGallery>

## 自定义会话列表项

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/web/custom_list_item.png" title="会话列表项" />
</ImageGallery>

### 设置用户头像

- 使用 `renderItem` 方法渲染每个会话条目。
- 使用 `ConversationItem` 组件的属性自定义组件。

```jsx
import React from "react";
import {
  ConversationList,
  ConversationItem,
  Avatar,
} from "shengwang-chat-uikit";
import "shengwang-chat-uikit/style.css";
import "./index.css";

const Conversation = () => {
  // 在单聊中，将对端用户的用户 ID 与其用户昵称进行映射。
  const idToName = {
    userId1: "name1",
    zd2: "Henry 2",
  };
  return (
    <div style={{ width: "30%", height: "100%" }}>
      <ConversationList
        className="conversation"
        renderItem={(cvs) => {
          return (
            <ConversationItem
              avatar={
                <Avatar style={{ background: "yellow", color: "black" }}>
                  {idToName[cvs.conversationId] || cvs.conversationId}
                </Avatar>
              }
              data={{
                ...cvs,
                name: idToName[cvs.conversationId] || cvs.conversationId,
              }}
            />
          );
        }}
      ></ConversationList>
      />
    </div>
  );
};
```

<ImageGallery :columns="3">
  <ImageItem src="/images/uikit/chatuikit/web/conversation_list_avatar.png" title="会话列表带头像" />
  <ImageItem src="/images/uikit/chatuikit/web/conversation_list_avatar_no.png" title="会话列表无头像" />
  <ImageItem src="/images/uikit/chatuikit/web/conversation_list_avatar_color.png" title="会话列表自定义头像颜色" />
</ImageGallery>

### 设置日期和时间格式

```jsx
<ConversationList
  itemProps={{
    formatDateTime: (time: number) => {
      // 将 time 时间戳格式化成你需要的格式
      return new Date(time).toLocaleString();
    },
  }}
/>
```

### 设置更多会话操作

通过配置 `itemProps` 的 `moreAction` 属性控制显示哪些功能，或者添加自定义功能。

```jsx
<ConversationList
  itemProps={{
    moreAction: {
      visible: true, // 是否显示更多操作
      actions: [
        {
          content: "DELETE", // 删除会话
        },
        {
          content: "PIN", // 置顶会话
        },
        {
          content: "SILENT", // 会话免打扰
        },
        {
          content: "自定义功能",
          onClick: () => {},
          icon: <Icon type="STAR" />,
        },
      ],
    },
  }}
/>
```

### 设置会话最新一条消息的内容

通过设置 `itemProps` 中 `renderMessageContent` 方法返回自定义的最新一条消息的内容。

```jsx
<ConversationList
  itemProps={{
    renderMessageContent: (message) => {
      return <div>自定义消息内容</div>;
    },
  }}
/>
```

### 设置消息气泡颜色和头像

通过设置 `itemProps` 属性控制 `ConversationItem` 样式，包括气泡颜色以及头像大小和形状。

```jsx
<ConversationList
  itemProps={{
    badgeColor: "red", // 气泡颜色
    avatarSize: 50, // 头像大小
    avatarShape: "circle", // 头像形状
  }}
/>
```

### 自定义会话操作

`conversationStore` 提供的方法，例如:

- 使用 `topConversation` 方法置顶一个会话。
- 使用 `addConversation` 方法添加一个会话。

```jsx
import React from "react";
import {
  ConversationList,
  ConversationItem,
  rootStore,
  Button,
} from "shengwang-chat-uikit";
import "shengwang-chat-uikit/style.css";

const Conversation = () => {
  // 置顶会话。
  const topConversation = () => {
    rootStore.conversationStore.topConversation({
      chatType: "singleChat", // 群聊为 `groupChat`。
      conversationId: "userID", // 输入从会话列表获取的会话 ID。
      lastMessage: {},
    });
  };

  // 创建新会话。
  const createConversation = () => {
    rootStore.conversationStore.addConversation({
      chatType: "singleChat",
      conversationId: "conversationId",
      lastMessage: {},
      unreadCount: 3,
    });
  };
  return (
    <div style={{ width: "30%", height: "100%" }}>
      <ConversationList
        renderItem={(cvs) => {
          return (
            <ConversationItem
              moreAction={{
                visible: true,
                actions: [
                  {
                    // UIKit 默认提供会话删除事件。
                    content: "DELETE",
                  },
                  {
                    content: "Top Conversation",
                    onClick: topConversation,
                  },
                ],
              }}
            />
          );
        }}
      ></ConversationList>
      <div>
        <Button onClick={createConversation}>create conversation</Button>
      </div>
    </div>
  );
};
```

<ImageGallery>
  <ImageItem src="/images/uikit/chatuikit/web/custom_conversation_list_action.png" title="自定义会话操作" />
</ImageGallery>

### 修改会话列表相关的主题

`ConversationList` 组件提供了会话列表页面主题相关的变量，如下所示。关于如修改主题，请单击[这里](chatuikit_theme.html#设置-scss-变量)。

```scss
// 用于设置会话主题的变量。
$cvs-background: $component-background;
$cvs-search-margin: $margin-xs $margin-sm;
$cvs-item-height: 74px;
$cvs-item-padding: $padding-s;
$cvs-item-border-radius: 16px;
$cvs-item-margin: $margin-xss $margin-xs;
$cvs-item-selected-bg-color: #e6f5ff;
$cvs-item-selected-name-color: $blue-6;
$cvs-item-hover-bg-color: $gray-98;
$cvs-item-active-bg-color: $gray-9;
$cvs-item-info-right: 16px;
$cvs-item-name-margin: 0 $margin-sm;
$cvs-item-name-font-size: $font-size-lg;
$cvs-item-name-font-weight: 500;
$cvs-item-name-color: $title-color;
$cvs-item-message-margin-left: $margin-sm;
$cvs-item-message-font-size: $font-size-base;
$cvs-item-message-font-weight: 400;
$cvs-item-message-color: $font-color;
$cvs-item-time-font-weight: 400;
$cvs-item-time-font-size: $font-size-sm;
$cvs-item-time-color: $gray-5;
$cvs-item-time-margin-bottom: 9px;
```

## ConversationList 属性总览

`ConversationList` 组件包含以下属性：

<table>
    <tr>
        <td>参数</td>
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
	  组件的类名
	  </td>
	  <tr>
		<td style=font-size:15px>prefix</td>
        <td style=font-size:15px>String</td>
		<td style=font-size:15px>CSS 类名的前缀</td>
	  </tr>
	  <tr>
		<td style=font-size:15px>headerProps</td>
        <td style=font-size:15px>HeaderProps</td>
		<td style=font-size:15px>Header 组件的参数</td>
	  </tr>
	  <tr>
		<td style=font-size:15px>itemProps</td>
        <td style=font-size:15px>ConversationItemProps</td>
		<td style=font-size:15px>ConversationItem 组件的参数</td>
	  </tr>
	   <tr>
		<td style=font-size:15px>renderHeader</td>
        <td style=font-size:15px>() => React.ReactNode</td>
		<td style=font-size:15px>自定义渲染 Header 组件的方法</td> 
	  </tr>
	  <tr>
		<td style=font-size:15px>renderSearch</td>
        <td style=font-size:15px>() => React.ReactNode</td>
		<td style=font-size:15px>自定义渲染 Search 组件的方法</td> 
	  </tr>
	  <tr>
		<td style=font-size:15px>onItemClick</td>
        <td style=font-size:15px>(data: ConversationData[0]) => void</td>
		<td style=font-size:15px>点击会话列表中每个会话的回调事件</td> 
	  </tr>
	  <tr>
		<td style=font-size:15px>onSearch</td>
        <td style=font-size:15px>(e: React.ChangeEvent&lt;HTMLInputElement&gt;) => boolean</td>
		<td style=font-size:15px> 搜索输入框的 change 事件，当函数返回 false 时，会阻止默认的搜索行为，你可以使用自己的搜索条件来搜索</td>
	  </tr> 
    </tr>
</table>
