<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore'

const store = useConfigStore()
</script>

<template>
  <tr>
    <td scope="row">bulk</td>
    <td colspan="3">
      <div>
        <input type="checkbox" v-model="store.state.bulk" />
      </div>
    </td>
  </tr>
</template>
