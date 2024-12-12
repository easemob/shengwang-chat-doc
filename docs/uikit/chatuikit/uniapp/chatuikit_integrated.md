# 集成单群聊UIKit 源码（Vue3）

<Toc />

利用环信单群聊 UIKit，你可以轻松实现单群和群聊。本文介绍如何快速集成UIKit, 搭建应用。

## 支持平台

- Android
- iOS
- 微信小程序
- H5

## 前提条件

开始前，请确保你的开发环境满足以下条件：

- HBuilderX最新版
- Vue3
- sass（sass-loader 版本 ≤ 10.1.1）
- node（12.13.0 ~ 17.0.0 推荐 LTS 版本 16.17.0）
- npm （版本请与 Node.js 版本匹配）

## 项目准备

1. 创建 uni-app Vue3 项目，详情参考 [uni-app 项目创建](https://uniapp.dcloud.net.cn/quickstart-hx.html)。

2. 下载UIKit源码

:::
tip UIKit中依赖的静态资源（`ChatUIKit/assets`）放置在环信服务器中,有访问频率限制，建议您将静态资源放置在您的业务服务器上，然后修改 `ChatUIKit/const/index.ts` 文件中的 `ASSETS_URL` 为您的资源服务器地址。
:::

 ```bash
   # 找一个目录，clone UIKit
   git clone git@github.com:Wster11/uniapp-uikit.git
   # 在您的 uni-app 项目根目录下执行以下命令，拷贝组件文件
   mkdir -p ./ChatUIKit
   # macOS
   mv ${组件项目路径}/ChatUIKit/* ./ChatUIKit
   # windows
   move ${组件项目路径}/ChatUIKit/* .\ChatUIKit

 ```
 
3. 添加依赖

:::
tip easemob-websdk 版本 4.11.0 及以上
:::

在项目根目录下执行以下命令，添加依赖

```bash
npm init -y
npm i easemob-websdk@4.11.0 pinyin-pro@3.26.0 mobx@6.13.4 --save
```

4.引入ChatUIKit初始化并设置通用样式

在您的项目 App.vue 文件中引入 ChatUIKit 组件并进行初始化。

```jsx
<script lang="ts">
import { ChatUIKit } from "./ChatUIKit";
import websdk from "easemob-websdk/uniApp/Easemob-chat";
import { EasemobChatStatic } from "easemob-websdk/Easemob-chat";

// 服务器域名配置 https://doc.easemob.com/document/applet/wechat.html#%E9%85%8D%E7%BD%AE%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%9F%9F%E5%90%8D


// 创建IM实例
const chat = new (websdk as unknown as EasemobChatStatic).connection({
  appKey: '', // 环信APPKEY
  isHttpDNS: false,
  url: '', // 环信 websocket URL
  apiUrl: '', // 环信 Restful API URL
  delivery: true // 是否开启消息已送达回执
});


// 初始化 ChatUIKit
ChatUIKit.init({
  chat, // 传入IM实例
  config: {
    theme: {
			// 头像形状 支持 circle 圆形 和 square 方形
      avatarShape: "square"
    },
    isDebug: true // 是否开启调试模式
  }
});

uni.$UIKit = ChatUIKit;


// 登录环信IM
const login = ()=>{
    uni.$UIKit.chatStore.login({
        user: "", // 用户ID
        accessToken: "" // 用户TOKEN
    }).then(()=>{
			// 登录成功后，跳转会话列表页面
			uni.navigateTo({
				url: '/ChatUIKit/modules/Conversation/index'
			})
		});
}


export default {
  onLaunch: function () {
		// 应用启动时，调用登录方法
		login();
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
    // 在 onShow 中调用 ChatUIKit.onShow() 方法，主动监测IM连接状态
    ChatUIKit.onShow();
  },
  onHide: function () {
    console.log("App Hide");
  }
};
</script>
<style>
/* 通用样式 */
html,body,page {
  height: 100%;
  width: 100%;
}
</style>
```
5. 配置路由

在您项目的 pages.json 文件中的更新 pages 路由：

```json
{
  "pages": [
    {
			"path": "ChatUIKit/modules/Conversation/index",
			"style": {
				"navigationStyle": "custom",
				"app-plus": {
					"bounce": "none"
				}
			}
		},
		{
			"path": "ChatUIKit/modules/Chat/index",
			"style": {
				"navigationStyle": "custom",
				// #ifdef MP-WEIXIN
				"disableScroll": true,
				// #endif 
				"app-plus": {
					"bounce": "none",
					"softinputNavBar": "none"
				}
			}
		},
		{
			"path": "ChatUIKit/modules/ChatNew/index",
			"style": {
				"navigationStyle": "custom",
				"app-plus": {
					"bounce": "none"
				}
			}
		},
		{
			"path": "ChatUIKit/modules/GroupList/index",
			"style": {
				"navigationStyle": "custom",
				"app-plus": {
					"bounce": "none"
				}
			}
		},
		{
			"path": "ChatUIKit/modules/ConversationSearchList/index",
			"style": {
				"navigationStyle": "custom",
				"app-plus": {
					"bounce": "none"
				}
			}
		},
		{
			"path": "ChatUIKit/modules/VideoPreview/index",
			"style": {
				"navigationBarTitleText": "Video Preview",
				"app-plus": {
					"bounce": "none"
				}
			}
		},
		{
			"path": "ChatUIKit/modules/ContactList/index",
			"style": {
				"navigationStyle": "custom",
				"app-plus": {
					"bounce": "none"
				}
			}
		},
		{
			"path": "ChatUIKit/modules/ContactAdd/index",
			"style": {
				"navigationStyle": "custom",
				"app-plus": {
					"bounce": "none"
				}
			}
		},
		{
			"path": "ChatUIKit/modules/ContactRequestList/index",
			"style": {
				"navigationStyle": "custom",
				"app-plus": {
					"bounce": "none"
				}
			}
		},
		{
			"path": "ChatUIKit/modules/ContactSearchList/index",
			"style": {
				"navigationStyle": "custom",
				"app-plus": {
					"bounce": "none"
				}
			}
		},
		{
			"path": "ChatUIKit/modules/GroupCreate/index",
			"style": {
				"navigationStyle": "custom",
				"app-plus": {
					"bounce": "none"
				}
			}
		}
  ]
}
```

6. 运行 Demo

在 uni-app IDE 中，运行 Demo：

![img](./run.jpg  =375x176)

## 高级特性

### 自定义开发

UIKit 内置了Store模块，你可以通过阅读 `ChatUIKit/Store` 模块源码，进行自定义开发。

例如， 

您想获取 ChatUIKit的所有会话消息未读数，示例代码如下：

```javascript
// 消息未读数
const unRead = ChatUIKit.conversationStore.totalUnreadCount
```

手动设置群组头像，示例代码如下：

```javascript
// 设置群组头像
ChatUIKit.groupStore.setGroupAvatar('groupId', 'group avatar url');
```

### 隐藏UIKit功能

如果您不需要UIKit的某些功能，可以在 UIKit 初始化后 调用 `ChatUIKit.hideFeature` 方法隐藏,可以在 `ChatUIKit/configType.ts` 文件查看所有可隐藏的功能。

例如，

使用自己的用户属性，示例代码如下：

```javascript
// 隐藏环信内置的用户属性
ChatUIKit.hideFeature(['useUserInfo'])

// 设置自定义用户属性
ChatUIKit.appUserStore.setUserInfo('userId', {
	nickname: '张三',
	avatarurl: 'user avatar url'
})
```

## 参考文档
- [UIKit 源码](https://github.com/easemob/easemob-uikit-uniapp)
- [小程序域名配置](https://doc.easemob.com/document/applet/wechat.html#%E9%85%8D%E7%BD%AE%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%9F%9F%E5%90%8D)

