# SDK 初始化

初始化是使用 SDK 的必要步骤，需在所有接口方法调用前完成。

如果进行多次初始化操作，只有第一次初始化以及相关的参数生效。

:::tip
需要在主进程中进行初始化。
:::

## 前提条件

有效的环信即时通讯 IM 开发者账号和 AppId，详见[环信即时通讯云控制台的相关文档](/product/enable_and_configure_IM.html#创建应用)。

## 初始化

初始化示例代码：

```java
ChatOptions options = new ChatOptions();
options.setAppId("Your appId");
......// 其他 ChatOptions 配置。
ChatClient.getInstance().init(context, options);
```
