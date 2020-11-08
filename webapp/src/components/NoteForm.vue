<template>
  <form action="">
    <fieldset>
      <legend>Titre</legend>
      <input id="title" type="text" v-model="title" placeholder="Titre de la note">
    </fieldset>
    <fieldset>
      <legend>Importance</legend>
      <div class="radio-wrapper">
        <input id="importance-1" type="radio" value="1" v-model="importance">
        <label for="importance-1">1</label>
        <input id="importance-2" type="radio" value="2" v-model="importance">
        <label for="importance-2">2</label>
        <input id="importance-3" type="radio" value="3" v-model="importance">
        <label for="importance-3">3</label>
        <input id="importance-4" type="radio" value="4" v-model="importance">
        <label for="importance-4">4</label>
        <input id="importance-5" type="radio" value="5" v-model="importance">
        <label for="importance-5">5</label>
      </div>
    </fieldset>
    <fieldset>
      <legend>Type</legend>
      <div class="radio-wrapper">
        <input id="type-simple" type="radio" value="text" v-model="type">
        <label for="type-simple">Text Simple</label>
        <input id="type-list" type="radio" value="list" v-model="type">
        <label for="type-list">List</label>
      </div>
    </fieldset>
    <fieldset v-if="type==='text'">
      <legend>Contenu</legend>
      <textarea name="text-content" v-model="content" placeholder="Le contenu de la note">
      </textarea>
    </fieldset>
    <fieldset v-if="type==='list'">
      <legend>Contenu</legend>
      <ul class="border bg-white mb-3 px-5 py-1">
        <li v-if="!list.length"> Pas de contenu </li>
        <li v-for="elem in list" :key="elem">{{ elem }}</li>
      </ul>
      <input type="text mb-3" v-model="item" placeholder="Nouvel element">
      <span class="btn-primary rounded-full px-5 ml-5 py-1" @click="addToList(item)">add</span>
    </fieldset>
    <fieldset>
      <legend>Récurrence</legend>
      <div class="radio-wrapper">
        <input id="recurrence-once" type="radio" value="once" v-model="recurrence">
        <label for="recurrence-once">Une fois</label>
        <input id="recurrence-day" type="radio" value="day" v-model="recurrence">
        <label for="recurrence-day">Chaque jours</label>
        <input id="recurrence-week" type="radio" value="week" v-model="recurrence">
        <label for="recurrence-week">Chaque semaine</label>
      </div>
    </fieldset>
    <section class="flex justify-between pt-10">
      <span class="btn btn-no-go" @click="closePanel()">Annuler</span>
      <span class="btn btn-go" type="submit" @click="addNote()">Sauvgarder</span>
    </section>
  </form>
</template>

<script>
export default {
  name: 'NoteForm',
  data() {
    return {
      title: '',
      type: 'text',
      importance: '3',
      content: '',
      list: [],
      item: '',
      recurrence: 'day',
    };
  },
  methods: {
    addToList(item) {
      this.list.push(item);
      this.item = '';
    },
    closePanel() {
      this.$parent.panelStatus = 'close';
    },
    addNote() {
      const note = {
        title: this.title,
        level: this.importance,
        recurrence: this.recurrence,
      };
      if (this.type === 'text') {
        note.content = this.content;
      } else if (this.type === 'list') {
        note.content = this.list;
      }
      this.$parent.notes.push(note);
    },
  },
};
</script>

<style scoped>
form{
  @apply py-5 px-12 flex flex-wrap flex-col w-full;
}
fieldset{
  @apply border-b border-darkGray mb-3 pb-5;
}
legend{
  @apply w-full mb-3;
}
textarea, input[type='text']{
  @apply w-full;
}
.radio-wrapper{
  @apply flex justify-around
}
.radio-wrapper input[type="radio"] {
  @apply fixed w-0 opacity-0;
}

.radio-wrapper label {
  @apply inline-block rounded-full px-5 py-3;
}
.radio-wrapper input[type="radio"]:checked  + label{
  @apply bg-blue text-white;
}

.radio-wrapper label:hover {
  @apply bg-blue text-white;
}

input,textarea{
  @apply border px-3 py-1;
}
</style>
