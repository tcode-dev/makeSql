<script>
import SelectSql from './SelectSql.vue';
import InsertSql from './InsertSql.vue';
import DeleteSql from './DeleteSql.vue';
import UpdateSql from './UpdateSql.vue';
import Result from './Result.vue';

export default {
    el: '#text-area',
    data(){
        return {
            sql: ''
        }
    },
    components: {
        'select-sql': SelectSql,
        'insert-sql': InsertSql,
        'delete-sql': DeleteSql,
        'update-sql': UpdateSql,
        'result': Result,
    },
    methods: {
        receiveSql: function(sql){
            this.sql = sql;
        }
    }
};
</script>
