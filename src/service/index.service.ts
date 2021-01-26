import { api } from '@/util/axios';
export interface VideoInfo {
  author: string;
  banner: string;
  cover: string;
  createTime: string;
  desc: string;
  isbanner: boolean;
  isrecommend: boolean;
  like: string;
  loastTime: string;
  proxy: string[];
  startTime: string;
  status: number;
  tag: string[];
  title: string;
  type: string;
  uploader: {
    _id: string;
    nickname: string;
  };
  _id: string;
}
export const indexService = {
  getRecommend() {
    return api.get<AjaxResponse<VideoInfo[]>>('/index/getRecommend')
  }
}