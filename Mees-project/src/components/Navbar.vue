<template>
  <nav class="NavBar">
    <div class="hamburger" :class="{ active: isActive }">
      <button @click="isActive = !isActive">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <button
        v-if="isActive"
        class="close-btn"
        @click="isActive = false"
      ></button>
    </div>
    <ul class="menu" :class="{ active: isActive }">
      <li v-for="prod_cats in Product_Cat"><a :href="'#'+ prod_cats.prod_cat_name" class="menu-btn">{{ prod_cats.prod_cat_name }}</a></li>
    </ul>
    <button type="submit" class="login-btn" v-if="!isLoginScreen" @click="isLoginScreen = !isLoginScreen">Login</button>
    <button type="submit" class="login-btn" v-else @click="isLoginScreen = !isLoginScreen">Uitloggen</button>
  </nav>
</template>

<script setup>
import { onMounted, ref, toRef } from 'vue'
import { supabase } from '../supabase'

onMounted(() => {
  getAllProductCat();
});

const Product_Cat = ref([])
const isActive = ref(false);
let isLoginScreen = window.gblIsLoginScreen;

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
