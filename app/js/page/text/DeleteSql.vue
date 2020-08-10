<template>
    <li id="delete" class="btn" v-on:click="click">Delete</li>
</template>

<script>
export default {
    methods: {
        click() {
            this.$emit('make-sql', `${this.$store.state.tableName} delete!!!`);
        }
    }
};
</script>
