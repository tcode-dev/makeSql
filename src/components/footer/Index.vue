<template>
  <div class="mt-4 py-2 border-top">
    <p class="text-right"><small>Copyright &copy; {{ year }}<span>makesql</span> All Rights Reserved.</small></p>
  </div>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getFullYear()
    },
  }
};
</script>
