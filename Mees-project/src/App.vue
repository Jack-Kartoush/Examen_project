<template>
  <div class="banner">
   <img src="./assets/img/logo-mees-catering-black.svg" alt="logo" class="logo">
   <h1>Openingstijden</h1>
   <!-- <img src="./assets/img/banner.png" alt="Banner Image" class="banner-img"> -->
   <h2>Van Maandag tot Vrijdag van 10:00 UUR tot 15:00 UUR</h2>
  </div>

   
<header>

    <Navbar/>
</header>
  <Auth v-if="isLoginScreen"/><!-- Dit moet gekoppeld worden aan de navbar -->
  <BroodSection v-else/>
</template>
<script setup>
import { onMounted, ref, toRef } from 'vue'
import Navbar from './components/Navbar.vue'
import Auth from './components/Auth.vue'
import BroodSection from './components/BroodSection.vue';

let isLoginScreen = ref(true);
window.gblIsLoginScreen = isLoginScreen;
</script>
