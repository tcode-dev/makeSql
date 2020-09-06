<template>
  <div class="form-file">
    <input type="file" class="form-file-input" id="fileSelection" ref="fileSelection" v-on:change="change" multiple>
    <label class="form-file-label" for="fileSelection">
      <span class="form-file-text">{{ fileSelect }}</span>
      <span class="form-file-button">ファイル選択</span>
    </label>
  </div>
</template>

<script>
export default {
  computed: {
    fileSelect: {
      get() {
        return this.$store.state.fileNumber > 0 ? `${this.$store.state.fileNumber}件のファイルを選択中` : 'Choose file...';
      },
    },
  },
  methods: {
    change() {
      this.$store.commit('setFiles', this.$refs.fileSelection.files);
    }
  }
}
</script>

