<script setup lang="ts">
import { useTextStore } from '@/stores/textStore'

const store = useTextStore()
</script>

<template>
  <form class="ui large form">
    <div v-if="store.state.error" class="ui negative message" role="alert">{{ store.state.error }}</div>
    <div class="field">
      <label for="sql">SQL</label>
      <textarea id="sql" v-model="store.state.sql"></textarea>
    </div>
  </form>
</template>

<style scoped>
.form {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.field {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.ui.form textarea {
  flex-grow: 1;
  height: auto;
  max-height: none;
}
</style>
