import { api } from '@/util/axios';
export interface LoginBody {
  email: string;
  password: string;
}
export interface RegisterUserBody extends LoginBody {
  nickname: string;
  checkPassword: string;
}
export const userService = {
  login(body:LoginBody){
    return api.post<AjaxResponse>('/login', body)
  },
  register(body: RegisterUserBody) {
    return api.post<AjaxResponse>('/register', body)
  },
  getUserInfo() {
    return api.post<AjaxResponse>('/getUserInfo')
  }
}