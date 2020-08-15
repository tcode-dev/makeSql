<template>
    <ul>
        <li><input type="radio" id="lettercaseUppercase" name="lettercase" value="uppercase" v-model="lettercase"><label for="lettercaseUppercase">UPPERCASE</label></li>
        <li><input type="radio" id="lettercaseCamelcase" name="lettercase" value="camelcase" v-model="lettercase"><label for="lettercaseCamelcase">Camelcase</label></li>
        <li><input type="radio" id="lettercaseLowercase" name="lettercase" value="lowercase" v-model="lettercase"><label for="lettercaseLowercase">lowercase</label></li>
    </ul>
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
