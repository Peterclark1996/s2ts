import { Instance } from "cspointscript"
import { Color } from "../color"
import { game } from "../game"
import { uniqueId } from "../helpers"
import { Vector } from "../vector"
import { addOutputByName } from "./addOutputByName"
import { runServerCommand } from "./util"

const PropDynamicSolid = {
    none: 0,
    bsp: 1,
    bbox: 2,
    obb: 3,
    sphere: 4,
    point: 5,
    vphysics: 6,
    capsule: 7,
    last: 8
} as const

const PointWorldTextJustifyHorizontal = {
    left: 0,
    center: 1,
    right: 2
} as const

const PointWorldTextJustifyVertical = {
    top: 0,
    center: 1,
    bottom: 2
} as const

const PointWorldTextReorientMode = {
    none: 0,
    "rotate-around-up": 1
} as const

const LogicEventListenerTeam = {
    "dont-care": -1,
    terrorists: 2,
    "counter-terrorists": 3
} as const

type EntityDefinition =
    | {
          class: "prop_dynamic"
          keyValues: {
              model: string
              solid: keyof typeof PropDynamicSolid
              renderAmount: number
              renderColor: Color
          }
          outputs: {
              onIgnite: () => void
              onBreak: () => void
              onHealthChanged: () => void
              onTakeDamage: () => void
              onAnimationBegun: () => void
              onAnimationDone: () => void
              onAnimationReachedEnd: () => void
              onAnimationReachedStart: () => void
              onAnimationLoopCycleDone: () => void
          }
      }
    | {
          class: "logic_timer"
          keyValues: {
              refireTime: number
          }
          outputs: {
              onTimer: () => void
              onTimerHigh: () => void
              onTimerLow: () => void
          }
      }
    | {
          class: "env_explosion"
          keyValues: {
              magnitude: number
              sound: string
          }
          outputs: {}
      }
    | {
          class: "point_worldtext"
          keyValues: {
              message: string
              enabled: boolean
              fontSize: number
              color: Color
              worldUnitsPerPixel: number
              fontName: string
              justifyHorizontal: keyof typeof PointWorldTextJustifyHorizontal
              justifyVertical: keyof typeof PointWorldTextJustifyVertical
              reorientMode: keyof typeof PointWorldTextReorientMode
              depthRenderOffset: number
          }
          outputs: {}
      }
    | {
          class: "env_fade"
          keyValues: {
              duration: number
              holdTime: number
              renderColor: Color
              renderAmount: number
          }
          outputs: {
              onBeginFade: () => void
          }
      }
    | {
          class: "logic_eventlistener"
          keyValues: {
              eventName: string
              enabled: boolean
              team: keyof typeof LogicEventListenerTeam
          }
          outputs: {
              onEventFired: () => void
          }
      }

type CommonEntityKeyValues = {
    targetName: string
    origin: Vector
    angles: Vector
}

type CommonEntityOutputs = {
    onUser1: () => void
    onUser2: () => void
    onUser3: () => void
    onUser4: () => void
    onKilled: () => void
}

type MiscKeyValues = Record<string, string | number | boolean | Vector | Color | undefined>

type EntityDefinitionPartial = EntityDefinition extends infer TEntity
    ? TEntity extends { class: infer TClass; keyValues: infer TKeyValues; outputs: infer TOutputs }
        ? {
              class: TClass
              keyValues: Partial<CommonEntityKeyValues & TKeyValues>
              keyValueOverrides?: MiscKeyValues
              outputs: Partial<TOutputs & CommonEntityOutputs>
          }
        : never
    : never

type EntityDefinitionOptional = EntityDefinition extends infer TEntity
    ? TEntity extends { class: infer TClass; keyValues: infer TKeyValues; outputs: infer TOutputs }
        ? {
              class: TClass
              keyValues?: Partial<CommonEntityKeyValues & TKeyValues>
              keyValueOverrides?: MiscKeyValues
              outputs?: Partial<TOutputs & CommonEntityOutputs>
          }
        : never
    : never

