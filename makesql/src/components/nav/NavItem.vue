<template>
  <RouterLink v-bind:to="{ path }" active-class="isActive">{{ label }}</RouterLink>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
  path: string,
  label: string
}

defineProps<Props>()
</script>
