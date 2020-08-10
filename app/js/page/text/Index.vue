<script>
import SelectSql from './SelectSql.vue';
import InsertSql from './InsertSql.vue';
import DeleteSql from './DeleteSql.vue';
import UpdateSql from './UpdateSql.vue';
import TableNameInput from './TableNameInput.vue';
import Result from './Result.vue';

export default {
    el: '#text-area',
    data() {
        return {
            sql: '',
        }
    },
    components: {
        'select-sql': SelectSql,
        'insert-sql': InsertSql,
        'delete-sql': DeleteSql,
        'update-sql': UpdateSql,
        'table-name-input': TableNameInput,
        'result': Result,
    },
    methods: {
        receiveSql(sql) {
            this.sql = sql;
        }
    }
};
</script>
