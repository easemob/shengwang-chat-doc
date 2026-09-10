import { sidebar } from "vuepress-theme-hope";
import { DOC_SIDEBAR } from "./document-v4";
import { DOC_V5_SIDEBAR } from "./document";
import { CALL_KIT_SIDEBAR } from "./callkit";
import { PUSH_SIDEBAR } from "./push";
import { TRANSLATION_SIDEBAR } from "./translation";
import { LEGACY_SDK_SIDEBAR } from "./legacy-sdk";
import { CHAT_UIKIT_SIDEBAR, CHATROOM_UIKIT_SIDEBAR } from "./uikit";

export const zhSidebar = sidebar({
  "/docs/product/": [
    { text: "产品动态", link: "product_dynamics.html" },
    { text: "产品简介", link: "introduction.html" },
    { type: "separator" } as any,
    { text: "开通 IM 服务", link: "enable_im.html" },
    { text: "购买指南", 
      collapsible: true,
      children: [
        { text: "计费策略", link: "pricing_policy.html"},
        { text: "套餐包功能对比", link: "product_package_feature.html"},
      ],
    }, 
    { text: "功能介绍", 
      collapsible: true,
      children: [
        { text: "功能列表", link: "product_function.html" },
        { text: "各类会话的功能", link: "conversation_function.html" },
        { text: "功能详情", 
          collapsible: true,
          children: [
            { text: "用户相关", 
              collapsible: true,
              children: [
              { text: "用户注册与登录", link: "product_user_registration_login.html" },
              { text: "在线状态管理", link: "product_user_presence.html" },
              { text: "用户属性", link: "product_user_attribute.html" },
              { text: "用户关系", link: "product_user_relationship.html" },
              ],
             },
             { text: "消息管理", 
               collapsible: true,
               children: [
                { text: "消息概述", link: "product_message_overview.html" },
                { text: "单聊消息", link: "message_single_chat.html" },
                { text: "群组消息", link: "message_group.html" },
                { text: "聊天室消息", link: "message_chatroom.html" },
                { text: "消息存储", link: "message_store.html" },
                { text: "消息格式", link: "product_message_format.html" },
               ],
              },
              { text: "离线推送", link: "product_offline_push_overview.html" },
              { text: "群组管理", 
                collapsible: true,
                children: [
                { text: "群组概述", link: "product_group_overview.html" },
                { text: "消息话题", link: "product_thread_overview.html" },
                ],
              },
              { text: "聊天室", link: "product_chatroom_overview.html" },
            ],
          },
        ],
      },
    { text: "使用限制", link: "limitation.html" },
    { text: "数据中心", link: "data_center.html" },
    // {
    //   text: "Demo",
    //   collapsible: true,
    //   children: [
    //     { text: "体验 Demo", link: "demo.html" },
    //   ],
    // },
    // {
    //   text: "增值服务",
    //   collapsible: true,
    //   children: [
    //    {
    //   text: "消息翻译",
    //   collapsible: true,
    //   children: [
    //     { text: "Android", link: "message_translation_android.html" },
    //     { text: "iOS", link: "message_translation_ios.html" },
    //     { text: "Web", link: "message_translation_web.html" },
    //     { text: "小程序", link: "message_translation_applet.html" },
    //     { text: "Flutter", link: "message_translation_flutter.html" },
    //     { text: "React Native", link: "message_translation_react-native.html" },
    //     { text: "Unity", link: "message_translation_unity.html" },
    //     { text: "Windows", link: "message_translation_windows.html" },
    //   ],
    // }, 
    //   
    //  ],
    // },
    // {
    //  text: "常见方案",
    //  collapsible: true,
    //  children: [
    //    { text: "群 @ 消息", link: "solution_common/group_@.html" },
    //    { text: "消息引用", link: "solution_common/message_quote.html" },
    //    { text: "实现输入指示器", link: "solution_common/typing_indication.html" },
    //    { text: "迁移到环信", link: "solution_common/migrate_to_easemob.html" },
    //  ],
    //},
    {
      text: "安全",
      collapsible: true,
      children: [
        { text: "安全最佳实践", link: "security_best_practices.html" },
        { text: "GDPR 安全合规", link: "GDPR.html" },
        {text: "SDK合规使用说明", link:"https://www.easemob.com/news/privacy"},
      ],
    },
    // {
    //   text: "帮助中心",
    //   collapsible: true,
    //   children: [
    //   {
    //   text: "FAQ",
    //   collapsible: true,
    //   children: [
    //     { text: "FAQ 质量", link: "faq_quality_issues.html" },
    //     { text: "FAQ 集成", link: "faq_integration_issues.html" },
    //     ],
    //   },
      
    //  ],
    // },
    { text: "术语表", link: "glossary.html" },
    { type: "separator" } as any,
  ],
  "/product/": [
    { text: "产品动态", link: "/docs/product/product_dynamics.html" },
    { text: "产品简介", link: "/docs/product/introduction.html" },
  ],
  ...DOC_SIDEBAR,
  ...DOC_V5_SIDEBAR,
  ...CALL_KIT_SIDEBAR,
  "/docs/value-added/push":PUSH_SIDEBAR,
  "/docs/value-added/translation":TRANSLATION_SIDEBAR,
  "/value-added/push":PUSH_SIDEBAR,
  "/value-added/translation":TRANSLATION_SIDEBAR,
  ...LEGACY_SDK_SIDEBAR,
  ...CHAT_UIKIT_SIDEBAR,
  ...CHATROOM_UIKIT_SIDEBAR,
});
