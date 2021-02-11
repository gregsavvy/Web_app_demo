<template>
    <div class="products">
      
      <div
        v-for="product in allProducts"
        :key="product._id"
        class="product"
      >
        {{ product.param1 }}
      </div>
    </div>
</template>
exit
<script>
import { mapGetters, mapActions } from "vuex"
export default {
  name: "Products",
  methods: {
    ...mapActions(["fetchProducts"])
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
.product {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

@media (max-width: 500px) {
  .products {
    grid-template-columns: 1fr;
  }
}
</style>
