import Vue from "vue";
import Vuex from "vuex";
import Qr from './modules/qr'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {

  },
  modules: {
    Qr
  }
});
