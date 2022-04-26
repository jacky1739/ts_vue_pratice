import { reactive, onMounted, onUnmounted, toRefs } from 'vue'

function useMousePosition () {
  const x = reactive({
    pageX: 0
  })
  const y = reactive({
    pageY: 0
  })
  const updateMouse = (e: MouseEvent) => {
    x.pageX = e.pageX
    y.pageY = e.pageY
  }
  onMounted(() => {
    document.addEventListener('click', updateMouse)
  })
  onUnmounted(() => {
    document.removeEventListener('click', updateMouse)
  })

  const xRef = toRefs(x)
  const yRef = toRefs(y)
  return { xRef, yRef }
}

export default useMousePosition
