<template>
  <dl>
    <dt class="mb-2">テーブル名</dt>
    <dd><input type="text" v-model="textState.tableName"></dd>
  </dl>
</template>
  
<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const { textState } = useTextStore()
</script>
  