<template>
  <li class="btn" v-on:click="click">Delete</li>
</template>

<script>
import MakeDelete from '../../sql/MakeDelete';

export default {
  methods: {
    click() {
      const makeDelete = new MakeDelete({tableName: this.$store.state.tableName, tableValue: this.$store.state.tableValue, config: this.$store.getters.config});

      this.$store.commit('setSql', makeDelete.make());
    }
  }
};
</script>
