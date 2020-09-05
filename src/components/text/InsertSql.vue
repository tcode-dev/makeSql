<template>
  <button class="btn btn-outline-secondary" v-on:click="click">Insert</button>
</template>

<script>
import MakeInsert from '../../sql/MakeInsert';

export default {
  methods: {
    click() {
      const makeInsert = new MakeInsert({tableName: this.$store.state.tableName, tableValue: this.$store.state.tableValue, config: this.$store.getters.config});

      this.$store.commit('setSql', makeInsert.make());
    }
  }
};
</script>
