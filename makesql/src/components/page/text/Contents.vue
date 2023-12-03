<template>
  <dl>
    <dt>テーブル情報</dt>
    <dd><textarea v-model="store.state.contents"></textarea></dd>
  </dl>
</template>

<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>
