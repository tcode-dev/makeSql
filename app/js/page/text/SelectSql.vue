<template>
    <li id="select1" class="btn" v-on:click="click">Select</li>
</template>

<script>
export default {
    methods: {
        click() {
            this.$store.commit('updateSql', `${this.$store.state.tableName} select!!!`);
        }
    }
};
</script>
