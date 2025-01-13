# 数据中心

声网为即时通讯 IM 客户提供 HSB 数据中心。该数据中心为绝大部分终端用户均在国内的应用提供服务。

// TODO：1. 声网IM 对应的数据中心仅为 HSB 数据中心？不涉及国内 1 区、国内 2 区、国内 VIP 区？

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

![img](/images/product/data_center_view.png)

## 集成说明

移动端 SDK 默认连接国内数据中心，目前采取的策略是随机分配用户到国内 1 区、国内 2 区，2 个集群服务没有区别。Web 端和桌面端 SDK 集成需要根据所在数据中心，填写配置对应的 webSocket 地址。

| 数据中心名称 | socket3.0 地址          | socket2.0(老版本)地址   |
| :--------- | :----- | :----- |
| 国内 1 区      | im-api-v2.easemob.com 或 im-api-v2.easecdn.com       | im-api.easemob.com 或 im-api.easecdn.com       |
| 国内 2 区      | im-api-v2-31.easemob.com 或 im-api-v2-31.easecdn.com | im-api-31.easemob.com 或 im-api-31.easecdn.com |
| 国内 VIP 区    | 请咨询你的商务经理    |                                                |

不同数据中心 RESTful 接口调用不同，具体地址如下：

| 数据中心名称 | RESTful API 请求地址                   |
| :--------- | :----- |
| 国内 1 区      | a1.easemob.com 或 a1.easecdn.com   |
| 国内 2 区      | a31.easemob.com 或 a31.easecdn.com |
| 国内 VIP 区    | 请咨询你的商务经理                 |

不同数据中心微信小程序、支付宝小程序的具体地址如下：

| 数据中心名称 | 微信小程序      | 支付宝小程序           |
| :--------- | :----- | :----- |
| 国内 1 区      | im-api-wechat.easemob.com 或 im-api-wechat.easecdn.com       | im-api-alipay.easemob.com 或 im-api-alipay.easecdn.com   |
| 国内 2 区      | im-api-wechat-31.easemob.com 或 im-api-wechat-31.easecdn.com | im-api-alipay-31.easemob.com 或 im-api-alipay-31.easecdn.com |
| 国内 VIP 区    | 请咨询你的商务经理   | 请咨询你的商务经理     |

