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

  cartProducts: (state) => {
    return state.cart.map(({ id, quantity }) => {
      const product = state.products.find(product => product._id === id)
      return {
        id: product._id,
        param1: product.param1,
        param2: product.param2,
        quantity
      }
    })
  },
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
      const item = state.cart.find(item => item.id === product._id)
      if (!item) {
        commit('addToCart', {id: product._id})
      } else {
        commit('incrementItemQuantity', {id: product._id})
      }
  },
  incrementItemQuantity ({state, commit}, product) {
    console.log(product)
    const item = state.cart.find(item => item.id === product.id)
    if (item) {
        commit('incrementItemQuantity', {id: product.id})
      }
    },
  decrementItemQuantity ({state, commit}, product) {
    const item = state.cart.find(item => item.id === product.id)
    if (item) {
      if (item.quantity <= 1) {
        commit('deleteFromCart', {id: product.id})
      } else {
        commit('decrementItemQuantity', {id: product.id})
      }
    }
  },
  deleteFromCart ({commit}, product) {
    commit('deleteFromCart', product)
  },
  checkout ({commit, state}, products) {
    commit('setCart', [])
  }
}

const mutations = {
  setProducts: (state, products) => {state.products = products},
  setProduct: (state, product) => {state.product = product},

  setCart: (state, cart) => {state.cart = cart},
  addToCart: (state, {id}) => {
    state.cart.push({
      id,
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
}
