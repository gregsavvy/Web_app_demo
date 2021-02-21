<template>
  <div class="cart">
    <div class="container">
      <Navbar/>
    </div>

    <div class="container">
      <CartNav/>
    </div>

    <div class="container-main">
      <ProductComponent/>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"
import CartNav from "../components/CartNav.vue"
import ProductComponent from "../components/ProductComponent.vue"

export default {
  name: "Product",
  components: {
    Navbar,
    CartNav,
    ProductComponent
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
      height: 100%;
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
