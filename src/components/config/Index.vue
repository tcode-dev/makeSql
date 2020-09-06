<template>
  <div class="vue--fragment">
    <h2 class="h5 mb-4">設定情報</h2>
    <table class="table w-auto">
      <tbody>
        <delimiter></delimiter>
        <lettercase></lettercase>
        <character-code></character-code>
        <bulk></bulk>
        <quotation></quotation>
      </tbody>
    </table>
  </div>
</template>

<script>
import Delimiter from './Delimiter.vue';
import Lettercase from './Lettercase.vue';
import CharacterCode from './CharacterCode.vue';
import Bulk from './Bulk.vue';
import Quotation from './Quotation.vue';

export default {
  components: {
    'delimiter': Delimiter,
    'lettercase': Lettercase,
    'character-code': CharacterCode,
    'bulk': Bulk,
    'quotation': Quotation,
  },
};
</script>
