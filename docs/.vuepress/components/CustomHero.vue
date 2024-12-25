<template>
  <div class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">即时通讯IM</h1>
      <p>
        基于即时通讯（Instant Messaging, IM）的高可靠性、低延时、强扩展性及高并发特性，你可以轻松切入即时通讯领域，为你的产品带来卓越的沟通体验，从而快速增强用户粘性和市场竞争力。即时通讯IM解决方案支持丰富的消息类型、群组功能和跨平台体验，让你轻松构建满足不同场景需求的高效沟通平台，助力用户享受流畅便捷的交流方式。
      </p>
      <br />
      <p>探索下面的综合文档，立即释放 IM 即时通讯的力量</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "HeroSection",
  methods: {
    openAi() {
      const chatbotBtn = document.getElementById("dify-chatbot-bubble-button");
      if (chatbotBtn) {
        chatbotBtn.click();
      }
    }
  }
});
</script>

<style scoped>
.hero-section {
  position: relative;
  display: flex;
  min-height: 220px;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #e6f7ff, #fff);
}

.hero-content {
  max-width: 1200px;
  padding: 50px 20px;
  text-align: center;
  box-sizing: border-box;
}
.hero-title {
  font-size: 40px;
  color: #000;
  margin-bottom: 20px;
  text-align: left;
}
.hero-content p {
  font-size: 18px;
  margin: 0 auto;
  text-align: left;
}
</style>
