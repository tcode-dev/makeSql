<template>
  <div class="fragment">
    <button class="btn btnToggle" @click="toggle">{{ item.title }}</button>
    <transition @before-enter="beforeEnter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave">
      <div class="sql-accordion" v-if="show" :class="{ 'is-open': show }" ref="accordion">
        <textarea cols="45" rows="5" readonly v-model="item.sql" ref="textarea" v-bind:style="{height: height}"></textarea>
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
.btnToggle {
  margin-bottom: 10px;
}
.sql-accordion {
  overflow: hidden;
}
.v-enter-active,
.v-leave-active {
  transition: height .4s ease-in-out;
}
.v-enter {
    height: 0 !important;
}
textarea {
  width: 926px;
  height: 100px;
  margin: 0;
  cursor: default;
  box-sizing: border-box;
}
.btn {
  width: 935px;;
  text-align: left;
}
#dummy:focus,
#download:focus {
  outline:none;
}
</style>
