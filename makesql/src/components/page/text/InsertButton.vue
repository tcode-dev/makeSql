<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore'
import { useTextStore } from '@/stores/textStore'
import Button from '@/components/button/Button.vue'
import MakeInsert from '@/sql/MakeInsert'

const textStore = useTextStore()
const configStore = useConfigStore()
const handleClick = () => {
  const makeInsert = new MakeInsert(textStore.state.tableName, textStore.state.contents, configStore.config)

  textStore.setSql(makeInsert.make())
}
</script>

<template>
  <Button label="Insert" @click="handleClick" />
</template>
