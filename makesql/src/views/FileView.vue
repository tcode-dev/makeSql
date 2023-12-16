<script setup lang="ts">
import File from '../components/page/file/File.vue'
import SelectButton from '../components/page/file/SelectButton.vue'
import InsertButton from '../components/page/file/InsertButton.vue'
import DeleteButton from '../components/page/file/DeleteButton.vue'
import UpdateButton from '../components/page/file/UpdateButton.vue'
import Result from '../components/page/file/Result.vue'
import Title from '../components/title/Title.vue'
import Download from '../components/page/file/Download.vue'
</script>

<template>
  <div>
    <Title>ファイルからSQLを作成</Title>
    <div>
      <SelectButton />
      <InsertButton />
      <DeleteButton />
      <UpdateButton />
    </div>
    <File />
    <Download />
    <Result />
  </div>
</template>
