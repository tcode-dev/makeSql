<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore'
import { useFileStore } from '@/stores/fileStore'
import Button from '@/components/button/Button.vue'
import MakeUpdate from '@/sql/MakeUpdate'
import FileExtractor from '@/util/FileExtractor'

const fileStore = useFileStore()
const configStore = useConfigStore()
const handleClick = () => {
  fileStore.$reset()

  const fileExtractor = new FileExtractor()

  fileStore.state.fileList.forEach((file) => {
    fileExtractor.extract(file, configStore.state.characterCode).then((data) => {
      const text = data.text.split('\n')
      const column = text.shift()!
      const firstRow = text.shift()!
      const updates = `${column}\n${firstRow}`
      const contents = `${column}\n${text}`
      const makeUpdate = new MakeUpdate(data.name, updates, contents, configStore.config)
      const item = {
        name: data.name,
        sql: makeUpdate.make()
      }
      fileStore.addSql(item)
    })
  })
}
</script>

<template>
  <Button label="Update" @click="handleClick" />
</template>
