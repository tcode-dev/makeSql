<template>
  <div>
    <h3 class="btn">{{ item.title }}</h3>
    <transition>
      <p><textarea cols="45" rows="5" name="text[]" readonly v-model="item.sql"></textarea></p>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["item"]
}
</script>
