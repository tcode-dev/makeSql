<script setup lang="ts">
import NavItem from '@/components/nav/NavItem.vue'
</script>

<template>
  <nav class="ui secondary pointing menu">
    <NavItem path="/" label="Text" />
    <NavItem path="/file" label="File" />
    <NavItem path="/config" label="Config" />
    <NavItem path="/about" label="About" />
  </nav>
</template>
