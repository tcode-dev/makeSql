<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore'
import { useTextStore } from '@/stores/textStore'
import Button from '@/components/button/Button.vue'
import MakeSelect from '@/sql/MakeSelect'

const textStore = useTextStore()
const configStore = useConfigStore()
const handleClick = () => {
  const makeSelect = new MakeSelect(textStore.state.tableName, textStore.state.contents, configStore.config)

  textStore.setSql(makeSelect.make())
}
</script>

<template>
  <Button label="Select" @click="handleClick" />
</template>
