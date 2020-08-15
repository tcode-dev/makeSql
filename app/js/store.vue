<script>
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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
        setTableValue(state, value) {
            state.tableName = value;
        },
        sealeValue(state, value) {
            state.tableValue = value;
        },
        setUpdateValue(state, value) {
            state.updateValue = value;
        },
        setSql(state, value) {
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

export default store;
</script>
