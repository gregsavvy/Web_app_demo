<template>
  <div id="app">
    <div class="container">
      <Navbar/>
    </div>
    <div class="container">
      <Products/>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import Products from "./components/Products.vue"

export default {
  name: "app",
  components: {
    Navbar,
    Products
  }
}
</script>

<style>
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
