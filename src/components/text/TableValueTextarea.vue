<template>
  <dl>
    <dt class="mb-2">テーブル情報</dt>
    <dd><textarea rows="5" class="form-control" v-model="tableValue"></textarea></dd>
  </dl>
</template>

<script>
export default {
  computed: {
    tableValue: {
      get() {
        return this.$store.state.tableValue
      },
      set(value) {
        this.$store.commit('setTableValue', value)
      }
    }
  }
};
</script>
