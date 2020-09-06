<template>
  <button class="btn btn-outline-secondary" type="button" v-on:click="click" v-bind:disabled="isButtonDisabled">Download</button>
</template>

<script>
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import DateTime from '../../util/DateTime';

export default {
  computed: {
    fileSelect: {
      get() {
        return this.$store.state.fileNumber > 0 ? `${this.$store.state.fileNumber}件のファイルを選択中` : 'Choose file...';
      },
    },
    isButtonDisabled: {
        get() {
        return this.$store.state.list.length == 0;
      },
    }
  },
  methods: {
    click() {
      const zip = this.$store.state.list.reduce((zip, item) => {
        zip.file(`${item.title}.sql`, item.sql);

        return zip;
      }, new JSZip());

      zip.generateAsync({type: 'blob'})
        .then((content) => {
          const dateTime = new DateTime();

          saveAs(content, `sql_${dateTime.now()}.zip`);
        });
    }
  }
};
</script>
