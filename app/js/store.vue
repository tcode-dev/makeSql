<script>
import Vue from 'vue';
import Vuex from 'vuex';
import Const from './Const.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        tableName: 'tableName',
        updateValue: '',
        tableValue: `col1,col2\ndata1,data2\ndata3,data4`,
        delimiter: Const.delimiter['comma'],
        lettercase: Const.lettercase['uppercase'],
        characterCode: Const.characterCode['eucJp'],
        bulk: true,
        quotation: '',
        sql: '',
        files: [],
        fileNumber: 0,
        list: [],
    },
    mutations: {
        setTableName(state, value) {
            state.tableName = value;
        },
        setUpdateValue(state, value) {
            state.updateValue = value;
        },
        setTableValue(state, value) {
            state.tableValue = value;
        },
        setSql(state, value) {
            state.sql = value;
        },
        setDelimiter(state, value) {
            state.delimiter = Const.delimiter[value];
        },
        setLettercase(state, value) {
            state.lettercase = Const.lettercase[value];
        },
        setCharacterCode(state, value) {
            state.characterCode = Const.characterCode[value];
        },
        setBulk(state, value) {
            state.bulk = value;
        },
        setQuotation(state, value) {
            state.quotation = value ? "'" : '';
        },
        setFiles(state, value) {
            state.files = value;
            state.fileNumber = value.length;
        },
        addList(state, value) {
            state.list.push(value);
        },
        removeList(state) {
            state.list = [];
        },
    }
});

export default store;
</script>
