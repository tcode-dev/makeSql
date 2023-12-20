<script setup lang="ts">
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useFileStore } from '@/stores/fileStore'
import Button from '@/components/button/Button.vue'
import MakeSelect from '@/sql/MakeSelect'
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
      const makeSelect = new MakeSelect(data.name, data.text, configStore.config)
      const item = {
        name: data.name,
        sql: makeSelect.make()
      }
      fileStore.addSql(item)
    })
  })
}
</script>

<template>
  <Button label="Select" :disabled="isDisabled" @click="handleClick" />
</template>
