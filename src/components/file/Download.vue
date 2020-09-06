<template>
  <button class="btn btn-outline-secondary" type="button" v-on:click="click">Download</button>
</template>

<script>
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import DateTime from '../../util/DateTime';

export default {
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
