---
home: true
title: 'moefy canvas'
heroText: 'Moefy Canvas'
tagline: '🎉 用 canvas 装饰你的网页吧～'
actionText: Get Started
actionLink: /guide/

footer: MIT Licensed 2022
---

<script setup>
import { MAX_Z_INDEX } from '@moefy-canvas/core'
import { Sparkler, SparklerMode } from '@moefy-canvas/theme-sparkler'
import { Ribbon } from '@moefy-canvas/theme-ribbon'

const elSparkler = document.createElement('canvas')
const sparkler = new Sparkler({
   mode: SparklerMode.TRAIL,
}, {
   opacity: 1,
   zIndex: MAX_Z_INDEX,
})
document.body.appendChild(elSparkler)
sparkler.mount(elSparkler)

const elRibbon = document.createElement('canvas')
const ribbon = new Ribbon({}, {
   opacity: 1,
   zIndex: -MAX_Z_INDEX,
})
document.body.appendChild(elRibbon)
ribbon.mount(elRibbon)
</script>
