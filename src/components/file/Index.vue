<template>
  <div class="vue--fragment">
    <h2 class="h5 mb-4">ファイルからSQLを作成</h2>
    <div class="row mb-4">
      <div class="col-6 btn-group d-flex">
        <select-sql></select-sql>
        <insert-sql></insert-sql>
        <delete-sql></delete-sql>
        <update-sql></update-sql>
      </div>
      <div class="col-4">
        <file />
      </div>
      <div class="col-2">
        <download></download>
      </div>
    </div>
    <result />
  </div>
</template>

<script>
import SelectSql from './SelectSql.vue';
import InsertSql from './InsertSql.vue';
import DeleteSql from './DeleteSql.vue';
import UpdateSql from './UpdateSql.vue';
import File from './File.vue';
import Download from './Download.vue';
import Result from './Result.vue';

export default {
  components: {
    'select-sql': SelectSql,
    'insert-sql': InsertSql,
    'delete-sql': DeleteSql,
    'update-sql': UpdateSql,
    'file': File,
    'download': Download,
    'result': Result,
  },
};
</script>
