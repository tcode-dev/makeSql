<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore'

const store = useConfigStore()
</script>

<template>
  <tr>
    <th scope="row">quotation</th>
    <td colspan="3">
      <div>
        <input type="checkbox" name="quotation" v-model="store.state.quotation" />
      </div>
    </td>
  </tr>
</template>
