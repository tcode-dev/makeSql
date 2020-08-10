<template>
    <li id="insert1" class="btn" v-on:click="click">Insert</li>
</template>

<script>
export default {
    methods: {
        click() {
            this.$emit('make-sql', `${this.$store.state.tableName} insert!!!`);
        }
    }
};
</script>
