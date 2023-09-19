<template>
    <div class="login-container">
        <form action="" @submit.prevent="signInWithEmail()">
            <label for="email">Email</label>
        <br />
        <input type="text" v-model="email" id="email" />
        <button @click="signInWithEmail">login</button>
        </form>
    </div>
  
    <ul>
      <li v-for="admin in Admin_Users" :key="admin.admin_id">{{ admin.admin_namefirst }}</li>
    </ul>
</template>

<script setup>
import { supabase } from '../supabase';
import { ref, onMounted } from 'vue';

const Admin_Users = ref([])
const email = ref("")

onMounted(() => {
    Validator()
})
async function Validator() {
    const { validator, err } = await supabase.from('Admin_Users').select("*")
    Admin_Users.value = validator
    // console.log(Admin_Users.value)
}

async function signInWithEmail() {
    //const { validator, err } = await supabase.from('Admin_Users').select()
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
