<template>
  <TransitionGroup class="products" name="list" tag="div">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @remove-product="$emit('remove-product', product.id)"
    />
  </TransitionGroup>
</template>

<script>
import ProductCard from './ProductCard.vue';
export default {
  name: 'Products',
  props: ['products'],
  emits: ['remove-product'],
  components: {
    ProductCard,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-5%);
}
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin-left: 21rem;
  @media screen and (max-width: 1440px) {
    & {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 1024px) {
    & {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  @media screen and (max-width: 736px) {
    & {
      margin-left: 0;
    }
  }
}
</style>
