<template>
  <div class="about">
    <div class="container">
      <Navbar/>
    </div>

    <div class="container">
      <CartNav/>
    </div>

    <div class="container-main">
      <h2>About this web app demo.</h2>
      <p>Please, read at <a href="https://github.com/gregsavvy/Web_app_demo">Github</a></p>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"
import CartNav from "../components/CartNav.vue"

export default {
  name: "About",
  components: {
    Navbar,
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
      min-height: 100%;
}

body {
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 100%;
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
