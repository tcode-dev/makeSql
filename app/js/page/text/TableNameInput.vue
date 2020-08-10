<template>
    <input type="text" id="tableName" v-model="tableName">
</template>

<script>
export default {
    computed: {
        tableName: {
            get() {
                return this.$store.state.tableName
            },
            set(value) {
                this.$store.commit('updateTableName', value)
            }
        }
    }
};
</script>
