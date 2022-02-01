<script setup>
import { watch, onMounted, onBeforeUnmount } from 'vue'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { Popper, PopperShape } from '@moefy-canvas/theme-popper'

const popper = new Popper(
  {
    mode: PopperShape.Star,
  },
  {
    opacity: 1,
    zIndex: MAX_Z_INDEX,
  }
)

onMounted(() => {
  const el = document.querySelector('.popper')
  popper.mount(el)
})

onBeforeUnmount(() => {
  popper.unmount()
})
</script>

<template>
  <canvas class="popper"></canvas>
</template>
