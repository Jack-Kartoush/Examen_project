<template>
  <Slideshow />
  <section
    v-for="prodCat in Product_Cats"
    class="BroodContainer"
    :key="prodCat.prod_cat_id"
    :id="[[prodCat.prod_cat_name]]"
  >
    <div class="title_container">
      <h1 class="title">{{ prodCat.prod_cat_name }}</h1>
    </div>
    <div class="prod_container">
      <div
        v-for="(product, index) in Products.filter(
          (product) => product.prod_cat_id === prodCat.prod_cat_id
        )"
        :key="product"
        class="prod_wraper"
      >
        <img src="../assets/img/broodje.jpg" alt="Nature" class="responsive" />
        <div class="prod_title">
          <span>{{ product.prod_name }}</span>
          <span>{{ product.prod_price }}</span>
        </div>
        <p class="text">
          {{ product.prod_desc }}
        </p>
        
       
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted, ref, toRef } from "vue";
import { supabase } from "../supabase";
import Slideshow from "./Slideshow.vue";

const Products = ref([]);
const Product_Cats = ref([]);

onMounted(() => {
  getAllProducts();
  getAllProductCat();
});

async function getAllProducts() {
  //get all current products
  let { data, error } = await supabase.from("Products").select();

  if (error) {
    alert("Failed fetch");
    console.log(error);
  }
  if (data) {
    Products.value = data;
  }
}

async function getAllProductCat(Products) {
  //get all current product categories
  let { data, error } = await supabase.from("Product_Cat").select();

  if (error) {
    alert("Failed fetch");
    console.log(error);
  }
  if (data) {
    Product_Cats.value = data;
  }
}
</script>
