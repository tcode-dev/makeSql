<script setup lang="ts">
import Bulk from '../components/page/config/Bulk.vue'
import CharacterCode from '../components/page/config/CharacterCode.vue'
import Delimiter from '../components/page/config/Delimiter.vue'
import Lettercase from '../components/page/config/Lettercase.vue'
import Quotation from '../components/page/config/Quotation.vue'
</script>

<template>
  <div>
    <h2>設定</h2>
    <table>
      <tbody>
        <Delimiter />
        <Lettercase />
        <CharacterCode />
        <Bulk />
        <Quotation />
      </tbody>
    </table>
  </div>
</template>
