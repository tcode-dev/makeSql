<template>
    <li class="btn" v-on:click="click">Update</li>
</template>

<script>
import MakeUpdate from '../../sql/MakeUpdate';
import FileExtractor from '../../sql/FileExtractor';

export default {
    methods: {
        click() {
            this.$store.commit('removeList');

            const fileExtractor = new FileExtractor();
            this.$store.state.files.forEach(file => {
                fileExtractor.extract(file, this.$store.getters.characterCode).then(data => {
                    const text = data.text.split('\n');
                    const updateValue = text.slice(0, 2).join('\n');
                    const tableValue = text.filter((element, index) => index !== 1).join('\n');
                    const makeUpdate = new MakeUpdate({tableName: data.tableName, updateValue, tableValue, config: this.$store.getters.config});
                    const item = {
                        title: data.tableName,
                        sql: makeUpdate.make(),
                    };
                    this.$store.commit('addList', item);
                });
            });
        }
    }
};
</script>
