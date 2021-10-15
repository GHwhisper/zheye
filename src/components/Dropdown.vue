<template>
  <div class="dropdown" ref="dropdownRef">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
      {{ title }}
    </a>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    // 用于获取 dropdownRef 的 DOM 节点
    const dropdownRef = ref<null | HTMLElement>(null)
    const handler = (e: MouseEvent) => {
      // 判断节点是否存在
      if (dropdownRef.value) {
        // node.contains(otherNode)判断节点是否包含另一个节点
        if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) {
          isOpen.value = false
        }
      }
    }

    onMounted(() => {
      document.addEventListener('click', handler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handler)
    })

    return {
      isOpen,
      toggleOpen,
      dropdownRef // 返回的 dropdownRef 与 ref="dropdownRef" 相同，页面挂载时，dropdownRef 便就是想要获取的 ref="dropdownRef" DOM 节点
    }
  }
})
</script>

<style scoped>

</style>
