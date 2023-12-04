<template>
  <dl class="flex flex-col gap-2">
    <dt>テーブル名</dt>
    <dd><input class="rounded-md border w-full p-2" type="text" v-model="store.state.tableName" /></dd>
  </dl>
</template>

<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>
