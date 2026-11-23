<script setup lang="ts">
import { computed, ref } from 'vue'
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
const error = ref('')
const handleClick = async () => {
  error.value = ''

  // users.csv と users.txt のように同じテーブル名になるファイルがあっても、zip 内で上書きしない
  const fileNames = uniqueNames(sqlList.value.map((item) => item.name))
  const zip = sqlList.value.reduce((zip, item, index) => {
    zip.file(`${fileNames[index]}.sql`, item.sql)

    return zip
  }, new JSZip())

  // zip の作成や保存に失敗してもボタンが反応しないように見えないよう、エラーを表示する
  try {
    const content = await zip.generateAsync({ type: 'blob' })
    const dateTime = new DateTime()

    saveAs(content, `sql_${dateTime.now()}.zip`)
  } catch (e) {
    console.error(e)
    error.value = 'zip ファイルを作成できませんでした。もう一度 Download をクリックしてください。'
  }
}
</script>

<template>
  <Button label="Download" :disabled="isDisabled" @click="handleClick" />
  <div v-if="error" class="ui negative message" role="alert">{{ error }}</div>
</template>
