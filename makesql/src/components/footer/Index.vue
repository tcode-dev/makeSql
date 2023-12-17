<template>
  <footer class="footer">
    <div class="ui section divider"></div>
    <p>Copyright &copy; {{ year }}<span class="label">makesql</span>All Rights Reserved.</p>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const year = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  position: sticky;
  top: 100vh;
  padding-bottom: 2rem;
  text-align: right;
}
.label {
  margin: 0 0.5rem;
}
</style>