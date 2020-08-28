<template>
  <dl>
    <dt>SQL</dt>
    <dd><textarea cols="40" rows="13" id="aftertext" v-model="sql" v-bind:sql="sql"></textarea></dd>
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
