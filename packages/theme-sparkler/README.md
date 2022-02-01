# @moefy-canvas/theme-sparkler

<script setup>
import { watch, toRefs, onMounted } from 'vue'
import { useRoute } from 'vitepress'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { Sparkler, SparklerMode } from '@moefy-canvas/theme-sparkler'

const elSparkler = document.createElement('canvas')
const sparkler = new Sparkler({
   mode: SparklerMode.TRAIL,
}, {
   opacity: 1,
   zIndex: MAX_Z_INDEX,
})

onMounted(() => {
   document.body.appendChild(elSparkler)
   sparkler.mount(elSparkler)
})

const route = useRoute()
const path = toRefs(route).path
watch(path, (path, prevPath) => {
   elSparkler.remove()
   sparkler.unmount()
})
</script>
