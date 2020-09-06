<template>
  <div class="container">
    <Header />
    <Nav />
    <div id="page-body">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/header/Index.vue';
import Nav from './components/nav/Index.vue';
import Footer from './components/footer/Index.vue';

export default {
  components: {
    'Header': Header,
    'Nav': Nav,
    'Footer': Footer,
  },
};
</script>

<style scoped>
#page-body {
  min-height: 620px;
}
</style>
