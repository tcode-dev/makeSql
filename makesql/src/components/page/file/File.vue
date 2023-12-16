<script setup lang="ts">
import { ref } from 'vue'
import { useFileStore } from '@/stores/fileStore'

const store = useFileStore()
const text = ref('')
const handleChange = (e: Event) => {
  const fileList = Array.from((<HTMLInputElement>e.target).files || [])

  store.setFileList(fileList)
  const length = fileList.length
  text.value = length > 0 ? `${length}件のファイルを選択中` : ''
}
</script>

<template>
  <div class="fileContainer">
    <input id="fileInput" type="file" class="fileInput" v-on:change="handleChange" multiple />
    <label class="ui basic button fileLabel" for="fileInput">
      <span class="form-file-button">ファイル選択</span>
    </label>
    <span class="form-file-text">{{ text }}</span>
  </div>
</template>

<style scoped>
.fileContainer {
  margin: 2rem 0;
}
.fileInput {
  display: none;
}
.fileLabel {
  display: inline-block;
}
</style>
