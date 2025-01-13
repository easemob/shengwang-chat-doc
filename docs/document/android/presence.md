# 在线状态订阅

<Toc />

用户在线状态（即 Presence）包含用户的在线、离线以及自定义状态。**若你当前套餐不支持该功能，需升级产品套餐。**

本文介绍如何在即时通讯应用中发布、订阅和查询用户的在线状态。关于用户的在线、离线和自定义状态的定义、变更以及用户的实时感知，详见[用户在线状态管理](product_user_presence.html)。

## 技术原理

环信 IM SDK 提供 `Presence`、`PresenceManager` 和 `PresenceListener` 类，用于管理在线状态订阅，包含如下核心方法：

- `subscribePresences`：订阅用户的在线状态；
- `publishPresence`：发布自定义在线状态；
- `addListener`：添加在线状态监听器；
- `onPresenceUpdated`：被订阅用户的在线状态变更时，订阅者收到监听回调；
- `unsubscribePresences`：无需关注用户的在线状态时，取消订阅；

订阅用户在线状态的基本工作流程如下：

![img](/images/android/presence.png)

如上图所示，订阅用户在线状态的基本步骤如下：

1. 用户 A 订阅用户 B 的在线状态；
2. 用户 B 的在线状态发生变更；
3. 用户 A 收到 `onPresenceUpdated` 回调。

效果如下图：

![img](/images/android/status.png)

## 前提条件

使用在线状态功能前，请确保满足以下条件：

1. 完成 `3.9.1 或以上版本` SDK 初始化，详见 [快速开始](quickstart.html)。
2. 了解环信即时通讯 IM API 的 [使用限制](/product/limitation.html)。
3. 产品套餐包支持在线状态订阅功能。

## 实现方法

本节介绍如何使用环信 IM SDK 提供的 API 实现上述功能。

### 订阅指定用户的在线状态

默认情况下，你不关注任何其他用户的在线状态。你可以通过调用 `io.agora.chat.PresenceManager#subscribePresences` 方法订阅指定用户的在线状态，示例代码如下：

```java
ChatClient.getInstance().presenceManager().subscribePresences(contactsFromServer, 1 * 24 * 3600, new ValueCallBack<List<Presence>>() {
    @Override
    public void onSuccess(List<Presence> presences) {
        
    }

    @Override
    public void onError(int errorCode, String errorMsg) {
        
    }
});             
```

成功订阅指定用户的在线状态后，SDK 通过 `onSuccess` 回调返回被订阅用户的在线状态。

在线状态变更时，订阅者会收到 `io.agora.PresenceListener#onPresenceUpdated` 回调。

:::tip
- 订阅时长最长为 30 天，过期需重新订阅。如果未过期的情况下重复订阅，新设置的有效期会覆盖之前的有效期。
- 每次调用接口最多只能订阅 100 个账号，若数量较大需多次调用。
- 每个用户 ID 订阅的用户数不超过 3000。如果超过 3000，后续订阅也会成功，但默认会将订阅剩余时长较短的替代。
- 每个用户最多可被 3000 个用户订阅。
:::

### 发布自定义在线状态

用户在线时，可调用 `io.agora.chat.PresenceManager#publishPresence` 方法发布自定义在线状态：

```java
ChatClient.getInstance().presenceManager().publishPresence("自定义状态", new CallBack() {
    @Override
    public void onSuccess() {

    }

    @Override
    public void onError(int code, String error) {

    }
});
```

在线状态发布后，发布者和订阅者均会收到 `io.agora.PresenceListener#onPresenceUpdated` 回调。

### 添加在线状态监听器

添加用户在线状态的监听器，示例代码如下：

```java
ChatClient.getInstance().presenceManager().addListener(new MyPresenceListener());
```

参考如下示例代码，使用 `PresenceListener` 监听器实现以下接口。当订阅的用户在线状态发生变化时，会收到 `onPresenceUpdated` 回调。

```java
public interface PresenceListener {
    void onPresenceUpdated(List<Presence> presences);
}
```

### 取消订阅指定用户的在线状态

若取消指定用户的在线状态订阅，可调用 `io.agora.chat.PresenceManager#unsubscribePresences` 方法，示例代码如下：

```java
ChatClient.getInstance().presenceManager().unsubscribePresences(contactsFromServer, new CallBack() {
    @Override
    public void onSuccess() {
        
    }

    @Override
    public void onError(int errorCode, String errorMsg) {
        
    }
});
```

### 查询被订阅用户列表

为方便用户管理订阅关系，SDK 提供 `io.agora.chat.PresenceManager#fetchSubscribedMembers` 方法，可使用户分页查询自己订阅的用户列表，示例代码如下：

```java
ChatClient.getInstance().presenceManager().fetchSubscribedMembers(pageNum, pageSize, new ValueCallBack<List<String>>() {
    @Override
    public void onSuccess(List<String> subscribedMembers) {
        
    }

    @Override
    public void onError(int errorCode, String errorMsg) {
        
    }
});
```

### 获取用户的当前在线状态

如果不关注用户的在线状态变更，你可以调用 `io.agora.chat.PresenceManager#fetchPresenceStatus` 获取用户当前的在线状态，而无需订阅状态。示例代码如下：

```java
// contactsList：要查询状态的用户 ID，每次最多可传 100 个用户 ID。
ChatClient.getInstance().presenceManager().fetchPresenceStatus(contactsList, new ValueCallBack<List<Presence>>() {
    @Override
    public void onSuccess(List<Presence> presences) {
        
    }

    @Override
    public void onError(int errorCode, String errorMsg) {
        
    }
});
```