<template>
    <li id="insert1" class="btn" v-on:click="click">Insert</li>
</template>

<script>
import { Const } from '../../Const.js';
import MakeInsert from '../../sql/MakeInsert';

export default {
    methods: {
        click() {
            const config = {
                delimiter: Const.delimiter[this.$store.state.delimiter],
                ...Const.lettercase[this.$store.state.lettercase],
                bulk: this.$store.state.bulk,
                quotation: this.$store.state.quotation ? "'" : '',
            };
            const makeInsert = new MakeInsert({tableName: this.$store.state.tableName, tableValue: this.$store.state.tableValue, config});

            this.$store.commit('setSql', makeInsert.make());
        }
    }
};
</script>
