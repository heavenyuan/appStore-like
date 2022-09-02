import { createApp } from 'vue'
import App from '@/App.vue'
import http from '@/axios/http'
import api from '@/axios/api'
import router from './router'
import store from './store'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App).use(store).use(router).use(antd)

app.provide('http', http)
app.provide('api', api)

app.mount('#app')
