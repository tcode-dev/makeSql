<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
  path: string
  label: string
}

defineProps<Props>()
</script>

<template>
  <RouterLink v-bind:to="path" class="item" active-class="active">{{ label }}</RouterLink>
</template>
