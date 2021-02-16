const domain_back = 'http://localhost:5000'
// const domain_front = 'http://localhost:8080'

const state = {
  products: [],
  product: {},

  cart: []
}

const getters = {
  allProducts: state => state.products,
  oneProduct: state => state.product,

  cartProducts: state => state.cart,
  cartSize: state => state.cart.length
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
  },



  addToCart ({state, commit}, product) {
      const item = state.cart.find(item => item.id === product.id)
      if (!item) {
        commit('addToCart', product)
      } else {
        commit('incrementItemQuantity', {id: product.id})
      }
  },
  incrementItemQuantity ({state, commit}, product) {
    const item = state.cart.find(item => item.id === product.id)
    if (item) {
        commit('incrementItemQuantity', product)
      }
    },
  decrementItemQuantity ({state, commit}, product) {
    const item = state.cart.find(item => item.id === product.id)
    if (item) {
      if (item.quantity <= 1) {
        commit('deleteFromCart', product)
      } else {
        commit('decrementItemQuantity', product)
      }
    }
  },
  deleteFromCart ({commit}, product) {
    commit('deleteFromCart', product)
  },
  checkout ({commit, state}, products) {
    commit('setCart', [])
}

const mutations = {
  setProducts: (state, products) => {state.products = products},
  setProduct: (state, product) => {state.product = product},

  setCart: (state, cart) => {state.cart = cart},
  addToCart: (state, product) => {
    state.cart.push({
      product,
      quantity: 1
    })
  },
  incrementItemQuantity: (state, {id}) => {
    let item = state.cart.find(item => item.id === id)
    item.quantity++
  },
  decrementItemQuantity: (state, {id}) => {
    let item = state.cart.find(item => item.id === id)
    item.quantity--
  },
  deleteFromCart: (state, {id}) => {
    let index = state.cart.findIndex(item => item.id === id)
    if (index >= 0) {
      state.cart.splice(index, 1)
    }
  }
}


export default {
  state,
  getters,
  actions,
  mutations
};
