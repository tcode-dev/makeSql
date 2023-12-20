<script setup lang="ts">
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useTextStore } from '@/stores/textStore'
import Button from '@/components/button/Button.vue'
import MakeUpdate from '@/sql/MakeUpdate'

const textStore = useTextStore()
const configStore = useConfigStore()
const isDisabled = computed(() => {
  return !textStore.state.tableName || !textStore.state.contents || !textStore.state.updates
})
const handleClick = () => {
  const makeUpdate = new MakeUpdate(textStore.state.tableName, textStore.state.updates, textStore.state.contents, configStore.config)

  textStore.setSql(makeUpdate.make())
}
</script>

<template>
  <Button label="Update" :disabled="isDisabled" @click="handleClick" />
</template>
