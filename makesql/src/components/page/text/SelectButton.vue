<template>
  <button @click="click">Select</button>
</template>

<script setup lang="ts">
import MakeSelect from '../../../sql/MakeSelect'
import { useTextStore } from '@/stores/textStore'
import { useConfigStore } from '@/stores/configStore'

const textStore = useTextStore()
const configStore = useConfigStore()
const click = () => {
  const makeSelect = new MakeSelect({
    tableName: textStore.state.tableName,
    tableValue: textStore.state.table,
    config: configStore.config
  });
  textStore.setSql(makeSelect.make())
}

</script>
