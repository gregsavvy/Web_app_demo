import Vuex from 'vuex'
import Vue from 'vue'
import products from './modules/products.js'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
  modules: {
    products
  }
})
