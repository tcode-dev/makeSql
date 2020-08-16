<template>
    <div id="file-area" class="area-panel">
        <h2>ファイルからSQLを作成</h2>
        <p class="summary">csvファイルからSQLを作成します。</p>

        <div class="area-button">
            <ul class="btn-group">
                <select-sql></select-sql>
                <li id="insert2" class="btn">Insert</li>
                <delete-sql></delete-sql>
                <li id="update2" class="btn">Update</li>
            </ul>
        </div>

        <div id="select-file">
            <p><input type="file" id="files" multiple ref="fileSelectionButton" v-on:change="change"></p>
            <p><button id="dummy" class="btn" v-on:click="click">ファイル選択</button><span v-if="fileNumber">{{ fileNumber }}件のファイルを選択しました。</span></p>
        </div>

        <form id="makefile" method="post" action="php/makefile.php">
            <p><input id="download" class="btn" type="submit" value="Download"></p>
            <div id="output">
				<div v-for="item in list">
                    <h3 class="btn">{{ item.title }}</h3>
                    <p><textarea cols="45" rows="5" name="text[]" readonly>{{ item.sql }}</textarea></p>
                    <p><input type="hidden" name="file[]" v-bind:value="item.filename"></p>
				</div>
			</div>
        </form>
    </div>
</template>

<script>
import SelectSql from './SelectSql.vue';
import DeleteSql from './DeleteSql.vue';

export default {
    components: {
        'select-sql': SelectSql,
        'delete-sql': DeleteSql,
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
