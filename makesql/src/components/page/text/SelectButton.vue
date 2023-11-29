<template>
  <button @click="click">Select</button>
  <p>{{ text }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MakeSelect from '../../../sql/MakeSelect'
import { useTextStore } from '@/stores/textStore'
import { useConfigStore } from '@/stores/configStore'
import type { Config } from '@/const/ConfigConst';
const text = ref('test1')
const { textState } = useTextStore();
const { config } = useConfigStore();
const click = () => {
  console.log(config);
  const makeSelect = new MakeSelect({
    tableName: textState.tableName,
    tableValue: textState.table,
    config
  });
  text.value = makeSelect.make()
}

</script>
