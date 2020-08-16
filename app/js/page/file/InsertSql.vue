<template>
    <li class="btn" v-on:click="click">Insert</li>
</template>

<script>
import MakeInsert from '../../sql/MakeInsert';
import FileExtractor from '../../sql/FileExtractor';

export default {
    methods: {
        click() {
            this.$store.commit('removeList');

            const fileExtractor = new FileExtractor();
            this.$store.state.files.forEach(file => {
                fileExtractor.extract(file, this.$store.getters.characterCode).then(data => {
                    const makeInsert = new MakeInsert({tableName: data.tableName, tableValue: data.text, config: this.$store.getters.config});
                    const item = {
                        title: data.tableName,
                        filename: data.filename,
                        sql: makeInsert.make(),
                    };
                    this.$store.commit('addList', item);
                });
            });
        }
    }
};
</script>
