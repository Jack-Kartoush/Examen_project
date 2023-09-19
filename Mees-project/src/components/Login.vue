<template>
  <label for="email">Email</label>
  <br />
  <input type="text" v-model="email" id="email" />
  <button @click="signInWithEmail">login</button>
  
</template>

<script setup>
import { supabase } from '../supabase';
import { ref } from 'vue';
const email = ref("")



async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'localhost:5173',
    },
  });
  email.value = null
}
async function signOut() {
  const { error } = await supabase.auth.signOut();
}
</script>
