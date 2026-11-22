<script setup lang="ts">
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useTextStore } from '@/stores/textStore'
import Button from '@/components/button/Button.vue'
import SqlFactory, { SqlLabel, type SqlType } from '@/sql/SqlFactory'
import InputError from '@/util/InputError'

interface Props {
  type: SqlType
}

const props = defineProps<Props>()
const textStore = useTextStore()
const configStore = useConfigStore()
const isDisabled = computed(() => !SqlFactory.canMakeFromText(props.type, textStore.state))
const handleClick = () => {
  const factory = new SqlFactory(configStore.config)

  try {
    textStore.setSql(factory.fromText(props.type, textStore.state))
  } catch (error) {
    if (error instanceof InputError) {
      textStore.setError(error.message)

      return
    }

    throw error
  }
}
</script>

<template>
  <Button :label="SqlLabel[type]" :disabled="isDisabled" @click="handleClick" />
</template>
