import { videoService, VideoInfo } from "@/service";
import { onMounted, reactive } from "vue";

export function useVideoInformation(id: string) {
  // 重置对象数据，不清楚是不是最优解 = = 暂时这样了
  const initialVideoInfo = {
    author: "",
    banner: "",
    biliurl: "",
    cover: "",
    createTime: "",
    desc: "",
    isbanner: false,
    isrecommend: true,
    like: "",
    loastTime: "",
    proxy: [],
    startTime: "",
    status: 0,
    tag: [],
    title: "",
    type: "",
    uploader: { _id: "", nickname: "" },
    _id: "",
  }
  const videoInfo = reactive<VideoInfo>({ ...initialVideoInfo });
  const getVideoInfo = async (id: string) => {
    try {
      const { data } = await videoService.getVideoInfo(id);
      setVideoInfo(data.data)
    } catch (error) {
      resetVideoInfo();
    }
  }
  const setVideoInfo = (data: VideoInfo) => {
    Object.assign(videoInfo, data)
  }
  const resetVideoInfo = () => {
    Object.assign(videoInfo, initialVideoInfo)
  }
  onMounted(() => {
    getVideoInfo(id)
  })
  return {
    videoInfo,
    getVideoInfo,
    resetVideoInfo
  }
}