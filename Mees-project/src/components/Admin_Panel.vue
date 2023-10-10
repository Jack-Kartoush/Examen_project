<!-- Dit werkt -->
<template>
  <p>Dit is het admin paneel</p>

  <form action="">
    <p>Voeg admins toe</p>
  </form>
  <br />

  <Popup :id_btn="(id_btn = 'add')" @getProducts="getAllProducts()" />

  <section
    v-for="prodCat in Product_Cats"
    class="BroodContainer"
    :key="prodCat.prod_cat_id"
    :id="[[prodCat.prod_cat_name]]"
  >
    <div class="title_container">
      <h1 class="title">{{ prodCat.prod_cat_name }}</h1>
    </div>
    <div class="prod_container">
      <div
        v-for="(product, index) in Products.filter(
          (product) => product.prod_cat_id === prodCat.prod_cat_id
        )"
        :key="product"
        class="prod_wraper"
      >
        <img src="../assets/img/broodje.jpg" alt="Nature" class="responsive" />
        <div class="prod_title">
          <span>{{ product.prod_name }}</span>
          <span>{{ product.prod_price }}</span>
        </div>
        <p class="text">
          {{ product.prod_desc }}
        </p>
        <Popup
          :id_btn="(id_btn = 'edit')"
          v-if="!product.index"
          @getProducts="getAllProducts()"
          @click="product.index = !product.index"
          :id_producten="product.prod_id"
        />
        <button @click="delProduct(product)">verwijderen</button>
      </div>
    </div>
  </section>
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
const Products = ref([]);
const Product_Cats = ref([]);

onMounted(() => {
  getAllProducts();
  getAllProductCat()
});

async function getAllProductCat() {
  //get all current product categories
  let { data, error } = await supabase.from("Product_Cat").select();

  if (error) {
    alert("Failed fetch");
    console.log(error);
  }
  if (data) {
    Product_Cats.value = data;
  }
}

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
