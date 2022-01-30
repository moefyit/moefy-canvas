export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function isTouchEvent(event: unknown): event is TouchEvent {
  if ((event as TouchEvent).touches) {
    return true
  }
  return false
}
