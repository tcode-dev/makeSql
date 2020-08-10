<template>
    <textarea cols="40" rows="5" id="beforetext" v-model="tableValue"></textarea>
</template>

<script>
export default {
    computed: {
        tableValue: {
            get() {
                return this.$store.state.tableValue
            },
            set(value) {
                this.$store.commit('updateTableValue', value)
            }
        }
    }
};
</script>
