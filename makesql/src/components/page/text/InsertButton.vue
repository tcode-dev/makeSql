<template>
  <button class="btn" @click="click">Insert</button>
</template>

<script setup lang="ts">
import MakeInsert from '../../../sql/MakeInsert'
import { useTextStore } from '@/stores/textStore'
import { useConfigStore } from '@/stores/configStore'

const textStore = useTextStore()
const configStore = useConfigStore()
const click = () => {
  const makeInsert = new MakeInsert({
    tableName: textStore.state.tableName,
    contents: textStore.state.contents,
    config: configStore.config
  });
  textStore.setSql(makeInsert.make())
}

</script>
