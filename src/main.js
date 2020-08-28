import Vue from 'vue'
import App from './App.vue'
import router from './router.vue';
import store from './store.vue';

Vue.config.productionTip = false

new Vue(Object.assign(
  {},
  {router},
  {store},
  {render: h => h(App)}
)).$mount('#app')
