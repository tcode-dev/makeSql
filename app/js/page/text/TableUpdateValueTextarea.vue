<template>
    <dl>
        <dt>更新情報</dt>
        <dd><textarea cols="40" rows="2" id="updatetext" v-model="updateValue"></textarea></dd>
    </dl>
</template>

<script>
export default {
    computed: {
        updateValue: {
            get() {
                return this.$store.state.updateValue
            },
            set(value) {
                this.$store.commit('setUpdateValue', value)
            }
        }
    }
};
</script>
