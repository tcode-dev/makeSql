<template>
  <div class="field">
    <label>SQL</label>
    <textarea v-model="store.state.sql"></textarea>
  </div>
</template>

<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>
