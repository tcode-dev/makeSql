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
        bulk: true,
        quotation: false,
        sql: '',
    },
    mutations: {
        setTableName(state, value) {
            state.tableName = value;
        },
        setTableValue(state, value) {
            state.tableValue = value;
        },
        setUpdateValue(state, value) {
            state.updateValue = value;
        },
        setSql(state, value) {
            state.sql = value;
        },
        setDelimiter(state, value) {
            state.delimiter = value;
        },
        setLettercase(state, value) {
            state.lettercase = value;
        },
        setCharacterCode(state, value) {
            state.characterCode = value;
        },
        setBulk(state, value) {
            state.bulk = value;
        },
        setQuotation(state, value) {
            state.quotation = value;
        },
        
    }
});

export default store;
</script>
