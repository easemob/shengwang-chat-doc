import { defineClientConfig } from "@vuepress/client";
import Container from "./components/Container.vue";
import Toc from "./components/Toc.vue";
import Link from "./components/Link.vue";
import ImageGallery from "./components/ImageGallery.vue";
import ImageItem from "./components/ImageItem.vue";
import WjxLayout from "./layouts/WjxLayout.vue";
import InstanceSearchLayout from "./layouts/InstanceSearchLayout.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "instantsearch.css/themes/algolia-min.css";
import InstantSearch from "vue-instantsearch/vue3/es/index.js";
import BiliBiliPlayer from "./components/BiliBili.vue";
import Card from "./components/basic/Card.vue";
import Text from "./components/basic/Text.vue";
import IndexImageGallery from "./components/basic/IndexImageGallery.vue";
import LinkList from "./components/LinkList.vue";
import LinkBlock from "./components/LinkBlock.vue";
import ListItem from "./components/ListItem.vue";
import ListPanel from "./components/ListPanel.vue";
import LinkCardV2 from "./components/LinkCardV2.vue";
import "uno.css";

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component("Container", Container);
    app.use(ElementPlus);
    app.component("Toc", Toc);
    app.component("Link", Link);
    app.component("ImageGallery", ImageGallery);
    app.component("ImageItem", ImageItem);
    app.component("BiliBiliPlayer", BiliBiliPlayer);
    app.component("Card", Card);
    app.component("Text", Text);
    app.component("IndexImageGallery", IndexImageGallery);
    app.component("LinkList", LinkList);
    app.component("LinkBlock", LinkBlock);
    app.component("ListItem", ListItem);
    app.component("ListPanel", ListPanel);
    app.component("LinkCardV2", LinkCardV2);
    app.use(InstantSearch);
  },
  setup() {},
  layouts: {
    WjxLayout,
    InstanceSearchLayout
  },
  rootComponents: []
});
