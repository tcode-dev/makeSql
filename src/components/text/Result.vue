<template>
  <dl>
    <dt class="mb-2">SQL</dt>
    <dd><textarea class="form-control" v-model="sql" v-bind:sql="sql"></textarea></dd>
  </dl>
</template>

<script>
export default {
  computed: {
    sql: {
      get() {
        return this.$store.state.sql
      },
    }
  }
};
</script>

<style scoped>
dl {
  display: flex;
  flex-direction: column;
  height: 100%;
}
dd {
  flex-grow: 2;
}
textarea {
  height: 100%;
}
</style>