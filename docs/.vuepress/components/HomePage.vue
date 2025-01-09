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
                      <a :href="p.link" class="btn">快速开始 ></a>
                    </div>
                    <div
                      v-else
                      class="card"
                      style="
                        visibility: hidden;
                        height: 0;
                        padding: 0;
                        border: none;
                      "
                    ></div>
                  </template>
                </div>
              </template>
            </section>

            <!-- <section v-for="p in projects" :key="p.title">
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
            </section> -->

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
                      <p class="color-#303A48">
                        <span class="font-600">功能介绍：</span>
                        <span class="font-400">
                          为开发者提供低延时、高并发、可扩展、高可靠的实时消息及状态同步网络服务。
                        </span>
                      </p>
                      <p class="color-#303A48">
                        <span class="font-600">基本信息：</span>
                      </p>
                      <p class="color-#303A48 font-400">
                        【SDK 名称】实时消息
                        SDK；【开发者】上海兆言网络科技有限公司；【版本号】见下列下载选项；【MD5
                        值】见下列下载选项；
                      </p>
                      <p class="color-#303A48 font-400">
                        【使用说明】
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
                        <td>
                          <a class="color-#2D85E9" :href="item.releaseNote"
                            >点击查看</a
                          >
                        </td>
                        <td>
                          <a :href="item.downloadLink">
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
                        <td>
                          <a
                            :class="[
                              'color-#2D85E9',
                              { 'opacity-0': !item.releaseNote },
                              { 'pointer-events-none': !item.releaseNote }
                            ]"
                            :href="item.releaseNote"
                            >点击查看</a
                          >
                        </td>
                        <td>
                          <a
                            :href="item.downloadLink"
                            :class="[
                              { 'opacity-0': !item.downloadLink },
                              { 'pointer-events-none': !item.downloadLink }
                            ]"
                          >
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import HopeHomePage from "vuepress-theme-hope/components/HomePage.js";
import HeroSection from "./CustomHero.vue";
import { usePageFrontmatter } from "@vuepress/client";
import {
  clientSDKDownloadInfo,
  serverSDKDownloadInfo
} from "../data/download.js";
const frontmatter = usePageFrontmatter();
const router = useRouter();
const starter = frontmatter.value.starter || [];
const projects = frontmatter.value.projects || [];

const downloadTableColumns = [
  {
    title: "语言",
    width: 100
  },
  {
    title: "适用平台",
    width: 100
  },
  {
    title: "最新版本",
    width: 80
  },
  {
    title: "包名",
    width: 110
  },
  {
    title: "MD5值",
    width: 200
  },
  {
    title: "更新日期",
    width: 120
  },
  {
    title: "更新日志",
    width: 80
  },
  {
    title: "下载",
    width: 40
  }
];

const activeTab = ref(0);
</script>

<style scoped>
.main-container {
  border-radius: 4px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.main-content {
  box-sizing: border-box;
  align-self: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
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
  font-size: 36px;
  color: #000;
  margin-bottom: 20px;
  text-align: left;
  border: none;
}

.section-sub-title-desc {
  color: #000;
  text-align: justify;
  font-family: "PingFang SC";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
}

.section-sub-title {
  font-size: 24px;
  color: #484644;
  margin-bottom: 20px;
  font-weight: 600;
  line-height: 28px;
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
  background: #f8f8f8;
  border: 1px solid #f8f8f8;
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
  border: 1px solid #00b3ff;
}

.card img {
  width: 48px;
  height: 48px;
  border-radius: 10px;
}

.card h3 {
  font-size: 18px;
  color: #333;
}

.card p {
  font-size: 15px;
  color: #2d2d2d;
  text-align: left;
}

.card .btn {
  display: inline-block;
  margin-top: 15px;
  width: 100%;
  padding: 10px 0;
  background: #d9d9d9;
  color: #0076e7;
  text-decoration: none;
  border-radius: 20px;
}

.card .btn:hover {
  background: #0076e7;
  color: #fff;
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
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
  min-width: 80px;
  padding: 15px 0;
}

.table th:nth-child(5),
.table td:nth-child(5) {
  width: 100%;
}

.table td:nth-child(8) svg {
  color: #2d85e9;
  transition: color 0.3s;
}

.table th {
  background: #e6f7ff;
  color: #283544;
  border: none;
}

.table td {
  color: #313c4b;
  border: none;
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
  border: 1px solid #e6f7ff;
  border-radius: 12px;
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
  color: #0076e7;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
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
  width: 170px;
  display: flex;
  justify-content: space-between;
  color: #abadad;
  cursor: pointer;
}

.table tr:nth-child(odd) {
  background-color: #fff; /* 浅色 */
}

.table tr:nth-child(even) {
  background-color: #f4f4f4; /* 深色 */
}

.tab-btn {
  font-size: 20px;
  padding-bottom: 12px;
}

.active {
  color: #2d85e9;
  border-bottom: 2px solid #2d85e9;
}
</style>
