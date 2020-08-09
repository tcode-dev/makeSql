<template>
    <li id="update" class="btn" v-on:click="click">Update</li>
</template>

<script>
export default {
    methods: {
        click() {
            this.$emit('make-sql', 'update!!!');
        }
    }
};
</script>
