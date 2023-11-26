import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type Config = {
  lettercase: string,
  delimiter: string,
  bulk: boolean,
  quotation: string,
};

export const useConfigStore = defineStore('config', () => {
  const count = ref({})
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
