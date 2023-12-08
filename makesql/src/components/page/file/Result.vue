<template>
  <div>
    <div class="sql" v-for="item in store.state.sqlList">
      <Accordion :title="item.name" :sql="item.sql" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileStore } from '@/stores/fileStore'
import Accordion from '@/components/page/file/Accordion.vue'

const store = useFileStore()
</script>
