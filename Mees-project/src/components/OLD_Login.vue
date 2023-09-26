<template>
    <div class="login-container">
        <h1>Login pagina</h1>
        <form action="" @submit.prevent="">
            <label for="email">Email</label>
        <br />
        <input type="text" v-model="email" id="email" />
        <button @click="Validator()">login</button>
        </form>
    </div>
  
</template>

<script setup>
import { supabase } from '../supabase';
import { ref, onMounted } from 'vue';

const Admin_Users = ref([])
const email = ref("")

onMounted(() => {
    
})

async function Validator() {

 let { data, error} = await supabase
 .from('Admin_Users')
 .select()
 
 if(error) {
   alert('Failed fetch')
   console.log(error)
 }

 if (data){
    Admin_Users.value = data
    const Checked_Email = Admin_Users.value.filter((e) => e.admin_email == email.value).map((e) => { return {email: e.admin_email}});
    //console.log("Email check: ",Checked_Email)
    if(!Checked_Email[0]){
        //alert("false")
        return
    }
    if(Checked_Email[0].email == email.value){
        //alert("passed")
        signInWithEmail()
    }
 }
     
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
