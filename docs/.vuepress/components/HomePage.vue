<template>
  <HopeHomePage>
    <template #center>
      <div class="main-container">
        <HeroSection />
        <main class="main-content">
          <div class="home-container">
            <section>
              <h2 class="section-title">用户指南</h2>
              <template v-for="s in starter" :key="s.title">
                <h3 class="section-sub-title">{{ s.title }}</h3>
                <p class="section-sub-title-desc">
                  {{ s.desc }}
                </p>
                <div class="card-container">
                  <template v-for="p in s.platform" :key="p.text">
                    <div v-if="p.text" class="card">
                      <div class="card-header">
                        <h3>{{ p.text }}</h3>
                        <img
                          :src="p.icon"
                          alt="JavaScript Logo"
                          style="background-color: #e6f7ff"
                        />
                      </div>
                      <p>{{ p.desc }}</p>
                      <a :href="p.link" class="btn">快速开始 </a>
                    </div>
                    <div
                      v-else
                      class="card"
                      style="visibility: hidden; height: 0"
                    ></div>
                  </template>
                </div>
              </template>
            </section>

            <section v-for="p in projects" :key="p.title">
              <h2 class="section-title">{{ p.title }}</h2>
              <p class="section-sub-title-desc">
                {{ p.desc }}
              </p>
              <div class="card-container-solution">
                <template v-for="p in p.contexts" :key="p.title">
                  <div v-if="p.title" class="card">
                    <div class="placeholder"></div>
                    <h3>{{ p.title }}</h3>
                    <p>{{ p.desc }}</p>
                  </div>
                  <div
                    v-else
                    class="card"
                    style="visibility: hidden; height: 0"
                  ></div>
                </template>
              </div>
            </section>

            <section>
              <h2 class="section-title">资源下载</h2>
              <p class="section-sub-title-desc">
                从下面选项中选择合适 SDK 下载并集成到你的应用中，
                以快速接入即时通讯服务体验实时互动特性。
              </p>
              <div class="download-tip-container">
                <div class="download-tip">
                  <div class="tip-icon">
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="info-circle"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
                      ></path>
                    </svg>
                  </div>
                  <div class="tip-content">
                    <div class="tip-title">SDK合规信息公式</div>
                    <div class="tip-desc">
                      <p>
                        <strong>功能介绍：</strong>
                        <span>
                          为开发者提供低延时、高并发、可扩展、高可靠的实时消息及状态同步网络服务。
                        </span>
                      </p>
                      <p>
                        <strong>基本信息：</strong>
                      </p>
                      <p>
                        【SDK 名称】实时消息
                        SDK；【开发者】上海兆言网络科技有限公司；【版本号】见下列下载选项；【MD5
                        值】见下列下载选项；
                      </p>
                      <p>
                        【更新日期】见下列下载选项；【使用说明】
                        <a href="#"> 《实时消息 SDK 合规使用说明》 </a
                        >；【个人信息处理规则】
                        <a href="#">《SDK 个人信息处理规则》 </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tabs">
                <div class="tab-header">
                  <div
                    class="tab-btn"
                    :class="{ active: activeTab === 0 }"
                    @click="activeTab = 0"
                  >
                    客户端
                  </div>
                  <div
                    class="tab-btn"
                    :class="{ active: activeTab === 1 }"
                    @click="activeTab = 1"
                  >
                    服务端
                  </div>
                </div>

                <div class="tab-content">
                  <!-- 客户端 SDK 表格 -->
                  <table class="table" v-if="activeTab === 0">
                    <thead>
                      <tr>
                        <th
                          v-for="column in downloadTableColumns"
                          :key="column.title"
                          :style="{ minWidth: column.width + 'px' }"
                        >
                          {{ column.title }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in clientSDKDownloadInfo" :key="item.id">
                        <td>{{ item.language }}</td>
                        <td>{{ item.platform }}</td>
                        <td>{{ item.version }}</td>
                        <td>{{ item.package }}</td>
                        <td>{{ item.md5 }}</td>
                        <td>{{ item.updateTime }}</td>
                        <td><a :href="item.downloadLink">点击查看</a></td>
                        <td>
                          <a href="#">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
                              />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- 服务端 API 表格 -->
                  <table class="table" v-if="activeTab === 1">
                    <thead>
                      <tr>
                        <th
                          v-for="column in downloadTableColumns"
                          :key="column.title"
                          :style="{ minWidth: column.width + 'px' }"
                        >
                          {{ column.title }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in serverSDKDownloadInfo" :key="item.id">
                        <td>{{ item.language }}</td>
                        <td>{{ item.platform }}</td>
                        <td>{{ item.version }}</td>
                        <td>{{ item.package }}</td>
                        <td>{{ item.md5 }}</td>
                        <td>{{ item.updateTime }}</td>
                        <td><a :href="item.downloadLink">点击查看</a></td>
                        <td>
                          <a href="#">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
                              />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </template>
  </HopeHomePage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HopeHomePage from 'vuepress-theme-hope/components/HomePage.js'
import HeroSection from './CustomHero.vue'
import { usePageFrontmatter } from '@vuepress/client'
import {
  clientSDKDownloadInfo,
  serverSDKDownloadInfo
} from '../data/download.js'
const frontmatter = usePageFrontmatter()
const router = useRouter()
const starter = frontmatter.value.starter || []
const projects = frontmatter.value.projects || []

const downloadTableColumns = [
  {
    title: '语言',
    width: 100
  },
  {
    title: '适用平台',
    width: 100
  },
  {
    title: '最新版本',
    width: 80
  },
  {
    title: '包名',
    width: 110
  },
  {
    title: 'MD5值',
    width: 200
  },
  {
    title: '更新日期',
    width: 120
  },
  {
    title: '更新日志',
    width: 80
  },
  {
    title: '下载',
    width: 40
  }
]

const activeTab = ref(0)
</script>

<style scoped>
.main-container {
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.main-content {
  align-self: center;
  margin-top: 16px;
  width: 100%;
  max-width: 1200px;
  position: relative;
}

.home-container {
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.section-title {
  font-size: 26px;
  color: #000;
  margin-bottom: 20px;
  text-align: left;
  border: none;
}

.section-sub-title {
  font-size: 20px;
  color: #000;
  margin-bottom: 20px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.card-container-solution {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card img {
  width: 50px;
  height: 50px;
}

.card h3 {
  font-size: 20px;
  color: #333;
}

.card p {
  font-size: 14px;
  color: #666;
  text-align: left;
}

.card .btn {
  display: inline-block;
  margin-top: 15px;
  width: 100%;
  padding: 10px 0;
  background: #1890ff;
  color: #fff;
  text-decoration: none;
  border-radius: 20px;
}

.card .btn:hover {
  background: #167abc;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  background: #fff;
  border-radius: 8px;
  overflow-x: auto;
  display: block;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.table th,
.table td {
  border: 1px solid #e0e0e0;
  padding: 15px;
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
  min-width: 80px;
}

.table th:nth-child(5),
.table td:nth-child(5) {
  width: 100%;
}

.table td:nth-child(8) svg {
  color: #1890ff;
  transition: color 0.3s;
}

.table td:nth-child(8) svg:hover {
  color: blue;
  cursor: pointer;
}

.table th {
  background: #f5f5f5;
  color: #333;
}

.table td {
  color: #555;
}

.table .btn {
  padding: 5px 10px;
  background: #1890ff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-size: 12px;
}

.table .btn:hover {
  background: #167abc;
}

.placeholder {
  height: 150px;
  background-color: #e6f7ff;
  border-radius: 8px;
  margin-bottom: 10px;
}

.download-tip {
  display: flex;
  align-items: flex-start;
  padding: 16px 18px;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
  margin-bottom: 24px;
}

.tip-icon {
  color: #1890ff;
  font-size: 18px;
  margin-right: 14px;
  margin-top: 2px;
}

.tip-content {
  flex: 1;
}

.tip-title {
  font-size: 16px;
  font-weight: 500;
  color: #262626;
  margin-bottom: 8px;
}

.tip-desc {
  font-size: 14px;
  color: #595959;
  line-height: 1.5;
}

.tip-desc ul {
  margin: 8px 0 0 20px;
  padding: 0;
}

.tip-desc li {
  margin-bottom: 4px;
}

.tab-header {
  width: 130px;
  display: flex;
  justify-content: space-between;
  color: #abadad;
  cursor: pointer;
}

.tab-btn {
  padding: 12px 0;
}

.active {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
}
</style>
