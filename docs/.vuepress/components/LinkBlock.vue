<template>
  <a
    :href="href"
    :target="isOpenNewTab ? '_blank' : '_self'"
    :rel="isOpenNewTab ? 'noreferrer' : ''"
    class="custom-component-link-block block px-2 py-3 transition-all hover:bg-gray-100 !hover:no-underline"
  >
    <div class="flex items-center">
      <ImageItem
        :src="icon"
        :style="{ width: '24px' }"
        :no-view="true"
        class="flex-shrink-0"
        alt="link icon"
      />

      <div class="ml-4 min-w-0">
        <div class="flex items-center">
          <div class="text-ellipsis min-w-0 text-lg font-semibold text-title">
            {{ title }}
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ml-2 w-6 h-6 flex-shrink-0 flex-grow-0"
          >
            <path
              d="M4 12H20M20 12L14 6M20 12L14 18"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>

    <div v-if="desc" class="mt-2 ml-10 text-sm text-normal">
      {{ desc }}
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ImageItem from "./ImageItem.vue";

interface Props {
  /**
   * 跳转链接
   */
  href: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 描述。不传递时仅展示标题
   */
  desc?: string;
  /**
   * 显式设置需要以新开标签页的形式跳转。不设置时将根据是否以 http 开头来判断
   */
  openNewTab?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  href: "/",
  icon: "/img/icons/document.svg",
  title: "标题",
  desc: "",
  openNewTab: false
});

const isOpenNewTab = computed(
  () => props.openNewTab || props.href.startsWith("http")
);
</script>

<style scoped>
a {
  text-decoration: none;
}

.text-title {
  color: #1f2937;
}

.text-normal {
  color: #4b5563;
}
</style>
