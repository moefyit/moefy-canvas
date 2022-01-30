/**
 * 本代码为参考源码，源于 https://v2.suda.moe/auth/login，个别处略作修改
 * 真正的出处没有找到，只找到了这个 Chrome 扩展：
 * https://chrome.google.com/webstore/detail/cursor-sparkles/adbenckfpdnmlhleegopganmonbchdkb/related
 * 本代码为 CSS 实现
 */

function normalize(x, MIN, MAX) {
  return (x - MIN) / (MAX - MIN)
}
function denormalize(x, MIN, MAX) {
  return x * (MAX - MIN) + MIN
}
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

class CursorSparkler {
  static modes = { follow: 'follow', trail: 'trail' }
  static TranslateZero = 'translate3d(0, 0, 0)'
  constructor(options) {
    options = options || {}
    options.mode = options.mode || CursorSparkler.modes.trail
    options.numSparkles = options.numSparkles || 20
    options.sparkleFactor = 1
    options.sparkleDurationRange = [50, 500]
    options.sparkleDistanceRange = [40, 100]
    options.sparkleSizeRange = [1, 5]
    this.options = options
    this.el = document.createElement('div')
    this.el.style.position = 'absolute'
    this.el.style.top = -this.options.sparkleSizeRange[1] + 'px'
    this.el.style.left = -this.options.sparkleSizeRange[1] + 'px'
    this.el.style.zIndex = '10000'
    this.el.style.pointerEvents = 'none'
    this.el.style.width = '1px'
    this.el.style.height = '1px'
    this.x = 0
    this.y = 0
    this.shouldAnimate = true
    this.sparkles = []
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onAnimationFrame = this.onAnimationFrame.bind(this)
  }

  listen() {
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('mousedown', this.onMouseDown)
    window.addEventListener('mouseup', this.onMouseUp)
    document.body.appendChild(this.el)
    requestAnimationFrame(this.onAnimationFrame)
  }

  destroy() {
    this.el.parentElement.removeChild(this.el)
    window.removeEventListener('mousemove', this.onMouseMove)
    this.shouldAnimate = false
  }

  render(time) {
    if (this.options.disabled) {
      if (this.el.style.display !== 'none') this.el.style.display = 'none'
      return
    } else {
      if (this.el.style.display !== 'block') this.el.style.display = 'block'
    }
    if (this.options.mode === CursorSparkler.modes.follow) {
      this.el.style.transform = 'translate3d(' + this.x + 'px, ' + this.y + 'px, 0)'
    } else {
      if (this.el.style.transform !== CursorSparkler.TranslateZero) {
        this.el.style.transform = CursorSparkler.TranslateZero
      }
    }
    var numSparkles = this.options.numSparkles
    if (this.sparkles.length > numSparkles) {
      this.sparkles.slice(numSparkles).forEach(function (sparkle) {
        sparkle.destroy()
      })
      this.sparkles.length = numSparkles
    }
    for (var i = 0, sparkle; i < numSparkles; i++) {
      sparkle = this.sparkles[i]
      if (!sparkle) {
        this.sparkles[i] = this.sparkle(time + getRandomInt(0, 800 / this.options.sparkleFactor))
        this.el.appendChild(this.sparkles[i].el)
        continue
      }
      sparkle.render(time)
      if (time >= sparkle.options.startTime + sparkle.options.duration) {
        sparkle.destroy()
        this.sparkles[i] = this.sparkle(time + 100)
        this.el.appendChild(this.sparkles[i].el)
      }
    }
  }

  sparkle(startTime) {
    var options = this.options
    var sf = options.sparkleFactor
    var sDuration = options.sparkleDurationRange
    var sDistance = options.sparkleDistanceRange
    var sSize = options.sparkleSizeRange
    var startX = options.mode === CursorSparkler.modes.trail ? this.x : 0
    var startY = options.mode === CursorSparkler.modes.trail ? this.y : 0
    startX += options.sparkleSizeRange[1]
    startY += options.sparkleSizeRange[1]
    return new Sparkle({
      window: this.window,
      startTime: startTime,
      startX: startX,
      startY: startY,
      duration: getRandomInt(sDuration[0], sDuration[1] / sf),
      distance: getRandomInt(sDistance[0], sDistance[1] * (sf === 1 ? 1 : sf / 4)),
      size: getRandomInt(sSize[0], sSize[1] * (sf === 1 ? 1 : sf / 3)),
    })
  }

  onMouseMove(e) {
    this.x = e.pageX
    this.y = e.pageY
  }

  onMouseDown(e) {
    if (!this.originalSparkleFactor) {
      this.originalSparkleFactor = this.options.sparkleFactor
    } else {
      this.options.sparkleFactor = this.originalSparkleFactor
    }
    this.options.sparkleFactor *= 4
  }

  onMouseUp(e) {
    this.options.sparkleFactor = this.originalSparkleFactor || 1
    delete this.originalSparkleFactor
  }
  onAnimationFrame(time) {
    if (!this.shouldAnimate) return
    if (!this.start) this.start = time
    this.render(time)
    requestAnimationFrame(this.onAnimationFrame)
  }
}

class Sparkle {
  static fantasticColors = ['yellow', 'pink', 'red', 'orange', 'purple', 'cyan']
  constructor(options) {
    options = options || {}
    options.duration = options.duration || getRandomInt(50, 500)
    options.direction = options.direction || getRandomFloat(0, Math.PI * 2)
    options.distance = options.distance || getRandomInt(40, 100)
    options.size = options.size || getRandomInt(1, 5)
    options.color = options.color || Sparkle.getFantasticColor()
    options.startTime = options.startTime || 0
    this.options = options
    this.el = document.createElement('div')
    this.el.style.position = 'absolute'
    this.el.style.background = this.options.color
    this.el.style.width = this.options.size + 'px'
    this.el.style.height = this.options.size + 'px'
    this.el.style.borderRadius = '50%'
    this.el.style.transform = 'translate3d(0,0,0)'
  }

  static getFantasticColor() {
    return Sparkle.fantasticColors[~~(Sparkle.fantasticColors.length * Math.random())]
  }

  destroy() {
    this.el.parentElement.removeChild(this.el)
  }

  render(time) {
    var step = normalize(
      time,
      this.options.startTime,
      this.options.startTime + this.options.duration
    )
    var x = this.options.startX + Math.sin(this.options.direction) * this.options.distance * step
    var y = this.options.startY + Math.cos(this.options.direction) * this.options.distance * step
    this.el.style.opacity = (1 - step).toString()
    this.el.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)'
  }
}

var sparkler = new CursorSparkler({
  mode: 'trail',
})

function bootstrap() {
  sparkler.listen()
}

bootstrap()
