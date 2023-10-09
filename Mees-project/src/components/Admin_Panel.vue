<!-- Dit werkt -->
<template>
  <p>Dit is het admin paneel</p>

  <form action="">
    <p>Voeg admins toe</p>
  </form>
  <button v-if="!addProd" @click="addProd = true">Voeg een product +</button>
  <div class="prod-form" v-else>
    <label for="name">Product name</label>
    <input type="text" id="name" v-model="prodName" />
    <!-- <button type="submit" @click="createProduct()">add</button> -->
  </div>
  <Popup :products="Products" @getProducts="getAllProducts()"/>
  <ul>
    <li
      style="display: flex; justify-content: space-around; padding: 20px"
      v-for="(product, index) in Products"
      :key="product"
      :id="product.prod_id"
    >
     <p> {{ product.prod_name }} </p>
     <p> {{ product.prod_cat_id }} </p>
     <p> {{ product.prod_desc }} </p>
      <button v-if="!product.index" @click="product.index = !product.index">Bewerken</button>
      <div class="edit-form" v-else>
        <label for="ProdName">Product name</label>
        <input type="text" v-model="editProdName"/>
        <label for="prodCat">Product Cat</label>
        <input type="number" min="1" max="4" v-model="editProdCat"/>
        <label for="prodDesc">Product Desc</label>
        <input type="text" v-model="editProdDesc"/>

        <button type="submit" @click="saveProduct(product)">save</button>
      </div>
      <button @click="delProduct(product)">verwijderen</button>
    </li>
  </ul>

  <div>
    <button class="button block" @click="signOut">Sign Out</button>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import Popup from "./Popup.vue";

const props = defineProps(["session"]);
const { session } = toRefs(props);

const loading = ref(true);
const addProd = ref(false);
const Products = ref([]);
let prodName = ref("");
let prodCat = ref("");
let prodDesc = ref("");
let editProdName = ref("");
let editProdCat = ref("");
let editProdDesc = ref("");


onMounted(() => {
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

    // editProdName = product.prod_name
    // editProdCat = product.prod_cat_id
    // editProdDesc = product.prod_desc
  }
}

async function createProduct() {
  const { error } = await supabase.from("Products").insert({
    prod_name: prodName.value,
    prod_cat_id: prodCat.value,
    prod_desc: prodDesc.value,
  });
  getAllProducts();
  addProd.value = false;
  prodName.value = null;
  prodCat.value = null;
  prodDesc.value = null;
}

async function saveProduct(product) {
  const id = ref(product.prod_id);
  // console.log("id ",id.value);
  // console.log("product.editProdName  ", product.prod_name );
  // console.log("editProdName  ", editProdName.value );
  if (!editProdName.value && !editProdCat.value){
    return
  } else {
    const { error } = await supabase
    .from("Products")
    .update({ 
      prod_name: editProdName.value,
      prod_cat_id: editProdCat.value,
      prod_desc: editProdDesc.value,
    })
    .eq("prod_id", id.value);

    getAllProducts();
    editProdName.value = null
    editProdCat.value = null
    editProdDesc.value = null
    
  }
}

async function delProduct(product) {
  let id = ref(product.prod_id);
  // console.log(id.value);
  const { error } = await supabase.from("Products").delete().eq("prod_id", id.value);
  getAllProducts();
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

</script>
