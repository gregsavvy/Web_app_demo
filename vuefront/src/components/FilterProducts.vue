<template>
  <div class="select-wrapper">
    <span class="text-filter">Filter:</span>
    <div class="select-arrow"></div>
    <select @change="filterProducts($event)">
      <option value="200">200</option>
      <option value="100">100</option>
      <option value="50">50</option>
      <option value="20">20</option>
      <option value="10">10</option>
      <option value="5">3</option>
    </select>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "FilterProducts",
  methods: mapActions(["filterProducts"])
}
</script>

<style scoped>
.select-wrapper {
  position: relative;
  max-width: 100px;
  margin: -10px 0;
  border: 1px solid #1eb6f7;
  border-radius: 3px;
}

.select-wrapper:hover {
  box-shadow: 0px 0px 3px gray;
}

.select-wrapper select {
  max-width: 100px;
  height: 28px;
  padding: 0 10px 0 7px;
  background: transparent;
  border: 0;
  appearance: none;            /* remove arrow        */
  -webkit-appearance: none;    /* remove arrow Chrome */
  -moz-appearance: none;       /* remove arrow FF     */
}
.select-wrapper select::-ms-expand{
    display: none;             /* remove arrow IE     */
}

.select-arrow {
  width: 8px;
  height: 0px;
  background: #1eb6f7;
  position: absolute;
  z-index: -9999;
  right: 6px;
  top: 14px;
}
.select-arrow:before {
  content: '';
  position: absolute;
  top: -6px;
  border: 4px solid transparent;
  border-bottom-color: #1eb6f7;
  border-top: 0;
}
.select-arrow:after {
  content: '';
  position: absolute;
  top: 1px;
  border: 4px solid transparent;
  border-top-color: #1eb6f7;
  border-bottom: 0;
}

.text-filter {
  font-size: 13px;
}
</style>
