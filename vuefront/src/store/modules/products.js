const domain_back = 'http://localhost:5000'
// const domain_front = 'http://localhost:8080'

const state = {
  products: [],
  product: {}
}

const getters = {
  allProducts: state => state.products,
  oneProduct: state => state.product
}

const actions = {
  async fetchProducts({ commit }) {
    /*eslint-disable no-unused-vars*/
    const response = await fetch(
      `${domain_back}/api/products`
    )
    .then(response => response.json())
    .then(data => {
      commit('setProducts', data)
    })
    .catch(error => console.log(error))
  },

  async fetchProduct({ commit }, id) {
    /*eslint-disable no-unused-vars*/
    const response = await fetch(
      `${domain_back}/api/products/`+id
    )
    .then(response => response.json())
    .then(data => {
      commit('setProduct', data)
    })
    .catch(error => console.log(error))
    }
}

const mutations = {
  setProducts: (state, products) => {state.products = products},
  setProduct: (state, product) => {state.product = product}
}

export default {
  state,
  getters,
  actions,
  mutations
};
