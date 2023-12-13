<script setup lang="ts">
import { useFileStore } from '@/stores/fileStore'

const store = useFileStore()
const handleChange = (e: Event) => {
  const fileList = Array.from((<HTMLInputElement>e.target).files || [])

  store.setFileList(fileList)
}
</script>

<template>
  <div>
    <label for="file_input">Upload file</label>
    <input id="file_input" type="file" v-on:change="handleChange" multiple />
  </div>
</template>
