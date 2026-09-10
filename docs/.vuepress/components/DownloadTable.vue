<template>
  <h3>{{ title }}</h3>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>适用平台</th>
          <th>语言</th>
          <th>{{ showRemark ? "最新版本" : "稳定版本" }}</th>
          <th>包名</th>
          <th>MD5 值</th>
          <th>更新日期</th>
          <th>更新日志</th>
          <th>下载</th>
          <th v-if="showRemark">备注</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="`${item.platform}-${item.language}`">
          <td>{{ item.platform }}</td>
          <td>{{ item.language }}</td>
          <td>{{ item.version }}</td>
          <td>{{ item.package }}</td>
          <td>{{ item.md5 }}</td>
          <td>{{ item.updateTime }}</td>
          <td>
            <a v-if="item.releaseNote" :href="item.releaseNote" target="_blank" rel="noopener noreferrer">点击查看</a>
            <span v-else>还未提供</span>
          </td>
          <td>
            <a :href="item.downloadLink" target="_blank" rel="noopener noreferrer" aria-label="下载">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" />
              </svg>
            </a>
          </td>
          <td v-if="showRemark" class="remark-cell">{{ item.remark }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface DownloadItem {
  platform: string;
  language: string;
  version: string;
  package: string;
  md5: string;
  updateTime: string;
  releaseNote: string;
  downloadLink: string;
  remark?: string;
}

withDefaults(defineProps<{
  title: string;
  items: DownloadItem[];
  showRemark?: boolean;
}>(), {
  showRemark: false
});
</script>

<style scoped>
h3 {
  margin: 2rem 0 1rem;
  color: #242f3d;
  font-size: 1.4rem;
}

.table-wrapper {
  width: 100%;
  max-width: none;
  box-sizing: border-box;
  overflow-x: auto;
}

table {
  display: table;
  width: 100% !important;
  min-width: 100% !important;
  max-width: none !important;
  box-sizing: border-box;
  border-collapse: collapse;
  background: #fff;
}

th,
td {
  padding: 0.75rem 0.6rem;
  border: 1px solid #e5e7eb;
  text-align: left;
  white-space: nowrap;
}

th {
  background: #f5f7fa;
  color: #303a48;
  font-weight: 600;
}

.remark-cell {
  white-space: pre-line;
  line-height: 1.35;
}

a {
  color: #2d85e9;
}
</style>
