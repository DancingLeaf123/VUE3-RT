<script setup></script>

<template>
  <RouterView />
  <div class="test">test scss</div>
</template>

<style scoped lang="scss">
.test{
  color: $priceColor;
}
#app {
  width: 100%;
  padding: 0;
}
</style>

