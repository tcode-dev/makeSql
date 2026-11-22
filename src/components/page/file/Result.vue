<script setup lang="ts">
import { useFileStore } from '@/stores/fileStore'
import Accordion from '@/components/page/file/Accordion.vue'

const store = useFileStore()
</script>

<template>
  <form class="ui large form resultContainer">
    <div v-for="(item, index) in store.state.sqlList" :key="index" class="field">
      <Accordion :id="`result-${index}`" :title="item.name" :sql="item.sql" :error="item.error" />
    </div>
  </form>
</template>

<style scoped>
.resultContainer {
  margin-top: 2rem;
}
</style>
