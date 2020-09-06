<template>
  <dl class="mt-3">
    <dt class="mb-2">テーブル情報</dt>
    <dd><textarea rows="10" class="form-control" v-model="tableValue"></textarea></dd>
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

<style scoped>
dl {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
}
dd {
  flex-grow: 2;
}
textarea {
  height: 100%;
}
</style>
