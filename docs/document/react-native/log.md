# 输出信息到日志文件

如果开启日志调试模式，会通过控制台输出日志。`debugModel` 设置为 `true`。

```typescript
chatlog.log(`${ChatClient.TAG}: login: `, userName, "******", isPassword);
```
