<template>
    <dl class="config">
        <dt>区切り文字</dt>
        <dd>
            <ul>
                <li><input type="radio" id="delimiterComma" name="delimiter" value="comma" v-model="delimiter"><label for="delimiterComma">comma</label></li>
                <li><input type="radio" id="delimiterTab" name="delimiter" value="tab" v-model="delimiter"><label for="delimiterTab">tab</label></li>
                <li><input type="radio" id="delimiterSpace" name="delimiter" value="space" v-model="delimiter"><label for="delimiterSpace">space</label></li>
            </ul>
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
    }
};
</script>
