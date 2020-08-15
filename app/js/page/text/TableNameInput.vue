<template>
    <dl>
        <dt>テーブル名</dt>
        <dd><input type="text" id="tableName" v-model="tableName"></dd>
    </dl>
</template>

<script>
export default {
    computed: {
        tableName: {
            get() {
                return this.$store.state.tableName
            },
            set(value) {
                this.$store.commit('setTableValue', value)
            }
        }
    }
};
</script>
