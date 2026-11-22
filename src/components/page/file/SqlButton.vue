<script setup lang="ts">
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useFileStore } from '@/stores/fileStore'
import Button from '@/components/button/Button.vue'
import SqlFactory, { SqlLabel, type SqlType } from '@/sql/SqlFactory'
import FileExtractor from '@/util/FileExtractor'

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

  // 結果は読み込みが終わった順ではなく、選択したファイルの順に並べる
  fileStore.makeSqlList(() =>
    Promise.all(
      fileList.map(async (file) => {
        const data = await fileExtractor.extract(file, characterCode)

        return {
          name: data.name,
          sql: factory.fromFile(props.type, data.name, data.text)
        }
      })
    )
  )
}
</script>

<template>
  <Button :label="SqlLabel[type]" :disabled="isDisabled" @click="handleClick" />
</template>
