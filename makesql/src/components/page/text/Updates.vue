<template>
  <dl>
    <dt>更新情報</dt>
    <dd>
      <textarea class="rounded-md border w-full" rows="2" v-model="store.state.updates"></textarea>
    </dd>
  </dl>
</template>

<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>
