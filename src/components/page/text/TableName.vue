<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>

<template>
  <div class="field">
    <label for="tableName">テーブル名</label>
    <input id="tableName" type="text" v-model="store.state.tableName" />
  </div>
</template>
