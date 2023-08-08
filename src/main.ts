import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// router
import router from './router/index'
// vuex
import store from './store/index'
// elementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// elementPlus icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
// axios
import axios from './router/request'
const Apps = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  Apps.component(key, component)
}
Apps.use(VXETable)
Apps.config.globalProperties.$axios = axios;
Apps.use(router)
Apps.use(store)
Apps.use(ElementPlus)
Apps.mount('#app')
