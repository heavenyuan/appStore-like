import { createApp } from 'vue'
import App from '@/App.vue'
import store from "@/store/index.ts";
import http from '@/axios/http.ts'
import api from '@/axios/api.ts'

const app = createApp(App)

app.provide('http', http)
app.provide('api', api)

app.use(store);
app.mount('#app')