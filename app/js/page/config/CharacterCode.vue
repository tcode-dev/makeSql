<template>
    <dl>
        <dt>文字コード</dt>
        <dd>
            <ul>
                <li><input type="radio" id="characterCodeShiftJis" name="characterCode" value="shiftJis" v-model="characterCode"><label for="characterCodeShiftJis">Shift_JIS</label></li>
                <li><input type="radio" id="characterCodeUtf8" name="characterCode" value="utf8" v-model="characterCode"><label for="characterCodeUtf8">UTF-8</label></li>
                <li><input type="radio" id="characterCodeEucJp" name="characterCode" value="eucJp" v-model="characterCode"><label for="characterCodeEucJp">EUC-JP</label></li>
            </ul>
        </dd>
    </dl>
</template>

<script>

export default {
    computed: {
        characterCode: {
            get() {
                return this.$store.state.characterCode
            },
            set(value) {
                this.$store.commit('setCharacterCode', value)
            }
        },
    }
};
</script>
