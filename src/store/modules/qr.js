import axios from "axios";

const state = {
  products: [],
  category: [],
}

const getters = {
  allProducts(state) {
    return state.products;
  },
  allCategory(state) {
    return state.category;
  },
}

const mutations = {
  updateProductsList(state, payload) {
    state.products.push(payload);
  },
  updateCategoryList(state, payload) {
    state.category.push(payload);
  },
}

const actions = {
  initQr({dispatch, commit, state}) {
    return axios.get('/qr')
      .then(response => {
        if (response.status === 200) {
          state.category = []
          let category = response.data.category;
          for (let key in category) {
            commit("updateCategoryList", category[key]);
          }
          state.products = []
          let products = response.data.products;
          for (let key in products) {
            commit("updateProductsList", products[key]);
          }
          return
        }
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}

