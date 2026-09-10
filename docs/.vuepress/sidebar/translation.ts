import { TreeOptionsEnum } from "element-plus/lib/components/tree-v2/src/virtual-tree.js";

export const TRANSLATION_SIDEBAR = [
{ text: 'Android', link: '/docs/value-added/translation/message_translation_android.html' },
{ text: 'iOS', link: '/docs/value-added/translation/message_translation_ios.html' },
{ text: 'Web', link: '/docs/value-added/translation/message_translation_web.html' },
{ text: '小程序', link: '/docs/value-added/translation/message_translation_applet.html' },
{ text: 'Flutter', link: '/docs/value-added/translation/message_translation_flutter.html' },
{ text: 'React Native', link: '/docs/value-added/translation/message_translation_react-native.html' },
{ text: 'Unity', link: '/docs/value-added/translation/message_translation_unity.html' },
{ text: 'Windows', link: '/docs/value-added/translation/message_translation_windows.html' },
{
              text: "服务端",
              collapsible: false,
              children: [
                {
                  text: "翻译消息内容",
                  link: "/docs/value-added/translation/message_translation_text_rest.html",
                },
                {
                  text: "获取翻译语言列表",
                  link: "/docs/value-added/translation/message_translation_language_list_rest.html",
                },
                {
                  text: "检测文本的源语言",
                  link: "/docs/value-added/translation/message_translation_detect_rest",
                },
              ],
            },
]
