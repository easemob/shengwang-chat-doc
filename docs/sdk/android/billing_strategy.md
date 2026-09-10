# 计费策略

本文将向你介绍即时通讯 IM 的计费策略，包括套餐计划、套餐配额与价格、套餐服务支持等信息。

## 套餐计划

即时通讯 IM 为不同业务阶段的用户提供了 **免费版**、**尊享版**、**企业版** 三种套餐服务，用户可以根据自己业务用量情况进行合理选择，优化成本支出。


<el-row :gutter="16" :style="{rowGap:'16px'}">
  <el-col :xs="24" :md="12" :lg="8">
  <Card height="480px" >
  <Text color="rgb(0, 136, 71)">

  **免费版**

  </Text>
   免费体验所有产品特性

<br/>
<br/>
<br/>

- 注册用户数 100 <br/>
- 群成员数 100 <br/>
- 聊天室成员数 100 <br/>
- 消息存储时长 3天 <br/>


✅ 全球接入 <br/>
✅ 用户管理 <br/>
✅ 消息功能 <br/>
✅ 群组和聊天室功能 <br/>
✅ 离线推送 <br/>

  </Card>
  </el-col>

  <el-col :xs="24" :md="12" :lg="8">
  <Card height="480px" >
  <Text color="rgb(4, 4, 4)">

  **尊享版**

  </Text>

 面向成长性企业，提供业务支撑的所有特性

- 注册用户数 无限制 <br/>
- 群成员数 6000 <br/>
- 聊天室成员数 50000 <br/>
- 消息存储时长 90 天 <br/>


✅ 包含免费版所有功能 <br/>
✅ 全球加速网络 <br/>
✅ 服务端回调 <br/>
✅ 多端多设备同步 <br/>
✅ 高级消息特性 <br/>
✅ 聊天室消息流控 <br/>
✅ 用户状态同步 <br/>
  </Card>
  </el-col>

  <el-col :xs="24" :md="12" :lg="8">
  <Card height="480px" >
  <Text color="rgb(52, 109, 219)">

  **企业版**

  </Text>
 提供定制化配置，按照用量计费

- 注册用户数 无限制<br/>
- 群成员数 按需定制<br/>
- 聊天室成员数 按需定制<br/>
- 消息存储时长 按需定制<br/>

✅ 包含尊享版所有功能<br/>
✅ 群组和聊天室按需扩容<br/>
✅ 高可靠服务端回调<br/>
✅ 消息存储时长按需调整<br/>
✅ 专属服务支持
  </Card>
  </el-col>

</el-row>  


你可以在声网后台随时查阅用量情况并导出数据，也可以升级或降级套餐计划，升级套餐立即生效，降级套餐次月生效。

### 企业套餐服务特权

如果你需要突破一些使用限制或具有定制化服务需求，企业套餐可满足以下需求：

<el-row :gutter="16" :style="{rowGap:'16px'}">
  <el-col :xs="24" :md="12">
  <Card height="240px" >
  <Text >

  **优质服务支持**

  </Text>

  - 99.95% 正常运行时间 SLA 保证
  - 24 × 7 × 365 服务支持
  - < 1 工作小时响应
  - 电话和企业微信在线
  </Card>
  </el-col>

  <el-col :xs="24" :md="12">
  <Card height="240px" >
  <Text >

  **技术专家架构指导**

  </Text>

  - 优质实践方案指导建议
  - 技术专家协助审查方案
  - 专属 SA 跟踪服务
  - 集成，测试，上线，运营全周期支持
  </Card>
  </el-col>

  <el-col :xs="24" :md="12">
  <Card height="240px" >
  <Text >

  **定制化需求服务**

  </Text>

  - Geo-fencing 支持
  - GDPR & HIPAA 合规保证
  - 数据区域路由限定
  - 定制化需求配置
  - 私有化部署支持
  </Card>
  </el-col>

  <el-col :xs="24" :md="12">
  <Card height="240px" >
  <Text >

  **基于用量保证的折扣**

  </Text>

  - 专享折扣
  - 与声网其他产品的优惠组合
  </Card>
  </el-col>
