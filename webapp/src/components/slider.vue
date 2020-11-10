<template>
  <ul class="slider overflow-hidden w-full ">
    <li class="slide-1">Cliquez sur une tâche pour la finir</li>
    <li class="slide-2">Les tâches en rouge sont les plus urgentes</li>
    <li class="slide-3">Cliquer à nouveau sur la tâche pour la réactiver</li>
  </ul>
</template>

<script>
export default {
  name: 'slider',
};
</script>

<style scoped>
.slide-1,
.slide-2,
.slide-3 {
  @apply text-darkGray text-center absolute left-0 right-0;
  display: block;
  font-size: 2em;
  animation-duration: 30s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.slide-1{
  animation-name: anim-1;
}

.slide-2{
  animation-name: anim-2;
}

.slide-3{
  animation-name: anim-3;
}

@keyframes anim-1 {
  0%, 8.3% { opacity: 0; }
  8.3%,25% { opacity: 1; }
  33.33%, 100% { opacity: 0; }
}

@keyframes anim-2 {
  0%, 33.33% { opacity: 0; }
  41.63%, 58.29% { opacity: 1; }
  66.66%, 100% { opacity: 0; }
}

@keyframes anim-3 {
  0%, 66.66% { opacity: 0; }
  74.96%, 91.62% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
