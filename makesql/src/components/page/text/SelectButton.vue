<script setup lang="ts">
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useTextStore } from '@/stores/textStore'
import Button from '@/components/button/Button.vue'
import MakeSelect from '@/sql/MakeSelect'

const textStore = useTextStore()
const configStore = useConfigStore()
const isDisabled = computed(() => {
  return !textStore.state.tableName || !textStore.state.contents
})
const handleClick = () => {
  const makeSelect = new MakeSelect(textStore.state.tableName, textStore.state.contents, configStore.config)

  textStore.setSql(makeSelect.make())
}
</script>

<template>
  <Button label="Select" :disabled="isDisabled" @click="handleClick" />
</template>
