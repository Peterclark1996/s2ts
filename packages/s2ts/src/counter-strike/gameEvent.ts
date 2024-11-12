import { Instance } from "cspointscript"

const eventTypes = ["weapon_fire", "round_start"] as const

const eventListeners: Record<(typeof eventTypes)[number], (() => void)[]> = {
    weapon_fire: [],
    round_start: []
}

Instance.PublicMethod("s2ts-event-weapon_fire", () => eventListeners["weapon_fire"].forEach(fn => fn()))
Instance.PublicMethod("s2ts-event-round_start", () => eventListeners["round_start"].forEach(fn => fn()))

const gameEvent = {
    on: (eventType: (typeof eventTypes)[number], fn: () => void) => eventListeners[eventType].push(fn)
}

export { gameEvent }
