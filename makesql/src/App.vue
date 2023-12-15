<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/header/Index.vue'
import Nav from './components/nav/Index.vue'
import Footer from './components/footer/Index.vue'
</script>

<template>
  <div class="ui container">
    <Header />
    <Nav />
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped>
.ui.container {
  padding-top: 3em;
}
</style>
