<template>
    <li id="update" class="btn" v-on:click="click">Update</li>
</template>

<script>
import MakeUpdate from '../../sql/MakeUpdate';

export default {
    methods: {
        click() {
            const config = {
                ...this.$store.state.lettercase,
                delimiter: this.$store.state.delimiter,
                bulk: this.$store.state.bulk,
                quotation: this.$store.state.quotation,
            };
            const makeUpdate = new MakeUpdate({tableName: this.$store.state.tableName, updateValue: this.$store.state.updateValue, tableValue: this.$store.state.tableValue, config});

            this.$store.commit('setSql', makeUpdate.make());
        }
    }
};
</script>
