<script setup lang="ts">
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useFileStore } from '@/stores/fileStore'
import Button from '@/components/button/Button.vue'
import SqlFactory, { SqlLabel, type SqlType } from '@/sql/SqlFactory'
import FileExtractor from '@/util/FileExtractor'
import InputError from '@/util/InputError'

interface Props {
  type: SqlType
}

const props = defineProps<Props>()
const fileStore = useFileStore()
const configStore = useConfigStore()
const isDisabled = computed(() => {
  return fileStore.state.fileList.length === 0
})
const handleClick = () => {
  const fileExtractor = new FileExtractor()
  const factory = new SqlFactory(configStore.config)
  const { characterCode } = configStore.state
  const { fileList } = fileStore.state

  // 結果は読み込みが終わった順ではなく、選択したファイルの順に並べる。
  // 1件で SQL を作れなくても、他のファイルの結果は表示する
  fileStore.makeSqlList(() =>
    Promise.all(
      fileList.map(async (file) => {
        try {
          const data = await fileExtractor.extract(file, characterCode)

          return {
            name: data.name,
            sql: factory.fromFile(props.type, data.name, data.text)
          }
        } catch (error) {
          if (error instanceof InputError) {
            return { name: file.name, sql: '', error: error.message }
          }

          throw error
        }
      })
    )
  )
}
</script>

<template>
  <Button :label="SqlLabel[type]" :disabled="isDisabled" @click="handleClick" />
</template>
