<template>
    <div id="config-area" class="area-panel">
        <h2>設定情報</h2>
        <p class="summary">SQL作成時に使用する情報を設定します。</p>
        <div>
            <delimiter></delimiter>
            <lettercase></lettercase>
            <character-code></character-code>
            <bulk></bulk>
        </div>
    </div>
</template>

<script>
import Delimiter from './Delimiter.vue';
import Lettercase from './Lettercase.vue';
import CharacterCode from './CharacterCode.vue';
import Bulk from './Bulk.vue';

export default {
    components: {
        'delimiter': Delimiter,
        'lettercase': Lettercase,
        'character-code': CharacterCode,
        'bulk': Bulk,
    },
};
</script>
