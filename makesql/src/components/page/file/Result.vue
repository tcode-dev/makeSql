<script setup lang="ts">
import { useFileStore } from '@/stores/fileStore'
import Accordion from '@/components/page/file/Accordion.vue'

const store = useFileStore()
</script>

<template>
  <form class="ui large form resultContainer">
    <div v-for="item in store.state.sqlList" class="field">
      <Accordion :title="item.name" :sql="item.sql" />
    </div>
  </form>
</template>

<style scoped>
.resultContainer {
  margin-top: 2rem;
}
</style>
