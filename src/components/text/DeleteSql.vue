<template>
  <button class="btn btn-outline-secondary" v-on:click="click" v-bind:disabled="isButtonDisabled">Delete</button>
</template>

<script>
import MakeDelete from '../../sql/MakeDelete';

export default {
  computed: {
    isButtonDisabled: {
        get() {
        return this.$store.state.tableName == '' || this.$store.state.tableValue == '';
      },
    }
  },
  methods: {
    click() {
      const makeDelete = new MakeDelete({tableName: this.$store.state.tableName, tableValue: this.$store.state.tableValue, config: this.$store.getters.config});

      this.$store.commit('setSql', makeDelete.make());
    }
  }
};
</script>
