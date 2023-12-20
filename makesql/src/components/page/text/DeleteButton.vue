<script setup lang="ts">
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useTextStore } from '@/stores/textStore'
import Button from '@/components/button/Button.vue'
import MakeDelete from '@/sql/MakeDelete'

const textStore = useTextStore()
const configStore = useConfigStore()
const isDisabled = computed(() => {
  return !textStore.state.tableName || !textStore.state.contents
})
const handleClick = () => {
  const makeDelete = new MakeDelete(textStore.state.tableName, textStore.state.contents, configStore.config)

  textStore.setSql(makeDelete.make())
}
</script>

<template>
  <Button label="Delete" :disabled="isDisabled" @click="handleClick" />
</template>
