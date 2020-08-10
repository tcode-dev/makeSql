<template>
    <textarea cols="40" rows="13" id="aftertext" v-model="sql"></textarea>
</template>

<script>
export default {
    props: ['sql'],
};
</script>