</el-row>

## 套餐配额与价格

| 配额/套餐类型    | 免费版套餐   | 尊享版套餐 | 企业版套餐 |
| :------- | :-------- | :------- |  :------- | 
| 免费峰值日活数（DAU）      | 100      | 10,000      |  按需定制 |
| 峰值群组+聊天室数量     | 100      | 100,000     | 按需定制 |
| 附件流量 | 10 GB | 150 GB      | 按需定制 |
| 附件存储 | 10 GB | 1 TB      | 按需定制 |
| RESTful API QPS | 10 QPS | 100 QPS      | 按需定制 |
| 分发消息量 | / | 10,000,000/日 | 按需定制 |
| 套餐价格（/月） | 0 | 3999 RMB      |  联系商务 |

## 超额价格

对于超出套餐额度的用量，声网按照本节介绍的计费策略收费。

### 免费版套餐

免费版套餐的目的在于让开发者体验即时通讯 IM 的产品特性及业务测试。在超出套餐配额后继续使用，会面临即时通讯 IM 服务关停的风险，直到你升级套餐才可继续使用。我们会在你即将超额时发送提示消息。

### 尊享版和企业版套餐

| 配额/套餐类型    | 尊享版套餐 | 企业版套餐 |
| :------- | :------- |  :------- | 
| 峰值日活数（DAU）      | ￥1000 元/10,000 DAU   |  按需定制 |
| 峰值群组+聊天室数     | ￥1000 元/100,000 个    | 按需定制 |
| 附件流量 | ￥1 元/GB     | 按需定制 |
| 附件存储  | ￥0.5 元/GB     | 按需定制 |
| RESTful API QPS | 若提升，需购买单独 QPS 包，详见 [RESTful API 超额计费](/docs/sdk/server-side/limitationapi.html#超额计费)。 | 按需定制 |
| 分发消息量 | ￥ 300 元/千万条消息 | 按需定制 |

:::tip
峰值日活跃用户数、峰值群组和聊天室数、附件流量、附件存储和分发消息量的计量规则，详见[计量规则](billing_rules.html)。
:::

## 套餐服务对比

<table width="100%">
<tbody>
<tr>
<td width="10%">
<p>特性</p>
</td>
<td width="10%">
<p>功能描述</p>
</td>
<td width="7%">
<p>免费版</p>
</td>
<td width="7%">
<p>尊享版</p>
</td>
<td width="14%">
<p>企业版</p>
</td>
</tr>
<tr>
<td rowspan="4" width="10%">
<p>用户</p>
</td>
<td width="59%">
<p>好友人数</p>
</td>
<td width="7%">
<p>100</p>
</td>
<td width="7%">
<p>10000</p>
</td>
<td width="14%">
<p>默认10000（可调整）</p>
</td>
</tr>
<tr>
<td width="59%">
<p>注册用户数</p>
</td>
<td width="7%">
<p>100</p>
</td>
<td width="7%">
<p>无上限</p>
</td>
<td width="14%">
<p>无上限</p>
</td>
</tr>
<tr>
<td width="59%">
<p>用户属性（提供用户头像、昵称、邮箱等数据存储服务）</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>用户在线状态订阅（Presence）</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td rowspan="9" width="10%">
<p>消息</p>
</td>
<td width="59%">
<p>消息云存储（提供消息的存储服务，支持历史消息、漫游消息、离线消息）</p>
</td>
<td width="7%">
<p>3天</p>
</td>
<td width="7%">
<p>90天</p>
</td>
<td width="14%">
<p>默认180天 （可调整）</p>
</td>
</tr>
<tr>
<td width="59%">
<p>全消息类型（包括：文本、表情、语音、视频、图片、位置、透传、自定义等消息）</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>自定义消息（根据业务需求灵活定制消息内容和功能）</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>透传消息（作为控制指令）</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>离线消息（支持单聊/群聊离线消息，上线后可拉取离线消息）</p>
</td>
<td width="7%">
<p>✓【3天】</p>
</td>
<td width="7%">
<p>✓【7天】</p>
</td>
<td width="14%">
<p>默认7天（可调整）</p>
</td>
</tr>
<tr>
<td width="59%">
<p>附件消息</p>
</td>
<td width="7%">
<p>✓【3天】</p>
</td>
<td width="7%">
<p>✓【7天】</p>
</td>
<td width="14%">
<p>默认7天（可调整）</p>
</td>
</tr>
<tr>
<td width="59%">
<p>消息已读回执（接收方消息已读后发送方消息已读状态及时变更）</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>消息撤回（支持客户端/服务端调用）</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>消息表情回复（Reaction）</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td rowspan="5" width="10%">
<p>群组</p>
</td>
<td width="59%">
<p>群组总数</p>
</td>
<td width="7%">
<p>100</p>
</td>
<td width="7%">
<p>无上限</p>
</td>
<td width="14%">
<p>无上限</p>
</td>
</tr>
<tr>
<td width="59%">
<p>群成员数</p>
</td>
<td width="7%">
<p>100</p>
</td>
<td width="7%">
<p>6,000</p>
</td>
<td width="14%">
<p>默认6000（可调整）</p>
</td>
</tr>
<tr>
<td width="59%">
<p>单个用户可加入群组数</p>
</td>
<td width="7%">
<p>100</p>
</td>
<td width="7%">
<p>10000</p>
</td>
<td width="14%">
<p>默认10000（可调整）</p>
</td>
</tr>
<tr>
<td width="59%">
<p>群公告</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>群共享文件</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td rowspan="7" width="10%">
<p>聊天室</p>
</td>
<td width="59%">
<p>聊天室总数</p>
</td>
<td width="7%">
<p>100</p>
</td>
<td width="7%">
<p>无上限</p>
</td>
<td width="14%">
<p>无上限</p>
</td>
</tr>
<tr>
<td width="59%">
<p>聊天室成员数</p>
</td>
<td width="7%">
<p>100</p>
</td>
<td width="7%">
<p>50000</p>
</td>
<td width="14%">
<p>默认50000（可调整）</p>
</td>
</tr>
<tr>
<td width="59%">
<p>聊天室公告</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>聊天室全局禁言</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>聊天室成员白名单（只允许选定用户发送消息）</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>聊天室获取漫游消息</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>X</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>聊天室广播消息</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td rowspan="2" width="10%">
<p>离线推送</p>
</td>
<td width="59%">
<p>离线推送通知（支持苹果 （APNs）、谷歌（FCM）、华为、小米、OPPO、VIVO、魅族，自定义铃声和扩展）</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>消息免打扰（在设定时间内不会收到厂商离线推送通知）</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="10%">
<p>子区</p>
</td>
<td width="59%">
<p>消息子区</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td rowspan="4" width="10%">
<p>回调</p>
</td>
<td width="59%">
<p>消息&amp;事件回调（提供全量消息路由转发，支持消息和多种事件类型）</p>
</td>
<td width="7%">
<p>X</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>用户状态回调（通过回调方式同步用户离在线状态）</p>
</td>
<td width="7%">
<p>X</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>发送前回调（用于服务端对接第三方服务扩展）</p>
</td>
<td width="7%">
<p>X</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>回调消息&amp;事件存储（回调接收服务不可用时，存储所有回调内容用于恢复）</p>
</td>
<td width="7%">
<p>X</p>
</td>
<td width="7%">
<p>X</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="10%">
<p>服务端会话列表</p>
</td>
<td width="59%">
<p>从服务端获取会话列表</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="10%">
<p>多设备登录</p>
</td>
<td width="59%">
<p>相同账号多设备登录且保持信息同步</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td rowspan="3" width="10%">
<p>安全</p>
</td>
<td width="59%">
<p>TLS/SSL 传输加密</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>AES256 存储加密</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="59%">
<p>用户信息删除 API</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
<tr>
<td width="10%">
<p>网络</p>
</td>
<td width="59%">
<p>全球网络加速</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="7%">
<p>✓</p>
</td>
<td width="14%">
<p>✓</p>
</td>
</tr>
</tbody>
</table>