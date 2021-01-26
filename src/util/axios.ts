import axios, { Canceler, AxiosRequestConfig, AxiosInstance } from 'axios'
import qs from 'qs'
import Axios from 'axios';
import { store } from '@/store';

interface PendingConfig {
  url: string,
  cancel: Canceler
}
class Http {
  openCancel = false;
  config: AxiosRequestConfig;
  pending: PendingConfig[] = [];
  cancelToken = axios.CancelToken;
  removePending(config: AxiosRequestConfig) {
    for (const p in this.pending) {
      const item = Number(p)
      const list = this.pending[p]
      if (list.url === config.url + '&request_type=' + config.method && !config.headers.noCancel) {
        list.cancel('重复的请求')
        this.pending.splice(item, 1)
      }
    }
  }

  constructor(config: AxiosRequestConfig) {
    this.config = config
  }

  create(openCancel = false) {
    this.openCancel = openCancel;
    const instance = axios.create(this.config);
    this.addInterceptors(instance);
    return instance;
  }

  addInterceptors(instance: AxiosInstance) {
    instance.interceptors.request.use(
      config => {
        if (this.openCancel) {
          this.removePending(config)
          config.cancelToken = new this.cancelToken((c) => {
            this.pending.push({ url: config.url + '&request_type=' + config.method, cancel: c })
          })
        }
        config['headers'].Authorization = store.state?.token;
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      res => {
        const { data, config } = res;
        if (this.openCancel) {
          this.removePending(config);
        }
        if (data.status !== 0) {
          return Promise.reject(data)
        }
        return res
      },
      error => {
        if (error instanceof Axios.Cancel) {
          return Promise.reject(error.message)
        }
        const { status, data } = error.response;
        return Promise.reject(error)
      }
    )
  }

}


export const api = new Http({
  baseURL: process.env.VUE_APP_HTTPURL,
  paramsSerializer(params) {
    return qs.stringify(params)
  },
  timeout: 60 * 1000,
  withCredentials: true,
}).create();


