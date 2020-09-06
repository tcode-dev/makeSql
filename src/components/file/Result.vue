<template>
  <div class="fragment">
    <div class="sql" v-for="item in list" v-bind:key="item.id">
      <list-item v-bind:item="item"></list-item>
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem.vue';

export default {
  components: {
    'list-item': ListItem,
  },
  computed: {
    list: {
      get() {
        return this.$store.state.list
      },
    },
  },
}
</script>

