<template>
  <div
    :class="[
      'custom-component-card',
      className,
      hoverable && 'hoverable',
      bordered && 'bordered'
    ]"
    :style="computedStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  className?: string;
  style?: Record<string, any>;
  bordered?: boolean;
  borderSize?: "small" | "middle" | "large";
  cover?: string;
  hoverable?: boolean;
  height?: string | number;
  padding?: number | string;
  background?: string;
}

const props = withDefaults(defineProps<Props>(), {
  className: "",
  style: () => ({}),
  bordered: true,
  borderSize: "middle",
  cover: "",
  hoverable: false,
  height: "auto",
  padding: '16px',
  background: "#fff"
});

const computedStyle = computed(() => {
  const style: Record<string, any> = {
    height: props.height,
    padding: props.padding,
    background: props.background,
    ...props.style
  };

  if (props.bordered) {
    switch (props.borderSize) {
      case "small":
        style.borderRadius = "2px";
        break;
      case "middle":
        style.borderRadius = "4px";
        break;
      case "large":
        style.borderRadius = "8px";
        break;
    }
  }
  return style;
});
</script>

<style scoped>
.custom-component-card {
  box-sizing: border-box;
}

.bordered {
  border: 1px solid #e8e8e8;
}

.hoverable:hover {
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
    0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  transition: box-shadow 0.3s;
}
</style>
