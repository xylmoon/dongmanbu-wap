import { indexService, VideoInfo } from "@/service";
import { computed, onMounted, ref, watch } from "vue";
import moment from "moment"
export default function useVideoRepositories() {
  const repositories = ref<VideoInfo[]>([]);
  const getVideoRepositories = async () => {
    try {
      const { data } = await indexService.getRecommend();
      repositories.value = data.data;
    } catch (error) {
      repositories.value = [];
    }
  }
  const banners = computed(() => repositories.value.filter(video => video.isbanner));
  const recommend = computed(() => repositories.value.filter(video => !video.isbanner));
  watch(() => repositories.value, (now) => {
    now.forEach(item => item.createTime = moment(item.createTime).format('YYYY-MM-DD'))
  })
  onMounted(() => {
    getVideoRepositories();
  })
  return {
    banners,
    recommend,
    getVideoRepositories
  }
}