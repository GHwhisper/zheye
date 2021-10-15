import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    // 判断节点是否存在
    if (elementRef.value) {
      // node.contains(otherNode)判断节点是否包含另一个节点
      isClickOutside.value = !elementRef.value.contains(e.target as HTMLElement)
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })

  return isClickOutside
}

export default useClickOutside
