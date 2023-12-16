<script setup lang="ts">
import type { SingleConfig } from '@/const/ConfigConst'
import { useConfigStore } from '@/stores/configStore'

interface Props {
  target: SingleConfig
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
