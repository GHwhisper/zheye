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
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'

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

    // 用于获取 dropdownRef 的 DOM 节点
    const dropdownRef = ref<null | HTMLElement>(null)

    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    const isClickOutSide = useClickOutside(dropdownRef)

    watch(isClickOutSide, () => {
      // setup 只会执行一次，故需放到 watch 中
      if (isOpen.value && isClickOutSide.value) {
        isOpen.value = false
      }
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
