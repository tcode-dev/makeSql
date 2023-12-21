<script setup lang="ts">
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useFileStore } from '@/stores/fileStore'
import Button from '@/components/button/Button.vue'
import MakeInsert from '@/sql/MakeInsert'
import FileExtractor from '@/util/FileExtractor'

const fileStore = useFileStore()
const configStore = useConfigStore()
const isDisabled = computed(() => {
  return fileStore.state.fileList.length === 0
})
const handleClick = () => {
  fileStore.$reset()

  const fileExtractor = new FileExtractor()

  fileStore.state.fileList.forEach((file) => {
    fileExtractor.extract(file, configStore.state.characterCode).then((data) => {
      const makeInsert = new MakeInsert(data.name, data.text, configStore.config)
      const item = {
        name: data.name,
        sql: makeInsert.make()
      }
      fileStore.addSql(item)
    })
  })
}
</script>

<template>
  <Button label="Insert" :disabled="isDisabled" @click="handleClick" />
</template>
