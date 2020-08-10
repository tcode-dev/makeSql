<template>
    <li id="insert1" class="btn" v-on:click="click">Insert</li>
</template>

<script>
export default {
    methods: {
        click() {
            this.$store.commit('updateSql', `insert ${this.$store.state.tableName} ${this.$store.state.tableValue}`);
        }
    }
};
</script>
