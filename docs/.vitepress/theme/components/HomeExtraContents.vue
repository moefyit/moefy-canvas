<script lang="ts" setup>
import Sparkler from './Sparkler.vue'
import Sakura from './Sakura.vue'
import Popper from './Popper.vue'
import Ribbon from './Ribbon.vue'

const themes = ['sakura', 'sparkler', 'popper', 'ribbon']
const idx = Math.floor(Math.random() * 4)
const theme = themes[idx]
</script>

<template>
  <ClientOnly>
    <Sakura v-if="theme === 'sakura'" />
    <Sparkler v-else-if="theme === 'sparkler'" />
    <Ribbon v-else-if="theme === 'ribbon'" />
    <popper v-else="theme === 'popper'" />
  </ClientOnly>
</template>
