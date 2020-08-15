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
            <p><input type="file" id="files" multiple></p>
            <p><button id="dummy" class="btn">ファイル選択</button><span id="noticeFileCount"></span></p>
        </div>

        <form id="makefile" method="post" action="php/makefile.php">
            <p><input id="download" class="btn" type="submit" value="Download"></p>
            <div id="output"></div>
        </form>
    </div>
</template>
