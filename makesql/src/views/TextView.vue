<template>
  <div>
    <Title>テキストからSQLを作成</Title>
    <div class="buttonContainer">
      <SelectButton />
      <InsertButton />
      <DeleteButton />
      <UpdateButton />
    </div>
    <div class="ui stackable equal width grid">
      <div class="column">
        <form class="ui large form">
          <TableName />
          <Updates />
          <Contents />
        </form>
      </div>
      <div class="column">
        <form class="ui large form">
          <Result />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectButton from '../components/page/text/SelectButton.vue'
import InsertButton from '../components/page/text/InsertButton.vue'
import DeleteButton from '../components/page/text/DeleteButton.vue'
import UpdateButton from '../components/page/text/UpdateButton.vue'
import TableName from '../components/page/text/TableName.vue'
import Updates from '../components/page/text/Updates.vue'
import Contents from '../components/page/text/Contents.vue'
import Result from '../components/page/text/Result.vue'
import Title from '../components/title/Title.vue'
</script>

<style scoped>
.ui.grid {
  padding-top: 2em;
}
</style>
