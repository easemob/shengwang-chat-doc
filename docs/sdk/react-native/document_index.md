---
title: 文档指引
---

## 即时通讯 IM 是什么？

**即时通讯 IM** 为开发者提供高可靠、低时延、高并发、安全、全球化的即时聊天云服务，支持单聊、群聊、聊天室，提供多平台 SDK 支持，包括 Android、iOS、Web、Windows、Unity、Flutter、React Native 和小程序，同时提供服务端 RESTful API 以及单群聊 UIKit，帮助开发者快速构建端到端的即时通讯场景。

<Card padding="32px" borderSize="large">
  <el-row :gutter="32">
      <el-col :span="24" :md="12" :lg="12" :xl="12" >
      <ImageItem src="/landing-page/chat.png" />
    </el-col>
    <el-col :span="24" :md="12" :lg="12" :xl="12">
      <p>
		即时通讯 IM 沉淀了 10 年的技术经验、部署了分布全球的数据中心，应用了分布全球的网络部署，并由丰富经验的产品和研发专家团队维护。在使用即时通讯 IM 的过程中，用户可以借助声网团队的专业知识和运营技能，快速接入可靠的即时通讯 IM 功能，避免自行开发、运维带来的高成本和高风险。
      </p>
    </el-col>
  </el-row>
</Card>

<div style="margin-top: 30px;"></div>

## 即时通讯 IM 应用场景

即时通讯 IM 广泛应用在以下领域，如果你对某个场景感兴趣，可以联系声网即时通讯 IM 团队获得更多信息。

<IndexImageGallery
  :aspect-ratio="2.22"
  :list="[
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '陌生人社交' },
    { img: 'https://doc.shengwang.cn/assets/images/collaborative-work-e0e161d8c5efe33446e8e22e94bff720.png', text: '互动直播' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '语聊房' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '1v1社交' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: 'AI陪伴' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '线上招聘' },
    { img: 'https://doc.shengwang.cn/assets/images/iot-0bbd27d2bfbf330e652ff8a0376499ab.png', text: '企业协作' },
    { img: 'https://doc.shengwang.cn/assets/images/metaverse-e305ea383525fea1596024f13b8e6627.png', text: '客服沟通' },
  ]"
/>

<div style="margin-top: 30px;"></div>

## 如何快速开始？

根据你对即时通讯 IM 的了解程度，在下方选择一条路径开启学习：

<el-row :gutter="32" style="row-gap: 32px;">
<el-col :xs="24" :md="12" :xl="12">
    <LinkList 
    icon="/landing-page/quickStart.jpeg" 
    title="首次集成即时通讯 IM" 
    :href="[{title:'开通服务', href:'./enable_im.html'}, {title:'实现收发消息', href:'./quickstart.html'}]"
    >
    如果你首次集成即时通讯 IM，请查看以下文档了解如何开通服务并实现收发消息。
    </LinkList>
  </el-col>

<el-col :xs="24" :md="12" :xl="12">
    <LinkList
      icon="/landing-page/quickStart.jpeg"
      title="即时通讯 IM 的主要特性"
      :href="[{title:'特性介绍', href:'./product_message_overview.html'}]"
    >
    你可以了解即时通讯 IM 的消息、群组、聊天室、用户关系与属性以及离线推送等特性。
    </LinkList>
  </el-col> 
</el-row>

<br/>

成功实现收发消息基础功能后，你还可以查看如下文档，加深对即时通讯 IM 的理解：

<LinkBlock icon="/landing-page/guide.svg" :href="`/docs/sdk/react-native/integration.html`" title="使用指南" desc="系统地了解即时通讯 IM 产品的功能特性，并在此过程中掌握使用方法。" />

<LinkBlock icon="/landing-page/api.svg" :href="`/docs/sdk/react-native/api_reference_overview.html`" title="API 参考" desc="了解即时通讯 IM SDK 各 API 的详细说明。" />

<div style={{marginTop:30}}></div>

## 即时通讯 IM 如何计费？

IM 为不同业务阶段的用户提供了以下套餐，用户可以根据自己业务用量情况进行合理选择，优化成本支出。

- 体验套餐：**免费版**
- 自服务套餐：**基础版**、**尊享版**、**旗舰版**
- 企业套餐：**企业版**

## 即时通讯 IM 如何计费？

即时通讯 IM 为不同业务阶段的用户提供了 2 种套餐类型，用户可以根据自己业务用量情况进行合理选择，优化成本支出。

- 体验套餐： **免费版**
- 企业套餐：**企业版**

<el-row :gutter="16" :style="{rowGap:'16px'}">
  <el-col :span="24" :md="12"  >
    <ListPanel title="体验套餐" desc="免费体验产品所有特性" :height="248">
      <ListItem type="support">100 峰值日活</ListItem>
      <ListItem type="support">100 峰值群组和聊天室数</ListItem>
      <ListItem type="support">10 GB 免费附件流量/月</ListItem>
      <ListItem type="support">10 GB 免费附件存储/月</ListItem>
    </ListPanel>
  </el-col>
  <el-col :span="24" :md="12" >
    <ListPanel theme="blue" title="企业套餐" desc="专属支撑，专属服务" :height="248">
      <ListItem type="support">专属 SA 24 × 7 小时支持</ListItem>
      <ListItem type="support">专属技术专家架构指导</ListItem>
      <ListItem type="support">基于用量保证的折扣</ListItem>
      <ListItem type="support">定制化需求服务</ListItem>
      <ListItem type="support">GDPR & HIPAA 合规保证</ListItem>
    </ListPanel>
  </el-col>
</el-row>

<div style="margin-top: 30px;"></div>

<LinkCardV2 icon="/landing-page/bill.svg" :href="`/docs/sdk/react-native/billing_strategy.html`" title="计费说明" desc="了解关于价格、套餐及服务的更多信息。" />
