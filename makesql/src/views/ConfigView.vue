<script setup lang="ts">
import Checkbox from '../components/page/config/Checkbox.vue'
import Radio from '../components/page/config/Radio.vue'
import Title from '../components/title/Title.vue'
</script>

<template>
  <div>
    <Title>設定</Title>
    <table class="ui very basic table">
      <tbody>
        <Radio target="delimiter" />
        <Radio target="lettercase" />
        <Radio target="characterCode" />
        <Checkbox target="bulk" />
        <Checkbox target="quotation" />
        <Checkbox target="saveConfig" />
      </tbody>
    </table>
  </div>
</template>
