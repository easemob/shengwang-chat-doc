# 在多个设备上登录

<Toc />

即时通讯 IM 支持同一账号在多个设备上登录。多端多设备登录场景下，所有已登录的设备同步以下信息和操作：

- 消息：包括在线消息、离线消息、推送通知（若开启了第三方推送服务，离线设备收到）以及对应的回执和已读状态等；
- 好友和群组相关操作；
- 子区相关操作；
- 会话相关操作。

多端登录时，即时通讯 IM 每端默认最多支持 4 个设备同时在线。如需增加支持的设备数量，可以联系声网商务。

单端和多端登录场景下的互踢策略和自动登录时安全检查如下：

<table width="807" height="327" border="1">
  <tbody>
    <tr>
      <td width="109" height="49">单端/多端登录</td>
      <td width="384">互踢策略</td>
      <td width="292">自动登录安全检查</td>
    </tr>
    <tr>
      <td height="52">单端登录</td>
      <td>新登录的设备会将当前在线设备踢下线。</td>
      <td rowspan="2">对于自动登录的设备，下线后设备会自动重连声网服务器。若重连成功，默认会踢掉当前登录设备（对于多设备登录，则踢掉最早的登录设备）。若要保留当前登录设备不被踢下线，请联系声网商务。该场景下，自动登录的设备登录失败，收到错误 214，提示当前登录的设备数量超过限制。</td>
    </tr>
    <tr>
      <td height="156">多端登录</td>
      <td><p>若一端的登录设备数量达到了上限，最新登录的设备会将该端最早登录的设备踢下线。</p>
      <p>即时通讯 IM 仅支持同端互踢，不支持各端之间互踢。</p></td>
    </tr>
  </tbody>
</table>

## 技术原理  

即时通讯 iOS SDK 初始化时会生成登录 ID 用于在多设备登录和消息推送时识别设备，并将该 ID 发送到服务器。服务器会自动将新消息发送到用户登录的设备，可以自动监听到其他设备上进行的好友或群组操作。即时通讯 IM iOS SDK 提供以下多设备场景功能：

- 获取当前用户的其他已登录设备的登录 ID 列表；
- 获取指定账号的在线登录设备列表；  
- 设置登录设备的名称；
- 设置登录设备的平台；
- 强制指定账号从单个设备下线；
- 强制指定账号从所有设备下线；
- 获取其他设备的好友或者群组操作。

## 前提条件

开始前，需确保完成 SDK 初始化，连接到服务器。详见[快速开始](quickstart.html)。

设置登录设备的自定义名称和平台需在 SDK 初始化时中完成。

## 实现方法

### 获取当前用户的其他已登录设备的登录 ID 列表

你可以调用 `getSelfIdsOnOtherPlatformWithCompletion:` 方法获取其他登录设备的登录 ID 列表，然后选择目标登录 ID 作为消息接收方向指定设备发送消息。

```objectivec
[AgoraChatClient.sharedClient.contactManager getSelfIdsOnOtherPlatformWithCompletion:^(NSArray<NSString *> * _Nullable aList, AgoraChatError * _Nullable aError) {
    // 选择一个登录 ID 作为消息接收方。
    NSString *to = aList.firstObject;
    if (to.length > 0) {
        AgoraChatTextMessageBody *body = [[AgoraChatTextMessageBody alloc] initWithText:@"Hello World"];
        // 创建一条文本消息，content 为消息文字内容，to 传入登录 ID 作为消息接收方。
        AgoraChatMessage *message = [[AgoraChatMessage alloc] initWithConversationID:to body:body ext:nil];
        // 发送消息。
        [AgoraChatClient.sharedClient.chatManager sendMessage:message progress:nil completion:^(AgoraChatMessage * _Nullable message, AgoraChatError * _Nullable error) {
        }];
    }
}];
```

### 获取指定账号的在线登录设备列表  

你可以调用 `getLoggedInDevicesFromServerWithUsername` 或 `getLoggedInDevicesFromServerWithUserId` 方法通过传入用户 ID 和登录密码或用户 token 从服务器获取指定账号的在线登录设备的列表。调用该方法后，在 SDK 返回的信息中，`AgoraChatDeviceConfig` 中的 `deviceName` 属性表示自定义设备名称，若未自定义设备名称，返回设备型号。

