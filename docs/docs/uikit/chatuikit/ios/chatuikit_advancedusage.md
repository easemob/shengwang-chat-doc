# 进阶用法

<Toc />

以下是进阶用法的部分示例。会话列表页面、消息列表页和联系人列表均可单独使用。

## 初始化

与[快速开始中的初始化](chatuikit_quickstart.html##第一步-初始化)相比，这里增加了 `ChatOptions` 的参数，包括 SDK 中是否打印日志、是否自动登录以及是否默认使用用户属性的开关配置。

```swift
let error = ChatUIKitClient.shared.setup(option: ChatOptions(appId: <#appId#>))
```

## 登录

使用当前用户对象符合 `ChatUserProfileProtocol` 协议的用户信息登录 ShengwangChatUIKit。

在[声网控制台](https://console.shengwang.cn/overview)按照如下步骤创建用户：

1. 展开控制台左上角下拉框，选择需要开通即时通讯 IM 服务的项目。

2. 点击左侧导航栏的**全部产品**。

3. 在下拉列表中找到**即时通讯 IM** 并点击。

4. 在**即时通讯 IM** 页面，进入**运营管理**标签页。

5. 在**用户** 页签下，点击**创建IM用户**。

6. 在弹出的对话框中，配置用户相关参数，点击**确定**。

将用户 ID 传入以下代码中的 `userId`。

:::tip
若你已集成了 IM SDK，SDK 的所有用户 ID 均可用于登录 `ShengwangChatUIKit`。
:::

```
public final class YourAppUser: NSObject, ChatUserProfileProtocol {

    public func toJsonObject() -> Dictionary<String, Any>? {
        ["ease_chat_uikit_user_info":["nickname":self.nickname,"avatarURL":self.avatarURL,"userId":self.id]]
    }

    public var userId: String = <#T##String#>

    public var nickname: String = "Jack"

    public var avatarURL: String = "https://accktvpic.oss-cn-beijing.aliyuncs.com/pic/sample_avatar/sample_avatar_1.png"

}
 ChatUIKitClient.shared.login(user: YourAppUser(), token: ExampleRequiredConfig.chatToken) { error in 
 }
```

## ChatUIKitContext 中的 Provider

:::tip
Provider 仅用于会话列表以及联系人列表。若只通过快速开始进入聊天页面，则不需要实现 Provider。
:::

1. 设置 Provider 实现类。

- 使用协程异步返回会话列表相关信息，仅限于 Swift 下使用。

```
    
        //userProfileProvider 为用户数据的提供者，使用协程实现与 userProfileProviderOC 不能同时存在。userProfileProviderOC 使用闭包实现。
        ChatUIKitContext.shared?.userProfileProvider = self
        ChatUIKitContext.shared?.userProfileProviderOC = nil
        //groupProvider 原理同上
        ChatUIKitContext.shared?.groupProfileProvider = self
        ChatUIKitContext.shared?.groupProfileProviderOC = nil
```

- 使用闭包返回会话列表相关信息，Swift 和 Objective-C 均可使用。

```
        //userProfileProvider 为用户数据的提供者，使用协程实现与 userProfileProviderOC 不能同时存在。userProfileProviderOC 使用闭包实现。
        ChatUIKitContext.shared?.userProfileProvider = nil
        ChatUIKitContext.shared?.userProfileProviderOC = self
        //groupProvider 原理同上
        ChatUIKitContext.shared?.groupProfileProvider = nil
        ChatUIKitContext.shared?.groupProfileProviderOC = self
```

2. 实现会话列表 Provider。

对于 Objective-C，实现 `ChatUserProfileProviderOC` 即可。 

下面示例代码为实现带协程功能的 Swift 特有的 provider。

```
//MARK: - ChatUserProfileProvider&ChatGroupProfileProvider for conversations&contacts usage.
//For example using conversations controller,as follows.
extension MainViewController: ChatUserProfileProvider,ChatGroupProfileProvider {
    //MARK: - ChatUserProfileProvider
    func fetchProfiles(profileIds: [String]) async -> [any ShengwangChatUIKit.ChatUserProfileProtocol] {
        return await withTaskGroup(of: [ShengwangChatUIKit.ChatUserProfileProtocol].self, returning: [ShengwangChatUIKit.ChatUserProfileProtocol].self) { group in
            var resultProfiles: [ShengwangChatUIKit.ChatUserProfileProtocol] = []
            group.addTask {
                var resultProfiles: [ShengwangChatUIKit.ChatUserProfileProtocol] = []
                let result = await self.requestUserInfos(profileIds: profileIds)
                if let infos = result {
                    resultProfiles.append(contentsOf: infos)
                }
                return resultProfiles
            }
            //Await all task were executed.Return values.
            for await result in group {
                resultProfiles.append(contentsOf: result)
            }
            return resultProfiles
        }
    }
    //MARK: - ChatGroupProfileProvider
    func fetchGroupProfiles(profileIds: [String]) async -> [any ShengwangChatUIKit.ChatUserProfileProtocol] {
        
        return await withTaskGroup(of: [ShengwangChatUIKit.ChatUserProfileProtocol].self, returning: [ShengwangChatUIKit.ChatUserProfileProtocol].self) { group in
            var resultProfiles: [ShengwangChatUIKit.ChatUserProfileProtocol] = []
            group.addTask {
                var resultProfiles: [ShengwangChatUIKit.ChatUserProfileProtocol] = []
                let result = await self.requestGroupsInfo(groupIds: profileIds)
                if let infos = result {
                    resultProfiles.append(contentsOf: infos)
                }
                return resultProfiles
            }
            //Await all task were executed.Return values.
            for await result in group {
                resultProfiles.append(contentsOf: result)
            }
            return resultProfiles
        }
    }
    
    private func requestUserInfos(profileIds: [String]) async -> [ChatUserProfileProtocol]? {
        var unknownIds = [String]()
        var resultProfiles = [ChatUserProfileProtocol]()
        for profileId in profileIds {
            if let profile = ChatUIKitContext.shared?.userCache?[profileId] {
                if profile.nickname.isEmpty {
                    unknownIds.append(profile.id)
                } else {
                    resultProfiles.append(profile)
                }
            } else {
                unknownIds.append(profileId)
            }
        }
        if unknownIds.isEmpty {
            return resultProfiles
        }
        let result = await ChatClient.shared().userInfoManager?.fetchUserInfo(byId: unknownIds)
        if result?.1 == nil,let infoMap = result?.0 {
            for (userId,info) in infoMap {
                let profile = ChatUserProfile()
                let nickname = info.nickname ?? ""
                profile.id = userId
                profile.nickname = nickname
                if let remark = ChatClient.shared().contactManager?.getContact(userId)?.remark {
                    profile.remark = remark
                }
                profile.avatarURL = info.avatarUrl ?? ""
                resultProfiles.append(profile)
                if (ChatUIKitContext.shared?.userCache?[userId]) != nil {
                    profile.updateFFDB()
                } else {
                    profile.insert()
                }
                ChatUIKitContext.shared?.userCache?[userId] = profile
            }
            return resultProfiles
        }
        return []
    }
    
    private func requestGroupsInfo(groupIds: [String]) async -> [ChatUserProfileProtocol]? {
        var resultProfiles = [ChatUserProfileProtocol]()
        let groups = ChatClient.shared().groupManager?.getJoinedGroups() ?? []
        for groupId in groupIds {
            if let group = groups.first(where: { $0.groupId == groupId }) {
                let profile = ChatUserProfile()
                profile.id = groupId
                profile.nickname = group.groupName
                profile.avatarURL = group.settings.ext
                resultProfiles.append(profile)
                ChatUIKitContext.shared?.groupCache?[groupId] = profile
            }

        }
        return resultProfiles
    }
}
```

## 会话列表页面

1. 创建会话列表页面。

```swift
    
        let vc = ShengwangChatUIKit.ComponentsRegister.shared.ConversationsController.init()
        vc.tabBarItem.tag = 0
```

2. 监听会话列表页面事件。

```swift
        
        vc.viewModel?.registerEventsListener(listener: self)
```

## 联系人列表页面

1. 创建联系人列表页面。

继承单群聊 UIKit 提供的联系人列表页面类注册后的自定义类可以调用 ViewModel 的 `ContactViewController().viewModel.registerEventsListener` 方法监听相关事件。

```swift
        let vc = ShengwangChatUIKit.ComponentsRegister.shared.ContactsController.init(headerStyle: .contact)
```

2. 监听联系人列表页面事件。

```swift
        vc.viewModel?.registerEventsListener(listener: self)
```

## 初始化聊天页面

聊天页面中大部分消息处理以及页面处理逻辑均可覆盖（override），包括 `ViewModel`。

```
// 在声网控制台中创建一个新用户，将用户 ID 传入下面构造方法参数中，跳转到聊天页面即可。
let vc = ComponentsRegister.shared.MessageViewController.init(conversationId: <#刚创建用户的id#>, chatType: .chat)
// 继承注册后的自定义类还可以调用 ViewModel 的 registerEventsListener 方法监听聊天消息相关事件，例如消息接收、长按、点击等。 
//或者 push 或者 present 都可
ControllerStack.toDestination(vc: vc)
```

## 监听用户及与服务器的连接事件

你可以调用 `registerUserStateListener` 方法监听 `ShengwangChatUIKit` 中用户以及与服务器之间的连接状态变更的相关事件和错误。

```
ChatUIKitClient.shared.registerUserStateListener(self)
```

不使用该监听时，可调用 `unregisterUserStateListener` 方法移除：

```
ChatUIKitClient.shared.unregisterUserStateListener(self)
```




