<template>
  <div class="about">
    <div class="container">
      <Navbar/>
    </div>

    <div class="container">
      <CartNav/>
    </div>

    <div class="container-main">
      <h2>Contacts</h2>
        <p>If you have any questions please contact me:</p>
        <img width="25px" height="25px" src="../assets/icons/gmail.png">
          <a href="mailto:gregsavvy@gmail.com">gregsavvy@gmail.com</a>
        <br>
        <br>
        <img width="25px" height="25px" src="../assets/icons/telegram.png">
          <a href="https://telegram.me/Gregory_Savitsky">t.me/Gregory_Savitsky</a>
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
  padding: 0 2rem;
}

.container-main {
  margin-top: 70px;
  max-width: 1100px;
  margin: auto;
  padding: 2rem 4rem;
}
</style>
