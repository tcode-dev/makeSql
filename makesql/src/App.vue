<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/header/Index.vue'
import Nav from './components/nav/Index.vue'
import Footer from './components/footer/Index.vue'
</script>

<template>
  <div class="container mx-auto grid grid-flow-col justify-stretch">
    <div>
      <Header />
      <Nav />
      <RouterView />
      <Footer />
    </div>
  </div>
</template>
