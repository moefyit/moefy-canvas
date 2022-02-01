# @moefy-canvas/theme-popper

<script setup>
import { watch, toRefs } from 'vue'
import { useRoute } from 'vitepress'
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { Popper, PopperShape } from '@moefy-canvas/theme-popper'

const elPopper = document.createElement('canvas')
const popper = new Popper({
   mode: PopperShape.Star,
}, {
   opacity: 1,
   zIndex: MAX_Z_INDEX,
})
document.body.appendChild(elPopper)
popper.mount(elPopper)

const route = useRoute()
const path = toRefs(route).path
watch(path, (path, prevPath) => {
   elPopper.remove()
   popper.unmount()
})
</script>
