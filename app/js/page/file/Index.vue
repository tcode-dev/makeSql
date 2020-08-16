<template>
    <div id="file-area" class="area-panel">
        <h2>ファイルからSQLを作成</h2>
        <p class="summary">csvファイルからSQLを作成します。</p>

        <div class="area-button">
            <ul class="btn-group">
                <li id="select2" class="btn">Select</li>
                <li id="insert2" class="btn">Insert</li>
                <li id="delete2" class="btn">Delete</li>
                <li id="update2" class="btn">Update</li>
            </ul>
        </div>

        <div id="select-file">
            <p><input type="file" id="files" multiple ref="fileSelectionButton" v-on:change="change"></p>
            <p><button id="dummy" class="btn" v-on:click="click">ファイル選択</button><span v-if="fileNumber">{{ fileNumber }}件のファイルを選択しました。</span></p>
        </div>

        <form id="makefile" method="post" action="php/makefile.php">
            <p><input id="download" class="btn" type="submit" value="Download"></p>
            <div id="output"></div>
        </form>
    </div>
</template>

<script>

export default {
    computed: {
        fileNumber: {
            get() {
                return this.$store.state.fileNumber
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
