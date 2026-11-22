<script setup lang="ts">
import { computed } from 'vue'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { useFileStore } from '@/stores/fileStore'
import Button from '@/components/button/Button.vue'
import DateTime from '@/util/DateTime'
import { uniqueNames } from '@/util/uniqueNames'

const store = useFileStore()
// SQL を作れなかったファイルは zip に入れない
const sqlList = computed(() => store.state.sqlList.filter((item) => !item.error))
const isDisabled = computed(() => {
  return sqlList.value.length === 0
})
const handleClick = () => {
  // users.csv と users.txt のように同じテーブル名になるファイルがあっても、zip 内で上書きしない
  const fileNames = uniqueNames(sqlList.value.map((item) => item.name))
  const zip = sqlList.value.reduce((zip, item, index) => {
    zip.file(`${fileNames[index]}.sql`, item.sql)

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
