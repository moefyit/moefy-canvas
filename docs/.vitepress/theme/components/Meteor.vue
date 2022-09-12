<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { Meteor } from '@moefy-canvas/theme-meteor'

const el = ref(null)
const meteor = new Meteor(
  {
    numParticles: null,
  },
  {
    opacity: 1,
    zIndex: MAX_Z_INDEX,
  }
)

onMounted(() => {
  meteor.mount(el.value!)
})

onBeforeUnmount(() => {
  meteor.unmount()
})
</script>

<template>
  <canvas ref="el"></canvas>
</template>
