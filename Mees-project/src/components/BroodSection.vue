<template>
  <Slideshow />
  <section v-for="prod_cats in Product_Cat" class="BroodContainer" :key="prod_cats.prod_cat_id" :id="[[prod_cats.prod_cat_name]]">
    <!-- <div class="prod_title">
            <span>Vega broodje</span>
            <span>3.99</span>
          </div> -->
    <div class="title_container">
      <h1 class="title">{{ prod_cats.prod_cat_name }}</h1>
    </div>

    <div v-for="products in Products" class="prod_container">
      <div class="prod_wraper">
        <img src="../assets/img/broodje.jpg" alt="Nature" class="responsive" />
        <div class="prod_title">
          <span>Vega broodje</span>
          <span>3.99</span>
        </div>
        <p class="text">
          Als we het hebben over een goed alternatief voor een hamburger, dan
          denken wij gelijk aan de vegetarische variant van oesterzwammen. Je
          maakt ze in een handomdraai en ze zijn écht net zo lekker als een
          vleesburger! In dit recept brengen we de burgers op smaak met een
          heerlijk frisse, zelfgemaakte dragonmayonaise.
        </p>
      </div>

      <!-- <div class="prod_wraper">
        <img src="../assets/img/broodje.jpg" alt="Nature" class="responsive" />
        <div class="prod_title">
          <span>Vega broodje</span>
          <span>3.99</span>
        </div>
        <p class="text">
          Als we het hebben over een goed alternatief voor een hamburger, dan
          denken wij gelijk aan de vegetarische variant van oesterzwammen. Je
          maakt ze in een handomdraai en ze zijn écht net zo lekker als een
          vleesburger! In dit recept brengen we de burgers op smaak met een
          heerlijk frisse, zelfgemaakte dragonmayonaise.
        </p>
      </div>

      <div class="prod_wraper">
        <img src="../assets/img/broodje.jpg" alt="Nature" class="responsive" />
        <div class="prod_title">
          <span>Vega broodje</span>
          <span>3.99</span>
        </div>
        <p class="text">
          Als we het hebben over een goed alternatief voor een hamburger, dan
          denken wij gelijk aan de vegetarische variant van oesterzwammen. Je
          maakt ze in een handomdraai en ze zijn écht net zo lekker als een
          vleesburger! In dit recept brengen we de burgers op smaak met een
          heerlijk frisse, zelfgemaakte dragonmayonaise.
        </p>
      </div> -->
    </div>
  </section>
</template>
<script setup>
import { onMounted, ref, toRef } from 'vue'
import { supabase } from '../supabase'
import Slideshow from "./Slideshow.vue"

const Products = ref([])
const Product_Cat = ref([])

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

async function getAllProductCat() {
  //get all current products
  let { data, error } = await supabase.from("Product_Cat").select();

  if (error) {
    alert("Failed fetch");
    console.log(error);
  }
  if (data) {
    Product_Cat.value = data;
  }
}
</script>
