<template>
  <label for="email">Email</label>
  <br />
  <input type="text" id="email" />
  <button @click="signInWithEmail">login</button>
</template>

<script setup>
import { supabase } from '../supabase';
async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: "jackkartosh@gmail.com",
    options: {
      emailRedirectTo: 'https://example.com/welcome',
    },
  });
}
async function signOut() {
  const { error } = await supabase.auth.signOut();
}
</script>
