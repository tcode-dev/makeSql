<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
import Text from './components/text/Index.vue';
import File from './components/file/Index.vue';
import Config from './components/config/Index.vue';
import Help from './components/help/Index.vue';
import About from './components/about/Index.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Text },
  { path: '/text', component: Text },
  { path: '/file', component: File },
  { path: '/config', component: Config },
  { path: '/help', component: Help },
  { path: '/about', component: About }, 
];
const router = new VueRouter({
  routes
});

export default router;
</script>
