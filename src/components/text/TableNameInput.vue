<template>
  <dl>
    <dt class="mb-2">テーブル名</dt>
    <dd><input type="text" class="form-control" v-model="tableName"></dd>
  </dl>
</template>

<script>
export default {
  computed: {
    tableName: {
      get() {
        return this.$store.state.tableName
      },
      set(value) {
        this.$store.commit('setTableName', value)
      }
    }
  }
};
</script>
