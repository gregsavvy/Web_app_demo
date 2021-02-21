<template>
  <div>
    <h2>Shopping Cart</h2>

    <table class="table table-hover">
      <thead v-show="cartProducts.length>0">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Count</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <p v-show="!cartProducts.length"><i>Cart is empty.</i></p>
            <tr v-for="product in cartProducts" :key="product.id">
                <td>{{product.param1}}</td>
                <td>{{product.param2}}</td>
                <td>{{product.quantity}}</td>
                <td>
                  <button class="action-btn-plus"
                      @click="incrementItemQuantity(product)">+</button>
                <br>
                <button class="action-btn-minus"
                    :disabled="product.quantity<1"
                    @click="decrementItemQuantity(product)">-</button>
                <br>
                <button class="action-btn-delete"
                    @click="deleteFromCart(product)">x</button>
                </td>
            </tr>


      </tbody>

      </table>
      <span><b>Total: </b></span>
      <span>Free</span>
      <p><button class="checkout-btn"
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
.checkout-btn {
  border-color: #e56317;
  border-style: solid;
  border-width: thin;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 0px;
  float:left;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  color: #e56317;
  border-radius: 4px;
  transition-duration: 0.4s;
  background-color: white;
}

.checkout-btn:hover {
  background-color: #f2762e;
  color: white;
}

/*table styles */
table {
  border-collapse: collapse;
}

th {
  text-align: inherit;
  text-align: -webkit-match-parent;
}

ul {
  margin-top: 0;
  margin-bottom: 1rem;
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}

.table tbody + tbody {
  border-top: 2px solid #dee2e6;
}


.table-hover tbody tr:hover {
  color: #212529;
  background-color: rgba(0, 0, 0, 0.075);
}

.action-btn-minus {
  background-color: #1eb6f7;
  margin-bottom: 5px;
  margin-top: 2px;
  padding: 5px 21px;
  text-align: center;

  display: inline-block;
  font-size: 15px;
  border-radius: 4px;
  border: none;
  color:white;
}

.action-btn-minus:hover {
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.2);
}

.action-btn-plus {
  background-color: #2ecc71;
  margin-bottom: 5px;
  margin-top: 2px;
  padding: 5px 20px;
  text-align: center;

  display: inline-block;
  font-size: 15px;
  border-radius: 4px;
  border: none;
  color:white;
}

.action-btn-plus:hover {
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.2);
}

.action-btn-delete {
  background-color: #d12a2a;
  margin-bottom: 5px;
  margin-top: 2px;
  padding: 5px 21px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  border-radius: 4px;
  border: none;
  color:white;
}

.action-btn-delete:hover {
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.2);
}


</style>
