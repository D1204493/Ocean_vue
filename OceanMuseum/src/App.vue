<script setup>
</script>


<template>
  <router-view></router-view>
</template>


<style>
@media (min-width: 1024px) {
  #app {
    display: block;
    /* 禁用 grid，改為 block 佈局 */
    padding: 0;
    /* 視需求調整 */
  }
}
</style>