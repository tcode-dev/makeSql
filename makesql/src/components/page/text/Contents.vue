<template>
  <div class="field">
    <label>テーブル情報</label>
    <textarea rows="15" v-model="store.state.contents"></textarea>
  </div>
</template>

<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>
