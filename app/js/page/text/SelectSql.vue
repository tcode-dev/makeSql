<template>
    <li id="select1" class="btn" v-on:click="click">Select</li>
</template>

<script>
import MakeSelect from '../../sql/MakeSelect';

export default {
    methods: {
        click() {
            const config = {
                ...this.$store.state.lettercase,
                delimiter: this.$store.state.delimiter,
                bulk: this.$store.state.bulk,
                quotation: this.$store.state.quotation,
            };
            const makeSelect = new MakeSelect({tableName: this.$store.state.tableName, tableValue: this.$store.state.tableValue, config});

            this.$store.commit('setSql', makeSelect.make());
        }
    }
};
</script>
