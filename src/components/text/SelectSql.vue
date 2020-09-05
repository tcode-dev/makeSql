<template>
  <button class="btn btn-outline-secondary" v-on:click="click">Select</button>
</template>

<script>
import MakeSelect from '../../sql/MakeSelect';

export default {
  methods: {
    click() {
      const makeSelect = new MakeSelect({tableName: this.$store.state.tableName, tableValue: this.$store.state.tableValue, config: this.$store.getters.config});

      this.$store.commit('setSql', makeSelect.make());
    }
  }
};
</script>
