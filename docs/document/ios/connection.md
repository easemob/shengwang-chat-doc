# 连接

应用客户端成功连接到环信服务器后，才能使用环信即时通讯 SDK 的收发消息等功能。

你调用 `loginWithToken`方法登录后，客户端 SDK 会自动连接环信服务器。关于登录详情，请参见[登录文档](login.html)。

## 监听连接状态

你可以通过注册连接监听确认连接状态。

```swift
override func viewDidLoad() {
    ...
    // 注册连接状态监听，在 SDK 初始化之后调用。
    EMClient.shared().add(self, delegateQueue: nil)
    ...
}

extension ViewController: EMClientDelegate {
    // 连接成功，开始从服务器拉取离线消息时触发。
    // 注意：如果本次登录服务器没有离线消息，不会触发该回调。
    func onOfflineMessageSyncStart() {
    }
    // 离线用户上线后从服务器拉取离线消息结束时触发。
    // 注意：如果再拉取离线过程中因网络或其他原因导致连接断开，不会触发该回调。
    func onOfflineMessageSyncFinish() {
    }
    
    // 连接状态变更时触发该回调
    func connectionStateDidChange(_ aConnectionState: EMConnectionState) {
        
    }
    
    // token 已过期
    func tokenDidExpire(_ aErrorCode: EMErrorCode) {
        
    }
}

```

## 断网自动重连

如果由于网络信号弱、切换网络等引起的连接中断，SDK 会自动尝试重连。重连成功或者失败时分别会收到通知 `connectionStateDidChange`。

## 被动退出登录

你可以通过监听到以下回调后，调用 `EMClient.shared.logout(false)` 进行退出并返回登录界面。

```swift
extension ViewController: EMClientDelegate {
    
    // 用户账户已经被移除
    func userAccountDidRemoveFromServer() {
        
    }
    
    // 用户已经在其他设备登录
    func userAccountDidLoginFromOtherDevice(with info: EMLoginExtensionInfo?) {
        
    }
    
    // 用户账户被禁用
    func userDidForbidByServer() {
        
    }
    
    // 当前账号被强制退出登录，有以下原因：密码被修改；登录设备数过多；服务被封禁; 被强制下线;
    func userAccountDidForced(toLogout aError: EMError?) {
        
    }
}
```

关于错误码更多详情，详见[错误码文档](/document/iOS/error.html)。