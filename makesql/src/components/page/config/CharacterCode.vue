<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore'

const store = useConfigStore()
</script>

<template>
  <tr>
    <th scope="row">character code</th>
    <td>
      <div>
        <input type="radio" name="characterCode" id="shiftJis" value="shiftJis" v-model="store.state.characterCode">
        <label for="shiftJis">Shift_JIS</label>
      </div>
    </td>
    <td>
      <div class="form-check">
        <input type="radio" name="characterCode" id="utf8" value="utf8" v-model="store.state.characterCode">
        <label for="utf8">UTF-8</label>
      </div>
    </td>
    <td>
      <div class="form-check">
        <input type="radio" name="characterCode" id="eucJp" value="eucJp" v-model="store.state.characterCode">
        <label for="eucJp">EUC-JP</label>
      </div>
    </td>
  </tr>
</template>
