<template>
  <div>
    <h2>Shopping Cart</h2>
          <p v-show="!cartProducts.length"><i>Cart is empty.</i></p>
          <ul>
              <li v-for="product in cartProducts" :key="product.id">
                  {{product.param1}} | {{product.param2}} | {{product.quantity}}
                  <br>
                  <button
                      :disabled="product.quantity<1"
                      @click="decrementItemQuantity(product)">-</button>
                  |
                  <button
                      @click="incrementItemQuantity(product)">+</button>
                  |
                  <button
                      @click="deleteFromCart(product)">x</button>
              </li>
          </ul>
          <p><button
              :disabled="!cartProducts.length"
              @click="checkout(cartProducts)">Checkout</button></p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "CartComponent",
    methods: {
        ...mapActions([
            'checkout',
            'deleteFromCart',
            'decrementItemQuantity',
            'incrementItemQuantity'
        ])
    },
    computed: {
      ...mapGetters(['cartProducts'])
    }

}
</script>

<style scoped>

</style>
