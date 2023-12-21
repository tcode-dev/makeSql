<script setup lang="ts">
import { computed } from 'vue'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { useFileStore } from '@/stores/fileStore'
import Button from '@/components/button/Button.vue'
import DateTime from '@/util/DateTime'

const store = useFileStore()
const isDisabled = computed(() => {
  return store.state.sqlList.length === 0
})
const handleClick = () => {
  const zip = store.state.sqlList.reduce((zip, item) => {
    zip.file(`${item.name}.sql`, item.sql)

    return zip
  }, new JSZip())

  zip.generateAsync({ type: 'blob' }).then((content) => {
    const dateTime = new DateTime()

    saveAs(content, `sql_${dateTime.now()}.zip`)
  })
}
</script>

<template>
  <Button label="Download" :disabled="isDisabled" @click="handleClick" />
</template>
