# 跑通 Web 示例项目

本文档基于 `call-demo.tsx` 示例，帮助你快速集成和运行 Web CallKit，实现一对一音视频通话和群组音视频通话功能。

## 推荐环境

- Node.js: 16.0 或以上版本
- npm/yarn: 推荐最新版本
- React: 18.0 或以上版本
- TypeScript: 4.9 或以上版本
- 现代浏览器: Chrome/Firefox/Safari/Edge 最新版本

## 前提条件

在 [声网控制台](https://console.shengwang.cn/overview) 进行如下操作：
1. [注册账号](https://doc.shengwang.cn/doc/console/general/quickstart#注册账号)。
2. [创建项目并开通 IM](/product/enable_im.html#_2-开通即时通讯-im-服务) ，[获取项目的 App ID](/product/enable_im.html#_3-获取-app-id)。
3. [创建用户](/document/web/login.html#用户注册)，获取用户 ID 和 [用户 Token](/document/web/login.html#获取用户-token)。
4. 创建群组，获取群组 ID。将用户加入群组。
5. [开通声网 RTC](product_overview.html#开通声网-rtc)。为了保障流畅的用户体验，开通服务后，你需等待 15 分钟才能跑通示例项目。

## 操作步骤

### 步骤 1： 配置项目

1. 克隆或下载项目。

- GitHub 项目
  
```bash
git clone https://github.com/easemob/easemob-uikit-react.git
```

- Gitee 项目
  
```bash
git clone https://gitee.com/easemob-code/easemob-uikit-react.git
```

2. 安装依赖。

```bash
npm install
# 或
yarn install
```

3. 启动开发服务器。

```bash
npm run dev
# 或
yarn dev
```

### 步骤 2 运行项目

打开浏览器访问 `http://localhost:5173/demo/callkit/call-demo.html`，确认项目正常运行。

### 步骤 3 开始通话

1. 填写 App ID、用户 ID 和密码，点击 **登录**，等待登录成功提示。
   
   <img src="/images/callkit/web/project_runthrough1.png" >

2. 输入被叫用户 ID（一对一通话）或群组 ID（群组通话），点击 **完成配置**。
   
   <img src="/images/callkit/web/project_runthrough2.png" >

3. （可选）点击 **选择背景** 在背景选择面板中选择喜欢的通话背景图片。
   
   <img src="/images/callkit/web/project_runthrough3.png" >

4. 点击 **发起视频通话** 或 **发起语音通话** 发起一对一通话，或者点击 **发起群组视频通话**，选择要邀请的成员，发起群组视频通话。
  
  <img src="/images/callkit/web/project_runthrough4.png" >

5. 在浏览器弹出的权限请求中，允许访问摄像头和麦克风。
6. 在通话中可以控制静音、摄像头、扬声器等，点击 **结束通话** 挂断。
