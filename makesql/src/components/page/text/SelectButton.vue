<template>
  <button @click="click">Select</button>
  <p>{{ text }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MakeSelect from '../../../sql/MakeSelect'
const text = ref('test1')
const click = () => {
  const makeSelect = new MakeSelect({
    tableName: 'testtable', tableValue: 'col1,col2\ndata1, data2', config: {
      select: 'SELECT',
      insert: 'INSERT',
      delete: 'DELETE',
      update: 'UPDATE',
      from: 'FROM',
      where: 'WHERE',
      into: 'INTO',
      values: 'VALUES',
      set: 'SET',
      and: 'AND',
      or: 'OR',
      delimiter: ',',
      bulk: true,
      quotation: "'",
    }
  });
  text.value = makeSelect.make();
}

</script>
