<script>
import SelectSql from './text/SelectSql.vue';
import InsertSql from './text/InsertSql.vue';
import DeleteSql from './text/DeleteSql.vue';
import UpdateSql from './text/UpdateSql.vue';
import TableNameInput from './text/TableNameInput.vue';
import TableUpdateValueTextarea from './text/TableUpdateValueTextarea.vue';
import TableValueTextarea from './text/TableValueTextarea.vue';
import Setting from './setting/Index.vue';
import Result from './text/Result.vue';

export default {
    el: '#page-body',
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
        'table-update-value-textarea': TableUpdateValueTextarea,
        'table-value-textarea': TableValueTextarea,
        'setting': Setting,
        'result': Result,
    },
    methods: {
        receiveSql(sql) {
            this.sql = sql;
        }
    }
};
</script>
