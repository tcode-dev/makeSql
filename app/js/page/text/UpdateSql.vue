<template>
    <li id="update" class="btn" v-on:click="click">Update</li>
</template>

<script>
export default {
    methods: {
        click() {
            this.$store.commit('updateSql', `${this.$store.state.tableName} update!!!`);
        }
    }
};
</script>
