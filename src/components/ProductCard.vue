<template>
  <article
    class="product-card"
    tabindex="-1"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="cover">
      <img
        class="product-image"
        :src="product.image"
        loading="lazy"
        alt="Some product"
      />
    </div>
    <div class="contents">
      <h2 class="product-title">{{ product.name }}</h2>
      <p class="product-desc">{{ product.desc }}</p>
      <div class="product-value">{{ formatedPrice }} <span>руб.</span></div>
    </div>
    <button
      v-show="isHover"
      class="btn del-product-btn"
      @click="$emit('remove-product')"
    ></button>
  </article>
</template>

<script>
import { ref, computed } from 'vue';
export default {
  name: 'ProductCard',
  props: ['product'],
  emits: ['remove-product'],
  components: {},
  setup(props) {
    const isHover = ref(false);
    const formatedPrice = computed(() => {
      return props.product?.price.toLocaleString().split(',').join(' ');
    });
    return {
      isHover,
      formatedPrice,
    };
  },
};
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  min-width: 20rem;
  min-height: 26rem;
  cursor: pointer;
  border-radius: 0.25rem;
  position: relative;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
    0px 6px 10px rgba(0, 0, 0, 0.02);

  .contents {
    padding: 1rem;
    flex: 1 0;
    border-radius: 0 0 0.25rem 0.25rem;
  }
  .product-title {
    font-size: 1.25rem;
    line-height: 1.5rem;
    margin-bottom: 2rem;
  }
  .product-desc {
    margin-bottom: 2rem;
    min-height: 6rem;
  }
  .product-value {
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 1.7rem;
    margin-bottom: 1rem;
  }
  .cover {
    background-color: #a9a9a9;
    /* height: 12rem; */
    padding-bottom: calc(100% - 8rem);
    width: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 0.25rem 0.25rem 0 0;
    min-height: 16rem;
  }
  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
  }
}

.del-product-btn {
  width: 2rem;
  height: 2rem;
  padding: 0.2rem;
  line-height: 2rem;
  background-color: #ff8484;
  border-radius: 0.6rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: -0.5rem;
  top: -0.5rem;
  background-repeat: no-repeat;
  background-position: center;
  // background-size:100%;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' fill='white'%3E%3Cg clip-path='url(%23clip0)'%3E%3Cpath d='M10.207 5.79688C9.99998 5.79688 9.83224 5.96462 9.83224 6.17158V13.2535C9.83224 13.4604 9.99998 13.6283 10.207 13.6283C10.4139 13.6283 10.5817 13.4604 10.5817 13.2535V6.17158C10.5817 5.96462 10.4139 5.79688 10.207 5.79688Z'/%3E%3Cpath d='M5.78544 5.79688C5.57848 5.79688 5.41074 5.96462 5.41074 6.17158V13.2535C5.41074 13.4604 5.57848 13.6283 5.78544 13.6283C5.99241 13.6283 6.16015 13.4604 6.16015 13.2535V6.17158C6.16015 5.96462 5.99241 5.79688 5.78544 5.79688Z'/%3E%3Cpath d='M2.56294 4.76335V13.9953C2.56294 14.541 2.76303 15.0534 3.11256 15.4211C3.46048 15.7898 3.94467 15.9991 4.4514 16H11.541C12.0478 15.9991 12.532 15.7898 12.8798 15.4211C13.2293 15.0534 13.4294 14.541 13.4294 13.9953V4.76335C14.1242 4.57893 14.5745 3.90768 14.4815 3.19471C14.3884 2.48189 13.7811 1.94867 13.0622 1.94852H11.1437V1.48014C11.1459 1.08626 10.9902 0.708039 10.7113 0.42979C10.4325 0.151688 10.0537 -0.0031709 9.65982 4.92333e-05H6.33255C5.93867 -0.0031709 5.55986 0.151688 5.28103 0.42979C5.00219 0.708039 4.84646 1.08626 4.84865 1.48014V1.94852H2.93019C2.21122 1.94867 1.60393 2.48189 1.51084 3.19471C1.4179 3.90768 1.86813 4.57893 2.56294 4.76335ZM11.541 15.2506H4.4514C3.81075 15.2506 3.31236 14.7002 3.31236 13.9953V4.79629H12.68V13.9953C12.68 14.7002 12.1816 15.2506 11.541 15.2506ZM5.59806 1.48014C5.59558 1.28503 5.67227 1.09724 5.81074 0.959502C5.94906 0.821768 6.13729 0.746095 6.33255 0.749461H9.65982C9.85508 0.746095 10.0433 0.821768 10.1816 0.959502C10.3201 1.09709 10.3968 1.28503 10.3943 1.48014V1.94852H5.59806V1.48014ZM2.93019 2.69793H13.0622C13.4347 2.69793 13.7367 2.99989 13.7367 3.3724C13.7367 3.74491 13.4347 4.04688 13.0622 4.04688H2.93019C2.55768 4.04688 2.25571 3.74491 2.25571 3.3724C2.25571 2.99989 2.55768 2.69793 2.93019 2.69793Z'/%3E%3Cpath d='M7.9962 5.79688C7.78923 5.79688 7.62149 5.96462 7.62149 6.17158V13.2535C7.62149 13.4604 7.78923 13.6283 7.9962 13.6283C8.20317 13.6283 8.37091 13.4604 8.37091 13.2535V6.17158C8.37091 5.96462 8.20317 5.79688 7.9962 5.79688Z' /%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='16' height='16' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
}
</style>
