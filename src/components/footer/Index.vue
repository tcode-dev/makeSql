<template>
  <p><small>Copyright &copy; {{ year }} <span id="mail">makesql</span> All Rights Reserved.</small></p>
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
