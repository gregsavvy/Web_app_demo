<template>
    <div class="products">

      <div v-for="product in allProducts"
      :key="product._id"
      class="card"
      >
       <img :src="getIMG(product.filename)" style="width:100%">

       <div class="container-card">
         <h4><b>{{ product.param1 }}</b></h4>
         <p>{{ product.param2 }}</p>
       </div>
      </div>

    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "Products",
  methods: {
    ...mapActions(["fetchProducts"]),
    getIMG: function getIMG(filename) {
      var domain_back = 'http://localhost:5000/api/products_img/'
      var src = `${domain_back}${filename}`
      return src
    }
  },
  computed: mapGetters(["allProducts"]),
  created() {
    this.fetchProducts()
  }
}
</script>

<style scoped>
.products {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container-card {
  padding: 2px 16px;
}

@media (max-width: 500px) {
  .products {
    grid-template-columns: 1fr;
  }
}
</style>
