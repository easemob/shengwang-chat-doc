---
title: 文档指引
---

## RTM 是什么？

**实时消息**（Real-Time Messaging，RTM）为开发者提供一整套低延时、高并发、可扩展、高可靠的实时消息及状态同步解决方案。RTM 负责管理应用程序实时通信层所需的基础设施。为方便用户开发与创新，RTM 在保障 99.95% 的 SLA 正常运行时间的同时，提供丰富的 Demo App 及开放的第三方 API 扩展。

<Card padding="32px" borderSize="large">
  <el-row :gutter="32">
      <el-col :span="24" :md="12" :lg="12" :xl="12" >
      <ImageItem src="/landing-page/chat.png" />
    </el-col>
    <el-col :span="24" :md="12" :lg="12" :xl="12">
      <p>
        RTM 沉淀了声网多年的技术经验、应用了分布全球的网络部署，并由具备丰富经验的产品和研发专家团队维护。在使用 RTM 的过程中，用户可以借助声网团队的专业知识和运营技能，快速接入可靠的消息/信令传输与实时状态同步数据流网络，避免自行开发、运维带来的高成本和高风险。
      </p>
    </el-col>
  </el-row>
</Card>

<div style="margin-top: 30px;"></div>

## RTM 应用场景

RTM 已被 3000+ 客户广泛应用在以下领域，如果你对某个场景感兴趣，可以联系声网 RTM 团队（rtm-support@agora.io）获得更多信息。

<IndexImageGallery
  :aspect-ratio="2.22"
  :list="[
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '元宇宙' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '互动游戏' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '在线教育' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '元宇宙' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '互动游戏' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '在线教育' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '元宇宙' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '互动游戏' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '在线教育' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '元宇宙' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '互动游戏' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '在线教育' },
  ]"
/>

<div style="margin-top: 30px;"></div>

## 如何快速开始？

根据你对 RTM 的了解程度，在下方选择一条路径开启学习：

<el-row :gutter="32" style="row-gap: 32px;">
  <el-col :xs="24" :md="12" :xl="12">
    <LinkList 
    icon="https://i.imgur.com/lSh0OxL.jpeg" 
    title="首次集成 RTM" 
    :href="[{title:'开通服务', href:'./get-started/enable-service'}, {title:'实现收发消息', href:'./get-started/quick-start'}]"
    >
    如果你首次集成 RTM，请查看以下文档了解如何开通服务并实现收发消息。
    </LinkList>
  </el-col>

  <el-col :xs="24" :md="12" :xl="12">
    <LinkList
      icon="https://i.imgur.com/lSh0OxL.jpeg"
      title="从旧版本升级至 v2"
      :href="[{title:'迁移指南', href:'./overview/migration-guide'}]"
    >
      如果你是 RTM 旧版本的用户，想要升级至 v2 体验新特性，请参考迁移指南。
    </LinkList>
  </el-col>
</el-row>

<br/>

成功实现收发消息基础功能后，你还可以查看如下文档，加深对 RTM 的理解：

<LinkBlock icon="/landing-page/guide.svg" :href="`/doc/rtm2/user-guide/setup/account-and-billing`" title="使用指南" desc="系统地了解 RTM 产品的功能特性，并在此过程中掌握使用方法。" />

<LinkBlock icon="/landing-page/api.svg" :href="`/api-ref/rtm2/toc-configuration/configuration`" title="API 参考" desc="了解 RTM SDK 各 API 的详细说明。" />

<div style={{marginTop:30}}></div>

## RTM 如何计费？

RTM 为不同业务阶段的用户提供了 **体验版**、**自助版**、**企业版** 三种套餐服务，用户可以根据自己业务用量情况进行合理选择，优化成本支出。


<el-row :gutter="16" :style="{rowGap:'16px'}">
  <el-col :span="24" :md="12"  :lg="8">
    <ListPanel title="体验套餐" desc="免费体验产品所有特性" :height="248">
      <ListItem type="support">3,000,000 条消息/月</ListItem>
      <ListItem type="support">100 峰值链接数/月</ListItem>
      <ListItem type="support">1 GB 免费存储容量/月</ListItem>
      <ListItem type="support">1 GB 免费存储容量/月</ListItem>
    </ListPanel>
  </el-col>
  <el-col :span="24" :md="12" :lg="8">
    <ListPanel theme="yellow" title="自助套餐" desc="灵活选择，助力业务加速" :height="248">
      <ListItem type="support">套餐灵活选择</ListItem>
      <ListItem type="support">12 × 7 小时服务支持</ListItem>
      <ListItem type="support">99.95% SLA 保障</ListItem>
    </ListPanel>
  </el-col>
  <el-col :span="24" :md="12"  :lg="8">
    <ListPanel theme="blue" title="企业套餐" desc="随用随付，专属服务" :height="248">
      <ListItem type="support">专属 SA 24 × 7 小时支持</ListItem>
      <ListItem type="support">专属技术专家架构指导</ListItem>
      <ListItem type="support">基于用量保证的折扣</ListItem>
      <ListItem type="support">定制化需求服务</ListItem>
      <ListItem type="support">GDPR & HIPAA 合规保证</ListItem>
    </ListPanel>
  </el-col>
</el-row>

<div style="margin-top: 30px;"></div>

<LinkCardV2 icon="/landing-page/bill.svg" :href="`/doc/rtm2/overview/billing/billing-strategy`" title="计费说明" desc="了解关于价格、套餐及服务的更多信息。" />

## 常见问题解答

声网非常重视用户体验，深知在使用新工具或新服务进行开发时可能会遇到各种问题和困惑。因此，声网致力于为用户提供优质的技术服务，包括梳理数千家客户在使用 RTM 产品过程中产生的常见问题，整理成常见问题文档，以便开发者快速、准确、方便地查询和解决问题。

通过访问以下页面，你可以查看声网整理的常见问题文档，并找到你感兴趣的内容。如果你在使用 RTM 产品的过程中遇到了任何问题或疑问，也可以随时联系声网 RTM 团队（rtm-support@agora.io），他们将会尽快为你提供帮助。

<LinkCardV2 icon="/landing-page/question.svg" :href="`/doc/rtm2/overview/billing/billing-strategy`" title="常见问题" />
