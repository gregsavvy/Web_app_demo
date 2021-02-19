<template>
  <div class="container">

  <a href="/cart" title="Shopping Cart">
    <span class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
      <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
      </svg>
    </span>
    <sup v-if="cartSize > 0" class="text">
      {{cartSize}}
    </sup>
  </a>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "CartNav",
  computed: {
    ...mapGetters(['cartSize'])
  }
}
</script>

<style scoped>
.container {
  float: right;
}

.icon,
.text {
  vertical-align:super;
  font-size: x-small;
  display: inline-block;
}
</style>
