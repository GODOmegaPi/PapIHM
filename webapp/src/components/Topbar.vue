<template>
  <header>
    <span class="logo">IHM - APP</span>
  </header>
</template>

<script>
export default {
  name: 'topbar',
};
</script>

<style scoped>
  header{
    @apply bg-white shadow w-full flex p-5 h-16;
  }
  .logo{
    @apply text-xl;
  }
</style>
