<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore'

const store = useConfigStore()
</script>

<template>
  <tr>
    <th scope="row">lettercase</th>
    <td>
      <div>
        <input type="radio" name="lettercase" id="uppercase" value="uppercase" v-model="store.state.lettercase">
        <label for="uppercase">UPPERCASE</label>
      </div>
    </td>
    <td>
      <div>
        <input type="radio" name="lettercase" id="camelcase" value="camelcase" v-model="store.state.lettercase">
        <label for="camelcase">Camelcase</label>
      </div>
    </td>
    <td>
      <div>
        <input type="radio" name="lettercase" id="lowercase" value="lowercase" v-model="store.state.lettercase">
        <label for="lowercase">lowercase</label>
      </div>
    </td>
  </tr>
</template>
