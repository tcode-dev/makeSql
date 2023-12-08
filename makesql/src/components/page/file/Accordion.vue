<script setup lang="ts">
defineProps({
  title: String,
  sql: String
})
</script>

<template>
  <div>
    <button>{{ title }}</button>
    <textarea rows="5">{{ sql }}</textarea>
  </div>
</template>
