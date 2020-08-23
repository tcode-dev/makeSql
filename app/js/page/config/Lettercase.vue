<template>
    <dl class="config">
        <dt>大文字、小文字</dt>
        <dd>
            <ul>
                <li><label><input type="radio" name="lettercase" value="uppercase" v-model="lettercase">UPPERCASE</label></li>
                <li><label><input type="radio" name="lettercase" value="camelcase" v-model="lettercase">Camelcase</label></li>
                <li><label><input type="radio" name="lettercase" value="lowercase" v-model="lettercase">lowercase</label></li>
            </ul>
        </dd>
    </dl>
</template>

<script>
export default {
    computed: {
        lettercase: {
            get() {
                return this.$store.state.lettercase
            },
            set(value) {
                this.$store.commit('setLettercase', value)
            }
        },
    }
};
</script>
