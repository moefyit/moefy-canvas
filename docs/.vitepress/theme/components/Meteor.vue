<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { Meteor } from '@moefy-canvas/theme-meteor'

const el = ref(null)
const meteor = new Meteor(
  {
    numParticles: null,
    particleColor: {
      light: 'rgba(102, 175, 239, .2)',
      dark: 'rgba(245, 236, 66, .2)',
    },
  },
  {
    opacity: 1,
    zIndex: -MAX_Z_INDEX,
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
