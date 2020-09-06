<template>
  <tr>
    <th scope="row">quotation</th>
    <td colspan="3">
      <div class="form-check">
        <input class="form-check-input" type="checkbox"  name="quotation" v-model="quotation">
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  computed: {
    quotation: {
      get() {
        return this.$store.state.quotation
      },
      set(value) {
        this.$store.commit('setQuotation', value)
      }
    },
  }
};
</script>
