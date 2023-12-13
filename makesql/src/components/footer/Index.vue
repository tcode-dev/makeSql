<template>
  <footer>
    <p>
      <small>Copyright &copy; {{ year }}<span>makesql</span> All Rights Reserved.</small>
    </p>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const year = computed(() => new Date().getFullYear())
</script>
