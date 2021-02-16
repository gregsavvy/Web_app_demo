<template>
  <div>
    <h2>Shopping Cart</h2>
          <p v-show="!cartProducts.length"><i>Cart is empty.</i></p>
          <ul>
              <li v-for="product in cartProducts" :key="product.id">
                  {{product.param1}} | {{product.param2}}
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
          <p>Total: {{total}}</p>
          <p><button
              :disabled="!cartProducts.length"
              @click="checkout(products)">Checkout</button></p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "CartComponent",
  computed: {
        mapGetters(["cartProducts"])
        })
    },
    methods: {
        ...mapActions([
            'checkout',
            'deleteFromCart',
            'decrementItemQuantity',
            'incrementItemQuantity'
        ])
    }
}
</script>

<style scoped>

</style>
