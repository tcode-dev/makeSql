<template>
  <button class="btn btn-outline-secondary" v-on:click="click">Update</button>
</template>

<script>
import MakeUpdate from '../../sql/MakeUpdate';

export default {
  methods: {
    click() {
      const makeUpdate = new MakeUpdate({tableName: this.$store.state.tableName, updateValue: this.$store.state.updateValue, tableValue: this.$store.state.tableValue, config: this.$store.getters.config});

      this.$store.commit('setSql', makeUpdate.make());
    }
  }
};
</script>
