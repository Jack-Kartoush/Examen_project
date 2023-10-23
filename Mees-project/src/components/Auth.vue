<template>
  <div class="login-container">
    <form @submit.prevent="Validator()">
      <div class="login_form">
        <h1 class="login_title">Inloggen</h1>

        <label for="email">Email: </label>
        <input
          id="email"
          class="login_input"
          required
          type="email"
          placeholder="Uw email"
          v-model="email"
        />
        <div class="btn_container">
          <button
            type="submit"
            class="login_btn"
            :value="loading ? 'Laden' : 'Versturen'"
            :disabled="loading"
          >
            versturen
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const loading = ref(false)
const Admin_Users = ref([])
const email = ref("")

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
        //console.log("Checked mail: ",Checked_Email[0])
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

async function signInWithEmail(){
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
