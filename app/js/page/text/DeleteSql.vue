<template>
    <li id="delete" class="btn" v-on:click="click">Delete</li>
</template>

<script>
import { Const } from '../../Const.js';
import MakeDelete from '../../sql/MakeDelete';

export default {
    methods: {
        click() {
            const config = {
                delimiter: Const.delimiter[this.$store.state.delimiter],
                ...Const.lettercase[this.$store.state.lettercase],
                bulk: this.$store.state.bulk,
                quotation: this.$store.state.quotation ? "'" : '',
            };
            const makeDelete = new MakeDelete({tableName: this.$store.state.tableName, tableValue: this.$store.state.tableValue, config});

            this.$store.commit('setSql', makeDelete.make());
        }
    }
};
</script>
