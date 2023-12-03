<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore';
import { useTextStore } from '@/stores/textStore';
import Button from '@/components/button/Button.vue'
import MakeDelete from '@/sql/MakeDelete';

const textStore = useTextStore()
const configStore = useConfigStore()
const handleClick = () => {
  const makeDelete = new MakeDelete({
    tableName: textStore.state.tableName,
    contents: textStore.state.contents,
    config: configStore.config
  })
  textStore.setSql(makeDelete.make())
}
</script>

<template>
  <Button label="Delete" @click="handleClick" />
</template>
