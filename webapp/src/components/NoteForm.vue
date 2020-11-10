<template>
  <form action="">
    <fieldset>
      <legend>Titre</legend>
      <input id="title" type="text" v-model="model.title" placeholder="Titre de la note">
    </fieldset>
    <fieldset>
      <legend>Importance</legend>
      <div class="radio-wrapper">
        <input id="importance-1" type="radio" value="1" v-model="model.level">
        <label for="importance-1">1</label>
        <input id="importance-2" type="radio" value="2" v-model="model.level">
        <label for="importance-2">2</label>
        <input id="importance-3" type="radio" value="3" v-model="model.level">
        <label for="importance-3">3</label>
        <input id="importance-4" type="radio" value="4" v-model="model.level">
        <label for="importance-4">4</label>
        <input id="importance-5" type="radio" value="5" v-model="model.level">
        <label for="importance-5">5</label>
      </div>
    </fieldset>
    <fieldset>
      <legend>Type</legend>
      <div class="radio-wrapper">
        <input id="type-simple" type="radio" value="text" v-model="model.type">
        <label for="type-simple">Text Simple</label>
        <input id="type-list" type="radio" value="list" v-model="model.type">
        <label for="type-list">List</label>
      </div>
    </fieldset>
    <fieldset v-if="model.type==='text'">
      <legend>Contenu</legend>
      <textarea name="text-content" v-model="model.content" placeholder="Le contenu de la note">
      </textarea>
    </fieldset>
    <fieldset v-if="model.type==='list'">
      <legend>Contenu</legend>
      <ul class="border bg-white mb-3 px-5 py-1">
        <li v-if="!model.list.length"> Pas de contenu </li>
        <li v-for="elem in model.list" :key="elem">{{ elem }}</li>
      </ul>
      <input type="text mb-3" v-model="model.item" placeholder="Nouvel element">
      <span class="btn-primary rounded-full px-5 ml-5 py-1" @click="addToList(model.item)">
        Ajouter</span>
    </fieldset>
    <fieldset>
      <legend>Visible</legend>
      <div class="radio-wrapper">
        <input id="visibility-once" type="radio" value="custom" v-model="model.visibility">
        <label for="visibility-once">Personalisé</label>
        <input id="visibility-always" type="radio" value="always" v-model="model.visibility">
        <label for="visibility-always">Toujours</label>
      </div>
    </fieldset>
    <fieldset v-if="model.visibility!=='always'">
      <legend>Récurrence</legend>
      <div class="radio-wrapper">
        <input id="recurrence-once" type="radio" value="once" v-model="model.recurrence">
        <label for="recurrence-once">Une fois</label>
        <input id="recurrence-day" type="radio" value="day" v-model="model.recurrence">
        <label for="recurrence-day">Chaque jours</label>
        <input id="recurrence-week" type="radio" value="week" v-model="model.recurrence">
        <label for="recurrence-week">Chaque semaine</label>
      </div>
    </fieldset>
    <fieldset v-if="model.recurrence==='once' && model.visibility!=='always'">
      <label class="mr-5" for="date">Date</label>
      <input id="date" type="date" v-model="model.date">
    </fieldset>
    <fieldset v-if="model.recurrence==='week'">
      <legend>Jours</legend>
      <div class="radio-wrapper">
        <input type="checkbox" id="weekday-mon" value="1" v-model="model.recurenceDays"/>
        <label for="weekday-mon">Lun</label>
        <input type="checkbox" id="weekday-tue" value="2" v-model="model.recurenceDays"/>
        <label for="weekday-tue">Mar</label>
        <input type="checkbox" id="weekday-wed" value="3" v-model="model.recurenceDays"/>
        <label for="weekday-wed">Mer</label>
        <input type="checkbox" id="weekday-thu" value="4" v-model="model.recurenceDays"/>
        <label for="weekday-thu">Jeu</label>
        <input type="checkbox" id="weekday-fri" value="5" v-model="model.recurenceDays"/>
        <label for="weekday-fri">Ven</label>
        <input type="checkbox" id="weekday-sat" value="6" v-model="model.recurenceDays"/>
        <label for="weekday-sat">Sam</label>
        <input type="checkbox" id="weekday-sun" value="0" v-model="model.recurenceDays"/>
        <label for="weekday-sun">Dim</label>
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
  props: ['model1'],
  data() {
    return {
      model: {
        title: '',
        type: 'text',
        level: '3',
        content: '',
        list: [],
        item: '',
        recurrence: '',
        recurenceDays: [],
        visibility: 'always',
        date: null,
      },
    };
  },
  mounted() {
    this.checkModel();
  },
  methods: {
    checkModel() {
      if (this.model1 !== undefined) {
        this.model = this.model1;
      }
    },
    addToList(item) {
      this.model.list.push(item);
      this.model.item = '';
    },
    closePanel() {
      this.resetForm();
      this.$parent.panelStatus = 'close';
    },
    resetForm() {
      this.model = {
        title: '',
        type: 'text',
        level: '3',
        content: '',
        list: [],
        item: '',
        recurrence: '',
        recurenceDays: [],
        visibility: 'always',
        date: null,
      };
    },
    addNote() {
      this.$parent.notes.push(this.model);
      this.resetForm();
      this.$parent.panelStatus = 'close';
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
.radio-wrapper input[type="radio"],input[type="checkbox"] {
  @apply fixed w-0 opacity-0;
}

.radio-wrapper label {
  @apply inline-block rounded-full px-5 py-3;
}
.radio-wrapper input[type="checkbox"]:checked  + label{
  @apply bg-blue text-white;
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
