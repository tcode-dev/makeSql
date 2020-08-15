import Vue from 'vue';
import router from './router.vue';
import store from './store.vue';

class Index {
    init() {
        new Vue(Object.assign({}, {router}, {store})).$mount('#page-content');
    }
}

window.Index = Index;
