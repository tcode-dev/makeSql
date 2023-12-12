<template>
  <div class="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900" :class="{ isActive }">
    <RouterLink v-bind:to="{ path }">{{ label }}</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
  path: string,
  label: string
}

const props = defineProps<Props>()
const isActive = ref(props.path === location.pathname)
</script>
