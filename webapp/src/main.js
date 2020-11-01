import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/app.css';

Vue.config.productionTip = false;
Vue.component('fa-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render(h) { return h(App); },
}).$mount('#app');
