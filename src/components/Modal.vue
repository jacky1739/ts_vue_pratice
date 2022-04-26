<template>
  <teleport to="#modal">
    <div class="center" v-if="isOpen">
      <h2><slot>this is Modal</slot></h2>
      <button @click="buttonClick">Close</button>
    </div>
  </teleport>
</template>

<style>
  .center {
    width: 200px;
    height: 200px;
    border: 2px solid black;
    background: white;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    isOpen: Boolean
  },
  emits: { // 值可以定義成一個函數
    'close-modal': null
  },
  setup (props, context) {
    const buttonClick = () => {
      context.emit('close-modal')
    }
    return {
      buttonClick
    }
  }
})
</script>
