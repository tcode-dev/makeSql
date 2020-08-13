<template>
    <div>
        <input type="radio" id="phraseUppercase" name="phrase" value="uppercase" v-model="phrase"><label for="phraseUppercase">UPPERCASE</label>
        <input type="radio" id="phraseCamelcase" name="phrase" value="camelcase" v-model="phrase"><label for="phraseCamelcase">Camelcase</label>
        <input type="radio" id="phraseLowercase" name="phrase" value="lowercase" v-model="phrase"><label for="phraseLowercase">lowercase</label>
    </div>
</template>

<script>
export default {
    computed: {
        phrase: {
            get() {
                return this.$store.state.phrase
            },
            set(value) {
                this.$store.commit('setPhrase', value)
            }
        },
    }
};
</script>
