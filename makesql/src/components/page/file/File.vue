<script setup lang="ts">
import { computed } from 'vue'
import { useFileStore } from '@/stores/fileStore'

const store = useFileStore()
const selectionMessage = computed(() => {
  return store.state.fileList.length > 0 ? `${store.state.fileList.length}件のファイルを選択中` : ''
})
const handleChange = (e: Event) => {
  const fileList = Array.from((<HTMLInputElement>e.target).files || [])

  store.setFileList(fileList)
}
</script>

<template>
  <div class="fileContainer">
    <input id="fileInput" type="file" class="fileInput" v-on:change="handleChange" multiple />
    <label class="ui basic button fileLabel" for="fileInput">ファイル選択</label>
    <span class="selection">{{ selectionMessage }}</span>
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
.selection {
  margin-left: 1rem;
}
</style>
