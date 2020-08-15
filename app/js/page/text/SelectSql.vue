<template>
    <li id="select1" class="btn" v-on:click="click">Select</li>
</template>

<script>
import { Const } from '../../Const.js';
import MakeSelect from '../../sql/MakeSelect';

export default {
    methods: {
        click() {
            const config = {
                delimiter: Const.delimiter[this.$store.state.delimiter],
                ...Const.lettercase[this.$store.state.lettercase],
                bulk: this.$store.state.bulk,
                quotation: this.$store.state.quotation ? "'" : '',
            };
            const makeSelect = new MakeSelect({tableName: this.$store.state.tableName, tableValue: this.$store.state.tableValue, config});

            this.$store.commit('setSql', makeSelect.make());
        }
    }
};
</script>
