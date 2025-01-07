<template>
  <div
    class="custom-component-link-list"
    :class="[
      'rounded border border-solid border-gray-200 shadow hover:shadow-xl pt-10 transition-all h-full box-border'
    ]"
  >
    <div class="px-6">
      <ImageItem :src="icon" :no-view="true" :style="`height: 40px;`" />
    </div>
    <div class="mt-4 px-6 text-lg font-semibold text-title">
      {{ title }}
    </div>
    <div class="px-6 mt-2 text-sm text-normal">
      <slot></slot>
    </div>
    <div class="mt-8">
      <a
        v-for="(item, index) in href"
        :key="index"
        :href="item.href"
        class="link-list-link-wrapper flex items-center border-t b-b-unset b-l-unset b-r-unset border-solid border-gray-200 h-11 px-6 hover:bg-gray-100 transition-all !hover:no-underline"
      >
        <div class="text-ellipsis flex-grow min-w-0 text-sm text-primary">
          {{ item.title }}
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="ml-8px w-20px h-20px flex-shrink-0 flex-grow-0"
        >
          <path
            d="M4 12H20M20 12L14 6M20 12L14 18"
            stroke="#3b82f6"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageItem from "./ImageItem.vue";

interface Href {
  title: string;
  href: string;
}

interface Props {
  /**
   * 图标地址
   */
  icon: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 链接列表
   */
  href: Href[];
}

withDefaults(defineProps<Props>(), {
  icon: "",
  title: "",
  href: () => []
});
</script>

<style scoped>
.text-title {
  color: #1f2937;
}

.text-normal {
  color: #4b5563;
}

.text-primary {
  color: #3b82f6;
}

.fill-primary {
  fill: #3b82f6;
}
</style>
