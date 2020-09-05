<template>
  <li class="btn" v-on:click="click">Insert</li>
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
