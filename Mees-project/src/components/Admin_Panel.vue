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
    <button type="submit" @click="createProduct()">add</button>
  </div>
  <EditProd_popup/>
  <ul>
    <li
      style="display: flex; justify-content: space-around; padding: 20px"
      v-for="(product, index) in Products"
      :key="product"
      :id="product.prod_id"
    >
     <p> {{ product.prod_name }} </p>
      <button v-if="!product.index" @click="product.index = !product.index">Bewerken</button>
      <div class="edit-form" v-else>
        <label for="ProdName">Product name</label>
        <input type="text" v-model="editProdName"/>

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
import EditProd_popup from "./EditProd_popup.vue";

const props = defineProps(["session"]);
const { session } = toRefs(props);

const loading = ref(true);
const addProd = ref(false);
const Products = ref([]);
const prodName = ref("");
const editProdName = ref("");

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
  }
}

async function createProduct() {
  const { error } = await supabase.from("Products").insert({
    prod_name: prodName.value,
  });
  getAllProducts();
  addProd.value = false;
  prodName.value = null;
}

async function saveProduct(product) {
  const id = ref(product.prod_id);
  // console.log("id ",id.value);
  // console.log("product.editProdName  ", product.prod_name );
  // console.log("editProdName  ", editProdName.value );
  if (!editProdName.value){
    return
  } else {
    const { error } = await supabase
    .from("Products")
    .update({ prod_name: editProdName.value})
    .eq("prod_id", id.value);

    getAllProducts();
    editProdName.value = null
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
