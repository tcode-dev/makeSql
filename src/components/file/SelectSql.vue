<template>
  <li id="select2" class="btn" v-on:click="click">Select</li>
</template>

<script>
import MakeSelect from '../../sql/MakeSelect';
import FileExtractor from '../../util/FileExtractor';

export default {
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
