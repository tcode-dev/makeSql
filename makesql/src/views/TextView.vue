<template>
  <div>
    <h2>テキストからSQLを作成</h2>
    <div>
      <div>
        <SelectButton />
        <TableName />
        <Table />
        <Result />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectButton from '../components/page/text/SelectButton.vue'
import TableName from '../components/page/text/TableName.vue'
import Table from '../components/page/text/Table.vue'
import Result from '../components/page/text/Result.vue'
</script>