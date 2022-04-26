<template>
<!-- Suspense 有兩個templete 先渲染其中一個的內容 當達到某個條件以後再渲染正式的內容 -->
<!-- 使用 Suspense 在 setup 裡要返回一個 promise 而不是對象 -->
  <h1>{{ result }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup () { // 有兩個參數 一個是resolve 另一個是 reject
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve({
          result: 42
        })
      }, 3000)
    })
  }
})

</script>
