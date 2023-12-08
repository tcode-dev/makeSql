<script setup lang="ts">
import { useConfigStore } from '@/stores/configStore'
import { useFileStore } from '@/stores/fileStore'
import Button from '@/components/button/Button.vue'
import MakeSelect from '@/sql/MakeSelect'
import FileExtractor from '@/util/FileExtractor';

const fileStore = useFileStore()
const configStore = useConfigStore()
const handleClick = () => {
  fileStore.$reset()

  const fileExtractor = new FileExtractor();

  fileStore.state.fileList.forEach(file => {
    fileExtractor.extract(file, configStore.state.characterCode).then(data => {
      const makeSelect = new MakeSelect(data.name, data.text, configStore.config)
      const item = {
        name: data.name,
        sql: makeSelect.make(),
      };
      fileStore.addSql(item)
    });
  });
}
</script>

<template>
  <Button label="Select" @click="handleClick" />
</template>
