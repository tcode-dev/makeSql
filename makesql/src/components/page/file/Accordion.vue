<script setup lang="ts">
import { ref } from "vue"

defineProps({
  title: String,
  sql: String
})

const active = ref('active')
const handleClick = () => {
  active.value = active.value === '' ? 'active' : ''
}
</script>

<template>
  <div class="ui accordion">
    <a class="title" :class="active" @click="handleClick">{{ title }}</a>
    <div class="content" :class="active">
      <textarea rows="5">{{ sql }}</textarea>
    </div>
  </div>
</template>
