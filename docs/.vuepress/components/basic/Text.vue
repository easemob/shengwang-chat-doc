<template>
  <span :style="styles">
      <slot></slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /**
   * 文字水平对齐方式
   */
  align?: string
  /**
   * 文字颜色
   */
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: ''
})

const styles = computed(() => {
  const style: Record<string, string> = {}
  if (props.align) {
    style.display = 'block'
    style.textAlign = props.align
  }
  if (props.color) {
    style.color = props.color
  }
  return style
})
</script>
