<template>
  <div class="banner">
    <img
      src="./assets/img/logo-mees-catering-black.svg"
      alt="logo"
      class="logo"
    />
    <h1>Openingstijden</h1>
    <!-- <img src="./assets/img/banner.png" alt="Banner Image" class="banner-img"> -->
    <h2>Van Maandag tot Vrijdag van 10:00 UUR tot 15:00 UUR</h2>
  </div>

  <header>
    <Navbar />
  </header>
  <Admin_Panel v-if="session" :session="session" />
  <div v-else class="container" style="padding: 50px 0 100px 0">
    <Auth
      v-if="isLoginScreen"
    /><!-- Dit moet gekoppeld worden aan de navbar -->
    <BroodSection v-else />
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from "vue";
import Navbar from "./components/Navbar.vue";
import BroodSection from "./components/BroodSection.vue";
import Admin_Panel from "./components/Admin_Panel.vue";
import Auth from "./components/Auth.vue";
import { supabase } from "./supabase";

const session = ref();
let isLoginScreen = ref(false);
window.gblIsLoginScreen = isLoginScreen;

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
</script>
