<script setup>
import { onMounted, ref, toRefs } from 'vue'
//import Login from './components/Login.vue'
import Admin_Panel from './components/Admin_Panel.vue'
import Auth from './components/Auth.vue'
import { supabase } from './supabase'


const session = ref()


onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
</script>

<template>
  <div class="container" style="padding: 50px 0 100px 0">
    <Admin_Panel v-if="session" :session="session" />
    <Auth v-else />
  </div>
</template>