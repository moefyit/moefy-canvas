<script setup>
import { watch, onMounted, onBeforeUnmount } from 'vue'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { Ribbon } from '@moefy-canvas/theme-ribbon'

const ribbon = new Ribbon(
  {},
  {
    opacity: 1,
    zIndex: -MAX_Z_INDEX,
  }
)

onMounted(() => {
  const el = document.querySelector('.ribbon')
  ribbon.mount(el)
})

onBeforeUnmount(() => {
  ribbon.unmount()
})
</script>

<template>
  <canvas class="ribbon"></canvas>
</template>