const customOutputs: Record<string, () => void> = {}

Instance.PublicMethod("s2ts-custom-output", (outputId: string) => {
    const fn = customOutputs[outputId]
    if (fn) {
        fn()
    }
})

export const createEntity = (entity: EntityDefinitionOptional): void => {
    const parsedCommonKeyValues = {
        targetname: entity.keyValues?.targetName ?? uniqueId(),
        origin: entity.keyValues?.origin,
        angles: entity.keyValues?.angles
    }

    const parsedEntitySpecificKeyValues = parseEntitySpecificKeyValues({
        class: entity.class,
        keyValues: entity.keyValues ?? {},
        outputs: entity.outputs ?? {}
    })

    const fullyParsedKeyValues = {
        ...parsedCommonKeyValues,
        ...parsedEntitySpecificKeyValues,
        ...(entity.keyValueOverrides ?? {})
    }

    const entityProps = Object.entries(fullyParsedKeyValues)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => {
            if (typeof value === "boolean") {
                return [key, value ? "1" : "0"]
            }

            if (typeof value === "object") {
                if ("x" in value && "y" in value && "z" in value) {
                    return [key, Vector.format(value)]
                }

                if ("red" in value && "green" in value && "blue" in value) {
                    return [key, Color.format(value)]
                }
            }

            return [key, value]
        })
        .map(([key, value]) => `"${key}" "${value}"`)
        .join(" ")

    runServerCommand(`ent_create ${entity.class} { ${entityProps} }`)

    Object.entries(entity.outputs ?? {}).forEach(([outputName, fn]) => {
        const outputId = uniqueId()

        customOutputs[outputId] = fn

        game.runAfterDelaySeconds(() => {
            addOutputByName(parsedCommonKeyValues.targetname, {
                outputName: outputName.charAt(0).toUpperCase() + outputName.slice(1),
                targetName: "s2ts-script",
                viaThisInput: "s2ts-custom-output",
                parameter: outputId
            })
        }, 0.1)
    })
}

const parseEntitySpecificKeyValues = (entity: EntityDefinitionPartial): MiscKeyValues => {
    const { class: entityClass, keyValues } = entity

    switch (entityClass) {
        case "prop_dynamic":
            return {
                model: keyValues.model,
                solid: PropDynamicSolid[keyValues.solid ?? "vphysics"],
                renderamt: keyValues.renderAmount,
                rendercolor: keyValues.renderColor
            }
        case "logic_timer":
            return {
                refiretime: keyValues.refireTime
            }
        case "env_explosion":
            return {
                iMagnitude: keyValues.magnitude,
                explosion_custom_sound: keyValues.sound
            }
        case "point_worldtext":
            return {
                message: keyValues.message,
                enabled: keyValues.enabled ?? true,
                font_size: keyValues.fontSize,
                color: keyValues.color,
                world_units_per_pixel: keyValues.worldUnitsPerPixel ?? 0.25,
                font_name: keyValues.fontName ?? "Arial Black",
                justify_horizontal: PointWorldTextJustifyHorizontal[keyValues.justifyHorizontal ?? "left"],
                justify_vertical: PointWorldTextJustifyVertical[keyValues.justifyVertical ?? "bottom"],
                reorient_mode: PointWorldTextReorientMode[keyValues.reorientMode ?? "none"],
                depth_render_offset: keyValues.depthRenderOffset
            }
        case "env_fade":
            return {
                duration: keyValues.duration ?? 2,
                holdtime: keyValues.holdTime ?? 0,
                rendercolor: keyValues.renderColor ?? Color.black,
                renderamt: keyValues.renderAmount ?? 255
            }
        case "logic_eventlistener":
            return {
                EventName: keyValues.eventName,
                IsEnabled: keyValues.enabled ?? true,
                TeamNum: LogicEventListenerTeam[keyValues.team ?? "dont-care"]
            }
    }
}
