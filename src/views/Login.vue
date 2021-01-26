<template>
  <div class="register">
    <van-form @submit="onSubmit">
      <van-field
        v-model="state.email"
        name="email"
        label="邮箱"
        placeholder="请填写邮箱啊"
        :rules="[{ required: true, message: '请填写邮箱啊' }]"
      />
      <van-field
        v-model="state.password"
        type="password"
        name="password"
        label="密码"
        placeholder="请填写密码啊"
        :rules="[{ required: true, message: '请填写密码啊' }]"
      />
      <div style="margin: 16px">
        <van-button
          style="margin-top: 1.5rem"
          color="linear-gradient(to right, rgb(52 199 255), rgb(77 238 10))"
          round
          block
          native-type="submit"
        >
          登录
        </van-button>
        <van-button
          style="margin-top: 0.3rem"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          round
          block
          @click="
            $router.push({
              name: 'Register',
            })
          "
        >
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { userService, LoginBody } from "@/service";
import { Toast } from "vant";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive<LoginBody>({
      email: "",
      password: "",
    });
    const validator = (value: string) => state.password === value;
    const onSubmit = async (values: LoginBody) => {
      try {
        const { data } = await userService.login(values);
        store.commit("setToken", data.token);
        Toast.success({
          message: "登录成功",
        });
        router.replace({
          name: "Index",
        });
      } catch (error) {
        Toast.fail(error.message);
      }
    };
    return {
      state,
      onSubmit,
      validator,
    };
  },
});
</script>
<style lang="scss" scoped>
.register {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /deep/ .van-form {
    margin-top: -2rem;
  }
}
</style>