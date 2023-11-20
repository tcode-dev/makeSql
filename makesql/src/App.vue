<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/header/Index.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <Header />
      <nav>
        <RouterLink to="/">Text</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
