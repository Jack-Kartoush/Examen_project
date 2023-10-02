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
  <BroodSection/>
</template>
<script setup>
import Navbar from './components/Navbar.vue'
import BroodSection from './components/BroodSection.vue';

</script>
