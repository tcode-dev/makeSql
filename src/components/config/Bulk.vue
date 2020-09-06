<template>
  <tr>
    <th scope="row">bulk</th>
    <td colspan="3">
      <div class="form-check">
        <input class="form-check-input" type="checkbox"  name="bulk" v-model="bulk">
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  computed: {
    bulk: {
      get() {
        return this.$store.state.bulk
      },
      set(value) {
        this.$store.commit('setBulk', value)
      }
    },
  }
};
</script>
