<template>
  <div class="register">
    <van-form @submit="onSubmit">
      <van-field
        v-model="state.nickname"
        name="nickname"
        label="昵称"
        placeholder="请填写昵称啊"
        :rules="[{ required: true, message: '请填写昵称啊' }]"
      />
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
      <van-field
        v-model="state.checkPassword"
        type="password"
        name="checkPassword"
        label="确认下"
        placeholder="请填写密码啊"
        :rules="[{ validator, message: '总要俩次密码一样吧' }]"
      />
      <div style="margin: 16px">
        <van-button
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          round
          block
          native-type="submit"
        >
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { userService, RegisterUserBody } from "@/service";
import { Toast } from "vant";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Register",
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive<RegisterUserBody>({
      nickname: "",
      email: "",
      password: "",
      checkPassword: "",
    });
    const validator = (value: string) => state.password === value;
    const onSubmit = async (values: RegisterUserBody) => {
      try {
        const { data } = await userService.register(values);
        store.commit("setToken", data.token);
        Toast.success({
          message: "注册成功",
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