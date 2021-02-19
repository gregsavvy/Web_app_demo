<template>

      <div class="card">
       <img :src="getIMG(oneProduct.filename)" style="max-width:60%">
       <div class="container-card">
         <h4><b>{{ oneProduct.param1 }}</b></h4>
         <p>{{ oneProduct.param2 }}</p>
         <button @click="addToCart(oneProduct)">
         Add to cart
         </button>
       </div>
      </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "ProductComponent",
  methods: {
    ...mapActions(["fetchProduct", 'addToCart']),
    getIMG: function getIMG(filename) {
      var domain_back = 'http://localhost:5000/api/products_img/'
      var src = `${domain_back}${filename}`
      return src
    }
  },
  computed: mapGetters(["oneProduct"]),
  created() {
    this.fetchProduct(this.$route.params.id)
  }
}
</script>

<style scoped>

.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin-top: 45px;
  display:flex;
  min-width: 500px;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container-card {
  max-width:40%;
  padding: 5px 16px;
}

@media (max-width: 500px) {
  .products {
    grid-template-columns: 1fr;
  }
}
</style>
