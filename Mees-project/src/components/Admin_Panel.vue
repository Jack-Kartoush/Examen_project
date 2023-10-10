<!-- Dit werkt -->
<template>
  <p>Dit is het admin paneel</p>

  <form action="">
    <p>Voeg admins toe</p>
  </form>
  <Popup
    :id_btn="(id_btn = 'add')"
    @getProducts="getAllProducts()"
  />
  <ul>
    <li
      style="display: flex; justify-content: space-around; padding: 20px"
      v-for="(product, index) in Products"
      :key="product"
    >
      <!-- <p> {{ product.prod_id }} </p> -->
      <p>{{ product.prod_name }}</p>
      <p>{{ product.prod_price }}</p>
      <p>{{ product.prod_desc }}</p>

      <Popup
        :id_btn="(id_btn = 'edit')"
        v-if="!product.index"
        @getProducts="getAllProducts()"
        @click="product.index = !product.index"
        :id_producten="product.prod_id"
      />
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
const id_btn = ref("");

const loading = ref(true);
const addProd = ref(false);
const Products = ref([]);
const prodName = ref("");
const editProdName = ref("");

const id_producten = ref();
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
  if (!editProdName.value) {
    return;
  } else {
    const { error } = await supabase
      .from("Products")
      .update({ prod_name: editProdName.value })
      .eq("prod_id", id.value);

    getAllProducts();
    editProdName.value = null;
  }
}

async function delProduct(product) {
  let id = ref(product.prod_id);
  // console.log(id.value);
  const { error } = await supabase
    .from("Products")
    .delete()
    .eq("prod_id", id.value);
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
