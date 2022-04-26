import { ref } from 'vue'
import axios from 'axios'

function useURLLoader<T> (url: string) {
  const result = ref<T | null>(null) // 因為result一開始是空的時候是null 有資料的時候才會變成 T
  const loading = ref(true)
  const loaded = ref(false)
  const error = ref(null)

  axios.get(url).then((rawData) => {
    loading.value = false
    loaded.value = true
    result.value = rawData.data
  }).catch(e => {
    error.value = e
    loading.value = false
  })

  return {
    result, loading, loaded, error
  }
}

export default useURLLoader
