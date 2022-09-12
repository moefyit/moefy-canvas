---
layout: home

hero:
   name: Moefy Canvas
   text: 🎉 用 canvas 装饰你的网页吧～
   actions:
      - theme: brand
        text: Get Started
        link: /themes/
      - theme: alt
        text: View on GitHub
        link: https://github.com/moefyit/moefy-canvas
---

<ClientOnly>
   <Sakura v-if="theme === 'sakura'"/>
   <Sparkler v-else-if="theme === 'sparkler'"/>
   <Ribbon v-else-if="theme === 'ribbon'"/>
   <Popper v-else-if="theme === 'popper'"/>
   <Meteor v-else="theme === 'meteor'"/>
</ClientOnly>

<script setup>
const themes = ["sakura", "sparkler", "popper", "ribbon", "meteor"]
const idx = Math.floor(Math.random() * themes.length)
const theme = themes[idx]
</script>
