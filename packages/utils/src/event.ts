type EventType = keyof DocumentEventMap | keyof WindowEventMap
type Listener = (event: any) => void
type EventMap = Map<EventType, Set<Listener>>

export class EventsHandler {
  #eventMap: EventMap
  constructor() {
    this.#eventMap = new Map() as EventMap
  }

  add(type: EventType, listener: Listener) {
    if (!this.#eventMap.has(type)) {
      this.#eventMap.set(type, new Set<Listener>())
    }
    this.#eventMap.get(type)?.add(listener)
  }

  start(type: EventType) {
    if (this.#eventMap.has(type)) {
      for (const event of this.#eventMap.get(type)!) {
        window.addEventListener(type, event)
      }
    }
  }

  stop(type: EventType) {
    if (this.#eventMap.has(type)) {
      for (const event of this.#eventMap.get(type)!) {
        window.removeEventListener(type, event)
      }
    }
  }

  startAll() {
    for (const type of this.#eventMap.keys()) {
      this.start(type)
    }
  }

  stopAll() {
    for (const type of this.#eventMap.keys()) {
      this.stop(type)
    }
  }

  clear() {
    this.#eventMap.clear()
  }
}
