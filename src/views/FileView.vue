<script setup lang="ts">
import File from '../components/page/file/File.vue'
import SqlButton from '../components/page/file/SqlButton.vue'
import Result from '../components/page/file/Result.vue'
import Title from '../components/title/Title.vue'
import Download from '../components/page/file/Download.vue'
</script>

<template>
  <div>
    <Title>ファイルからSQLを作成</Title>
    <div>
      <SqlButton type="select" />
      <SqlButton type="insert" />
      <SqlButton type="delete" />
      <SqlButton type="update" />
    </div>
    <File />
    <Download />
    <Result />
  </div>
</template>
