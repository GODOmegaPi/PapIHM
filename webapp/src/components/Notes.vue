<template>
  <div class="relative">
    <div class="mb-5 flex justify-between">
      <div class="filter">
        <p class="font-bold">Trier par : </p>
        <span>Importance</span>
        <span class="choosed"> Date</span>
      </div>
      <button class="btn-primary self-end">
        <fa-icon class="" icon="plus"  />
      </button>
    </div>
    <section class="level-1 mb-5">
      <article :class="'note-card note-level-' + note.level"
               v-for="note in notes" :key="note">
        <h3 class="note-card-title">{{ note.title }}</h3>
        <p class="note-card-content">{{ note.content }}</p>
      </article>
    </section>
    <section>
      <p class="section-title">A faire aujourd'hui</p>
    </section>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus);
export default {
  name: 'HelloWorld',
  data: () => ({
    notes: [],
  }),
  methods: {
    getNotes() {
      this.notes = [{
        title: 'Téléphone Ambulance',
        content: '144',
        level: 1,
      }];
    },
  },
  mounted() {
    this.getNotes();
  },
};
</script>

<style scoped>

.filter{
  @apply flex;
}
.filter span{
  @apply  mx-3;
}

.filter span.choosed{
  @apply text-blue font-bold;
}
.note-card-title{
  @apply text-xl mb-5;
}

.note-card-content{
  @apply w-full text-center;
}
.section-title{
  @apply font-bold px-3 pb-2 text-darkGray border-b border-darkGray;
}
</style>
