<template>
  <div class="about">
    <div class="container">
      <Navbar/>
    </div>

    <div class="container">
      <CartNav/>
    </div>

    <div class="container-main">
      <h2>About this web app demo</h2>
      <p>
      This is a Web app demo which consists of 3 separate modules:
      <br>
      1. NODE.js (without Express) | RestAPI Backend | ex. localhost:5000/api/products
      <br>
      2. Vanilla JS | Admin frontend | ex. localhost:8080
      <br>
      3. VUE.js | Client frontend | ex. localhost:8081 (in development)
      <br>
      <br>
      Scope creep consideration for the demo:
      <br>
      1. No cryptographic hash functions implementation on session cookies and user passwords (ex. bcrypt).
      <br>
      2. No https implementation (consequently no 'Secure' parameter on cookie headers).
      <br>
      3. No API test framework implementation (ex. Mocha).
      <br>
      4. No proper storage for users, currently they are stored in './backend/models/users.json' for ease of running this demo (ex. local mySQL implementation would require Docker implementation as well).
      <br>
      5. No checkout and payment functionality on frontend, consequently no inventory management functionality as well.
      <br>
      <br>

      Installation:
      <br>
      1. Install Node.js (<a href="https://nodejs.org/en/">https://nodejs.org/en/</a>).
      <br>
      2. Pull git repo into any directory, - $git remote add demo https://github.com/gregsavvy/Test-Web-App.git), then $git pull demo
      <br>
      3. Install dependencies, - $npm install
      <br>
      <br>

      Run:
      <br>
      1. From the main directory, - $npm start
      <br>
      <br>

      PS:
      <br>
      Do not run this app on production systems without taking into consideration the aforementioned scope creep of the demo.</p>
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
