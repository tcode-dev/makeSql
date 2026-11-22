<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  id: string
  title: string
  sql: string
  error?: string
}

defineProps<Props>()

const isOpen = ref(true)
const handleClick = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="ui accordion">
    <!-- キーボードでも開閉できるよう button にする -->
    <button type="button" class="title" :class="{ active: isOpen }" :aria-expanded="isOpen" :aria-controls="`${id}-content`" @click="handleClick">
      {{ title }}
    </button>
    <div :id="`${id}-content`" class="content" :class="{ active: isOpen }">
      <div v-if="error" class="ui negative message" role="alert">{{ error }}</div>
      <textarea v-else rows="5" :value="sql" :aria-label="`${title} の SQL`"></textarea>
    </div>
  </div>
</template>

<style scoped>
/* button の既定の見た目を消し、Semantic UI のアコーディオンのタイトルと同じ見た目にする */
.title {
  display: block;
  width: 100%;
  padding: 0.5em 0;
  border: none;
  background: none;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
}
</style>
