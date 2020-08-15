<template>
    <li id="delete" class="btn" v-on:click="click">Delete</li>
</template>

<script>
export default {
    methods: {
        click() {
            this.$store.commit('setSql', `delete ${this.$store.state.tableName} ${this.$store.state.tableValue}`);
        }
    }
};
</script>
