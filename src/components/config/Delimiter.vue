<template>
  <dl class="config">
    <dt>区切り文字</dt>
    <dd>
      <ul>
        <li><label><input type="radio" name="delimiter" value="comma" v-model="delimiter">comma</label></li>
        <li><label><input type="radio" name="delimiter" value="tab" v-model="delimiter">tab</label></li>
        <li><label><input type="radio" name="delimiter" value="space" v-model="delimiter">space</label></li>
      </ul>
    </dd>
  </dl>
</template>

<script>
export default {
  computed: {
    delimiter: {
      get() {
        return this.$store.state.delimiter
      },
      set(value) {
        this.$store.commit('setDelimiter', value)
      }
    },
  }
};
</script>
