<template>
    <li class="btn" v-on:click="click">Delete</li>
</template>

<script>
import MakeDelete from '../../sql/MakeDelete';
import FileExtractor from '../../sql/FileExtractor';

export default {
    methods: {
        click() {
            this.$store.commit('removeList');

            const fileExtractor = new FileExtractor();
            this.$store.state.files.forEach(file => {
                fileExtractor.extract(file, this.$store.getters.characterCode).then(data => {
                    const makeDelete = new MakeDelete({tableName: data.tableName, tableValue: data.text, config: this.$store.getters.config});
                    const item = {
                        title: data.tableName,
                        filename: data.filename,
                        sql: makeDelete.make(),
                    };
                    this.$store.commit('addList', item);
                });
            });
        }
    }
};
</script>
