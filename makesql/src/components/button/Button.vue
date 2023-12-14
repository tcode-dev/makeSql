<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  label: string
}

defineProps<Props>()
</script>

<template>
  <button type="button" class="ui basic button">
    {{ label }}
  </button>
</template>
