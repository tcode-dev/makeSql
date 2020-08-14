<template>
    <div>
        <div>
            <input type="radio" id="delimiterComma" name="delimiter" value="comma" v-model="delimiter"><label for="delimiterComma">comma</label>
            <input type="radio" id="delimiterTab" name="delimiter" value="tab" v-model="delimiter"><label for="delimiterTab">tab</label>
            <input type="radio" id="delimiterSpace" name="delimiter" value="space" v-model="delimiter"><label for="delimiterSpace">space</label>
        </div>
        <div>
            <input type="radio" id="lettercaseUppercase" name="lettercase" value="uppercase" v-model="lettercase"><label for="lettercaseUppercase">UPPERCASE</label>
            <input type="radio" id="lettercaseCamelcase" name="lettercase" value="camelcase" v-model="lettercase"><label for="lettercaseCamelcase">Camelcase</label>
            <input type="radio" id="lettercaseLowercase" name="lettercase" value="lowercase" v-model="lettercase"><label for="lettercaseLowercase">lowercase</label>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        delimiter: {
            get() {
                return this.$store.state.delimiter
            },
            set(value) {
                this.$store.commit('setDelimiter', value)
            }
        },
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
