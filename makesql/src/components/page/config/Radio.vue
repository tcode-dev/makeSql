<script setup lang="ts">
import { ConfigConst, LabelConst } from '@/const/ConfigConst'
import type { LabelGroup, MultipleConfig } from '@/const/ConfigConst'
import { useConfigStore } from '@/stores/configStore'

interface Props {
  target: MultipleConfig
}

const props = defineProps<Props>()
const store = useConfigStore()
const list = Object.keys(ConfigConst[props.target]) as LabelGroup
</script>

<template>
  <tr>
    <td scope="row">{{ target }}</td>
    <td v-for="item in list">
      <div class="ui radio checkbox">
        <input type="radio" :name="item" :id="item" :value="item" v-model="store.state[target]" />
        <label :for="item">{{ LabelConst[item] }}</label>
      </div>
    </td>
  </tr>
</template>

<style scoped>
.ui.checkbox label {
  cursor: pointer;
}
</style>