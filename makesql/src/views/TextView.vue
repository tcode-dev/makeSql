<template>
  <div>
    <h2>テキストからSQLを作成</h2>
    <div class="flex">
      <div>
        <div class="flex-auto flex space-x-4">
          <SelectButton />
          <InsertButton />
        </div>
        <div>
          <TableName />
          <Contents />
        </div>
      </div>
      <div>
        <Result />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectButton from '../components/page/text/SelectButton.vue'
import InsertButton from '../components/page/text/InsertButton.vue'
import TableName from '../components/page/text/TableName.vue'
import Contents from '../components/page/text/Contents.vue'
import Result from '../components/page/text/Result.vue'
</script>
