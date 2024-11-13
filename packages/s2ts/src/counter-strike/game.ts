import { Instance } from "cspointscript"

const eventTypes = ["weapon_fire", "round_start"] as const

const eventListeners: Record<(typeof eventTypes)[number], (() => void)[]> = {
    weapon_fire: [],
    round_start: []
}

Instance.PublicMethod("s2ts-event-weapon_fire", () => eventListeners["weapon_fire"].forEach(fn => fn()))
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

const game = {
    on: (eventType: (typeof eventTypes)[number], fn: () => void) => eventListeners[eventType].push(fn),
    onTick: (fn: () => void) => tickListeners.push(fn),
    runNextTick: (fn: () => void) => delayedFunctions.push({ fn, delay: 0 }),
    runAfterDelayTicks: (fn: () => void, delay: number) => delayedFunctions.push({ fn, delay }),
    runAfterDelaySeconds: (fn: () => void, delay: number) => delayedFunctions.push({ fn, delay: Math.ceil(delay * ticksPerSecond) })
}

export { game }
