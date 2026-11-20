# 入门指引

单群聊 UIKit 是基于即时通讯 IM SDK 开发的一款即时通讯 UI 组件库。Web 单群聊 UIKit 提供 React 和 Vue 两种组件库。请选择与你的项目技术栈对应的版本，快速集成会话列表、聊天、通讯录和群组管理等功能。

| 产品 | 适用项目 | 主要入口 |
| --- | --- | --- |
| [React UIKit](chatuikit_integrated_react.html) | React 项目 | - [快速开始](chatuikit_quickstart.html)<br> - [集成文档](chatuikit_integrated_react.html)<br> - [Demo](demo_react.html)<br> - [源码](https://github.com/easemob/easemob-uikit-react) |
| [Vue UIKit](vue_guide.html) | Vue 3 项目 | - [快速开始](https://webim-vue-uikit-docs.easemob.com/guide/quickstart.html)<br> - [集成文档](vue_guide.html)<br> - [Demo](demo_vue.html)<br> - [源码](https://github.com/Easemob-Community/easemob-uikit-vue) |

需要先了解产品能力时，可以查看 [React 产品概述](chatuikit_overview.html) 或 [Vue 产品概述](vue_overview.html)。Demo 文档介绍在线体验和本地运行方式；集成文档用于将 UIKit 接入自己的项目。

## 集成流程

<div style="text-align: center">
  <img src="/images/uikit/chatuikit/web/beginner_guide.png" width="350"/>
</div>

## 集成步骤

| 步骤 | 说明 |
| --- | --- |
| 注册开发者账号 | 在 [声网控制台](https://console.shengwang.cn/overview) [注册账号](https://doc.shengwang.cn/doc/console/general/quickstart#注册账号)，用于创建和管理项目。开发者账号与应用中的 IM 用户账号用途不同。 |
| 创建项目并获取 App ID | 在声网控制台 [创建项目](https://doc.shengwang.cn/doc/console/general/quickstart#创建项目)，[开通即时通讯 IM 服务](/docs/product/enable_im.html#_2-开通即时通讯-im-服务) 并 [获取 App ID](/docs/product/enable_im.html#_3-获取-app-id)。初始化 UIKit 时，使用对应项目的配置。 |
| 创建用户并获取用户 Token | 在声网控制台 [创建用户](/docs/product/product_user_registration_login.html#创建用户)，或 [调用 REST API 创建用户](/docs/document/server-side/account_register_authorized_single.html)。在应用服务器实现 [Token 鉴权](/docs/document/server-side/token_authentication.html)，向客户端分发所属用户的 Token。App 证书和 App Token 仅保存在服务端。 |
| 集成 UIKit | **React 项目**：按照 [React 集成单群聊 UIKit](chatuikit_integrated_react.html)安装、初始化并搭建界面。<br>**Vue 3 项目**：先核对 SDK 适配器对声网 App ID 的支持，再从 [Vue 开发文档导航](vue_guide.html)进入快速开始和 Provider 配置，完成接入。<br>完成接入后，使用同一应用下的两个测试用户验证单聊或群聊消息收发。 |
| 自定义界面与功能 | **React UIKit**：查阅[自定义会话列表](chatuikit_custom_conversation_list_basic.html)、[自定义聊天页面](chatuikit_custom_chat.html)和 [自定义通讯录](chatuikit_contactlist.html)。<br>**Vue UIKit**：查阅 [开发指南](vue_development.html)、[组件文档](vue_components.html) 和 [API 参考](vue_api.html)。 |
| 音视频通话 | **可选，仅适用于 React UIKit**：React UIKit 内部集成了声网音视频 SDK，完成相关配置后，可在单聊或群组会话中使用 [音视频通话](chatuikit_video.html)。 |

## 后续开发

- **React UIKit**：按需查阅 [国际化](chatuikit_internationalization.html) 和 [主题](chatuikit_theme.html)等文档。
- **Vue UIKit**：从 [开发文档导航](vue_guide.html) 查阅业务扩展、主题、H5 适配和 AI 辅助开发等内容。

两套 UIKit 的组件 API 和功能配置分别维护，请使用所选技术栈对应的文档。
