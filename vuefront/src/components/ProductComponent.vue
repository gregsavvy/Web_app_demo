<template>
      <div class="card">

          <div class="container-img" v-for="i in [currentIndex]" :key="i">
            <img :src="getIMG(oneProduct.filename)" />
            <div class="control-card">
              <a class="prev" @click="prev(oneProduct.filename.length)" href="#">&#10094; Previous image</a>
              <a class="next" @click="next(oneProduct.filename.length)" href="#">&#10095; Next image</a>
            </div>
          </div>

       <div class="container-card">
         <span :class="`${oneProduct.param3}`">{{ oneProduct.param3 }}</span>
         <h4><b>{{ oneProduct.param1 }}</b></h4>
         <p>{{ oneProduct.param2 }}</p>
         <button class="add-btn" @click="addToCart(oneProduct)">
         Add to cart
         </button>
       </div>

      </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "ProductComponent",
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    ...mapActions(["fetchProduct", 'addToCart']),
    getIMG: function getIMG(filenames) {
      if (this.currentIndex>filenames.length-1) {
        this.currentIndex = 0
      } else if (this.currentIndex<0) {
        this.currentIndex = filenames.length-1
      }
      let index = this.currentIndex
      var domain_back = 'http://localhost:5000/api/products_img/'
        var src = `${domain_back}${filenames[index]}`
        return src
      },
    next: function() {
        this.currentIndex += 1
    },
    prev: function() {
        this.currentIndex -= 1
    }
  },
  computed: mapGetters(["oneProduct"]),
  created() {
    this.fetchProduct(this.$route.params.id)
  }
}
</script>

<style scoped>

.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  margin-top: 45px;
  display:flex;
  min-width: 500px;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container-card {
  float:left;
  max-width:40%;
  padding: 5px 16px;
}

.add-btn {
  border-color: #e56317;
  border-style: solid;
  border-width: thin;
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

.add-btn:hover {
  background-color: #f2762e;
  color: white;
}

.true {
  background-color: #2ecc71;
  margin-bottom: 5px;
  margin-left: 2px;
  float:right;
  padding: 3px 7px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  color: white;
  border-radius: 4px;
}

.false {
  background-color: #e56317;
  margin-bottom: 5px;
  margin-left: 2px;
  float:right;
  padding: 3px 7px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 10px;
  color: white;
  border-radius: 4px;
}

img {
  height:auto;
  max-width:100%;
}

.container-img {
  position: relative;
  max-width:75%;
}

.prev, .next {
  padding: 0px 5px 5px;
  margin-top: auto;
  cursor: pointer;
  width: auto;
  background-color: grey;
  color: white;
  font-size: 15px;
  transition: 0.2s ease;
  border-radius: 2px;
  text-decoration: none;
  user-select: none;
  opacity: 80%;
}

.next {
  float: right;
}

.prev {
  float: left;
}

.control-card {
  width:100%;
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 18px;
}

.next {
  right: 0;
}

.prev {
  left: 0;
}

.prev:hover, .next:hover {
  background-color: #1eb6f7;
  opacity: 100%;
}

@media (max-width: 500px) {
  .products {
    grid-template-columns: 1fr;
  }
}
</style>
