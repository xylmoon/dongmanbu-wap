import { api } from '@/util/axios';
import { VideoInfo } from './index.service';
export const videoService = {
  getVideoInfo(pid: string) {
    return api.get<AjaxResponse<VideoInfo>>("getVideoInfo", {
      params: {
        pid
      }
    })
  }
}