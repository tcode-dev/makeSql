<template>
    <div id="file-area" class="area-panel">
        <h2>ファイルからSQLを作成</h2>
        <p class="summary">csvファイルからSQLを作成します。</p>

        <div class="area-button">
            <ul class="btn-group">
                <select-sql></select-sql>
                <insert-sql></insert-sql>
                <delete-sql></delete-sql>
                <update-sql></update-sql>
            </ul>
        </div>

        <div id="select-file">
            <p><input type="file" id="files" multiple ref="fileSelectionButton" v-on:change="change"></p>
            <p><button id="dummy" class="btn" v-on:click="click">ファイル選択</button><span v-if="fileNumber">{{ fileNumber }}件のファイルを選択しました。</span></p>
        </div>

        <form id="makefile" method="post" action="php/makefile.php">
            <p><download></download></p>
            <div id="output">
                <div v-for="item in list" v-bind:key="item.id">
                    <h3 class="btn">{{ item.title }}</h3>
                    <p><textarea cols="45" rows="5" name="text[]" readonly v-model="item.sql"></textarea></p>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import SelectSql from './SelectSql.vue';
import InsertSql from './InsertSql.vue';
import DeleteSql from './DeleteSql.vue';
import UpdateSql from './UpdateSql.vue';
import Download from './Download.vue';

export default {
    components: {
        'select-sql': SelectSql,
        'insert-sql': InsertSql,
        'delete-sql': DeleteSql,
        'update-sql': UpdateSql,
        'download': Download,
    },
    computed: {
        fileNumber: {
            get() {
                return this.$store.state.fileNumber
            },
        },
        list: {
            get() {
                return this.$store.state.list
            },
        },
    },
    methods: {
        click() {
            this.$refs.fileSelectionButton.click();
        },
        change() {
            this.$store.commit('setFiles', this.$refs.fileSelectionButton.files);
        }
    }
};
</script>
