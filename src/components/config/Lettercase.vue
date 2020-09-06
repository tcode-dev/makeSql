<template>
  <tr>
    <th scope="row">lettercase</th>
    <td>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="lettercase" id="uppercase" value="uppercase" v-model="lettercase">
        <label class="form-check-label" for="uppercase">UPPERCASE</label>
      </div>
    </td>
    <td>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="lettercase" id="camelcase" value="camelcase" v-model="lettercase">
        <label class="form-check-label" for="camelcase">Camelcase</label>
      </div>
    </td>
    <td>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="lettercase" id="lowercase" value="lowercase" v-model="lettercase">
        <label class="form-check-label" for="lowercase">lowercase</label>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  computed: {
    lettercase: {
      get() {
        return this.$store.state.lettercase
      },
      set(value) {
        this.$store.commit('setLettercase', value)
      }
    },
  }
};
</script>
