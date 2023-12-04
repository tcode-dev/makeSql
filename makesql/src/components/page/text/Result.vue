<template>
  <dl class="flex flex-col gap-2">
    <dt>SQL</dt>
    <dd class="grid self-stretch grow">
      <textarea class="rounded-md border w-full p-2" v-model="store.state.sql"></textarea>
    </dd>
  </dl>
</template>

<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>
