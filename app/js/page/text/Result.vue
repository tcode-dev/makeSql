<template>
    <textarea cols="40" rows="13" id="aftertext" v-model="sql"></textarea>
</template>

<script>
export default {
    computed: {
        sql: {
            get() {
                return this.$store.state.sql
            },
        }
    }
};
</script>
