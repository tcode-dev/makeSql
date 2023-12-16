<script setup lang="ts">
import { ConfigConst } from '@/const/ConfigConst'
import type { MultipleConfig } from '@/const/ConfigConst'
import { useConfigStore } from '@/stores/configStore'

interface Props {
  target: MultipleConfig
}

defineProps<Props>()

const store = useConfigStore()
</script>

<template>
  <tr>
    <td scope="row">{{ target }}</td>
    <td v-for="item in Object.keys(ConfigConst[target])">
      <div class="ui radio checkbox">
        <input type="radio" :name="item" :id="item" :value="item" v-model="store.state[target]" />
        <label :for="item">{{ item }}</label>
      </div>
    </td>
  </tr>
</template>
