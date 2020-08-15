<template>
    <li id="update" class="btn" v-on:click="click">Update</li>
</template>

<script>
export default {
    methods: {
        click() {
            this.$store.commit('setSql', `update ${this.$store.state.tableName} ${this.$store.state.updateValue} ${this.$store.state.tableValue}`);
        }
    }
};
</script>
