<template>
  <dl>
    <dt>SQL</dt>
    <dd><textarea v-model="store.state.sql"></textarea></dd>
  </dl>
</template>

<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>
