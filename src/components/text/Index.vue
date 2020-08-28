<template>
  <div id="text-area" class="area-panel">
    <h2>テキストからSQLを作成</h2>
    <div>
      <div class="area-button">
        <ul class="btn-group">
          <select-sql></select-sql>
          <insert-sql></insert-sql>
          <delete-sql></delete-sql>
          <update-sql></update-sql>
        </ul>
      </div>
      <div class="row-fluid">
        <div id="befor" class="span6">
          <table-name-input></table-name-input>
          <table-update-value-textarea></table-update-value-textarea>
          <table-value-textarea></table-value-textarea>
        </div>
        <p class="arrow-right">&rarr; </p>
        <div id="after" class="span6">
          <result></result>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectSql from './SelectSql.vue';
import InsertSql from './InsertSql.vue';
import DeleteSql from './DeleteSql.vue';
import UpdateSql from './UpdateSql.vue';
import TableNameInput from './TableNameInput.vue';
import TableUpdateValueTextarea from './TableUpdateValueTextarea.vue';
import TableValueTextarea from './TableValueTextarea.vue';
import Result from './Result.vue';

export default {
  components: {
    'select-sql': SelectSql,
    'insert-sql': InsertSql,
    'delete-sql': DeleteSql,
    'update-sql': UpdateSql,
    'table-name-input': TableNameInput,
    'table-update-value-textarea': TableUpdateValueTextarea,
    'table-value-textarea': TableValueTextarea,
    'result': Result,
  },
};
</script>
