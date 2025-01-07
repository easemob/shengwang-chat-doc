<template>
  <el-row gutter="16" :style="{ rowGap: '16px' }">
    <el-col
      v-for="(item, index) in list"
      :key="index"
      :span="12"
      :md="8"
      :xl="6"
      :lg="6"
    >
      <Card :bordered="false" :padding="0">
        <ImageItem :src="item.img" :no-view="true" />
        <Card
          :padding="'8px'"
          class="!border-t-none "
          :style="{
            marginTop: '-5px',
            borderRadius: '0 0 4px 4px'
          }"
        >
          <Text align="center" style="font-size: 14px">{{ item.text }}</Text>
        </Card>
      </Card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import ImageItem from "../ImageItem.vue";
import Card from "./Card.vue";
import Text from "./Text.vue";

interface ImageItem {
  img: string;
  text: string;
}

interface Props {
  /**
   * 图片宽高比
   */
  aspectRatio?: number;
  /**
   * 图片列表
   */
  list?: ImageItem[];
}

withDefaults(defineProps<Props>(), {
  aspectRatio: 1,
  list: () => []
});
</script>
