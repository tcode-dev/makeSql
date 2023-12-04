<template>
  <dl class="flex flex-col gap-2">
    <dt>更新情報</dt>
    <dd>
      <textarea class="rounded-md border w-full p-2" rows="2" v-model="store.state.updates"></textarea>
    </dd>
  </dl>
</template>

<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>
