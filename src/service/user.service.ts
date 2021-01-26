import { api } from '@/util/axios';

export interface RegisterUserBody {
  email: string;
  password: string;
  nickname: string;
  checkPassword: string;
}
export const userService = {
  register(body: RegisterUserBody) {
    return api.post<AjaxResponse>('/register', body)
  },
  getUserInfo() {
    return api.post<AjaxResponse>('/getUserInfo')
  }
}