
# SDK 日志

即时通讯 IM 日志记录 SDK 相关的信息和事件。声网技术支持团队帮你排查问题时可能会请你发送 SDK 日志。

如果开启日志调试模式，会通过控制台输出 SDK 日志。`debugModel` 设置为 `true`。

```typescript
chatlog.log(`${ChatClient.TAG}: login: `, userName, "******", isPassword);
```
