<template>
  <RouterLink v-bind:to="{ path }" class="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900" active-class="isActive">{{ label }}</RouterLink>
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
