import Vue from 'vue'
import App from './App.vue'
import {store} from "./store/store";
import {router} from "./router/router";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081"
axios.defaults.withCredentials = true;

import {BootstrapVue} from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.filter("nameLoad", (name) => {
  let nameValue = name.split("-");
  if (nameValue.length > 1) {
    return name.split("-")[0] + '<br>' + name.split("-")[1]
  } else {
    return name.split("-")[0];
  }
})

Vue.filter("priceLoad", (price) => {
  let priceValue = price.split("-");
  if (priceValue.length > 1) {
    console.log(price.split("-")[0] + '<br>' + price.split("-")[1])
    return price.split("-")[0] + '<br>' + price.split("-")[1]
  } else {
    return price.split("-")[0];
  }
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
