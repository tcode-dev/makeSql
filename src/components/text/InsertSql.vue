<template>
  <button class="btn btn-outline-secondary" v-on:click="click" v-bind:disabled="isButtonDisabled">Insert</button>
</template>

<script>
import MakeInsert from '../../sql/MakeInsert';

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
      const makeInsert = new MakeInsert({tableName: this.$store.state.tableName, tableValue: this.$store.state.tableValue, config: this.$store.getters.config});

      this.$store.commit('setSql', makeInsert.make());
    }
  }
};
</script>
