# SDK 初始化

初始化是使用 SDK 的必要步骤，需在所有接口方法调用前完成。

如果进行多次初始化操作，只有第一次初始化以及相关的参数生效。

## 前提条件

有效的即时通讯 IM 开发者账号和 App ID，详见[开通即时通讯服务](enable_im.html)。

## 初始化

初始化示例代码：

```typescript
let options = new ChatOptions({
    appId: "Your AppId"
});
......// 其他 ChatOptions 配置。
// 初始化时传入上下文以及 options
ChatClient.getInstance().init(context, options);
```
