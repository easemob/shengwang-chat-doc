# 消息翻译

## 服务介绍

为方便用户在聊天过程中 **翻译文本消息**，即时通讯 IM SDK 集成了 Microsoft Azure Translation API，支持以下两种方式：

- 按需翻译：接收方收到文本消息后，将消息内容翻译为目标语言。
- 自动翻译：发送方设置目标语言后，SDK 在发送消息前翻译文本，将原文和译文一起发送给接收方。

## 开通与计费

消息翻译为增值服务，使用前请先在 [声网控制台](https://console.shengwang.cn/overview) 的 **套餐包 > 预付费套餐包 > 即时通讯 IM** 页面开通。

单次翻译请求最多支持 10,000 个字符。计费字符数按 **源文本字符数 × 目标语言数量** 计算。例如，将 500 个字符翻译为 4 种语言，计费字符数为 2,000。

该服务的费用详见 [计费策略](/docs/product/pricing_policy.html#消息翻译) 。

国内和海外数据中心的计费规则分别参见 [国内计费说明](message_translation_billing_domestic.html) 和 [海外计费说明](message_translation_billing_overseas.html)。

## 集成入口

开通服务后，选择对应平台的服务集成文档：

| 平台 | 文档 |
| :--- | :--- |
| Android | [Android 集成文档](message_translation_android.html) |
| iOS | [iOS 集成文档](message_translation_ios.html) |
| Web/小程序 | [Web/小程序集成文档](message_translation_web.html) |
| HarmonyOS | [HarmonyOS 集成文档](message_translation_harmonyos.html) |
| Flutter | [Flutter 集成文档](message_translation_flutter.html) |
| React Native | [React Native 集成文档](message_translation_react-native.html) |
| Unity | [Unity 集成文档](message_translation_unity.html) |
| Windows | [Windows 集成文档](message_translation_windows.html) |
| 服务端 | [翻译消息内容](message_translation_text_rest.html)、[获取翻译语言列表](message_translation_language_list_rest.html)、[检测文本的源语言](message_translation_detect_rest.html) |
