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
      <li><a href="#Broodjes" class="menu-btn">Broodjes</a></li>
      <li><a href="#Snacks" class="menu-btn">Snacks</a></li>
      <li><a href="#Soep" class="menu-btn">Soep</a></li>
      <li><a href="#Drankjes" class="menu-btn">Drankjes</a></li>
    </ul>
    <button type="submit" class="login-btn" v-if="!isLoginScreen" @click="isLoginScreen = true">Login</button>
  </nav>
</template>

<script setup>
import { ref } from "vue";
const isActive = ref(false);
const isLoginScreen = ref(false);
</script>
