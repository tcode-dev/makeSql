<template>
    <li id="delete" class="btn" v-on:click="click">Delete</li>
</template>

<script>
export default {
    methods: {
        click() {
            this.$store.commit('updateSql', `${this.$store.state.tableName} delete!!!`);
        }
    }
};
</script>
