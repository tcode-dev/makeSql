<template>
    <li id="select1" class="btn" v-on:click="click">Select</li>
</template>

<script>
import Const from '../../Const.json';
import MakeSelect from '../../sql/MakeSelect';

export default {
    methods: {
        click() {
            const makeSelect = new MakeSelect({tableName: this.$store.state.tableName, tableValue: this.$store.state.tableValue, config: Const[this.$store.state.phrase]});

            this.$store.commit('updateSql', makeSelect.make());
        }
    }
};
</script>
