<template>
  <dl class="flex flex-col gap-2">
    <dt>テーブル情報</dt>
    <dd class="grid self-stretch grow">
      <textarea class="rounded-md border w-full p-2" rows="15" v-model="store.state.contents"></textarea>
    </dd>
  </dl>
</template>

<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>
