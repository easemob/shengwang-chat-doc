<template>
  <div class="custom-component-list-item mb-8px min-0 flex items-center">
    <div class="flex-shrink-0">
      <ImageItem :src="typeConfig.url" style="width: 20px" />
    </div>
    <div
      class="custom-list-item-text text-ellipsis ml-12px text-base text-text-title"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ImageItem from "./ImageItem.vue";

type Type = "support" | "check" | "checkOutlined";

interface TypeConfig {
  url: any;
}

interface Props {
  /**
   * 类型
   */
  type?: Type;
}

const props = withDefaults(defineProps<Props>(), {
  type: "support"
});

const typeConfigMap: Record<Type, TypeConfig> = {
  support: {
    url: "/landing-page/checked.svg"
  },
  check: {
    url: "/landing-page/checked.svg"
  },
  checkOutlined: {
    url: "/landing-page/checked.svg"
  }
};

const typeConfig = computed(() => {
  if (!Reflect.has(typeConfigMap, props.type)) {
    throw new Error(
      `Invalid type passed to the ListItem component. Expected one of "support" | "check" | "checkOutlined", but received ${props.type}.`
    );
  }

  return typeConfigMap[props.type];
});
</script>

<style scoped>
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
