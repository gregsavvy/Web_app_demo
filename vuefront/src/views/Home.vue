<template>
    <div>
    <div class="container">
      <Navbar/>
    </div>

    <div class="container">
      <CartNav/>
    </div>

    <div class="container-main">
      <FilterProducts/>
      <Products/>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"
import FilterProducts from "../components/FilterProducts.vue"
import Products from "../components/Products.vue"
import CartNav from "../components/CartNav.vue"

export default {
  name: "Home",
  components: {
    Navbar,
    FilterProducts,
    Products,
    CartNav
  }
}
</script>

<style scoped>
* {
      box-sizing: border-box;
}

html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100vh;
}

body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100vh;
      font-family: Tahoma, Verdana;
      font-weight: 400;
      background-position: center;
      background-size: cover;
}

.container {
  max-width: 1100px;
  margin: auto;
  padding: 0 2rem;
}

.container-main {
  margin-top: 70px;
  max-width: 1100px;
  margin: auto;
  padding: 2rem 4rem;
}
</style>
