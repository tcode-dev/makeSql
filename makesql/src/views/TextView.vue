<template>
  <div>
    <h2 class="mt-5">テキストからSQLを作成</h2>
    <div class="flex-auto flex space-x-4 mt-5">
      <SelectButton />
      <InsertButton />
      <DeleteButton />
      <UpdateButton />
    </div>
    <div class="grid grid-cols-2 gap-8 mt-5">
      <div class="flex flex-col gap-4">
        <TableName />
        <Updates />
        <Contents />
      </div>
      <div class="grid">
        <Result />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectButton from '../components/page/text/SelectButton.vue'
import InsertButton from '../components/page/text/InsertButton.vue'
import DeleteButton from '../components/page/text/DeleteButton.vue'
import UpdateButton from '../components/page/text/UpdateButton.vue'
import TableName from '../components/page/text/TableName.vue'
import Updates from '../components/page/text/Updates.vue'
import Contents from '../components/page/text/Contents.vue'
import Result from '../components/page/text/Result.vue'
</script>
