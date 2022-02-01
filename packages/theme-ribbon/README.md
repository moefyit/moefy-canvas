# @moefy-canvas/theme-ribbon

<script setup>
import { watch, toRefs, onMounted } from 'vue'
import { useRoute } from 'vitepress'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { Ribbon } from '@moefy-canvas/theme-ribbon'

const elRibbon = document.createElement('canvas')
const ribbon = new Ribbon({}, {
   opacity: 1,
   zIndex: -MAX_Z_INDEX,
})

onMounted(() => {
   document.body.appendChild(elRibbon)
   ribbon.mount(elRibbon)
})

const route = useRoute()
const path = toRefs(route).path
watch(path, (path, prevPath) => {
   elRibbon.remove()
   ribbon.unmount()
})
</script>
