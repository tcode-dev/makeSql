<template>
  <dl>
    <dt>テーブル情報</dt>
    <dd><textarea rows="10" v-model="state.table"></textarea></dd>
  </dl>
</template>
  
<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const { state } = useTextStore()
</script>
  