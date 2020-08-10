<template>
    <li id="select1" class="btn" v-on:click="click">Select</li>
</template>

<script>
export default {
    methods: {
        click() {
            this.$emit('make-sql', `${this.$store.state.tableName} select!!!`);
        }
    }
};
</script>
