<template>
  <tr>
    <th scope="row">delimiter</th>
    <td>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="delimiter" id="comma" value="comma" v-model="delimiter">
        <label class="form-check-label" for="comma">comma</label>
      </div>
    </td>
    <td>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="delimiter" id="tab" value="tab" v-model="delimiter">
        <label class="form-check-label" for="tab">tab</label>
      </div>
    </td>
    <td>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="delimiter" id="space" value="space" v-model="delimiter">
        <label class="form-check-label" for="space">space</label>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  computed: {
    delimiter: {
      get() {
        return this.$store.state.delimiter
      },
      set(value) {
        this.$store.commit('setDelimiter', value)
      }
    },
  }
};
</script>
