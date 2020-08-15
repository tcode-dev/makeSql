<template>
    <dl>
        <dt>quotation</dt>
        <dd>
            <input type="checkbox" id="quotation" name="quotation" v-model="quotation"><label for="quotation">quotation</label>
        </dd>
    </dl>
</template>

<script>
export default {
    computed: {
        quotation: {
            get() {
                return this.$store.state.quotation
            },
            set(value) {
                this.$store.commit('setQuotation', value)
            }
        },
    }
};
</script>
