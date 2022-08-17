<template>
  <div class="top"><slot name="top"></slot></div>
  <div class="bottom"><slot name="bottom"></slot></div>
</template>

<script>
export default {
  name: 'Layout',
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  height: 4rem;
}
.bottom {
  position: relative;
  height: calc(100% - 4rem);
}
</style>
