<template>
  <dl>
    <dt>テーブル名</dt>
    <dd><input type="text" v-model="store.state.tableName" /></dd>
  </dl>
</template>

<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>
