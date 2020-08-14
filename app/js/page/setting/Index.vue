<template>
    <div>
        <delimiter></delimiter>
        <lettercase></lettercase>
        <character-code></character-code>
        <bulk></bulk>
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
