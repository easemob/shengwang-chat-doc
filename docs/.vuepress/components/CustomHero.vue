<template>
  <div
    class="flex min-h-220px items-center justify-center bg-gradient-to-b from-[#C7ECFF] to-[#FFF]"
  >
    <div
      class="max-w-1200px text-align-center p-t-55px p-b-35px p-x-20px box-border w-100% flex justify-between"
    >
      <div class="max-w-100%">
        <div class="color-black text-left text-60px font-500 line-height-normal">即时通讯 IM</div>
        <div class="color-black text-justify text-16px font-400 mt-30px line-height-24px">
          基于即时通讯 (Instant Messaging, IM)
          的高可靠性、低延时、强扩展性及高并发特性，可轻松切入即时通讯领域，为产品带来卓越沟通体验，快速增强用户粘性和市场竞争力。即时通讯
          IM
          解决方案支持丰富的消息类型、群组功能和跨平台体验，轻松构建满足不同场景需求的高效沟通平台，助力用户享受流畅便捷的交流方式。
        </div>
        <br/>
        <div class="color-black text-justify text-16px font-400 line-height-24px">
          探索下面的综合文档，立即释放 IM 即时通讯的力量。
        </div>
      </div>
      <div
        class="banner-right-wrap ml-100px flex-shrink-0 w-440px h-330px top-0 lg:block hidden bg-no-repeat bg-center bg-cover"
      ></div>
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
.banner-right-wrap {
  background: url("/home-page/chat.png") no-repeat center center;
  background-size: 100% 100%;
}
</style>
