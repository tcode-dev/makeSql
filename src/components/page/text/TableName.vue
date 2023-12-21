<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>

<template>
  <div class="field">
    <label>テーブル名</label>
    <input type="text" v-model="store.state.tableName" />
  </div>
</template>
