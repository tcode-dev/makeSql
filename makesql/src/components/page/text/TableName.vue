<template>
  <dl>
    <dt class="mb-2">テーブル名</dt>
    <dd><input type="text" v-model="state.tableName"></dd>
  </dl>
  </template>
  
  <script setup lang="ts">
    import {useTextStore} from '@/stores/textStore';

  const { state, setTableName } = useTextStore()
//   const onChange = (event: Event) => {
//     console.log("onChange");
//     setTableName(event.target.value);
//   }
  
  </script>
  