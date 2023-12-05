<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore'

const store = useConfigStore()
</script>

<template>
  <tr>
    <th scope="row">delimiter</th>
    <td>
      <div>
        <input type="radio" name="delimiter" id="comma" value="comma" v-model="store.state.delimiter">
        <label for="comma">comma</label>
      </div>
    </td>
    <td>
      <div>
        <input type="radio" name="delimiter" id="tab" value="tab" v-model="store.state.delimiter">
        <label for="tab">tab</label>
      </div>
    </td>
    <td>
      <div>
        <input type="radio" name="delimiter" id="space" value="space" v-model="store.state.delimiter">
        <label for="space">space</label>
      </div>
    </td>
  </tr>
</template>
