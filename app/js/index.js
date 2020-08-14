import Vue from 'vue';
import Vuex from 'vuex'
import TextPage from './page/text/Index.vue';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        tableName: 'tableName',
        updateValue: '',
        tableValue: `col1,col2\ndata1,data2\ndata3,data4`,
        delimiter: 'comma',
        lettercase: 'uppercase',
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
        }
    }
});

class Index {
    init() {
        new Vue(Object.assign({}, TextPage, {store}));
    }
}

window.Index = Index;
