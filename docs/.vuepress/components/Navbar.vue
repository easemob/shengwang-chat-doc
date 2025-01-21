<script setup>
import Navbar from "vuepress-theme-hope/modules/navbar/components/Navbar.js";
import { useThemeLocaleData } from "vuepress-theme-hope/composables/index";

const themeData = useThemeLocaleData();
const extraNavList = themeData.value.extra_nav || [];

const goHome = () => {
  window.open("https://www.shengwang.cn", "_blank");
};
</script>

<template>
  <Navbar>
    <template #startAfter>
      <div
        class="hide-on-phone w-43px h-22px bg-[url('/logo.svg')] bg-no-repeat bg-center bg-cover !mr-16px cursor-pointer"
        @click="goHome"
      ></div>
      <a
        href="https://doc.shengwang.cn/"
        target="_blank"
        class="color-black text-18px font-500 cursor-pointer"
      >
        <span>文档中心</span>
      </a>
      <span class="color-#505E72">|</span>
      <a
        href="https://im.shengwang.cn/"
        class="color-black text-18px font-500 cursor-pointer"
      >
        <view class="text-14px color-black font-500"> 即时通讯IM </view>
      </a>
    </template>
    <template #endBefore>
      <Docsearch />
      <el-link
        class="extra-link"
        :type="item.type"
        v-for="item in extraNavList"
        :key="item.text"
        :href="item.link"
        >{{ item.text }}
      </el-link>
    </template>
  </Navbar>
</template>

<style scope></style>
