<template>
    <p><input id="download" class="btn" type="button" value="Download" v-on:click="click"></p>
</template>

<script>
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export default {
    methods: {
        click() {
            const zip = new JSZip();

            this.$store.state.list.forEach(item => {
                zip.file(`${item.title}.sql`, item.sql);
            });
            zip.generateAsync({type: 'blob'})
                .then(function(content){
                    saveAs(content, 'sql.zip');
                });
        }
    }
};
</script>
