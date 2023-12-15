<template>
  <form class="ui large form">
    <div v-for="item in store.state.sqlList" class="field">
      <Accordion :title="item.name" :sql="item.sql" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { useFileStore } from '@/stores/fileStore'
import Accordion from '@/components/page/file/Accordion.vue'

const store = useFileStore()
</script>
