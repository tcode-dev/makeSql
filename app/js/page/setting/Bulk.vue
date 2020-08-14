<template>
    <dl>
        <dt>bulk</dt>
        <dd>
            <input type="checkbox" id="bulk" name="bulk" v-model="bulk"><label for="bulk">bulk</label>
        </dd>
    </dl>
</template>

<script>
export default {
    computed: {
        bulk: {
            get() {
                return this.$store.state.bulk
            },
            set(value) {
                this.$store.commit('setBulk', value)
            }
        },
    }
};
</script>
