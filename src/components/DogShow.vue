<template>
  <h1>{{ result }}</h1>
  <img :src="result && result.message">
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'

export default defineComponent({
  async setup () { // 使用 async awiat 就必須使用 async 在 setup 外包裹一層
    const rawData = await axios.get('https://dog.ceo/api/breeds/image/random ')

    return {
      result: rawData.data
    }
  }
})

</script>
