<template>
    <div class="products">

      <div v-for="product in allProducts"
      :key="product._id"
      class="card"
      >
      <div class="container-img">
       <img :src="getIMG(product.filename)">
     </div>
       <div class="container-card">
         <span :class="`${product.param3}`">{{ product.param3 }}</span>
         <span><b>{{ product.param1 }}</b></span>
         <p>{{ product.param2 }}</p>

      </div>

      <div class="buttons-card">
         <router-link class="view-btn" :to="{ name: 'Product', params: { id: product._id } }">View</router-link>
         <button class="add-btn" @click="addToCart(product)">
         Add to cart
         </button>
      </div>
      </div>

    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "Products",
  methods: {
    ...mapActions(["fetchProducts", 'addToCart']),
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
  flex:auto;
  float:right;
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}

.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  display:flex;
  flex-direction:column;
  flex:1;
  background-color: white;
}

.true {
  background-color: #2ecc71;
  margin-bottom: 5px;
  margin-top: 2px;
  padding: 3px 7px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  color: white;
  border-radius: 4px;
  width:10%;

}

.false {
  background-color: #e56317;
  margin-bottom: 5px;
  margin-top: 2px;
  padding: 3px 7px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  color: white;
  border-radius: 4px;
  width:10%;

}

.view-btn {
  border-color: #1eb6f7;
  border-style: solid;
  border-width: thin;
  margin-bottom: 5px;
  float:left;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  color: #1eb6f7;
  border-radius: 4px;
  transition-duration: 0.4s;
}

.add-btn {
  border-color: #e56317;
  border-style: solid;
  border-width: thin;
  margin-bottom: 5px;
  float:left;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  color: #e56317;
  border-radius: 4px;
  transition-duration: 0.4s;
  background-color: white;

}

.add-btn:hover {
  background-color: #f2762e;
  color: white;
}

.view-btn:hover {
  background-color: #1eb6f7;
  color: white;
}

img {
  border-radius: 5px 5px 0 0;
  max-width: 100%;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container-card {
  float: left;
  padding: 0px 5px 5px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
}

.buttons-card {
  float: left;
  padding: 0px 5px 5px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  flex:1;
  margin-top: auto;
}

.container-img {
  padding-bottom: 65%;
  height: 0;
  overflow: hidden;
}


@media (max-width: 864px) {
  .products {
    grid-template-columns: 1fr;
  }
}
</style>
