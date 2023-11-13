/**
 * 本代码为参考源码，源于 https://argvchs.github.io/js/background.js
 * 为提高可读性，部分重构
 */

!(function () {
  let prevX = null
  let prevY = null
  var numParticles = (window.innerWidth + window.innerHeight) / 8,
    margin = 50,
    canvas = document.getElementById('background'),
    ctx = canvas.getContext('2d'),
    dpr = 1,
    windowWidth = void 0,
    windowHeight = void 0,
    particles = [],
    globalSpeed = { x: 0, y: 0, tx: 0, ty: 0, z: 5e-4 },
    u = false

  function resetParticle(particle, zOnly) {
    if (!zOnly) {
      particle.x = Math.random() * windowWidth
      particle.y = Math.random() * windowHeight
    }
    particle.z = 0.2 + Math.random() * 0.8
  }

  function initParticles() {
    dpr = window.devicePixelRatio || 1
    windowWidth = window.innerWidth * dpr
    windowHeight = window.innerHeight * dpr
    canvas.width = windowWidth
    canvas.height = windowHeight
    particles.forEach((particle) => {
      resetParticle(particle, false)
    })
  }

  for (let i = 0; i < numParticles; i++) {
    particles.push({ x: 0, y: 0, z: 0 })
  }

  initParticles()
  function animate() {
    ctx.clearRect(0, 0, windowWidth, windowHeight)
    globalSpeed.tx *= 0.95
    globalSpeed.ty *= 0.95
    globalSpeed.x += 0.7 * (globalSpeed.tx - globalSpeed.x)
    globalSpeed.y += 0.7 * (globalSpeed.ty - globalSpeed.y)
    particles.forEach(function (particle) {
      let direction, globalSpeedTX, globalSpeedTY
      particle.x += globalSpeed.x * particle.z
      particle.y += globalSpeed.y * particle.z
      particle.x += (particle.x - windowWidth / 2) * globalSpeed.z * particle.z
      particle.y += (particle.y - windowHeight / 2) * globalSpeed.z * particle.z
      particle.z += globalSpeed.z
      if (
        particle.x < -margin ||
        particle.x > windowWidth + margin ||
        particle.y < -margin ||
        particle.y > windowHeight + margin
      ) {
        direction = 'z'
        globalSpeedTX = Math.abs(globalSpeed.tx)
        globalSpeedTY = Math.abs(globalSpeed.ty)
        if (globalSpeedTX > 1 && globalSpeedTY > 1) {
          direction =
            (globalSpeedTX > globalSpeedTY
              ? Math.random() < Math.abs(globalSpeed.x) / (globalSpeedTX + globalSpeedTY)
                ? 'h'
                : 'v'
              : Math.random() < Math.abs(globalSpeed.y) / (globalSpeedTX + globalSpeedTY)
                ? 'v'
                : 'h') == 'h'
              ? globalSpeed.x > 0
                ? 'l'
                : 'r'
              : globalSpeed.y > 0
                ? 't'
                : 'b'
        }
        resetParticle(particle, true)
        switch (direction) {
          case 'z':
            particle.z = 0.1
            particle.x = Math.random() * windowWidth
            particle.y = Math.random() * windowHeight
            break
          case 'l':
            particle.x = -3
            particle.y = Math.random() * windowHeight
            break
          case 'r':
            particle.x = windowWidth + 3
            particle.y = Math.random() * windowHeight
            break
          case 't':
            particle.x = Math.random() * windowWidth
            particle.y = -3
            break
          case 'b':
            particle.x = Math.random() * windowWidth
            particle.y = windowHeight + 3
        }
      }
    })

    // draw particles
    particles.forEach(function (particle) {
      ctx.lineCap = 'round'
      ctx.lineWidth = 3 * particle.z * dpr
      ctx.strokeStyle = 'rgba(102,175,239,.2)'
      ctx.beginPath()
      ctx.moveTo(particle.x, particle.y)
      let dx = 2 * globalSpeed.x
      let dy = 2 * globalSpeed.y
      Math.abs(dx) < 0.1 && (dx = 0.5)
      Math.abs(dy) < 0.1 && (dy = 0.5)
      ctx.lineTo(particle.x + dx, particle.y + dy)
      ctx.stroke()
    })

    // next tick
    requestAnimationFrame(animate)
  }
  animate()
  window.addEventListener('resize', initParticles)
  window.addEventListener('mousemove', function (event) {
    u = false
    if ('number' == typeof prevX && 'number' == typeof prevY) {
      let speedX = event.clientX - prevX
      let speedY = event.clientY - prevY
      globalSpeed.tx = globalSpeed.x + (speedX / 8) * dpr * (u ? -1 : 1)
      globalSpeed.ty = globalSpeed.y + (speedY / 8) * dpr * (u ? -1 : 1)
    }
    prevX = event.clientX
    prevY = event.clientY
  })
  window.addEventListener('mouseleave', function () {
    prevX = null
    prevY = null
  })
})()
