# @moefy-canvas/theme-sakura

<script setup>
import { watch, toRefs, onMounted } from 'vue'
import { useRoute } from 'vitepress'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { Sakura } from '@moefy-canvas/theme-sakura'

const elSakura = document.createElement('canvas')
const sakura = new Sakura({
   numPatel: 30
}, {
   opacity: 1,
   zIndex: -MAX_Z_INDEX,
})

onMounted(() => {
   document.body.appendChild(elSakura)
   sakura.mount(elSakura)
})

const route = useRoute()
const path = toRefs(route).path
watch(path, (path, prevPath) => {
   elSakura.remove()
   sakura.unmount()
})
</script>
