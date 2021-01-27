<template>
  <div class="iframe">
    <div v-html="videoInfo.biliurl"></div>
  </div>
</template>
<script lang="ts">
import { useVideoInformation } from "@/composables";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const { videoInfo, getVideoInfo } = useVideoInformation(
      route.params.id as string
    );
    return {
      videoInfo,
      getVideoInfo,
    };
  },
});
</script>
<style lang="scss" scoped>
.iframe {
  /deep/ iframe{
    width: 100%;
    height: 4.5rem;
  }
}
</style>