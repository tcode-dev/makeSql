<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>

<template>
  <div class="field">
    <label for="contents">テーブル情報</label>
    <textarea id="contents" rows="12" v-model="store.state.contents"></textarea>
  </div>
</template>
