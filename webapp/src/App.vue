<template>
  <div id="app" class="bg-base min-h-screen">
    <Topbar/>
    <router-view class="content-wrapper"/>
  </div>
</template>

<script>
import Topbar from '@/components/Topbar.vue';

export default {
  name: 'App',
  components: { Topbar },
};
</script>

<style>
  .content-wrapper{
    @apply p-5;
  }
</style>
