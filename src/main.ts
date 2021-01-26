import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import { store, key } from './store'

createApp(App).use(store, key).use(router).use(Vant).mount('#app')