```objectivec
// 用户 ID + 密码
[AgoraChatClient.sharedClient getLoggedInDevicesFromServerWithUsername:<#userId#>  password:<#password#>  completion:^(NSArray<AgoraChatDeviceConfig *> * _Nullable aList, AgoraChatError * _Nullable aError) {
            
        }];
// 用户ID + token
[AgoraChatClient.sharedClient getLoggedInDevicesFromServerWithUserId:<#userId#> token:<#token#>  completion:^(NSArray<AgoraChatDeviceConfig *> * _Nullable aList, AgoraChatError * _Nullable aError) {
        
}];
```

### 设置登录设备的名称

即时通讯 IM 支持自定义设置设备名称，这样在多设备登录的场景下，若有设备被踢下线，你就能知道是被哪个设备挤下线的。

初始化 SDK 时，你可以调用 `initializeSDKWithOptions` 方法时设置 `AgoraChatOptions#customDeviceName` 属性自定义登录设备的名称。设置设备名称后，若登录设备时因达到了登录设备数量限制而导致在已登录的设备上强制退出时，被踢设备收到的 `userAccountDidLoginFromOtherDevice` 回调里会包含导致该设备被踢下线的自定义设备名称。

:::tip
登录成功后才会将该设置发送到服务器。
:::

```objectivec
AgoraChatOptions* option = [AgoraChatOptions optionsWithAppId:@"Appid"];
option.customDeviceName = @"XXX的iPad";
[AgoraChatClient.sharedClient initializeSDKWithOptions:option]; 

```

### 设置登录设备的平台

即时通讯 IM 支持自定义设置登录设备的平台，例如将手机和平板电脑设置为单独的平台，方便用户精细化控制同一平台的登录设备数量及平台间互踢等行为。

初始化 SDK 时，调用 `initializeSDKWithOptions` 方法设置 `AgoraChatOptions#customOSType` 属性添加自定义平台。

:::tip
登录成功后才会将该设置发送到服务器。
:::

```objectivec
AgoraChatOptions* option = [AgoraChatOptions optionsWithAppId:@"Appid"];
`customOSType` 的取值范围为 [1,100]。
option.customOSType = 60;
[AgoraChatClient.sharedClient initializeSDKWithOptions:option];
```

### 设置登录设备的扩展信息

即时通讯 IM 支持设备的自定义扩展信息。这样在多设备场景下，若有设备被踢下线，被踢设备能获得该设备的自定义扩展信息。

初始化 SDK 时，可通过 `AgoraChatOptions#loginExtensionInfo` 属性设置设备扩展信息。设置后，多设备场景下，登录该设备后，若因达到了登录设备数量限制而导致当前登录设备被踢下线（`206` 错误，`AgoraChatErrorUserLoginOnAnotherDevice`），被踢设备收到的 `AgoraChatClientDelegate#userAccountDidLoginFromOtherDeviceWithInfo` 回调中会包含该设备的自定义扩展信息。

:::tip
登录成功后才会将该设置发送到服务器。
:::

```objectivec
AgoraChatClient.sharedClient.option.loginExtensionInfo = @"you was kicked out by other device";

- (void)userAccountDidLoginFromOtherDeviceWithInfo:(AgoraChatLoginExtensionInfo* _Nullable)info {
    //`AgoraChatLoginExtensionInfo` 中包含 `deviceName` 以及 `loginExtensionInfo` 属性。
    //`loginExtensionInfo` 即 SDK 初始化时传入的登录时携带给被踢设备的扩展信息。
}
```

### 强制指定账号从单个设备下线

你可以调用 `kickDeviceWithUsername` 方法通过传入用户 ID 和登录密码或用户 token 将指定账号从单个登录的设备踢下线。你需要首先调用 `getLoggedInDevicesFromServerWithUsername` 方法获取设备 ID。

:::tip
不登录也可以使用该接口。
:::

```objectivec
// username：账户名称，password：账户密码。
NSString *username = @"";
NSString *password = @"";
[AgoraChatClient.sharedClient getLoggedInDevicesFromServerWithUsername:username password:password completion:^(NSArray<AgoraChatDeviceConfig *> * _Nullable aList, AgoraChatError * _Nullable aError) {
    NSString *resource = aList.firstObject.resource;
    if (resource.length > 0) {
        // username：账户名称，password：账户密码, resource：设备 ID。
        [AgoraChatClient.sharedClient kickDeviceWithUsername:username password:password resource:resource completion:^(AgoraChatError * _Nullable aError) {
        }];
    }
}];
```

