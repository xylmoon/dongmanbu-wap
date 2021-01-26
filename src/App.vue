<template>
  <div class="nav">
    <i-header />
  </div>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import IHeader from "@/components/IHeader.vue";
export default defineComponent({
  components: {
    IHeader,
  },
});
</script>
<style lang="scss">
</style>
