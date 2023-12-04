<template>
  <button class="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  label: string
}

defineProps<Props>()
</script>
