<template>
  <article :class="'note-card note-level-' + note.level + ' ' + status() + ' '+ isDeleted()"
           @click="toggle()">
    <h3 class="note-card-title flex-1">{{ note.title }}</h3>
    <p v-if="note.type==='text'" class="note-card-content">{{ note.content }}</p>
    <ul class="note-card-content" v-if="note.type==='list'">
      <li v-for="item in note.list" :key="item">{{ item }}</li>
    </ul>
    <fa-icon class="mt-10 relative botton-0 right-0 m-auto text-icon"
             icon="trash" size="2x" v-on:click.stop="remove()" />
  </article>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

export default {
  name: 'Note',
  props: ['note'],
  data() {
    return {
      done: false,
      deleted: false,
    };
  },
  methods: {
    remove() {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Voulez-vous supprimer cet note ?')) {
        this.deleted = true;
      }
    },
    isDeleted() {
      return (this.deleted) ? 'hide' : '';
    },
    status() {
      return (this.done) ? 'done' : '';
    },
    toggle() {
      this.done = !this.done;
    },
  },
};
</script>

<style scoped>
.hide{
  display: none!important;
}
.note-card{
  flex-basis: 15rem;
  @apply cursor-pointer flex flex-col flex-wrap justify-center items-center;
}
.note-card-title{
  @apply mb-5 text-center text-xl w-full;
}

.note-card-content{
  @apply w-full text-center text-3xl flex-1;
}
.content{
  @apply w-full;
}
.done{
  @apply bg-darkGray text-white;
}
</style>
