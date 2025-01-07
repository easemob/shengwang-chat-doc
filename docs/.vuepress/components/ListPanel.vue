<template>
  <div class="custom-component-list-panel rounded-md overflow-hidden shadow flex flex-col h-full">
    <div 
      class="flex-shrink-0 p-6"
      :style="{ backgroundColor: themeConfig.bgColor }"
    >
      <div 
        class="text-ellipsis text-xl font-medium"
        :style="{ color: themeConfig.fontColor }"
      >
        {{ title }}
      </div>
      <div
        class="text-ellipsis text-sm"
        :style="{ color: themeConfig.subTitleColor }"
      >
        {{ desc }}
      </div>
    </div>
    <div
      class="flex-grow rounded border border-solid border-t-0 border-gray-200 p-6"
      :style="{ height, borderRadius: '0 0 8px 8px' }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Theme = 'gray' | 'yellow' | 'blue' | 'green' | 'purple'

interface ThemeConfig {
  bgColor: string
  fontColor: string
  subTitleColor: string
}

interface Props {
  /**
   * 标题
   */
  title?: string
  /**
   * 主题色
   */
  theme?: Theme
  /**
   * 描述
   */
  desc?: string
  /**
   * 显式控制卡片的高度
   */
  height?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  title: '标题',
  theme: 'gray',
  height: 'auto',
  desc: ''
})

const themeConfigMap: Record<Theme, ThemeConfig> = {
  gray: {
    bgColor: '#E7ECF2',
    fontColor: 'var(--text-title)',
    subTitleColor: 'var(--text-normal)'
  },
  green: {
    bgColor: '#A8E6AE', 
    fontColor: 'var(--text-title)',
    subTitleColor: 'var(--text-normal)'
  },
  blue: {
    bgColor: '#60A9FD',
    fontColor: '#ffffff',
    subTitleColor: '#ffffff'
  },
  purple: {
    bgColor: '#828EF4',
    fontColor: '#ffffff', 
    subTitleColor: '#ffffff'
  },
  yellow: {
    bgColor: '#F8E1B4',
    fontColor: 'var(--text-title)',
    subTitleColor: 'var(--text-normal)'
  }
}

const themeConfig = computed(() => {
  if (!Reflect.has(themeConfigMap, props.theme)) {
    throw new Error(
      `Invalid theme passed to the ListPanel component. Expected "gray" | "yellow" | "blue", but received ${props.theme}.`
    )
  }
  return themeConfigMap[props.theme]
})
</script>
