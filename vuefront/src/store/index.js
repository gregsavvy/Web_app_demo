import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from "vuex-persistedstate"
import products from './modules/products.js'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
  modules: {
    products
  },
  plugins: [createPersistedState({
      key: "cart",
      paths: ["products", "cart"]
    })
  ]
})
