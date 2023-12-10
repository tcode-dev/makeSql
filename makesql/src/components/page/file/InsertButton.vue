<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore'
import { useFileStore } from '@/stores/fileStore'
import Button from '@/components/button/Button.vue'
import MakeInsert from '@/sql/MakeInsert'
import FileExtractor from '@/util/FileExtractor'

const fileStore = useFileStore()
const configStore = useConfigStore()
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
  <Button label="Insert" @click="handleClick" />
</template>
