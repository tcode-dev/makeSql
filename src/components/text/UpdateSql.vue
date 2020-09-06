<template>
  <button class="btn btn-outline-secondary" v-on:click="click" v-bind:disabled="isButtonDisabled">Update</button>
</template>

<script>
import MakeUpdate from '../../sql/MakeUpdate';

export default {
  computed: {
    isButtonDisabled: {
        get() {
        return this.$store.state.tableName == '' || this.$store.state.tableValue == '' || this.$store.state.updateValue == '';
      },
    }
  },
  methods: {
    click() {
      const makeUpdate = new MakeUpdate({tableName: this.$store.state.tableName, updateValue: this.$store.state.updateValue, tableValue: this.$store.state.tableValue, config: this.$store.getters.config});

      this.$store.commit('setSql', makeUpdate.make());
    }
  }
};
</script>
