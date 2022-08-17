<template>
  <select
    name="products-filter"
    id="products-filter"
    @change="$emit('filter-change', $event.target.value)"
  >
    <option v-for="filter in filters" :value="filter.value" :key="filter.value">
      {{ filter.text }}
    </option>
  </select>
</template>

<script>
const FILTERS = [
  { value: '', text: 'По умолчанию' },
  { value: 'price', text: 'По цене' },
  { value: 'name', text: 'По имени' },
];
export default {
  name: 'ProdcutFilter',
  emits: ['filter-change'],
  setup() {
    return {
      filters: FILTERS,
    };
  },
};
</script>
<style lang="scss" scoped>
@import '../assets/_vars';
#products-filter {
  color: $text-color-light;
  background-color: #fff;
  height: 2.25rem;
  line-height: 2.25rem;
  min-width: 8rem;
  max-width: 8rem;
  font-size: 0.75rem;
  border-radius: 0.35rem;
  padding: 0 1.25rem 0 1rem;
  text-overflow: ellipsis;
  cursor: pointer;
  background-size: 0.75rem;
  background-repeat: no-repeat;
  box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.1);
  background-position: calc(100% - 1.05rem) center;
  background-image: url("data:image/svg+xml,%3Csvg width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.48532 1.24264L4.24268 4.48528L1.00003 1.24264' stroke='%23B4B4B4'/%3E%3C/svg%3E");
}
</style>
