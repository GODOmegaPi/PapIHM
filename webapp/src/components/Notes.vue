<template>
  <div>
    <div class="mb-5 flex justify-between">
  <!--    <div class="filter">
        <p class="font-bold">Trier par : </p>
        <span>Importance</span>
        <span class="choosed"> Date</span>
      </div>-->
      <span class="btn btn-primary self-end" @click="openPanel()">
        <fa-icon class="" icon="plus"  />
      </span>
    </div>
    <section class="level-1 grid grid-flow-col gap-4">
      <article :class="'note-card note-level-' + note.level"
               v-for="note in getLevel1()" :key="note">
        <h3 class="note-card-title">{{ note.title }}</h3>
        <p class="note-card-content">{{ note.content }}</p>
      </article>
    </section>
    <section>
      <p class="section-title">A faire aujourd'hui</p>
      <article :class="'note-card note-level-' + note.level"
               v-for="note in getToday()" :key="note">
        <h3 class="note-card-title">{{ note.title }}</h3>
        <p class="note-card-content">{{ note.content }}</p>
      </article>
    </section>
    <section>
      <p class="section-title">A faire demain</p>
      <article :class="'note-card note-level-' + note.level"
               v-for="note in getTomorrow()" :key="note">
        <h3 class="note-card-title">{{ note.title }}</h3>
        <p class="note-card-content">{{ note.content }}</p>
      </article>
    </section>
    <div :class="'right-panel '+ panelStatus">
      <div class="bg-white shadow w-full flex item-center flex-col justify-center px-5 h-16">
        <p>Ajouter une note</p>
      </div>
      <NoteForm/>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NoteForm from '@/components/NoteForm.vue';

library.add(faPlus);
export default {
  name: 'HelloWorld',
  components: { NoteForm },
  data: () => ({
    notes: [],
    panelStatus: 'close',
  }),
  methods: {
    getLevel1() {
      return this.notes.filter((note) => note.level === 1);
    },
    getToday() {
      return null;
    },
    getTomorrow() {

    },
    openPanel() {
      this.panelStatus = 'open';
    },
    closePanel() {
      this.panelStatus = 'close';
    },
    getNotes() {
      this.notes = [{
        title: 'Téléphone Ambulance',
        content: '144',
        level: 1,
        type: 'text',
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
.right-panel{
  @apply absolute top-0 right-0 min-h-screen w-1/2 flex flex-wrap justify-center
  bg-lightGray;
}
.close{
  transform: translateX(100%);
}
</style>
