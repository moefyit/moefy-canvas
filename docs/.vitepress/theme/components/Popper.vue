<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { Popper, PopperShape } from '@moefy-canvas/theme-popper'

const el = ref(null)
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
  popper.mount(el.value)
})

onBeforeUnmount(() => {
  popper.unmount()
})
</script>

<template>
  <canvas ref="el"></canvas>
</template>
