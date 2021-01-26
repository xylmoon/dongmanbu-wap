<template>
  <template v-if="userInfo">
    <div class="header">
      <van-nav-bar placeholder fixed @click-left="show = true">
        <template #left>
          <van-image
            round
            width="0.6rem"
            height="0.6rem"
            :src="avatarUrl"
            fit="cover"
          />
          <div class="nickname"><i></i> {{ userInfo.email }}</div>
        </template>
      </van-nav-bar>
    </div>
    <van-popup
      v-model:show="show"
      position="left"
      round
      :style="{ width: '80%', height: '100%' }"
    >
      <div class="popup">
        <div class="userinfo">
          <van-image
            round
            width="1.6rem"
            height="1.6rem"
            :src="avatarUrl"
            fit="cover"
            class="avatar"
          />
          <div class="content">
            <div class="nickname">请给我一碗蛋炒饭,</div>
            <div class="email">{{ userInfo.email }}</div>
            <div class="bio">{{ userInfo.bio }}</div>
          </div>
        </div>
        <van-cell-group>
          <van-cell title="我要发布" is-link to="index" size="large" />
          <van-cell title="我已发布" is-link to="index" size="large" />
        </van-cell-group>
        <div class="logout">
          <van-button
            color="linear-gradient(to right, #ff6034, #ee0a24)"
            round
            block
          >
            登出
          </van-button>
          <div class="copyright">Demo作者微信:xylmoon</div>
        </div>
      </div>
    </van-popup>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store";
export default defineComponent({
  name: "IHeader",
  setup() {
    const store = useStore();
    const avatarUrl = ref(
      "https://pic.dongmanbu.cn/image/20190330/155391373196429381f30e924b89957bb5c1660061d950a7bf61d.jpg"
    );
    const show = ref(false);
    return {
      userInfo: computed(() => store.state.userInfo),
      avatarUrl,
      show,
    };
  },
});
</script>
<style lang="scss" scoped>
.header {
  .nickname {
    margin-left: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      background: #6ddf98;
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
      margin-right: 2px;
    }
  }
}
.popup {
  display: flex;
  height: 100%;
  flex-direction: column;
  .userinfo {
    padding: 1rem 0.2rem;
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 0.2rem;
    }
    .content {
      flex: 1;
      min-width: 0;
      font-size: 12px;
      .nickname {
        font-size: 0.4rem;
        margin-bottom: 0.1rem;
      }
      .email {
        font-size: 0.2rem;
        color: #666;
        margin-bottom: 0.1rem;
      }
      .bio {
        font-size: 0.24rem;
        color: #999;
        margin-bottom: 0.1rem;
      }
    }
  }
  .logout {
    margin: auto 0.2rem 2rem;
    .copyright {
      text-align: center;
      margin: 0.2rem;
      color: #e3e3e3;
      font-size: 0.2rem;
    }
  }
}
</style>