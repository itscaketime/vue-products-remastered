<template>
  <!-- <div id="app"> -->
  <Layout>
    <template #top>
      <h1 class="title">Добавление товара</h1>
      <ProductFilter @filter-change="onFilterChange" />
    </template>
    <template #bottom>
      <ProductForm @submit="addProduct" />
      <Products :products="filteredProducts" @remove-product="removeProduct" />
    </template>
  </Layout>
  <!-- </div> -->
</template>

<script>
import { ref, computed } from 'vue';
import ProductFilter from './components/Filter.vue';
import Layout from './components/Layout.vue';
import ProductForm from './components/ProductForm.vue';
import Products from './components/Products.vue';

const IMGAE_URL =
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80';

function* idGenerator(start) {
  let id = start || 0;
  while (true) {
    yield ++id;
  }
}
const idIter = idGenerator();

const genericItem = (idx) => ({
  id: idIter.next().value,
  name: 'Наименование товара ' + (idx + 1),
  desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
  image: IMGAE_URL,
  price: 10000,
});

export default {
  name: 'App',
  components: {
    Layout,
    ProductForm,
    Products,
    ProductFilter,
  },
  setup() {
    const filter = ref('');
    const products = ref(
      Array.from({ length: 10 }, (_, idx) => genericItem(idx))
    );
    const filteredProducts = computed(() => {
      return [...products.value].sort((a, b) => {
        switch (filter.value) {
          case '':
            return a.id > b.id ? 1 : -1;
          case 'name':
            return a.name.localeCompare(b.name);
          case 'price':
            return a.price < b.price ? -1 : 1;
          default:
            return true;
        }
      });
    });

    const addProduct = (data) => {
      data.id = idIter.next().value;
      products.value.push(data);
    };
    const removeProduct = (id) => {
      products.value = products.value.filter((item) => item.id !== id);
    };
    const onFilterChange = (type) => {
      filter.value = type ?? '';
    };
    return {
      products,
      addProduct,
      removeProduct,
      onFilterChange,
      filteredProducts,
      filter,
    };
  },
};
</script>

<style lang="scss">
@import 'assets/_base';
.title {
  font-size: 1.75rem;
  white-space: nowrap;
  margin-right: 1rem;
}
</style>
