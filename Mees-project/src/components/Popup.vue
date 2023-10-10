<template>
  <!-- Modal toggle -->
  <button data-modal-target="Edit_Prod" data-modal-toggle="Edit_Prod"
    class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button" @click="isOpen = false">
    <span v-if="id_btn != 'edit' & id_btn == 'add'">Add Products +</span>
    <span v-else>edit Products +</span>
  </button>

  <!-- Main modal -->
  <div id="Edit_Prod" tabindex="-5" aria-hidden="true"
    class="bg-wraper fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center"
    :class="{ open: isOpen }">
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Product
          </h3>
          <button type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="defaultModal" @click="isOpen = true">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6" v-if="id_btn != 'edit' & id_btn == 'add'">
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          <form action="" @submit.prevent="createProduct()">
            <label for="name">Product name</label>
            <input type="text" id="name" v-model="prodName" />
            <label for="name">Product cat</label>
            <!-- <input type="text" id="name" v-model="prodCat" /> -->
            <select  v-model="prodCat">
              <option disabled value="">Please select one</option>
              <option 
              v-for="prodCats in Product_Cat" 
              :key="prodCats"
              :id="prodCats.prod_cat_id"
              :value="prodCats.prod_cat_id">{{ prodCats.prod_cat_name }}</option>
            </select>
            <label for="Prijs">Prijs</label>
            <input type="number" id="Prijs" v-model="prodPrice" />
            <label for="Omschrijving">Omschrijving</label>
            <textarea name="" id="omschrijving" cols="30" rows="10" v-model="prodDesc"></textarea>
          </form>
          </p>
        </div>

        <div class="p-6 space-y-6" v-else>
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          <form action="" @submit.prevent="saveProduct()">
            <label for="ProdName">Product name</label>
            <input type="text" v-model="editProdName" />
          </form>
            <label for="name">Product cat</label>
            <!-- <input type="text" id="name" v-model="prodCat" /> -->
            <select  v-model="prodCat">
              <option disabled value="">Please select one</option>
              <option 
              v-for="prodCats in Product_Cat" 
              :key="prodCats"
              :id="prodCats.prod_cat_id"
              :value="prodCats.prod_cat_id">{{ prodCats.prod_cat_name }}</option>
            </select>
            <label for="name">Product desc</label>
            <input type="text" id="name" v-model="prodDesc" />
          </p>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="createProduct()" v-if="id_btn != 'edit' & id_btn == 'add'">
            Opslaan
          </button>
          <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="saveProduct()" v-else>
            save
          </button>
          <button data-modal-hide="defaultModal" type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            @click="isOpen = true">
            Annuleren
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { supabase } from "../supabase";
import { ref, toRefs, defineProps, defineEmits,onMounted } from "vue";
import { getCurrentInstance } from "vue";


const props = defineProps(["id_btn", "id_producten"]);
const { id_btn, id_producten } = toRefs(props);

const isOpen = ref(true);
const prodName = ref("");
const prodPrice = ref();
const prodDesc = ref("");
const Product_Cat = ref([])
const editProdName = ref("");
// const product_id =getCurrentInstance().vnode.key;
// const product_id =id_producten.value
// console.log("id_producten", id_producten.value);
const emit = defineEmits(["Products", "getProducts"]); // call the getAllproduct function 

onMounted(() => {
  getAllProdCat();
});

async function createProduct() {
  const { error } = await supabase.from("Products").insert({
    prod_name: prodName.value,
    prod_price: prodPrice.value,
    prod_desc: prodDesc.value,
  });


  prodName.value = null;
  prodPrice.value = null;
  prodDesc.value = null;
  emit("getProducts", "Products");
  isOpen.value = true;
}


async function saveProduct() {
  // console.log("product.editProdName  ", product.prod_name );
  // console.log("editProdName  ", editProdName.value );
  if (!editProdName.value) {
    return
  }
  const { error } = await supabase
    .from("Products")
    .update({ prod_name: editProdName.value })
    .eq("prod_id", id_producten.value);

  
  editProdName.value = null
  emit("getProducts", "Products");
  isOpen.value = true;
  
}

async function getAllProdCat() {
  //get all current products
  let { data, error } = await supabase.from("Product_Cat").select();

  if (error) {
    alert("Failed fetch");
    console.log(error);
  }
  if (data) {
    Product_Cat.value = data;
  }
}
</script>
