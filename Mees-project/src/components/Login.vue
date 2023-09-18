<template>


</template>

<script setup>
    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithOtp({
            email: 'archies559@gmail.com',
            options: {
            //emailRedirectTo: 'localhost:',
            },
        })
    }
    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }

</script>
