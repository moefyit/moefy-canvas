---
home: true
title: 'moefy canvas'
heroText: 'Moefy Canvas'
tagline: '🎉 用 canvas 装饰你的网页吧～'
actionText: Get Started
actionLink: /themes/

footer: MIT Licensed 2022
---

<Sakura v-if="theme === 'sakura'"/>
<Sparkler v-else-if="theme === 'sparkler'"/>
<Ribbon v-else-if="theme === 'ribbon'"/>
<popper v-else="theme === 'popper'"/>

<script setup>
const themes = ["sakura", "sparkler", "popper", "ribbon"]
const idx = Math.floor(Math.random() * 4)
const theme = themes[idx]
</script>
