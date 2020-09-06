<template>
  <div class="fragment d-flex stack mb-4">
    <button class="btn btn-outline-secondary text-left mb-3" @click="toggle">{{ item.title }}</button>
    <transition @before-enter="beforeEnter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave">
      <div class="sql-accordion" v-if="show" :class="{ 'is-open': show }" ref="accordion">
        <textarea class="form-control w-100" rows="5" v-model="item.sql" ref="textarea" v-bind:style="{height: height}"></textarea>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data: () => {
    return {
      show: true,
      height: '100px'
    }
  },
  methods: {
    toggle() {
      if (this.show) {
        this.height = `${this.$refs.textarea.clientHeight + 2}px`;
        this.$refs.accordion.style.height = this.height;
      }
      this.show = !this.show;
    },
    beforeEnter(el) {
      el.style.height = this.height;
      this.$refs.textarea.style.height = this.height;
    },
    afterEnter(el) {
      el.style.height = 'auto';
    },
    beforeLeave(el) {
      this.height = `${this.$refs.textarea.clientHeight + 2}px`;
      el.style.height = this.height;
    },
    leave(el) {
      el.style.height = '0';
    }
  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: height .4s ease-in-out;
}
.v-enter {
  height: 0 !important;
}
.sql-accordion {
  overflow: hidden;
}
.stack {
  flex-direction: column;
}
</style>
