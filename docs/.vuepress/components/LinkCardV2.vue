<template>
  <a
    :href="href"
    :target="isOpenNewTab ? '_blank' : '_self'"
    :rel="isOpenNewTab ? 'noreferrer' : ''"
    class="custom-component-link-card-v2 transition-all block !hover:no-underline color-black"
  >
    <Card
      :style="{ padding: padding }"
      class="flex justify-between items-center hover:border-blue"
    >
      <div class="min-w-0 flex-grow-1 flex-shrink-1">
        <div class="flex items-center">
          <img :src="icon" width="24" class="flex-shrink-0" alt="link icon" />
          <div
            class="text-ellipsis ml-8px text-lg font-semibold text-text-title"
          >
            {{ title }}
          </div>
        </div>
        <div v-if="desc" class="text-ellipsis mt-8px text-sm text-text-normal color-slate-500">
          {{ desc }}
        </div>
      </div>

      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="ml-8px w-24px h-24px flex-shrink-0 flex-grow-0"
      >
        <path
          d="M4 12H20M20 12L14 6M20 12L14 18"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Card>
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Card from "./basic/Card.vue";

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
   * size
   */
  size?: "default" | "small";
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
  icon: "/img/icons/question.svg",
  title: "标题",
  desc: "",
  openNewTab: false,
  size: "default"
});

const isOpenNewTab = computed(
  () => props.openNewTab || props.href.startsWith("http")
);
const padding = computed(() => (props.size === "small" ? "12px 24px" : "24px"));
</script>
