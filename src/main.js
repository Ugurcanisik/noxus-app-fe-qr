import Vue from 'vue'
import App from './App.vue'
import {store} from "./store/store";
import {router} from "./router/router";

import Vuetify from 'vuetify'

Vue.use(Vuetify)
// index.js or main.js
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import axios from "axios";

//axios.defaults.baseURL = "https://noxus-app-be-y4g5lbddia-ez.a.run.app/"
axios.defaults.baseURL = "http://localhost:8081/";

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
    return price.split("-")[0] + '<br>' + price.split("-")[1]
  } else {
    return price.split("-")[0];
  }
})


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})


