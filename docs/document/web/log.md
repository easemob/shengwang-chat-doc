## 输出信息到日志文件

开启日志输出：

```javascript
logger.enableAll();
```
- 设置日志不输出到控制台：

```javascript
logger.setConsoleLogVisibility(false)
```

- 监听 SDK 日志事件：

```javascript
logger.onLog = (log)=>{
  console.log('im logger', log)
}
```

关闭日志输出：

```javascript
logger.disableAll();
```

设置日志输出等级：

```javascript
// 0 - 5 或者 'TRACE'，'DEBUG'，'INFO'，'WARN'，'ERROR'，'SILENT';
logger.setLevel(0);
```

设置缓存日志：

```javascript
logger.setConfig({
  useCache: false, // 是否缓存
  maxCache: 3 * 1024 * 1024, // 最大缓存字节
});
// 缓存全部等级日志
logger.setLevel(0);
```

下载日志：

```javascript
logger.download();
```

## 日志上报

自 4.8.1 版本，Web SDK 支持日志上报功能, 即将日志会上传到环信的服务器。该功能默认关闭，如有需要, 可联系商务开通。