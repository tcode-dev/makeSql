<template>
  <nav class="flex space-x-4 mt-5 border-b">
    <NavItem path="/" label="Text" />
    <NavItem path="/file" label="File" />
    <NavItem path="/config" label="Config" />
    <NavItem path="/about" label="About" />
  </nav>
</template>

<script setup lang="ts">
import NavItem from '@/components/nav/NavItem.vue'
</script>
