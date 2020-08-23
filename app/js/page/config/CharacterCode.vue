<template>
    <dl class="config">
        <dt>文字コード</dt>
        <dd>
            <ul>
                <li><label><input type="radio" name="characterCode" value="shiftJis" v-model="characterCode">Shift_JIS</label></li>
                <li><label><input type="radio" name="characterCode" value="utf8" v-model="characterCode">UTF-8</label></li>
                <li><label><input type="radio" name="characterCode" value="eucJp" v-model="characterCode">EUC-JP</label></li>
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
