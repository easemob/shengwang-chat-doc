# 数据中心

声网为即时通讯 IM 客户提供数据中心**中国**。该数据中心为绝大部分终端用户均在国内的应用提供服务。

创建项目或开通即时通讯 IM 时，声网服务器会自动为你分配数据中心：

1. 创建项目时，若开通即时通讯 IM，**服务区域**即为**中国**，自动为你配置了数据中心。

![img](/images/product/enable_im/data_center_config1.png)

2. 创建项目后，你在开通即时通讯 IM 时，自动配置数据中心。

![img](/images/product/enable_im/data_center_config2.png)

## 查看数据中心

可以按照以下步骤在声网控制台查询应用所在的数据中心：

1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**功能配置**标签页。

5. 在**基础信息**页面可查看应用的数据中心。

![img](/images/product/enable_im/data_center_view.png)

## 集成说明

1. 移动端 SDK 连接国内数据中心**中国**。

2. Web 端和小程序端 SDK 集成需要根据数据中心，填写配置对应的 webSocket 地址。

| 数据中心 | Socket 地址          |
| :--------- | :----- | 
| 中国      |  wss://im-api-c1.chat.rtnsvc.com 或  wss://im-api-c1.chat.realtimemesh.com       |

3. RESTful 接口请求地址如下：

| 数据中心 | RESTful API 请求地址                   |
| :--------- | :----- |
| 中国      | https://c1.chat.rtnsvc.com 或 https://c1.chat.realtimemesh.com   |

4. 微信小程序、支付宝小程序的具体地址如下：

| 数据中心 | 微信小程序      | 支付宝小程序           |
| :--------- | :----- | :----- |
| 中国     | im-api-wechat-c1.chat.rtnsvc.com 或 im-api-wechat-c1.chat.realtimemesh.com | im-api-alipay-c1.chat.rtnsvc.com 或 im-api-alipay-c1.chat.realtimemesh.com   |


