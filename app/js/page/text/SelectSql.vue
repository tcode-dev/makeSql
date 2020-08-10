<template>
    <li id="select1" class="btn" v-on:click="click">Select</li>
</template>

<script>
export default {
    methods: {
        click() {
            this.$store.commit('updateSql', `select ${this.$store.state.tableName} ${this.$store.state.tableValue}`);
        }
    }
};
</script>
