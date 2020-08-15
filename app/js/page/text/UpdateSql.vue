<template>
    <li id="update" class="btn" v-on:click="click">Update</li>
</template>

<script>
import { Const } from '../../Const.js';
import MakeUpdate from '../../sql/MakeUpdate';

export default {
    methods: {
        click() {
            const config = {
                delimiter: Const.delimiter[this.$store.state.delimiter],
                ...Const.lettercase[this.$store.state.lettercase],
                bulk: this.$store.state.bulk,
                quotation: this.$store.state.quotation ? "'" : '',
            };
            const makeUpdate = new MakeUpdate({tableName: this.$store.state.tableName, updateValue: this.$store.state.updateValue, tableValue: this.$store.state.tableValue, config});

            this.$store.commit('setSql', makeUpdate.make());
        }
    }
};
</script>
