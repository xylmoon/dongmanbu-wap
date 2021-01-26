import { createStore, useStore as baseUseStore, Store } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import { InjectionKey } from 'vue'
import { userService } from "@/service"
export interface State {
  token: string | null;
  userInfo: {
    avatar: string
    bio: string
    email: string
    gender: number
  } | null;
}
export const key: InjectionKey<Store<State>> = Symbol('base')
export const store = createStore<State>({
  plugins: [createPersistedState({
    reducer(state) {
      return {
        token: state.token
      }
    }
  })],
  state: {
    token: null,
    userInfo: null
  },
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    async getUserInfo({ commit }) {
      try {
        const { data } = await userService.getUserInfo();
        commit('setUserInfo', data.data);
      } catch (error) {
        commit('setToken', null);
      }
    }
  },
  modules: {
  }
})
export function useStore() {
  return baseUseStore(key)
}