### 强制指定账号从所有设备下线

你可以调用 `kickAllDevicesWithUsername` 或 `kickAllDevicesWithUserId` 方法通过传入用户 ID 和登录密码或用户 token 将指定账号从所有登录设备都踢下线。 

:::tip
不登录也可以使用该接口。
:::

```objectivec
// 用户 ID + 密码
[AgoraChatClient.sharedClient kickAllDevicesWithUsername:username password:password completion:^(AgoraChatError * _Nullable aError) {
}];
        
// 用户 ID + token
[AgoraChatClient.sharedClient kickAllDevicesWithUserId:userId token:token completion:^(AgoraChatError * _Nullable aError) {
                
}];
```

### 获取其他设备上的操作

例如，账号 A 同时在设备 A 和 B 上登录，账号 A 在设备 A 上进行操作，设备 B 会收到这些操作对应的通知。

你需要先实现 `AgoraChatMultiDevicesDelegate` 类监听其他设备上的操作，然后调用 `addMultiDevicesDelegate:delegateQueue:` 方法添加多设备监听。

:::tip
多端多设备场景下，无聊天室操作相关事件，只支持聊天室中发送和接收消息的同步。
:::

```objectivec
 //实现 `AgoraChatMultiDevicesDelegate` 监听其他设备上的操作。
@interface ViewController () <AgoraChatMultiDevicesDelegate>

@end

@implementation ViewController

- (void)viewDidLoad 
{
    [super viewDidLoad];
    [AgoraChatClient.sharedClient addMultiDevicesDelegate:self delegateQueue:nil];
}

- (void)dealloc 
{
    [AgoraChatClient.sharedClient removeMultiDevicesDelegate:self];
}

#pragma mark - AgoraChatMultiDevicesDelegate
- (void)multiDevicesContactEventDidReceive:(AgoraChatMultiDevicesEvent)aEvent
                                  username:(NSString *)aUsername
                                       ext:(NSString *)aExt 
{
    switch (aEvent) {
        //当前用户在其他设备上删除好友。
        case AgoraChatMultiDevicesEventContactRemove:
            break;
        //当前用户在其他设备上接受好友请求。
        case AgoraChatMultiDevicesEventContactAccept:
            break;
        //当前用户在其他设备上拒绝好友请求。 
        case AgoraChatMultiDevicesEventContactDecline:
            break;
        //当前用户在其他设备上将好友加入黑名单。  
        case AgoraChatMultiDevicesEventContactBan:
            break;
        //当前用户在其他设备上将好友移出黑名单。 
        case AgoraChatMultiDevicesEventContactAllow:
            break;
        default:
            break;
   }
}

- (void)multiDevicesGroupEventDidReceive:(AgoraChatMultiDevicesEvent)aEvent
                                 groupId:(NSString *)aGroupId
                                     ext:(id)aExt {
    switch (aEvent) {
        //当前⽤户在其他设备创建了群组。
        case AgoraChatMultiDevicesEventGroupCreate:
            break;
        //当前⽤户在其他设备销毁了群组。
        case AgoraChatMultiDevicesEventGroupDestroy:
            break;
        //当前⽤户在其他设备已经加⼊群组。
        case AgoraChatMultiDevicesEventGroupJoin:
            break;
        //当前⽤户在其他设备已经离开群组。
        case AgoraChatMultiDevicesEventGroupLeave:
            break;
        //当前⽤户在其他设备发起了群组申请。
        case AgoraChatMultiDevicesEventGroupApply:
            break;
        //当前⽤户在其他设备同意了群组申请。
        case AgoraChatMultiDevicesEventGroupApplyAccept:
            break;
        //当前⽤户在其他设备拒绝了群组申请。
        case AgoraChatMultiDevicesEventGroupApplyDecline:
            break;
        //当前⽤户在其他设备邀请了群成员。
        case AgoraChatMultiDevicesEventGroupInvite:
            break;
        //当前⽤户在其他设备同意了群组邀请。
        case AgoraChatMultiDevicesEventGroupInviteAccept:
            break;
        //当前⽤户在其他设备拒绝了群组邀请。
        case AgoraChatMultiDevicesEventGroupInviteDecline:
            break;
        //当前⽤户在其他设备将某⼈踢出群。
        case AgoraChatMultiDevicesEventGroupKick:
            break;
        //当前⽤户在其他设备将成员加⼊群组⿊名单。
        case AgoraChatMultiDevicesEventGroupBan:
            break;
        //当前⽤户在其他设备将成员移除群组⿊名单。
        case AgoraChatMultiDevicesEventGroupAllow:
            break;
        //当前⽤户在其他设备屏蔽群组。
        case AgoraChatMultiDevicesEventGroupBlock:
            break;
        //当前⽤户在其他设备取消群组屏蔽。
        case AgoraChatMultiDevicesEventGroupUnBlock:
            break;
        //当前⽤户在其他设备转移群主。
        case AgoraChatMultiDevicesEventGroupAssignOwner:
            break;
        //当前⽤户在其他设备添加管理员。
        case AgoraChatMultiDevicesEventGroupAddAdmin:
            break;
        //当前⽤户在其他设备移除管理员。
        case AgoraChatMultiDevicesEventGroupRemoveAdmin:
            break;
        //当前⽤户在其他设备禁⾔⽤户。
        case AgoraChatMultiDevicesEventGroupAddMute:
            break;
        //当前⽤户在其他设备移除禁⾔。
        case AgoraChatMultiDevicesEventGroupRemoveMute:
            break;
        //当前⽤户在其他设备设置了群成员自定义属性。
        case AgoraChatMultiDevicesEventGroupMemberAttributesChanged:
            break;
        default:
            break;
    }
}

- (void)multiDevicesConversationEvent:(AgoraChatMultiDevicesEvent)aEvent conversationId:(NSString *)conversationId conversationType:(AgoraChatConversationType)conversationType
{
    switch (aEvent) {
        // 当前用户在其他设备上置顶会话。
        case AgoraChatMultiDevicesEventConversationPinned:
            break;
        // 当前用户在其他设备上取消会话置顶。
        case AgoraChatMultiDevicesEventConversationUnpinned:
            break;
        // 当前用户在其他设备上删除了服务端的会话。
        case AgoraChatMultiDevicesEventConversationDelete:
            break;
        // 当前用户在其他设备上更新了会话标记，包括添加和移除会话标记。
        case AgoraChatMultiDevicesEventConversationUpdateMark:
            break; 
        // 当前用户在其他设备更新了会话免打扰设置。
        case AgoraChatMultiDevicesEventConversationMuteInfoChanged:
            break;           
        default:
            break;
    }
}

// 当前用户在其他设备上单向删除服务端某个会话的历史消息。
- (void)multiDevicesMessageBeRemoved:(NSString *)conversationId deviceId:(NSString *)deviceId
{
    
}
```

### 典型示例

当 PC 端和移动端登录同一个账号时，在移动端可以通过调用方法获取到 PC 端的登录 ID。该登录 ID 相当于特殊的好友用户 ID，可以直接使用于聊天，使用方法与好友的用户 ID 类似。

```objectivec
 NSArray *otherPlatformIds = [[AgoraChatClient sharedClient].contactManager getSelfIdsOnOtherPlatformWithError:nil];
if ([otherPlatformIds count] > 0) {
    NSString *chatter = otherPlatformIds[0];
    //获取会话
    AgoraChatConversation *conversation = [[AgoraChatClient sharedClient].chatManager getConversation:chatter type:AgoraChatConversationTypeChat createIfNotExist:YES];

    //发送消息
    NSString *sendText = @"test";
    AgoraChatTextMessageBody *body = [[AgoraChatTextMessageBody alloc] initWithText:sendText];
    NSString *from = [[AgoraChatClient sharedClient] currentUsername];
    AgoraChatMessage *message = [[AgoraChatMessage alloc] initWithConversationID:conversation.conversationId from:from to:chatter body:body ext:nil];
    message.chatType = AgoraChatTypeChat;
    [[AgoraChatClient sharedClient].chatManager sendMessage:message progress:nil completion:nil];
 }
```
