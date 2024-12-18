# 集成 SDK

本文介绍如何将环信即时通讯 IM SDK 集成到你的 Windows 项目。

## 开发环境要求

- Windows SDK 1.0.5 或以上；
- Visual Studio IDE 2019 或以上；
- .Net Framework 4.5.2 或以上；
- 目前 Windows SDK 仅支持 64 位运行模式；

## 集成 SDK

1.下载：点击 [Windows SDK](https://www.easemob.com/download/im) 进行下载，下载的 NuGet 包一般存放在 C:\Users\XXX\Downloads (XXX 为本机用户名)；
2.将下载的 NuGet 包拷贝到自己的工作目录，比如 D:\workspace\WinSDK 下，以下说明以此目录举例；
3.在 Visual Studio 开发环境里，右键点击 windows-example 项目，选择 管理 NuGet 程序包 (N)...；
4.在弹出的 NuGet:windows-example tab 页面里，点击右上角的小齿轮会弹出 NuGet 程序包源的设置窗体，点击窗体右上角的 + 按钮，在 包源 的文本框内会出现 Package source 这一栏，点击选中，并修改文本框下的 名称 和 源。例如 名称 可以设置为 Local Package source，源 则设置为第 2 步中的目录， D:\workspace\WinSDK，点击确定；
5.在 NuGet:windows-example tab 页面，在右上角的 “程序包源” 处点击下拉菜单，选中刚刚配置的包源名称 Local Package source；
6.在 NuGet:windows-example tab 页面上部，选中 浏览，在下面搜索框的右边，勾选 包括预发行版，此时下面的区域会出现 agora_chat_sdk (如果没有出现，点击搜索框右侧的刷新按)，选中这一栏，右边会出现一个向下的小箭头，点击进行安装，或者点击右侧栏最右边的 安装 按钮；
7.在弹出的 预览更改 窗体中，点击确定按钮；
8.到此 Windows SDK 的 NuGet 包集成完毕。