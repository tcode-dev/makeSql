<template>
    <p><input id="download" class="btn" type="button" value="Download" v-on:click="click"></p>
</template>

<script>
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import DateTime from '../../DateTime';

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
