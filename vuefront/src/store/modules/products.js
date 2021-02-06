const domain_back = 'http://localhost:5000'
// const domain_front = 'http://localhost:8080'

const state = {
  products: []
}

const getters = {
  allProducts: state => state.products
}

const actions = {
  async fetchProducts({ commit }) {
// eslint-disable-next-line no-unused-vars
    const response = await fetch(
      `${domain_back}/api/products`
    )
    .then(response => response.json())
    .then(data => {
      commit('setProducts', data)
    })
    .catch(error => console.log(error))
  }

  // async filterProducts({ commit }, e) {
  //   // Get selected number
  //   const limit = parseInt(
  //     e.target.options[e.target.options.selectedIndex].innerText
  //   );
  //
  //   const response = await axios.get(
  //     `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
  //   );
  //
  //   commit('setProducts', response.data);
  // }
}

const mutations = {
  setProducts: (state, products) => {state.products = products}
}

export default {
  state,
  getters,
  actions,
  mutations
};
