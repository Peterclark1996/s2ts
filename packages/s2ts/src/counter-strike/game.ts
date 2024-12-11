import { Instance } from "cspointscript"
import { createEntity } from "./commands/createEntity"

const eventTypes = ["weapon_fire", "round_start"] as const
type EventType = (typeof eventTypes)[number]

const eventListeners: Record<EventType, (() => void)[]> = {
    weapon_fire: [],
    round_start: []
}

Instance.PublicMethod("s2ts-event-round_start", () => eventListeners["round_start"].forEach(fn => fn()))

const ticksPerSecond = 64
const tickListeners: (() => void)[] = []
let functionsForNextTick: (() => void)[] = []
let delayedFunctions: { fn: () => void; delay: number }[] = []
Instance.PublicMethod("s2ts-on_tick", () => {
    functionsForNextTick.forEach(fn => fn())
    functionsForNextTick = []

    for (let i = 0; i < delayedFunctions.length; i++) {
        const nextFn = delayedFunctions.pop()
        if (!nextFn) break
        if (nextFn.delay > 0) {
            game.runAfterDelayTicks(nextFn.fn, nextFn.delay - 1)
        } else {
            functionsForNextTick.push(nextFn.fn)
        }
    }

    tickListeners.forEach(fn => fn())
})

export const game = {
    on: (eventType: EventType, fn: () => void) => eventListeners[eventType].push(fn),
    onTick: (fn: () => void) => tickListeners.push(fn),
    runNextTick: (fn: () => void) => delayedFunctions.push({ fn, delay: 1 }),
    runAfterDelayTicks: (fn: () => void, delay: number) => delayedFunctions.push({ fn, delay }),
    runAfterDelaySeconds: (fn: () => void, delay: number) => delayedFunctions.push({ fn, delay: Math.ceil(delay * ticksPerSecond) })
}

const setupSpecificEventListener = (eventName: EventType) =>
    createEntity({
        class: "logic_eventlistener",
        keyValues: { targetName: "s2ts-event_listener-" + eventName, eventName },
        outputs: { onEventFired: () => eventListeners[eventName].forEach(fn => fn()) }
    })

game.on("round_start", () => eventTypes.filter(eventName => eventName !== "round_start").forEach(setupSpecificEventListener))
