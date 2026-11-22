<script setup lang="ts">
import SqlButton from '../components/page/text/SqlButton.vue'
import TableName from '../components/page/text/TableName.vue'
import Updates from '../components/page/text/Updates.vue'
import Contents from '../components/page/text/Contents.vue'
import Result from '../components/page/text/Result.vue'
import Title from '../components/title/Title.vue'
</script>

<template>
  <div>
    <Title>テキストからSQLを作成</Title>
    <div class="buttonContainer">
      <SqlButton type="select" />
      <SqlButton type="insert" />
      <SqlButton type="delete" />
      <SqlButton type="update" />
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
        <Result />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ui.grid {
  padding-top: 2rem;
}
</style>
