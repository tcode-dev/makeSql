<template>
  <button>
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
