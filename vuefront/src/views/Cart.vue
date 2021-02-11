<template>
  <div class="cart">
    <div class="container">
      <Navbar/>
    </div>

    <div class="container">
      <CartNav/>
    </div>

    <div class="container">
      <CartComponent/>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"
import CartComponent from "../components/CartComponent.vue"
import CartNav from "../components/CartNav.vue"

export default {
  name: "Cart",
  components: {
    Navbar,
    CartComponent,
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
      font-family: Poppins;
      font-weight: 400;
      background-position: center;
      background-size: cover;
}

.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}
</style>
