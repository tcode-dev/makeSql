<template>
  <tr>
    <th scope="row">character code</th>
    <td>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="characterCode" id="shiftJis" value="shiftJis" v-model="characterCode">
        <label class="form-check-label" for="shiftJis">Shift_JIS</label>
      </div>
    </td>
    <td>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="characterCode" id="utf8" value="utf8" v-model="characterCode">
        <label class="form-check-label" for="utf8">UTF-8</label>
      </div>
    </td>
    <td>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="characterCode" id="eucJp" value="eucJp" v-model="characterCode">
        <label class="form-check-label" for="eucJp">EUC-JP</label>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  computed: {
    characterCode: {
      get() {
        return this.$store.state.characterCode
      },
      set(value) {
        this.$store.commit('setCharacterCode', value)
      }
    },
  }
};
</script>
