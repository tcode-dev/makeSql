<template>
    <dl>
        <dt>区切り文字</dt>
        <dd>
            <ul>
                <li><input type="radio" id="delimiterComma" name="delimiter" value="comma" v-model="delimiter"><label for="delimiterComma">comma</label></li>
                <li><input type="radio" id="delimiterTab" name="delimiter" value="tab" v-model="delimiter"><label for="delimiterTab">tab</label></li>
                <li><input type="radio" id="delimiterSpace" name="delimiter" value="space" v-model="delimiter"><label for="delimiterSpace">space</label></li>
            </ul>
        </dd>
        <dt>大文字、小文字</dt>
        <dd>
            <ul>
                <li><input type="radio" id="lettercaseUppercase" name="lettercase" value="uppercase" v-model="lettercase"><label for="lettercaseUppercase">UPPERCASE</label></li>
                <li><input type="radio" id="lettercaseCamelcase" name="lettercase" value="camelcase" v-model="lettercase"><label for="lettercaseCamelcase">Camelcase</label></li>
                <li><input type="radio" id="lettercaseLowercase" name="lettercase" value="lowercase" v-model="lettercase"><label for="lettercaseLowercase">lowercase</label></li>
            </ul>
        </dd>
        <dt>文字コード</dt>
        <dd>
            <ul>
                <li><input type="radio" id="characterCodeShiftJis" name="characterCode" value="shiftJis" v-model="characterCode"><label for="characterCodeShiftJis">Shift_JIS</label></li>
                <li><input type="radio" id="characterCodeUtf8" name="characterCode" value="utf8" v-model="characterCode"><label for="characterCodeUtf8">UTF-8</label></li>
                <li><input type="radio" id="characterCodeEucJp" name="characterCode" value="eucJp" v-model="characterCode"><label for="characterCodeEucJp">EUC-JP</label></li>
            </ul>
        </dd>
        <dt>bulk</dt>
        <dd>
            <input type="checkbox" id="bulk" name="bulk" v-model="bulk"><label for="bulk">bulk</label>
        </dd>
    </dl>
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
        characterCode: {
            get() {
                return this.$store.state.characterCode
            },
            set(value) {
                this.$store.commit('setCharacterCode', value)
            }
        },
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
