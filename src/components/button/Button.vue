<script setup lang="ts">

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
