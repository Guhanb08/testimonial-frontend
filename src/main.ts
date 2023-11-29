import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import apiClient from "./plugins/axios";


import './assets/css/index.css'
// import VueHighlightJS from 'vue-highlightjs'
// import 'highlight.js/styles/ir-black.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.provide("$axios", apiClient);

// app.use(VueHighlightJS)
app.mount('#app')
