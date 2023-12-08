<script setup lang="ts">
import File from '../components/page/file/File.vue'
import SelectButton from '../components/page/file/SelectButton.vue'
import Result from '../components/page/file/Result.vue'
</script>

<template>
  <div>
    <h2 class="mt-5">ファイルからSQLを作成</h2>
    <div class="flex-auto flex space-x-4 mt-5">
      <SelectButton />
    </div>
    <File />
    <Result />
  </div>
</template>
