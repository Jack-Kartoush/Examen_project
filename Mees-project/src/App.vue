

<template>
  <div class="container" style="padding: 50px 0 100px 0">
  
    <Account v-if="session" :session="session" />
    <Login v-else />
 
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs } from 'vue'
import Login from './components/Login.vue'
import Account from './components/Account.vue'
import Auth from './components/Auth.vue'
import { supabase } from './supabase'
import HomePage from './components/HomePage.vue'

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