# iOS 单群聊 UIKit 更新日志

## 版本 4.10.0

### 新增特性

- 消息长按菜单样式新增微信风格样式；
- 发送附件消息菜单新增微信风格样式。

### 交互优化

优化了部分发送消息以及消息选中等交互体验。

### 问题修复

- 修复了不需要消息表情回应时 UI 错乱问题。
- 修复了一些文案问题。

### 重大变更

由于业务原因对一些类进行了重命名，若要升级需针对如下改动处理编译错误。

`EaseChatUIKit` 中携带的 `Ease` 前缀的类的名称均去掉了 `Ease` 前缀，具体变更如下表所示：

| UIKit 变更项      | 类名变更 | 
| :--------- | :----- | 
| 版本号变量名  | `EaseChatUIKit_VERSION` -> `ChatUIKit_VERSION`  | 
| option 类名 | `EaseChatUIKitOptions` -> `ChatUIKitOptions`       | 
| 初始化类名 | `EaseChatUIKitClient` -> `ChatUIKitClient `       | 
| 缓存类名   | `EaseChatUIKitContext` -> `ChatUIKitContext`       | 
| 用户个人信息协议名 | `EaseProfileProtocol` -> `ChatUserProfileProtocol` | 
| 用户信息提供协议名 | 1. `EaseProfileProvider` -> `ChatUserProfileProvider` <br/> 2. `EaseProfileProviderOC` -> `ChatUserProfileProviderOC`      | 
| 群组信息提供协议名   | 1. `EaseGroupProfileProvider` -> `ChatGroupProfileProvider` <br/> 2. `EaseGroupProfileProviderOC` -> `ChatGroupProfileProviderOC`      | 
| 公共导航组件类名 | 1. `EaseChatNavigationBar`-> `ChatNavigationBar` <br/> 2. 对应枚举类名变动：`EaseChatNavigationBarClickEvent` -> `ChatNavigationBarClickEvent` | 

## 版本 4.8.0

本版本新增如下功能：

- 消息页面：
  - 消息置顶
  - 文本消息 URL 预览
  - 消息输入中状态
- 联系人黑名单

## 版本 4.6.0

本版本新增了如下功能、组件和工具类：

1. 会话列表界面：
- 会话置顶
- 会话删除
- 会话免打扰
- 会话已读
- 更多扩展操作菜单

2. 联系人列表界面：
- 联系人列表
- 好友请求
- 群组列表及其后续

3. 聊天界面：
- 消息内容的显示可配置
- 消息扩展功能复制、删除、多选合并转发、单条转发、撤回、创建话题（群内消息）、表情回应、消息回复、消息翻译、消息举报、消息编辑
- 发送文本、音频、视频、文件、联系人名片、表情、图片
- 各种消息的预览
- 消息气泡两种样式切换
- 后续消息搜索等

4. 公共 UI 组件：
- 导航栏
- 弹窗
- 底部弹层
- Loading 页面
- Toast 工具
- 图片加载存储组件
- 换肤协议工具
- 字体工具类
- 主题颜色工具类

5. 工具类：
- 国际化工具
- 音频 AMR 格式转换工具
- 各种扩展工具

