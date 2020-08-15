import Vue from 'vue';
import Vuex from 'vuex'
import Page from './page/Index.vue';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        tableName: 'tableName',
        updateValue: '',
        tableValue: `col1,col2\ndata1,data2\ndata3,data4`,
        delimiter: 'comma',
        lettercase: 'uppercase',
        characterCode: 'eucJp',
        bulk: false,
        sql: '',
    },
    mutations: {
        updateTableName(state, value) {
            state.tableName = value;
        },
        updateTableValue(state, value) {
            state.tableValue = value;
        },
        setUpdateValue(state, value) {
            state.updateValue = value;
        },
        updateSql(state, value) {
            state.sql = value;
        },
        setDelimiter(state, delimiter) {
            state.delimiter = delimiter;
        },
        setLettercase(state, lettercase) {
            state.lettercase = lettercase;
        },
        setCharacterCode(state, characterCode) {
            state.characterCode = characterCode;
        },
        setBulk(state, bulk) {
            state.bulk = bulk;
        },
    }
});

class Index {
    init() {
        new Vue(Object.assign({}, Page, {store}));
    }
}

window.Index = Index;
