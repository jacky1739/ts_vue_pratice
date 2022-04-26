<template>
  <img alt="Vue logo" src="./assets/logo.png">
  {{ count }}
  {{ double }}
  <ul>
    <li v-for="number in numbers" :key="number"><h1>{{ number }}</h1></li>
  </ul>
  <h1>{{ person.name }}</h1>
  <h1>x: {{xRef}} , y: {{yRef}}</h1>
  <h1 v-if="loading">Loading</h1>
  <p>{{ error }}</p>
  <Suspense>
    <template #fallback>
      <h1>loading!...</h1>
    </template>
    <template #default>
      <div>
        <async-show></async-show>
        <dog-show></dog-show>
      </div>
    </template>
  </Suspense>
  <img v-if="loaded" :src="result[0].url" alt="...">
  <button @click="increase">+ 1</button>
  <button @click="updateGreeting">Update Title</button>
  <Modal :isOpen="modalIsOpen" @close-modal="onModalClose"> My modal !!! </Modal>
  <button @click="openModal">open modal</button>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref, toRefs, onMounted, watch, onErrorCaptured } from 'vue'
import useMousePosition from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'
import Modal from './components/Modal.vue'
import AsyncShow from './components/AsyncShow.vue'
import DogShow from './components/DogShow.vue'

interface DataProps {
  count: number
  double: number
  increase: () => void
  numbers: number[]
  person: { name?: string }
}

// interface DogResult {
//   message: string
//   status: string
// }

interface CatResult {
  id: string
  url: string
  width: number
  height: number
}

export default defineComponent({
  name: 'App',
  components: { Modal, AsyncShow, DogShow },
  setup () {
    // const count = ref(0)
    // const double = computed(() => {  // computed 是個函式
    //   return count.value * 2
    // })

    // const increase = () => {
    //   count.value++
    // }

    const { xRef, yRef } = useMousePosition()
    const { result, loading, loaded } = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?format=json')

    watch(result, () => {
      if (result.value) {
        console.log('result', result.value[0].url)
      }
    })

    onMounted(() => {
      console.log('onMounted')
    })

    const greetings = ref('')

    const updateGreeting = () => {
      greetings.value += 'Hello! '
    }

    const data: DataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      increase: () => { data.count++ },
      numbers: [0, 1, 2],
      person: { }
    })

    watch([greetings, () => data.count], (newValue, oldValue) => { // 他的參數是一個響應式的對象, 監聽多個對象就必須使用陣列
      console.log('old', oldValue) // getter的寫法 () => 要取出來的值
      console.log('new', newValue)
      document.title = 'updated' + greetings.value + data.count
    })

    data.numbers[0] = 5
    data.person.name = 'jacky'
    const refData = toRefs(data)
    // toRefs是一個函數 接受一個reactive對象做為參數 返回一個普通的對象 但是這個對象的每一個值都是ref類型具備響應式 因為將響應式的值提取出來就會失去響應式 因此需要toRefs

    const modalIsOpen = ref(false)

    const openModal = () => {
      modalIsOpen.value = true
    }
    const onModalClose = () => {
      modalIsOpen.value = false
    }

    const error = ref(null)
    onErrorCaptured((e: any) => {
      error.value = e
      return true
    })

    return {
      ...refData, updateGreeting, xRef, yRef, result, loading, loaded, modalIsOpen, openModal, onModalClose, AsyncShow, DogShow, error
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
