# SDK 初始化

初始化是使用 SDK 的必要步骤,需在所有接口方法调用前完成。

## 前提条件

有效的声网即时通讯 IM 开发者账号和 appId，详见[声网即时通讯云控制台的相关文档](enable_and_configure_IM.html#创建应用)。

## 初始化参数说明

```javascript
import ChatSDK from "shengwang-chat";
const chatClient = new ChatSDK.connection({
  appId: "Your appId",
});
```

| 参数  | 类型   | 是否必需 | 描述               |
| ----- | ------ | -------- | ------------------ |
| appId | String | 是       | 声网应用的唯一标识 |
