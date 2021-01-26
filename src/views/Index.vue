<template>
  <van-swipe :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="banner in banners" :key="banner._id">
      <van-image height="3rem" fit="cover" :src="banner.cover" />
    </van-swipe-item>
  </van-swipe>
  <van-grid :border="false" :gutter="0" :column-num="3" :center="false">
    <van-grid-item v-for="item in rcmd" :key="item._id" class="">
      <div class="img-box">
        <van-image height="3rem" fit="cover" :src="item.cover" />
        <div class="count">
          <i class="time">
            {{ item.createTime }}
          </i>
          <i>
            {{ item.uploader.nickname }}
          </i>
        </div>
      </div>

      <div class="title van-multi-ellipsis--l2">
        {{ item.title }}
      </div>
    </van-grid-item>
  </van-grid>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import useVideoRepositories from "@/composables/useVideoRepositories";
export default defineComponent({
  name: "Index",
  setup() {
    const {
      banners,
      recommend: rcmd,
      getVideoRepositories,
    } = useVideoRepositories();
    return {
      banners,
      rcmd,
      getVideoRepositories,
    };
  },
});
</script>
<style lang="scss" scoped>
.title {
  margin-top: 0.1rem;
  font-size: 0.3rem;
  line-height: 0.4rem;
  height: 0.8rem;
}
.img-box {
  position: relative;
  height: 3rem;
  .count {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 0.5rem;
    padding: 0.1rem;
    bottom: 0;
    color: #fff;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent);
    font-size: 0.18rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    i {
      font-style: normal;
    }
  }
}
</style>