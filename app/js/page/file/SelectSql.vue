<template>
    <li id="select2" class="btn" v-on:click="click">Select</li>
</template>

<script>
import MakeSelect from '../../sql/MakeSelect';
import FileExtractor from '../../sql/FileExtractor';

export default {
    methods: {
        click() {
            this.$store.commit('removeList');

            const config = {
                ...this.$store.state.lettercase,
                delimiter: this.$store.state.delimiter,
                bulk: this.$store.state.bulk,
                quotation: this.$store.state.quotation,
            };
            const fileExtractor = new FileExtractor();
            this.$store.state.files.forEach(file => {
                fileExtractor.extract(file, this.$store.state.characterCode).then(data => {
                    const makeSelect = new MakeSelect({tableName: data.tableName, tableValue: data.text, config});
                    const item = {
                        title: data.tableName,
                        filename: data.filename,
                        sql: makeSelect.make(),
                    };
                    this.$store.commit('addList', item);
                });
            });
        }
    }
};
</script>
