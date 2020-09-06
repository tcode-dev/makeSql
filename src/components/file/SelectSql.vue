<template>
  <button class="btn btn-outline-secondary" v-on:click="click" v-bind:disabled="isButtonDisabled">Select</button>
</template>

<script>
import MakeSelect from '../../sql/MakeSelect';
import FileExtractor from '../../util/FileExtractor';

export default {
  computed: {
    isButtonDisabled: {
      get() {
        return this.$store.state.fileNumber === 0;
      },
    }
  },
  methods: {
    click() {
      this.$store.commit('removeList');

      const fileExtractor = new FileExtractor();
      this.$store.state.files.forEach(file => {
        fileExtractor.extract(file, this.$store.getters.characterCode).then(data => {
          const makeSelect = new MakeSelect({tableName: data.tableName, tableValue: data.text, config: this.$store.getters.config});
          const item = {
            title: data.tableName,
            sql: makeSelect.make(),
          };
          this.$store.commit('addList', item);
        });
      });
    }
  }
};
</script>
