type EventType = keyof DocumentEventMap | keyof WindowEventMap
type Listener = (event: any) => void
type ListenedMap = Map<Listenable, EventMap>
type EventMap = Map<EventType, Set<Listener>>

interface Listenable {
  addEventListener(type: EventType, listener: Listener): void
  removeEventListener(type: EventType, listener: Listener): void
}

export class EventsHandler {
  #listenedMap: ListenedMap
  constructor() {
    this.#listenedMap = new Map() as ListenedMap
  }

  add(type: EventType, listener: Listener, listened: Listenable = window) {
    if (!this.#listenedMap.has(listened)) {
      this.#listenedMap.set(listened, new Map() as EventMap)
    }

    const eventMap = this.#listenedMap.get(listened)!
    if (!eventMap.has(type)) {
      eventMap.set(type, new Set<Listener>())
    }
    eventMap.get(type)!.add(listener)
  }

  startAll() {
    for (const [listened, eventMap] of this.#listenedMap) {
      for (const [type, listeners] of eventMap) {
        for (const listener of listeners) {
          listened.addEventListener(type, listener)
        }
      }
    }
  }

  stopAll() {
    for (const [listened, eventMap] of this.#listenedMap) {
      for (const [type, listeners] of eventMap) {
        for (const listener of listeners) {
          listened.removeEventListener(type, listener)
        }
      }
    }
  }

  clear() {
    this.#listenedMap.clear()
  }
}
