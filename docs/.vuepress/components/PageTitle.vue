<script setup lang="ts">
import { usePageData } from '@vuepress/client'
import ThemePageTitle from 'vuepress-theme-hope/components/PageTitle.js'
import { MENU_PAGE } from './sidebarBreadcrumb'
const page = usePageData()
</script>

<template>
  <ThemePageTitle v-if="page.path !== MENU_PAGE" />
</template>
