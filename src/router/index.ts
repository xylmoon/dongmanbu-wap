import { createRouter, createWebHistory, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { store } from "@/store"
import { reactive, toRefs } from 'vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/index',
    alias: '/',
    name: 'Index',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      hideHeader: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      hideHeader: true
    }
  },
  {
    path: '/video/:id',
    name: 'Video',
    component: () => import('../views/Video.vue')
  },
  {
    path: '/space',
    name: 'Space',
    component: () => import('../views/Space.vue'),
    meta: {
      authRequired: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const canUserAccess = (to: RouteLocationNormalized) => {
  if (!to.matched.some(record => record.meta.authRequired)) return true
  return !!store.state.userInfo
}

router.beforeEach(async (to, from, next) => {
  if (store.state.token && !store.state.userInfo) {
    await store.dispatch("getUserInfo");
  }
  if (store.state.userInfo && ["Login", "Register"].includes(to.name as string)) {
    next({ name: 'Index', replace: true })
    return;
  }
  const isAuthenticated = canUserAccess(to);
  if (!isAuthenticated) next({ name: 'Register', replace: true })
  else next()
})

export default router
