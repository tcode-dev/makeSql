<template>
  <dl>
    <dt class="mb-2">更新情報</dt>
    <dd><textarea rows="2" class="form-control" v-model="updateValue"></textarea></dd>
  </dl>
</template>

<script>
export default {
  computed: {
    updateValue: {
      get() {
        return this.$store.state.updateValue
      },
      set(value) {
        this.$store.commit('setUpdateValue', value)
      }
    }
  }
};
</script>
