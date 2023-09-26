<template>
  <p>Dit is het admin paneel</p>

  <form action="">
    <p>Voeg admins toe</p>
  </form>
  <button v-if="!addProd" @click="addProd = true">Voeg een product +</button>
  <div class="prod-form" v-else>
    <label for="name">Product name</label>
    <input type="text" id="name" v-model="prodName" />
    <button type="submit" @click="createProduct()">add</button>
  </div>
  <ul
    v-for="product in Products"
    :key="product"
    :id="product.prod_id"
    style="display: flex; justify-content: space-around"
  >
    <li>{{ product.prod_name }}</li> 
    
    <button v-if="!editProd" @click="editProduct(product)">
      Bewerken
    </button>
    <div class="edit-form" v-else>

      <label for="ProdName">Product name</label>
      <input type="text" v-model="product.prodname" />

      
      <button type="submit" @click="saveProduct(product)">save</button>
    </div>
    <button @click="delProduct(product)">verwijderen</button>
  </ul>

  <div>
    <button class="button block" @click="signOut">Sign Out</button>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";

const props = defineProps(["session"]);
const { session } = toRefs(props);

const loading = ref(true);
const addProd = ref(false);
const editProd = ref(false);
const Products = ref([]);
const prodName = ref("");

const editProdName = ref("");
const editProdPrice = ref();


// const username = ref('')
// const website = ref('')
// const avatar_url = ref('')

onMounted(() => {
  //getProfile()
  getAllProducts();
  
});

async function getAllProducts() {
  //get all current products
  let { data, error } = await supabase.from("Products").select();

  if (error) {
    alert("Failed fetch");
    console.log(error);
  }
  if (data) {
    Products.value = data;
  }
}
function editProduct(product ){
  const elementID = document.getElementById(product.prod_id);
  console.log("product id", elementID);
  
}
async function saveProduct(product) {
  let id = ref(product.prod_id);
  console.log(id.value);
  const { error } = await supabase
    .from("Products")
    .update({ prod_name: product.prodname})
    .eq("prod_id", id.value);

  getAllProducts();
}
async function delProduct(product) {
  let id = ref(product.prod_id);
  console.log(id.value);
  const { error } = await supabase
    .from("Products")
    .delete()
    .eq("prod_id", id.value);
  getAllProducts();
}

async function createProduct() {
  const { error } = await supabase.from("Products").insert({
    prod_name: prodName.value,
  });
  getAllProducts();
  addProd.value = false;
  prodName.value = null;
}



async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

// async function getProfile() {
//   try {
//     loading.value = true
//     const { user } = session.value

//     let { data, error, status } = await supabase
//       .from('profiles')
//       .select(`username, website, avatar_url`)
//       .eq('id', user.id)
//       .single()

//     if (error && status !== 406) throw error

//     if (data) {
//       username.value = data.username
//       website.value = data.website
//       avatar_url.value = data.avatar_url
//     }
//   } catch (error) {
//     alert(error.message)
//   } finally {
//     loading.value = false
//   }
// }
</script>
