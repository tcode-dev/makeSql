<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/header/Index.vue'
import Nav from './components/nav/Index.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <Header />
      <Nav />
    </div>
  </header>

  <RouterView />
</template>
