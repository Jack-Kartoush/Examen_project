
<template>
  <div class="login-container">
    <form  @submit.prevent="handleLogin">
      <div >
        <h1>Supabase + Vue 3</h1>
        <p>Sign in via magic link with your email below</p>
        <div>
          <input  required type="email" placeholder="Your email" v-model="email" />
        </div>
        <div>
          <input
            type="submit"
            class="button block"
            :value="loading ? 'Loading' : 'Send magic link'"
            :disabled="loading"
          />
        </div>
      </div>
    </form>


    <ul v-for="admin in Admin_Users " :key="admin">
      <li >{{ admin.admin_namefirst }} </li>
      <li >{{ admin.admin_email }} </li>
    </ul>


  </div>
</template>
<script setup>
import { onMounted, ref, toRefs } from 'vue'
import { supabase } from '../supabase'

const loading = ref(false)
const email = ref('')
const Admin_Users = ref()

onMounted(() => {
  FetchData()
})
async function FetchData() {
 
  let { data, error} = await supabase
  .from('Admin_Users')
  .select()
  

  
  if(error) {
    alert('Failed fetch')
    console.log(error)
  }
  if (data){
    Admin_Users.value = data
    console.log("admin value",Admin_Users.value)
  }
 if(email.value != Admin_Users.value.admin_email){
  alert("werkt ")
 }else{
  alert("niet werkt")
  return;
 }
      
}

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}

</script>
