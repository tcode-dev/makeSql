<template>
    <textarea cols="40" rows="13" id="aftertext" v-bind:sql="sql">{{ sql }}</textarea>
</template>

<script>
export default {
    props: ['sql'],
    methods: {
        click() {
            this.$emit('make-sql', 'update!!!');
        }
    }
};
</script>
