<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore'

const store = useConfigStore()
</script>

<template>
  <tr>
    <th scope="row">bulk</th>
    <td colspan="3">
      <div>
        <input type="checkbox" v-model="store.state.bulk">
      </div>
    </td>
  </tr>
</template>
