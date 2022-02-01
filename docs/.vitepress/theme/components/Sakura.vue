<script setup>
import { watch, onMounted, onBeforeUnmount } from 'vue'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { Sakura } from '@moefy-canvas/theme-sakura'

const sakura = new Sakura(
  {
    numPatel: 30,
  },
  {
    opacity: 1,
    zIndex: -MAX_Z_INDEX,
  }
)

onMounted(() => {
  const el = document.querySelector('.sakura')
  sakura.mount(el)
})

onBeforeUnmount(() => {
  sakura.unmount()
})
</script>

<template>
  <canvas class="sakura"></canvas>
</template>
