<script setup lang="ts">
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useTextStore } from '@/stores/textStore'
import Button from '@/components/button/Button.vue'
import SqlFactory, { SqlLabel, type SqlType } from '@/sql/SqlFactory'

interface Props {
  type: SqlType
}

const props = defineProps<Props>()
const textStore = useTextStore()
const configStore = useConfigStore()
const isDisabled = computed(() => {
  const { tableName, contents, updates } = textStore.state

  // UPDATE は SET 句に使う更新情報も必要
  return !tableName || !contents || (props.type === 'update' && !updates)
})
const handleClick = () => {
  const factory = new SqlFactory(configStore.config)

  textStore.setSql(factory.fromText(props.type, textStore.state))
}
</script>

<template>
  <Button :label="SqlLabel[type]" :disabled="isDisabled" @click="handleClick" />
</template>
