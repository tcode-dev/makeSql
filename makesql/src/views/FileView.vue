<script setup lang="ts">
import File from '../components/page/file/File.vue'
import SelectButton from '../components/page/file/SelectButton.vue'
import InsertButton from '../components/page/file/InsertButton.vue'
import DeleteButton from '../components/page/file/DeleteButton.vue'
import UpdateButton from '../components/page/file/UpdateButton.vue'
import Result from '../components/page/file/Result.vue'
</script>

<template>
  <div>
    <h2>ファイルからSQLを作成</h2>
    <div>
      <SelectButton />
      <InsertButton />
      <DeleteButton />
      <UpdateButton />
    </div>
    <File />
    <Result />
  </div>
</template>
