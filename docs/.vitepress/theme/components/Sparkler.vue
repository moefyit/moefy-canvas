<script setup>
import { watch, onMounted, onBeforeUnmount } from 'vue'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { Sparkler, SparklerMode } from '@moefy-canvas/theme-sparkler'

const sparkler = new Sparkler(
  {
    mode: SparklerMode.TRAIL,
  },
  {
    opacity: 1,
    zIndex: MAX_Z_INDEX,
  }
)

onMounted(() => {
  const el = document.querySelector('.sparkler')
  sparkler.mount(el)
})

onBeforeUnmount(() => {
  sparkler.unmount()
})
</script>

<template>
  <canvas class="sparkler"></canvas>
</template>
