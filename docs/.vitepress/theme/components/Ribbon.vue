<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { Ribbon } from '@moefy-canvas/theme-ribbon'

const el = ref(null)
const ribbon = new Ribbon(
  {},
  {
    opacity: 1,
    zIndex: -MAX_Z_INDEX,
  }
)

onMounted(() => {
  ribbon.mount(el.value!)
})

onBeforeUnmount(() => {
  ribbon.unmount()
})
</script>

<template>
  <canvas ref="el"></canvas>
</template>
