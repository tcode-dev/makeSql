<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore'

interface Props {
  target: "bulk" | "quotation"
}

defineProps<Props>()

const store = useConfigStore()
</script>

<template>
  <tr>
    <td scope="row">{{ target }}</td>
    <td colspan="3">
      <div class="ui checkbox">
        <input type="checkbox" v-model="store.state[target]" />
        <label></label>
      </div>
    </td>
  </tr>
</template>
