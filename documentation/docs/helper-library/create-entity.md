---
sidebar_position: 3
---

# createEntity

Create an entity with specified key values and output functions.

:::warning
Currently the entity will be created on the ground under the specified origin. The origin.z value has no effect.
:::

```ts title="Create a crate prop"
import { Instance } from "cspointscript"
import { createEntity } from "s2ts/counter-strike"

Instance.PublicMethod("InputReceived", () => {
    createEntity({
        class: "prop_dynamic",
        keyValues: {
            targetName: "crate",
            origin: { x: 100, y: 200, z: 0 },
            model: "models/props/de_dust/hr_dust/dust_crates/dust_crate_style_01_32x32x32.vmdl",
            renderAmount: 255,
            renderColor: color,
            solid: "none"
        },
        outputs: {
            onBreak: () => {
                Instance.Msg("Crate broke!")
            },
            onTakeDamage: () => {
                Instance.Msg("Crate took damage!")
            }
        }
    })
})
```

:::warning
Most entities are currently not implimented but using keyValueOverrides, you can create any entity with any key values. Its just not type safe.
```ts
createEntity({
    class: "env_explosion",
    keyValueOverrides: {
        iMagnitude: 200,
        explosion_custom_sound: "BaseGrenade.Explode"
    }
})
```
:::

:::info
Entity creation is triggered asynchronously so you cant interact with the entity immidiatly.
```ts title="❌ Wont explode because the command is triggered before the entity has finished creating"
createEntity({
    class: "env_explosion",
    keyValues: {
        targetName: "explosionEntity",
        origin: Vector.zero,
        magnitude: 100,
        sound: "BaseGrenade.Explode"
    }
})

runServerCommand("ent_fire explosionEntity explode")
```
```ts title="✅ Will explode because the command is triggered after a short delay"
createEntity({
    class: "env_explosion",
    keyValues: {
        targetName: "explosionEntity",
        origin: Vector.zero,
        magnitude: 100,
        sound: "BaseGrenade.Explode"
    }
})

game.runAfterDelaySeconds(() => runServerCommand("ent_fire explosionEntity explode"), 0.1)
```
:::