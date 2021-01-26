<template>
  {{userInfo}}
</template>
<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  setup(){
    const store = useStore()
    return {
      userInfo:computed(()=>store.state.userInfo)
    }
  }
});
</script>
<style lang="scss" scoped>
</style>