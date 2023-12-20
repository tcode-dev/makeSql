<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>

<template>
  <form class="ui large form">
    <div class="field">
      <label>SQL</label>
      <textarea v-model="store.state.sql"></textarea>
    </div>
  </form>
</template>

<style scoped>
.form {
  height: 100%;
}
.field {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.ui.form textarea {
  flex-grow: 1;
  height: auto;
  max-height: none;
}
</style>
