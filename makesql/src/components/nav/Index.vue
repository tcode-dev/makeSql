<template>
  <nav class="flex space-x-4 mt-5 border-b">
    <div class="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
      <RouterLink to="/">Text</RouterLink>
    </div>
    <div class="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
      <RouterLink to="/about">About</RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
