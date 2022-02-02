<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { Sakura } from '@moefy-canvas/theme-sakura'

const el = ref(null)
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
  sakura.mount(el.value)
})

onBeforeUnmount(() => {
  sakura.unmount()
})
</script>

<template>
  <canvas ref="el"></canvas>
</template>
