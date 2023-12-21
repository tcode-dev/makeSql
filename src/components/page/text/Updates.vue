<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>

<template>
  <div class="field">
    <label>更新情報</label>
    <textarea rows="2" v-model="store.state.updates"></textarea>
  </div>
</template>
