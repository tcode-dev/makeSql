<template>
  <button @click="click">Select</button>
  <p>{{  text  }}</p>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const text = ref('test1')
const click = () => {
  text.value = text.value = text.value + "click"
}

</script>
