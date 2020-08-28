<template>
  <dl class="config">
    <dt>bulk</dt>
    <dd>
      <input type="checkbox" name="bulk" v-model="bulk">
    </dd>
  </dl>
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
