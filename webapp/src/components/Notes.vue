<template>
  <div>
    <div class="mb-5 flex justify-between">
      <span class="btn btn-primary self-end" @click="openPanel()">
        <fa-icon class="" icon="plus"  />
      </span>
    </div>
    <section class="level-1">
      <Note :class="'note-card note-level-' + note.level"
            v-for="note in getVisibilityAlways()" :key="note" :note="note"/>
    </section>
    <p class="section-title">A faire aujourd'hui</p>
    <section>
      <note :class="'note-card note-level-' + note.level"
            v-for="note in getToday()" :key="note" :note="note"/>
    </section>
    <p class="section-title">A faire demain</p>
    <section>
      <note :class="'note-card note-level-' + note.level"
            v-for="note in getTomorrow()" :key="note"  :note="note" @click="edit(note)"/>
    </section>
    <div :class="'right-panel '+ panelStatus">
      <div class="bg-white shadow w-full flex item-center flex-col justify-center px-5 h-16">
        <span class="absolute top-0 right-0 mr-5 mt-5 cursor-pointer" @click="closePanel()">
          <fa-icon icon="times" />
        </span>
        <p>Ajouter une note</p>
      </div>
      <NoteForm />
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import NoteForm from '@/components/NoteForm.vue';
import Note from '@/components/Note.vue';

library.add(faPlus, faTimes);
export default {
  name: 'HelloWorld',
  components: { Note, NoteForm },
  data: () => ({
    notes: [],
    panelStatus: 'close',
    model: {},
  }),
  methods: {
    edit(note) {
      this.model = note;
      this.openPanel();
    },
    getVisibilityAlways() {
      return this.notes.filter((note) => note.visibility === 'always');
    },
    getToday() {
      let notes = [];
      const dayNotes = this.notes.filter((note) => note.recurrence === 'day');
      const todayNotes = this.notes.filter((note) => note.date === new Date().toISOString()
        .slice(0, 10));
      const week = this.notes.filter((note) => note.recurrence === 'week'
        && note.recurenceDays.includes(new Date().getDay().toString()));

      notes = notes.concat(dayNotes).concat(todayNotes).concat(week);
      return notes;
    },
    getTomorrow() {
      let notes = [];
      const today = new Date().toISOString().slice(0, 10);
      let tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow = tomorrow.toISOString().slice(0, 10);
      const dayNotes = this.notes.filter((note) => note.recurrence === 'day');
      const day = this.notes.filter((note) => note.date === tomorrow);
      const week = this.notes.filter((note) => note.recurrence === 'week'
        && note.recurenceDays.includes(((new Date().getDay() + 1) % 6).toString()));
      notes = notes.concat(dayNotes).concat(day).concat(week);
      return notes;
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
        visibility: 'always',
      },
      {
        title: 'Téléphone Marie',
        content: '0214521413',
        level: 2,
        type: 'text',
        visibility: 'always',
      },
      {
        title: '',
        content: 'Prendre médicament',
        level: 4,
        type: 'text',
        recurrence: 'day',

      },
      {
        title: 'Pour les cours',
        content: ['Bananes', 'Champignons', 'masque'],
        level: 5,
        type: 'list',
        recurrence: 'once',
        visibility: 'once',
        date: new Date() + 1,
      },
      ];
    },
  },
  mounted() {
    this.getNotes();
  },
};
</script>

<style scoped>
section{
  @apply mb-5 flex flex-wrap;
}
.section-title{
  @apply font-bold px-3 pb-2 mb-5 text-darkGray border-b border-darkGray w-full;
}
.note-card{
  @apply mb-10 mr-10;
}
.right-panel{
  @apply fixed top-0 right-0 min-h-screen w-1/2 flex flex-wrap justify-center
  bg-lightGray;
}
.close{
  transform: translateX(100%);
}
.open::before{
  content: '';
  @apply absolute top-0 right-0 left-0 bottom-0 bg-black opacity-75;
  transform: translateX(-100%);
}
</style>
