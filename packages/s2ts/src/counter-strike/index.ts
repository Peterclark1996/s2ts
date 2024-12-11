import { createEntity } from "./commands/createEntity"
import { createOnEventFiredForEvent, eventTypes, game } from "./game"

export { Vector } from "./vector"
export { Color } from "./color"
export { game } from "./game"
export { addOutputByName } from "./commands/addOutputByName"
export { runServerCommand } from "./commands/util"
export { createEntity } from "./commands/createEntity"
export { uniqueId } from "./helpers"

game.on("round_start", () =>
    eventTypes
        .filter(eventName => eventName !== "round_start")
        .forEach(eventName =>
            createOnEventFiredForEvent(eventName, onEventFired =>
                createEntity({
                    class: "logic_eventlistener",
                    keyValues: { targetName: "s2ts-event_listener-" + eventName, eventName },
                    outputs: { onEventFired }
                })
            )
        )
)
