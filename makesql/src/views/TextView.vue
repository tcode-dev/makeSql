<template>
  <div>
    <h2>テキストからSQLを作成</h2>
    <div>
      <SelectButton />
      <InsertButton />
      <DeleteButton />
      <UpdateButton />
    </div>
    <div>
      <div>
        <TableName />
        <Updates />
        <Contents />
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
import DeleteButton from '../components/page/text/DeleteButton.vue'
import UpdateButton from '../components/page/text/UpdateButton.vue'
import TableName from '../components/page/text/TableName.vue'
import Updates from '../components/page/text/Updates.vue'
import Contents from '../components/page/text/Contents.vue'
import Result from '../components/page/text/Result.vue'
</script>
