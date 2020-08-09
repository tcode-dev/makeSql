<template>
    <li id="select1" class="btn" v-on:click="click">Select</li>
</template>

<script>
export default {
    methods: {
        click() {
            this.$emit('make-sql', 'select!!!');
        }
    }
};
</script>
