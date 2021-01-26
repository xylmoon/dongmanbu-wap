type Dictionary<T> = { [key: string]: T }
declare interface AjaxResponse<T = any> {
  data: T;
  status: number;
  message: string;
  loastTime: string;
  token?:string;
}
