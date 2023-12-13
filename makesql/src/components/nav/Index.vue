<template>
  <nav>
    <NavItem path="/" label="Text" />
    <NavItem path="/file" label="File" />
    <NavItem path="/config" label="Config" />
    <NavItem path="/about" label="About" />
  </nav>
</template>

<script setup lang="ts">
import NavItem from '@/components/nav/NavItem.vue'
</script>
