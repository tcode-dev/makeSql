<template>
  <div>
    <h2>テキストからSQLを作成</h2>
    <div>
      <div>
        <SelectButton />
        <TableName />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectButton from '../components/page/text/SelectButton.vue'
import TableName from '../components/page/text/TableName.vue'
</script>