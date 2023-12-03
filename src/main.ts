import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import apiClient from "./plugins/axios";
import { defineRule } from "vee-validate";
import * as AllRules from "@vee-validate/rules";

import "./assets/css/index.css";
// import VueHighlightJS from 'vue-highlightjs'
// import 'highlight.js/styles/ir-black.css'
import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Form, Field , ErrorMessage} from 'vee-validate';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3Toasity, { autoClose: 5000 } as ToastContainerOptions);
app.provide("$axios", apiClient);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, (AllRules as any)[rule]);
});

// app.use(VueHighlightJS)
app.mount("#app");
